import React, { useState , useEffect } from 'react'
import TweetContainer from './tweetcontainer'


function TweetHandle(props){
    const [ tweetsInit, setTweetsInit ] = useState([])
    const [ tweets, setTweets ] = useState([])
    const { newTweets } = props
    const { getTweets } = props
    const { username } = props
    useEffect(() => {
        if(username){
            getTweets(username)
            .then(response => {
                setTweetsInit(response.data.results)
            })
        }else{
            getTweets()
            .then(response => {
                setTweetsInit(response.data.results)
            })
        }
    }, [ getTweets, username ])

    useEffect(() => {
       let final = [...newTweets, ...tweetsInit]

       if (final.length !== tweets.length){
           setTweets(final)
       }
    }, [newTweets, tweets, tweetsInit])
    
    const handleRetweet = ( retweet ) => {
        setTweetsInit([retweet, ...tweets])
    } 

    return <TweetContainer tweets={tweets} handleRetweet={handleRetweet}></TweetContainer>
}

export default TweetHandle