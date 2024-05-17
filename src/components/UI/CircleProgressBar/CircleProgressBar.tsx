import './CircleProgressBar.scss';
import { ReactNode, HTMLAttributes, useLayoutEffect, useMemo } from 'react';
import { clamp } from '../../../res/funcs';

interface CircleProgressBarProps extends HTMLAttributes<HTMLElement> {
    id: string;
    progress: number;
    barColour?: string;
    backgroundColour?: string;
    children?: ReactNode;
}

const CircleProgressBar = ({ id, progress, barColour = "rgb(255,0,0)", backgroundColour = "white", children }: CircleProgressBarProps) => {
    const clampedProgress = useMemo(() => clamp(progress, 0, 10), [progress]);
    const uniqueId = `circular-progress-bar_${id}`;

    useLayoutEffect(() => {
        const element = document.getElementById(uniqueId);
        if (element) {
            element.style.setProperty('--value', `${clampedProgress}`);
            element.style.setProperty('--barColour', `${barColour}`);
            element.style.setProperty('--bgColour', `${backgroundColour}`);
        }
    }, [uniqueId, clampedProgress, backgroundColour, barColour]);

    return <div id={uniqueId} className='circular-progress-bar' style={{ '--value': clampedProgress, '--barColour': barColour, '--bgColour': backgroundColour } as React.CSSProperties}>{children}</div>
}

export default CircleProgressBar