import './GalleryViewerModal.scss';
import { MouseEvent, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { Icon_ArrowDown, Icon_ArrowUp, Icon_Close } from '../../../res/icons';
import { useScrollLock } from '../../../hooks/useScrollLock';
import { clamp, joinClasses } from "../../../res/funcs";


const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        };
    }
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

type GalleryViewerModalProps = {
    visible: boolean;
    imagePaths: string[];

    page: number;
    direction: number;
    setPage: React.Dispatch<React.SetStateAction<[number, number]>>;
    onClose?: () => void;
}
const GalleryViewerModal: React.FC<GalleryViewerModalProps> = ({ visible, imagePaths, page, direction, setPage, onClose }: GalleryViewerModalProps) => {
    // const [[page, direction], setPage] = useState([0, 0]);

    // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
    // then wrap that within 0-2 to find our image ID in the array below. By passing an
    // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
    // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
    let imageIndex = clamp(page, 0, imagePaths.length - 1);

    // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
    // then wrap that within 0-2 to find our image ID in the array below. By passing an
    // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
    // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
    // let imageIndex = clamp(page, 0, imagePaths.length - 1);

    const paginate = (newDirection: number) => {
        let newValue = page + newDirection;

        // Loops gallery
        if (newValue < 0)
            newValue = imagePaths.length - 1;

        if (newValue > imagePaths.length - 1)
            newValue = 0;


        setPage([newValue, newDirection]);
    };

    return (
        // visible
        <div className={'gallery-container'}>
            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                    key={page}
                    src={imagePaths[imageIndex]}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                            paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                            paginate(-1);
                        }
                    }}
                />
            </AnimatePresence>
            <div className="next" onClick={() => paginate(1)}>
                <Icon_ArrowUp />
            </div>
            <div className="prev" onClick={() => paginate(-1)}>
                <Icon_ArrowDown />
            </div>

            <button className="close" onClick={onClose}>
                <Icon_Close />
            </button>
        </div>
    )
}

export default GalleryViewerModal








/*
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
*/