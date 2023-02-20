import './SkeletonImage.scss';
import React, { useRef, useState } from 'react'

type SkeletonImageProps = {
    className: string;
    src: string;
    alt?: string;
    // onClick: (e?: React.MouseEvent<HTMLElement>) => void;
}
const SkeletonImage = ({ className, src, alt }: SkeletonImageProps) => {
    const [loaded, setLoaded] = useState(false);

    function removePlaceholder() {
        setLoaded(true);
    };

    return (
        <div className={`image-wrapper ${className}`} data-loaded={loaded}>
            <div className="placeholder"/>
            <img onLoad={removePlaceholder} onError={removePlaceholder} loading="lazy" src={src} alt={alt}/>
        </div>
    )
}

export default React.memo(SkeletonImage)