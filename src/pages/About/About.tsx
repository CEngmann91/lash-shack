import './About.scss';
import React, { useEffect } from 'react';
import { Page } from '../../components';
import { Parallax } from 'react-parallax';
import { photography } from '../../util/images';

const About = () => {

  return (
    <Parallax blur={3} bgImage={photography} strength={300}>
      <Page id='about' className='app__about' header='About'>
        <div className="overlay" />

        {/* <div className="box">Brings back memories...</div> */}



      </Page>
    </Parallax>

  )
}

export default About