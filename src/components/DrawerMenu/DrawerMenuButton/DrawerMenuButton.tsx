import './DrawerMenuButton.scss';
import { MouseEvent, useCallback } from 'react'
import { useScroller } from '../../../hooks/useScroller';

type DrawerMenuButtonProps = {
    isOpen: boolean;
    onClick: (e?: MouseEvent<HTMLElement>) => void;
}
const DrawerMenuButton = ({ isOpen, onClick }: DrawerMenuButtonProps) => {
  const scrolledDown = useScroller();
  const handleClick = useCallback(onClick, []);

    return (
        <div className={`mobile__menu_button ${scrolledDown ? "mobile__menu_button--scroll" : ""} app__device-hide-desktop`}>
            <span className='' onClick={handleClick} data-menuvisible={isOpen}>
                <i />
            </span>
        </div>
    )
}

export default DrawerMenuButton