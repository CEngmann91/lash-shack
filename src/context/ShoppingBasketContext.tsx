import { createContext } from 'react';
import { Category } from '../helpers/firebase/data/Category';
import { BasketItem } from '../providers/ShoppingBasketProvider';

type ShoppingBasketContextType = {
    openBasket: () => void
    closeBasket: () => void
    addToBasket: (category: Category, id: string, price: number, date?: string, time?: string) => void
    removeFromBasket: (category: Category, id: string) => void
    decreaseFromBasket: (category: Category, id: string) => void
    setDateTimeForBasketItem: (category: Category, id: string, date: string, time?: string) => void;
    emptyBasket: () => void
    basketTotal: () => number;
    basketQuantity: number
    basketItems: BasketItem[]
}

export const ShoppingBasketContext = createContext({} as ShoppingBasketContextType);
export default ShoppingBasketContext;