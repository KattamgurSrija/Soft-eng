from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# ------------------ DATABASE CONNECTION ------------------

DATABASE_URL = (
    "mssql+pyodbc://localhost\\SQLEXPRESS/SwipeIn"
    "?driver=ODBC+Driver+17+for+SQL+Server"
    "&trusted_connection=yes"
)

# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL)

# Session for database operations
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base model to inherit from
Base = declarative_base()
