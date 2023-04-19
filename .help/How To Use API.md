# Auth Using Token

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

### Verify Token
```
http POST http://127.0.0.1:8000/api/verify/ "Authorization: Token token_here"
```

### Register User
```
http POST http://127.0.0.1:8000/api/create_user/  email="email_here" password="password_here" password2="password_here" first_name="first_name_here" last_name="last_name_here"
```

# Products API

### Get Products
``` 
http http://127.0.0.1:8000/api/product/get/
```
`NOTE: No authentication required`

### Post Product - Auth Required & Permission Required To Add Products
```
http POST http://127.0.0.1:8000/api/product/get/ "Authorization: Token token_here" title="product_title" price="price_here" discounted_price="discounted_price_here" discount_percentage="discount_percentage_here" rating="rating_here" about_product="about_product_here"
```

### Get Product Details from id and check if it exists in cart
```
http POST http://127.0.0.1:8000/api/product/id/ "Authorization: Token token_here" id=id_here
```


# Cart API

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

### Update product quantity in Cart
```
http PUT http://127.0.0.1:8000/api/product/cart/ "Authorization: Token 74ae84a916094295872b56328233729c09952001" id=product_id quantity=quantity_here_to_update
```