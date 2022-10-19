import './Footer.scss';
import React from 'react'
import NavbarItem from '../navbar/NavbarItem/NavbarItem';
import { Email, Facebook, Instagram, Twitter, UpArrow } from '../../util/icons';
import { CONTACT_EMAIL, NAVIGATION } from '../../constants/constants';

const Footer = () => {


  return (
    <div className='app__footer'>

      <ul className="app__footer--quick-links">
        <p className='title'>Quick Links</p>
        {NAVIGATION.ROUTE.map(({ id, name, to }) => (
          <li key={id}>
            <NavbarItem
              key={id} id={id}
              to={to} onClick={() => { }}
              idleClassName="" activeClassName=""
            >{name}</NavbarItem>
          </li>
        ))}
      </ul>


      {/* <div className="app__footer--quick-links">
        <p className='title'>Quick Links</p>
        {NAVIGATION.ROUTE.map()}
        <NavbarItem
          key={"home"} id={"home"}
          to={'/'} onClick={() => { }}
          idleClassName="" activeClassName=""
        >{'Home'}</NavbarItem>*/}
      {/* <a href=''>Home</a> */}
      {/* </div> */}

      <div className="app__footer--socials">
        <p className='title'>Find Us On</p>
        <div>
          <Facebook />
          <Twitter />
          <Instagram />
          <Email />
        </div>
      </div>

      <div className="app__footer--contact">
        <p className='title'>Contact</p>
        <p className='new-line address'>{"37 Mawney Road\nRomford\nRM7 7HL\n07435252126"}</p>
        {/* <a href=''> */}
          {/* <p>37 Mawney Road</p>
          <p>Romford</p>
          <p>RM7 7HL</p>
          <p>07435252126</p> */}
        {/* </a> */}
        <p>{CONTACT_EMAIL}</p>
      </div>
    </div>
  )
}

export default Footer