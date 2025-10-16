from flask import Flask, request, jsonify
from models import db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return "Flask API is running! Use /users endpoint in Postman."

@app.route('/users', methods=['POST'])
def create_user():
    data = request.json
    user = User(username=data['username'], email=data['email'])
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "User created"}), 201

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{"id": u.id, "username": u.username, "email": u.email} for u in users])

@app.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.json
    user = User.query.get(id)
    if user:
        user.username = data['username']
        user.email = data['email']
        db.session.commit()
        return jsonify({"msg": "User updated"})
    return jsonify({"msg": "User not found"}), 404

@app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"msg": "User deleted"})
    return jsonify({"msg": "User not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
