import './TestimonialCard.scss';
import React from 'react'
import { iReview } from '../Testimonial';
import { AnimatePresence, motion } from 'framer-motion';
import { Star } from '../../../util/icons';

const TestimonialCard: React.FC<iReview> = ({ id, consumer, starRating, title, description, ...props }: iReview) => {

    return (
        <article className="card">
            <AnimatePresence>
                <motion.div
                    className="card--wrapper"
                    initial={{ rotateY: 0 }}
                    whileInView={{ rotateY: 180 }}
                    transition={{
                        duration: 1,
                        delay: id * 0.1,
                        ease: 'easeOut'
                    }}
                    viewport={{ once: true }}
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

                        <div className="back--name">
                            <label>{consumer.displayName}</label>
                        </div>

                    </div>
                </motion.div>
            </AnimatePresence>


        </article>
    )
}

export default TestimonialCard