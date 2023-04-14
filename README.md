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
    "token": "your_access_token"
}
```

### Get Products
``` 
http http://127.0.0.1:8000/api/product/get/
```
`NOTE: No authentication required`

### Post Product - Auth Required
```
http POST http://127.0.0.1:8000/api/product/get/ "Authorization: Token 6a2e818cfef60dc9ab5ad8055905765f47607c1b" title="Product 5"
```

### Get Cart Products
```
http http://127.0.0.1:8000/api/product/cart/ "Authorization: Token c8fba13894d0ac0f1b2ac1ed153e668b4fb45327"
```

### Add Products to Cart
```
http POST http://127.0.0.1:8000/api/product/cart/ "Authorization: Token c8fba13894d0ac0f1b2ac1ed153e668b4fb45327" id=2
```