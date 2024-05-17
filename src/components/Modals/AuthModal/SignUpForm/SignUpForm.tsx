import { useCallback, FormEvent } from 'react';
import './SignUpForm.scss';
import { Link, useNavigate } from 'react-router-dom';
import { InputField, MotionButton } from '../../..';

import { createAUser } from '../../../../firebase/firebaseHelper';
import { useApplicationActions } from '../../../../redux/hooks/useApplicationActions';
import { useUserActions } from '../../../../redux/hooks/useUserActions';
import { showSignUpSuccessToast, showSignUpUnsuccessToast, showToast } from '../../../../util/toasts';

const SignUpForm = () => {
    const navigate = useNavigate();
    const { setAsLoading, setAsNotLoading } = useApplicationActions();
    const { setAsActive, setFullName, setProfile, setAccountType } = useUserActions();
    

    const validateForm = (firstName: string, lastName: string, email: string, password: string, confirm: string) => {
        if (!firstName || !lastName || !email || !password || !confirm) {
            return false;
        }
        if (password !== confirm) {
            return false;
        }
        return true;
    };

    const register = useCallback(async (firstName: string, lastName: string, email: string, password: string) => {
        try {
            const displayName = `${firstName} ${lastName}`;
            const registerReq = await createAUser(firstName, lastName, email, password, displayName);
            if (registerReq) {
                setAsActive(registerReq.active);
                setAccountType(registerReq.account);
                setFullName(registerReq.firstName, registerReq.lastName);
                setProfile(displayName, registerReq.photoURL);
                showSignUpSuccessToast(firstName);
                navigate('/');
            } else {
                showSignUpUnsuccessToast();
            }
        } catch (error) {
            showToast('An error occurred during registration.', '', null);
        } finally {
            setAsNotLoading();
        }
    }, [setAsActive, setAccountType, setFullName, setProfile, navigate]);
    
    function handleFormSubmit(e: FormEvent<EventTarget | HTMLFormElement>) {
        e.preventDefault();
        setAsLoading();
        const target = e.target as typeof e.target & {
            firstName: { value: string };
            lastName: { value: string };
            email: { value: string };
            password: { value: string };
            confirm: { value: string };
        };
        const firstName = target.firstName.value;
        const lastName = target.lastName.value;
        const email = target.email.value;
        const password = target.password.value;
        const confirm = target.confirm.value;
        if (validateForm(firstName, lastName, email, password, confirm)) {
            register(firstName, lastName, email, password);
        } else {
            setAsNotLoading();
        }
    };
        
    return (
        <div id="pageWrapper" className='animation_fadeIn'>
            <h2>Join Us</h2>
            <form onSubmit={handleFormSubmit}>
                {/* <input type="text" id="firstName" name="firstName" placeholder="Enter First Name" required autoComplete='name' />
                    <input type="text" id="lasttName" name="lasttName" placeholder="Enter Last Name" required autoComplete='name' />
                    <input type="email" id="email" name="email" placeholder="Enter Email" required autoComplete='email' />
                    <input type="password" id="password" name="password" placeholder="Enter Your Password" required autoComplete='password' />
                    <input type="password" id="password" name="password" placeholder="Confirm Password" required /> */}


                <InputField name="firstName" placeholder="Enter First Name" type="text" required autoComplete='given-name' />
                <InputField name="lastName" placeholder="Enter Surname" type="text" required autoComplete='family-name' />
                <InputField name="email" placeholder="Enter Your Email" type="email" required autoComplete='email' />
                <InputField name="password"placeholder="Enter Password" type="password" required autoComplete='password' />
                <InputField name="confirm" placeholder="Confirm Password" type="password" required />
                {/* <input type="submit" className="" value="Sign Up" /> */}
                <MotionButton type='submit' className='submitButton'>
                    Sign Up
                </MotionButton>
            </form>

            <div id="formFooter w-100">
                <p>I agree to the <Link to='/terms' className='app__border-bottom fw-bold'><strong>Terms and Conditions</strong></Link></p>
            </div>
        </div>
    )
}

export default SignUpForm