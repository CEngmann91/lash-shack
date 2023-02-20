import './DrawerMenu.scss';
import React from 'react'
import { NAVIGATION } from '../../constants/constants';
import { NavLink } from 'react-router-dom';


type DrawerMenuProps = {
    isOpen: boolean;
    onClose: () => void;
}
const DrawerMenu = ({ isOpen, onClose }: DrawerMenuProps) => {

    if (!isOpen)
        return null;

    return (
        <div className='drawer app__device-hide-desktop' onClick={() => onClose()}>
            <div className="menu">
                <div className="navigation">
                    <ul className="nav--links">
                        {NAVIGATION.MAIN_ROUTES.map(({ title, to }, key) => (
                            <li className='nav--link-item' key={key}>
                                <NavLink to={to}>{title}</NavLink>
                                {/* <NavbarItem to={to} activeClassName="link-item-active" idleClassName='link-item'>{title}</NavbarItem> */}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default DrawerMenu