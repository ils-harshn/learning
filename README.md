## Auth Using Token

### Get Access Token
```
http POST http://127.0.0.1:8000/api/api-token-auth/  username="admin@gmail.com" password="testing321"
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