import React, { createContext, useState } from 'react'
import { setUpAxios, cleanSessionStorage, setTokenUsername } from './utils/user_auth'

export const Context = createContext()

const Provider = ({ children }) => {
    const [ isAuth, setIsAuth ] = useState(() => {
        return window.sessionStorage.getItem('token') != null
    })

    const [ nombre, setNombre ] = useState(() => {
        const nombreStorage = window.sessionStorage.getItem('nombre')
        return  nombreStorage ? nombreStorage: ''
    })

    const [ username, setUsername ] = useState(() => {
        const usernameStorage = window.sessionStorage.getItem('username')
        return  usernameStorage ? usernameStorage: ''
    })

    const value = {
        isAuth,
        nombre,
        username,
        activateAuth: token => {
            setIsAuth(true)
            setUpAxios(token)
            const [nombreToken, usernameToken ] = setTokenUsername(token)
            setNombre(nombreToken)
            setUsername(usernameToken)
        },
        removeAuth: () => {
            setIsAuth(false)
            setUpAxios()
            cleanSessionStorage()
            setNombre('')
            setUsername('')
        }
    }

    return <Context.Provider value={value}>
        {children}
    </Context.Provider>
}

export default {
    Provider,
    Consumer: Context.Consumer
}