import './SkeletonImage.scss';
import { useMemo, useState } from 'react'

type SkeletonImageProps = {
    className: string;
    src: string;
    alt?: string;
    clickable?: boolean;
}
const SkeletonImage = ({ className, src, alt, clickable = true }: SkeletonImageProps) => {
    const [loaded, setLoaded] = useState(false);


    const url = useMemo(() => src, [src]);

    function removePlaceholder() {
        setLoaded(true);
    };

    return (
        <div className={`image-wrapper ${className}`} data-loaded={loaded} style={{ cursor: clickable ? 'pointer' : 'default' }}>
            <div className="placeholder"/>
            <img onLoad={removePlaceholder} onError={removePlaceholder} loading="lazy" src={url} alt={alt}/>
        </div>
    )
}

export default SkeletonImage