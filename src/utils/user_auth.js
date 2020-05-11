import axios from 'axios';
import jwt_decode from 'jwt-decode'

export const setUpAxios = (token) => {
    if(token){
        axios.defaults.headers.common["Authorization"] = `JWT ${token}`;
    }else{
        delete axios.defaults.headers.common["Authorization"]
    }
}

const decodeToken = (token) => {
    const jwtDecode = jwt_decode(token)
    const { nombre, username } = jwtDecode
    return [ nombre, username ]
}

export const setTokenUsername = ( token ) =>{
    const [ nombre, username] = decodeToken(token)
    sessionStorage.setItem('nombre', nombre)
    sessionStorage.setItem('username', username)
    window.sessionStorage.setItem('token', token)
    return [nombre, username]
}

export const cleanSessionStorage = () => {
    sessionStorage.removeItem('nombre')
    sessionStorage.removeItem('username')
    window.sessionStorage.removeItem('token')
}

