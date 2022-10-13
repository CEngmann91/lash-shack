import './Page.scss';
import React from 'react';

interface iProps {
    id: string;
    className?: string;
    header: string;
    children: React.ReactNode;
}

const Page: React.FC<iProps> = ({id, className, header, children, ...props}: iProps) => {
    return (
        <div id={id} className={`main app__pad-hor ${className}`}>
            <header>
                <h1 className="head-text title"><span>{header}</span></h1>
            </header>
            {children}
        </div>
    )
}

export default Page;