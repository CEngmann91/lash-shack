import './FindUs.scss';
import React, { useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap';
import { CONTACT, WORKING_HOURS } from '../../constants/constants';
import { useDate } from '../../hooks/useDate';
import { timeConversion, currentTimeIsBetweenTimes } from '../../res/funcs';
import MapViewFrame from '../../components/iFrames/MapViewFrame/MapViewFrame';

const FindUs = () => {
    const { dayOfWeekName } = useDate();
    let interval: NodeJS.Timer;

    const keys = Object.keys(WORKING_HOURS);
    const values = Object.values(WORKING_HOURS);
    const today = WORKING_HOURS[dayOfWeekName];
    const { from, to } = today;
    let start = timeConversion(`0${from.padStart(2, '0').slice(0, -2)}:00am`);
    let finish = timeConversion(`0${to.padStart(2, '0').slice(0, -2)}:00pm`);
    let isOpen = false;


    useEffect(() => {
        interval = setInterval(() => {
            isOpen = currentTimeIsBetweenTimes(start, finish);
        })

        return function cleanup() {
            clearInterval(interval);
        }
    }, [])


    return (
        <section className="location__banner">
            <div className='map-content'>
                <MapViewFrame source={CONTACT.LOCATIONS[0].MAP} />
            </div>

            <div className="module-border-wrap">
                <div className="module">
                    <h2 className='text-center'>Opening Hours</h2>
                    <div className="schedule">
                        {values.map((key, value) => {
                            const day = keys[value];
                            const { from, to } = key;

                            const sameDay = day === dayOfWeekName;
                            const closed = from === "Closed" && to === "Closed";

                            return (
                                <div className="d-flex flex-row justify-content-between">
                                    <label className={`${sameDay && 'fw-bold text-success'} ${sameDay && closed && 'text-danger'}`}
                                    >{day}</label>

                                    {closed ?
                                        <label className={`${sameDay && 'fw-bold text-success'} ${sameDay && closed && 'text-danger'}`}>Closed</label>
                                        :
                                        <label className={`${sameDay && 'fw-bold text-success'} ${!isOpen && closed && 'text-danger'}`}>{from} - {to}</label>
                                    }
                                </div>
                            );
                        })}

                        {/* {isOpen ?
                            <label className="d-flex justify-content-center fw-bold text-success">We Are Open!</label>
                            :
                            <label className="d-flex justify-content-center fw-bold text-danger">We are now CLOSED</label>
                            // <label className="d-flex justify-content-center fw-bold">{isOpen ? 'We Are Open!' : 'We are now CLOSED'}</label>
                        } */}
                    </div>
                    

                </div>
            </div>
        </section>
    )
}

export default FindUs