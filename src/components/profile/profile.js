import React, { useState, useEffect, useContext } from 'react'
import Loading, { LoadingButton } from '../general/loading'
import { getUserTweets, getUserInformation } from '../../services/users'
import './styles.css'
import TweetHandle from '../tweets/tweetlist'
import { Followers, Following} from './followers'
import { Context } from '../../Context'
import { AppConfig } from '../../constants/general'
import { useFollowUnfollow } from '../../hooks/userHook'

const DEFAULT_PICTURE = AppConfig.DEFAULT_PICTURE

const TAB_TWEETS = 'tweets'
const TAB_SIGUIENDO = 'siguiendo'
const TAB_SEGUIDORES = 'seguidores'

function BannerProfile({ 
        nombre, 
        username, 
        apellido_paterno='', 
        apellido_materno='', 
        profile={ picture: DEFAULT_PICTURE, biografia:''},
        follow_account=false
         }){
    
    const username_context = useContext(Context).username
    
    const { mensajeSeguir, followUnfollow, loading } = useFollowUnfollow(follow_account, username)

    return <div>
        <div className="banner-profile media">
            <img src={profile.picture ? profile.picture: DEFAULT_PICTURE}  className="h-75 img-fluid img-thumbnail rounded-pill" alt={nombre} />
            <div className="media-body mx-3">
                <h6>{nombre} {apellido_paterno} {apellido_materno}</h6>
                <p className="mb-1 text-muted small">@{username}</p>
                <p>{profile.biografia}</p>
            </div>
        </div>
        {
            username !==  username_context ? 
            <div className="d-flex flex-row-reverse">
                <LoadingButton 
                    texto={ mensajeSeguir }
                    onClick={ followUnfollow }
                    className='btn btn-primary'
                    loading={ loading }
                    ></LoadingButton>
            </div>: null
        }
    </div>
}

function NavTweet({ changeTab, actual=TAB_TWEETS }){
    const tweetsActivo = actual === TAB_TWEETS ? 'active': ''
    const siguiendoActivo = actual === TAB_SIGUIENDO ? 'active': ''
    const seguidoresActivo = actual === TAB_SEGUIDORES ? 'active': ''

    return <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <a className={`nav-item nav-link ${tweetsActivo}`} 
                data-toggle="tab" 
                href="#tweets" 
                role="tab" 
                aria-controls="nav-home" 
                aria-selected="true"
                onClick={() =>{
                    changeTab(TAB_TWEETS)
                }}
                >Tweets</a>
            <a className={`nav-item nav-link ${siguiendoActivo}`} 
                data-toggle="tab" 
                href="#siguiendo" 
                role="tab" 
                aria-controls="nav-profile" 
                aria-selected="false"
                onClick={() =>{
                    changeTab( TAB_SIGUIENDO )
                }}
                >Siguiendo</a>
            <a className={`nav-item nav-link ${seguidoresActivo}`} 
                data-toggle="tab" 
                href="#seguidores" 
                role="tab" 
                aria-controls="nav-contact" 
                aria-selected="false"
                onClick={() =>{
                    changeTab( TAB_SEGUIDORES )
                }}>Seguidores</a>
        </div>
    </nav>
    
}



function Profile({ username }){
    const [ user, setUser] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ tab, setTab ] = useState(TAB_TWEETS)

    useEffect(() => {
        setLoading(true)
        setTab(TAB_TWEETS)
        getUserInformation(username)
        .then(response => {
            setUser(response.data)
            setLoading(false)
        })
        
        return () => {
            console.log('Desmontando...')
        }
    }, [ username ])

    if(loading){
        return <Loading></Loading>
    }

    return <div>
        <BannerProfile {...user} ></BannerProfile>
        <NavTweet changeTab={setTab} actual={ tab }></NavTweet>
        <div className="col-md-8 col-sm-12">
            { tab === TAB_TWEETS ?
                <TweetHandle username={ username } newTweets={[]} getTweets={ getUserTweets }></TweetHandle>: null }
            {tab === TAB_SIGUIENDO ? <Following username={ username }></Following>: null}
            {tab === TAB_SEGUIDORES ? <Followers username={ username }></Followers>: null}
        </div>
    </div>
}

export default Profile