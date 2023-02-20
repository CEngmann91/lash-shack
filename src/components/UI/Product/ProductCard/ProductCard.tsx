import './ProductCard.scss';
import React from 'react'
import { Icon_Minus, Icon_Plus, Icon_Share, Icon_ShoppingBasket, Icon_WishList, Icon_WishListFilled } from '../../../../res/icons';
import { Col } from 'reactstrap';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../../../res/funcs';
import { ProductItem } from '../../../../types/ProductItem';
import { MotionButton, SkeletonImage } from '../../..';
import { useBasketActions } from '../../../../redux/hooks/useBasketActions';
import { useWishListActions } from '../../../../redux/hooks/useWishListActions';

type ProductCardProps = {
    item: ProductItem;
}
const ProductCard = ({ item }: ProductCardProps) => {
    const navigate = useNavigate();
    const { id, imgUrl, title, price, isOnSale, salePrice, shortDesc, category, subServiceCategory } = item;
    const { addToBasket, removeFromBasket, existsInBasket, countByID } = useBasketActions();
    const { addToWishList, removeFromWishList, existsInWishList } = useWishListActions();




    function toggleWishList(id: string) {
        const exists = existsInWishList(id);
        if (!exists)
            addToWishList(id, title, imgUrl, price)
        else
            removeFromWishList(id, title, imgUrl, price)
    }


    return (
        <Col lg='3' md='4' className='mb-4'>
            <div className="product__card">
                {/* <div className="product__wish-list">
                    <MotionButton onClick={() => toggleWishList(id)}>
                        {!existsInWishList(id) ? <Icon_WishList /> : <Icon_WishListFilled />}
                    </MotionButton>
                </div> */}

                <>
                    <div className="product__image-wrapper">
                        <div className='product__image' onClick={() => navigate(`/shop/${id}`)}>
                            <SkeletonImage className='' src={imgUrl} alt="" />
                        </div>

                        <div className="buttons d-flex align-items-center gap-2">
                            <MotionButton onClick={() => { }}>
                                <Icon_Share />
                            </MotionButton>

                            <MotionButton onClick={() => toggleWishList(id)}>
                                {!existsInWishList(id) ? <Icon_WishList /> : <Icon_WishListFilled />}
                            </MotionButton>

                            <MotionButton className='app__icon-with-badge' onClick={() => addToBasket(id, title, imgUrl, price)}>
                                <Icon_ShoppingBasket />
                                <span className="badge" data-quantity={countByID(id) > 0}>{countByID(id)}</span>
                            </MotionButton>
                        </div>
                    </div>

                    <div className="p-2 d-flex align-items-center justify-content-between"
                    // onClick={() => navigate(`/shop/${id}`)}
                    >
                        <div className='product__info'>
                            <h3 className="product__name">{title}</h3>
                            {category === "Courses" && <span className=''>{category}</span>}
                            {category === "Services" && <span className=''>{category} - {subServiceCategory}</span>}
                        </div>
                    </div>

                    {/* <span className="d-flex align-items-center justify-content-center">{shortDesc}</span> */}
                </>

                <div className="product_card-bottom d-flex align-items-center justify-content-center p-2 gap-3"
                // onClick={() => navigate(`/shop/${id}`)}
                >
                    {existsInBasket(id) &&
                        <motion.span className='minus'
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            onClick={() => removeFromBasket(id, title, imgUrl, price)}
                        >
                            <Icon_Minus />
                        </motion.span>
                    }

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

                    {existsInBasket(id) &&
                        <motion.span className='add'
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            onClick={() => addToBasket(id, title, imgUrl, price)}
                        >
                            <Icon_Plus />
                        </motion.span>
                    }
                </div>


                {/* {existsInBasket(id) &&
                    <MotionButton className='add-to-basket-button' onClick={() => removeFromBasket(id, title, imgUrl, price)}>
                        Remove Basket
                    </MotionButton>
                } */}

            </div>
        </Col>
    )
}

export default ProductCard