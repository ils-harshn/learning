import axios from "axios"


const baseURL = "https://cartjsharshils.pythonanywhere.com"
export const getAccessToken = (email, password, refresh = false) => {
    return axios.post(`${baseURL}/api/api-token-auth/`, {
        username: email,
        password: password,
        refresh: refresh,
    }
    )
        .then(res => res.data.token)
        .catch(res => false)
}

export const createUser = (email, password, password2, first_name, last_name) => {
    return axios.post(`${baseURL}/api/create_user/`, {
        email,
        password,
        password2,
        first_name,
        last_name,
    })
        .then(res => res.data)
        .catch(res => false)
}

export const is_token_available = async () => {
    let token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token == null || !token || token == undefined) {
        return false;
    }
    return axios.post(`${baseURL}/api/verify/`, {}, {
        headers: {
            Authorization: `Token ${token}`,
        }
    })
        .then(res => (res.status == 200))
        .catch(res => false);
}


export const get_token = () => {
    let token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token == null || !token || token == undefined) {
        return false;
    } else {
        return token;
    }
}

export const getProducts = (limit = 24, offset = 0) => {
    const url = `${baseURL}/api/product/get/?limit=${limit}&offset=${offset}`
    return axios.get(url).then(res => res.data)
        .catch(res => false);
}

export const getProductDetailFromID = (id, token) => {
    const url = `${baseURL}/api/product/id/`
    return axios.post(url, {
        id,
    }, {
        headers: {
            Authorization: `Token ${token}`,
        }
    }).then(res => res.data)
        .catch(res => false);
}

export const addProductToCartFromID = (id, quantity, token) => {
    const url = `${baseURL}/api/product/cart/`
    return axios.post(url, {
        id,
        quantity,
    }, {
        headers: {
            Authorization: `Token ${token}`,
        }
    }).then(res => res.data)
        .catch(res => false);
}

export const removeProductFromCartFromId = (id, token) => {
    const url = `${baseURL}/api/product/cart/`
    return axios.delete(url, {
        headers: {
            Authorization: `Token ${token}`,
        },
        data: {
            id,
        }
    })
        .then(res => res)
        .catch(res => false);
}

export const getCartProducts = (token) => {
    return axios.get(`${baseURL}/api/product/cart/`, {
        headers: {
            Authorization: `Token ${token}`,
        }
    })
        .then(res => res.data)
        .catch(res => false);
}


export const updateProductToCartFromID = (id, quantity, token) => {
    const url = `${baseURL}/api/product/cart/`
    return axios.put(url, { id, quantity }, {
        headers: {
            Authorization: `Token ${token}`,
        }
    }).then(res => res)
        .catch(res => false);
}

export const placeOrderFromCart = (address, pin_code, phone, token) => {
    const url = `${baseURL}/api/product/order/cart/`
    return axios.post(url, {
        address,
        pin_code,
        phone,
    }, {
        headers: {
            Authorization: `Token ${token}`,
        }
    }).then(res => res.data)
        .catch(res => false);
}

export const getOrders = (token) => {
    return axios.get(`${baseURL}/api/product/orders/`, {
        headers: {
            Authorization: `Token ${token}`,
        }
    })
        .then(res => res.data)
        .catch(res => false);
}