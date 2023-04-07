import './TestimonialCard.scss';
import { Testimonial } from '../../../types/Testimonial';
import { motion } from 'framer-motion';
import { Icon_QuoteRight, Icon_Star } from '../../../res/icons';

const TestimonialCard = (item: Testimonial) => {
    const { id, createdAt, starRating, title, description } = item;

    const variants = {
        visible: {
            y: 0,
            opacity: [0, 1],
        },
        hidden: { opacity: 0, y: 50 },
    }


    return (
        <motion.div
            className="testimonial-card card-5"
            initial="hidden"
            whileInView='visible'
            variants={variants}
            viewport={{ once: true }}
            transition={{
                duration: 0.5,
                delay: id * 0.3
                // ease: [0.4, 0, .2, 1]
            }}
        >
            <div className="card__icon d-flex flex-row w-50">
                {Array(starRating).fill(1).map((el, i) => <Icon_Star key={i} />)}
            </div>
            <p className="card__exit">※</p>
            <div className="text fw-bold">{title}</div>
            <div className="text">{description}</div>
            {/* <p className="card__apply">
                <a className="card__link" href="#">Apply Now <i className="fas fa-arrow-right"></i></a>
            </p> */}
        </motion.div>




        // <article className="testimonial-card">
        //     <motion.div
        //         className="testimonial-card--wrapper"
        //         variants={variants}
        //         initial="hidden"
        //         viewport={{ once: true }}
        //         whileInView="visible"
        //         whileHover={{
        //             scale: 1.05,
        //             boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
        //             transition: {
        //                 duration: 0.001,
        //                 // ease: 'linear'
        //             }
        //         }}
        //     >
        //         <div className="content">
        //             <div className="test-star d-flex flex-row">
        //                 {Array(starRating).fill(1).map((el, i) => <Icon_Star key={i} />)}
        //             </div>

        //             <div className="test-title">
        //                 <h1>{title}</h1>

        //                 <div className="test-quote-icon">
        //                     <Icon_QuoteRight />
        //                 </div>
        //             </div>

        //             <label className="test-description">{description}</label>

        //             <div className="test-footer">
        //                 <span>{createdAt}</span>
        //             </div>
        //         </div>
        //     </motion.div>
        // </article>
    )
}

export default TestimonialCard