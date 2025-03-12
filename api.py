from datetime import datetime, timedelta
from fastapi import security
import jwt
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import uvicorn
from database import engine, SessionLocal
from pydantic import BaseModel
import hashlib
from models import User, Base
from typing import Optional
from fastapi import FastAPI, HTTPException, Depends, status, Security
from fastapi.security import HTTPAuthorizationCredentials
from jwt import PyJWTError, decode
import os

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

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.on_event("startup")
def startup_event():
    # This function will create all tables on application startup.
    Base.metadata.create_all(bind=engine)


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
        role= user.role,
        email=user.email,
        password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@app.post("/login/")
async def login(user_creds: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == user_creds.username).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    hashed_input = hashlib.sha256(user_creds.password.encode('utf-8')).hexdigest()
    if hashed_input != user.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    
    access_token = create_access_token(
        data={
            "username": user.username,
            "role": user.role
        },
        expires_delta=timedelta(minutes=30)
    )
   
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "username": user.username,
        "role": user.role
    }



async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Security(security)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        token = credentials.credentials
        payload = decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("username")
        role: str = payload.get("role")
        if username is None or role is None:
            raise credentials_exception
    except PyJWTError as e:
        raise credentials_exception from e
    
    return {"username": username, "role": role}



if __name__ == "__main__":
    uvicorn.run(
        "api:app",
        host="127.0.0.1",  
        port=8081,
        reload=True
    )
