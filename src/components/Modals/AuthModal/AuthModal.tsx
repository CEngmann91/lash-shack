import './AuthModal.scss';
import React, { useCallback, useEffect, useState } from 'react';
import InputField from '../../Form/Input/InputField';
import { Checkbox, Form_RadioOptionGroup, MotionButton } from '../..';
import images from '../../../res/images';
import { useScrollLock } from '../../../hooks/useScrollLock';
import { useApplicationActions } from '../../../redux/hooks/useApplicationActions';
import LoginForm from './LoginForm/LoginForm';
import SignUpForm from './SignUpForm/SignUpForm';
import ForgotPasswordForm from './ForgotPasswordForm/ForgotPasswordForm';

type LoadingScreenProps = {
    visible: boolean;
}

const LOGIN_TAB_INDEX = 0;
const SIGNUP_TAB_INDEX = 1;

const AuthModal = ({ visible }: LoadingScreenProps) => {
    const { lockScroll, unlockScroll } = useScrollLock();
    const tabs = ['Log In', 'Sign Up'];
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const { toggleAuthModal } = useApplicationActions();
    const [forgotPassword, setForgotPassword] = useState(false);

    const handleForgotPassword = useCallback(() => {
        setForgotPassword(true);
    }, []);

    const handleCancel = useCallback(() => {
        setForgotPassword(false);
    }, []);

    useEffect(() => {
        if (!visible)
            unlockScroll();
        else
            lockScroll();
        setSelectedTabIndex(LOGIN_TAB_INDEX);
    }, [visible])

    if (!visible) {
        return null;
    }

    return (
        <div id='authModal'>
            <div className='background animation_fadeIn' onClick={toggleAuthModal} />

            <div className="wrapper animation_fadeInDown">
                <div id="formContent">
                    {forgotPassword ? (
                        <ForgotPasswordForm onCancel={() => setForgotPassword(false)} />
                    ) : (
                        <>
                            <Form_RadioOptionGroup wrapperClassName='auth-tabs' value={selectedTabIndex} options={tabs} onChange={setSelectedTabIndex} />
                            {selectedTabIndex == 0 ? (
                                <LoginForm onForgotPassword={() => setForgotPassword(true)} />
                            ) : (
                                <SignUpForm />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default React.memo(AuthModal);