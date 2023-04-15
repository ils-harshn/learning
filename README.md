## Auth Using Token

### Get Access Token
```
http POST http://127.0.0.1:8000/api/api-token-auth/  username="admin@gmail.com" password="testing321"
```

### To refresh token
```
http POST http://127.0.0.1:8000/api/api-token-auth/  username="admin@gmail.com" password="testing321" refresh=True
```

#### Output
```
{
    "token": "95dcdd16b53ddb0aca89f6e9675515f24233033f"
}
```

### Get Products
``` 
http http://127.0.0.1:8000/api/product/get/
```
`NOTE: No authentication required`

### Post Product - Auth Required
```
http POST http://127.0.0.1:8000/api/product/get/ "Authorization: Token 95dcdd16b53ddb0aca89f6e9675515f24233033f" title="Product 5"
```

### Get Cart Products
```
http http://127.0.0.1:8000/api/product/cart/ "Authorization: Token 95dcdd16b53ddb0aca89f6e9675515f24233033f"
```

### Add Products to Cart
```
http POST http://127.0.0.1:8000/api/product/cart/ "Authorization: Token 95dcdd16b53ddb0aca89f6e9675515f24233033f" id=2
```