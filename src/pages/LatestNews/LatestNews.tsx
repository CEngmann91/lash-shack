import './LatestNews.scss';
import { ImageBanner, PageWrapper } from '../../components'
import AuthModal from '../../components/AuthModal/AuthModal';
import emailjs from '@emailjs/browser';
import { useEffect, FormEvent, useState, useMemo } from 'react';
import { useDate } from '../../hooks/useDate';
import { showToast } from '../../util/toasts';
import useGetCourses from '../../hooks/useGetCourses';
import { ProductItem } from '../../types/ProductItem';

const LatestNews = () => {
    const { fullDateUK } = useDate();
    const { courses, loadingCourses, coursesError } = useGetCourses();
    const [selectedCourse, setSelectedCourse] = useState<ProductItem>();
    const quantity = 1;
    const deposit = 50;

    const [form, setForm] = useState({
        price: 0,
        deposit_amt_paid: 0,
        sub_total: 0,
        remaining_amt: 0,
    });

    // const price = useMemo(() => {
    //     return 
    // }, []);


    const sendEmail = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // const target = e.target as typeof e.target & {
        //     // name property has to match
        //     name: { value: string };
        //     contact_number: { value: string };
        //     course_name: { value: string };
        //     course_date: { value: string };
        // };
        // const name = target.name.value;       // typechecks!
        // const contact_number = target.contact_number.value; // typechecks!
        // const course_name = target.course_name.value;       // typechecks!
        // const course_date = target.course_date.value; // typechecks!

        // const depositPaid = (deposit * quantity);

        // const templateparams = {
        //     client_name: name,
        //     contact_number: contact_number,
        //     course_name: course_name,
        //     course_price: form.price,
        //     course_date: course_date,

        //     date_today: fullDateUK,
        //     order_number: "31031992",

        //     deposit_amt_paid: depositPaid,
        //     remaining_amt: (form.price - depositPaid)
        // };

        const serviceID: string = (process.env.REACT_APP_EMAILJS_SERVICE_ID as string);
        const courseRequestID: string = (process.env.REACT_APP_EMAILJS_COURSE_EMAIL_TEMPLATE_ID as string);
        const publicKey: string = (process.env.REACT_APP_EMAILJS_PUBLIC_KEY as string);

        try {
            emailjs.sendForm(serviceID, courseRequestID, e.currentTarget, publicKey)
            // emailjs.send(serviceID, courseRequestID, templateparams, publicKey)
                .then(function () {
                    showToast("SUCCESS!", "");
                }, function (error) {
                    showToast("" + error, "");
                });
        } catch (error) {
            showToast("" + error, "");
        }
    };

    const courseSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();

        var value: string = event.currentTarget.value;
        const item = courses?.filter(e => e.title === value);
        const course = item?.at(0);
        if (course) {
            setSelectedCourse(course);
            setForm({...form, price: course?.isOnSale ? course.salePrice : course.price })
        }
    }



    return (
        <section className='news__container'>
            <form onSubmit={sendEmail} className='d-flex flex-column w-100'>
                <label>Today</label>
                <input type="text" name="date_today" value={fullDateUK} readOnly />

                <label>Order #</label>
                <input type="text" name="order_number" value={'31031992'} readOnly />

                <label>Name</label>
                <input type="text" name="client_name" />

                <label>Contact Number</label>
                <input type="number" name="contact_number" />

                <label>Course</label>
                <select name="course_name" onChange={courseSelected}>
                    <option disabled value="" selected hidden>Please Select</option>
                    {courses?.map(course => (
                        <option>{course?.title}</option>
                    ))}
                </select>
                <label>Price</label>
                <input type="text" name="course_price" value={form.price} readOnly />
                <label>Deposit Amount: £50</label>
                <label>Outstanding Amount: £{form?.price - (50 * quantity)}</label>

                <input type="submit" value="Send" />

                <input type="text" name="course_date" value={fullDateUK} style={{ visibility: 'hidden' }} />
                <input type="text" name="deposit_amt_paid" value={deposit * quantity} style={{ visibility: 'hidden' }} />
                <input type="text" name="remaining_amt" value={form.price - (deposit * quantity)} style={{ visibility: 'hidden' }} />

                <input type="text" name="billing_name" value={"John Doe"} style={{ visibility: 'hidden' }} />
                <input type="text" name="billing_firstLine" value={"1st Line Address"} style={{ visibility: 'hidden' }} />
                <input type="text" name="billing_secondLine" value={"2nd Line Address"} style={{ visibility: 'hidden' }} />
                <input type="text" name="billing_city" value={"City"} style={{ visibility: 'hidden' }} />
                <input type="text" name="billing_postcode" value={"Post code here"} style={{ visibility: 'hidden' }} />
                <input type="text" name="billing_coutry" value={"United Kingdom"} style={{ visibility: 'hidden' }} />
                {/* <input type="text" name="billing_contactNumber" value={"+44 1234567890"} style={{ visibility: 'hidden' }} /> */}
            </form>
        </section>





        // <PageWrapper title="Latest News">
        //     <ImageBanner title={'Latest News'} />

        //     <section className='news__container'>
        //         Latest News
        //     </section>
        // </PageWrapper>
    )
}

export default LatestNews