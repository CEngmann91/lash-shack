import './Contact.scss';
import React, { useRef } from 'react';
import { Page } from '../../../components';
import { Form_Inputfield, Form_TextArea } from '../../../components/Form';
import { QuoteRight } from '../../../util/icons';
import { Card } from '../../../components/Cards';

const Contact = () => {
    // const nameRef = useRef<HTMLInputElement>(null);
    // const emailRef = useRef<HTMLInputElement>(null);
    // const emailContenRef = useRef<HTMLTextAreaElement>(null);



    const handleFormSubmit = (e: React.FormEvent<EventTarget | HTMLFormElement>) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            name: { value: string };        // name property has to match
            email: { value: string };       // name property has to match
            message: { value: string };     // name property has to match
        };
        const name = target.name.value;         // typechecks!
        const email = target.email.value;       // typechecks!
        const message = target.message.value;   // typechecks!

        // alert(`name: ${name}\n email: ${email}\n message: ${message}`);
    }


    return (
        <Page id='contact' className='app__contact' header=''>

            <Card className="app__contact--content">
                <h1 className='txt-cntr title'>Contact Us</h1>
                <form onSubmit={handleFormSubmit}>
                    <Form_Inputfield required name="name" type="name" placeholder="Name" />
                    <Form_Inputfield required name="email" type="email" placeholder="Email" />
                    <Form_TextArea required name="message" placeholder="Message" />

                    <div className='app__flex'>
                        <button className='border-button send'>
                            Send
                        </button>
                    </div>
                    
                </form>
            </Card>

        </Page>
    )
}

export default Contact