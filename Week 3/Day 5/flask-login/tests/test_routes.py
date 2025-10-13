# tests/test_routes.py
def test_public_route(client):
    rv = client.get("/api/public")
    assert rv.status_code == 200
    data = rv.get_json()
    assert data["msg"] == "this is public"
