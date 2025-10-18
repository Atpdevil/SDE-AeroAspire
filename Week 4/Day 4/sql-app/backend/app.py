from flask import Flask, jsonify
from flask_migrate import Migrate # type: ignore
from flask_cors import CORS
from models import db
from routes.tasks import tasks_bp
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db)
CORS(app)

app.register_blueprint(tasks_bp, url_prefix='/api/v1')

@app.route('/')
def home():
    return jsonify({"message": "API is running"})

if __name__ == "__main__":
    app.run(debug=True)
