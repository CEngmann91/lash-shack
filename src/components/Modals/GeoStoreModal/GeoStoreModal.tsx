import './GeoStoreModal.scss';
import useEventListener from '../../../hooks/useEventListener';
import { useScrollLock } from '../../../hooks/useScrollLock';
import { useEffect, useState } from 'react';
import { Icon_Cross } from '../../../res/icons';
import MotionButton from '../../Motion/MotionButton/MotionButton';
import useGeolocateStore from '../../../hooks/useGeolocateStore';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';

type SubscribeModalProps = {
    visible: boolean;
    onClose: () => void;
}

const GeoStoreModal: React.FC<SubscribeModalProps> = ({ visible, onClose }: SubscribeModalProps) => {
    const { lockScroll, unlockScroll } = useScrollLock();
    const [makeLocationRequest, setMakeLocationRequest] = useState(false);
    const { loading, error, closestStore } = useGeolocateStore(makeLocationRequest);


    useEffect(() => {
        if (!visible)
            unlockScroll();
        else
            lockScroll();
    }, [visible])

    useEventListener("keydown", (e: any) => {
        if (!visible)
            return;

        if (e.key === 'Escape')
            onClose();
    });

    if (!visible)
        return null;



    return (
        <div className={`geo-container ${!visible && 'hide'}`}>
            <div id="formContent" className='fadeIn'>
                {loading ? (
                    <LoadingSpinner title="Finding Neartest Store." />
                ) : (
                    !closestStore ? (
                        <>
                            <h1 className='heading mt-3'>Find Your Nearest Store?</h1>
                            <p className='subheading text__new-line'>{`Let us, help you!\nAllow us to find the closest Lash Shack near you.`}</p>

                            <MotionButton type='submit' className='submitButton' onClick={() => {
                                setMakeLocationRequest(true);
                            }}>
                                Allow
                            </MotionButton>

                            <button className="close" onClick={onClose}>
                                <Icon_Cross />
                            </button>
                        </>
                    ) : (
                        <h1>{JSON.stringify(closestStore, null, 2)}</h1>
                    )
                )}
            </div>
        </div>
    );
}

export default GeoStoreModal