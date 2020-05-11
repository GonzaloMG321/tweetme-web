import React, { useContext, useState } from 'react'
import ActionBtn from '../general/action'
import { login } from '../../services/auth'
import { Context } from '../../Context'
import LinkButton from '../general/link-button'

function LoginComponent(){
    const { activateAuth } = useContext(Context)
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        login({
            username: username,
            password: password
        })
        .then(response => {
            const token = response.data.access;
            activateAuth(token)
        })
    }

    const onChangeUsername = ( event ) => {
        const { value } = event.target
        setUsername(value)
    }


    const onChangePassword = ( event ) => {
        const { value } = event.target
        setPassword(value)
    }

    return <form onSubmit={handleSubmit}>
        <div className="form-group">
            <input type="text" value={username} placeholder="Nombre de usuario" className="form-control" onChange={onChangeUsername} />
        </div>
        <div className="from-group mb-3">
            <input type="password" value={password} placeholder="Contraseña" className="form-control" onChange={onChangePassword}/>
        </div>
        <div className="d-flex flex-column align-items-center">
            <ActionBtn type="submit" texto="Iniciar sesión" className="btn btn-primary btn-block"></ActionBtn>
            <LinkButton texto="Registrarse" linkTo="/signup"></LinkButton>
        </div>    
    </form>
}

export default LoginComponent