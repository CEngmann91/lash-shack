import './ShoppingCartDrawer.scss';
import '../../res/styles.scss';
import React from 'react';
import { motion, useCycle } from 'framer-motion';
import { ShoppingCart } from '../../util/icons';
import useDeviceDetect from '../../helpers/hooks/useDeviceDetect';
import { useScrollLock } from '../../helpers/hooks';
import { ShoppingCartWidget } from '../Widgets';


type ShoppingCartDrawerProps = {
    onOpen: () => void;
    onClose: () => void;
}
function ShoppingCartDrawer({ onOpen, onClose }: ShoppingCartDrawerProps) {
    // function ShoppingCartDrawer(
    //     onOpen: () => void, onClose: () => void
    //     ) {
    const { isMobile } = useDeviceDetect();
    const { lockScroll, unlockScroll } = useScrollLock();
    const [isOpen, toggleOpen] = useCycle(false, true);



    const container = {
        closed: {
            x: "20px",
            opacity: 1,
            // width: 0,
            transition: {
                staggerChildren: 0.07,
                staggerDirection: -1,
            }
        },
        open: {
            x: isMobile ? '80vw' : '30vw',
            opacity: 0,
            // width: '200px',
            transition: {
                staggerChildren: 0.07,
                staggerDirection: 1,
            }
        }
    }
    const item = {
        closed: { opacity: 1 },
        open: { opacity: 0 }
    }

    const toggleVisibility = () => !isOpen ? show() : hide();

    // function toggleView() {
    //     // toggleOpen();
    //     const notOpen = !isOpen;

    //     if (notOpen) show();
    //     else hide();
    // }

    function show() {
        onOpen();
        unlockScroll();
        toggleOpen();
    }

    function hide() {
        onClose();
        lockScroll();
        toggleOpen();
    }


    return (
        <div className='app__shopping-sidebar'>
            {/* <div className="app__shopping-sidebar--menuBtn-container">
                <button onClick={() => toggleView()} data-menuvisible={isOpen}>
                    <p>X</p> */}
                    {/* <ShoppingCart /> */}
                    {/* <div className="indicator" style={{ display: value > 0 ? 'flex' : 'none' }}>
                        <span data-count={value > 99}>
                            {value > 99 ? "99+" : value}
                        </span>
                    </div> */}
                    {/* <i /> */}
                {/* </button>
            </div> */}



            <motion.aside
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
                    <p>{isMobile.toString()}</p>
                </motion.div>

                <footer>
                    <span>

                    </span>
                </footer>
            </motion.aside>



            {/* <motion.div
                className='app__shopping-sidebar--panel'
                variants={container}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                exit='closed'
            >
                <motion.div variants={item}>
                    <p>Insert Content Here</p>
                </motion.div>
            </motion.div> */}

            <ShoppingCartWidget isOpen={isOpen} onOpen={show} onClose={hide} />
        </div>
    )
}

export default ShoppingCartDrawer