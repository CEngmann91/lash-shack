import './DrawerMenu.scss';
import { NAVIGATION } from '../../constants/constants';
import { Link, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useScrollLock } from '../../hooks/useScrollLock';
import { toggleDrawerOpened } from '../../res/funcs';
import images from '../../res/images';

type DrawerMenuProps = {
    isOpen: boolean;
    onClose: () => void;
}
const DrawerMenu = ({ isOpen, onClose }: DrawerMenuProps) => {
    const { lockScroll, unlockScroll } = useScrollLock();


    useEffect(() => {
        if (!isOpen) unlockScroll();
        else lockScroll();
    }, [isOpen])


    function closeMenu() {
        toggleDrawerOpened();
        onClose();
    }

    return (
        <div id="drawer">
            <nav>
                <div className="logo">
                    <Link to={"/"}>
                        <img src={images.LogoNoBG} alt="logo" />
                    </Link>
                </div>

                <ul className="menu">
                    {NAVIGATION.MAIN_ROUTES.map(({ title, to }, key) => (
                        <li key={key} data-text={title} onClick={closeMenu}>
                            <NavLink to={to} end
                                className={({ isActive }) => (isActive ? "link-item-active" : 'link-item')}>
                                    {title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default DrawerMenu