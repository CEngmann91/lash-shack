import './Navbar.scss';
import { logo } from '../../util/images';
import React, { useState, useEffect } from 'react'
import { NAVIGATION } from '../../constants/constants';
import NavbarItem from './NavbarItem/NavbarItem';

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


            <div className='app__book-now-button-container app__mobile-hide'>
                <div className='border-button app__book-now-button'>Book Now</div>
            </div>


        </nav>
    )
}

export default Navbar