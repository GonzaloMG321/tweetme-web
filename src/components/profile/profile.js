import React from 'react'
import Loading from '../general/loading'
import { getUserTweets } from '../../services/users'
import './styles.css'
import TweetHandle from '../tweets/tweetlist'
import { useUser } from '../../hooks/userHook'
const DEFAULT_PICTURE = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRqr46h67Clm1h_FM50SqaPmVp2ETO_41NRHw6PKK6dBLqRZ7hh&usqp=CAU"

function BannerProfile({ nombre, username, apellido_paterno='', apellido_materno='', profile={ picture: DEFAULT_PICTURE, biografia:''} }){
    console.log(profile)
    return <div className="banner-profile media">
          <img src={profile.picture ? profile.picture: DEFAULT_PICTURE}  className="h-75 img-fluid img-thumbnail rounded-pill" alt={nombre} />
          <div className="media-body mx-3">
            <h6>{nombre} {apellido_paterno} {apellido_materno}</h6>
            <p className="mb-1 text-muted small">@{username}</p>
            <p>{profile.biografia}</p>
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
    const username = props.username

    const [ user, loading ] = useUser(username)
    console.log(user)
    if(loading){
        return <Loading></Loading>
    }

    return <div>
        <BannerProfile {...user} ></BannerProfile>
        <NavTweet></NavTweet>
        <div className="col-md-6 col-sm-12">
            <TweetHandle username={username} newTweets={[]} getTweets={getUserTweets}></TweetHandle>
        </div>
    </div>
}

export default Profile