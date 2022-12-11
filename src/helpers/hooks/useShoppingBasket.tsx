import { useContext } from "react";
import ShoppingBasketContext from "../../context/ShoppingBasketContext";

export function useShoppingBasket() {
    return useContext(ShoppingBasketContext)
}