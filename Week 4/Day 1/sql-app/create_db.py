import sqlite3

conn = sqlite3.connect("tasks.db")
cursor = conn.cursor()

with open("schema.sql", "r") as f:
    sql_script = f.read()

cursor.executescript(sql_script)

print("✅ Database and tables created successfully!")
conn.close()
