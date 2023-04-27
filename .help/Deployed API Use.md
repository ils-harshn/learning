# Auth Using Token

### Get Access Token
```
http POST https://cartjsharshils.pythonanywhere.com/api/api-token-auth/  username="email" password="password"
```

### To refresh token
```
http POST https://cartjsharshils.pythonanywhere.com/api/api-token-auth/  username="email" password="password" refresh=True
```

#### Output
```
{
    "token": "token_here"
}
```

### Verify Token
```
http POST https://cartjsharshils.pythonanywhere.com/api/verify/ "Authorization: Token token_here"
```

### Register User
```
http POST https://cartjsharshils.pythonanywhere.com/api/create_user/  email="email_here" password="password_here" password2="password_here" first_name="first_name_here" last_name="last_name_here"
```

# Products API

### Get Products
``` 
http https://cartjsharshils.pythonanywhere.com/api/product/get/
```
`NOTE: No authentication required`

### Post Product - Auth Required & Permission Required To Add Products
```
http POST https://cartjsharshils.pythonanywhere.com/api/product/get/ "Authorization: Token token_here" title="product_title" price="price_here" discounted_price="discounted_price_here" discount_percentage="discount_percentage_here" rating="rating_here" about_product="about_product_here"
```

### Get Product Details from id and check if it exists in cart
```
http POST https://cartjsharshils.pythonanywhere.com/api/product/id/ "Authorization: Token token_here" id=id_here
```


# Cart API

### Get Cart Products
```
http https://cartjsharshils.pythonanywhere.com/api/product/cart/ "Authorization: Token token_here"
```

### Add Products to Cart
```
http POST https://cartjsharshils.pythonanywhere.com/api/product/cart/ "Authorization: Token token_here" id=id_here quantity=quantity_here
```

### Delete Products from Cart
```
http DELETE https://cartjsharshils.pythonanywhere.com/api/product/cart/ "Authorization: Token token_here" id=id_here
```

### Update product quantity in Cart
```
http PUT https://cartjsharshils.pythonanywhere.com/api/product/cart/ "Authorization: Token token_here" id=product_id quantity=quantity_here_to_update
```

# Order API

### Place Order From Cart
```
http POST https://cartjsharshils.pythonanywhere.com/api/product/order/cart/ "Authorization: Token token_here" address="address-here" pin_code="pin_code_here" phone="phone_number_here"
```

### Get User Orders
```
http GET https://cartjsharshils.pythonanywhere.com/api/product/orders/ "Authorization: Token token_here"
```

# Filter API's

### Product
```
http "https://cartjsharshils.pythonanywhere.com/api/product/search/?title='title_here'&price='price_here'&discounted_price='discount_here'&discount_percentage='discount_percentage_here'&rating='rating_here'"
```