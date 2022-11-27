// Change to 3d carosell


import './Landing.scss';
import React, { useState } from 'react';
import { Parallax } from 'react-parallax';
import { Landing0, Landing1, Landing2, Landing3, Landing4, Landing5, Landing6, Landing7, Landing8, Shop } from '../../util/images';
import { Eye, Pencil, Star } from '../../util/icons';
import { Page } from '../../components';

const Landing = () => {
  const images = [
    {
      id: 0, src: Landing0
    },
    {
      id: 1, src: Landing5
    },
    {
      id: 2, src: Landing1
    },
    {
      id: 3, src: Landing6
    },
    {
      id: 4, src: Landing2
    },
    {
      id: 5, src: Landing7
    },
    {
      id: 6, src: Landing3
    },
    {
      id: 7, src: Landing8
    },
    {
      id: 8, src: Landing4
    },
  ]
  const [hoverChild, setHoverChild] = useState(0);





  return (
    <Page id='home' className='app__landing' header=''>
      <div className="heading app__flex">
        <div className="text-logo">
          <h1 className='head-text left'>Lash</h1><h1 className='head-text right'>Shack</h1>
        </div>
        <p>New Beginnings Start Here</p>
      </div>




      {/* <ul className='list'>
        {images.map(({ id, src }) => (
          <li key={id} onMouseEnter={() => setHoverChild(id)}
            style={{ width: (hoverChild === id ? 'calc(100vw / 4.5)' : "4rem") }}
          >
            <div className="item">
              <img src={src} />
            </div>
          </li>
        ))}
      </ul> */}
    </Page>








    // <Parallax blur={0} bgImage={Shop} strength={200}>
    //   <div className="overlay" />
    //   <div id='home' className='app__landing app__flex'>

    //     <div className="title">
    //       <h1 className='head-text left'>Lash</h1><h1 className='head-text right'>Shack</h1>
    //     </div>

    //     <p className='app__landing--slogan'>New Beginnings Start Here</p>
    //   </div>



    //   <div className="app__landing--banner">
    //     <div className="item">
    //       <Pencil className="icon" />
    //       <h1 className='title'>Latest Practises</h1>
    //       <label className='description'>We follow a strict regime to ensure consistency throughout each of our clients.</label>
    //       <div className="buttons">
    //         <button className='border-button app__style-effect__shine'>LEARN MORE</button>
    //       </div>
    //     </div>
    //     <div className="item">
    //       <div className='border'>
    //         <Star className="icon" />
    //         <h1 className='title'>Certified Institude</h1>
    //         <label className='description'>Fully Accredited</label>
    //         <div className="buttons">
    //           <button>LEARN MORE</button>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="item">
    //       <Eye className="icon" />
    //       <h1 className='title'>Expert Technicians</h1>
    //       <label className='description'>A team of fully trained techinicians ready to provide an excellent & professional service.</label>
    //         <button>LEARN MORE</button>
    //     </div>
    //   </div>
    // </Parallax>

  );
}

export default Landing