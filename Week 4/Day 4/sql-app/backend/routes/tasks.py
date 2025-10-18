from flask import Blueprint, jsonify, request
from models import db, Task

tasks_bp = Blueprint('tasks', __name__)

@tasks_bp.route('/tasks', methods=['GET'])
def get_tasks():
    try:
        tasks = Task.query.all()
        if not tasks:
            return jsonify({"message": "No tasks found"}), 200
        return jsonify([{"id": t.id, "title": t.title, "description": t.description, "completed": t.completed} for t in tasks])
    except Exception as e:
        return jsonify({"error": str(e)}), 500
