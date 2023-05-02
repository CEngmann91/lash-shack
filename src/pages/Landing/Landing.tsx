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
import { ArrowMotionButton, LimitedTimeOffer, PageWrapper } from '../../components'
import { Container, Row, Col } from 'reactstrap'
import images from '../../res/images';
import { SkeletonImage } from '../../components'
import useGetMiscellaneous from "../../hooks/useMiscellaneous";
import { About, MeetExperts, Testimonials, FindUs } from "..";
import { launchTreatwell } from "../../res/funcs";

const Landing = () => {
  const { landingPage_LimitedTimOffer, loadingMiscellaneous, miscellaneousError } = useGetMiscellaneous();



  const carousel = () => (
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
  {/* // <Swiper
    //   effect="coverflow"
    //   centeredSlides={true}
    //   spaceBetween={20}
    //   slidesPerView="auto"
    //   coverflowEffect={{
    //     rotate: 0,
    //     stretch: 0,
    //     depth: 200,
    //     modifier: 1,
    //     slideShadows: false,
    //   }}
    //   // loop={true}
    //   autoplay={{
    //     delay: 5000,
    //     pauseOnMouseEnter: true,
    //     disableOnInteraction: false,
    //   }}
    //   // slideToClickedSlide={false}
    //   // preventClicks={true}
    //   // preventClicksPropagation={true}
    //   modules={[EffectCoverflow, Autoplay]}
    // > */}

      <SwiperSlide>
        <SkeletonImage src={images.Landing0} alt="" className="" />
        {/* <img src={images.Landing0} alt="" /> */}
      </SwiperSlide>

      <SwiperSlide>
        <SkeletonImage src={images.Landing1} alt="" className="" />
        {/* <img src={images.Landing1} alt="" /> */}
      </SwiperSlide>

      <SwiperSlide>
        <SkeletonImage src={images.Landing2} alt="" className="" />
        {/* <img src={images.Landing2} alt="" /> */}
      </SwiperSlide>

      <SwiperSlide>
        <SkeletonImage src={images.Landing3} alt="" className="" />
        {/* <img src={images.Landing3} alt="" /> */}
      </SwiperSlide>

      {/* <div className="swiper-gradient" /> */}
    </Swiper >
  )

  const renderLimitedTimeOffer = () => {
    const { active, content, background, textColour, devMode } = landingPage_LimitedTimOffer;
    if (!active)
      return;

    const { title, subtitle, imageUrl, startDate, endDate, cta  } = content;

    if (devMode && process.env.NODE_ENV !== "development")
      return;

    const { text, url } = cta

    return <LimitedTimeOffer
      title={title}
      subtitle={subtitle}
      imageUrl={imageUrl}
      startDate={startDate}
      endDate={endDate}
      background={background}
      textColour={textColour}
      buttonText={text}
      buttonURL={url}
    // onTimerCompleted={() => { }}
    />
  }

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
              {carousel()}
            </Col>
          </Row>
        </Container>

        {/* <div id="scrollArrow">
          <a href="#about"><span></span>Scroll</a>
        </div> */}
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