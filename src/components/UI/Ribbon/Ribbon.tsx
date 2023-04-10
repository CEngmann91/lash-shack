import './Ribbon.scss';
import React from 'react'

export interface RibbonProps {
    className?: string;
    title: string;
}
const Ribbon = ({ className, title }: RibbonProps) => {

    return (
        <div className={`ribbon ${className}`}>
            <span>{title}</span>
        </div>
    )
}

export default Ribbon