from flask import Flask, jsonify
import os
import mysql.connector

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify(message="Flask backend running in Docker!")

@app.route('/dbtest')
def db_test():
    try:
        conn = mysql.connector.connect(
            host=os.getenv('DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            database=os.getenv('DB_NAME')
        )
        return jsonify(message="Database connected successfully!")
    except Exception as e:
        return jsonify(error=str(e))
        
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
