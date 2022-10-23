import './Landing.scss';
import React from 'react';
import { Parallax } from 'react-parallax';
import { photography } from '../../util/images';
import { Eye, Pencil, Star } from '../../util/icons';

const Landing = () => {


  return (
    <Parallax blur={3} bgImage={photography} strength={200}>
      <div className="overlay" />
      <div id='home' className='app__landing app__flex'>

        <div className="title">
          <h1 className='head-text left'>Lash</h1><h1 className='head-text right'>Shack</h1>
        </div>

        {/* <h1 className='head-text app__landing--name'><span>Lash Shack</span></h1> */}
        <p className='app__landing--slogan'>New beginnings start here</p>
      </div>


      <div className='banner'>
        <div className="item">
          <Pencil className="icon" />
          <h1 className='title'>Latest Practises</h1>
          <label className='description'>Insert Information here</label>
          <div className="buttons">
            <button>Learn More</button>
          </div>
        </div>

        <div className="item">
          <div className='border'>
            <Star className="icon" />
            <h1 className='title'>Certified Institude</h1>
            <label className='description'>Insert Information here</label>
            <div className="buttons">
              <button>Learn More</button>
            </div>
          </div>
        </div>

        <div className="item">
          <Eye className="icon" />
          <h1 className='title'>Best Technicians</h1>
          <label className='description'>Insert Information here</label>
          <div className="buttons">
            <button>Learn More</button>
          </div>
        </div>
      </div>
    </Parallax>
  );
}

export default Landing