from flask import Blueprint, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity # type: ignore

api_bp = Blueprint("api", __name__)

@api_bp.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    user = get_jwt_identity()
    current_app.logger.info(f"Protected endpoint accessed by {user}")
    return jsonify({"hello": f"protected data for {user}"}), 200

@api_bp.route("/public", methods=["GET"])
def public():
    return jsonify({"msg": "this is public"}), 200
