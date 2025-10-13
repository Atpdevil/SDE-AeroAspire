# auth.py
from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt
import datetime

auth_bp = Blueprint("auth", __name__)

# temporary in-memory user store for demo - replace with DB in prod
users = {}

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    username = data.get("username")
    password = data.get("password")
    if not username or not password:
        return jsonify(msg="username and password required"), 400
    if username in users:
        return jsonify(msg="user exists"), 400
    users[username] = {"password": generate_password_hash(password)}
    return jsonify(msg="user created"), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    username = data.get("username")
    password = data.get("password")
    user = users.get(username)
    if not user or not check_password_hash(user["password"], password):
        return jsonify(msg="bad credentials"), 401

    # Custom claims: add roles or other data
    additional_claims = {"role": "admin" if username == "admin" else "user"}
    access_token = create_access_token(identity=username, additional_claims=additional_claims)
    refresh_token = create_refresh_token(identity=username)
    return jsonify(access_token=access_token, refresh_token=refresh_token), 200

@auth_bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    # optionally include same custom claims again
    access_token = create_access_token(identity=current_user)
    return jsonify(access_token=access_token), 200

@auth_bp.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(msg=f"Hello, {current_user}"), 200
