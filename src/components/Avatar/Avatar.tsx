import './Avatar.scss';
import React, { useEffect } from 'react'
import { Icon_Account } from '../../res/icons';

type AvatarProps = {
    url: string;
    className?: string;
    scale?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
const Avatar = ({ url, className, scale = '25px', onClick }: AvatarProps) => {

    useEffect(() => {
        
    }, [url])

    return (
        <div className={`avatar ${className}`} onClick={onClick} style={{ width: scale, height: scale }}>
            {!url ? <Icon_Account /> : <img src={url} key={url} alt="" />}
        </div>
    )
}

export default Avatar