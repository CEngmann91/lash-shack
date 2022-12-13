import './ShoppingBasketDrawerItem.scss';
import React from 'react'
import { formatCurrency } from '../../../constants/funcs';
import { useShoppingBasket } from '../../../helpers/hooks';
import { Bin, DownArrowHead, UpArrowHead } from '../../../util/icons';
import { Card } from '../../Cards';

type ShoppingBasketDrawerItemProps = {
    id: string;
    title: string;
    quantity: number;
    price: number;
    onSale: boolean;
    salePrice: number;
}
function ShoppingBasketDrawerItem({ id, title, quantity, price, onSale, salePrice }: ShoppingBasketDrawerItemProps) {
    const { addToBasket, decreaseFromBasket, removeFromBasket } = useShoppingBasket();


    return (
        <Card className='shopping-basket-item'>
            <section className="item-content">
                <label className='name'>{title}</label>
                <label className='price'>{formatCurrency(onSale ? salePrice : price)}</label>
                {/* <label className='duration'>{formatHrsMins(duration)}</label> */}

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
    )
}

export default ShoppingBasketDrawerItem