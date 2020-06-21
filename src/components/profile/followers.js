import React, { useState, useEffect } from 'react'
import { getFollowers } from '../../services/users'
import { AppConfig } from '../../constants/general'
import LinkButton from '../general/link-button'
import { Link } from '@reach/router'
import Axios from 'axios'
import { useFollowUnfollow } from '../../hooks/userHook'
import { LoadingButton } from '../general/loading'
const DEFAULT_PICTURE = AppConfig.DEFAULT_PICTURE

function Follower({ follower }){
    const { username } = follower
    const { follow_account } = follower
    const nombreCompleto = `${follower.nombre} ${follower.apellido_paterno} ${follower.apellido_materno}(@${username})`
    const { picture } = follower.profile
    const url_profile = `/profile/${username}/`

    const { mensajeSeguir, followUnfollow, loading } = useFollowUnfollow(follow_account, username)
    
    return <li className="border-0 list-group-item d-flex justify-content-between align-items-center pl-0 pr-0">
        <div className="d-flex align-items-center">
            <Link to={ url_profile }>
                <div className="picture_profile_mini m-2">
                    <img src={picture ? `${picture}`: DEFAULT_PICTURE} alt='' className="img-fluid rounded-circle"></img>
                </div>
            </Link>
            <LinkButton 
                texto={ nombreCompleto } 
                linkTo={ url_profile }
                extra_class='text-muted'
                ></LinkButton>
        </div>
        <LoadingButton
                    texto={ mensajeSeguir }
                    onClick={ followUnfollow }
                    className='btn btn-primary'
                    loading={ loading }
                    ></LoadingButton>
    </li>

}

function Followers({ username }){
    const [ followers, setFollowers ] = useState([])

    useEffect(() => {
        let source = Axios.CancelToken.source();
        getFollowers( username, source )
        .then(response => {
            setFollowers(response.data)
        })
        .catch(error => {
            console.log(error)
        })

        return () =>{
            source.cancel('Cancelando peticion')
        }
    }, [ username ])

    const map_followers = followers.map((follower, index) => {
        return <Follower key={index} follower={follower}></Follower>
    })

    return <div>
        <ul className="list-group">
            { map_followers }
        </ul>
       
    </div>
}

export default Followers

