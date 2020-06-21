import { useEffect, useState } from "react";
import { getUser, followUnfollowUser } from "../services/users";
import { DEJAR_DE_SEGUIR, SEGUIR, UNFOLLOW, FOLLOW } from "../constants/general";


export const useUser = (username) => {
    const [ loading, setLoading ] = useState(true)
    const [ nombre, setNombre ] = useState('')
    const [ apellidoPaterno, setApellidoPaterno ] = useState('')
    const [ apellidoMaterno, setApellidoMaterno ] = useState('')
    const [ biografia, setBiografia ] = useState('')
    const [ file, setFile ] = useState('')

    const onChangeNombre = event => {
        setNombre(event.target.value)
    }

    const onChangeAP = event => {
        setApellidoPaterno(event.target.value)
    }

    const onChangeAM = event => {
        setApellidoMaterno(event.target.value)
    }

    const onChangeBiografia= event => {
        setBiografia(event.target.value)
    }

    const onChangeFile = event => {
        setFile(event.target.files[0])
    }

    useEffect(() =>{
        getUser(username)
        .then(response => {
            setNombre(response.data.nombre)
            setApellidoPaterno(response.data.apellido_paterno)
            setApellidoMaterno(response.data.apellido_materno)
            setBiografia(response.data.profile.biografia)
            setLoading(false);
        })
        .catch(() => {

        })
    }, [ username ])

    return [
            loading, 
            {
                value: nombre, 
                onChange:onChangeNombre
            },
            { 
                value: apellidoPaterno, 
                onChange: onChangeAP 
            },
            { 
                value: apellidoMaterno, 
                onChange: onChangeAM 
            },
            { 
                value: biografia, 
                onChange: onChangeBiografia 
            },
            {
                file: file,
                onChange: onChangeFile
            }
            
        ]
}


export const useFollowUnfollow = ( initialState = false, username) => {
    const [ mensajeSeguir, setMensjeSeguir ] = useState(initialState ? DEJAR_DE_SEGUIR: SEGUIR)
    const [ loading, setLoading ] = useState(false)
    const [ sigues, setSigues ] = useState(initialState)
    
    const followUnfollow = () => {
        const action = sigues ? UNFOLLOW: FOLLOW
        const mensaje = action === FOLLOW ? DEJAR_DE_SEGUIR: SEGUIR

        setLoading(true)
        followUnfollowUser(username, { action })
        .then(() => {
            setLoading(false)
            setMensjeSeguir(mensaje)
            setSigues( action === FOLLOW )
        })
        .catch(error => {
            setLoading(false)
            console.log( error )
        })
    }

    return {
        mensajeSeguir,
        followUnfollow,
        loading
    }
}