import { createSlice } from '@reduxjs/toolkit'

type WishListItem = {
  id: string;
  dateAdded: string;
}

const initialState = {
  wishListItems: [] as WishListItem[],
  totalQuantity: 0
}

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const newItem = action.payload;
      const { id, dateAdded } = newItem;

      // Find the WishListItem based on the id.
      const wishListItem = state.wishListItems.find(item => item.id === id) as WishListItem;

      // Its already part of the wish list.
      if (wishListItem)
        return;

      state.totalQuantity++;

      // Add it to the wish list.
      state.wishListItems.push({
        id, dateAdded
      });
    },
    removeFromWishList: (state, action) => {
      const newItem = action.payload;
      const { id } = newItem;
      // Find the WishListItem based on the id
      const wishListItem = state.wishListItems.find(item => item.id === id) as WishListItem;

      // It is not found within the wish list.
      if (!wishListItem)
        return;

      state.totalQuantity--;
      // Remove it from the wish list
      state.wishListItems = state.wishListItems.filter(item => item.id !== id);
    },
    emptyWishList: (state) => {
      state.wishListItems = [];
    }
  }
});

export const wishListActions = wishListSlice.actions

export default wishListSlice.reducer