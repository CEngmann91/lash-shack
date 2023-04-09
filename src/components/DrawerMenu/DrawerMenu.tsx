import './DrawerMenu.scss';
import { NAVIGATION } from '../../constants/constants';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useScrollLock } from '../../hooks/useScrollLock';


type DrawerMenuProps = {
    isOpen: boolean;
    onClose: () => void;
}
const DrawerMenu = ({ isOpen, onClose }: DrawerMenuProps) => {
    const { lockScroll, unlockScroll } = useScrollLock();


    useEffect(() => {
        if (!isOpen)
            unlockScroll();
        else
            lockScroll();
    }, [isOpen])
    

    function getBody() {
        return document.querySelector('body');
    }

    function closeMenu() {
        getBody()?.classList.remove("open");
        onClose();
    }

    return (
        <div id="drawer">
            <nav>
                <ul className="menu">
                    {NAVIGATION.MAIN_ROUTES.map(({ title, to }, key) => (
                        <li key={key} data-text={title} onClick={closeMenu}>
                            <NavLink to={to}>{title}</NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default DrawerMenu