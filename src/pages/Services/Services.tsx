import './Services.scss';
import React, { useEffect } from 'react'
import { Page } from '../../components';

const Services = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <Page id='services' className='app__services' header='Services'>

    </Page>
  )
}

export default Services