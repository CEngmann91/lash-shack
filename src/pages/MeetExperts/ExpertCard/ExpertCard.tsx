import { motion } from 'framer-motion';
import './ExpertCard.scss';

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

type ExpertCardProps = {
    id: number;
    firstName: string;
    position: string;
    photoURL: string;
    message: string;
}
const ExpertCard = ({ id, firstName, position, photoURL, message }: ExpertCardProps) => {

    return (
        <motion.div
            className='expert-card' id={`expert-card${id}`}
            variants={variants}
            initial="hidden"
            viewport={{ once: true }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.5,
                    delay: 1 + id * 0.2,
                    ease: 'easeIn'
                }
            }}
        >
            <div className="imgBx">
                <img src={photoURL} alt="" />
            </div>
            <div className="content">
                <div className="contentBx">
                    <h2>{firstName}
                        <br />
                        <span>{position}</span>
                        <br />
                        <span>{message}</span>
                    </h2>
                </div>
            </div>
        </motion.div>
    )
}

export default ExpertCard