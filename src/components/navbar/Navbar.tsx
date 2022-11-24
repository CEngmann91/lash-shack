import './Navbar.scss';
import { logo, logo2 } from '../../util/images';
import React, { useState, useEffect } from 'react'
import { BOOKING_URL, NAVIGATION } from '../../constants/constants';
import NavbarItem from './NavbarItem/NavbarItem';
import { motion, useScroll, useSpring } from 'framer-motion';
import Sidebar from '../Drawer/Drawer';
import { ShoppingCart } from '../../util/icons';


const Navbar: React.FC<{}> = () => {
    // const location = useLocation();
    const [scrolledDown, setScrolledDown] = useState(false);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        // stiffness: 100,
        // damping: 30,
        restDelta: 0.001
    });
    const [count, setCount] = useState(1);



    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return function cleanup() {
            window.removeEventListener('scroll', onScroll)
        }
    }, [])

    const onScroll = () => setScrolledDown((window.scrollY > 100))

    const showMenu = () => {
        // Prevents scrolling whilst the menu is visible.
        document.body.style.overflow = "hidden";
        setMenuIsOpen(true);
    }

    const hideMenu = () => {
        // if (!menuIsOpen) return;
        document.body.style.overflow = "scroll";
        setMenuIsOpen(false);
    }

    const toggleMenu = () => !menuIsOpen ? showMenu() : hideMenu();




    return (
        <nav className={`navbar-nav ${scrolledDown ? 'navbar-nav--scroll' : ''}`}>
            <motion.div className="progress-bar" style={{ scaleX }} />
            <div className="navbar-nav--logo">
                <NavbarItem
                    key={"home"} id={"home"}
                    to={'/'} onClick={() => { }}
                    idleClassName="link-item" activeClassName=""
                >
                    <img src={logo2} />
                </NavbarItem>
            </div>

            <ul className='navbar-nav--links app__mobile-hide'
            //data-bb-colour={'rgba(255, 255, 255, 1)'}
            // {location.pathname === "/" ? 'rgba(255, 255, 255, 1)' : 'rgba(239, 179, 183, 1)'}
            >
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

            <a className='navbar-nav--shopping-cart app__desktop-hide'>
                {/* {scrolledDown &&
                <>
                    <ShoppingCart />
                    <div className="indicator" style={{ display: count > 0 ? 'flex' : 'none' }}>
                        <label>{count}</label>
                    </div>
                </>
                } */}
            </a>

            <a href={BOOKING_URL} className={`border-button book-now-button app__style-effect__shine app__mobile-hide`} target="_blank" rel="noreferrer">Book Now</a>

            <Sidebar />
        </nav>
    )
}

export default Navbar