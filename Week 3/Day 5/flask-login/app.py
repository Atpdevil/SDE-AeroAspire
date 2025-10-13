from flask import Flask
from config import Config
from flask_jwt_extended import JWTManager

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    jwt = JWTManager(app)

    # import & register blueprints after jwt created
    from auth import auth_bp
    from routes import api_bp
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(api_bp, url_prefix="/api")

    return app

if __name__ == "__main__":
    create_app().run(debug=True)
