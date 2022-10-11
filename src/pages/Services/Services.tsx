import './Services.scss';
import React, { useEffect } from 'react'

const Services = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className='app__services'>Services</div>
  )
}

export default Services