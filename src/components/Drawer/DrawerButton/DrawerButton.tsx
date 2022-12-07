import './DrawerButton.scss';
import React, { ButtonHTMLAttributes, useCallback } from 'react';

interface iProps extends React.HTMLAttributes<HTMLButtonElement> {
    isOpen: boolean;
    onClick: (e?: React.MouseEvent<HTMLElement>) => void;
}
const DrawerButton: React.FC<iProps> = ({ isOpen, onClick, ...props}: iProps) => {
    const handleClick = useCallback(onClick, []);

    return (
        <div className="menuBtn-container">
            <button onClick={handleClick} data-menuvisible={isOpen} {...props}>
                <i />
            </button>
        </div>
    )
}

export default DrawerButton