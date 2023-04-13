## Auth Using Token

### Get Access Token
```
http POST http://127.0.0.1:8000/api/api-token-auth  username="admin@gmail.com" password="testing321"
```
#### Output
```
{
    "token": "your_access_token"
}
```

### Get Access To Secured URLs
``` 
http http://127.0.0.1:8000/api/user/ "Authorization: Token your_access_token"
```