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