import './Navbar.scss';
import { logo } from '../../util/images';
import React from 'react'
import { BOOKING_URL } from '../../constants/constants';
import NavbarItem from './NavbarItem/NavbarItem';
import { motion, useScroll, useSpring } from 'framer-motion';
// import SidebarMenu from '../Drawer/Drawer';
import { menuItems } from '../../constants/menuItems';
import useScrollHook from '../../helpers/hooks/useScroll';

const Navbar: React.FC<{}> = () => {
    const scrolledDown = useScrollHook();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        // stiffness: 100,
        // damping: 30,
        restDelta: 0.001
    });

    return (
        <nav className={`navbar-nav ${scrolledDown ? 'navbar-nav--scroll' : ''}`}>
            <motion.div className="progress-bar" style={{ scaleX }} />
            <div className="navbar-nav--logo">
                <NavbarItem to={'/'} onClick={() => { }} idleClassName="link-item" activeClassName="">
                    <img src={logo} />
                </NavbarItem>
            </div>

            <ul className='navbar-nav--links app__mobile-hide'
            //data-bb-colour={'rgba(255, 255, 255, 1)'}
            // {location.pathname === "/" ? 'rgba(255, 255, 255, 1)' : 'rgba(239, 179, 183, 1)'}
            >
                {menuItems.map(({ id, title, to }, index) => (
                    <li key={id}>
                        <NavbarItem to={to} onClick={() => { }} activeClassName="navbar-nav--links-active">
                            {title}
                        </NavbarItem>
                    </li>
                ))}
            </ul>

            <a href={BOOKING_URL} className={`border-button app__style-effect__shine book-now-button app__mobile-hide`} target="_blank" rel="noreferrer">Book Now</a>

            {/* <SidebarMenu /> */}
        </nav>
    )
}

export default Navbar