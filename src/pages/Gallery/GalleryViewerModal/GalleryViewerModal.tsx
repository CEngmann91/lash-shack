import './GalleryViewerModal.scss';
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { Close, LeftArrow, RightArrow } from '../../../util/icons';
import { useScrollLock } from '../../../helpers/hooks/useScrollLock';


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
    selectedPhoto: string;
    setSelectedPhoto: React.Dispatch<React.SetStateAction<string>>;

    selectedPhotoIndex: number;
    setSelectedPhotoIndex: React.Dispatch<React.SetStateAction<number>>;
}
const GalleryViewerModal: React.FC<iProps> = ({ selectedPhoto, setSelectedPhoto, selectedPhotoIndex, setSelectedPhotoIndex, ...props }: iProps) => {
    const [visible, setVisible] = useState(true);
    const { lockScroll, unlockScroll } = useScrollLock();



    useEffect(() => {
        // if (selectedPhoto) {
        //     preventScrolling();
        //     setVisible(true);
        // }


        if (!visible)
        {
            setSelectedPhoto("")
            unlockScroll();
        }
        else 
        {
            lockScroll();
        }

    }, [visible])


    const handleClick = () => {
        unlockScroll();
        setVisible(false);
    }

    return (
        <>
            {visible &&
                <motion.div
                    className='backdrop app__flex'
                    variants={container}
                    initial="hidden"
                    animate='visible'
                    exit='hidden'
                    // onClick={handleClick}
                >
                    <motion.img src={selectedPhoto} alt="enlarged pic" variants={item} />


                    <button className="close-button" onClick={handleClick}>
                        <Close />
                    </button>


                    <button className='left-arrow'><LeftArrow /></button>
                    <button className='right-arrow'><RightArrow /></button>
                </motion.div>
            }
        </>
    )
}

export default GalleryViewerModal