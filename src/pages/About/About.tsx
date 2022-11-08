import './About.scss';
import React, { useEffect } from 'react';
import { Page } from '../../components';
import { Parallax } from 'react-parallax';
import { photography } from '../../util/images';

const About = () => {

  return (
    // <Parallax blur={3} bgImage={photography} strength={200}>
      <Page id='about' className='app__about' header='About' headerClassName='app__about-title-header'>
        {/* <div className="overlay" /> */}

        {/* <div className="box">Brings back memories...</div> */}

        {/* <h1>Test</h1> */}

      </Page>
    // </Parallax>

  )
}

export default About