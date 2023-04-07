import './ProductCard.scss';
import { Icon_Minus, Icon_Plus, Icon_Share, Icon_ShoppingBasket, Icon_Trash, Icon_WishList, Icon_WishListFilled } from '../../../../res/icons';
import { Col } from 'reactstrap';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { formatCurrency, launchTreatwell } from '../../../../res/funcs';
import { ProductItem } from '../../../../types/ProductItem';
import { MotionButton, MotionSpan, SkeletonImage } from '../../..';
import { useBasketActions } from '../../../../redux/hooks/useBasketActions';
import { useWishListActions } from '../../../../redux/hooks/useWishListActions';
import { useEffect } from 'react';

const variants = {
    hidden: {
        opacity: 0,
        translateY: 40
    },
    visible: {
        opacity: 1,
        translateY: 0
    },
}

type ProductCardProps = {
    item: ProductItem;
}
const ProductCard = ({ item }: ProductCardProps) => {
    const navigate = useNavigate();
    const { id, imgUrl, title, price, isOnSale, salePrice, shortDesc, category, subServiceCategory } = item;
    const { addToBasket, removeFromBasket, existsInBasket, countByID } = useBasketActions();
    const { addToWishList, removeFromWishList, existsInWishList } = useWishListActions();

    const count = countByID(id);
    const exists = existsInBasket(id)






    // useEffect(() => {
    //     const color = getComputedStyle(document.documentElement).getPropertyValue('--icon_svg_size');
    //     // alert(color);

    //     document.documentElement.style.setProperty('--icon_svg_size', "4rem");
    //   }, [])


    function toggleWishList(id: string) {
        const exists = existsInWishList(id);
        if (!exists)
            addToWishList(id, title, imgUrl, price)
        else
            removeFromWishList(id, title, imgUrl, price)
    }


    return (
        <motion.div
            id={id}
            className='product__card'
            initial="hidden"
            whileInView='visible'
            variants={variants}
            viewport={{ once: true }}
            transition={{
                duration: 0.3,
                // delay: key * 1
            }}
        >

            <div className="product__image-wrapper">
                <div className='product__image' onClick={() => navigate(`/shop/${id}`)}>
                    <SkeletonImage className='' src={imgUrl} alt="" />
                </div>

                <div className="buttons d-flex align-items-center gap-2">
                    {/* <MotionButton onClick={() => { }}>
                        <Icon_Share />
                    </MotionButton>

                    <MotionButton onClick={() => toggleWishList(id)}>
                        {!existsInWishList(id) ? <Icon_WishList /> : <Icon_WishListFilled />}
                    </MotionButton> */}

                    {/* <MotionButton className='app__icon-with-badge' onClick={() => addToBasket(id, title, imgUrl, price)}>
                        <Icon_ShoppingBasket />
                        <span className="badge" data-quantity={count > 0}>{count}</span>
                    </MotionButton> */}


                    <MotionButton className='app__icon-with-badge' onClick={launchTreatwell}>
                        <Icon_ShoppingBasket />
                        <span className="badge" data-quantity={count > 0}>{count}</span>
                    </MotionButton>
                </div>
            </div>

            <div className="d-flex align-items-center justify-content-between mt-3">
                <div className='product__info text-center w-100' onClick={() => navigate(`/shop/${id}`)}>
                    <h2 className="product__title">{title}</h2>
                    {category === "Courses" && <span className='product__detail'>{category}</span>}
                    {category === "Services" && <span className='product__detail'>{subServiceCategory}</span>}
                </div>
            </div>

            {/* <span className="d-flex align-items-center justify-content-center">{shortDesc}</span> */}

            <div className="product_card-bottom d-flex align-items-center justify-content-center p-2 gap-3">
                {exists && (
                    count === 1 ?
                        <MotionSpan onClick={() => removeFromBasket(id, title, imgUrl, price)}>
                            <Icon_Trash />
                        </MotionSpan>
                        :
                        <MotionSpan onClick={() => removeFromBasket(id, title, imgUrl, price)}>
                            <Icon_Minus />
                        </MotionSpan>
                )}

                {!isOnSale ?
                    <span className="price">{formatCurrency(price)}</span>
                    :
                    <div className=''>
                        <span className="sale-price">{formatCurrency(price)}</span>
                        <span>&nbsp;/&nbsp;</span>
                        {salePrice &&
                            <span className="price">{formatCurrency(salePrice)}</span>
                        }
                    </div>
                }

                {existsInBasket(id) && (
                    <MotionSpan onClick={() => addToBasket(id, title, imgUrl, price)}>
                        <Icon_Plus />
                    </MotionSpan>
                )}
            </div>
        </motion.div>
    )
}

export default ProductCard