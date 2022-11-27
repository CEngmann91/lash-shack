import './DrawerButton.scss';
import React, { useCallback } from 'react';

interface iProps {
    isOpen: boolean;
    onClick: (e?: React.MouseEvent<HTMLElement>) => void;
}
const DrawerButton: React.FC<iProps> = ({ isOpen, onClick, ...props}: iProps) => {
    const handleClick = useCallback(onClick, []);

    return (
        <div className="menuBtn-container">
            <button onClick={handleClick} data-menuvisible={isOpen}>
                <i />
            </button>
        </div>
    )
}

export default DrawerButton