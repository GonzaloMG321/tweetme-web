import axios from 'axios'
import { AppConfig } from '../constants/general'

const URL = `${AppConfig.URL_BACKEND}/tweets`

export function getTweets(){
    return axios.get(`${URL}/`)
}

export function getFeed(){
    return axios.get(`${URL}/feed/`)
}

export function getTweet(tweetId){
    return axios.get(`${URL}/${tweetId}/`)
}

export function createTweet(data){
    return axios.post(`${AppConfig.URL_BACKEND}/tweets/`, data)
}

export function likeUnlike(tweetId, action){
    return axios.post(`${URL}/${tweetId}/like/`, {
        action: action
    })
}

export function retweet(tweetId, content){
    return axios.post(`${URL}/${tweetId}/retweet/`, {
        content: content
    })
}

export function makeComment(tweetId, content){
    return axios.post(`${URL}/${tweetId}/comment/`, {
        content: content
    })
}

export function listComment(tweetId){
    return axios.get(`${URL}/${tweetId}/comment/`)
}