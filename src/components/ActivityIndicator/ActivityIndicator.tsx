import './ActivityIndicator.scss';
import React from 'react';

type ActivityIndicatorProps = {
    scale?: number
    borderColour?: string
    borderSpinColour?: string
}
function ActivityIndicator({ scale = 48, borderColour = 'rgba(0, 0, 0, 0.3)', borderSpinColour = 'rgba(0, 0, 0, 0.75)' }: ActivityIndicatorProps) {

    const style = {
        width: `${scale}px`,
        height: `${scale}px`,
        backgroundColor: 'transparent',
        borderRadius: '50%',
        border: `8px solid ${borderColour}`,
        borderTopColor: borderSpinColour
    };

    return (
        <div className="activityIndicator" style={style} />
    )
}

export default ActivityIndicator