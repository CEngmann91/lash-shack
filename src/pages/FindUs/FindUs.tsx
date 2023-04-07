import './FindUs.scss';
import React, { useEffect, useMemo, useState } from 'react'
import { CONTACT, WORKING_HOURS } from '../../constants/constants';
import { useDate } from '../../hooks/useDate';
import { timeConversion, currentTimeIsBetweenTimes } from '../../res/funcs';
import MapViewFrame from '../../components/iFrames/MapViewFrame/MapViewFrame';
import useGetMiscellaneous from '../../hooks/useMiscellaneous';

const FindUs = () => {
    // const { openingHours, loadingMiscellaneous, miscellaneousError } = useGetMiscellaneous();
    


    const { dayOfWeekName } = useDate();
    let interval: NodeJS.Timer;

    const keys = Object.keys(WORKING_HOURS);
    const values = Object.values(WORKING_HOURS);
    const today = WORKING_HOURS[dayOfWeekName];
    const { from, to } = today;
    let start = timeConversion(`0${from.padStart(2, '0').slice(0, -2)}:00am`);
    let finish = timeConversion(`0${to.padStart(2, '0').slice(0, -2)}:00pm`);
    const [isOpen, setIsOpen] = useState<boolean>(false);


    useEffect(() => {
        interval = setInterval(() => setIsOpen(currentTimeIsBetweenTimes(start, finish)), 1000)

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
                    <div className="schedule" data-open={`${isOpen}`}>
                        {values.map((key, index) => {
                            const day = keys[index];
                            const { from, to } = key;

                            const sameDay = day === dayOfWeekName;
                            const closed = from === "Closed" && to === "Closed";

                            return (
                                <div className="d-flex flex-row justify-content-between" key={index}>
                                    <label className={`${sameDay && 'fw-bold openColour'} ${sameDay && closed && 'closedColour'}`}>{day}</label>

                                    {closed ?
                                        <label className={`${sameDay && 'fw-bold openColour'} ${sameDay && closed && 'closedColour'}`}>Closed</label>
                                        :
                                        <label className={`${sameDay && 'fw-bold openColour'} ${!isOpen && closed && 'closedColour'}`}>{from} - {to}</label>
                                    }
                                </div>
                            );
                        })}

                       <label className="openLabel" data-open={`${isOpen}`}>{isOpen ? 'We Are Open!' : 'We are now CLOSED'}</label>
                    </div>


                </div>
            </div>
        </section>
    )
}

export default FindUs