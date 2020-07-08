import React, { useState, useEffect } from 'react'
import { getFollowers, getFollowing } from '../../services/users'
import LinkButton from '../general/link-button'
import { Link } from '@reach/router'
import Axios from 'axios'
import { useFollowUnfollow } from '../../hooks/userHook'
import { LoadingButton } from '../general/loading'
import { UserPicture } from '../general/tweet'


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
                <UserPicture picture={ picture }></UserPicture>
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

export function Followers({ username }){
    const [ followers, setFollowers ] = useState([])

    useEffect(() => {
        let source = Axios.CancelToken.source();
        getFollowers( username, source )
        .then(response => {
            setFollowers(response.data.results)
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

export function Following({ username }) {
    const [ following, setFollowing] = useState([])

    useEffect(() => {
        let source = Axios.CancelToken.source();
        getFollowing( username, source )
        .then(response => {
            setFollowing(response.data.results)
        })
        .catch(error => {
            console.log(error)
        })

        return () =>{
            source.cancel('Cancelando peticion')
        }
    }, [ username ])

    const map_followings = following.map((follower, index) => {
        return <Follower key={index} follower={follower}></Follower>
    })

    return <div>
        <ul className="list-group">
            { map_followings }
        </ul>
       
    </div>
}
