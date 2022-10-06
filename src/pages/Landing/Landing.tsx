import './Landing.scss';
import React from 'react';

const Landing = () => {
  return (
    <div id='home' className='app__landing app__flex'>
      <h1 className='head-text app__landing--name'><span>Lash Shack</span></h1>
      <p className='app__landing--slogan'>A fresh start begins here</p>

    </div>
  )
}

export default Landing