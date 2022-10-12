import './Services.scss';
import React, { useEffect } from 'react'
import { Page } from '../../components';

const Services = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <Page id='services' className='app__services' pageTitle='Services'>

    </Page>

    // <div className='app__services'>
    //   <h1 className="head-text title"><span>Services</span></h1>
    // </div>
  )
}

export default Services