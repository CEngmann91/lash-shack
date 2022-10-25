import './TestimonialCard.scss';
import React from 'react'
import { iReview } from '../Testimonial';
import { AnimatePresence, motion } from 'framer-motion';
import { QuoteRight, Star } from '../../../util/icons';
import moment from 'moment';

const TestimonialCard: React.FC<iReview> = ({ id, createdAt, starRating, title, description, ...props }: iReview) => {

    const getDate = (date: string) => {
        return moment(date, 'DD/MM/YYYY').fromNow();
    }

    return (
        <article className="card">
            <AnimatePresence>
                <motion.div
                    className="card--wrapper"
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
                </motion.div>
            </AnimatePresence>
        </article>
    )
}

export default TestimonialCard