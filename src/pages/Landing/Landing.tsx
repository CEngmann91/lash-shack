// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/scss";
import "swiper/scss/effect-coverflow";
import 'swiper/css/navigation';
import "swiper/scss/pagination";
// import required modules
import { EffectCoverflow, Autoplay } from "swiper";

import './Landing.scss';
import { useEffect, useMemo } from 'react'
import { ArrowMotionButton, FeatureRow, LimitedTimeOffer, LoadingSpinner, MotionButton, PageWrapper } from '../../components'
import { Container, Row, Col } from 'reactstrap'
import images from '../../res/images';
import { useNavigate } from 'react-router-dom';

import { SkeletonImage } from '../../components'
import { getAllDownloadURLRef } from '../../helpers/firebase/firebaseHelper';
import useGetMiscellaneous from "../../hooks/useMiscellaneous";
import { About, MeetExperts, Testimonials, FindUs } from "..";
import { launchTreatwell } from "../../res/funcs";
import AuthModal from "../../components/AuthModal/AuthModal";

const Landing = () => {
  const navigate = useNavigate();
  const { landingPage_LimitedTimOffer, loadingMiscellaneous, miscellaneousError } = useGetMiscellaneous();


  const renderLandingSwiper = () => (
    <Swiper
      effect={"coverflow"}
      centeredSlides={true}
      spaceBetween={20}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 30,
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
      slideToClickedSlide={false}
      preventClicks={true}
      preventClicksPropagation={true}
      modules={[EffectCoverflow, Autoplay]}
    >

      <SwiperSlide>
        {/* <SkeletonImage src={images.Landing0} alt="" className="" /> */}
        <img src={images.Landing0} alt="" />
      </SwiperSlide>

      <SwiperSlide>
        {/* <SkeletonImage src={images.Landing1} alt="" className="" /> */}
        <img src={images.Landing1} alt="" />
      </SwiperSlide>

      <SwiperSlide>
        {/* <SkeletonImage src={images.Landing2} alt="" className="" /> */}
        <img src={images.Landing2} alt="" />
      </SwiperSlide>

      <SwiperSlide>
        {/* <SkeletonImage src={images.Landing3} alt="" className="" /> */}
        <img src={images.Landing3} alt="" />
      </SwiperSlide>
    </Swiper>
  )

  const renderLimitedTimeOffer = () => {
    const { active, content, background, textColour } = landingPage_LimitedTimOffer;
    if (!active)
      return;

    const { title, subtitle, imgUrl, startDate, endDate } = content;

    return <LimitedTimeOffer
      title={title}
      subtitle={subtitle}
      imageUrl={imgUrl}
      startDate={startDate}
      endDate={endDate}
      background={background}
      textColour={textColour}
    // onTimerCompleted={() => { }}
    />
  }




  // return <AuthModal />;
  

  return (
    <PageWrapper title="Home">
      <section className="landing__section">
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className="landing__content">
                <p className="landing__subject">Beauty Salon</p>
                <h2 className="landing__title">New Beginnings Start Here</h2>
                <p>Lash Shack was founded in 2019 by Emma who has years of experience working within the lash industry providing an impeccable service to clients and delivering 5 star training to students.</p>
                {/* <ArrowMotionButton className='landing__cta-button' onClick={() => navigate("/shop")}> */}
                <ArrowMotionButton className='landing__cta-button' onClick={launchTreatwell}>
                  Shop Now
                </ArrowMotionButton>
              </div>
            </Col>

            <Col lg='6' md='6' className='d-flex justify-content-center'>
              {renderLandingSwiper()}

              {/* <figure className="td-figure">
                <img src=
                // "https://images.unsplash.com/photo-1603695454344-12df53ab0c11?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                {images.Landing0}
                alt="Image description" />
              </figure> */}


            </Col>
          </Row>
        </Container>
      </section>



      {renderLimitedTimeOffer()}


      <About />

      <MeetExperts />

      <Testimonials />

      <FindUs />
    </PageWrapper>
  )
}

export default Landing