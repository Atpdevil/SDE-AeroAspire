from flask import Flask, jsonify, request, redirect
from flasgger import Swagger
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# swagger = Swagger(app, template_file='openapi.yaml')

# Swagger configuration
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

swagger = Swagger(app, config=swagger_config)

# Fake database
tasks = []

@app.route('/')
def home():
    return redirect('/api/v1/docs/')

@app.route('/api/v1/tasks', methods=['GET'])
def get_tasks():
    """Get all tasks
    ---
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
    return jsonify(tasks), 200


@app.route('/api/v1/tasks', methods=['POST'])
def add_task():
    """Add a new task
    ---
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
def update_task(id):
    """Update a task by ID
    ---
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
def delete_task(id):
    """Delete a task by ID
    ---
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
