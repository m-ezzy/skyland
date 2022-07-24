import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="skyland",
)

cursor = db.cursor();

print('play games')
