import './About.scss';
import React, { useEffect } from 'react';
import { Page } from '../../components';

const About = () => {



  return (
    <>
      <Page id='about' className='app__about' header='About'>

        <div className="box">Brings back memories...</div>





      </Page>


      <Page id='meet' className='app__about--banner' header='Meet Our Experts' headerClassName='banner--expert-title'>
        
      </Page>
    </>
  )
}

export default About