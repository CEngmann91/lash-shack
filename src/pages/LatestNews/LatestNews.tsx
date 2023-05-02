import './LatestNews.scss';
import { ImageBanner, PageWrapper } from '../../components'
import AuthModal from '../../components/AuthModal/AuthModal';
import emailjs from '@emailjs/browser';
import { useEffect, FormEvent } from 'react';

const LatestNews = () => {



    const sendEmail = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const serviceID: string = (process.env.REACT_APP_EMAILJS_SERVICE_ID as string);
        const courseRequesrID: string = (process.env.REACT_APP_EMAILJS_COURSE_EMAIL_TEMPLATE_ID as string);
        const publicKey: string = (process.env.REACT_APP_EMAILJS_PUBLIC_KEY as string);

        emailjs.sendForm(serviceID, courseRequesrID, e.currentTarget, publicKey)
            .then(function () {
                console.log('SUCCESS!');
            }, function (error) {
                console.log('FAILED...', error);
            });
    };



    return (
        <form onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="from_name" />

            <label>Contact Number</label>
            <input type="number" name="contact_number" />

            <label>Course</label>
            <input type="text" name="course_name" value="Classic Course" readOnly />

            <label>Date</label>
            <input type="text" name="course_date" value="Friday, 14 April 2023" readOnly />

            {/* <label>Message</label> */}
            {/* <textarea name="message" /> */}

            <input type="submit" value="Send" />
        </form>








        // <AuthModal />







        // <PageWrapper title="Latest News">
        //     <ImageBanner title={'Latest News'} />

        //     <section className='news__container'>
        //         Latest News
        //     </section>
        // </PageWrapper>
    )
}

export default LatestNews