import './Card.scss';
import React, { useCallback } from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    // id?: number;
    className?: string;
    children: React.ReactNode;
    // onClick: (e?: React.MouseEvent<HTMLElement>) => void;
    onClick?: () => void;
}
function Card({ id, children, className, onClick, ...props }: CardProps) {
    // const handleClick = useCallback(onClick, []);

    return (
        <div id={id?.toString()} className={`card-root card-root-shadow ${className}`} onClick={onClick} {...props}>
            {children}
        </div>
    )
}

export default Card