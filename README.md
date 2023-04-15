## Auth Using Token

### Get Access Token
```
http POST http://127.0.0.1:8000/api/api-token-auth/  username="email" password="password"
```

### To refresh token
```
http POST http://127.0.0.1:8000/api/api-token-auth/  username="email" password="password" refresh=True
```

#### Output
```
{
    "token": "token_here"
}
```

### Get Products
``` 
http http://127.0.0.1:8000/api/product/get/
```
`NOTE: No authentication required`

### Post Product - Auth Required & Permission Required To Add Products
```
http POST http://127.0.0.1:8000/api/product/get/ "Authorization: Token token_here" title="product_title"
```

### Get Cart Products
```
http http://127.0.0.1:8000/api/product/cart/ "Authorization: Token token_here"
```

### Add Products to Cart
```
http POST http://127.0.0.1:8000/api/product/cart/ "Authorization: Token token_here" id=id_here quantity=quantity_here
```

### Delete Products from Cart
```
http DELETE http://127.0.0.1:8000/api/product/cart/ "Authorization: Token token_here" id=id_here
```