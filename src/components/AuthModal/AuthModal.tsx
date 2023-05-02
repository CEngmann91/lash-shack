import './AuthModal.scss';
import { useEffect, useState } from 'react'
import InputField from '../Form/Input/InputField';
import { Checkbox, Form_RadioOptionGroup, MotionButton } from '..';
import images from '../../res/images';
import { useScrollLock } from '../../hooks/useScrollLock';
import { useApplicationActions } from '../../redux/hooks/useApplicationActions';
import LoginForm from './LoginForm/LoginForm';
import SignUpForm from './SignUpForm/SignUpForm';

type LoadingScreenProps = {
    visible: boolean;
}
const AuthModal = ({ visible }: LoadingScreenProps) => {
    const { lockScroll, unlockScroll } = useScrollLock();
    // const tabs = ['Log In', 'Sign Up'];
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const { toggleAuthModal } = useApplicationActions();
    const [forgotPassword, setForgotPassword] = useState(false);



    useEffect(() => {
        if (!visible)
            unlockScroll();
        else
            lockScroll();
    }, [visible])



    if (!visible) {
        return null;
    }



    return (
        <div id='authModal'>
            <div className='background' onClick={toggleAuthModal} />

            <div className="wrapper">
                <div id="formContent">
                    {!forgotPassword && (
                        <Form_RadioOptionGroup wrapperClassName='auth-tabs' value={selectedTabIndex} options={["Sign In", "Sign Up"]} onChange={setSelectedTabIndex} />
                    )}
                    {selectedTabIndex == 0 ? (
                        <LoginForm />
                    ) : (
                        <SignUpForm />
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuthModal