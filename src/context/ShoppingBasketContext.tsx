import { createContext } from 'react';
import { BasketItem } from '../providers/ShoppingBasketProvider';

type ShoppingBasketContextType = {
    openBasket: () => void
    closeBasket: () => void
    addToBasket: (id: string, price: number) => void
    decreaseFromBasket: (id: string) => void
    removeFromBasket: (id: string) => void
    emptyBasket: () => void
    basketTotal: () => number;
    basketQuantity: number
    basketItems: BasketItem[]
}

export const ShoppingBasketContext = createContext({} as ShoppingBasketContextType);
export default ShoppingBasketContext;