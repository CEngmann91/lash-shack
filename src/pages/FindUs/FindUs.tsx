import './FindUs.scss';
import React, { useEffect, useMemo, useState } from 'react'
import { CONTACT } from '../../constants/constants';
import { useDate } from '../../hooks/useDate';
import { timeConversion, currentTimeIsBetweenTimes } from '../../res/funcs';
import MapViewFrame from '../../components/iFrames/MapViewFrame/MapViewFrame';
import useGetMiscellaneous from '../../hooks/useMiscellaneous';
import images from '../../res/images';

const FindUs = () => {
    const { openingHours, loadingMiscellaneous, miscellaneousError } = useGetMiscellaneous();
    const { dayOfWeekName } = useDate();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    let interval: NodeJS.Timer;
    const todayHours = getTodaysWorkingHours();



    useEffect(() => {
        interval = setInterval(() => {

            const { from, to } = todayHours;

            const start = timeConversion(`0${from.padStart(2, '0').slice(0, -2)}:00am`);
            const finish = timeConversion(`0${to.padStart(2, '0').slice(0, -2)}:00pm`);
            const within = currentTimeIsBetweenTimes(start, finish);
            setIsOpen(within)
        }, 1000)

        return function cleanup() {
            clearInterval(interval);
        }
    }, [openingHours])


    function getTodaysWorkingHours() {
        if (loadingMiscellaneous)
            return null;

        const { days } = openingHours;
        return days?.filter((item: any, idx: number) => item.key === dayOfWeekName)?.at(0);
    }

    function renderSchedule() {
        if (loadingMiscellaneous)
            return;

        const { days } = openingHours;

        return (
            days?.map((item: any, idx: number) => {
                const { from, to, key, closed } = item;
                const sameDay = (key === dayOfWeekName);

                return (
                    <div className="d-flex flex-row justify-content-between" key={idx}>
                        <label className={`${sameDay && 'fw-bold openColour'} ${sameDay && closed && 'closedColour'}`}>{key}</label>

                        {closed ?
                            <label className={`${sameDay && 'fw-bold openColour'} ${sameDay && closed && 'closedColour'}`}>Closed</label>
                            :
                            <label className={`${sameDay && 'fw-bold openColour'} ${!isOpen && closed && 'closedColour'}`}>{from} - {to}</label>
                        }
                    </div>
                );
            })
        );
    }

    return (
        <section className="location__banner">
            <div className='map-content'>
                {/* <MapViewFrame source={CONTACT.LOCATIONS[0].MAP} /> */}
                <img src={images.Shop} />
            </div>

            <div className="module-border-wrap">
                <div className="module">
                    <h2 className='text-center'>Opening Hours</h2>
                    <div className="schedule" data-open={`${isOpen}`}>
                        {renderSchedule()}

                        <label className="openLabel" data-open={`${isOpen}`}>{isOpen ? 'We Are Open!' : 'We are now CLOSED'}</label>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FindUs