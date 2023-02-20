import { useDispatch } from "react-redux";
import { useSelector as useReduxSelector } from 'react-redux';
import { wishListActions } from "../slices/wishListSlice";
import { RootState } from "../store";

export const useWishListActions = () => {
    const dispatch = useDispatch();
    const wishListItems = useReduxSelector((state: RootState) => state.wishList.wishListItems);




    function addToWishList(id: string, title: string, imgUrl: string, price: number) {
        dispatch(wishListActions.addToWishList({
            id, title, imgUrl, price
        }));
    }

    function removeFromWishList(id: string, title: string, imgUrl: string, price: number) {
        dispatch(wishListActions.removeFromWishList({
            id, title, imgUrl, price
        }));
    }

    function existsInWishList(id: string) {
        if (wishListItems.length === 0) return false;

        const wishListItem = wishListItems.find(item => item.id === id);
        
        if (!wishListItem) return false;

        return true;
    }

    function emptyWishList() {
        dispatch(wishListActions.emptyWishList());
    }


    return {
        addToWishList,
        removeFromWishList,
        existsInWishList,
        emptyWishList,
    };
}