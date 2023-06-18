import './SwiperCarousel.scss';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/scss";
import "swiper/scss/effect-coverflow";
import 'swiper/css/navigation';
import "swiper/scss/pagination";
// import required modules
import { EffectCoverflow, Autoplay } from "swiper";
import SkeletonImage from "../SkeletonImage/SkeletonImage";
import { ReactNode } from 'react';

type SwiperCarouselProps = {
    imagePaths: string[];
    overlayChildren: ReactNode;
}

const SwiperCarousel = ({ imagePaths, overlayChildren }: SwiperCarouselProps) => {

    return (
        <div className="carousel">
            <Swiper
                modules={[EffectCoverflow, Autoplay]}
                centeredSlides={true}
                loop={true}
                effect='coverflow'
                speed={1000}
                slideToClickedSlide={false}
                slidesPerView="auto"
                coverflowEffect={{
                    rotate: 30,
                    slideShadows: false,
                    scale: 1,
                    depth: 150,
                }}
                autoplay={{
                    delay: 5000,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                }}
            >
                {imagePaths?.map((path, key) =>
                    <SwiperSlide>
                        <SkeletonImage src={path} alt="" className="" />
                        {/* <img src={path} alt="" /> */}
                    </SwiperSlide>
                )}

                {overlayChildren}
                {/* <div className="swiper-gradient" /> */}
            </Swiper>
        </div>
    );
}

export default SwiperCarousel