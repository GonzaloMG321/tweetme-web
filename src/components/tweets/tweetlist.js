import React, { useState , useEffect, useContext } from 'react'
import TweetContainer from './tweetcontainer'
import { Context } from '../../Context'
import { getFeed } from '../../services/tweet'


function TweetHandle(props){
    const [ tweetsInit, setTweetsInit ] = useState([])
    const [ tweets, setTweets ] = useState([])
    const { newTweets } = props
    const { getTweets } = props
    const { username } = props
    
    const { isAuth } = useContext(Context)

    
    useEffect(() => {
        if(username){
            getTweets(username)
            .then(response => {
                setTweetsInit(response.data.results)
            })
        }else{
            if( isAuth ){
                getFeed()
                .then(response => {
                    setTweetsInit(response.data.results)
                })
                .catch(error=> {
                    console.log(error)
                })
            }else{
                getTweets()
                .then(response => {
                    setTweetsInit(response.data.results)
                })
            }
            
        }
    }, [getTweets, isAuth, username])

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