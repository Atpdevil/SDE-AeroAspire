import pytest # type: ignore
from app import app, tasks

@pytest.fixture(autouse=True)
def clear_store():
    tasks.clear()
    # reset _next_id if needed, but keep simple for demo
    yield

def test_get_tasks_empty():
    client = app.test_client()
    res = client.get("/tasks")
    assert res.status_code == 200
    assert res.get_json() == []

def test_create_task_success():
    client = app.test_client()
    res = client.post("/tasks", json={"title":"T","description":"d","completed":False})
    assert res.status_code == 201
    body = res.get_json()
    assert body["title"] == "T"

def test_create_task_bad_json():
    client = app.test_client()
    res = client.post("/tasks", data="not-json", content_type="application/json")
    assert res.status_code == 400
