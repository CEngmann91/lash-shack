import './Drawer.scss';
import '../../res/styles.scss';
import React, { useCallback, useState } from 'react';
import NavbarItem from '../navbar/NavbarItem/NavbarItem';
import { AnimatePresence, motion, useCycle } from 'framer-motion';
import { NAVIGATION } from '../../constants/constants';
import { Menu } from '../../util/icons';

const sidebar = {
    closed: {
        y: '-100vh',
        transition: {
            staggerChildren: 0.07,
            staggerDirection: -1,
        }
    },
    open: {
        y: 0,
        transition: {
            staggerChildren: 0.07,
            staggerDirection: 1,
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
            <div className="app__drawer--menuBtn-container">
                <button onClick={() => toggleOpen()} data-menuvisible={isOpen}>
                    {/* {!menuVisible ? <Menu /> : "X"} */}
                    <i />
                </button>
            </div>

            <motion.div
                className={`app__drawer--panel`}
                // ${menuIsOpen && 'app__drawer--show'}`}
                variants={sidebar}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                exit='closed'
            >
                <motion.div variants={item}>
                    {NAVIGATION.ROUTE.map(({ id, name, to }) =>
                        <NavbarItem
                            key={id} id={id}
                            to={to} onClick={hide}
                            idleClassName="" activeClassName="app__drawer--panel-active"
                        >{name}</NavbarItem>
                    )}
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Drawer