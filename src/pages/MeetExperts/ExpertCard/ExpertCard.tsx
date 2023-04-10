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
            style={{ backgroundImage: `url(${photoURL})` }}
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
        {/* <div className="expert-card" style={{ backgroundImage: `url(${photoURL})` }}> */}
            <div className="gradient">
                <div className="content">
                    <h2>{firstName}</h2>
                    <p>{position}</p>
                    <br />
                    {/* <p className="details">{message}</p> */}
                    {/* <div className="icons">
                        <i className="fa fa-facebook-square" aria-hidden="true"></i>
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                        <i className="fa fa-pinterest" aria-hidden="true"></i>
                    </div> */}
                </div>
            </div>
        </motion.div>
    )
}

export default ExpertCard