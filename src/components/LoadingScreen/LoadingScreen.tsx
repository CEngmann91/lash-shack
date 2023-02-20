import './LoadingScreen.scss';
import React from 'react'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

type LoadingScreenProps = {
    visible: boolean;
    title?: string;
}
const LoadingScreen = ({ visible, title = "Loading..." }: LoadingScreenProps) => {

    if (!visible) return null;

    return (
        <div className='loading-screen'>
            <LoadingSpinner
                title={title} colour="rgb(232, 222, 209)" thickness={4}
                backgroundColour='rgb(232, 222, 209)' foregroundColour='rgb(7, 76, 79)'
            />
        </div>
    )
}

export default LoadingScreen