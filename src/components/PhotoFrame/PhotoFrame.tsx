// https://codepen.io/Kaiyuan/pen/DjBRbV
import './PhotoFrame.scss';
import React, { useCallback } from 'react'

interface iProps {
    imgSource: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const PhotoFrame: React.FC<iProps> = ({ imgSource, onClick, ...props }: iProps) => {
    const handleClick = useCallback(() => onClick, [])

    return (
        <div className="photo-frame" onClick={handleClick}>
            <img src={imgSource} alt="" />
            {/* <img src="http://farm8.staticflickr.com/7129/7617079532_0fddbaa8cd_z.jpg" alt="" /> */}
        </div>
    )
}

export default PhotoFrame