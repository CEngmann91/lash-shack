import { createSlice } from '@reduxjs/toolkit'

type BasketItem = {
    id: string;
    title: string;
    imgUrl: string;
    price: number;
    quantity: number;
    totalPrice: number;
}

const initialState = {
    basketItems: [] as BasketItem[],
    totalAmount: 0,
    totalQuantity: 0,
}

const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            const newItem = action.payload;
            const { id, title, imgUrl, price } = newItem as BasketItem;
            // Find the BasketItem based on the id.
            const basketItem = state.basketItems.find(item => item.id === id) as BasketItem;

            state.totalQuantity++;

            // If the item doesnt exist then push a new BasketItem into the array.
            if (!basketItem) {
                state.basketItems.push({
                    id, title, imgUrl, price, quantity: 1, totalPrice: price
                });
            }
            else {
                basketItem.quantity++;
                basketItem.totalPrice = basketItem.totalPrice + price;
            }

            state.totalAmount = state.basketItems.reduce<number>((total, item) => {
                const itemPrice: number = item.price;
                const itemQuantity: number = item.quantity;

                return total + itemPrice * itemQuantity;
            }, 0);
        },
        removeFromBasket: (state, action) => {
            const selectItem = action.payload;
            const { id, price } = selectItem;
            // Find the BasketItem based on the id
            const basketItem = state.basketItems.find(item => item.id === id) as BasketItem;

            // If the item doesnt exist then do nothing.
            if (!basketItem)
                return;

            if (state.totalQuantity > 0)
                state.totalQuantity--;

            if (basketItem.quantity === 1)
                state.basketItems = state.basketItems.filter(item => item.id !== id);
            else {
                basketItem.quantity--;
                basketItem.totalPrice = basketItem.totalPrice - price;
            }

            state.totalAmount = state.basketItems.reduce<number>((total, item) => {
                const itemPrice: number = item.price;
                const itemQuantity: number = item.quantity;

                return total + itemPrice * itemQuantity;
            }, 0);
        },
        deleteItem: (state, action) => {
            const id = action.payload;
            // Find the BasketItem based on the id
            const basketItem = state.basketItems.find(item => item.id === id) as BasketItem;

            if (basketItem) {
                state.basketItems = state.basketItems.filter(item => item.id !== id);
                state.totalQuantity = state.totalQuantity - basketItem.quantity;
            }

            state.totalAmount = state.basketItems.reduce<number>((total, item) => {
                const itemPrice: number = item.price;
                const itemQuantity: number = item.quantity;

                return total + itemPrice * itemQuantity;
            }, 0);
        },
        emptyBasket: (state, action) => {
            state = initialState;
        },
        /*existInBasket: (state, action) => {
            const id = action.payload;
            const basketItem = state.basketItems.find(item => item.id === id) as BasketItem;
            // return basketItem === undefined || basketItem === null;
        }*/
    }
});

export const basketActions = basketSlice.actions

export default basketSlice.reducer