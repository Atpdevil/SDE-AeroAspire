from flask import Blueprint, jsonify, request # type: ignore

bp = Blueprint('api', __name__)

_tasks = []

@bp.route('/')
def hello():
    return 'Hello, World!'

@bp.route('/tasks', methods=['GET'])
def get_tasks():
    """
    Return list of tasks (JSON).
    """
    return jsonify(_tasks), 200

@bp.route('/tasks', methods=['POST'])
def create_task():
    """
    Expect JSON body: {"title": "Task title", "description": "optional", "completed": false}
    """
    data = request.get_json(silent=True)
    if not data:
        return jsonify({'error': 'Request must be JSON'}), 400

    title = data.get('title')
    if not title:
        return jsonify({'error': 'Field "title" is required'}), 400

    description = data.get('description', '')
    completed = bool(data.get('completed', False))

    new_task = {
        'id': len(_tasks) + 1,
        'title': title,
        'description': description,
        'completed': completed
    }
    _tasks.append(new_task)
    return jsonify(new_task), 201
