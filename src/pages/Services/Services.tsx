import './Services.scss';
import React, { useEffect } from 'react'
import { Page } from '../../components';

const Services = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <Page id='services' className='app__services' header='Services'>
      <h1 className="eyelash-extenstions">Eyelash Extenstions Full Sets</h1>
      <p>Classic Semi-Permanent - £45 - 60mins</p>
      <p>YY Express - £45 - 60mins</p>
      <p>Classic Xtra Semi-Permanent - £50 - 70mins</p>
      <p>Hybrid - £55 - 80mins</p>
      <p>Russian Volume - £65 - 90mins</p>
      <p>Wispy Volume - £70 - 90mins</p>
      <p>Mega Russian Volume - £75 - 90mins</p>


      <h1 className="eyelash-extenstions">Eyelash Extenstions Infills</h1>
      <p>Classic Semi-Permanent Infills - £30 - 45mins</p>
      <p>YY Express infills - £35 - 45mins</p>
      <p>Classic Xtra Semi-Permanent Infills - £35 - 60mins</p>
      <p>Hybrid Infills - £40 - 60mins</p>
      <p>Russian Volume Infills - £45 - 60mins</p>
      <p>Mega Volume Infills - £50 - 60mins</p>


      <h1 className="eyelash-extenstions">Eyebrows</h1>
      <p>Eyebrow Tint - £7 - 10mins</p>
      <p>Eyebrow Wax & Tint - £14 - 20mins</p>
      <p>Mircoblading - £180 - 90mins</p>
      <p>Removal - £10 - 20mins</p>

      <h1 className="eyelash-extenstions">Lips</h1>
      <p>0.5ml - £90 - 30mins</p>
      <p>1.1ml - £140 - 30mins</p>
      <p>3ml Package - £275 - 60mins</p>

      <h1 className="eyelash-extenstions">Semi-Perminent Makeup</h1>
      <p>Onbre Brows</p>
      <p>Combo Brows</p>
      <p>Lip Blush</p>
      <p>Lip Liner</p>


    </Page>
  )
}

export default Services