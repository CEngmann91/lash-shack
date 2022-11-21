import './TestimonialCard.scss';
import React from 'react'
import { iTestimonialReview } from '../Testimonial';
import { AnimatePresence, motion } from 'framer-motion';
import { QuoteRight, Star } from '../../../util/icons';
import { getDateFormatted } from '../../../constants/funcs';

const TestimonialCard: React.FC<iTestimonialReview> = ({ id, createdAt, starRating, title, description, ...props }: iTestimonialReview) => {
    const variants = {
        visible: {
            y: 0,
            opacity: [0, 1],
            transition: {
                duration: 0.5,
                delay: id * 0.1,
                ease: 'easeIn'
            }
        },
        hidden: { opacity: 0, y: 50 },
    }


    return (
        <article className="testimonial-card">
            <AnimatePresence>
                <motion.div
                    className="testimonial-card--wrapper"
                    variants={variants}
                    initial="hidden"
                    viewport={{ once: true }}
                    whileInView="visible"
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
                        transition: {
                            duration: 0.001,
                            // ease: 'linear'
                        }
                    }}
                >
                    <div className="content">
                        <div className="star">
                            {Array(starRating).fill(1).map((el, i) => <Star key={i} />)}
                        </div>

                        <div className="title">
                            <h1>{title}</h1>

                            <span className="quote-icon">
                                <QuoteRight />
                            </span>
                        </div>

                        {/* <div className="description"> */}
                            <label className="description">{description}</label>
                        {/* </div> */}

                        <div className="footer">
                            <label className="text">~~ {getDateFormatted(createdAt)}</label>
                        </div>
                    </div>
                </motion.div>






                {/* <motion.div
                    className="testimonial-card--wrapper"
                    initial={{ rotateY: 0 }}
                    viewport={{ once: true }}
                    whileInView={{
                        rotateY: 180,
                        transition: {
                            duration: 1,
                            delay: id * 0.1,
                            ease: 'easeOut'
                        }
                    }}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
                        transition: {
                            duration: 0.001,
                            // ease: 'linear'
                        }
                    }}
                >
                    <div className="back">
                        <div className="back--star">
                            {Array(starRating).fill(1).map((el, i) => <Star key={i} />)}
                        </div>

                        <div className="back--title">
                            <h1>{title}</h1>

                            <span className="quote-icon">
                                <QuoteRight />
                            </span>
                        </div>

                        <div className="back--description">
                            <label>{description}</label>
                        </div>

                        <div className="back--footer">
                            <label className="text">~~ {getDate(createdAt)}</label>
                        </div>
                    </div>
                </motion.div> */}
            </AnimatePresence>
        </article>
    )
}

export default TestimonialCard