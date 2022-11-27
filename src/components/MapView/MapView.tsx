import './MapView.scss';
import React, { useEffect, useState } from 'react'
import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';

interface iProps {
  source: string;
}
const MapView: React.FC<iProps> = ({ source, ...props }: iProps) => {
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {

  }, [source])


  return (
    <div className="map-responsive">
      {isLoading &&
        <div className='app__flex' style={{ height: '100%' }}>
          <ActivityIndicator borderColour='rgba(239, 179, 183, 1)' borderSpinColour='rgba(16, 40, 121, 1)' />
        </div>
      }

      <iframe
        src={source}
        frameBorder="0"
        style={{ display: isLoading ? "none" : "flex", border: 0 }}
        allowFullScreen={false}
        aria-hidden="false"
        tabIndex={0}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}

export default MapView