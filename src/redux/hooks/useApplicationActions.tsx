import { useDispatch } from "react-redux";
import { appActions } from "../slices/appSlice";
import { useSelector as useReduxSelector } from 'react-redux';
import { RootState } from '../../redux/store'

export const useApplicationActions = () => {
    const dispatch = useDispatch();
    const loading = useReduxSelector((state: RootState) => state.application.loading);



    function isLoading() {
        return loading;
    }

    function setAsLoading() {
        dispatch(appActions.setAsLoading());
    }

    function setAsNotLoading() {
        dispatch(appActions.setAsNotLoading());
    }


    return {
        isLoading,
        setAsLoading,
        setAsNotLoading
    };
}