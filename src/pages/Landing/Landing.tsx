import React, { useCallback, memo } from 'react';
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
import { ArrowMotionButton, LimitedTimeOffer, PageWrapper, SwiperCarousel } from '../../components'
import { Container, Row, Col } from 'reactstrap'
import images from '../../res/images';
// import { SkeletonImage } from '../../components'
import useGetMiscellaneous from "../../hooks/useMiscellaneous";
// import { About, MeetExperts, Testimonials, FindUs } from "..";
import { launchTreatwell } from "../../util/util";
// import Parallax from "../../components/Parallax/Parallax";
// import { useEffect } from "react";
// import { CONTACT } from "../../constants/constants";

const Landing = () => {
  const { landingPage_LimitedTimOffer, loadingMiscellaneous, miscellaneousError } = useGetMiscellaneous();
  const list = ["Eyelashes", "Brows", "Aesthetics", "Training"];

  const launchTreatwellCallback = useCallback(() => {
    launchTreatwell('Romford');
  }, []);

  const renderServiceItem = useCallback((item: string, index: number) => (
    <span className="app__border-bottom" key={item}>{item}</span>
  ), []);

  const AboutLazy = React.lazy(() => import("../About/About"));
  const MeetExpertsLazy = React.lazy(() => import("../MeetExperts/MeetExperts"));
  const TestimonialsLazy = React.lazy(() => import("../Testimonials/Testimonials"));
  const FindUsLazy = React.lazy(() => import("../FindUs/FindUs"));


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


  const renderLimitedTimeOffer = () => {
    const { active, content, background, textColour, devMode } = landingPage_LimitedTimOffer;
    if (!active)
      return;

    const { title, subtitle, imageUrl, startDate, endDate, location, cta, noCountdown } = content;

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
      noCountdown={noCountdown}
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
                  {list.map(renderServiceItem)}
                </div>
                <ArrowMotionButton className='landing__cta-button' onClick={launchTreatwellCallback}>
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

      <React.Suspense fallback={<div>Loading...</div>}>
        <AboutLazy />
        <MeetExpertsLazy />
        <TestimonialsLazy />
        <FindUsLazy />
      </React.Suspense>
    </PageWrapper>
  )
}

export default memo(Landing)