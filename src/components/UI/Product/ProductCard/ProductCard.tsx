import './ProductCard.scss';
import React from 'react'
import { Icon_Minus, Icon_Plus, Icon_WishList, Icon_WishListFilled } from '../../../../res/icons';
import { Col } from 'reactstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { basketActions } from '../../../../redux/slices/basketSlice';
import { formatCurrency } from '../../../../res/funcs';
import { ProductItem } from '../../../../types/ProductItem';
import { MotionButton, SkeletonImage } from '../../..';

const ProductCard = ({ id, imgUrl, title, price, category, subServiceCategory }: ProductItem) => {
    const dispatch = useDispatch();
    const [added, setAdded] = React.useState(false);



    function addToBasket() {
        dispatch(basketActions.addToBasket({
            id, title, imgUrl, price
        }));
    }

    function removeFromBasket() {
        dispatch(basketActions.removeFromBasket({
            id, title, imgUrl, price
        }));
    }

    return (
        <Col lg='3' md='4' className='mb-4'>
            <div className="product__card">
                <div className="product__wish-list">
                    <MotionButton onClick={() => setAdded(prev => prev = !prev)}>
                        {!added ? <Icon_WishList /> : <Icon_WishListFilled />}
                    </MotionButton>

                </div>
                <div className="product__image">
                    {/* <img src={imgUrl} alt="" /> */}
                    <SkeletonImage className='' src={imgUrl} alt="" />
                </div>
                <Link to={`/shop/${id}`} className="p-2 product__info d-flex align-items-center justify-content-between">
                    <div>
                        <h3 className="product__name">{title}</h3>
                        {category === "Courses" && <span className=''>{category}</span>}
                        {category === "Services" && <span className=''>{category} - {subServiceCategory}</span>}
                    </div>
                    {/* <span><Icon_Information /></span> */}
                </Link>
                <div className="product_card-bottom d-flex align-items-center justify-content-between p-2">
                    <motion.span className='minus'
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={removeFromBasket}
                    >
                        <Icon_Minus />
                    </motion.span>

                    <span className="price">{formatCurrency(price)}</span>
                    <motion.span className='add'
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={addToBasket}
                    >
                        <Icon_Plus />
                    </motion.span>
                </div>
            </div>
        </Col>
    )
}

export default ProductCard