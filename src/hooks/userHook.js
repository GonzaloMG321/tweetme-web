import { useEffect, useState, useRef } from "react";
import { getUser } from "../services/users";


export const useUser = (username) => {
    const [ user, setUser ] = useState(null)
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

            setUser(response.data)
            setLoading(false);
        })
        .catch(() => {

        })
    }, [ username ])

    return [ user, 
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
