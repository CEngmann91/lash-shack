import './DrawerMenu.scss';
import React from 'react'
import { NAVIGATION } from '../../constants/constants';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';


const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
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
        y: 200,
        opacity: 0,
    },
    open: {
        y: 0,
        opacity: 1,
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
                        initial={{ top: '-100%' }}
                        animate={{ top: 0 }}
                        exit={{
                            top: '-100%',
                            transition: {
                                // delay: 0.7,
                                duration: 0.2,
                            }
                        }}
                    >
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={sideVariants}
                            className='navigation'
                        >
                            <ul className="nav--links">
                                {NAVIGATION.MAIN_ROUTES.map(({ title, to }, key) => (
                                    // <motion.li
                                    //     key={key}
                                    //     whileHover={{ scale: 1.1 }}
                                    //     variants={itemVariants}
                                    //     onClick={onClose}
                                    // >{title}</motion.li>


                                    <li className='nav--link-item' key={key}>
                                        <NavLink to={to}>{title}</NavLink>
                                    </li>
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