import './Page.scss';
import React from 'react';

interface iProps {
    id: string;
    className?: string;
    header?: string;
    headerClassName?: string;
    children: React.ReactNode;
    customHeader?: React.ReactNode;
}

const Page: React.FC<iProps> = ({ id, className, header, headerClassName, children, customHeader, ...props }: iProps) => {
    return (
        <div id={id} className={`main app__pad-hor ${className}`}>
            <div className='page-header'>
                {customHeader ?
                    customHeader
                    :
                    // (headerClassName ?
                    <h1 className={`head-text page-header-title ${headerClassName}`}>{header}</h1>
                        // :
                        // null)
                }
            </div>
            {children}
        </div>
    )
}

export default Page;