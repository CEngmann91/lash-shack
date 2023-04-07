import './GalleryViewerModal.scss';
import { MouseEvent, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { Icon_Close } from '../../../res/icons';
import { useScrollLock } from '../../../hooks/useScrollLock';

const container = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,

    }
}
const item = {
    hidden: {
        scale: 1.2,
    },
    visible: {
        scale: 1,
    }
}

type iProps = {
    visible: boolean;
    selectedPhoto: string;
    onNextClick?: () => void;
    onPreviousClick?: () => void;
    onClose?: () => void;
}
const GalleryViewerModal: React.FC<iProps> = ({ visible, selectedPhoto, onNextClick, onPreviousClick, onClose }: iProps) => {
    const { lockScroll, unlockScroll } = useScrollLock();


    const handleClick = () => {
        unlockScroll();

        if (onClose)
            onClose();
    }

    if (!visible)
        return <></>

    lockScroll();

    return (
        <div className='gallery_modal_content'>
            <motion.div
                className='tint'
                variants={container}
                initial="hidden"
                animate='visible'
                exit='hidden'
                transition={{
                    duration: 0.3
                }}
            ></motion.div>

            <motion.img
            // <img 
            src={selectedPhoto} alt="enlarged pic"
                // variants={item} initial="hidden" animate='visible'
            />

            <button className="close-button" onClick={handleClick}>
                <Icon_Close />
            </button>
        </div>


        // <>
        //     {visible &&
        //         <motion.div
        //             className='backdrop app__flex'
        //             variants={container}
        //             initial="hidden"
        //             animate='visible'
        //             exit='hidden'
        //             // onClick={handleClick}
        //         >
        //             <motion.img src={selectedPhoto} alt="enlarged pic" variants={item} />

        //             <button className="close-button" onClick={handleClick}>
        //                 <Icon_Close />
        //             </button>
        //         </motion.div>
        //     }
        // </>
    )
}

export default GalleryViewerModal