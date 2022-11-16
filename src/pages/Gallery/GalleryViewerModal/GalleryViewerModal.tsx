import './GalleryViewerModal.scss';
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { Close } from '../../../util/icons';


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
    setSelectedPhoto: React.Dispatch<React.SetStateAction<string>>
    // setSelectedPhoto: (value: string | null) => void;
}
const GalleryViewerModal: React.FC<iProps> = ({ selectedPhoto, setSelectedPhoto, ...props }: iProps) => {
    const [visible, setVisible] = useState(true);



    useEffect(() => {
        if (selectedPhoto) {
            // Prevents scrolling whilst the menu is visible.
            document.body.style.overflow = "hidden";
            setVisible(true);
        }
    }, [])


    const handleClick = () => {
        document.body.style.overflow = "scroll";
        setVisible(false);
    }

    return (
        <AnimatePresence onExitComplete={() => { if (!visible) setSelectedPhoto("") }}>
            {visible &&
                <motion.div
                    className='backdrop'
                    variants={container}
                    initial="hidden"
                    animate='visible'
                    exit='hidden'
                    onClick={handleClick}
                >
                    <motion.img src={selectedPhoto} alt="enlarged pic" variants={item} />
                    <button className="close-button" onClick={handleClick}>
                        <Close />
                    </button>
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default GalleryViewerModal