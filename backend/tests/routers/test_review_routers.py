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
    
def test_list_review_endpoint_success(client):
    payload = {
        "channel": "ESTABELECIMENTO",
        "customer_name": "API Tester 2",
        "message": "Testando a funcionalidade de listagem."
    }
    client.post("/review", json=payload)
    
    response = client.get("/review")
    
    assert response.status_code == 200
    
    data = response.json()
    assert "reviews" in data
    assert isinstance(data["reviews"], list)
    assert len(data["reviews"]) > 0
    
    first_review = data["reviews"][0]
    assert "created_at" in first_review
    assert "channel" in first_review
    assert "customer_name" in first_review
    assert "message" in first_review