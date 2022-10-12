import './Page.scss';
import React from 'react';

interface iProps {
    id: string;
    className: string;
    pageTitle: string;
    children?: React.ReactNode;
}

const Page: React.FC<iProps> = ({id, className, pageTitle, children, ...props}: iProps) => {
    return (
        <main id={id} className={`app__flex app__pad-hor ${className}`}>
            <header>
                <h1 className="head-text title"><span>{pageTitle}</span></h1>
            </header>
            {children}
        </main>
    )
}

export default Page;