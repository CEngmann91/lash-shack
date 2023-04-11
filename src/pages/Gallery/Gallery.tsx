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
import { getAllDownloadURLRef } from '../../helpers/firebase/firebaseHelper';
import GalleryCard from "./GalleryCard/GalleryCard";
import GalleryViewerModal from "./GalleryViewerModal/GalleryViewerModal";
import { useScrollLock } from "../../hooks/useScrollLock";

const Gallery = () => {
    const [imagePaths, setImagePaths] = useState<string[]>([]);
    const [[page, direction], setPage] = useState([0, 0]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const { lockScroll, unlockScroll } = useScrollLock();

    

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
                        <div className="container">
                            <ul className="image-gallery">
                                {imagePaths.map((path, key) =>
                                    <GalleryCard key={key} id={key} imgSource={path}
                                        onClick={() => {
                                            setPage([key, 0])
                                            setShowModal(true)
                                            lockScroll();
                                        }}
                                    />
                                )}
                            </ul>
                        </div>

                        {showModal && (
                            <GalleryViewerModal visible={page != -1} imagePaths={imagePaths}
                                page={page} direction={direction} setPage={setPage}
                                onClose={() => {
                                    setPage([-1, 0]);
                                    setShowModal(false);
                                    unlockScroll();
                                }}
                            />
                        )}
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