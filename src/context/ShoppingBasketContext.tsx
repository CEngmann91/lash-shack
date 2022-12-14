import { createContext } from 'react';
import { BasketItem } from '../providers/ShoppingBasketProvider';

export type Category = "Courses" | "Services";

type ShoppingBasketContextType = {
    openBasket: () => void
    closeBasket: () => void
    addToBasket: (category: Category, id: string, price: number) => void
    decreaseFromBasket: (category: Category, id: string) => void
    removeFromBasket: (category: Category, id: string) => void
    emptyBasket: () => void
    basketTotal: () => number;
    basketQuantity: number
    basketItems: BasketItem[]
}

export const ShoppingBasketContext = createContext({} as ShoppingBasketContextType);
export default ShoppingBasketContext;