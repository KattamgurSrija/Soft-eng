from datetime import datetime, timedelta
import hashlib
import jwt
import os
from typing import Optional

from fastapi import FastAPI, HTTPException, Depends, status, Security
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from database import engine, SessionLocal
from models import User, Base, Menu, Transactions, Swipes

from jwt import PyJWTError, decode
from pydantic import BaseModel

# ------------------ CONFIG ------------------ #
SECRET_KEY = os.environ.get("SECRET_KEY", "default_secret_key")
ALGORITHM = "HS256"

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ------------------ MODELS ------------------ #

class UserBase(BaseModel):
    username: str
    first_name: str
    last_name: str
    email: str
    password: str
    role: str


class UserResponseModel(BaseModel):
    username: str
    first_name: str
    last_name: str
    email: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class TransactionModel(BaseModel):
    username: str
    transaction_date: datetime
    transaction_mode: str
    transaction_id: str
    is_successful: bool
    Location: str
    Total_Amount: float
    MNumber: str


class StudentDashboard(BaseModel):
    name: str
    swipes_used: int
    swipes_left: int
    flex_dollars_left: float


# ------------------ DB UTILITY ------------------ #

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.on_event("startup")
def startup_event():
    Base.metadata.create_all(bind=engine)


# ------------------ REGISTER ------------------ #

@app.post("/register/", response_model=UserResponseModel, status_code=status.HTTP_201_CREATED)
async def create_user(user: UserBase, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    hashed_password = hashlib.sha256(user.password.encode('utf-8')).hexdigest()

    new_user = User(
        username=user.username,
        first_name=user.first_name,
        last_name=user.last_name,
        role=user.role,
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)

    # If role is student, create swipe record
    if user.role.lower() == "student":
        swipe = Swipes(
            username=user.username,
            meal_swipes=60,
            meal_swipes_left=60,
            flex_dollars=100.0,
            flex_dollars_left=100.0
        )
        db.add(swipe)

    db.commit()
    db.refresh(new_user)
    return new_user


# ------------------ LOGIN ------------------ #

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


@app.post("/login/")
async def login(user_creds: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == user_creds.username).first()
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect username or password")

    hashed_input = hashlib.sha256(user_creds.password.encode('utf-8')).hexdigest()
    if hashed_input != user.password:
        raise HTTPException(status_code=401, detail="Incorrect username or password")

    access_token = create_access_token({
        "username": user.username,
        "role": user.role
    }, expires_delta=timedelta(minutes=30))

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "firstname": user.first_name,
        "username": user.username,
        "role": user.role
    }


# ------------------ STUDENT DASHBOARD ------------------ #

@app.get("/student/dashboard/{username}", response_model=StudentDashboard)
def student_dashboard(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username, User.role == "student").first()
    swipes = db.query(Swipes).filter(Swipes.username == username).first()

    if not user or not swipes:
        raise HTTPException(status_code=404, detail="Student data not found")

    return {
        "name": f"{user.first_name} {user.last_name}",
        "swipes_used": swipes.meal_swipes - swipes.meal_swipes_left,
        "swipes_left": swipes.meal_swipes_left,
        "flex_dollars_left": swipes.flex_dollars_left
    }


# ------------------ CFA MENU ------------------ #

@app.get("/CFA_Menu/")
def read_menu(db: Session = Depends(get_db)):
    cfa_menu = db.query(Menu).all()
    if not cfa_menu:
        return JSONResponse(content={"message": "No items found"}, status_code=404)
    return [
        {
            "menu_id": item.menu_id,
            "item_title": item.item_title,
            "item_description": item.item_description,
            "calories": item.calories,
            "price": item.price,
            "category_id": item.category_id
        } for item in cfa_menu
    ]


# ------------------ TRANSACTIONS ------------------ #

@app.post("/transaction/", response_model=TransactionModel)
async def create_transaction(transaction: TransactionModel, db: Session = Depends(get_db)):
    transaction_datetime = transaction.transaction_date
    if transaction_datetime.hour == 0 and transaction_datetime.minute == 0:
        now = datetime.now()
        transaction_datetime = transaction_datetime.replace(hour=now.hour, minute=now.minute, second=now.second)

    new_transaction = Transactions(
        username=transaction.username,
        transaction_date=transaction_datetime,
        transaction_mode=transaction.transaction_mode,
        transaction_id=transaction.transaction_id,
        is_successful=transaction.is_successful,
        Location=transaction.Location,
        Total_Amount=transaction.Total_Amount,
        MNumber=transaction.MNumber
    )

    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)
    return new_transaction


# ------------------ RUN ------------------ #

if __name__ == "__main__":
    uvicorn.run("api:app", host="127.0.0.1", port=8081, reload=True)
