import './ShoppingBasketDrawer.scss';
import '../../res/styles.scss';
import React, { useEffect, useState } from 'react';
import { motion, useCycle } from 'framer-motion';
import { useEscKey, useScrollLock } from '../../helpers/hooks';
import ShoppingBasketDrawerButton from './ShoppingBasketDrawerButton/ShoppingBasketDrawerButton';
import { useShoppingBasketContext } from '../../providers/ShoppingBasketProvider';
import { Bin, DownArrowHead, Information, LeftArrowHead, RoundCheckmark, UpArrowHead } from '../../util/icons';
import { formatCurrency, scrollToTop } from '../../constants/funcs';
import { Payment_AmericanExpress, Payment_Mastercard, Payment_Visa } from '../../util/images';
import { Card } from '../Cards';
import { iCourse } from '../../pages/Courses/Courses';
import { BOOKING_DEPOSIT_FEE } from '../../constants/constants';
import ShoppingBasketDrawerItem from './ShoppingBasketDrawerItem/ShoppingBasketDrawerItem';
import { iService, iServiceOption } from '../../pages/Services/Services';
import { Category } from '../../context/ShoppingBasketContext';


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
    closed: {
        opacity: 0
    },
    open: {
        opacity: 1
    }
}

type ShoppingBasketDrawerProps = {
    services: iService[];
    courses: iCourse[];
}
const ShoppingBasketDrawer = ({ services, courses }: ShoppingBasketDrawerProps) => {
    const { isPressed } = useEscKey();
    const { lockScroll, unlockScroll } = useScrollLock();
    const { basketItems, basketQuantity, emptyBasket, basketTotal, addToBasket, decreaseFromBasket, removeFromBasket, openBasket, closeBasket } = useShoppingBasketContext();
    const [isOpen, toggleOpen] = useCycle(false, true);

    const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
    const [isShowingPaymentInfo, setIsShowingPaymentInfo] = useState(false);



    // useEffect(() => {
    //     scrollToTop();
    //   }, [isOpen]);

    useEffect(() => {

    }, [isShowingPaymentInfo])


    if (isPressed) {
        // if (isShowingPaymentInfo)
        // {
        //     setIsShowingPaymentInfo(false);
        //     return;
        // }
        hide();
    }

    const toggleVisibility = () => !isOpen ? show() : hide();


    function show() {
        if (isOpen) return;

        // scrollToTop();

        setIsShowingPaymentInfo(false);
        // Prevents scrolling whilst the menu is visible.
        lockScroll();
        toggleOpen();
        openBasket();
    }

    function hide() {
        if (!isOpen) return;

        setIsShowingPaymentInfo(false);
        // Allow scrolling while the menu is going to be hidden.
        unlockScroll();
        toggleOpen();
        closeBasket();
    }

    // function getByID(category: Category, id: number) {
    //     if (category === "Courses")
    //         return courses?.find(item => item.id === id) as iCourse;
    //     if (category === "Services")
    //         return services?.find(item => item.id === id.toString()) as iService;
    // }

    function getCourseByID(id: number): iCourse {
        return courses?.find(item => item.id === id) as iCourse;
    }

    function getServiceOptionByID(id: string): iServiceOption {
        let op: iServiceOption = { active: false, id: '', name: '', price: 0, duration: 0 };
        services.forEach(service => {
            service.options.forEach(option => {
                if (option.id == id)
                    op = option;
            })
        })
        return op;
    }

    function getAmountDueNow() {
        return basketQuantity * BOOKING_DEPOSIT_FEE;
    }




    const renderHeader = () => (
        <header>
            <span>
                {!isShowingPaymentInfo ?
                    <h1>Your Basket</h1>
                    :
                    <button className='deposit-close-button' onClick={() => setIsShowingPaymentInfo(false)}>
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
    )

    const renderBasketItems = () => (
        // (JSON.stringify(basketItems))
        (basketItems.map(({ category, id, quantity }, index) => {
            if (category === "Services") {
                const item: iServiceOption = getServiceOptionByID(id);
                // console.log("iServiceOption - ", item, id);
                if (item) {
                    const { id, name, price, duration } = item;

                    

                    return (
                        <ShoppingBasketDrawerItem key={`${id} - ${name} - ${index}`}
                            category={category} id={id} title={name}
                            quantity={quantity} price={price}
                        />
                    );
                }
            }
            if (category === "Courses") {
                const item: iCourse = getCourseByID(Number(id));
                if (item) {
                    const { title, price, sale, duration } = item;
                    const isOnSale = (sale?.price < price);

                    return (
                        <ShoppingBasketDrawerItem key={`${id} - ${title} - ${index}`}
                            category={category} id={id} title={title} quantity={quantity}
                            price={price} onSale={isOnSale} salePrice={sale.price}
                        />
                    );
                }
            }
        }))
    )

    const renderFooter = () => (
        <footer>
            <div className='shopping-basket-drawer-buttons'>
                <button disabled={!isPaymentConfirmed} className=''>Choose Time</button>
                <button className='' onClick={() => {
                    setIsPaymentConfirmed(false)
                    emptyBasket()
                }}>
                    Empty Basket
                </button>
            </div>

            <div className='total-content'>
                <span>
                    <hr />
                    <h3>Total {`(${basketQuantity} item${basketQuantity > 1 ? "s" : ""})`}</h3>
                </span>

                <span>
                    <h3>{formatCurrency(getAmountDueNow())} ({formatCurrency(basketTotal() - getAmountDueNow())} remaining)</h3>
                </span>
            </div>

            <span className='cards-used-to-pay app__flex'>
                <img src={Payment_Visa} />
                <img src={Payment_Mastercard} />
                <img src={Payment_AmericanExpress} />
            </span>
        </footer>
    )

    return (
        <div className={`app__shopping-sidebar`}>
            <motion.aside
                className={`app__shopping-sidebar--panel`}
                variants={container}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                exit='closed'
            >
                {renderHeader()}

                {basketQuantity === 0 ?
                    <div className='app__flex app__half-height'>
                        <h1>Your Basket is Empty</h1>
                    </div>
                    :
                    <>
                        <motion.div variants={item} className='panel--content'>
                            {isShowingPaymentInfo ?
                                <div className='app__flex'>

                                    <p className='new-line'>{`A deposit of £50 is required now in order to confirm your time slot.
                                    The remaining balance will be requested upon arrival.
                                    `}.
                                    </p>

                                    <div className='patch-test-confirm-button'>
                                        <button className='border-button'
                                            onClick={() => {
                                                setIsPaymentConfirmed(true)
                                                setIsShowingPaymentInfo(false)
                                            }}
                                        >I Understand</button>
                                    </div>
                                </div>
                                :
                                (renderBasketItems())
                            }
                        </motion.div>

                        {isShowingPaymentInfo ?
                            null
                            :
                            <div className='final-payment-container'>
                                <span className="title">
                                    {!isPaymentConfirmed ?
                                        <Information style={{ color: 'red' }} />
                                        :
                                        <RoundCheckmark style={{ color: 'green' }} />
                                    }
                                    <label>Terms & Conditions</label>
                                </span>
                                <span className="more-info">
                                    {!isPaymentConfirmed ?
                                        <button className='' onClick={() => setIsShowingPaymentInfo(true)}>More Details</button>
                                        :
                                        <></>
                                    }
                                </span>
                            </div>
                        }


                        {renderFooter()}
                    </>
                }
            </motion.aside>

            <ShoppingBasketDrawerButton value={basketQuantity} isOpen={isOpen} onClick={() => toggleVisibility()} />
        </div>
    )
}

export default ShoppingBasketDrawer