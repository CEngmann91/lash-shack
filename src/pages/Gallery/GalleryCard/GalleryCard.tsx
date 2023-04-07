import './GalleryCard.scss';
import { SkeletonImage } from '../../../components';
import { motion } from 'framer-motion';

type GalleryCardProps = {
    id: number;
    imgSource: string;
    onClick?: () => void,
}
const GalleryCard = ({ id, imgSource, onClick }: GalleryCardProps) => {

    const variants = {
        hidden: {
            opacity: 0,
            translateY: id % 2 === 0 ? -40 : 40
        },
        visible: {
            opacity: 1,
            translateY: 0
        },
    }


    return (
        <motion.li id={id.toString()} className='gallery-photo' onClick={onClick}
            initial="hidden"
            // animate="visible"
            whileInView='visible'
            variants={variants}
            viewport={{ once: true }}
            transition={{
                duration: 0.3,
                delay: id * 0.02
                // ease: [0.4, 0, .2, 1]
            }}
        >
            <div className="wrapper">
                <SkeletonImage className='' src={imgSource} alt="" />
            </div>
        </motion.li>


        // <motion.li id={id.toString()} className='gallery-photo' onClick={onClick}
        //     initial="hidden"
        //     animate="visible"
        //     variants={variants}
        //     viewport={{ once: true }}
        //     transition={{
        //         duration: 1,
        //         delay: 0.1 * id
        //     }}
        // >
        //     <SkeletonImage className='' src={imgSource} alt="" />
        // </motion.li>
    )
}

export default GalleryCard








/*import { SkeletonImage } from '../../../components';

type GalleryCardProps = {
    url: string;
}
const GalleryCard = ({ url }: GalleryCardProps) => <SkeletonImage className='' src={url} alt="" />

export default GalleryCard*/