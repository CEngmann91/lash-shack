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

        <p className='app__landing--slogan'>New Beginnings Start Here</p>
      </div>



      <div className="app__landing--banner">
        <div className="item">
          <Pencil className="icon" />
          <h1 className='title'>Latest Practises</h1>
          <label className='description'>We follow a strict regime to ensure consistency throughout each of our clients.</label>
          <div className="buttons">
            <button>LEARN MORE</button>
          </div>
        </div>
        <div className="item">
          <div className='border'>
            <Star className="icon" />
            <h1 className='title'>Certified Institude</h1>
            <label className='description'>Fully Accredited</label>
            <div className="buttons">
              <button>LEARN MORE</button>
            </div>
          </div>
        </div>
        <div className="item">
          <Eye className="icon" />
          <h1 className='title'>Expert Technicians</h1>
          <label className='description'>A team of fully trained techinicians ready to provide an excellent & professional service.</label>
          {/* <div className="buttons"> */}
            <button>LEARN MORE</button>
          {/* </div> */}
        </div>
      </div>




      {/* <div className='banner'>
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
      </div> */}



    </Parallax>
  );
}

export default Landing