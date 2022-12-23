import './GalleryMediaCard.scss';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from '../../../../components';
import { Card } from '../../../../components/Cards';
import { GalleryItem } from '../Gallery';
import { VideoFrame } from '../../../../components/Frames';
import { Play } from '../../../../util/icons';

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

type GalleryMediaCardProps = {
  id: number;
  item: GalleryItem;
  // onClick?: (e : React.MouseEventHandler<HTMLButtonElement>) => void;
  onClick?: () => void,
}
const GalleryMediaCard = ({ id, item, onClick, ...props }: GalleryMediaCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  // const handleClick = useCallback(() => onClick, [])
  

  return (
    <Card className='gallery-media' onClick={onClick}>
      {item.type === "Image"
        &&
        <>
          {isLoading
            ?
            <ActivityIndicator className='app__absolute-center' borderColour='rgba(239, 179, 183, 1)' borderSpinColour='rgba(16, 40, 121, 1)' />
            : null}
          <img src={item.path} alt="" onLoad={() => setIsLoading(false)}/>
        </>
      }
      
      {item.type === "Video"
        &&
        <div className='video' data-category={item.type}>
          <VideoFrame source={item.path} />
          <div className="overlay">
            <Play />
          </div>
        </div>
      }
    </Card>




    // <>
    //   <motion.li id={id.toString()} className='gallery-photo' onClick={onClick}
    //     initial="hidden"
    //     animate="visible"
    //     variants={variants}
    //     viewport={{ once: true }}
    //     transition={{
    //       duration: 0.1,
    //       delay: 0.1 * id
    //     }}
    //   >
    //     <img src={imgSource} alt="" onLoad={() => setIsLoading(false)}/>
    //   </motion.li>
    // </>
  )
}

export default GalleryMediaCard