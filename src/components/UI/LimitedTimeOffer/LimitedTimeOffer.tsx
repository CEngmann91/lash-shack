import React, { useEffect, useState } from 'react';
import './LimitedTimeOffer.scss';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import Clock from '../Clock/Clock';
import { ArrowMotionButton } from '../..';
import images from '../../../res/images';
import { launchTreatwell, openWindow } from '../../../util/util';

type LimitedTimeOfferProps = {
    title?: string;
    subtitle?: string;
    imageUrl?: string;
    startDate: string;
    endDate: string;
    location?: string;
    onTimerCompleted?: () => void;
    background?: string;
    textColour?: string;
    buttonBG?: string;
    buttonText?: string;
    buttonTextColour?: string;
    buttonURL?: string;
    noCountdown?: boolean;
}

const LimitedTimeOffer = React.memo(({
    title = "Groupon Deals",
    subtitle = "Limited Offer",
    startDate,
    endDate,
    location = "",
    imageUrl,
    onTimerCompleted,
    background,
    textColour = "white",
    buttonBG = "#ec439f",
    buttonText,
    buttonTextColour = "#fff",
    buttonURL,
    noCountdown
}: LimitedTimeOfferProps) => {
    const navigate = useNavigate();
    const [now, setNow] = useState(new Date().getTime());

    useEffect(() => {
        if (noCountdown) {
            return;
        }

        const interval = setInterval(() => {
            setNow(new Date().getTime());
        }, 1000);
        return () => clearInterval(interval);
    }, [noCountdown]);

    if (!noCountdown) {
        const start = new Date(startDate).getTime();
        const isInFuture = start - now;
        if (isInFuture > 0)
            return null
    
        const destination = new Date(endDate).getTime();
        const dif = destination - now;
        if (dif < 0)
            return null
    }

    const handleClick = () => {
        buttonURL ? openWindow(buttonURL) : launchTreatwell(location)
    }

    return (
        <section className={`${background?.includes('url') && 'tint-background'} timer__wrapper`} style={{ background: background }}>
            <Container>
                <Row>
                    <Col lg='6' md='12' className='countdown-col'>
                        <div className="clock__top-content">
                            {subtitle && <h4 className={`fs-6 mb-2`} style={{ color: textColour }}>{subtitle}</h4>}
                            <h3 className={`fs-5 mb-3`} style={{ color: textColour }}>{title}</h3>
                        </div>
                        {!noCountdown && <Clock destinationDate={endDate} textColour={textColour} onTimerCompleted={onTimerCompleted} /> }

                        <ArrowMotionButton className='store__button' style={{ background: buttonBG, color: buttonTextColour }} onClick={handleClick}>
                            {buttonText}
                        </ArrowMotionButton>
                    </Col>

                    {imageUrl && (
                        <Col lg='4' md='12' className='text-end counter__image'>
                            <img src={imageUrl ?? images.LogoNoBG} alt="" />
                        </Col>
                    )}
                </Row>
            </Container>
        </section>
    )
})

export default LimitedTimeOffer