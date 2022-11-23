import './Sidebar.scss';
import '../../res/styles.scss';
import React, { useCallback, useState } from 'react';
import NavbarItem from '../navbar/NavbarItem/NavbarItem';
import { AnimatePresence, motion } from 'framer-motion';
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

const Sidebar: React.FC = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const show = () => {
        // Prevents scrolling whilst the menu is visible.
        document.body.style.overflow = "hidden";
        setMenuVisible(true);
    }

    const hide = () => {
        document.body.style.overflow = "scroll";
        setMenuVisible(false);
    }

    const toggleVisibility = () => !menuVisible ? show() : hide();




    return (
        <div className='app__drawer app__desktop-hide'>
            <div className="app__drawer--menuBtn-container">
                <button onClick={toggleVisibility} data-menuvisible={menuVisible}>
                    {/* {!menuVisible ? <Menu /> : "X"} */}
                    <i />
                </button>
            </div>

            <motion.div
                className={`app__drawer--panel`}
                // ${menuIsOpen && 'app__drawer--show'}`}
                variants={sidebar}
                initial="closed"
                animate={menuVisible ? "open" : "closed"}
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

export default Sidebar