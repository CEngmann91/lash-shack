import './Footer.scss';
import React from 'react'
import NavbarItem from '../navbar/NavbarItem/NavbarItem';
import { Email, Facebook, Instagram, Twitter, UpArrow } from '../../util/icons';
import { CONTACT_EMAIL, NAVIGATION } from '../../util/constants';

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
        <p className='title'>Socials</p>
        <div>
          <Facebook />
          <Twitter />
          <Instagram />
          <Email />
        </div>

        <button className='scroll-to-top'><UpArrow /></button>
      </div>

      <div className="app__footer--contact">
        <p className='title'>Contact</p>
        <p>Address Line 1</p>
        <p>Address line 2</p>
        <p>Town/City</p>
        <p>County</p>
        <p>Postcode</p>
        <p>07435252126</p>
        <p>{CONTACT_EMAIL}</p>
      </div>
    </div>
  )
}

export default Footer