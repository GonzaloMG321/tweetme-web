import axios from 'axios'
import { AppConfig } from '../constants/general'

const URL_BACKEND = `${AppConfig.URL_BACKEND}`


export function login(userData){
    return axios.post(`${URL_BACKEND}/login/`, userData)
}