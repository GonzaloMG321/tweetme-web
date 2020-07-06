import React, { useState } from 'react'
import { navigate } from '@reach/router'
import { likeUnlike as setLikeUnlike, retweet as retweetAction } from '../../services/tweet'

import { Link } from '@reach/router'
import { LoadingButton } from '../general/loading'
import { UserPicture } from '../profile/followers'

export function ParenTweet( { tweet } ){
    const displayButton = false

    return tweet.parent ? <div className="border ml-3 mb-3 p-3">
        <p className='mb-0 text-muted small'>Retweet</p>
        <Tweet tweet={tweet.parent} className="" displayButton={displayButton}></Tweet>
    </div>: null
}


function Tweet( props ){
    let { tweet } = props
    const userOriginal = tweet.user
    const nombreUsuarioOriginal = `${userOriginal.nombre}`
    const esUnRetwet = tweet.is_retweet
    
    if( esUnRetwet ){
        tweet = tweet.parent
    }


    const { className } = props
    const { displayButton } = props
    const { user } = tweet
    const [ like, setLike ] = useState(tweet.user_like_it)
    const [ likes, setLikes ] = useState(tweet.likes ? tweet.likes: 0)
    const [ loading, setLoading ] = useState(false)
    console.log(like)
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
        <div className='d-flex'>
            <div>
                <UserPicture picture={ user.profile.picture }></UserPicture>
            </div>
            <div>
                { esUnRetwet ? <p className='mb-0 text-muted small'>{ nombreUsuarioOriginal } retwitió</p>: null}
                <Link to={`/profile/${user.username}`} className='text-dark font-weight-bold small mb-1' onClick={(event) => {
                    event.stopPropagation()
                }}>
                { nombreUsuario }
                </Link>
            <div>
                <p className="mb-2">{tweet.content}</p>
                { displayButton && <div className="btn-group">
                { like ? 
                    <LikeButtonFill onClick={(event) => {
                        event.stopPropagation()
                        handleLikeUnlike(tweet.id, !like)
                    }} likes={ likes }></LikeButtonFill>
                    :
                    <LikeButton onClick={(event) => {
                        event.stopPropagation()
                        handleLikeUnlike(tweet.id, !like)
                    }} likes={ likes }></LikeButton>}
                    <RetweetIcon onClick= {(event) => {
                        event.stopPropagation()
                        retweet(tweet.id)
                    }}></RetweetIcon>
                </div> }
            </div>
            </div>
        </div>
    </div>
}

function LikeButton({ onClick, likes }){
    return<span onClick={ onClick } className='mx-2 svg-cursor'><svg width="1em" height="1em" viewBox="0 0 16 16" className="mx-2 bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
    </svg>{ likes}</span>
}

function LikeButtonFill({ onClick, likes }){
    return <span  onClick={ onClick } className='mx-2 svg-cursor like-color'><svg width="1em" height="1em" viewBox="0 0 16 16" className="mx-2 bi bi-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
    </svg>{ likes }</span>
}

function RetweetIcon({ onClick }){
    return <span onClick={ onClick } 
                 className='mx-2 svg-cursor'> 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.203 7l-1.594-2h3.391v2h-1.797zm2.797-2v2h3v-2h-3zm2 14v-2h-3v2h3zm8-5v-9h-6v2h4v7h-3l4 5 4-5h-3zm-12 5v-2h-4v-7h3l-4-5-4 5h3v9h6zm5-2v2h3.391l-1.594-2h-1.797z"/></svg>
    </span>
}


 export default Tweet
