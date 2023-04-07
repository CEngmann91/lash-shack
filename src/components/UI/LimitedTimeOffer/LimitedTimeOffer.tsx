import './LimitedTimeOffer.scss';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import Clock from '../Clock/Clock';
import { ArrowMotionButton } from '../..';
import images from '../../../res/images';
import { launchTreatwell } from '../../../res/funcs';

type LimitedTimeOfferProps = {
    title: string;
    subtitle: string;
    imageUrl: string;
    startDate: string;
    endDate: string;
    onTimerCompleted?: () => void;
    background?: string;
    textColour?: string;
}
const LimitedTimeOffer = ({ title = "Groupon Deals", subtitle = "Limited Offer", startDate, endDate, imageUrl, onTimerCompleted, background, textColour = "white" }: LimitedTimeOfferProps) => {
    const navigate = useNavigate();


    const now = new Date().getTime();
    // If it has expired then don't show anything.
    const start = new Date(startDate).getTime();
    const isInFuture = start - now;
    // If this hasn't happen yet and is in the future then do nothing.
    if (isInFuture > 0)
        return null
    
    const destination = new Date(endDate).getTime();
    const dif = destination - now;
    if (dif < 0)
        return null


    return (
        <section className="timer__wrapper" style={{ background: background }}>
            <Container>
                <Row>
                    <Col lg='6' md='12' className='countdown-col'>
                        <div className="clock__top-content">
                            <h4 className={`fs-6 mb-2`} style={{ color: textColour }}>{subtitle}</h4>
                            <h3 className={`fs-5 mb-3`} style={{ color: textColour }}>{title}</h3>
                        </div>
                        <Clock destinationDate={endDate} textColour={textColour} onTimerCompleted={onTimerCompleted} />

                        {/* <ArrowMotionButton className='store__button' onClick={() => navigate("/shop")}> */}
                        <ArrowMotionButton className='store__button' onClick={launchTreatwell}>
                            Visit Store
                        </ArrowMotionButton>
                    </Col>

                    <Col lg='4' md='12' className='text-end counter__image'>
                        <img src={imageUrl ? imageUrl : images.LogoNoBG} alt="" />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default LimitedTimeOffer