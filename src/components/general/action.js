import React from 'react'

function ActionBtn( props ){
    const { texto } = props
    const { action } = props
    const { className } = props
    const { likesChildren } = props
    const type = props.type ? props.type: "button";
    return <button type={type} className={className} onClick={action}>{ likesChildren }  {texto}</button>
}

export default ActionBtn