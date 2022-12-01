import './Services.scss';
import React, { useEffect } from 'react'
import { Page } from '../../components';

export interface iServiceOption {
  name: string;
  price: number;
  duration: number;
}

export interface iService {
  active: boolean;
  id: number;
  name: string;
  options: iServiceOption[];
}

interface iProps {
  services: iService[];
}
const Services: React.FC<iProps> = ({ services, ...props }: iProps) => {
  
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [])

  return (
    <Page id='services' className='app__services' header='Services'>

      {services.map(({ active, id, name, options }) => 
        <section>
          <h1 className="title">{name}</h1>
          
          {/* price */}
          {/* duration */}
        </section>

      )}







      {/* <h1 className="eyelash-extenstions">Eyelash Extensions Full Sets</h1>
      <p>Classic Semi-Permanent - £45 - 60mins</p>
      <p>YY Express - £45 - 60mins</p>
      <p>Classic Xtra Semi-Permanent - £50 - 70mins</p>
      <p>Hybrid - £55 - 80mins</p>
      <p>Russian Volume - £65 - 90mins</p>
      <p>Wispy Volume - £70 - 90mins</p>
      <p>Mega Russian Volume - £75 - 90mins</p>


      <h1 className="eyelash-extenstions">Eyelash Extensions Infills</h1>
      <p>Classic Semi-Permanent Infills - £30 - 45mins</p>
      <p>YY Express infills - £35 - 45mins</p>
      <p>Classic Xtra Semi-Permanent Infills - £35 - 60mins</p>
      <p>Hybrid Infills - £40 - 60mins</p>
      <p>Russian Volume Infills - £45 - 60mins</p>
      <p>Mega Volume Infills - £50 - 60mins</p>


      <h1 className="eyelash-extenstions">Eyebrows</h1>
      <p>Eyebrow Tint - £7 - 10mins</p>
      <p>Eyebrow Wax & Tint - £14 - 20mins</p>
      <p>Microblading - £180 - 90mins</p>
      <p>Removal - £10 - 20mins</p>

      <h1 className="eyelash-extenstions">Lips</h1>
      <p>0.5ml - £90 - 30mins</p>
      <p>1.1ml - £140 - 30mins</p>
      <p>3ml Package - £275 - 60mins</p>

      <h1 className="eyelash-extenstions">Semi-Permanent Makeup</h1>
      <p>Ombre Brows</p>
      <p>Combo Brows</p>
      <p>Lip Blush</p>
      <p>Lip Liner</p> */}


    </Page>
  )
}

export default Services