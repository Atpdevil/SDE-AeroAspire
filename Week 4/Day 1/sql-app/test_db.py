import sqlite3

# Connect to database
conn = sqlite3.connect("tasks.db")
cursor = conn.cursor()

cursor.execute("INSERT OR IGNORE INTO users (username, email) VALUES (?, ?)", ("gokul", "gokul@example.com"))
cursor.execute("INSERT OR IGNORE INTO users (username, email) VALUES (?, ?)", ("goutham", "goutham@example.com"))
cursor.execute("INSERT OR IGNORE INTO users (username, email) VALUES (?, ?)", ("john", "john@example.com"))

conn.commit()
print("\n✅ Sample data inserted successfully!")

cursor.execute("SELECT * FROM users")
for row in cursor.fetchall():
    print(row)

conn.close()
