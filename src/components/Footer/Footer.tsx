import './Footer.scss';
import React from 'react'
import NavbarItem from '../navbar/NavbarItem/NavbarItem';
import { Email, Facebook, Instagram, Phone, Twitter, UpArrow } from '../../util/icons';
import { CONTACT, DEVELOPER_URL } from '../../constants/constants';
import { logo } from '../../util/images';
import ALink from '../ALink/ALink';
import { menuItems } from '../../constants/menuItems';


type iSocial = {
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
    component: (<Instagram />),
    to: CONTACT.INSTAGRAM
  },
  {
    id: "Email",
    component: (<Email />),
    to: CONTACT.EMAIL
  }
]

function Footer() {

  return (
    <footer className='app__footer'>
      <section className="CompanyInfo">
        <header>Company</header>
        {/* <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
        <p>9</p>
        <p>10</p>
        <p>11</p> */}
      </section>
      <section className="Services">
        <header>Services</header>
        {menuItems.map(({ id, title, to }) =>
          <NavbarItem
            key={id} to={to} onClick={() => { }}
            idleClassName="link" activeClassName="link-active"
          >{title}</NavbarItem>
        )}
        {/* <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p> */}
      </section>
      <section className="SocialMedia">
        <header>Social Media</header>
        <section>
          <button className='border-button icon'><Instagram /></button>
          <button className='border-button icon'><Phone /></button>
          <button className='border-button icon'><Email /></button>

        </section>
      </section>

      <div className='baseline'>
        <ALink path='/' className='company-name'>Lash Shack Ltd</ALink>
        {/* <label className='company-name'>Lash Shack Ltd</label> */}
        <label className='divider'>-</label>
        <label className='copyright-text'>Copyright © 2023. All Rights Reserved.</label>
        <label className='divider'>|</label>
        <ALink path={DEVELOPER_URL} className='developer-link'>Developed by Christian Engmann</ALink>
      </div>








      {/* <div className="app__footer--logo">
        <NavbarItem to={'/'} onClick={() => { }} idleClassName="link-item" activeClassName="">
          <img src={logo} />
        </NavbarItem>
      </div>



      <div className="app__footer--information">
        <div className="socials">
          {socials.map(({ id, component, to }) => (
            <a key={id} href={to} className="" target="_blank" rel="noreferrer">
              {component}
            </a>
          ))}
        </div>

        <div className="location">
          <p className='new-line address'>{CONTACT.ADDRESS}</p>
        </div>
      </div>
    </div> */}












      {/* 
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
    //     //<p className='email-address app__style-effect__underline'>{CONTACT.EMAIL}</p>
    //   </div>

    //   <p className=''>Copyright © 2022 Lash Shack</p>
    */}

    </footer>

  )
}

export default Footer