import './MySection.scss';
import React from 'react';

type MySectionProps = {
    id?: string
    className?: string
    children: React.ReactNode
}

function MySection({ id, className, children, ...props }: MySectionProps) {

    return (
        <div id={id} className={`app__mySection ${className}`}>
            {children}
        </div>
    )
}

export default MySection;