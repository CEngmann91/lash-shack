import './LoginForm.scss';
import { Checkbox, InputField, MotionButton } from '../..'
import { FormEvent, useState } from 'react';
import ForgotPasswordForm from '../ForgotPasswordForm/ForgotPasswordForm';

import { signIntoUserAccount, signUserOut, updateUserDisplayName } from '../../../helpers/firebase/firebaseHelper';
import { useUserActions } from '../../../redux/hooks/useUserActions';
import { useApplicationActions } from '../../../redux/hooks/useApplicationActions';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setAsLoading, setAsNotLoading, toggleAuthModal } = useApplicationActions();
    const { setAsActive, setFullName, setProfile, setAccountType } = useUserActions();
    const [forgotPassword, setForgotPassword] = useState(false);




    const handleFormSubmit = async (e: FormEvent<EventTarget | HTMLFormElement>) => {
        e.preventDefault();

        setAsLoading();

        const target = e.target as typeof e.target & {
            // name property has to match
            email: { value: string };
            password: { value: string };
        };
        const email = target.email.value;       // typechecks!
        const password = target.password.value; // typechecks!
        if (!email || !password) {
            setAsNotLoading();
            toggleAuthModal();
            return;
        }
        await login(email, password);
    };

    const login = async (email: string, password: string) => {
        const signInReq = await signIntoUserAccount(email, password)
        if (signInReq) {
            if (!signInReq.active) {
                alert(signInReq.email + " is not active");
                await signUserOut(signInReq);
                setAsNotLoading();
                return;
            }

            // console.log(signInReq);
            setAsActive(true);
            setAccountType(signInReq.account);
            setFullName(signInReq.firstName, signInReq.lastName);
            setProfile(signInReq.displayName, signInReq.photoURL);

            setAsNotLoading();


            // if (location.pathname.includes("login")
            //     || location.pathname.includes("register")
            //     || location.pathname.includes("forgot")
            // )
            //     navigate("/");
            // else
            //     navigate(-1);

            toggleAuthModal();
        }
        else {

        }
    }

    return (
        // forgotPassword ? (
        //     <ForgotPasswordForm />
        // ) : (
            <div id="pageWrapper" className='fadeIn'>
                <h2>Welcome</h2>
                <form onSubmit={handleFormSubmit}>
                    {/* <input type="text" id="login" name="login" placeholder="login" />
                    <input type="text" id="password" name="login" placeholder="password" /> */}

                    <InputField name="email" placeholder="Enter Your Email" type="text" required autoComplete='email' />
                    <InputField name="password" placeholder="Enter Password" type="password" required autoComplete='password' />
                    <Checkbox label='Stay Signed In' onChange={(value) => { }} />
                    {/* <input type="submit" className="" value="Log In" /> */}
                    <MotionButton type='submit' className='submitButton'>
                        Log In
                    </MotionButton>
                </form>

                {/* <!-- Remind Passowrd --> */}
                <div id="formFooter w-100">
                    <a className="app__underlineHover" href="#" onClick={() => setForgotPassword(prev => prev = !prev)}><strong>Forgot Password?</strong></a>
                </div>
            </div>
        // )
    )
}

export default LoginForm