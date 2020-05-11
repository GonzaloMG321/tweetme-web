import React, { useState } from 'react'
import { createUser } from '../../services/users'
import { navigate } from '@reach/router'

function Signup(props){
    const [ nombre, setNombre ] = useState('')
    const [ apellidoPaterno, setApellidoPaterno ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        const user = {
            email,
            username,
            password,
            password_confirmation: confirmPassword,
            nombre,
            apellido_paterno: apellidoPaterno
        }

        createUser(user)
        .then(response => {
            navigate('/login')
        })
    }

    const handleNombre = ( event ) =>{
        const { value } = event.target
        setNombre(value)
    }

    const handleApellidoPaterno = ( event ) =>{
        const { value } = event.target
        setApellidoPaterno(value)
    }

    const handleUsername = ( event ) =>{
        const { value } = event.target
        setUsername(value)
    }

    const handleEmail = ( event ) =>{
        const { value } = event.target
        setEmail(value)
    }

    const handlePassword = ( event ) =>{
        const { value } = event.target
        setPassword(value)
    }

    const handleConfirmPassword = ( event ) =>{
        const { value } = event.target
        setConfirmPassword(value)
    }

    return <div className="col-md-8 col-sm-12 mx-auto text-left">
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="form-group col">
                    <label>Nombre*</label>
                    <input 
                        className="form-control" 
                        required={true}
                        placeholder="Nombre" 
                        value={nombre} 
                        onChange={handleNombre}/>
                </div>
                <div className="form-group col">
                    <label>Apellido paterno*</label>
                    <input 
                        className="form-control"
                        required={true}
                        placeholder="Apellido paterno" 
                        value={apellidoPaterno} 
                        onChange={handleApellidoPaterno}/>
                </div>
            </div>
            <div className="row">
                <div className="form-group col">
                    <label>Nombre de usuario*</label>
                    <input 
                        className="form-control"
                        required={true}
                        placeholder="Nombre de usuario" 
                        value={username} 
                        onChange={handleUsername}/>
                </div>
                <div className="form-group col">
                    <label>Email*</label>
                    <input
                        type="email"
                        required={true}
                        className="form-control" 
                        placeholder="@" 
                        value={email} 
                        onChange={handleEmail}/>
                </div>
            </div>
            <div className="row">
                <div className="form-group col">
                    <label>Contraseña*</label>
                    <input 
                        type="password"
                        required={true}
                        className="form-control" 
                        placeholder="Contraseña" 
                        value={password} 
                        onChange={handlePassword}/>
                </div>
                <div className="form-group col">
                    <label>Confirmar contraseña*</label>
                    <input 
                        type="password" 
                        required={true}
                        className="form-control" 
                        placeholder="Confirmar contraseña" 
                        value={confirmPassword} 
                        onChange={handleConfirmPassword}/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary rounded-pill">Registrarse</button>
        </form>
    </div>
}

export default Signup