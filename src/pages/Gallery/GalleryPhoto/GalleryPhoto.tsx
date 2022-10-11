import './GalleryPhoto.scss';
import React, { MouseEventHandler, useCallback } from 'react'

interface iProps {
  id: string;
  imgSource: string;
  // onClick?: (e : React.MouseEventHandler<HTMLButtonElement>) => void;
  onClick?: () => void,
}

const GalleryPhoto: React.FC<iProps> = ({ id, imgSource, onClick, ...props }: iProps) => {
  const handleClick = useCallback(() => onClick, [])

  return (
    <li id={id.toString()} className='gallery-photo' onClick={handleClick}>
      <img src={imgSource} alt="" />
    </li>
  )
}

export default GalleryPhoto