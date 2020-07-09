import React, { useState, useEffect } from 'react'
import { AppConfig } from "../../constants/general"
import { stopPropagation } from '../../utils/general'
import { makeComment, listComment } from '../../services/tweet'
import Tweet from '../tweets/tweet'

const DEFAULT_PICTURE = AppConfig.DEFAULT_PICTURE

export function UserPicture({ picture }){
    return <div className="picture_profile_mini m-2">
        <img src={picture ? `${picture}`: DEFAULT_PICTURE} alt='' className="img-fluid rounded-circle"></img>
    </div>
}


export const LikeButton = ({ onClick, likes }) => {
    return<span onClick={ onClick } className='mx-2 svg-cursor'><svg width="1em" height="1em" viewBox="0 0 16 16" className="mx-2 bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
    </svg>{ likes}</span>
}

export const LikeButtonFill = ({ onClick, likes }) =>{
    return <span  onClick={ onClick } className='mx-2 svg-cursor like-color'><svg width="1em" height="1em" viewBox="0 0 16 16" className="mx-2 bi bi-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
    </svg>{ likes }</span>
}

export const RetweetIcon = ({ onClick }) => {
    return <span onClick={ onClick } 
                 className='mx-2 svg-cursor'> 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='mx-2'><path d="M8.203 7l-1.594-2h3.391v2h-1.797zm2.797-2v2h3v-2h-3zm2 14v-2h-3v2h3zm8-5v-9h-6v2h4v7h-3l4 5 4-5h-3zm-12 5v-2h-4v-7h3l-4-5-4 5h3v9h6zm5-2v2h3.391l-1.594-2h-1.797z"/></svg>
    </span>
}

export const CommentIcon = ({ onClick }) => {
    return <span onClick={ onClick } 
                className='mx-2 svg-cursor'>
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className='mx-2'><path d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625l-1.993 6.368 6.946-3c1.705.439 3.334.641 4.864.641 7.174 0 12.136-4.439 12.136-9.634 0-5.812-5.701-10.007-12-10.007zm0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695l-5.258 2.271 1.505-4.808c-1.308-1.564-2.165-3.128-2.165-5.402 0-4.966 4.935-9.007 11-9.007zm-5 7.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/></svg>
    </span>
}


export function Comment({tweetId, mostrar, setMostrarInputComentario }){
    const claseMostrar = !mostrar ? 'd-none':'';
    const [ comentario, setComentario ] = useState("");
    const submitComment = event => {
        event.preventDefault()
        makeComment(tweetId, comentario)
        .then(response => {
            setMostrarInputComentario(false)
        })
    }

    const onChangeComentario = (event) => {
        const { value } = event.target
        setComentario( value )
    }

    return <div className={`my-3 ${claseMostrar}`}>
        <form onSubmit={submitComment}>
            <textarea 
                className="form-control"
                onClick={( event ) => {
                    stopPropagation(event)
                }}
                onChange={onChangeComentario}
                value={ comentario }
                ></textarea>
            <div className="my-2 d-flex justify-content-end">
                <button type="button" className="mx-1 btn btn-light btn-small"
                        onClick={( event ) => {
                            stopPropagation(event)
                            setMostrarInputComentario(false)
                        }}
                        >Cancelar</button>
                <button type="submit" className="mx-1 btn btn-primary btn-small"
                        onClick={( event ) => {
                            stopPropagation(event)
                        }}
                        >Responder</button>
            </div>
        </form>
    </div>
}


export function ListComments({ tweetId }){
    const [ comments, setComments ] = useState([])

    useEffect(() => {
        listComment(tweetId)
        .then(response => {
            setComments(response.data.results)
        })
        .catch()
    }, [ tweetId ])

    const mapComments = comments.map(comment => {
        return <Tweet
            key={ comment.id }
            detail={ true }
            tweet={ comment }
            comentario={ true }
            className="py-3 px-3 border border-top-0 border-bottom-0 bg-white text-dark" 
            >
        </Tweet>
    })
    return <>
        { mapComments }
    </>
}
