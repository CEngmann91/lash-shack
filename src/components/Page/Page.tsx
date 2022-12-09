import './Page.scss';
import React from 'react';

type PageProps = {
    id: string;
    className?: string;
    header?: string;
    headerClassName?: string;
    children: React.ReactNode;
    customHeader?: React.ReactNode;
}

function Page({ id, className, header, headerClassName, children, customHeader }: PageProps) {
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