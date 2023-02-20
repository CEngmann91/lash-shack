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
import React, { useEffect, useState } from 'react'
import { LoadingSpinner, PageWrapper, SkeletonImage } from '../../components'
import { getAllDownloadURLRef } from '../../helpers/firebase/firebaseHelper';
import GalleryCard from "./GalleryCard/GalleryCard";

const Gallery = () => {
    const [imagePaths, setImagePaths] = useState<string[] | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);


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
                    <Swiper
                        onRealIndexChange={(element) => setActiveIndex(element.activeIndex)}
                        effect={"coverflow"}
                        grabCursor={true}
                        centeredSlides={true}
                        spaceBetween={30}
                        slidesPerView={"auto"}
                        coverflowEffect={{
                            rotate: 30,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        pagination={{ clickable: true }}
                        // onSwiper={(swiper) => console.log(swiper)}
                        // onSlideChange={() => console.log('slide change')}
                        slideToClickedSlide={true}
                        modules={[EffectCoverflow, Pagination]}
                        className="mySwiper"
                    >
                        {imagePaths.map(path => (
                            <SwiperSlide>
                                <GalleryCard url={path} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                }
            </div>
        </PageWrapper>
    )
}

export default Gallery