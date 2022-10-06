import './Navbar.scss';
import React, { useState, useEffect } from 'react'
import { NAVIGATION } from '../../util/constants';
import logo from '../../assets/Logo.png';
import NavbarItem from './NavbarItem/NavbarItem';
import '../../util/styles.scss';

const Navbar = () => {
    const [scrolledDown, setScrolledDown] = useState(false);



    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const onScroll = () => {
        setScrolledDown((window.scrollY > 100))
    }

    return (
        <nav className={`navbar-nav ${scrolledDown ? 'navbar-nav--scroll' : ''}`}>
            <div className="navbar-nav--logo">
                <NavbarItem
                    key={"home"} id={"home"}
                    to={'/'} onClick={() => { }}
                    idleClassName="link-item" activeClassName=""
                >
                    <img src={logo} />
                </NavbarItem>



                {/* <a href='/'>
                    <img src={logo} />
                </a> */}
            </div>

            <ul className='navbar-nav--links'>
                {NAVIGATION.ROUTE.map(({ id, name, to }) => (
                    <li key={id}>
                        <NavbarItem
                            key={id} id={id}
                            to={to} onClick={() => { }}
                            idleClassName="" activeClassName="navbar-nav--links-active"
                        >{name}</NavbarItem>
                    </li>
                ))}
            </ul>


            <div className='navbar-nav--buttons'>
                <div className="border-button">
                    {/* <a href="" target="_blank" rel="noreferrer">Book Now</a> */}
                    Book Now
                </div>

                {/* <div className="border-button">
                    Call
                </div> */}

                {/* <div className="call">
                    <a href="" target="_blank" rel="noreferrer">Call</a>
                </div> */}
            </div>


        </nav>
    )
}

export default Navbar