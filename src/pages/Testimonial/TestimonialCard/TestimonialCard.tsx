import './TestimonialCard.scss';
import React from 'react'
import { iReview } from '../Testimonial';
import { AnimatePresence, motion } from 'framer-motion';
import { Star } from '../../../util/icons';
import moment from 'moment';

const TestimonialCard: React.FC<iReview> = ({ id, consumer, starRating, title, description, ...props }: iReview) => {

    const getDate = (date : string) => {
        return moment(date, 'DD/MM/YYYY').fromNow();
    }

    return (
        <article className="card">
            <AnimatePresence>
                <motion.div
                    className="card--wrapper"
                    initial={{ rotateY: 0 }}
                    viewport={{ once: true }}
                    whileInView={{ rotateY: 180 }}
                    transition={{
                        duration: 1,
                        delay: id * 0.1,
                        ease: 'easeOut'
                    }}
                // whileHover={{
                // y: '-1em',
                // boxShadow: "0 0.5em 0.5em -0.4em gray",
                // transition: { duration: 0.1 },
                // }}
                >
                    {/* <div className="front" /> */}

                    <div className="back">
                        <div className="back--star">
                            {Array(starRating).fill(1).map((el, i) => <Star key={i} />)}
                        </div>

                        <div className="back--title">
                            <h1>{title}</h1>
                        </div>

                        <div className="back--description">
                            <label>{description}</label>
                        </div>


                        <label className='back--date'>{getDate(consumer.createdAt)}</label>

                        <div className="back--footer">
                            <label className="name">~~ {consumer.displayName}</label>
                        </div>

                        {/* <div className="back--name">
                            <label>~~ {consumer.displayName}</label> */}
                        {/* <label>{consumer.createdAt}</label> */}
                        {/* </div> */}

                    </div>
                </motion.div>
            </AnimatePresence>


        </article>
    )
}

export default TestimonialCard