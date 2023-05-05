// NO LONGER NEEDED!!


import './ForgotPasswordForm.scss';
import { FormEvent, useState } from 'react';
import { InputField, MotionButton } from '../..'

import { useUserActions } from '../../../redux/hooks/useUserActions';
import { useApplicationActions } from '../../../redux/hooks/useApplicationActions';

const ForgotPasswordForm = () => {
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
        // await login(email, password);
    };


    return (
        <div id="pageWrapper" className='fadeIn'>
            <h2>Forgot Your Password?</h2>
            <form onSubmit={handleFormSubmit}>
                <InputField name="email" placeholder="Enter Your Email" type="text" required autoComplete='email' />
                {/* <input type="submit" className="" value="Log In" /> */}


                {/* <MotionButton type='submit' className='submitButton'>
                    Confrim
                </MotionButton> */}
            </form>
        </div>
    )
}

export default ForgotPasswordForm