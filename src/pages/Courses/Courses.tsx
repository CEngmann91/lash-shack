import './Courses.scss';
import React, { useEffect } from 'react'

const Courses = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="app__courses">Courses</div>
  )
}

export default Courses