import './Footer.scss';
import React from 'react'
import NavbarItem from '../navbar/NavbarItem/NavbarItem';
import { Email, Facebook, Instagram, Twitter, UpArrow } from '../../util/icons';
import { CONTACT } from '../../constants/constants';
import { logo } from '../../util/images';


interface iSocial {
  id: string;
  component: React.ReactNode;
  to: string;
}
const socials: iSocial[] = [
  // {
  //   id: "Facebook",
  //   component: ( <Facebook /> ),
  //   to: CONTACT.FACEBOOK
  // },
  // {
  //   id: "Twitter",
  //   component: ( <Twitter /> ),
  //   to: CONTACT.TWITTER
  // },
  {
    id: "Instagram",
    component: ( <Instagram /> ),
    to: CONTACT.INSTAGRAM
  },
  {
    id: "Email",
    component: ( <Email /> ),
    to: CONTACT.EMAIL
  }
]

const Footer: React.FC<{}> = () => {

  return (
    <div className='app__footer'>
      <div className="app__footer--logo">
        <NavbarItem to={'/'} onClick={() => { }} idleClassName="link-item" activeClassName="">
          <img src={logo} />
        </NavbarItem>
      </div>



      <div className="app__footer--information">
        <div className="socials">
          {socials.map(({ id, component, to }, index) => (
            <a href={to} className="" target="_blank" rel="noreferrer">
              {component}
            </a>
          ))}
        </div>

        <div className="location">
          <p className='new-line address'>{CONTACT.ADDRESS}</p>
        </div>
      </div>
    </div>




    // <div className='app__footer'>

    //   <ul className="app__footer--quick-links">
    //     <p className='title'>Quick Links</p>
    //     {menuItems.map(({ id, name, to }) => (
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