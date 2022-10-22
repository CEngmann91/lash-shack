// https://codeburst.io/how-to-progressively-load-images-in-react-using-hooks-80c50fd447cd

import './ImageLoad.scss';
import React, { useState, useEffect } from 'react';

interface iProps {
    src: string;
    placeholder: string;
    alt: string;
}
const ImageLoad: React.FC<iProps> = ({ src, placeholder, alt, ...props }: iProps) => {
    const [loading, setLoading] = useState(true);
    const [currentSrc, updateSrc] = useState(placeholder);


    useEffect(() => {
        // start loading original image
        const imageToLoad = new Image();
        imageToLoad.src = src;
        imageToLoad.onload = () => {
            // When image is loaded replace the src and set loading to false
            setLoading(false);
            updateSrc(src);
        }
    }, [src])

    return (
        <img
            src={currentSrc}
            style={{
                opacity: loading ? 0.5 : 1,
                transition: "opacity .15s linear"
            }}
            alt={alt}
        />
    )
}

export default ImageLoad