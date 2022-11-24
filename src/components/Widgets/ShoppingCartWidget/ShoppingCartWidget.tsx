import './ShoppingCartWidget.scss';
import React, { useState, useEffect } from 'react';
import { ShoppingCart } from '../../../util/icons';

const ShoppingCartWidget: React.FC = () => {
    const [visible, setVisible] = useState(false)
    const [count, setCount] = useState(1);


    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return function cleanup() {
            window.removeEventListener('scroll', onScroll)
        }
    })


    const onScroll = () => {
        if (!visible && window.pageYOffset > 400) {
            setVisible(true)
        }
        else if (visible && window.pageYOffset <= 400) {
            setVisible(false)
        }
    };


    return (
        <div className="shopping-cart-widget" style={{ display: visible ? 'flex' : 'none' }}>
            <div className='shopping-cart-widget--content'>
                <ShoppingCart />
                <div className="indicator" style={{ display: count > 0 ? 'flex' : 'none' }}>
                    <label>{count}</label>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCartWidget