import { useDispatch } from "react-redux";
import { appActions } from "../slices/appSlice";
import { useSelector as useReduxSelector } from 'react-redux';
import { RootState } from '../../redux/store'
import { toggleBodyZoomOut } from "../../res/funcs";

export const useApplicationActions = () => {
    const dispatch = useDispatch();
    const loading = useReduxSelector((state: RootState) => state.application.loading);
    const showingAuthModal = useReduxSelector((state: RootState) => state.application.showingAuthModal);




    function isLoading() {
        return loading;
    }

    function setAsLoading() {
        dispatch(appActions.setAsLoading());
    }

    function setAsNotLoading() {
        dispatch(appActions.setAsNotLoading());
    }

    function isShowingAuthModal() {
        return showingAuthModal;
    }

    function toggleAuthModal() {
        toggleBodyZoomOut();
        if (!showingAuthModal)
            dispatch(appActions.showAuthModal());
        else
            dispatch(appActions.hideAuthModal());
    }


    return {
        isLoading,
        setAsLoading,
        setAsNotLoading,
        
        isShowingAuthModal,
        toggleAuthModal,
    };
}