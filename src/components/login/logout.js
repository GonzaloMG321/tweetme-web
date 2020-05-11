import React, { useContext } from 'react'
import LinkButton from '../general/link-button'
import { Context } from '../../Context'

const TEXT_LOGOUT = 'Cerrar sesión'
const LINK_TO = '/login'

const TEXT_LOGIN = 'Iniciar sesión'

export function LogoutButtonComponent(){ 
    
    const { removeAuth } = useContext(Context)

    const handleLogout = () => {
        removeAuth()
    }
    
    return <LinkButton texto={TEXT_LOGOUT} linkTo={LINK_TO} handleAction={handleLogout}></LinkButton>  
}

export function LoginButtonComponent(){
    return <LinkButton texto={TEXT_LOGIN} linkTo={LINK_TO}></LinkButton>
}