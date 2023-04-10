// https://stackoverflow.com/questions/34613006/circle-progress-bar-css

import './CircleProgressBar.scss';
import { ReactNode, HTMLAttributes } from 'react';
import { useLayoutEffect } from 'react'
import { clamp } from '../../../res/funcs';

interface CircleProgressBarProps extends HTMLAttributes<HTMLElement> {
    id: string;
    progress: number;
    barColour?: string;
    backgroundColour?: string;
    children?: ReactNode;
}
const CircleProgressBar = ({ id, progress, barColour = "rgb(255,0,0)", backgroundColour = "white", children }: CircleProgressBarProps) => {

    id = `circular-progress-bar_${id}`;
    
    useLayoutEffect(() => {
        progress = clamp(progress, 0, 10);

        const element = document.getElementById(id);
        // Set the progress
        element?.style.setProperty('--value', `${progress}`);
        // // Set the colour for the bar.
        element?.style.setProperty('--barColour', `${barColour}`);
        // // Set the colour for the background.
        element?.style.setProperty('--bgColour', `${backgroundColour}`);


        // const value = getComputedStyle(document.documentElement).getPropertyValue('--value');
        // const value = element?.style.getPropertyValue('--value');
        // alert(value);
        // const barColour = getComputedStyle(document.documentElement).getPropertyValue('--barColour');
        // const barColour = element?.style.getPropertyValue('--barColour');
        // alert(barColour);
        // const bgColour = getComputedStyle(document.documentElement).getPropertyValue('--bgColour');
        // const bgColour = element?.style.getPropertyValue('--bgColour');
        // alert(bgColour);
    }, [progress, backgroundColour, barColour])

    return <div id={id} className='circular-progress-bar'>{children}</div>
}

export default CircleProgressBar