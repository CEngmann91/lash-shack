
import './Contact.scss';
import { ChangeEvent, FormEvent, useState } from 'react';
import { PageWrapper, ImageBanner, InputField, MotionButton, TextArea, SelectDropdown } from '../../components'
import MapViewFrame from '../../components/iFrames/MapViewFrame/MapViewFrame'
import { CONTACT } from '../../constants/constants'
import emailjs from '@emailjs/browser';
import { showToast } from '../../util/toasts';

const Contact = () => {
    const [subject, setSubject] = useState<string>("");
    const subjects = [
        "Feedback", "Training", "Other", 
    ]



    const onSubectChanged = (value: string) => setSubject(value);

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const serviceID: string = (process.env.REACT_APP_EMAILJS_SERVICE_ID as string);
        const contactID: string = (process.env.REACT_APP_EMAILJS_CONTACT_FORM_ID as string);
        const publicKey: string = (process.env.REACT_APP_EMAILJS_PUBLIC_KEY as string);

        emailjs.sendForm(serviceID, contactID, e.currentTarget, publicKey)
            .then(function () {
                showToast("Thank you for the feedback 💋", "");
            }, function (error) {
                showToast("Unable to submit feedback. Try again?", "");
            });

        e.currentTarget.reset();
    }


    return (
        <PageWrapper title="Courses">
            <ImageBanner title='Contact Us' subtitle='How to find our beauty salon' />

            <section className='contact__section'>

                <h3>Contact Form</h3>
                <form onSubmit={handleFormSubmit} className='d-flex flex-column'>
                    <div className='d-flex flex-row gap-4'>
                        <InputField name="from_name" placeholder="Enter Name" type="text" required />
                        <InputField name="email" placeholder="Enter Email" type="text" required autoComplete='email' />
                    </div>
                    <div className='d-flex flex-row gap-4'>
                        <InputField name="number" placeholder="Enter Number" type="number" required />
                        <SelectDropdown
                            className='w-50'
                            name="subject"
                            placeholder='Subject'
                            selected={subject}
                            options={subjects}
                            onChange={onSubectChanged}
                        />
                    </div>
                    <TextArea name='message' placeholder='Enter Message' required />
                    <MotionButton type='submit' className='submitButton'>
                        Send
                    </MotionButton>
                </form>

                <div className='map-content'>
                    <MapViewFrame source={CONTACT.LOCATIONS[0].MAP} />
                </div>
            </section>
        </PageWrapper>
    )
}

export default Contact