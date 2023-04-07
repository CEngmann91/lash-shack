import './DrawerMenu.scss';
import { NAVIGATION } from '../../constants/constants';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import MotionLi from '../Motion/MotionLi/MotionLi';

const containerVariants = {
    closed: {
        top: '-100%',
        transition: {
            delay: 0.7,
            duration: 0.2,
        }
    },
    open: {
        top: 0
    }
};

const sideVariants = {
    closed: {
        transition: {
            staggerChildren: 0.07,
            staggerDirection: -1,
        }
    },
    open: {
        transition: {
            staggerChildren: 0.07,
            staggerDirection: 1,
        }
    }
};

const itemVariants = {
    closed: {
        opacity: 0,
        y: 100,
    },
    open: {
        opacity: 1,
        y: 0,
    }
};

type DrawerMenuProps = {
    isOpen: boolean;
    onClose: () => void;
}
const DrawerMenu = ({ isOpen, onClose }: DrawerMenuProps) => {


    // if (!isOpen)
    //     return null;

    return (
        <div className='drawer app__device-hide-desktop' onClick={() => onClose()}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className='menu'
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={containerVariants}
                    >
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={sideVariants}
                            className='navigation'
                        >
                            <ul className="nav--links">
                                {NAVIGATION.MAIN_ROUTES.map(({ id, title, to }) => (
                                    // <MotionLi
                                    //     key={id}
                                    //     className='nav--link-item'
                                    //     hoverScale={1.1}
                                    //     variants={itemVariants}
                                    // >
                                    //     <NavLink to={to}>{title}</NavLink>
                                    // </MotionLi>

                                    
                                    <motion.li
                                        key={id}
                                        className='nav--link-item'
                                        whileHover={{ scale: 1.1 }}
                                        variants={itemVariants}
                                    >
                                        <NavLink to={to}>{title}</NavLink>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                )}






            </AnimatePresence>
        </div>
    )



    /*return (
        <div className='drawer app__device-hide-desktop' onClick={() => onClose()}>
            <div id='menu' className="menu" data-isopen={isOpen}>
                <div className="navigation">
                    <ul className="nav--links">
                        {NAVIGATION.MAIN_ROUTES.map(({ title, to }, key) => (
                            <li className='nav--link-item' key={key}>
                                <NavLink to={to}>{title}</NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )*/
}

export default DrawerMenu