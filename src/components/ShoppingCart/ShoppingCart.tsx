import './Sidebar.scss';
import '../../res/styles.scss';
import React from 'react';
import NavbarItem from '../navbar/NavbarItem/NavbarItem';
import { motion, useCycle } from 'framer-motion';

const container = {
    closed: {
        width: 0,
        transition: {
            staggerChildren: 0.07,
            staggerDirection: -1,
        }
    },
    open: {
        width: '80%',
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

const ShoppingCart: React.FC = () => {
    const [isOpen, toggleOpen] = useCycle(false, true);
    // const [menuVisible, setMenuVisible] = useState(false);


    // const show = () => {
    //     // Prevents scrolling whilst the menu is visible.
    //     // document.body.style.overflow = "hidden";
    //     toggleOpen();
    // }

    // const hide = () => {
    //     // document.body.style.overflow = "scroll";
    //     toggleOpen();
    // }

    // const toggleVisibility = () => !isOpen ? show() : hide();




    return (
        <div className='app__shopping-sidebar'>
            <div className="app__shopping-sidebar--menuBtn-container">
                <button onClick={() => toggleOpen()} data-menuvisible={isOpen}>
                    <i />
                </button>
            </div>

            <motion.div
                className={`app__shopping-sidebar--panel`}
                // ${menuIsOpen && 'app__shopping-sidebar--show'}`}
                variants={container}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                exit='closed'
            >
                <motion.div variants={item}>
                    <p>Insert Content Here</p>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default ShoppingCart