import React from 'react'

export function LoadingButton({ texto, type='button', onClick, className, loading=false}){
  return <button type={type} className={className} onClick={onClick} disabled={loading}>
    { loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
    {texto}
    </button>
}

function Loading(){
    return <div className="d-flex justify-content-center">
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
}

export default Loading