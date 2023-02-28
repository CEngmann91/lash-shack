import './LoadingScreen.scss';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { useScrollLock } from '../../hooks/useScrollLock';


type LoadingScreenProps = {
    visible: boolean;
    title?: string;
}
const LoadingScreen = ({ visible, title = "Loading..." }: LoadingScreenProps) => {
    const { lockScroll, unlockScroll } = useScrollLock();


    if (!visible)
    {
        unlockScroll();
        return null;
    }

    lockScroll();

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