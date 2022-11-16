import './SkewedPage.scss';
import React from 'react';

interface iProps {
    id: string;
    className?: string;
    header?: string;
    headerClassName?: string;
    children: React.ReactNode;
    customHeader?: React.ReactNode;
    backgroundColour?: string;
}

const SkewedPage: React.FC<iProps> = ({ id, className, header, headerClassName, children, customHeader, backgroundColour, ...props }: iProps) => {
    return (
        <div className="main" style={{ background: (backgroundColour ? backgroundColour : "white") }}>
            <div className={`box ${className}`}>
                <div className="wrapper app__pad-hor">
                    <header>
                        {customHeader ?
                            customHeader
                            :
                            <h1 className={`head-text title ${headerClassName}`}
                            >{header}</h1>
                        }
                    </header>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default SkewedPage;