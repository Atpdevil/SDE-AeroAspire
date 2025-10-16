from flask import Blueprint, request, jsonify
from app import db
from app.models import User

bp = Blueprint('main', __name__)

@bp.route("/users", methods=["GET"])
def get_users():
    username = request.args.get("username")
    email = request.args.get("email")
    
    query = User.query
    
    if username:
        query = query.filter(User.username.ilike(f"%{username}%"))
    if email:
        query = query.filter(User.email.ilike(f"%{email}%"))
    
    users = query.all()
    return jsonify([u.to_dict() for u in users])
