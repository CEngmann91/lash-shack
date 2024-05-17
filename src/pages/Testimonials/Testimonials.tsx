import './Testimonials.scss';
import { LoadingSpinner } from '../../components'
import TestimonialCard from "./TestimonialCard/TestimonialCard";
import useGetTestimonials from "../../hooks/useGetTestimonials";
import Parallax from '../../components/Parallax/Parallax';

const Testimonials = () => {
    const { testimonials, loadingTestimonials, testimonialsError } = useGetTestimonials();

    return (
        <Parallax
            // backgroundUrl='https://images.unsplash.com/photo-1610128114197-485d933885c5?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjIzOTA2Nzc&ixlib=rb-1.2.1&q=80'
            // backgroundUrl='https://img.freepik.com/free-photo/woman-eye-with-curl-false-eyelashes-low-angle-view_186202-5248.jpg?w=1480&t=st=1683500660~exp=1683501260~hmac=b4bb2db4f5011b7ef1e2f650818cbd78335c862bc240a31a79093cd7d5a64e2c'
            id="about"
            className="testimonials__section"
        >
            <h5 className="text-center mb-2">Testimonials</h5>
            <h1 className="text-center mb-4">We Love Hearing From You</h1>

            {loadingTestimonials ?
                <LoadingSpinner title="Loading..." />
                :
                <div className="list">
                    {testimonials.map(({ id, createdAt, starRating, title, description, customerName }, index) => {

                        return (
                            <TestimonialCard
                                key={index}
                                id={id}
                                createdAt={createdAt}
                                starRating={starRating}
                                title={title}
                                description={description}
                                customerName={customerName}
                            />
                        )
                    })}
                </div>
            }
        </Parallax>



        // // <PageWrapper title="Testimonials">
        //     <section className="testimonials__section">
        //         <h5 className="text-center mb-2">Testimonials</h5>
        //         <h1 className="text-center mb-4">We Love Hearing From You</h1>


        //         {loadingTestimonials ?
        //             <LoadingSpinner title="Loading..." />
        //             :
        //             <div className="list">
        //                 {testimonials.map(({ id, createdAt, starRating, title, description, customerName }, index) => {

        //                     return (
        //                         <TestimonialCard
        //                             key={index}
        //                             id={id}
        //                             createdAt={createdAt}
        //                             starRating={starRating}
        //                             title={title}
        //                             description={description}
        //                             customerName={customerName}
        //                         />
        //                     )
        //                 })}
        //             </div>
        //         }
        //     </section>
        // // </PageWrapper>
    )
}

export default Testimonials