import './FeatureRow.scss';
import { ReactNode } from 'react'
import { motion } from 'framer-motion';

const variants = {
    // visible: {
    //     y: 0,
    //     opacity: 1,
    //     transition: {
    //         duration: 0.5,
    //         // delay: id * 0.1,
    //         ease: 'easeIn'
    //     }
    // },
    hidden: { opacity: 0, y: 100 },
}

type FeatureRowProps = {
    id: number;
    className?: string;
    leftChildren: ReactNode;
    rightChildren: ReactNode;
}
const FeatureRow = ({ id, className, leftChildren, rightChildren }: FeatureRowProps) => {

    return (
        <motion.div
            className={`container row-card w-100" ${className}`}
            variants={variants}
            initial="hidden"
            viewport={{ once: true }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.5,
                    delay: 0.2,
                    // delay: 1 + id * 0.2,
                    ease: 'easeIn'
                }
            }}
        >
            <div className="row bg-gray-950 d-flex">
            <div className={`col-lg-6 ${id % 2 === 0 ? "pink" : null}`}>
                    {leftChildren}
                </div>
                <div className={`col-lg-6 ${id % 2 !== 0 ? "pink" : null}`}>
                    <div className="card-block">
                        {rightChildren}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default FeatureRow