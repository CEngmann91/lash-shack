import './NavbarItem.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';

type NavbarItemProps = {
    to: string;
    children: React.ReactNode;
    idleClassName?: string;
    activeClassName?: string;
}
function NavbarItem({ to, children, idleClassName = "link-item", activeClassName = "link-item-active" }: NavbarItemProps) {

    return (
        <NavLink to={to} end
            className={({ isActive }) => (isActive ? activeClassName : idleClassName)}
        >{children}</NavLink>
    )
}

export default NavbarItem