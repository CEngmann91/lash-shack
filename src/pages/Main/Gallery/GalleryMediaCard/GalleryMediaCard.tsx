import './GalleryMediaCard.scss';
import React, { ReactNode, useEffect, useState } from 'react'
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
  


  const renderLoadingActivity = (): ReactNode => (
    <div className='app__item-loading' />
  )

  return (
    <Card className='gallery-media' onClick={onClick}>
      {item.type === "Image"
        &&
        <>
          {isLoading ? renderLoadingActivity() : null}
          <img src={item.path} alt="" onLoad={() => setIsLoading(false)} />
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