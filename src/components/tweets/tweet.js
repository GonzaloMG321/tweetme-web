import React, { useState } from 'react'
import { navigate } from '@reach/router'
import { likeUnlike as setLikeUnlike, retweet as retweetAction } from '../../services/tweet'

import { Link } from '@reach/router'
import { CommentIcon, LikeButtonFill, LikeButton, RetweetIcon, UserPicture, Comment } from '../general/tweet'
import { stopPropagation, getFechaPublicacion } from '../../utils/general'


function Tweet( props ){
    let { comentario } = props
    let { detail } = props;
    let { tweet } = props
    const userOriginal = tweet.user
    const nombreUsuarioOriginal = `${userOriginal.nombre}`
    const esUnRetwet = tweet.is_retweet
    
    if( esUnRetwet ){
        tweet = tweet.parent
    }

    const fecha = new Date(tweet.created)
    const srtFechaPublicacion = getFechaPublicacion( fecha )


    const { className } = props
    const { user } = tweet
    const [ like, setLike ] = useState(tweet.user_like_it)
    const [ likes, setLikes ] = useState(tweet.likes ? tweet.likes: 0)
    const [ mostrarInputComentario, setMostrarInputComentario] = useState(false)

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
        retweetAction(tweetId, '')
        .then(response => {
            props.handleRetweet(response.data)
        })
    }
    
    const handleDetail = (tweetId) =>{
        if(!comentario && !detail){
            navigate(`/tweets/${tweetId}`)
        }
    }

    let nombreUsuario = ''
    if (user){
        nombreUsuario = `${user.nombre} ${user.apellido_paterno}`
    }

    return <div className={className} onClick={() => {
        handleDetail(tweet.id)
    }}>
        <div className='d-flex'>
            <div>
                <UserPicture picture={ user.profile.picture }></UserPicture>
            </div>
            <div className='w-100'>
                { esUnRetwet ? <p className='mb-0 text-muted small'>{ nombreUsuarioOriginal } retwitió</p>: null}
                <Link to={`/profile/${user.username}`} className='small mb-1' onClick={(event) => {
                    event.stopPropagation()
                }}>
                <span className='text-dark font-weight-bold'>{ nombreUsuario }</span><span className="text-secondary "> @{user.username}  { srtFechaPublicacion }</span>
                </Link>
                <div>
                    <p className="mb-2">{tweet.content}</p>
                    { !comentario &&
                    <div>
                        <CommentIcon onClick={(event) => {
                            stopPropagation(event)
                            setMostrarInputComentario(true)
                        }}></CommentIcon>
                    { like ? 
                        <LikeButtonFill onClick={(event) => {
                            stopPropagation(event)
                            handleLikeUnlike(tweet.id, !like)
                        }} likes={ likes }></LikeButtonFill>
                        :
                        <LikeButton onClick={(event) => {
                            event.stopPropagation()
                            handleLikeUnlike(tweet.id, !like)
                        }} likes={ likes }></LikeButton>}
                        <RetweetIcon onClick= {(event) => {
                            stopPropagation(event)
                            retweet(tweet.id)
                        }}></RetweetIcon>
                    </div>
                    }              
                </div>
                <Comment tweetId={tweet.id} mostrar={mostrarInputComentario}
                        setMostrarInputComentario={ setMostrarInputComentario }></Comment>
            </div>
        </div>
    </div>
}

export default Tweet
