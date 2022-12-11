import './ShoppingBasketItem.scss';
import React, { useCallback } from 'react';
import { ShoppingBasket } from '../../../util/icons';
import { iService, iServiceOption } from '../../../pages/Services/Services';
import { useShoppingBasketContext } from '../../../providers/ShoppingBasketProvider';

type ShoppingBasketItemProps = {
    id: string;
    quantity: number;
    name: string;
    price: number;
    // onClick: (e?: React.MouseEvent<HTMLElement>) => void;
}
function ShoppingBasketItem({ id, quantity, name, price }: ShoppingBasketItemProps) {
    // const { addToBasket, decreaseFromBasket, removeFromBasket } = useShoppingBasketContext();
    // const handleClick = useCallback(onClick, []);

    return (
        <div className="shopping-basket-item">
            {/* <h1>'{id}'</h1> */}
            <h1>'{name}'</h1>
            <h1>'{price}'</h1>
            <h3>'{quantity}'</h3>
            {/* <button onClick={ () => removeFromBasket(id) }>Remove</button> */}
        </div>
    )
}

export default ShoppingBasketItem