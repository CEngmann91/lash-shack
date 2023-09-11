import './ForgotPasswordForm.scss';
import { FormEvent } from 'react';
import { InputField, MotionButton } from '../../..'

import { useUserActions } from '../../../../redux/hooks/useUserActions';
import { useApplicationActions } from '../../../../redux/hooks/useApplicationActions';
import { passwordResetEmail } from '../../../../firebase/firebaseHelper';
import { showToast } from '../../../../util/toasts';
import { showError } from '../../../../util/toasts';

type ForgotPasswordFormProps = {
    onCancel: () => void;
}
const ForgotPasswordForm = ({ onCancel }: ForgotPasswordFormProps) => {
    const { setAsLoading, setAsNotLoading, toggleAuthModal } = useApplicationActions();
    const { setAsActive, setFullName, setProfile, setAccountType } = useUserActions();


    const handleFormSubmit = async (e: FormEvent<EventTarget | HTMLFormElement>) => {
        e.preventDefault();

        setAsLoading();

        const target = e.target as typeof e.target & {
            // name property has to match
            email: { value: string };
        };
        const email = target.email.value;       // typechecks!
        if (!email) {
            setAsNotLoading();
            toggleAuthModal();
            return;
        }
        await passwordReset(email);
    };

    const passwordReset = async(email: string) => {
        await passwordResetEmail(email)
        .then(() => showToast("Check your email", "Forgot Password"))
        .catch(error => {
            showError("Unable to recover email");
        })
    }

    return (
        <div id="pageWrapper" className='animation_fadeIn'>
            <h2>Forgot Your Password?</h2>
            <form onSubmit={handleFormSubmit}>
                <InputField name="email" placeholder="Enter Your Email" type="text" required autoComplete='email' />
                {/* <input type="submit" className="" value="Log In" /> */}

                <div className='d-flex flex-row'>
                    <MotionButton className='submitButton' onClick={onCancel}>
                        Cancel
                    </MotionButton>
                    <MotionButton type='submit' className='submitButton'>
                        Confrim
                    </MotionButton>
                </div>
            </form>
        </div>
    )
}

export default ForgotPasswordForm