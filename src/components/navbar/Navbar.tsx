import './Navbar.scss';
import { logo } from '../../util/images';
import React, { useState, useEffect } from 'react'
import { NAVIGATION } from '../../constants/constants';
import NavbarItem from './NavbarItem/NavbarItem';
import { Menu } from '../../util/icons';
import { AnimatePresence, motion } from 'framer-motion';



const container = {
    closed: { y: '-100vh' },
    open: {
        y: 0,
        transition: {
            delayChildren: 0.5,
            // staggerChildren: 0.07,
        }
    }
}
const item = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
}

const Navbar = () => {
    const [scrolledDown, setScrolledDown] = useState(false);
    const [menuIsOpen, setMenuIsOpen] = useState(false);



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


            <div className='app__drawer'>
                <div className="app__drawer--menuBtn-container">
                    <button onClick={toggleMenu}>
                        {!menuIsOpen ? <Menu /> : "X"}
                    </button>
                </div>

                <AnimatePresence>
                    {menuIsOpen &&
                        <motion.div
                            className={`app__drawer--panel ${menuIsOpen && 'app__drawer--show'}`}
                            variants={container}
                            initial="closed"
                            animate='open'
                            exit='closed'
                            transition={{
                                default: { ease: "linear" }
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