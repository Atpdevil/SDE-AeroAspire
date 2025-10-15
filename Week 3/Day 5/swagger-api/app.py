from flask import Flask, jsonify, request, send_from_directory
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_swagger_ui import get_swaggerui_blueprint

app = Flask(__name__)

app.config['JWT_SECRET_KEY'] = 'super-secret-key'
jwt = JWTManager(app)

users = {
    "user1": "password1",
    "user2": "password2"
}

SWAGGER_URL = '/swagger'
API_URL = '/swagger.yaml'

swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={'app_name': "JWT Flask API"}
)
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

# Serve swagger.yaml file
@app.route("/swagger.yaml")
def send_swagger():
    return send_from_directory('.', 'swagger.yaml')

@app.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400

    if username not in users or users[username] != password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

if __name__ == "__main__":
    app.run(debug=True)
