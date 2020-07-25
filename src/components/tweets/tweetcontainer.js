import React from 'react'
import Tweet from './tweet'

function TweetContainer(props){
    const { tweets } = props
    const { handleRetweet } = props
    return <div>
    { tweets.map(tweet => <Tweet key={tweet.id} tweet={tweet} handleRetweet={handleRetweet} className="py-4 px-3"></Tweet>) }
  </div>
}

export default TweetContainer