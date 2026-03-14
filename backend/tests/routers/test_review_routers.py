def test_create_review_endpoint_success(client):
    payload = {
        "channel": "WHATSAPP",
        "customer_name": "API Tester",
        "message": "Testing the API endpoint."
    }
    
    response = client.post("/review", json=payload)
    
    assert response.status_code == 201
    data = response.json()
    assert data["customer_name"] == "API Tester"
    assert data["channel"] == "WHATSAPP"
    assert "review_id" in data
    assert "created_at" in data

def test_create_review_endpoint_validation_error(client):
    # Missing required field 'channel'
    payload = {
        "customer_name": "API Tester",
        "message": "Testing validation."
    }
    
    response = client.post("/review", json=payload)
    
    assert response.status_code == 422