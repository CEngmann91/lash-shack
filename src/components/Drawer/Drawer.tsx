import './Drawer.scss';
import '../../res/styles.scss';
import React from 'react';
import NavbarItem from '../navbar/NavbarItem/NavbarItem';
import { motion, useCycle } from 'framer-motion';
import { menuItems } from '../../constants/menuItems';
import DrawerButton from './DrawerButton/DrawerButton';

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
        y: '-100vh',
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

const Drawer: React.FC = () => {
    const [isOpen, toggleOpen] = useCycle(false, true);
    // const [menuVisible, setMenuVisible] = useState(false);


    const show = () => {
        // Prevents scrolling whilst the menu is visible.
        document.body.style.overflow = "hidden";
        toggleOpen();
    }

    const hide = () => {
        document.body.style.overflow = "scroll";
        toggleOpen();
    }

    // const toggleVisibility = () => !isOpen ? show() : hide();




    return (
        <div className='app__drawer app__desktop-hide'>
            <DrawerButton isOpen={isOpen} onClick={() => toggleOpen()} />

            <motion.div
                className={`app__drawer--panel`}
                // ${menuIsOpen && 'app__drawer--show'}`}
                variants={sidebar}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                exit='closed'
            >
                <motion.div variants={item}>
                    {menuItems.map(({ id, title, to }) =>
                        <NavbarItem
                            key={id} to={to} onClick={hide}
                            idleClassName="" activeClassName="app__drawer--panel-active"
                        >{title}</NavbarItem>
                    )}
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Drawer