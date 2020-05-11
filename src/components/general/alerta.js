import React from 'react'

function Alert({ mensaje, className }){
    return <div className={className}>
        {mensaje}
  </div>
}

export default Alert