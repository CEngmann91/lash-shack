import './Card.scss';
import React, { useCallback } from 'react'

interface iProps {
    className?: string;
    children: React.ReactNode;
    // onClick: (e?: React.MouseEvent<HTMLElement>) => void;
    onClick?: () => void;
}
const Card : React.FC<iProps> = ({ children, className, onClick, ...props}: iProps) => {
    // const handleClick = useCallback(onClick, []);

    return (
        <div className={`card-root card-root-shadow ${className}`} onClick={onClick}>
            {/* <div> */}
                {children}
            {/* </div> */}
        </div>
    )
}

export default Card