import './ShoppingBasketDrawerItem.scss';
import React from 'react'
import { formatCurrency } from '../../../constants/funcs';
import { useShoppingBasket } from '../../../helpers/hooks';
import { Bin, DownArrowHead, UpArrowHead } from '../../../util/icons';
import { Card } from '../../Cards';
import { Category } from '../../../context/ShoppingBasketContext';

type ShoppingBasketDrawerItemProps = {
    category: Category;
    id: string;
    title: string;
    quantity: number;
    price: number;
    onSale?: boolean;
    salePrice?: number;
}
function ShoppingBasketDrawerItem({ category, id, title, quantity, price, onSale, salePrice }: ShoppingBasketDrawerItemProps) {
    const { addToBasket, decreaseFromBasket, removeFromBasket } = useShoppingBasket();


    return (
        <Card className='shopping-basket-card'>
            <section className="bc-info-content">
                <label className='name'>{title}</label>
                {onSale ?
                    <label className='price'>{formatCurrency(salePrice as number)}</label>
                    :
                    <label className='price'>{formatCurrency(price)}</label>
                }
                {/* <label className='duration'>{formatHrsMins(duration)}</label> */}
            </section>

            <div className='bc-quantity-selector'>
                <button onClick={() => addToBasket(category, id, price)}><UpArrowHead /></button>
                <p>{quantity}</p>
                <button disabled={quantity < 2} onClick={() => decreaseFromBasket(category, id)}><DownArrowHead /></button>
            </div>

            <section className='bc-remove-button'>
                <button className='' onClick={() => removeFromBasket(category, id)}><Bin /></button>
            </section>
        </Card>
    )
}

export default ShoppingBasketDrawerItem