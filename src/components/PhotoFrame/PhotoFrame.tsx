// https://codepen.io/Kaiyuan/pen/DjBRbV
import './PhotoFrame.scss';
import React, { useCallback } from 'react'

interface iProps {
    imgSource: string;
    className?: string;
    width?: string | number;
    height?: string | number;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
const PhotoFrame: React.FC<iProps> = ({ imgSource, className, onClick, width = "22rem", height = "27rem", ...props }: iProps) => {
    const handleClick = useCallback(() => onClick, [])

    return (
        <div className={`photo-frame ${className}`} onClick={handleClick} style={{ width: width, height: height }}>
            <img src={imgSource} alt="" />
            {/* <img src="http://farm8.staticflickr.com/7129/7617079532_0fddbaa8cd_z.jpg" alt="" /> */}
        </div>
    )
}

export default PhotoFrame