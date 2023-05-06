import './LatestNews.scss';
import { ImageBanner, PageWrapper } from '../../components'
import AuthModal from '../../components/AuthModal/AuthModal';
import emailjs from '@emailjs/browser';
import { useEffect, FormEvent, useState } from 'react';
import { useDate } from '../../hooks/useDate';
import { showToast } from '../../util/toasts';
import useGetCourses from '../../hooks/useGetCourses';
import { ProductItem } from '../../types/ProductItem';

const LatestNews = () => {
    const { fullDateUK } = useDate();
    const { courses, loadingCourses, coursesError } = useGetCourses();
    const [selectedCourse, setSelectedCourse] = useState<ProductItem>();


    const sendEmail = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const serviceID: string = (process.env.REACT_APP_EMAILJS_SERVICE_ID as string);
        const courseRequesrID: string = (process.env.REACT_APP_EMAILJS_COURSE_EMAIL_TEMPLATE_ID as string);
        const publicKey: string = (process.env.REACT_APP_EMAILJS_PUBLIC_KEY as string);

        emailjs.sendForm(serviceID, courseRequesrID, e.currentTarget, publicKey)
            .then(function () {
                showToast("SUCCESS!", "");
            }, function (error) {
                showToast("" + error, "");
            });
    };

    const courseSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();

        var value: string = event.currentTarget.value;
        const item = courses?.filter(e => e.title === value);
        setSelectedCourse(item?.at(0));
    }



    return (
        <form onSubmit={sendEmail} className='d-flex flex-column w-25'>
            <label>Name</label>
            <input type="text" name="client_name" />

            <label>Contact Number</label>
            <input type="number" name="contact_number" />

            <label>Course</label>
            <select name="course_name" onChange={courseSelected}>
                {courses?.map(course => (
                    <option>{course?.title}</option>
                ))}
            </select>
            <label>Price</label>
            <input type="text" name="course_price" value={selectedCourse?.isOnSale ? selectedCourse.salePrice : selectedCourse?.price} readOnly />

            <label>Date</label>
            <input type="text" name="course_date" value={fullDateUK} readOnly />

            <input type="submit" value="Send" />


            <input type="text" name="date_today" value={fullDateUK} style={{ visibility: 'hidden' }} />
            <input type="text" name="order_number" value={'31031992'} style={{ visibility: 'hidden' }} />
            <input type="text" name="course_price" value={selectedCourse?.isOnSale ? selectedCourse.salePrice : selectedCourse?.price} style={{ visibility: 'hidden' }} />

            <input type="text" name="billing_name" value={"John Doe"} style={{ visibility: 'hidden' }} />
            <input type="text" name="billing_firstLine" value={"1st Line Address"} style={{ visibility: 'hidden' }} />
            <input type="text" name="billing_secondLine" value={"2nd Line Address"} style={{ visibility: 'hidden' }} />
            <input type="text" name="billing_city" value={"City"} style={{ visibility: 'hidden' }} />
            <input type="text" name="billing_postcode" value={"Post code here"} style={{ visibility: 'hidden' }} />
            <input type="text" name="billing_coutry" value={"United Kingdom"} style={{ visibility: 'hidden' }} />
            {/* <input type="text" name="billing_contactNumber" value={"+44 1234567890"} style={{ visibility: 'hidden' }} /> */}
        </form>





        // <PageWrapper title="Latest News">
        //     <ImageBanner title={'Latest News'} />

        //     <section className='news__container'>
        //         Latest News
        //     </section>
        // </PageWrapper>
    )
}

export default LatestNews