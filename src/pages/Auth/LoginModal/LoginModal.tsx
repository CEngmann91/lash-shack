import './LoginModal.scss';
import React, { useRef } from 'react'
import { Modal } from '../../../components/Modals';
import { useScrollLock } from '../../../helpers/hooks';
import { Card } from '../../../components/Cards';
import { Form_Input } from '../../../components/Form';

const LoginModal = () => {
    const { lockScroll, unlockScroll }  = useScrollLock();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);


    const onOpen = () => {
        lockScroll();
    }

    const onClose = () => {
        unlockScroll();
    }

    return (
        <></>
        // <Modal className='app__login-modal' closeButtonClassName='login-colose-button' onOpen={onOpen} onClose={onClose}>
        //     <Card className='card-window app__flex'>
        //         <h1 className="login">Sign In</h1>
        //         <form>
        //             <Form_Input ref={emailRef} required name="email" type="email" placeholder="Email" />
        //             <Form_Input ref={passwordRef} required name="password" type="password" placeholder="Password" />
        //         </form>
        //         <div className='h-content'>
        //             <button>Forgot Password</button>
        //             <button>Sign Up</button>
        //         </div>
        //         <button className='border-button login-button' onClick={() => {}}>Login</button>
        //     </Card>
        // </Modal>
    )
}

export default LoginModal