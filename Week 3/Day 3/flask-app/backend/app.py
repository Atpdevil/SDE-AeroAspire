from flask import Flask, request, jsonify, url_for, abort
from flask_cors import CORS
import logging

app = Flask(__name__)
# During dev allow Vite (5173) & localhost
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}})

# In-memory store (demo)
tasks = []
_next_id = 1

def next_id():
    global _next_id
    nid = _next_id
    _next_id += 1
    return nid

def find_task(task_id):
    return next((t for t in tasks if t["id"] == task_id), None)

# --- Validation ---
def validate_task_payload(data, partial=False):
    errors = {}
    if not partial or "title" in data:
        if "title" not in data or not isinstance(data["title"], str) or not data["title"].strip():
            errors["title"] = "title is required and must be a non-empty string"
    if "description" in data and data["description"] is not None:
        if not isinstance(data["description"], str):
            errors["description"] = "description must be a string"
    if "completed" in data:
        if not isinstance(data["completed"], bool):
            errors["completed"] = "completed must be boolean"
    return errors

# --- Error handlers ---
@app.errorhandler(400)
def handle_400(e):
    desc = getattr(e, "description", str(e))
    return jsonify({"error": "Bad Request", "message": desc}), 400

@app.errorhandler(404)
def handle_404(e):
    return jsonify({"error": "Not Found", "message": str(e)}), 404

@app.errorhandler(Exception)
def handle_exception(e):
    logging.exception("Unhandled exception")
    code = getattr(e, "code", 500)
    msg = str(e) if code != 500 else "An internal error occurred"
    return jsonify({"error": "Server Error", "message": msg}), code

# --- Root route (helpful) ---
@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "status": "ok",
        "message": "Flask API running",
        "routes": [str(r) for r in app.url_map.iter_rules()]
    }), 200

# --- Task routes ---
@app.route("/tasks", methods=["GET"])
def list_tasks():
    return jsonify(tasks), 200

@app.route("/tasks/<int:task_id>", methods=["GET"])
def get_task(task_id):
    t = find_task(task_id)
    if not t:
        abort(404, description=f"Task {task_id} not found")
    return jsonify(t), 200

@app.route("/tasks", methods=["POST"])
def create_task():
    data = request.get_json(silent=True)
    if data is None:
        abort(400, description="Invalid JSON or missing Content-Type: application/json")
    errors = validate_task_payload(data, partial=False)
    if errors:
        return jsonify({"errors": errors}), 400
    new_task = {
        "id": next_id(),
        "title": data["title"].strip(),
        "description": data.get("description", "").strip() if data.get("description") else "",
        "completed": data.get("completed", False)
    }
    tasks.append(new_task)
    return jsonify(new_task), 201, {"Location": url_for("get_task", task_id=new_task["id"], _external=False)}

@app.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    t = find_task(task_id)
    if not t:
        abort(404, description=f"Task {task_id} not found")
    data = request.get_json(silent=True)
    if data is None:
        abort(400, description="Invalid JSON or missing Content-Type: application/json")
    errors = validate_task_payload(data, partial=True)
    if errors:
        return jsonify({"errors": errors}), 400
    if "title" in data:
        t["title"] = data["title"].strip()
    if "description" in data:
        t["description"] = data["description"].strip() if data["description"] else ""
    if "completed" in data:
        t["completed"] = data["completed"]
    return jsonify(t), 200

@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    t = find_task(task_id)
    if not t:
        abort(404, description=f"Task {task_id} not found")
    tasks.remove(t)
    return "", 204

if __name__ == "__main__":
    print("Routes:", app.url_map)
    app.run(debug=True, host="127.0.0.1", port=5000)
