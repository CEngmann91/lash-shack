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

const Gallery = () => {
    const [imagePaths, setImagePaths] = useState<string[] | null>(null);
    const [selected, setSelected] = useState({
        key: -1,
        image: "",
    });



    useEffect(() => {
        if (imagePaths == null)
            getAllPaths();

        return function cleanup() {
            getAllPaths();
        }
    }, [])

    const getAllPaths = async () => {
        const paths = await getAllDownloadURLRef('gallery')
        setImagePaths(paths);
    }



    return (
        <PageWrapper title="Gallery">
            <div className="gallery__section">
                {imagePaths === null ?
                    <div className="loading-container">
                        <LoadingSpinner title="Loading..." />
                    </div>
                    :
                    <>
                        {/* <h5 className="text-center mt-5"></h5>
                        <h1 className="text-center mb-4">Love What You See?</h1> */}


                        <div className="container">
                            <ul className="image-gallery">
                                {imagePaths.map((path, key) =>
                                    <GalleryCard key={key} id={key} imgSource={path}
                                        onClick={() => setSelected({ key, image: path })}
                                    />
                                )}
                            </ul>
                        </div>

                        
                        <GalleryViewerModal visible={selected.key != -1}
                            selectedPhoto={selected.image}
                            onNextClick={() => {}} onPreviousClick={() => {}}
                            onClose={() => setSelected({ key: -1, image: "" })}
                        />
                    </>
                }
            </div>
        </PageWrapper>
    )
}

export default Gallery