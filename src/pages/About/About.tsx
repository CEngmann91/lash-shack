import './About.scss';
import React, { useEffect } from 'react';
import { MapView, Page } from '../../components';

const About = () => {

  return (
    <Page id='about' className='app__about'
      // header='Information'
      // customHeader={(
      //   <>
      //     <h1>Custom Header</h1>

      //   </>
      // )}
      headerClassName='app__about-title'>


      <div className="app__about--wrapper">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div><MapView /></div>
      </div>


      {/* <div className="overlay" /> */}

    </Page>

  )
}

export default About