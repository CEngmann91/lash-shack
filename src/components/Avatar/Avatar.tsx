import './Avatar.scss';
import { useEffect, MouseEvent } from 'react'
import { Icon_Account } from '../../res/icons';
import SkeletonImage from '../UI/SkeletonImage/SkeletonImage';

type AvatarProps = {
    url: string;
    className?: string;
    scale?: string;
    borderRadius?: string;
    onClick?: (e: MouseEvent<HTMLElement>) => void;
}
const Avatar = ({ url, className, scale = '25px', borderRadius = '50%', onClick }: AvatarProps) => {

    useEffect(() => {
        
    }, [url])

    return (
        <div className={`avatar ${className}`} onClick={onClick} style={{ width:scale, height:scale, borderRadius:borderRadius }}>
            { !url ? <Icon_Account /> :  <SkeletonImage className='' key={url} src={url} alt="" /> }
        </div>
    )
}

export default Avatar