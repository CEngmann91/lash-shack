import { useMemo } from 'react'
import useFirestoreData from './useFirestoreData';

const useGetMiscellaneous = () => {
    const { data, loadingData, error } = useFirestoreData("miscellaneous");

    const miscellaneous = data;

    const landingPage_LimitedTimOffer = miscellaneous?.[0]?.landing_SpecialOfferBanner ?? {};
    const openingHours = miscellaneous?.[1]?.WorkingHours ?? {};

    const loadingMiscellaneous = useMemo(() => loadingData, [loadingData]);

    const miscellaneousError = useMemo(() => error, [error])

    return { miscellaneous, landingPage_LimitedTimOffer, openingHours, loadingMiscellaneous, miscellaneousError }
}

export default useGetMiscellaneous