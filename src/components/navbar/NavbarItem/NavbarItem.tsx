import './NavbarItem.scss';
import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';

interface iProps {
    id: string;
    to: string;
    children: React.ReactNode;
    onClick: (e?: React.MouseEvent<HTMLElement>) => void;
    idleClassName?: string;
    activeClassName?: string;
}
const NavbarItem: React.FC<iProps> = ({id, to, onClick, children, idleClassName = "link-item", activeClassName = "link-item-active", ...props}: iProps) => {
    const handleClick = useCallback(onClick, []);

    return (
        <NavLink
            key={id}
            to={to} end onClick={handleClick}
            className={({ isActive }) => (isActive ? activeClassName : idleClassName)}
        >{children}</NavLink>
    )
}

export default NavbarItem