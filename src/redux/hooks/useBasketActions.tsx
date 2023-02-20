import { useDispatch } from "react-redux";
import { basketActions } from "../slices/basketSlice";
import { useSelector as useReduxSelector } from 'react-redux';
import { RootState } from "../store";

export const useBasketActions = () => {
    const dispatch = useDispatch();
    const basketItems = useReduxSelector((state: RootState) => state.basket.basketItems);




    function addToBasket(id: string, title: string, imgUrl: string, price: number) {
        dispatch(basketActions.addToBasket({
            id, title, imgUrl, price
        }));
    }

    function removeFromBasket(id: string, title: string, imgUrl: string, price: number) {
        dispatch(basketActions.removeFromBasket({
            id, title, imgUrl, price
        }));
    }

    function deleteItemFromBasket(id: string) {
        dispatch(basketActions.deleteItem(id));
    }

    function existsInBasket(id: string) {
        return countByID(id) > 0;
    }

    function countByID(id: string) {
        if (basketItems.length === 0) return 0;

        const basketItem = basketItems.find(item => item.id === id);
        if (!basketItem) return 0;

        return basketItem.quantity;
    }

    function emptyBasket() {
        dispatch(basketActions.emptyBasket());
    }


    return {
        addToBasket,
        removeFromBasket,
        deleteItemFromBasket,
        existsInBasket,
        countByID,
        emptyBasket,
    };
}