import './Drawer.scss';
import '../../res/styles.scss';
import React from 'react';
import NavbarItem from '../navbar/NavbarItem/NavbarItem';
import { motion, useCycle } from 'framer-motion';
import { menuItems } from '../../constants/menuItems';
import DrawerButton from './DrawerButton/DrawerButton';
import { logo } from '../../util/images';
import { useEscKey, useScrollLock } from '../../helpers/hooks';

const sidebar = {
    open: {
        y: 0,
        transition: {
            staggerChildren: 0.07,
            staggerDirection: 1,
            duration: 0.5,
            ease: "easeIn",
            // type: "spring",
            // stiffness: 20,
            // restDelta: 2
        }
    },
    closed: {
        y: '-110vh',
        transition: {
            staggerChildren: 0.07,
            staggerDirection: -1,
            duration: 0.2,
            ease: "easeOut",
            // delay: 0.5,
            // type: "spring",
            // stiffness: 400,
            // damping: 40
        }
    }
}
const item = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
}

function Drawer() {
    // const [isOpen, toggleMe] = useToggle({ onOpen, onClose });
    const { lockScroll, unlockScroll } = useScrollLock();
    const { isPressed } = useEscKey();
    const [ isOpen, toggleOpen ] = useCycle(false, true);

    

    if (isPressed)
        hide();

    function show() {
        if (isOpen) return

        toggleOpen();
        // Prevents scrolling whilst the menu is visible.
        lockScroll();
    }

    function hide() {
        if (!isOpen) return

        toggleOpen();
        unlockScroll();
    }

    const toggleVisibility = () => !isOpen ? show() : hide();




    return (
        <div className='app__drawer app__desktop-hide'>
            <DrawerButton isOpen={isOpen} onClick={() => toggleVisibility()} />

            <motion.aside
                className={`app__drawer--panel`}
                variants={sidebar}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                exit='closed'
            >
                {/* <header><img src={logo} /></header> */}

                <motion.div variants={item}>
                    {menuItems.map(({ id, title, to }) =>
                        <NavbarItem
                            key={id} to={to} onClick={() => toggleVisibility()}
                            idleClassName="" activeClassName="app__drawer--panel-active"
                        >{title}</NavbarItem>
                    )}
                </motion.div>
            </motion.aside>
        </div>
    )
}

export default Drawer