import './Contact.scss';
import React, { useRef } from 'react';
import { Page } from '../../../components';
import { Form_Input } from '../../../components/Form';
import { QuoteRight } from '../../../util/icons';

const Contact = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLInputElement>(null);


    return (
        <Page id='contact' className='app__contact' header='Contact Us'>

            <div className="app__contact--content">
                <form>
                    <Form_Input ref={nameRef} required name="name" type="text" placeholder="Name" />
                    <Form_Input ref={emailRef} required name="email" type="email" placeholder="Email" />
                </form>
            </div>

        </Page>
    )
}

export default Contact