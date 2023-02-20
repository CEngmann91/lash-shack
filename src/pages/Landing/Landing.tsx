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
import React from 'react'
import { LimitedTimeOffer, LoadingSpinner, MotionButton, PageWrapper } from '../../components'
import { Container, Row, Col } from 'reactstrap'
import images from '../../res/images';
import { useNavigate } from 'react-router-dom';

import { SkeletonImage } from '../../components'
import { getAllDownloadURLRef } from '../../helpers/firebase/firebaseHelper';

const Landing = () => {
  const navigate = useNavigate();

  // const [imagePaths, setImagePaths] = useState<string[] | null>(null);


  // useEffect(() => {
  //   if (imagePaths == null)
  //     getAllPaths();

  //   return function cleanup() {
  //     getAllPaths();
  //   }
  // }, [])

  // const getAllPaths = async () => {
  //   const paths = await getAllDownloadURLRef('landing')
  //   setImagePaths(paths);
  // }



  return (
    <PageWrapper title="Home">
      <section className="landing__section">
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className="landing__content">
                <p className="landing__subTitle">Beauty Salon</p>
                <h2>New Beginnings Start Here</h2>
                <p>
                  Insert More Text Here!
                  Insert More Text Here!
                  Insert More Text Here!
                  Insert More Text Here!
                  Insert More Text Here!
                  Insert More Text Here!
                  Insert More Text Here!
                  Insert More Text Here!
                  Insert More Text Here!
                  Insert More Text Here!
                </p>
                <MotionButton className='landing__buy-button' onClick={() => navigate("/shop")}>
                  Shop Now
                </MotionButton>
              </div>
            </Col>

            <Col lg='6' md='6' className='d-flex justify-content-center'>


              <Swiper
                effect={"coverflow"}
                centeredSlides={true}
                spaceBetween={20}
                slidesPerView={2}
                coverflowEffect={{
                  rotate: 50,
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







              {/* <div className="landing__image">
                <img src={images.LogoNoBG} alt="" />
              </div> */}


              {/* {imagePaths === null ?
                <LoadingSpinner title="Loading..." />
                :
                <Swiper
                  effect={"coverflow"}
                  grabCursor={true}
                  centeredSlides={true}
                  spaceBetween={20}
                  slidesPerView={"auto"}
                  coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                  }}
                  pagination={{ clickable: true }}
                  // onSwiper={(swiper) => console.log(swiper)}
                  // onSlideChange={() => console.log('slide change')}
                  slideToClickedSlide={true}
                  initialSlide={Math.floor(imagePaths.length/2 - 1)}
                  modules={[EffectCoverflow, Pagination]}
                  // className="mySwiper"
                >
                  {imagePaths.map(path => (
                    <SwiperSlide>
                      <img src="" alt=""/>
                    </SwiperSlide>
                  ))}
                </Swiper>
              } */}
            </Col>

          </Row>
        </Container>
      </section>


      <LimitedTimeOffer title='Groupon Deals' subtitle='Limited Offer' imageUrl={images.Lash} endDate="Mar 31, 2023" onTimerCompleted={() => { }} />

    </PageWrapper>
  )
}

export default Landing