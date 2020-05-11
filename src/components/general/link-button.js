import React from 'react'
import { Link } from '@reach/router' 

function LinkButton(props){
    const { texto } = props
    const { linkTo } = props
    const { handleAction } = props
    return <Link to={ linkTo } onClick={handleAction} className="nav-link">
        {texto}
    </Link>

}

export default LinkButton