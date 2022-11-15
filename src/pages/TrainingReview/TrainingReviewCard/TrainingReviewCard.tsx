import './TrainingReviewCard.scss';
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { QuoteRight } from '../../../util/icons';
import { iTrainingReview } from '../TrainingReview';

const TrainingReviewCard: React.FC<iTrainingReview> = ({ id, name, description, ...props }: iTrainingReview) => {

    return (
        <article className="review-card">
            <AnimatePresence>
                <motion.div
                    className="review-card--wrapper"
                    initial={{ rotateY: 0 }}
                    viewport={{ once: true }}
                    onAnimationComplete={() => {}}
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
                    <div className="content">
                        <span className="quote-icon">
                            <QuoteRight />
                        </span>

                        <div className="description">
                            <label>{description}</label>
                        </div>

                        <div className="footer">
                            <label className="name">~~ {name}</label>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </article>
    )
}

export default TrainingReviewCard