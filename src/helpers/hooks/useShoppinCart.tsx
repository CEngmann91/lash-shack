import { useEffect, useState } from "react";
import { useCounter } from "./useCounter";

export interface iShoppingCartItem {
    id: string;
    title: string;
    price: number;
}

export function useShoppinCart(

    // onAdd: (itemID: string) => void, onRemove: (itemID: string) => void, onClear: () => void
    ) {
    const { value, increment, decrement, reset } = useCounter(1);
    // const [cartItems, setCartItems] = useState<iShoppingCartItem[]>([]);


    // useEffect(() => {
    //   alert(`useShoppinCart() . items changed - ${getCount()}`);
    // }, [cartItems])
    


    function addToBasket(itemID: string) {
        // const newItem: iShoppingCartItem = {
        //     id: itemID, title: "New Item", price: 1.11
        // }
        // setCartItems(prev => [...prev, newItem]);

        increment();
    }

    function removeFromBasket(itemID: string) {
        // setCartItems(prev => prev.filter(item => item.id !== itemID));

        decrement();
    }

    function clearBasket() {
        // setCartItems([])

        reset();
    }

    function getCount() {
        // return cartItems.length;

        return value;
    }

    // return { cartItems, addToBasket, removeFromBasket, clearBasket, getCount };
    return { value, addToBasket, removeFromBasket, clearBasket, getCount };
}