import './GalleryPhoto.scss';
import React, { MouseEventHandler, useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { ActivityIndicator } from '../../../components';
// import ImageLoad from '../../../components/ImageLoad/ImageLoad';

interface iProps {
  id: number;
  imgSource: string;
  // onClick?: (e : React.MouseEventHandler<HTMLButtonElement>) => void;
  onClick?: () => void,
}


const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const GalleryPhoto: React.FC<iProps> = ({ id, imgSource, onClick, ...props }: iProps) => {
  const [isLoading, setIsLoading] = useState(true);
  // const handleClick = useCallback(() => onClick, [])

  useEffect(() => {

  }, [imgSource])


  return (
    <>
      {/* {isLoading &&
        <div className='app__flex' style={{ height: '100%' }}>
          <ActivityIndicator borderColour='rgba(239, 179, 183, 1)' borderSpinColour='rgba(16, 40, 121, 1)' />
        </div>
      } */}

      <motion.li id={id.toString()} className='gallery-photo gallery-photo-shadow' onClick={onClick}
        initial="hidden"
        animate="visible"
        variants={variants}
        viewport={{ once: true }}
        transition={{
          duration: 0.1,
          delay: 0.1 * id
        }}
      >
        <img src={imgSource} alt="" onLoad={() => setIsLoading(false)}/>
      </motion.li>
    </>




    // <li className='gallery-photo' onClick={onClick}>
    //   <ImageLoad src={imgSource} placeholder="" alt="" />
    // </li>
  )
}

export default GalleryPhoto