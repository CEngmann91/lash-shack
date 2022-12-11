import './ShoppingBasketDrawer.scss';
import '../../res/styles.scss';
import React from 'react';
import { motion, useCycle } from 'framer-motion';
import useDeviceDetect from '../../helpers/hooks/useDeviceDetect';
import { useEscKey, useScrollLock } from '../../helpers/hooks';
import ShoppingBasketDrawerButton from './ShoppingBasketDrawerButton/ShoppingBasketDrawerButton';
import { useShoppingBasketContext } from '../../providers/ShoppingBasketProvider';
import { iService, iServiceOption } from '../../pages/Services/Services';
import { Bin } from '../../util/icons';
import { formatCurrency } from '../../constants/funcs';
import { Payment_AmericanExpress, Payment_Mastercard, Payment_Visa } from '../../util/images';
import ShoppingBasketItem from './ShoppingBasketItem/ShoppingBasketItem';
import { Card } from '../Cards';


const container = {
    open: {
        x: 0,
        transition: {
            staggerChildren: 0.07,
            staggerDirection: 1,
            duration: 0.5,
        }
    },
    closed: {
        x: '100%',
        transition: {
            staggerChildren: 0.07,
            staggerDirection: -1,
            duration: 0.2,
        }
    }
}
const item = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
}

interface iProps {
    services: iService[];
}
function ShoppingBasketDrawer({ services }: iProps) {
    const { isMobile } = useDeviceDetect();
    const { isPressed } = useEscKey();
    const { lockScroll, unlockScroll } = useScrollLock();
    const { basketItems, basketQuantity, emptyBasket, basketTotal, removeFromBasket, openBasket, closeBasket } = useShoppingBasketContext();
    const [isOpen, toggleOpen] = useCycle(false, true);



    if (isPressed)
        hide();

    const toggleVisibility = () => !isOpen ? show() : hide();


    function show() {
        if (isOpen) return;

        // Prevents scrolling whilst the menu is visible.
        lockScroll();
        toggleOpen();
        openBasket();
    }

    function hide() {
        if (!isOpen) return;

        unlockScroll();
        toggleOpen();
        closeBasket();
    }

    // const getSerivceByID = (id: string) => {
    //     services.forEach(service => {
    //         const item = service.options.find(item => item.id === id);
    //         return item;
    //     });
    // }


    function findById(id: string) : iServiceOption {
        let option;
        for (const item of services) {
            if (item.options?.length)
            {
                for (option of item.options)
                    if (option.id === id)
                    return option;
            }
        }
        return option as iServiceOption;
    }


    return (
        <div className='app__shopping-sidebar'>
            <motion.aside
                className={`app__shopping-sidebar--panel`}
                variants={container}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                exit='closed'
            >
                <header>
                    <span>
                        <h1>Your Basket</h1>
                        <hr />
                    </span>
                    {/* <span>
                        <button className='shopping-close-button' onClick={() => toggleVisibility()} data-menuvisible={isOpen}>
                            <p>X</p>
                        </button>
                    </span> */}
                </header>

                {basketQuantity === 0 ?
                    <div className='app__flex app__half-height'>
                        <h1>Your Basket is Empty</h1>
                    </div>
                    :
                    <>
                        <motion.div variants={item} className='panel--content'>
                            {/* <p>{JSON.stringify(basketItems)}</p> */}
                            {basketItems.map(({ id, quantity }) => {
                                const item: iServiceOption = findById(id);
                                if (item) {
                                    const { name, price } = item;
    
                                    return (
                                        <div className='basket-item'>
                                            <label>{name}</label>
                                            <label>{formatCurrency(price)}</label>
                                            <label>quantity: {quantity}</label>
                                            <button className='' onClick={() => removeFromBasket(id)}><Bin /></button>
                                        </div>
                                        // ShoppingBasketItem({ id, quantity, name, price })
                                    )
                                }
                            })}




                            {/* <p>Insert Content Here</p>
                            <p>isMobile: {isMobile.toString()}</p>
                            <p>isOpen: {isOpen.toString()}</p> */}
                        </motion.div>

                        {/* <div className='app__flex'>
                            <button className='' onClick={emptyBasket}>
                                <Bin />
                            </button>
                        </div> */}


                        <footer>
                            <div className='shopping-basket-drawer-buttons'>
                                <button className=''>
                                    Check Out Now
                                </button>
                                <button className='' onClick={emptyBasket}>
                                    <Bin />
                                </button>
                            </div>

                            <div className='total-content'>
                                <span>
                                    <hr />
                                    <h3>Total {`(${basketQuantity} item${basketQuantity > 1 ? "s" : ""})`}</h3>
                                </span>

                                <span>
                                    <h3>{formatCurrency(basketTotal())}</h3>
                                </span>
                            </div>

                            <div className='cards-used-to-pay app__flex'>
                                <img src={Payment_Visa} />
                                <img src={Payment_Mastercard} />
                                <img src={Payment_AmericanExpress} />
                            </div>
                        </footer>
                    </>
                }
            </motion.aside>

            <ShoppingBasketDrawerButton value={basketQuantity} isOpen={isOpen} onClick={() => toggleVisibility()} />



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
        </div>
    )
}

export default ShoppingBasketDrawer