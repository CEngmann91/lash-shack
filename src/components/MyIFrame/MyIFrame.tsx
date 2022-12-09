import './MyIFrame.scss';
import React, { useEffect, useState } from 'react'
import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';

type MyIFrameProps = {
  mainClassName?: string;
  source: string;
  allowFullScreen?: boolean;
  ariaHidden?: boolean;
}
function MyIFrame({ mainClassName, source, allowFullScreen, ariaHidden }: MyIFrameProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`frame-container ${mainClassName}`}>
      {isLoading &&
        <div className='app__absolute-center' style={{ height: '100%' }}>
          <ActivityIndicator borderColour='rgba(239, 179, 183, 1)' borderSpinColour='rgba(16, 40, 121, 1)' />
        </div>
      }
      <iframe
        src={source}
        frameBorder="0"
        style={{ display: isLoading ? "none" : "flex", border: 0 }}
        allowFullScreen={allowFullScreen}
        aria-hidden={ariaHidden}
        // tabIndex={0}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}

export default MyIFrame