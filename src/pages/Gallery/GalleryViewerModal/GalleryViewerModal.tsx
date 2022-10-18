import './GalleryViewerModal.scss';
import React, { useEffect } from 'react'
import { motion } from 'framer-motion';


interface iProps {
    selectedPhoto: string;
    setSelectedPhoto: React.Dispatch<React.SetStateAction<string>>
    // setSelectedPhoto: (value: string | null) => void;
}

const GalleryViewerModal: React.FC<iProps> = ({ selectedPhoto, setSelectedPhoto, ...props }: iProps) => {


    useEffect(() => {
        if (selectedPhoto.length > 0)
            // Prevents scrolling whilst the menu is visible.
            document.body.style.overflow = "hidden";
    }, [])


    const handleClick = () => {
        document.body.style.overflow = "scroll";
        setSelectedPhoto("");
    }

    return (
        <motion.div className='backdrop' onClick={handleClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >

            <motion.img src={selectedPhoto} alt="enlarged pic"
                initial={{ y: "-100vh" }}
                animate={{ y: 0 }}
            />
        </motion.div>
    )
}

export default GalleryViewerModal