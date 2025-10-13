from flask import Flask, jsonify
from config import Config
from flask_jwt_extended import JWTManager # type: ignore
import logging
from logging.handlers import RotatingFileHandler
import os

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Setup JWT
    jwt = JWTManager(app)

    # Setup logging
    os.makedirs(os.path.dirname(app.config['LOG_FILE']), exist_ok=True)
    handler = RotatingFileHandler(app.config['LOG_FILE'], maxBytes=10*1024*1024, backupCount=5)
    formatter = logging.Formatter("%(asctime)s %(levelname)s %(name)s: %(message)s")
    handler.setFormatter(formatter)
    handler.setLevel(logging.INFO)

    app.logger.setLevel(logging.INFO)
    app.logger.addHandler(handler)

    # Simple root route
    @app.route("/")
    def index():
        app.logger.info("Index route called")
        return jsonify({"msg": "Hello from Flask app"}), 200

    # Register blueprints (auth and others)
    from auth import auth_bp
    from routes import api_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(api_bp, url_prefix='/api')

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
