import './Avatar.scss';
import React, { useCallback, useEffect } from 'react'
import { Account } from '../../util/icons';
import { useAuthContext } from '../../providers/AuthContextProvider';

type AvatarProps = {
    url: string;
    width?: string;
    height?: string;
    onClick: (e?: React.MouseEvent<HTMLElement>) => void;
}
function Avatar({ url, width = "35px", height = "35px", onClick }: AvatarProps) {
    const handleClick = useCallback(onClick, []);
    const { isAuthenticated } = useAuthContext();


    useEffect(() => {
      
    }, [url, isAuthenticated()])
    

    return (
        <button className='border-button avatar'
            style={{ width: width, height: height, padding: (isAuthenticated() ? '0' : '0.3em') }}
            onClick={handleClick}
        >
            {!url ? <Account /> : <img src={url} /> }
        </button>
    )
}

export default Avatar