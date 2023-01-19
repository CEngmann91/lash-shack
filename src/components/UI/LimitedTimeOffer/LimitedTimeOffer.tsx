import './LimitedTimeOffer.scss';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import Clock from '../Clock/Clock';
import { MotionButton } from '../..';

type LimitedTimeOfferProps = {
    title: string;
    subtitle: string;
    imageUrl: string;
    endDate: string;
    onTimerCompleted: () => void;
    background?: string;
    textColour?: string;
}
const LimitedTimeOffer = ({ title = "Groupon Deals", subtitle = "Limited Offer", endDate, imageUrl, onTimerCompleted, background, textColour = "white" }: LimitedTimeOfferProps) => {
    const navigate = useNavigate();


    return (
        <section className="timer__wrapper" style={{ background: background }}>
            <Container>
                <Row>
                    <Col lg='6' md='12' className='countdown-col'>
                        <div className="clock__top-content">
                            <h4 className={`text-${textColour} fs-6 mb-2`}>{subtitle}</h4>
                            <h3 className={`text-${textColour} fs-5 mb-3`}>{title}</h3>
                        </div>
                        <Clock destinationDate={endDate} textColour={textColour} onTimerCompleted={onTimerCompleted} />

                        <MotionButton className='store__button' onClick={() => navigate("/shop")}>
                            Visit Store
                        </MotionButton>
                    </Col>

                    <Col lg='4' md='12' className='text-end counter__image'>
                        <img src={imageUrl} alt="" />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default LimitedTimeOffer