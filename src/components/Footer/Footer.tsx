import './Footer.scss';
import React from 'react'
import NavbarItem from '../navbar/NavbarItem/NavbarItem';
import { Email, Facebook, Instagram, Twitter, UpArrow } from '../../util/icons';
import { CONTACT, NAVIGATION } from '../../constants/constants';
import { logo, logo2 } from '../../util/images';

const Footer: React.FC<{}> = () => {

  return (
    <div className='app__footer'>
      <div className="app__footer--logo">
        <NavbarItem
          key={"home"} id={"home"}
          to={'/'} onClick={() => { }}
          idleClassName="link-item" activeClassName=""
        >
          <img src={logo2} />
        </NavbarItem>
      </div>



      <div className="app__footer--information">
        <div className="socials">
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

        <div className="location">
          <p className='new-line address'>{CONTACT.ADDRESS}</p>
        </div>
      </div>
    </div>




    // <div className='app__footer'>

    //   <ul className="app__footer--quick-links">
    //     <p className='title'>Quick Links</p>
    //     {NAVIGATION.ROUTE.map(({ id, name, to }) => (
    //       <li key={id}>
    //         <NavbarItem
    //           key={id} id={id}
    //           to={to} onClick={() => { }}
    //           idleClassName="" activeClassName=""
    //         >{name}</NavbarItem>
    //       </li>
    //     ))}
    //   </ul>


    //   <div className="app__footer--socials">
    //     <p className='title'>Find Us On</p>
    //     <div>
    //       <a href={CONTACT.FACEBOOK} className="" target="_blank" rel="noreferrer">
    //         <Facebook />
    //       </a>
    //       <a href={CONTACT.TWITTER} className="" target="_blank" rel="noreferrer">
    //         <Twitter />
    //       </a>
    //       <a href={CONTACT.INSTAGRAM} className="" target="_blank" rel="noreferrer">
    //         <Instagram />
    //       </a>
    //       <a href={CONTACT.EMAIL} className="" target="_blank" rel="noreferrer">
    //         <Email />
    //       </a>
    //     </div>
    //   </div>

    //   <div className="app__footer--location">
    //     <p className='title'>Location</p>
    //     <p className='new-line address'>{CONTACT.ADDRESS}</p>
    //     {/* <p className='email-address app__style-effect__underline'>{CONTACT.EMAIL}</p> */}
    //   </div>

    //   {/* <p className=''>Copyright © 2022 Lash Shack</p> */}

    // </div>
  )
}

export default Footer