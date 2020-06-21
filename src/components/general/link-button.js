import React from 'react'
import { Link } from '@reach/router' 

function LinkButton({ texto, linkTo, handleAction, extra_class=''}){
    
    return <Link to={ linkTo } onClick={handleAction} className={`nav-link ${extra_class}`}>
        {texto}
    </Link>

}

export default LinkButton