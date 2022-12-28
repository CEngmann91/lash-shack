import { ReactNode, useContext, useState } from 'react';
import ShoppingBasketContext from '../context/ShoppingBasketContext';
import { Category } from '../helpers/firebase/data/Category';
import { useLocalStorage } from '../helpers/hooks/useLocalStorage';

export type BasketItem = {
    id: string
    quantity: number
    price: number
    category: Category;
    date?: string;
    time?: string;
    // depositPaid: boolean
    // remainingBalance: number
};

type ShoppingBasketProviderProps = {
    children: ReactNode;
}
function ShoppingBasketProvider({ children }: ShoppingBasketProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [basketItems, setBasketItems] = useLocalStorage<BasketItem[]>("shopping-basket", []);
    



    const getAllCategoryInBasket = (category: string) : BasketItem[] => {
        return basketItems.filter(item => item.category === category);
    }

    function sortBasketByCategory() {
        // Sort by Category.
        setBasketItems(items =>items.sort((a, b) => b.category.localeCompare(a.category)));
    }


    
    const openBasket = () => {
        sortBasketByCategory();
        setIsOpen(true)
    } 
    const closeBasket = () => setIsOpen(false)
    const addToBasket = (category: Category, id: string, price: number, date?: string, time?: string) => {
        setBasketItems(items => {
            const itemsOfCategory = getAllCategoryInBasket(category);
            const basketItem = itemsOfCategory.find(item => (item.category === category && item.id === id));
            if (!basketItem)
                return [...items, { category, id, quantity: 1, price, date, time }]
            
            return items.map(item => {
                if (item.category === category && item.id === id)
                    return { ...item, quantity: item.quantity + 1, price: item.price }
                return item;
            })
        })
    }
    const decreaseFromBasket = (category: Category, id: string) => {
        setBasketItems(items => {
            const itemsOfCategory = getAllCategoryInBasket(category);
            const basketItem = itemsOfCategory.find(item => (item.category === category && item.id === id));
            if (basketItem?.quantity === 1)
                return items.filter(item => (item.category === category && item.id !== id))
            else {
                return items.map(item => {
                    if (item.category === category && item.id === id)
                        return { ...item, quantity: item.quantity - 1, price: item.price }
                    return item;
                })
            }
        })
    }
    const removeFromBasket = (category: Category, id: string) => {
        setBasketItems(items => items.filter(item => (item.category === category && item.id !== id)))
    }
    const setDateTimeForBasketItem = (category: Category, id: string, date: string, time?: string) => {
        setBasketItems(items => {
            return items.map(item => {
                if (item.category === category && item.id === id)
                    return { ...item, date, time };
                return item;
            })
        })
    }
    const emptyBasket = () => {
        setBasketItems([]);
    }
    const basketQuantity = basketItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    )
    const basketTotal = () => basketItems.reduce(
        (total, basketItem) => {
        const item = basketItems.find(i => i.id === basketItem.id)
        return total + (item?.price || 0) * basketItem.quantity},
        0
    )


    return (
        <ShoppingBasketContext.Provider value={{
            openBasket,
            closeBasket,
            addToBasket,
            removeFromBasket,
            decreaseFromBasket,
            setDateTimeForBasketItem,
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