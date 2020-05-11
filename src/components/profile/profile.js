import React, { useEffect, useState } from 'react'
import Loading from '../general/loading'
import { getUser, getUserTweets } from '../../services/users'
import './styles.css'
import TweetHandle from '../tweets/tweetlist'
const DEFAULT_PICTURE = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRqr46h67Clm1h_FM50SqaPmVp2ETO_41NRHw6PKK6dBLqRZ7hh&usqp=CAU"

function BannerProfile({ picture = DEFAULT_PICTURE, nombre, username, biografia='' }){
    return <div className="banner-profile media">
          <img src={picture} className="h-75 img-fluid img-thumbnail rounded-pill" alt={nombre} />
          <div className="media-body mx-3">
            <h6>{nombre}</h6>
            <p className="mb-1 text-muted small">@{username}</p>
<p>{biografia}</p>
          </div>
    </div>
}

function NavTweet(){
    return <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
        <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Tweets</a>
        <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Fotos</a>
        <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Seguidores</a>
        </div>
    </nav>
}


function Profile(props){
    const [user, setUser] = useState(null)
    const username = props.username

    useEffect(() => {
        console.log('Para hacer peticion')
        getUser(username)
        .then(response => {
            setUser(response.data)
        })
        .catch((error) => {
            // Handle error
        })
    }, [ username ])

    if(!user){
        return <Loading></Loading>
    }

    return <div>
        <BannerProfile nombre={user.nombre} username={username} biografia={user.profile.biografia}></BannerProfile>
        <NavTweet></NavTweet>
        <div className="col-md-6 col-sm-12">
            <TweetHandle username={username} newTweets={[]} getTweets={getUserTweets}></TweetHandle>
        </div>
    </div>
}

export default Profile