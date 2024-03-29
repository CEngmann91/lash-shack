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
import { ArrowMotionButton, LimitedTimeOffer, PageWrapper, SwiperCarousel, TextReflection } from '../../components'
import { Container, Row, Col } from 'reactstrap'
import images from '../../res/images';
import { SkeletonImage } from '../../components'
import useGetMiscellaneous from "../../hooks/useMiscellaneous";
import { About, MeetExperts, Testimonials, FindUs } from "..";
import { launchTreatwell } from "../../util/util";
import Parallax from "../../components/Parallax/Parallax";
import { useEffect } from "react";
import { CONTACT } from "../../constants/constants";

const Landing = () => {
  const { landingPage_LimitedTimOffer, loadingMiscellaneous, miscellaneousError } = useGetMiscellaneous();
  const list = ["Eyelashes", "Brows", "Aesthetics", "Training"];


  const carousel = () => {
    const paths = [
      images.Landing0,
      images.Landing1,
      images.Landing2,
      images.Landing3,
    ];
    
    return (
      <SwiperCarousel imagePaths={paths} overlayChildren={( <div className="swiper-gradient" /> )} />
    );
  }


  // const carousel = () => (
  //   <Swiper
  //     modules={[EffectCoverflow, Autoplay]}
  //     centeredSlides={true}
  //     loop={true}
  //     effect='coverflow'
  //     speed={1000}
  //     slideToClickedSlide={false}
  //     slidesPerView="auto"
  //     coverflowEffect={{
  //       rotate: 30,
  //       slideShadows: false,
  //       scale: 1,
  //       depth: 150,
  //     }}
  //     autoplay={{
  //       delay: 5000,
  //       pauseOnMouseEnter: true,
  //       disableOnInteraction: false,
  //     }}
  //   >
  //     <SwiperSlide>
  //       <SkeletonImage src={images.Landing0} alt="" className="" />
  //       {/* <img src={images.Landing0} alt="" /> */}
  //     </SwiperSlide>

  //     <SwiperSlide>
  //       <SkeletonImage src={images.Landing1} alt="" className="" />
  //       {/* <img src={images.Landing1} alt="" /> */}
  //     </SwiperSlide>

  //     <SwiperSlide>
  //       <SkeletonImage src={images.Landing2} alt="" className="" />
  //       {/* <img src={images.Landing2} alt="" /> */}
  //     </SwiperSlide>

  //     <SwiperSlide>
  //       <SkeletonImage src={images.Landing3} alt="" className="" />
  //       {/* <img src={images.Landing3} alt="" /> */}
  //     </SwiperSlide>

  //     <div className="swiper-gradient" />
  //   </Swiper>
  // )

  const renderLimitedTimeOffer = () => {
    const { active, content, background, textColour, devMode } = landingPage_LimitedTimOffer;
    if (!active)
      return;

    const { title, subtitle, imageUrl, startDate, endDate, location, cta } = content;

    if (devMode && process.env.NODE_ENV !== "development")
      return;

    const { text, url, buttonBG, buttonTextColour } = cta

    return <LimitedTimeOffer
      title={title}
      subtitle={subtitle}
      imageUrl={imageUrl}
      startDate={startDate}
      endDate={endDate}
      location={location}
      background={background}
      textColour={textColour}
      buttonText={text}
      buttonURL={url}
      buttonBG={buttonBG}
      buttonTextColour={buttonTextColour}
    // onTimerCompleted={() => { }}
    />
  }



  return (
    <PageWrapper title="Home">
      <section className="landing__section">
        {/* <h1>{closestStore} </h1> */}
        <Container>
          <Row>
            <Col lg='6' md='12'>
              <div className="landing__content">
                <p className="landing__subject">Beauty Salon</p>
                <h1 className="landing__title">New <span>Beginnings</span> Start <span>Here</span></h1>
                <p>Experienced Technicians, Offering A World Class Service</p>
                <div className="landing__services">
                  {list.map((item, index) => (
                    <span className="app__border-bottom" key={index}>{item}</span>
                  ))}
                </div>
                <ArrowMotionButton className='landing__cta-button' onClick={() => launchTreatwell('Romford')}>
                  Shop Now
                </ArrowMotionButton>
              </div>
            </Col>

            <Col lg='6' md='12'>
              {carousel()}
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