import './GalleryViewerModal.scss';
import React from 'react'
import { motion } from 'framer-motion';
import Modal from '../../../../components/Modals/Modal';
import { GalleryItem } from '../Gallery';
import { VideoFrame } from '../../../../components/Frames';


const imgVariant = {
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

type GalleryViewerModalProps = {
    item: GalleryItem;
    onOpen: () => void;
    onClose: () => void;
    onNextPhoto: () => void;
    onPreviousPhoto: () => void;
}
const GalleryViewerModal = ({ item, onOpen, onClose, onNextPhoto, onPreviousPhoto, ...props }: GalleryViewerModalProps) => {


    return (
        <Modal className='app__gallery-viewer' closeButtonClassName='close-button' onOpen={onOpen} onClose={onClose} >
            {item.type === "Image" ?
                    <motion.img className='image' src={item.path} alt="enlarged pic" variants={imgVariant} />

                    // <button className='left-arrow' onClick={onPreviousPhoto}><LeftArrowHead /></button>
                    // <button className='right-arrow' onClick={onNextPhoto}><RightArrow /></button>
                : null}
            {item.type === "Video" ?
                <div className='video'>
                    <VideoFrame source={item.path} />
                </div>
                : null}
        </Modal>
    );
}

export default GalleryViewerModal