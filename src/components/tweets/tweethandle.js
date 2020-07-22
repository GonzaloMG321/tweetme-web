import React, { useState , useEffect, useContext } from 'react'
import TweetContainer from './tweetcontainer'
import { Context } from '../../Context'
import { getFeed } from '../../services/tweet'
import { compareArrayTweets } from '../../utils/general'


function TweetHandle(props){
    const [ tweetsInit, setTweetsInit ] = useState([])
    const [ tweets, setTweets ] = useState([])
    const { newTweets } = props
    const { getTweets } = props
    const { username } = props
    const [ page, setPage ] = useState(1)
    const [ prevPage, setPrevPage ] = useState(1)
    
    const { isAuth } = useContext(Context)

    
    useEffect(() => {
        if(username){
            getTweets(username, page)
            .then(response => {
                setTweetsInit(response.data.results)
            })
        }else{
            if( isAuth ){
                getFeed( page )
                .then(response => {
                    setTweetsInit(response.data.results)
                })
                .catch(error=> {
                    console.log(error)
                })
            }else{
                getTweets( page )
                .then(response => {
                    setTweetsInit(response.data.results)
                })
            }
            
        }
    }, [getTweets, isAuth, username, page])

    useEffect(() => {
        let final = []
        if(page === prevPage){
            if(!compareArrayTweets(tweets, tweetsInit)){
                final= [...newTweets, ...tweetsInit]

                if (final.length !== tweets.length){
                    setTweets(final)
                }
            }
            
            
        }else if(page !== prevPage){
            
            if(!compareArrayTweets(tweets, tweetsInit)){
                final = [...newTweets, ...tweets, ...tweetsInit]
                setPrevPage(page)
                setTweets(final)
            }
            
        }
        
        
    }, [newTweets, tweets, tweetsInit, page, prevPage])
    
    const handleRetweet = ( retweet ) => {
        setTweetsInit([retweet, ...tweets])
    } 

    return <div>
        <TweetContainer tweets={tweets} handleRetweet={handleRetweet}></TweetContainer>
        <button onClick={() => {
            setPrevPage(page)
            setPage(page + 1)
        }}> Siguiente</button>
    </div>
}

export default TweetHandle