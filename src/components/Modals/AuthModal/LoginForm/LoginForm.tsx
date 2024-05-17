import './LoginForm.scss';
import { useCallback, FormEvent } from 'react';
import { InputField, MotionButton } from '../../..'

import { signIntoUserAccount, signUserOut } from '../../../../firebase/firebaseHelper';
import { useUserActions } from '../../../../redux/hooks/useUserActions';
import { useApplicationActions } from '../../../../redux/hooks/useApplicationActions';
import { showAccountInactiveToast, showLoggedInToast, showToast } from '../../../../util/toasts';

type LoginFormProps = {
    onForgotPassword: () => void;
}
const LoginForm = ({ onForgotPassword }: LoginFormProps) => {
    const { setAsLoading, setAsNotLoading, toggleAuthModal } = useApplicationActions();
    const { setAsActive, setFullName, setProfile, setAccountType } = useUserActions();

    const validateForm = (email: string, password: string) => {
        if (!email || !password) {
            return false;
        }
        return true;
    };
    
    const login = useCallback(async (email: string, password: string) => {
        try {
            const signInReq = await signIntoUserAccount(email, password);
            if (signInReq) {
                const { active, account, firstName, lastName, displayName, photoURL } = signInReq;
                if (!active) {
                    showAccountInactiveToast();
                    await signUserOut(signInReq);
                    setAsNotLoading();
                    return;
                }
                setAsActive(true);
                setAccountType(account);
                setFullName(firstName, lastName);
                setProfile(displayName, photoURL);
                setAsNotLoading();
                showLoggedInToast(firstName);
                toggleAuthModal();
            } else {
                // Handle login failure
                showToast('An error occurred during login.', '', null);
            }
        } catch (error) {
            // Handle login error
            showToast('An error occurred during login.', '', null);
        }
    }, [setAsActive, setAccountType, setFullName, setProfile, setAsNotLoading, toggleAuthModal]);
    
    const handleFormSubmit = async(e: FormEvent<EventTarget | HTMLFormElement>) => {
        e.preventDefault();
        setAsLoading();
        const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
        };
        const email = target.email.value;
        const password = target.password.value;
        if (validateForm(email, password)) {
            login(email, password);
        } else {
            setAsNotLoading();
            toggleAuthModal();
        }
    };

    return (
        <div id="pageWrapper" className='animation_fadeIn'>
            <h2>Welcome</h2>
            <form onSubmit={handleFormSubmit}>
                {/* <input type="text" id="login" name="login" placeholder="login" />
                <input type="text" id="password" name="login" placeholder="password" /> */}

                <InputField name="email" placeholder="Enter Your Email" type="text" required autoComplete='email' />
                <InputField name="password" placeholder="Enter Password" type="password" required autoComplete='password' />
                {/* <Checkbox label='Stay Signed In' onChange={(value) => { }} /> */}
                {/* <input type="submit" className="" value="Log In" /> */}
                <MotionButton type='submit' className='submitButton'>
                    Log In
                </MotionButton>
            </form>

            {/* <!-- Remind Passowrd --> */}
            {/* <div id="formFooter w-100">
                <a className="app__border-bottom" href="#" onClick={onForgotPassword}><strong>Forgot Password?</strong></a>
            </div> */}
        </div>
    )
}

export default LoginForm