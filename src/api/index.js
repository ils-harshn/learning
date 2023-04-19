import axios from "axios"

export const getAccessToken = (email, password, refresh = false) => {
    return axios.post("https://cartjsharshils.pythonanywhere.com/api/api-token-auth/", {
        username: email,
        password: password,
        refresh: refresh,
    }
    )
        .then(res => res.data.token)
        .catch(res => false)
}

export const createUser = (email, password, password2, first_name, last_name) => {
    return axios.post("https://cartjsharshils.pythonanywhere.com/api/create_user/", {
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
    return axios.post("https://cartjsharshils.pythonanywhere.com/api/verify/", {}, {
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
    const url = `https://cartjsharshils.pythonanywhere.com/api/product/get/?limit=${limit}&offset=${offset}`
    return axios.get(url).then(res => res.data)
        .catch(res => false);
}

export const getProductDetailFromID = (id, token) => {
    const url = "https://cartjsharshils.pythonanywhere.com/api/product/id/"
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
    const url = "https://cartjsharshils.pythonanywhere.com/api/product/cart/"
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
    const url = "https://cartjsharshils.pythonanywhere.com/api/product/cart/"
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
    return axios.get("https://cartjsharshils.pythonanywhere.com/api/product/cart/", {
        headers: {
            Authorization: `Token ${token}`,
        }
    })
    .then(res => res.data)
    .catch(res => false);
}