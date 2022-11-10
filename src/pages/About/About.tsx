import './About.scss';
import React, { useEffect } from 'react';
import { Page } from '../../components';
import { Parallax } from 'react-parallax';
import { photography } from '../../util/images';

const About = () => {

  return (
    <Page id='about' className='app__about'
      customHeader={(
        <>
          <h1>Test</h1>
          <h1>Test</h1>
          <h1>Test</h1>
          <h1>Test</h1>
          <h1>Test</h1>
        </>
      )}>
      {/* <div className="overlay" /> */}

      {/* <div className="box">Brings back memories...</div> */}

      {/* <h1>Test</h1> */}
    </Page>

  )
}

export default About