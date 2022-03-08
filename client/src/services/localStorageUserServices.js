import jwt_decode from 'jwt-decode'

const setToken = (token) => {
    localStorage.setItem('ACCESS_TOKEN', token)
}

const getToken = () => {
    return localStorage.getItem('ACCESS_TOKEN')
}

const removeToken = () => {
    localStorage.removeItem('ACCESS_TOKEN')
}

const getRole = () => {
    const token = getToken()
    if (token) {
        const role = jwt_decode(token).role
        if (role === 'user') {
            return 'user'
        }
        if (role === 'admin') {
            return 'admin'
        }
    }
    return 'guest'
}

const getUserName = () => {
    const token = getToken()
    if (token) {
        const fname = jwt_decode(token).name 
        return fname
    }
}

const getUserID = () => {
    const token = getToken()
    if (token){
        const UserID = jwt_decode(token).id
        return Number(UserID)
    }
}

const localStorageServices = {
    setToken,
    getToken,
    removeToken,
    getRole,
    getUserName,
    getUserID
}

export default localStorageServices