import './Landing.scss';
import React from 'react'
import { LimitedTimeOffer, MotionButton, PageWrapper } from '../../components'
import { Container, Row, Col } from 'reactstrap'
import images from '../../res/images';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();


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
              <div className="landing__image">
                <img src={images.LogoNoBG} alt="" />
              </div>
            </Col>

          </Row>
        </Container>
      </section>


      <LimitedTimeOffer title='Groupon Deals' subtitle='Limited Offer' imageUrl={images.Lash} endDate="Mar 31, 2023" onTimerCompleted={() => { }} />

    </PageWrapper>
  )
}

export default Landing