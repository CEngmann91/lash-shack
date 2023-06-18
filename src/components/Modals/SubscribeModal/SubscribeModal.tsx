import './SubscribeModal.scss';
import useEventListener from '../../../hooks/useEventListener';
import { useScrollLock } from '../../../hooks/useScrollLock';
import { FormEvent, useEffect, useState } from 'react';
import { Icon_Cross } from '../../../res/icons';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Checkbox from '../../Form/Checkbox/Checkbox';

type SubscribeModalProps = {
    visible: boolean;
    onClose: () => void;
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({ visible, onClose }: SubscribeModalProps) => {
    const { lockScroll, unlockScroll } = useScrollLock();
    const [checked, setChecked] = useState(false);


    useEffect(() => {
        if (!visible)
            unlockScroll();
        else
            lockScroll();


        // const timeout = setTimeout(onClose, 5000);
        // return function cleanup() {
        //     clearTimeout(timeout);
        // }
    }, [visible])

    useEventListener("keydown", (e: any) => {
        if (!visible)
            return;

        if (e.key === 'Escape')
            onClose();
    });


    if (!visible)
        return null;



    const handleFormSubmit = async(e: FormEvent<EventTarget | HTMLFormElement>) => {
        e.preventDefault();


    }


    return (
        <div className={`subscribe-container ${!visible && 'hide'}`}>
            <div id="formContent">
                <h1 className='heading mt-3'>Subscribe To Our Newsletter</h1>
                <p className='subheading text__new-line'>{`Life is too short to neglect those Lashes.\nSign up to get the best deals NOW!`}</p>

                <form id="subscribe" onSubmit={handleFormSubmit}>
                    <input name="email" type="email" id="subscriber-email" placeholder="Enter Your Email" />
                    <input type="submit" value="Subscribe" id="btn-scribe" />
                </form>
                
                <Checkbox className='mt-4' label="Don't Show Me Again" onChange={setChecked} />


                <button className="close" onClick={onClose}>
                    <Icon_Cross />
                </button>
            </div>
        </div>
    );
}

export default SubscribeModal