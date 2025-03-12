from sqlalchemy import Column,String,Integer,Float,Boolean,Date,ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class User(Base):
    
    __tablename__ = 'users'

    username = Column(String(50), primary_key=True, index=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    role = Column(String(50), nullable=False)                  
    password = Column(String(100), nullable=False)

    # Relationships to other tables
    swipes = relationship("Swipes", back_populates="user", uselist=False)
    meals = relationship("Meals", back_populates="user", uselist=False)
    transactions = relationship("Transactions", back_populates="user")


class Swipes(Base):
    
    __tablename__ = 'swipes'

    username = Column(String(50), ForeignKey('users.username'), primary_key=True)
    meal_swipes = Column(Integer, nullable=False)
    meal_swipes_left = Column(Integer, nullable=False)
    flex_dollars = Column(Float, nullable=False)
    flex_dollars_left = Column(Float, nullable=False)

  
    user = relationship("User", back_populates="swipes")


class Meals(Base):
    
    __tablename__ = 'meals'

    username = Column(String(50), ForeignKey('users.username'), primary_key=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    meal_plan = Column(String(50))
    meal_swipes = Column(Integer)
    flex_dollars = Column(Float)
    location = Column(String(100))

    user = relationship("User", back_populates="meals")


class Transactions(Base):
    
    __tablename__ = 'transactions'

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), ForeignKey('users.username'), nullable=False)
    transaction_date = Column(Date)
    transaction_mode = Column(String(50))
    transaction_url = Column(String(255))
    is_successful = Column(Boolean, default=False)

    user = relationship("User", back_populates="transactions")


class Menu(Base):
    
    __tablename__ = 'menu'

    menu_id = Column(Integer, primary_key=True, autoincrement=True)
    item_title = Column(String(100), nullable=False)
    item_description = Column(String(255))
    calories = Column(Integer)
    price = Column(Float)