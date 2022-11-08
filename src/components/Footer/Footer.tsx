import './Footer.scss';
import React from 'react'
import NavbarItem from '../navbar/NavbarItem/NavbarItem';
import { Email, Facebook, Instagram, Twitter, UpArrow } from '../../util/icons';
import { CONTACT, NAVIGATION } from '../../constants/constants';

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


      <div className="app__footer--socials">
        <p className='title'>Find Us On</p>
        <div>
          <a href={CONTACT.FACEBOOK} className="" target="_blank" rel="noreferrer">
            <Facebook />
          </a>
          <a href={CONTACT.TWITTER} className="" target="_blank" rel="noreferrer">
            <Twitter />
          </a>
          <a href={CONTACT.INSTAGRAM} className="" target="_blank" rel="noreferrer">
            <Instagram />
          </a>
          <a href={CONTACT.EMAIL} className="" target="_blank" rel="noreferrer">
            <Email />
          </a>
        </div>
      </div>

      <div className="app__footer--contact">
        <p className='title'>Contact</p>
        <p className='new-line address'>{CONTACT.ADDRESS}</p>
        <p className='email-address app__underline-anim'>{CONTACT.EMAIL}</p>
      </div>

      {/* <p className=''>Copyright © 2022 Lash Shack</p> */}

    </div>
  )
}

export default Footer