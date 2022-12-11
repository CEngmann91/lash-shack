import './ShoppingBasketItem.scss';
import React, { useCallback } from 'react';
import { Bin, ShoppingBasket } from '../../../util/icons';
import { iService, iServiceOption } from '../../../pages/Services/Services';
import { useShoppingBasketContext } from '../../../providers/ShoppingBasketProvider';
import { formatCurrency } from '../../../constants/funcs';
import { Card } from '../../Cards';

type ShoppingBasketItemProps = {
    id: string;
    quantity: number;
    name: string;
    price: number;
    // onClick: (e?: React.MouseEvent<HTMLElement>) => void;
}
function ShoppingBasketItem({ id, quantity, name, price }: ShoppingBasketItemProps) {
    const { addToBasket, decreaseFromBasket, removeFromBasket } = useShoppingBasketContext();
    // const handleClick = useCallback(onClick, []);

    return (
        <Card className='basket--item'>
            <div className="item-content">
                <label>{name}</label>
                <label>{formatCurrency(price)}</label>
                <label>quantity: {quantity}</label>
            </div>
            <div className='item-remove-button'>
                <button className='' onClick={() => removeFromBasket(id)}><Bin /></button>
            </div>
        </Card>
    )
}

export default ShoppingBasketItem