import axios from 'axios'
import { AppConfig } from '../constants/general'

const URL = `${AppConfig.URL_BACKEND}/users`


export function createUser(user){
    return axios.post(`${URL}/signup/`, user)
}

export function getUser(username){
    return axios.get(`${URL}/${username}/`)
}

export function getUserTweets(username){
    return axios.get(`${URL}/${username}/tweets/`)
}

export function updateUser(username, data){
    return axios.put(`${URL}/${username}/`, data)
}