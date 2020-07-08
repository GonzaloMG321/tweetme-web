import React, { useState } from 'react'
import TweetHandle from './tweethandle'
import { createTweet, getTweets } from '../../services/tweet'

function FeedComponent(){
    const [ tweet, setTweet ] = useState('')
    const [ newTweets, setNewTweets ] = useState([])
    const handleSubmit = ( event ) => {
        event.preventDefault()
        setTweet('');

        const newTweet = {
            content: tweet
        }

        createTweet(newTweet)
        .then(response => {
            const newTweetResponse = response.data
            const newListTweets = [newTweetResponse, ...newTweets]
            setNewTweets(newListTweets)
        })
        .catch(error => {
            
        })
    }

    const handleTweet = (event) => {
        const { value } = event.target
        setTweet(value)
    }

    return <div className="col-md-7 col-sm-12 mx-auto mb-3">
        <div className="col-12 mb-3">
            <form onSubmit={handleSubmit}>
                <textarea required={true} className="form-control" value={tweet} onChange={handleTweet}></textarea>
                <button type="submit" className="btn btn-primary my-3">Tweet</button>
            </form>
        </div>
        <TweetHandle newTweets={newTweets} getTweets={getTweets}></TweetHandle>
    </div>
}

export default FeedComponent