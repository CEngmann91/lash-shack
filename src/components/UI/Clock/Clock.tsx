import './Clock.scss';
import React, { useEffect, useState } from 'react'

type ClockProps = {
    destinationDate: string;
    onTimerCompleted: () => void;
    textColour?: string;
}
// "Mar 31, 2023"
const Clock = ({ destinationDate, onTimerCompleted, textColour = "white" }: ClockProps) => {
    let interval: NodeJS.Timer;
    const [days, setDays] = useState<number>();
    const [hours, setHours] = useState<number>();
    const [minutes, setMinutes] = useState<number>();
    const [seconds, setSeconds] = useState<number>();


    useEffect(() => {
        countDown();

        return function cleanup() {
            clearInterval(interval);
        }
    }, [destinationDate])
    

    function countDown() {
        const destination = new Date(destinationDate).getTime();

        interval = setInterval(() => {
            const now = new Date().getTime();
            const dif = destination - now;
            const days = Math.floor(dif / (1000 * 60 * 60 * 24));
            const hours = Math.floor(dif % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
            const minutes = Math.floor(dif % (1000 * 60 * 60) / (1000 * 60))
            const seconds = Math.floor(dif % (1000 * 60) / 1000)

            if (destination < 0) {
                clearInterval(interval);
                onTimerCompleted();
            }
            else 
            {
                setDays(days);
                setHours(hours);
                setMinutes(minutes)
                setSeconds(seconds);
            }
        })
    }


    return (
        <div className='clock__wrapper d-flex align-items-center gap-3'>
            <div className="clock__data d-flex align-items-center gap-3">
                <div className='text-center'>
                    <h1 className={`text-${textColour} mb-2`}>{days} </h1>
                    <h5 className={`text-${textColour}`}>Days</h5>
                </div>
                <span className={`text-${textColour} fs-3`}>:</span>
            </div>

            <div className="clock__data d-flex align-items-center gap-3">
                <div className='text-center'>
                    <h1 className={`text-${textColour} mb-2`}>{hours} </h1>
                    <h5 className={`text-${textColour}`}>Hours</h5>
                </div>
                <span className={`text-${textColour}`}>:</span>
            </div>

            <div className="clock__data d-flex align-items-center gap-3">
                <div className='text-center'>
                    <h1 className={`text-${textColour} mb-2`}>{minutes} </h1>
                    <h5 className={`text-${textColour}`}>Minutes</h5>
                </div>
                <span className={`text-${textColour}`}>:</span>
            </div>

            <div className="clock__data d-flex align-items-center gap-3">
                <div className='text-center'>
                    <h1 className={`text-${textColour} mb-2`}>{seconds} </h1>
                    <h5 className={`text-${textColour}`}>Seconds</h5>
                </div>
            </div>
        </div>
    )
}

export default Clock