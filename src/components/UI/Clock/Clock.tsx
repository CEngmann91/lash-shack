import './Clock.scss';
import { useEffect, useState, useRef } from 'react'

type ClockProps = {
    destinationDate: string;
    onTimerCompleted?: () => void;
    textColour?: string;
}
// "Mar 31, 2023"
const Clock = ({ destinationDate, onTimerCompleted, textColour = "white" }: ClockProps) => {
    const interval = useRef<NodeJS.Timer>();
    const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    
    const destination = new Date(destinationDate).getTime();

    useEffect(() => {
        countDown();

        return function cleanup() {
            if (interval.current) {
                clearInterval(interval.current);
            }
        }
    }, [countDown, destinationDate])

    function countDown() {
        interval.current = setInterval(() => {
            const now = new Date().getTime();
            const dif = destination - now;
            const days = Math.floor(dif / (1000 * 60 * 60 * 24));
            const hours = Math.floor(dif % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
            const minutes = Math.floor(dif % (1000 * 60 * 60) / (1000 * 60))
            const seconds = Math.floor(dif % (1000 * 60) / 1000)

            if (destination < 0 || seconds < 0) {
                if (interval.current) {
                    clearInterval(interval.current);
                }
                if (onTimerCompleted) onTimerCompleted();
            }
            else {
                setTime({ days, hours, minutes, seconds });
            }
        }, 1000)
    }

    if (destination < 0)
        return <></>

    return (
        <div className='clock__wrapper d-flex align-items-center gap-3'>
            <div className="clock__data d-flex align-items-center gap-3">
                <div className='text-center'>
                    <h1 className={`mb-2`} style={{ color: textColour }}>{time?.days} </h1>
                    <h5 className={``} style={{ color: textColour }}>Days</h5>
                </div>
                <span className={`fs-3`} style={{ color: textColour }}>:</span>
            </div>

            <div className="clock__data d-flex align-items-center gap-3">
                <div className='text-center'>
                    <h1 className={`mb-2`} style={{ color: textColour }}>{time?.hours} </h1>
                    <h5 className={``} style={{ color: textColour }}>Hours</h5>
                </div>
                <span className={``} style={{ color: textColour }}>:</span>
            </div>

            <div className="clock__data d-flex align-items-center gap-3">
                <div className='text-center'>
                    <h1 className={`mb-2`} style={{ color: textColour }}>{time?.minutes} </h1>
                    <h5 className={``} style={{ color: textColour }}>Minutes</h5>
                </div>
                <span className={``} style={{ color: textColour }}>:</span>
            </div>

            <div className="clock__data d-flex align-items-center gap-3">
                <div className='text-center'>
                    <h1 className={`mb-2`} style={{ color: textColour }}>{time?.seconds} </h1>
                    <h5 className={``} style={{ color: textColour }}>Seconds</h5>
                </div>
            </div>
        </div>
    )
}

export default Clock