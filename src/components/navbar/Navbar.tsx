import './Navbar.scss';
import { logo, logo2 } from '../../util/images';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import { BOOKING_URL, NAVIGATION } from '../../constants/constants';
import NavbarItem from './NavbarItem/NavbarItem';
import { Menu } from '../../util/icons';
import { AnimatePresence, motion, useScroll, useSpring, useViewportScroll } from 'framer-motion';



const container = {
    closed: { y: '-100vh' },
    open: {
        y: 0,
        transition: {
            // delayChildren: 0.5,
            // staggerChildren: 0.07,
        }
    }
}
const item = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
}

const Navbar = () => {
    // const location = useLocation();
    const [scrolledDown, setScrolledDown] = useState(false);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });


    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
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

    const toggleMenu = () => !menuIsOpen ? showMenu() : hideMenu()


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

            <ul className='navbar-nav--links'
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

            <a href={BOOKING_URL} className={`border-button book-now-button app__style-effect__shine app__mobile-hide`} target="_blank" rel="noreferrer">Book Now</a>

            <div className='app__drawer app__desktop-hide'>
                <div className="app__drawer--menuBtn-container">
                    <button onClick={toggleMenu} data-menuisopen={menuIsOpen}>
                        {!menuIsOpen ? <Menu /> : "X"}
                    </button>
                </div>

                <AnimatePresence>
                    {menuIsOpen &&
                        <motion.div
                            className={`app__drawer--panel`}
                            // ${menuIsOpen && 'app__drawer--show'}`}
                            variants={container}
                            initial="closed"
                            animate='open'
                            exit='closed'
                            transition={{
                                // default: { ease: "linear" }
                            }}
                        >
                            <motion.div variants={item}>
                                {NAVIGATION.ROUTE.map(({ id, name, to }) =>
                                    <NavbarItem
                                        key={id} id={id}
                                        to={to} onClick={hideMenu}
                                        idleClassName="" activeClassName="navbar-nav--links-active"
                                    >{name}</NavbarItem>
                                )}
                            </motion.div>
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
        </nav>
    )
}

export default Navbar