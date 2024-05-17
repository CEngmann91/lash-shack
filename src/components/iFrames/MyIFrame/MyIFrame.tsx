import './MyIFrame.scss';
import React, { useState, memo } from 'react'
import { LoadingSpinner } from '../..';

type MyIFrameProps = {
    className?: string;
    id?: string;
    source: string;
    allowFullScreen?: boolean;
    ariaHidden?: boolean;
}

const MyIFrame = memo(({ className, id, source, allowFullScreen, ariaHidden }: MyIFrameProps) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className={`frame-container ${className}`}>
            {isLoading && <LoadingSpinner title="Loading..." />}

            <iframe id={id} src={source} className={isLoading ? "hidden" : "visible"}
                allowFullScreen={allowFullScreen}
                aria-hidden={ariaHidden}
                referrerPolicy='no-referrer-when-downgrade'
                onLoad={() => setIsLoading(false)}
            />
        </div>
    )
});

export default MyIFrame