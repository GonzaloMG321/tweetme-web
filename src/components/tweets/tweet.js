import React, { useState } from 'react'
import { navigate } from '@reach/router'
import ActionBtn from '../general/action'
import { likeUnlike as setLikeUnlike, retweet as retweetAction } from '../../services/tweet'

import { Link } from '@reach/router'
import { LoadingButton } from '../general/loading'

export function ParenTweet( { tweet } ){
    const displayButton = false

    return tweet.parent ? <div className="border ml-3 mb-3 p-3">
        <p className='mb-0 text-muted small'>Retweet</p>
        <Tweet tweet={tweet.parent} className="" displayButton={displayButton}></Tweet>
    </div>: null
}


function Tweet( props ){
    const { tweet } = props
    const { className } = props
    const { displayButton } = props
    const { user } = tweet
    const [ like, setLike ] = useState(tweet.user_like_it)
    const [ likes, setLikes ] = useState(tweet.likes ? tweet.likes: 0)
    const [ loading, setLoading ] = useState(false)

    const likeUnlike = like ? 'Dislike': 'Like'

    const handleLikeUnlike = (tweetId, likeTweet) =>{
        if (likeTweet){
            setLikes(likes + 1)
            setLike(true)
            setLikeUnlike(tweetId, 'like')
            .catch(error => {
                setLikes(likes)
                setLike(false)
            })
        }else{
            setLikes(likes - 1)
            setLike(false)
            setLikeUnlike(tweetId, 'unlike')
            .catch(error => {
                setLikes(likes)
                setLike(true) 
            })
        }
    }
    
    const retweet = ( tweetId ) => {
        setLoading(true)
        retweetAction(tweetId, '')
        .then(response => {
            props.handleRetweet(response.data)
            setLoading(false)
        })
    }
    
    const handleDetail = (tweetId) =>{
        navigate(`/tweets/${tweetId}`)
    }

    let nombreUsuario = ''
    if (user){
        nombreUsuario = `${user.nombre} ${user.apellido_paterno}(@${user.username})`
    }
    return <div className={className} onClick={() => {
        handleDetail(tweet.id)
    }}>
        { user && <Link to={`/profile/${user.username}`} className='text-muted small mb-1' onClick={(event) => {
            event.stopPropagation()
        }}><i className="fa fa-user" aria-hidden="true"></i> { nombreUsuario }</Link>}
        <div className="ml-2">
            <p>{tweet.content}</p>
            <ParenTweet tweet={tweet} />
            {displayButton && <div className="btn-group">
            <ActionBtn texto={likeUnlike} action={(event) => {
                event.stopPropagation()
                handleLikeUnlike(tweet.id, !like)
            }} className="btn btn-outline-primary btn-sm" likesChildren={<span className="badge">{likes}</span>}></ActionBtn>
           
            <LoadingButton 
                texto="Retweet" 
                onClick= {(event) => {
                    event.stopPropagation()
                    retweet(tweet.id)
                }}
                className="btn btn-outline-primary btn-sm" loading={loading}>
            </LoadingButton>
            </div> }
        </div>
    </div>
}


 export default Tweet
