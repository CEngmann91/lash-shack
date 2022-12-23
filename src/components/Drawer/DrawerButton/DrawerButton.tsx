import './DrawerButton.scss';
import React, { ButtonHTMLAttributes, useCallback } from 'react';

interface DrawerButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    isOpen: boolean;
    onClick: (e?: React.MouseEvent<HTMLElement>) => void;
}
function DrawerButton({ isOpen, onClick, ...props }: DrawerButtonProps) {
    const handleClick = useCallback(onClick, []);

    return (
        <div className="sidebar-button-container">
            <button onClick={handleClick} data-menuvisible={isOpen} {...props}>
                <i />
            </button>
        </div>
    )
}

export default DrawerButton