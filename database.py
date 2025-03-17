from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import urllib


connection_string = (
    "DRIVER={ODBC Driver 17 for SQL Server};"
    "SERVER=RAJAT\\SQLEXPRESS;"
    "DATABASE=Swipein;"
    "Trusted_Connection=yes;"   
)



encoded_conn_str = urllib.parse.quote_plus(connection_string)


database_url = f"mssql+pyodbc:///?odbc_connect={encoded_conn_str}"


engine = create_engine(database_url)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base =  declarative_base()