import './GetInTouch.scss';
import React from 'react';
import { Page } from '..';
import { Email, Phone } from '../../util/icons';
import { CONTACT } from '../../constants/constants';
import { Card } from '../Cards';
import { MapViewFrame } from '../Frames';

const GetInTouch = () => {
    return (
        <Page id='contact' className='app__getInTouch' header='Get In Touch'>

            {/* <Card className='app__pad-hor content'> */}
            <div className='app__pad-hor content'>
                <Card className='app__half-height border-white border-white-shadow'>
                    <MapViewFrame className='map-view'
                        source="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d547.2194368048818!2d0.1739251796953675!3d51.57855856568328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a4b87d9ae185%3A0x86c325f6401e3d5b!2sSun%20Chasers!5e1!3m2!1sen!2suk!4v1668589047803!5m2!1sen!2suk"
                    />
                </Card>

                <div className='h-content'>
                    <div className="pad--left app__flex">
                        <h1>Location</h1>
                        <section style={{ alignItems: 'center', textAlign: 'center' }}>
                            <hr />
                            <p className='new-line address'>{CONTACT.ADDRESS}</p>

                            <div className='get-in-contact app__flex'>
                                <a href={""} className='border-button get-in-contact-button'><Phone /></a>
                                <a href={
                                    // CONTACT.EMAIL
                                    ""
                                } className='border-button get-in-contact-button'><Email /></a>
                            </div>
                        </section>

                    </div>
                    <div className="pad--right app__flex">
                        <h1>Hours</h1>
                        <section style={{ alignItems: 'center', textAlign: 'center' }}>
                            <hr />
                            <p style={{ fontWeight: 'bolder', fontStyle: "italic" }}>Mon to Thu:</p>
                            <p>9:30am - 5.30pm</p>
                            <p style={{ fontWeight: 'bolder', fontStyle: "italic" }}>Fri:</p>
                            <p>9:30am - 6.30pm</p>
                            <p style={{ fontWeight: 'bolder', fontStyle: "italic" }}>Sat:</p>
                            <p>10am - 3.30pm</p>
                        </section>
                    </div>
                </div>
            </div>
            {/* </Card> */}








            {/* <div className='app__pad-hor content'>
            <MapView className='map-view app__half-width app__half-height border-white border-white-shadow'
                source="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d547.2194368048818!2d0.1739251796953675!3d51.57855856568328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a4b87d9ae185%3A0x86c325f6401e3d5b!2sSun%20Chasers!5e1!3m2!1sen!2suk!4v1668589047803!5m2!1sen!2suk"
            />

            <div className="fields app__half-width">
                <h1>Title</h1>
            </div>
        </div> */}
        </Page>
    )
}

export default GetInTouch