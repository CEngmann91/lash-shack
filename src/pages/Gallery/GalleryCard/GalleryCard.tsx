import './GalleryCard.scss';
import React from 'react'
import { SkeletonImage } from '../../../components';

type GalleryCardProps = {
    url: string;
}
const GalleryCard = ({ url }: GalleryCardProps) => {
    
    return (
        <>
            <SkeletonImage className='' src={url} alt="" />
        </>
    )
}

export default GalleryCard