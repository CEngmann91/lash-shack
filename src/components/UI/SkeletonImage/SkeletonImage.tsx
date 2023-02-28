import './SkeletonImage.scss';
import { useMemo, useState } from 'react'

type SkeletonImageProps = {
    className: string;
    src: string;
    alt?: string;
}
const SkeletonImage = ({ className, src, alt }: SkeletonImageProps) => {
    const [loaded, setLoaded] = useState(false);


    const url = useMemo(() => src, [src]);

    function removePlaceholder() {
        setLoaded(true);
    };

    return (
        <div className={`image-wrapper ${className}`} data-loaded={loaded}>
            <div className="placeholder"/>
            <img onLoad={removePlaceholder} onError={removePlaceholder} loading="lazy" src={url} alt={alt}/>
        </div>
    )
}

export default SkeletonImage