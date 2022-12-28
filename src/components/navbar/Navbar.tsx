import './Navbar.scss';
import { logo } from '../../util/images';
import React from 'react'
import { BOOKING_URL } from '../../constants/constants';
import NavbarItem from './NavbarItem/NavbarItem';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useScroller } from '../../helpers/hooks';
import { menuItems } from '../../constants/menuItems';
import { Account } from '../../util/icons';
import { createUser } from '../../helpers/firebase/Utils';
import { useAuthContext } from '../../providers/AuthContextProvider';
import { Avatar } from '..';
import DropDown, { DropDownMenuItem } from '../DropDown/DropDown';
import { useNavigate } from 'react-router-dom';

type NavbarProps = {
    onAccountOpen: () => void;
}
function Navbar({ onAccountOpen }: NavbarProps) {
    const navigate = useNavigate();
    const scrolledDown = useScroller();
    const { profile, isAuthenticated, signOut } = useAuthContext();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        // stiffness: 100,
        // damping: 30,
        restDelta: 0.001
    });



    const renderAccountDropdown = () => {

        const menuItems: DropDownMenuItem[] = [
            {
                id: 0,
                title: "Dashboard",
                action: () => navigate('/dashboard')
            },
            {
                id: 1,
                title: "My Profile",
                action: () => {}
            },
            {
                id: 2,
                title: "History",
                action: () => {}
            },
            {
                id: 3,
                title: "Sign Out",
                action: () => signOut(() => {})
            }
        ]

        return (
            <div className='navbar-nav--account'>
                {isAuthenticated() ?
                    <DropDown menuClassName="navbar-dropdown"
                        menuComponent={ <Avatar url={profile?.photo_URL} onClick={() => {}} /> }
                        menuItems={menuItems}
                        menuItemsClassName="navbar-dropdown--item"
                    />
                    :
                    <Avatar url={profile?.photo_URL} onClick={() => onAccountOpen()} />
                }
            </div>
        );
    }


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
                {menuItems.map(({ id, title, to }) => (
                    <li key={id}>
                        <NavbarItem activeClassName="navbar-nav--links-active" to={to} onClick={() => { }}>
                            {title}
                        </NavbarItem>
                    </li>
                ))}
            </ul>

            {renderAccountDropdown()}


            {/* <a href={BOOKING_URL} className={`border-button app__style-effect__shine book-now-button app__mobile-hide`} target="_blank" rel="noreferrer">Book Now</a> */}
        </nav>
    )
}

export default Navbar