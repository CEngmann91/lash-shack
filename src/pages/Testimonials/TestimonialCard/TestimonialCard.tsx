import './TestimonialCard.scss';
import { Testimonial } from '../../../types/Testimonial';
import { Icon_Star } from '../../../res/icons';

type TestimonialCardProps = {
    data: Testimonial;
}
const TestimonialCard = ({ data }: TestimonialCardProps) => {
    const { title, starRating, description, createdAt, customerName } = data;

    return (
        <div className="testimonial-card">
            <div className="wrapper">
                <div className="card-top">
                    <div className="profile">
                        <div className="title-date">
                            <strong>{title}</strong>
                            <span>{createdAt}</span>
                        </div>
                    </div>

                    <div className="reviews">
                        {[...Array(Math.floor(starRating))].map((i) =>
                            <span key={i}><Icon_Star /></span>
                        )}
                    </div>
                </div>


                <div className="client-comment">
                    <p>{description}</p>
                </div>

                {/* <div className="d-flex justify-content-between">
                    <p className='title'>{title}</p>

                    <div className="d-flex flex-row">
                        {[...Array(Math.floor(starRating))].map((i) =>
                            <div key={i}>
                                <span><Icon_Star /></span>
                            </div>
                        )}
                    </div>
                </div>

                <h1>{title}</h1>
                <h1>{description}</h1>
                <h1>{createdAt}</h1>
                <h1>{customerName}</h1> */}
            </div>
        </div >
    )
}

export default TestimonialCard