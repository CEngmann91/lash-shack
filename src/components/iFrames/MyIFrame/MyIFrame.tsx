import './MyIFrame.scss';
import React, { useEffect, useState } from 'react'
import { LoadingSpinner } from '../..';

type MyIFrameProps = {
    className?: string;
    source: string;
    allowFullScreen?: boolean;
    ariaHidden?: boolean;
}
const MyIFrame = ({ className, source, allowFullScreen, ariaHidden }: MyIFrameProps) => {
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {

    }, [source])


    return (
        <div className={`frame-container ${className}`}>
            {isLoading && <LoadingSpinner title="Loading..." />}

            <iframe
                src={source}
                frameBorder="0"
                style={{ display: isLoading ? "none" : "flex", border: 0 }}
                allowFullScreen={allowFullScreen}
                aria-hidden={ariaHidden}
                // loading="lazy"
                referrerPolicy='no-referrer-when-downgrade'
                // tabIndex={0}
                onLoad={() => setIsLoading(false)}
            />
        </div>
    )
}

export default MyIFrame