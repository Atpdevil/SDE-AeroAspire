# tests/conftest.py
import pytest # type: ignore
from app import create_app

@pytest.fixture
def app():
    app = create_app()
    app.config.update({
        "TESTING": True,
        "JWT_SECRET_KEY": "test-jwt-secret",
        "LOG_FILE": "logs/test_app.log"
    })
    yield app

@pytest.fixture
def client(app):
    return app.test_client()
