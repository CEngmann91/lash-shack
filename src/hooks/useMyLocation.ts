import { useLocation } from "react-router-dom";
import { capitalizeFirstLetter } from "../res/funcs";

// Wrapper for the useLocation hook.
export const useMyLocation = () => {
    const location = useLocation();


    
    function getLocationTitle( capitalized = true ) {
        const array = location.pathname.split('/');
        if (array && array.length>0)
        {
            const last = array[array.length-1];
            if (capitalized)
                return capitalizeFirstLetter(last);
            return last;
        }
        return "";
    }

    return { getLocationTitle };
}