import './Testimonials.scss';
import { LoadingSpinner } from '../../components'
import TestimonialCard from "./TestimonialCard/TestimonialCard";
import useGetTestimonials from "../../hooks/useGetTestimonials";

const Testimonials = () => {
    const { testimonials, loadingTestimonials, testimonialsError } = useGetTestimonials();

    return (
        // <PageWrapper title="Testimonials">
            <section className="testimonials__section">
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
            </section>
        // </PageWrapper>
    )
}

export default Testimonials