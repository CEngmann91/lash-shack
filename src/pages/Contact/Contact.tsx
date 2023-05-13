
import './Contact.scss';
import { ChangeEvent, FormEvent, useState } from 'react';
import { PageWrapper, ImageBanner, InputField, MotionButton, TextArea, SelectDropdown, Breadcrumbs } from '../../components'
import MapViewFrame from '../../components/iFrames/MapViewFrame/MapViewFrame'
import { CONTACT } from '../../constants/constants'
import emailjs from '@emailjs/browser';
import { showToast } from '../../util/toasts';

const Contact = () => {
    const subjects = ["Feedback", "Training", "Other"]
    const [subject, setSubject] = useState<string>("");
    const [mapIndex, setMapIndex] = useState(0);



    const onMapChanged = (index: number) => {
        const isSame = mapIndex == index;
        if (isSame)
            return;
        const isLess = mapIndex > index;
        setMapIndex(index)
        
        const scroller = document.querySelector('#mapScroller');
        scroller?.scrollTo(isLess ? 0 : 800, 0) // ONLY 2 LOCATIONS FOR NOW!!
    };

    const onSubjectChanged = (value: string) => setSubject(value);

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const serviceID: string = (process.env.REACT_APP_EMAILJS_SERVICE_ID as string);
        const contactID: string = (process.env.REACT_APP_EMAILJS_CONTACT_FORM_ID as string);
        const publicKey: string = (process.env.REACT_APP_EMAILJS_PUBLIC_KEY as string);

        try {
            emailjs.sendForm(serviceID, contactID, e.currentTarget, publicKey)
                .then(function () {
                    showToast("Thank you. We will be in contact 💋", "");

                    e.currentTarget.reset();
                }, function (error) {
                    showToast("Unable to submit feedback. Try again?", "");
                });
        } catch (error) {
            // showToast("" + error, "");
        }
    }


    return (
        <PageWrapper title="Courses">
            <ImageBanner title='We Love Hearing From You' subtitle='How to find our beauty salon' />

            <section className='contact__section'>

                <h3>Contact Form</h3>
                <form onSubmit={handleFormSubmit} className='d-flex flex-column'>
                    <div className='d-flex flex-row gap-4'>
                        <InputField name="from_name" placeholder="Enter Name" type="text" autoComplete='name' required />
                        <InputField name="email" placeholder="Enter Email" type="text" required autoComplete='email' />
                    </div>
                    <div className='d-flex flex-row gap-4'>
                        <InputField name="number" placeholder="Enter Number" type="tel" autoComplete='tel' required />
                        <SelectDropdown
                            className='w-50'
                            name="subject"
                            placeholder='Subject'
                            selected={subject}
                            options={subjects}
                            onChange={onSubjectChanged}
                        />
                    </div>
                    <TextArea name='message' placeholder='Enter Message' required />

                    <MotionButton type='submit' className='submitButton'>
                        Send
                    </MotionButton>
                </form>

                {/* <div className='map-content'>
                    <MapViewFrame source={CONTACT.LOCATIONS[0].MAP} />
                </div> */}

                <div className="maps">
                    <div id='mapScroller' className="scroller">
                        <div className='item'>
                            <MapViewFrame source={CONTACT.LOCATIONS[0].MAP} />
                        </div>
                        <div className='item'>
                            <MapViewFrame source={CONTACT.LOCATIONS[1].MAP} />
                        </div>
                        {/* <div className='item'></div>
                        <div className='item'></div>
                        <div className='item'></div> */}

                        {/* <div className='item'></div>
                        <div className='item'></div>
                        <div className='item'></div>
                        <div className='item'></div>
                        <div className='item'></div>
                        <div className='item'></div>
                        <div className='item'></div>
                        <div className='item'></div>
                        <div className='item'></div> */}
                    </div>

                    {/* <p>{CONTACT.LOCATIONS[mapIndex].ADDRESS}</p> */}

                    <Breadcrumbs array={[CONTACT.LOCATIONS[0], CONTACT.LOCATIONS[1]]} index={mapIndex} onChange={onMapChanged} />
                </div>

            </section>
        </PageWrapper>
    )
}

export default Contact