import React from 'react'
import preloader from '../assets/images/Spinner-1s-200px.svg'

const Preloader= () => {
  return (
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Preloader
