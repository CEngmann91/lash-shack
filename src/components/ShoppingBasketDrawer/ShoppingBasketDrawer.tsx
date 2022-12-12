import './ShoppingBasketDrawer.scss';
import '../../res/styles.scss';
import React, { useEffect, useState } from 'react';
import { motion, useCycle } from 'framer-motion';
import { useEscKey, useScrollLock } from '../../helpers/hooks';
import ShoppingBasketDrawerButton from './ShoppingBasketDrawerButton/ShoppingBasketDrawerButton';
import { useShoppingBasketContext } from '../../providers/ShoppingBasketProvider';
import { iService, iServiceOption } from '../../pages/Services/Services';
import { Bin, DownArrowHead, Information, LeftArrowHead, RoundCheckmark, UpArrowHead } from '../../util/icons';
import { formatCurrency } from '../../constants/funcs';
import { Payment_AmericanExpress, Payment_Mastercard, Payment_Visa } from '../../util/images';
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
        // Add 10% to hide the box shadow.
        x: '110%', 
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

interface ShoppingBasketDrawerProps {
    services: iService[];
}
const ShoppingBasketDrawer = ({ services }: ShoppingBasketDrawerProps) => {
    const { isPressed } = useEscKey();
    const { lockScroll, unlockScroll } = useScrollLock();
    const { basketItems, basketQuantity, emptyBasket, basketTotal, addToBasket, decreaseFromBasket, removeFromBasket, openBasket, closeBasket } = useShoppingBasketContext();
    const [isOpen, toggleOpen] = useCycle(false, true);

    const [isPatchTestConfirmed, setIsPatchTestConfirmed] = useState(false);
    const [isShowingPatchTestInfo, setIsShowingPatchTestInfo] = useState(false);



    // useEffect(() => {
    //     window.scrollTo(0, 0);
    //   }, [isOpen]);

    useEffect(() => {

    }, [isShowingPatchTestInfo])


    if (isPressed)
        hide();

    const toggleVisibility = () => !isOpen ? show() : hide();


    function show() {
        if (isOpen) return;

        // window.scrollTo(0, 0);

        setIsShowingPatchTestInfo(false);
        // Prevents scrolling whilst the menu is visible.
        lockScroll();
        toggleOpen();
        openBasket();
    }

    function hide() {
        if (!isOpen) return;

        setIsShowingPatchTestInfo(false);
        unlockScroll();
        toggleOpen();
        closeBasket();
    }

    function getSerivceOptionByID(id: string): iServiceOption {
        let option;
        for (const item of services) {
            if (item.options?.length) {
                for (option of item.options)
                    if (option.id === id)
                        return option;
            }
        }
        return option as iServiceOption;
    }


    return (
        <div className={`app__shopping-sidebar`}>
            <motion.aside
                className={`app__shopping-sidebar--panel`}
                variants={container}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                exit='closed'
            >
                <header>
                    <span>
                        {!isShowingPatchTestInfo ?
                            <h1>Your Basket</h1>
                            :
                            <button className='path-test-close-button' onClick={() => setIsShowingPatchTestInfo(false)}>
                                <LeftArrowHead />
                            </button>

                        }
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
                            {isShowingPatchTestInfo ?
                                <div className='app__flex'>

                                    <p className='new-line'>{`To make sure your skin doesn’t react to the products used in your treatment, please book a patch test for at least 48 hours before your appointment.
                                        \nAlready had one in the past 6 months at this salon? You might not need to do it again (but please check with the salon to be sure)`}.
                                    </p>

                                    <div className='patch-test-confirm-button'>
                                        <button className='border-button'
                                            onClick={() => {
                                                setIsPatchTestConfirmed(true)
                                                setIsShowingPatchTestInfo(false)
                                            }}
                                        >I Understand</button>
                                    </div>
                                </div>
                                :
                                (basketItems.map(({ id, quantity }) => {
                                    const item: iServiceOption = getSerivceOptionByID(id);
                                    if (item) {
                                        const { name, price } = item;

                                        return (
                                            <Card className='basket-item'>
                                                <section className="item-content">
                                                    <label className='name'>{name}</label>
                                                    <label className='price'>{formatCurrency(price)}</label>
                                                </section>

                                                <div className='item-quantity-selector'>
                                                    <button onClick={() => addToBasket(id, price)}><UpArrowHead /></button>
                                                    <p>{quantity}</p>
                                                    <button disabled={quantity < 2} onClick={() => decreaseFromBasket(id)}><DownArrowHead /></button>
                                                </div>

                                                <section className='item-remove-button'>
                                                    <button className='' onClick={() => removeFromBasket(id)}><Bin /></button>
                                                </section>
                                            </Card>
                                        );
                                    }
                                }))
                            }
                        </motion.div>

                        {isShowingPatchTestInfo ?
                            null
                            :
                            <div className='patch-test-options'>
                                <span className="title">
                                    {!isPatchTestConfirmed ?
                                        <>
                                            <Information style={{ color: 'red' }} />
                                            <label>You may need a patch test.</label>
                                        </>
                                        :
                                        <>
                                            <RoundCheckmark style={{ color: 'green' }} />
                                            <label>A patch test has been confirmed</label>
                                        </>
                                    }
                                </span>
                                <span className="more-info">
                                    {!isPatchTestConfirmed ?
                                        <button className='' onClick={() => setIsShowingPatchTestInfo(true)}>More Details</button>
                                        :
                                        <></>
                                    }
                                </span>
                            </div>
                        }

                        <footer>
                            <div className='shopping-basket-drawer-buttons'>
                                <button disabled={!isPatchTestConfirmed}
                                        style={{ cursor: (!isPatchTestConfirmed ? "default" : "pointer") }}
                                        className=''
                                >Choose Time</button>
                                <button className='' onClick={() => {
                                    setIsPatchTestConfirmed(false)
                                    emptyBasket()
                                }}>
                                    {/* <Bin /> */}
                                    Empty Basket
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

                            <span className='cards-used-to-pay app__flex'>
                                <img src={Payment_Visa} />
                                <img src={Payment_Mastercard} />
                                <img src={Payment_AmericanExpress} />
                            </span>
                        </footer>
                    </>
                }
            </motion.aside>

            <ShoppingBasketDrawerButton value={basketQuantity} isOpen={isOpen} onClick={() => toggleVisibility()} />
        </div>
    )
}

export default ShoppingBasketDrawer