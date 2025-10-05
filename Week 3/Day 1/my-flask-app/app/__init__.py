from flask import Flask # type: ignore

def create_app():
    app = Flask(__name__, static_folder='static', template_folder='templates')

    from .routes import bp
    app.register_blueprint(bp)

    return app
