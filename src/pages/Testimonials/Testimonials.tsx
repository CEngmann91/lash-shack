// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/scss";
import "swiper/scss/effect-coverflow";
import 'swiper/css/navigation';
import "swiper/scss/pagination";
// import required modules
import { EffectCoverflow, Autoplay, Pagination } from "swiper";

import './Testimonials.scss';
import React from 'react'
import { LoadingSpinner, PageWrapper } from '../../components'
import TestimonialCard from "./TestimonialCard/TestimonialCard";
import useGetTestimonials from "../../hooks/useGetTestimonials";

const Testimonials = () => {
    const { testimonials, loadingTestimonials, getTestimonialsError } = useGetTestimonials();


    return (
        <PageWrapper title="Testimonials">
            <section className="testimonials__section">

                <h1 className="text-center">We Love Hearing From You</h1>


                {loadingTestimonials ?
                    <LoadingSpinner title="Loading..." />
                    :
                    <Swiper
                        effect={"coverflow"}
                        centeredSlides={true}
                        spaceBetween={70}
                        slidesPerView={"auto"}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        // loop={true}
                        autoplay={{
                            delay: 5000,
                            pauseOnMouseEnter: true,
                            disableOnInteraction: false,
                        }}
                        pagination={{ clickable: true }}
                        slideToClickedSlide={false}
                        modules={[EffectCoverflow, Pagination, Autoplay]}
                    >
                        {testimonials?.map((testimonial, key) =>
                            <SwiperSlide key={key}>
                                <TestimonialCard data={testimonial} />
                            </SwiperSlide>
                        )}
                    </Swiper>
                }
            </section>
        </PageWrapper>
    )
}

export default Testimonials