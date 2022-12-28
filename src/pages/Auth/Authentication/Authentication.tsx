import './Authentication.scss';
import React, { useEffect, useState } from 'react'
import { Card } from '../../../components/Cards';
import { Form_Inputfield } from '../../../components/Form';
import { useAuthContext } from '../../../providers/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import { CheckBox } from '../../../components';
import { Eye } from '../../../util/icons';

type Screen = "Login" | "Register";


type AuthenticationProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}
function Authentication({ isOpen, onOpen, onClose }: AuthenticationProps) {
    const { profile, isAuthenticating, isAuthenticated, signIn, register, signOut } = useAuthContext();
    const [screen, setScreen] = useState<Screen>("Login");



    useEffect(() => {
        signOut(() => onClose());
    }, [])
    


    if (!isOpen)
        return null;

    const renderLoginComponent = () => {
        /*const variants = {
            visible: {
                y: 0,
                opacity: [0, 1],
                transition: {
                    staggerChildren: 0.07,
                    staggerDirection: 1,
                    duration: 0.5,
                    delay: 0.5,
                    ease: 'easeIn'
                }
            },
            hidden: {
                y: 250,
                opacity: 0,
                transition: {
                    staggerChildren: 0.07,
                    staggerDirection: -1,
                    duration: 0.2,
                    ease: 'easeOut'
                }
            },
        }*/

        const handleFormSubmit = (e: React.FormEvent<EventTarget | HTMLFormElement>) => {
            e.preventDefault();

            const target = e.target as typeof e.target & {
                // name property has to match
                email: { value: string };
                password: { value: string };
            };
            const email = target.email.value;       // typechecks!
            const password = target.password.value; // typechecks!
            if (!email || !password) {
                return;
            }
            // signIn(email, password, () => navigate("/dashboard"))
            signIn(email, password, () => onClose())
        };


        return (
            <Card className="card--content login--content">
                <h1 className='txt-cntr title'>Sign In</h1>
                <form onSubmit={handleFormSubmit}>
                    <Form_Inputfield required name="email" type="email" placeholder="Email" autoComplete='email' />
                    <Form_Inputfield required name="password" type="password" placeholder="Password" autoComplete='current-password' />
                    {/* <CheckBox label='Stay signed in' onChange={val => {  }} /> */}
                    <div className='options'>
                        <button className='forgot-password'>Forgot Password</button>
                        <button className='signup' onClick={() => setScreen("Register")}>Signup</button>
                    </div>

                    <div className='app__flex'>
                        <button className='border-button login-button' type='submit' disabled={!isAuthenticated() && isAuthenticating}>
                            {!isAuthenticated() ? "Login" : (isAuthenticating ? "Loading..." : "Logged In")}
                        </button>
                    </div>

                </form>
            </Card>
        );
    }


    const renderRegistrationComponent = () => {


        const handleFormSubmit = (e: React.FormEvent<EventTarget | HTMLFormElement>) => {
            e.preventDefault();

            const target = e.target as typeof e.target & {
                // name property has to match
                email: { value: string };
                password: { value: string };
            };
            const email = target.email.value;       // typechecks!
            const password = target.password.value; // typechecks!
            if (!email || !password) {
                return;
            }
            register(email, password);
        }

        return (
            <Card className="card--content register--content">
                <h1 className='txt-cntr title'>Register</h1>

                <form onSubmit={handleFormSubmit}>
                    <Form_Inputfield required name="firstname" type="text" placeholder="First Name" autoComplete="given-name" />
                    <Form_Inputfield required name="surname" type="text" placeholder="Surname" autoComplete="family-name" />
                    <Form_Inputfield required name="email" type="email" placeholder="Email" autoComplete="email" />
                    <Form_Inputfield required name="password" type="password" placeholder="Password" autoComplete='current-password' />
                    <Form_Inputfield required name="confirmpassword" type="password" placeholder="Confirm Password" autoComplete='current-password' />

                    <div className='app__flex h-content buttons'>
                        <button className='border-button' onClick={() => setScreen("Login")}>Go Back</button>
                        <button
                            className='border-button' type='submit'
                            disabled={!isAuthenticated() && isAuthenticating}
                        >
                            {/* {!isAuthenticated() ? "Login"
                                :
                                (isAuthenticating ? "Loading..." : `Hi ${profile?.display_name}`)
                            } */}

                            Confirm
                        </button>
                    </div>
                </form>
            </Card>
        );
    }


    return (
        <div className='app__flex app__authentication'>
            <div className="backdrop" onClick={() => onClose()} />
            {screen === "Login" ? (renderLoginComponent()) : (renderRegistrationComponent())}
            {/* </div> */}

            {/* {isAuthenticating ? <div>Authenticating</div> : null} */}
        </div>
    )
}

export default Authentication