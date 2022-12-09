import './NavbarItem.scss';
import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';

type NavbarItemProps = {
    to: string;
    children: React.ReactNode;
    onClick: (e?: React.MouseEvent<HTMLElement>) => void;
    idleClassName?: string;
    activeClassName?: string;
}
function NavbarItem({ to, onClick, children, idleClassName = "link-item", activeClassName = "link-item-active" }: NavbarItemProps) {
    const handleClick = useCallback(onClick, []);

    return (
        <NavLink
            to={to} end onClick={handleClick}
            className={({ isActive }) => (isActive ? activeClassName : idleClassName)}
        >{children}</NavLink>
    )
}

export default NavbarItem