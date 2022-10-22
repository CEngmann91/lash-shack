import './Services.scss';
import React, { useEffect } from 'react'
import { Page } from '../../components';

const Services = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <Page id='services' className='app__services' header='Services'>
        <h1 className="eyelash-extenstions">Eyelash Extenstions</h1>
          <p>Classic Semi-Permanent - £45 - 70mins</p>
          <p>Classic Xtra Semi-Permanent - £50 - 70mins</p>
          <p>Russian Volume - £65 - 90mins</p>
          <p>Hybrid - £55 - 80mins</p>
          <p>Classic Semi-Permanent Infills - £30 - 45mins</p>
          <p>Classic Xtra Semi-Permanent Infills - £35 - 60mins</p>
          <p>Russian Volume Infills - £45 - 75mins</p>
          <p>Hybrid Infills - £40 - 60mins</p>
          <p>Mega Russian Volume - £75 - 90mins</p>
          <p>Wispy Volume - £70 - 90mins</p>
          <p>Removal - £10 - 20mins</p>
          <p>YY Express - £45 - 60mins</p>
          <p>YY Express infills - £35 - 45mins</p>
          <br/>
          <br/>

        <h1 className="eyelash-extenstions">Eyebrows & Eyelashes</h1>
        <p>Lash Lift & Tint - £40 - 45mins</p>
        <p>Eyebrow Tint - £7 - 10mins</p>
        <p>Eyebrow Wax & Tint - £14 - 20mins</p>
        
        <p>Eyelash Tint - £7 - 15mins</p>

    </Page>
  )
}

export default Services