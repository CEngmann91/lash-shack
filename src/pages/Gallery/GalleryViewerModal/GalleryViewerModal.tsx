import './GalleryViewerModal.scss';
import React from 'react'
import { motion } from 'framer-motion';
import { Close, LeftArrow, RightArrow } from '../../../util/icons';
import { useEscKey, useToggle} from '../../../helpers/hooks';

const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
}
const item = {
    hidden: {
        scale: 1.2,
        transition: {
            duration: 0.1
        }
    },
    visible: {
        scale: 1,
        transition: {
            duration: 0.2
        }
    }
}

interface iProps {
    imgSrc: string;
    onOpen: () => void;
    onClose: () => void;
    onNextPhoto: () => void;
    onPreviousPhoto: () => void;
}
const GalleryViewerModal: React.FC<iProps> = ({ imgSrc, onOpen, onClose, onNextPhoto, onPreviousPhoto, ...props }: iProps) => {
    const { isOpen, toggleMe } = useToggle(true, onOpen, onClose);
    const { isPressed } = useEscKey();


    // const handleClick = () => {
    //     toggleMe();
    // }

    if (isPressed)
        toggleMe()

    return (
        <motion.div
            className='backdrop app__flex'
            variants={container}
            initial="hidden"
            animate={isOpen ? 'visible' : 'hidden'}
            exit='hidden'
            onClick={toggleMe}
        >
            <button className="close-button" onClick={toggleMe}><Close /></button>

            <motion.img src={imgSrc} alt="enlarged pic" variants={item} />
            
            {/* <button className='left-arrow' onClick={onPreviousPhoto}><LeftArrow /></button>
            <button className='right-arrow' onClick={onNextPhoto}><RightArrow /></button> */}
        </motion.div>
    )
}

export default GalleryViewerModal