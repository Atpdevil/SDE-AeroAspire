from flask import Flask, jsonify, request, redirect
from flasgger import Swagger
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from datetime import timedelta

app = Flask(__name__)
CORS(app)

# JWT configuration
app.config["JWT_SECRET_KEY"] = "your-secret-key"  # Change to a strong secret
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

jwt = JWTManager(app)

# Swagger configuration with JWT support
swagger_template = {
    "swagger": "2.0",
    "info": {
        "title": "Tasks API",
        "description": "API with JWT authentication",
        "version": "1.0"
    },
    "securityDefinitions": {
        "Bearer": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header",
            "description": "JWT Authorization header using the Bearer scheme. Example: 'Bearer {token}'"
        }
    }
}

swagger_config = {
    "headers": [],
    "specs": [
        {
            "endpoint": 'apispec_v1',
            "route": '/api/v1/apispec.json',
            "rule_filter": lambda rule: True,
            "model_filter": lambda tag: True,
        }
    ],
    "static_url_path": "/flasgger_static",
    "swagger_ui": True,
    "specs_route": "/api/v1/docs/"
}

swagger = Swagger(app, template=swagger_template, config=swagger_config)

# Fake databases
tasks = []
users = {
    "admin": "password123",
    "user1": "mypassword"
}

@app.route('/')
def home():
    return redirect('/api/v1/docs/')

# ---------------- JWT Login ----------------
@app.route('/api/v1/login', methods=['POST'])
def login():
    """
    User login to get JWT token
    ---
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            username:
              type: string
            password:
              type: string
    responses:
      200:
        description: JWT token returned
      401:
        description: Invalid credentials
    """
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400

    if username in users and users[username] == password:
        access_token = create_access_token(identity=username)
        return jsonify({"access_token": access_token}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401

# ---------------- Tasks Endpoints ----------------
@app.route('/api/v1/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    """
    Get all tasks
    ---
    security:
      - Bearer: []
    responses:
      200:
        description: Returns all tasks
        schema:
          type: array
          items:
            properties:
              id:
                type: integer
              title:
                type: string
              completed:
                type: boolean
    """
    current_user = get_jwt_identity()
    return jsonify(tasks), 200

@app.route('/api/v1/tasks', methods=['POST'])
@jwt_required()
def add_task():
    """
    Add a new task
    ---
    security:
      - Bearer: []
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            title:
              type: string
            completed:
              type: boolean
    responses:
      201:
        description: Task added successfully
    """
    data = request.get_json()
    if not data or "title" not in data:
        return jsonify({"error": "Invalid input"}), 400

    new_task = {
        "id": len(tasks) + 1,
        "title": data["title"],
        "completed": data.get("completed", False)
    }
    tasks.append(new_task)
    return jsonify(new_task), 201

@app.route('/api/v1/tasks/<int:id>', methods=['PUT'])
@jwt_required()
def update_task(id):
    """
    Update a task by ID
    ---
    security:
      - Bearer: []
    parameters:
      - name: id
        in: path
        type: integer
        required: true
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            title:
              type: string
            completed:
              type: boolean
    responses:
      200:
        description: Task updated
    """
    for task in tasks:
        if task["id"] == id:
            data = request.get_json()
            task["title"] = data.get("title", task["title"])
            task["completed"] = data.get("completed", task["completed"])
            return jsonify(task), 200

    return jsonify({"error": "Task not found"}), 404

@app.route('/api/v1/tasks/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_task(id):
    """
    Delete a task by ID
    ---
    security:
      - Bearer: []
    parameters:
      - name: id
        in: path
        type: integer
        required: true
    responses:
      200:
        description: Task deleted
    """
    global tasks
    tasks = [t for t in tasks if t["id"] != id]
    return jsonify({"message": "Task deleted"}), 200

@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Not Found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
