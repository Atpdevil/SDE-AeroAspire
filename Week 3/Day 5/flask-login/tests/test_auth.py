# tests/test_auth.py
import json

def test_register_login_and_protected(client):
    # Register new user
    rv = client.post("/auth/register", json={"username": "testuser", "password": "pass"})
    assert rv.status_code == 201

    # Bad login attempt
    rv = client.post("/auth/login", json={"username": "testuser", "password": "wrong"})
    assert rv.status_code == 401

    # Successful login
    rv = client.post("/auth/login", json={"username": "testuser", "password": "pass"})
    assert rv.status_code == 200
    data = rv.get_json()
    assert "access_token" in data
    token = data["access_token"]

    # Access protected without token
    rv = client.get("/api/protected")
    assert rv.status_code == 401  # JWT required

    # Access protected with token
    rv = client.get("/api/protected", headers={"Authorization": f"Bearer {token}"})
    assert rv.status_code == 200
    data = rv.get_json()
    assert "hello" in data
