import './GalleryPhoto.scss';
import React, { MouseEventHandler, useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { ActivityIndicator } from '../../../components';
import { Card } from '../../../components/Cards';
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
    <Card className='gallery-photo gallery-photo-shadow' onClick={onClick}>
      <img src={imgSource} alt="" onLoad={() => setIsLoading(false)}/>
    </Card>



    // <>
      /* <motion.li id={id.toString()} className='gallery-photo gallery-photo-shadow' onClick={onClick}
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
      </motion.li> */
    // </>




    // <li className='gallery-photo' onClick={onClick}>
    //   <ImageLoad src={imgSource} placeholder="" alt="" />
    // </li>
  )
}

export default GalleryPhoto