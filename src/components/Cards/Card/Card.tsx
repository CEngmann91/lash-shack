import './Card.scss';
import React, { useCallback } from 'react'

type CardProps = {
    id?: number;
    className?: string;
    children: React.ReactNode;
    // onClick: (e?: React.MouseEvent<HTMLElement>) => void;
    onClick?: () => void;
}
function Card({ id, children, className, onClick }: CardProps) {
    // const handleClick = useCallback(onClick, []);

    return (
        <div id={id?.toString()} className={`card-root card-root-shadow ${className}`} onClick={onClick}>
            {children}
        </div>
    )
}

export default Card