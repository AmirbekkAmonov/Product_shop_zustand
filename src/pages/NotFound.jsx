import React, { useEffect } from 'react'

function NotFound() {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  return (
    <div className='not-found'>
      <div className='container'>
        <img src="Error-404-Page-Not-Found.png" alt="" />
      </div>
    </div>
  )
}

export default NotFound