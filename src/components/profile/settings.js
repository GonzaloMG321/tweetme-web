import React from 'react'
import { navigate } from '@reach/router'
import { useUser } from '../../hooks/userHook'
import Loading from '../general/loading'
import { updateUser } from '../../services/users'



function SettingProfile( { username }){
    const [ user, loading, nombre, apellidoPaterno, apellidoMaterno, biografia, picture ] = useUser(username)
    
    const onSubmit = (event) => {
        event.preventDefault()
        console.log(picture.file)
        const form = new FormData()
        form.append('nombre', nombre.value)
        form.append('apellido_paterno', apellidoPaterno.value)
        form.append('apellido_materno', apellidoMaterno.value)
        form.append('biografia', biografia.value)
        form.append('picture', picture.file)

        updateUser(username, form)
        .then(response => navigate(`/profile/${username}`))
        .catch(error => console.log(error))
    }

    if(loading){
        return <Loading></Loading>
    }

    return <div className="col-md-8 col-sm-12 mx-auto text-left">
        <h1>Edición de información</h1>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Seleccione una foto de perfil</label>
                <input type="file" className="form-control-file" onChange={picture.onChange}></input>
            </div>
            <div className="form-row">
                <div className="form-group col-md-4 col-sm-12">
                    <label>Nombre</label>
                    <input className="form-control" { ...nombre }></input>
                </div>
                <div className="form-group col-md-4 col-sm-12">
                    <label>Apellido paterno</label>
                    <input className="form-control" { ...apellidoPaterno }></input>
                </div>
                <div className="form-group col-md-4 col-sm-12">
                    <label>Apellido paterno</label>
                    <input className="form-control" { ...apellidoMaterno }></input>
                </div>
            </div>
            <div className="form-group">
                <label>Biografía</label>
                <textarea className="form-control" { ...biografia }></textarea>
            </div>
            <button type="submit" className="btn btn-primary rounded-pill">Guardar</button>
        </form>
    </div>
}

export default SettingProfile
