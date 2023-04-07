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

const Landing = () => {
  const navigate = useNavigate();
  const { miscellaneous, loadingMiscellaneous, miscellaneousError } = useGetMiscellaneous();
  // const { landing_SpecialOfferBanner } = miscellaneous;



  // const [imagePaths, setImagePaths] = useState<string[] | null>(null);


  useEffect(() => {
    //   if (imagePaths == null)
    //     getAllPaths();

    //   return function cleanup() {
    //     getAllPaths();
    //   }
  }, [])

  // const getAllPaths = async () => {
  //   const paths = await getAllDownloadURLRef('landing')
  //   setImagePaths(paths);
  // }


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

  const limitedTimeOffer = useMemo(() => {
    if (!miscellaneous)
      return {};

    const { landing_SpecialOfferBanner } = miscellaneous as any;
    return landing_SpecialOfferBanner;
  }, [miscellaneous])

  const renderLimitedTimeOffer = () => {
    const { active, content, background, textColour } = limitedTimeOffer;
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



  return (
    <PageWrapper title="Home">
      <section className="landing__section">
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className="landing__content">
                <p className="landing__subTitle">Beauty Salon</p>
                <h2>New Beginnings Start Here</h2>
                <p>Lash Shack was founded in 2019 by Emma who has years of experience working within the lash industry providing an impeccable service to clients and delivering 5 star training to students.</p>
                {/* <ArrowMotionButton className='landing__cta-button' onClick={() => navigate("/shop")}> */}
                <ArrowMotionButton className='landing__cta-button' onClick={launchTreatwell}>
                  Shop Now
                </ArrowMotionButton>
              </div>
            </Col>

            <Col lg='6' md='6' className='d-flex justify-content-center'>
              {renderLandingSwiper()}
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