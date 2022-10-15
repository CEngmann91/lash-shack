import './GalleryPhoto.scss';
import React, { MouseEventHandler, useCallback } from 'react'
import { motion } from 'framer-motion';

interface iProps {
  id: string;
  imgSource: string;
  // onClick?: (e : React.MouseEventHandler<HTMLButtonElement>) => void;
  onClick?: () => void,
}

const GalleryPhoto: React.FC<iProps> = ({ id, imgSource, onClick, ...props }: iProps) => {
  // const handleClick = useCallback(() => onClick, [])

  return (
    <motion.li id={id.toString()} className='gallery-photo' onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 1,
        delay: (0.1 * Number(id))
      }}
    >
      <img src={imgSource} alt="" />
    </motion.li>
  )
}

export default GalleryPhoto