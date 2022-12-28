import './RootIFrame.scss';
import React, { useState } from 'react'

type RootIFrameProps = {
  mainClassName?: string;
  source: string;
  allowFullScreen?: boolean;
  ariaHidden?: boolean;
  // onLoaded: (e?: React.ReactEventHandler<HTMLIFrameElement>) => void;
  // onError?: (e?: React.MouseEvent<HTMLIFrameElement>) => void;
}
function RootIFrame({ mainClassName, source, allowFullScreen, ariaHidden,
  // onLoaded, onError
 }: RootIFrameProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`frame-container ${mainClassName}`}>
      {isLoading ? <div className='app__item-loading' /> : null}
      <iframe
        src={source}
        // frameBorder="0"
        style={{ display: isLoading ? "none" : "flex", border: 0 }}
        // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
        // title='A youtube video on React hooks'
        allowFullScreen={allowFullScreen}
        aria-hidden={ariaHidden}
        // tabIndex={0}
        // loading='lazy' //lazy, eager
        onLoad={() => {
            setIsLoading(false);
            // onLoaded();
          }
        }
        onError={error =>
          {
            setIsLoading(false);
            // onError(error)
          }}
      />
    </div>
  )
}

export default RootIFrame