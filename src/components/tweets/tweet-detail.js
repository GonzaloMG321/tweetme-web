import React, { useEffect, useState } from 'react'
import { getTweet, listComment } from '../../services/tweet'
import Loading from '../general/loading'
import Tweet from './tweet'
import Alert from '../general/alerta'

function TweetDetail({ id }){
    const [ tweet, setTweet ] = useState({})
    const [ isLoading, setIsLoading ] = useState(true)
    const [ retwiteado, setRetwiteado ] = useState(false)
    let timer = null
    
    useEffect(() => {
        getTweet(id)
        .then(response => {
            setTweet(response.data)
            setIsLoading(false)
        })
    }, [ id ])

    useEffect(() => {
        return () => {
            clearTimeout(timer)
        }
    },[timer])

    const handleRetweet = (data) => {
        setRetwiteado(true)
        timer = setTimeout(() => {
            setRetwiteado(false)
        }, 4000)
    }

    if(isLoading){
        return <Loading />
    }

    return <div className="col-md-8 col-sm-12">
        { retwiteado && <Alert mensaje="Retwiteado correctamente" className="alert alert-success"></Alert>}
        <Tweet 
            key={tweet.id} 
            tweet={tweet}
            handleRetweet={handleRetweet} 
            className="my-4 py-4 px-3 border bg-white text-dark" 
            displayButton={true}></Tweet>
        <div>
            comentarios
        </div>
    </div>
}

export default TweetDetail