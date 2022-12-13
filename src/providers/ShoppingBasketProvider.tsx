import { ReactNode, useContext, useState } from 'react';
import ShoppingBasketContext from '../context/ShoppingBasketContext';
import { useLocalStorage } from '../helpers/hooks/useLocalStorage';


export type BasketItem = {
    id: string
    quantity: number
    price: number
    // category: string
    // depositPaid: boolean
    // remainingBalance: number
};

type ShoppingBasketProviderProps = {
    children: ReactNode;
}
function ShoppingBasketProvider({ children }: ShoppingBasketProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [basketItems, setBasketItems] = useLocalStorage<BasketItem[]>("shopping-basket", []);


    const openBasket = () => setIsOpen(true)
    const closeBasket = () => setIsOpen(false)
    const addToBasket = (id: string, price: number) => {
        setBasketItems(items => {
            const serviceItem = items.find(item => item.id === id);
            const exists = serviceItem != null;
            if (!exists) {
                return [...items, { id, quantity: 1, price }]
            }
            return items.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity + 1, price: item.price }
                } else {
                    return item
                }
            })
        })
    }
    const decreaseFromBasket = (id: string) => {
        setBasketItems(items => {
            const serviceItem = items.find(item => item.id === id);
            if (serviceItem?.quantity === 1)
                return items.filter(item => item.id !== id)
            else {
                return items.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1, price: item.price }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    const removeFromBasket = (id: string) => {
        setBasketItems(items => items.filter(item => item.id !== id))
    }
    const emptyBasket = () => {
        setBasketItems([]);
    }

    const basketQuantity = basketItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    )

    const basketTotal = () => basketItems.reduce((total, basketItem) => {
        const item = basketItems.find(i => i.id === basketItem.id)
        return total + (item?.price || 0) * basketItem.quantity},
        0
    )


    return (
        <ShoppingBasketContext.Provider value={{
            openBasket,
            closeBasket,
            addToBasket,
            decreaseFromBasket,
            removeFromBasket,
            basketTotal,
            emptyBasket,
            basketItems,
            basketQuantity,
        }}>
            {children}
        </ShoppingBasketContext.Provider>
    )
}
export default ShoppingBasketProvider;


const useShoppingBasketContext = () => {
    return useContext(ShoppingBasketContext);
}
export { useShoppingBasketContext }