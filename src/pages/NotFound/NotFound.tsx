import './NotFound.scss';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ALink } from '../../components';

const NotFound = () => {
  const navigate = useNavigate();


  return (
    <div className='app__notFound app__flex app__pad-hor'>
      <div className='main-404 app__flex'>
        <h1 className='head-text'>404</h1>
        <p className='not-found'>Not Found</p>
      </div>
      
      <label className="information">Ooops!! This page doesn't exist or is unavailable.</label>

      <ALink className={`border-button app__style-effect__shine`} onClick={() => navigate(-1)}>Go Back to Home</ALink>
    </div>
  )
}

export default NotFound