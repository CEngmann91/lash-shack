import './Courses.scss';
import React, { useEffect } from 'react'

const Courses = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="app__courses">
      <h1 className="head-text title"><span>Be Your Own Boss</span></h1>
      

      <p>Classic, Classic Xtra, Hybrid, Russian.</p>
      <p>Live Models</p>
      <p>In-depth Manuals</p>
      <p>Ongoing Support</p>
      <p>Fully Accredited</p>
      <p>Over 100 Students Qualified.</p>
    </div>
  )
}

export default Courses