import './ShoppingCartDrawer.scss';
import '../../res/styles.scss';
import React from 'react';
import { motion, useCycle } from 'framer-motion';
import { ShoppingCart } from '../../util/icons';
import useDeviceDetect from '../../helpers/hooks/useDeviceDetect';
import { useEscKey, useScrollLock } from '../../helpers/hooks';
import { ShoppingCartWidget } from '../Widgets';


const container = {
    open: {
        x: 0,
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
        x: '100vw',
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
    closed: { opacity: 1 },
    open: { opacity: 0 }
}

type ShoppingCartDrawerProps = {
    onOpen: () => void;
    onClose: () => void;
}
function ShoppingCartDrawer({ onOpen, onClose }: ShoppingCartDrawerProps) {
    // function ShoppingCartDrawer(
    //     onOpen: () => void, onClose: () => void
    //     ) {
    const { isMobile } = useDeviceDetect();
    const { isPressed } = useEscKey();
    const { lockScroll, unlockScroll } = useScrollLock();
    const [isOpen, toggleOpen] = useCycle(false, true);



    if (isPressed)
        hide();


    function show() {
        if (isOpen) return

        onOpen();
        toggleOpen();
        // Prevents scrolling whilst the menu is visible.
        lockScroll();
    }

    function hide() {
        if (!isOpen) return

        onClose();
        toggleOpen();
        unlockScroll();
    }

    const toggleVisibility = () => !isOpen ? show() : hide();



    return (
        <div className='app__shopping-sidebar'>


            <motion.aside
                className={`app__shopping-sidebar--panel`}
                variants={container}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                exit='closed'
            >
                <motion.div variants={item}>
                    <p>Insert Content Here</p>
                    <p>isMobile: {isMobile.toString()}</p>
                    <p>isOpen: {isOpen.toString()}</p>
                </motion.div>
            </motion.aside>





            {/* <motion.aside
                className='app__shopping-sidebar--panel'
                variants={container}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                exit='closed'
            >
                <header>
                    <span>
                        <h1>Your Item(s)</h1>
                        <hr />
                    </span>
                    <span>
                        <button className='shopping-close-button' onClick={() => toggleVisibility()} data-menuvisible={isOpen}>
                            <p>X</p>
                        </button>
                    </span>
                </header>
                    
                <motion.div variants={item}>
                    <p>Insert Content Here</p>
                    <p>isMobile: {isMobile.toString()}</p>
                    <p>isOpen: {isOpen.toString()}</p>
                </motion.div>

                <footer>
                    <span>

                    </span>
                </footer>
            </motion.aside> */}



            <ShoppingCartWidget isOpen={isOpen} onOpen={show} onClose={hide} />
        </div>
    )
}

export default ShoppingCartDrawer