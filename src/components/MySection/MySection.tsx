import './MySection.scss';
import React from 'react';

interface iProps {
    id?: string;
    className?: string;
    children: React.ReactNode;
}

const MySection: React.FC<iProps> = ({ id, className, children, ...props }: iProps) => {

    return (
        <div id={id} className={`app__mySection ${className}`}>
            {children}
        </div>
    )
}

export default MySection;