from flask import Flask, request, jsonify # type: ignore

app = Flask(__name__)

tasks = []
next_id = 1

def find_task(task_id: int):
    return next((t for t in tasks if t['id'] == task_id), None)

def str_to_bool(s):
    if s is None:
        return None
    return s.lower() in ('1', 'true', 'yes')

# GET /tasks
@app.route('/tasks', methods=['GET'])
def get_tasks():
    completed_param = request.args.get('completed')
    if completed_param is not None:
        completed_bool = str_to_bool(completed_param)
        if completed_bool is None:
            return jsonify({'error': 'completed must be true/false'}), 400
        filtered = [t for t in tasks if t['completed'] == completed_bool]
        return jsonify(filtered), 200
    return jsonify(tasks), 200

# POST /tasks  (create)
@app.route('/tasks', methods=['POST'])
def create_task():
    global next_id
    data = request.get_json(silent=True)
    if not data or 'title' not in data:
        return jsonify({'error': 'title is required'}), 400
    task = {
        'id': next_id,
        'title': data['title'],
        'description': data.get('description', ''),
        'completed': bool(data.get('completed', False))
    }
    next_id += 1
    tasks.append(task)
    return jsonify(task), 201

# PUT /tasks/<id>  (update)
@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.get_json(silent=True)
    if not data:
        return jsonify({'error': 'JSON body required'}), 400
    task = find_task(task_id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    if 'title' in data:
        task['title'] = data['title']
    if 'description' in data:
        task['description'] = data['description']
    if 'completed' in data:
        task['completed'] = bool(data['completed'])
    return jsonify(task), 200

# DELETE /tasks/<id>
@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = find_task(task_id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    tasks.remove(task)
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
