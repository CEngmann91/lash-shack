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
import { useEffect, useState } from 'react'
import { LoadingSpinner, PageWrapper, SkeletonImage } from '../../components'
import { getAllDownloadURLRef } from '../../firebase/firebaseHelper';
import GalleryCard from "./GalleryCard/GalleryCard";
import GalleryViewerModal from "./GalleryViewerModal/GalleryViewerModal";
import { useScrollLock } from "../../hooks/useScrollLock";
import { motion } from "framer-motion";
import { GalleryCardClass } from "../../types/GalleryCardClass";

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
    const [imagePaths, setImagePaths] = useState<string[]>([]);
    const [[page, direction], setPage] = useState([0, 0]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const { lockScroll, unlockScroll } = useScrollLock();
    const [selected, setSelected] = useState({ key: -1, image: "" });


    useEffect(() => {
        if (imagePaths.length == 0)
            getAllPaths();

        return function cleanup() {
            // getAllPaths();
        }
    }, [])

    const getAllPaths = async () => {
        const paths = await getAllDownloadURLRef('gallery')
        setImagePaths(paths);
    }

    return (
        <PageWrapper title="Gallery">
            <section className="gallery__section">
                {imagePaths.length == 0 ? (
                    <div className="loading-container">
                        <LoadingSpinner title="Loading..." />
                    </div>
                ) : (
                    <>
                        <div className="grid-wrapper">
                            {imagePaths.map((path, key) =>
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
                                            delay: 0.2 + (key % 2 === 0 ? 0.2 : 0) //0.2 + (key * 0.2),
                                        }
                                    }}
                                    onClick={() => {
                                        setPage([key, 0]);
                                        setSelected({ key, image: path })
                                    }}
                                >
                                    <img src={path} alt="" />
                                </motion.div>
                            )}
                        </div>

                        <GalleryViewerModal
                            visible={selected.key !== -1}
                            imagePaths={imagePaths}
                            page={page}
                            direction={direction}
                            setPage={setPage}
                            onClose={() =>  setSelected({ key: -1, image: "" })}
                        />
                    </>
                )}
            </section>
        </PageWrapper>
    )


    // return (
    //     <PageWrapper title="Gallery">
    //         <div className="gallery__section">
    //             {imagePaths === null ?
    //                 <div className="loading-container">
    //                     <LoadingSpinner title="Loading..." />
    //                 </div>
    //                 :
    //                 <>
    //                     {/* <div className="container">
    //                         <ul className="image-gallery">
    //                             {imagePaths.map((path, key) =>
    //                                 <GalleryCard key={key} id={key} imgSource={path}
    //                                     onClick={() => setSelected({ key, image: path })}
    //                                 />
    //                             )}
    //                         </ul>
    //                     </div>


    //                     <GalleryViewerModal visible={selected.key != -1}
    //                         selectedPhoto={selected.image}
    //                         onNextClick={() => {}} onPreviousClick={() => {}}
    //                         onClose={() => setSelected({ key: -1, image: "" })}
    //                     /> */}
    //                 </>
    //             }
    //         </div>
    //     </PageWrapper>
    // )
}

export default Gallery