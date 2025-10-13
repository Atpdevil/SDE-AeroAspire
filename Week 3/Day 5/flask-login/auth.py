from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity # type: ignore
from werkzeug.security import generate_password_hash, check_password_hash
import datetime

auth_bp = Blueprint("auth", __name__)

# For simplicity: in-memory "user store". Replace with real DB.
users = {}

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    username = data.get("username")
    password = data.get("password")
    if not username or not password:
        return jsonify({"msg": "username and password required"}), 400
    if username in users:
        return jsonify({"msg": "username exists"}), 400
    pw_hash = generate_password_hash(password)
    users[username] = {"password": pw_hash, "created": datetime.datetime.utcnow().isoformat()}
    current_app.logger.info(f"New user registered: {username}")
    return jsonify({"msg": "user registered"}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    username = data.get("username")
    password = data.get("password")
    if not username or not password:
        return jsonify({"msg": "username and password required"}), 400
    user = users.get(username)
    if not user or not check_password_hash(user["password"], password):
        current_app.logger.warning(f"Failed login attempt for user: {username}")
        return jsonify({"msg": "bad credentials"}), 401
    access_token = create_access_token(identity=username)
    current_app.logger.info(f"User logged in: {username}")
    return jsonify(access_token=access_token), 200

@auth_bp.route("/whoami", methods=["GET"])
@jwt_required()
def whoami():
    username = get_jwt_identity()
    return jsonify({"username": username}), 200
