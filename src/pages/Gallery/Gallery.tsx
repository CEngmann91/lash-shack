import React, { useCallback, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/scss";
import "swiper/scss/effect-coverflow";
import 'swiper/css/navigation';
import "swiper/scss/pagination";
// import required modules
import { EffectCoverflow, Pagination } from "swiper";

import './Gallery.scss';
import { ImageBanner, LoadingSpinner, PageWrapper, SkeletonImage } from '../../components'
import { getAllDownloadURLRef } from '../../firebase/firebaseHelper';
import GalleryCard from "./GalleryCard/GalleryCard";
import { useScrollLock } from "../../hooks/useScrollLock";
import { motion } from "framer-motion";
import { GalleryCardClass } from "../../types/GalleryCardClass";
import { GalleryViewerModal } from "../../components/Modals";
import useGetGallery from "../../hooks/useGetGallery";

const variants = {
    // visible: {
    //     y: 0,
    //     opacity: 1,
    //     transition: {
    //         duration: 0.5,
    //         // delay: id * 0.1,
    //         ease: 'easeIn'
    //     }
    // },
    hidden: { opacity: 0, y: 50 },
}

const classKeys: GalleryCardClass[] = [
    "",
    "",
    "tall",
    "wide",
    "",
    "tall",
    "big",
    "",
    "tall",
    "big",
    "tall",
    "",
    "",
    "",
    "wide",
    "",
    "",
    "wide",
    "",
    "wide",
    "big",
    "",
    "",
    "big",
    "",
    "",
];

const Gallery = () => {
    const { photos } = useGetGallery();
    const [[page, direction], setPage] = useState([0, 0]);
    const [selected, setSelected] = useState({ key: -1, image: "" });
    const handleImageClick = useCallback((key: number, path: string) => {
        setPage([key, 0]);
        setSelected({ key, image: path });
    }, []);

    const handleClose = useCallback(() => {
        setSelected({ key: -1, image: "" });
    }, []);


    return (
        <PageWrapper title="Gallery">
            <ImageBanner title='Do You Love What You See?' subtitle='' />

            <section className="gallery__section">
                {!photos ? (
                    <div className="loading-container">
                        <LoadingSpinner title="Loading..." />
                    </div>
                ) : (
                    <>
                        <div className="grid-wrapper">
                            {photos?.map((path, key) =>
                                // <SkeletonImage className={classKeys[key]} src={path} />

                                <motion.div
                                    className={classKeys[key]}
                                    id={`${key}`}
                                    key={key}
                                    variants={variants}
                                    initial="hidden"
                                    viewport={{ once: true }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            duration: 0.3,
                                            delay: 0.2 + (key % 2 === 0 ? 0.2 : 0)
                                        }
                                    }}
                                    onClick={() => handleImageClick(key, path)}
                                >
                                    <img src={path} alt="" loading="lazy" />
                                </motion.div>
                            )}
                        </div>

                        <GalleryViewerModal
                            visible={selected.key !== -1}
                            imagePaths={photos}
                            page={page}
                            direction={direction}
                            setPage={setPage}
                            onClose={handleClose}
                        />
                    </>
                )}
            </section>
        </PageWrapper>
    );
}

export default React.memo(Gallery);