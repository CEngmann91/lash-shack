import './SubscribeModal.scss';
import useEventListener from '../../../hooks/useEventListener';
import { useScrollLock } from '../../../hooks/useScrollLock';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { Icon_Cross } from '../../../res/icons';
import Checkbox from '../../Form/Checkbox/Checkbox';
import { showError, showSubscription } from '../../../util/toasts';
import { addANewSubscriber } from '../../../firebase/firebaseHelper';

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
    }, [visible, lockScroll, unlockScroll])

    useEventListener("keydown", (e: any) => {
        if (!visible)
            return;

        if (e.key === 'Escape')
            onClose();
    });

    const handleFormSubmit = useCallback(async (e: FormEvent<EventTarget | HTMLFormElement>) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            // name property has to match
            email: { value: string };
        };
        const email = target.email.value;       // typechecks!
        if (!email) {
            return;
        }

        await addANewSubscriber(email.toLowerCase())
            .then(res => {
                showSubscription();
                onClose();
            })
            .catch(error => showError("You Have Already Subscribed 🥳"))
    }, [onClose]);

    return (
        <div
            className="subscribe-container animation_fadeIn"
            style={{ display: visible ? 'flex' : 'none' }}
        >
            <div id="formContent" className='animation_fadeInDown'>
                <h1 className='heading mt-3'>Subscribe To Our Newsletter</h1>
                <p className='subheading text__new-line'>{`Life is too short to neglect those Lashes.\nSign up to get the best deals NOW!`}</p>

                <form id="subscribe" onSubmit={handleFormSubmit}>
                    <input name="email" type="email" id="subscriber-email" placeholder="Enter Your Email" />
                    <input type="submit" value="Subscribe" id="btn-scribe" />
                </form>

                {/* <Checkbox className='mt-4' label="Don't Show Me Again" onChange={setChecked} /> */}

                <button className="close" onClick={onClose}>
                    <Icon_Cross />
                </button>
            </div>
        </div>
    );
}

export default SubscribeModal