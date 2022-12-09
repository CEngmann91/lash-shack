import './ShoppingCartWidget.scss';
import React, { useEffect, useState } from 'react';
import { ShoppingCart } from '../../../util/icons';
import { useScroller, useShoppinCart } from '../../../helpers/hooks';

type ShoppingCartWidgetProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}
function ShoppingCartWidget({ isOpen, onOpen, onClose }: ShoppingCartWidgetProps) {
    const visible = useScroller();
    const { value } = useShoppinCart();


    // useEffect(() => {
    //     alert(`ShoppingCartWidget() . widget update ${value}`)
    // }, [value])




    return (
        <div className="shopping-cart-widget" data-visible={value > 0}>
            <div className='shopping-cart-widget--content' onClick={() => isOpen ? onClose() : onOpen()}>
                <ShoppingCart />
                <div className="indicator" style={{ display: value > 0 ? 'flex' : 'none' }}>
                    <span data-count={value > 99}>
                        {value > 99 ? "99+" : value}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCartWidget