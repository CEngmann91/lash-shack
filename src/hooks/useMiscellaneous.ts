import { useMemo } from 'react'
import useFirestoreData from './useFirestoreData';

const useGetMiscellaneous = () => {
    const { data, loadingData, error } = useFirestoreData("miscellaneous");


    const miscellaneous = useMemo(() => data, [data]);

    const landingPage_LimitedTimOffer = useMemo(() => {
        if (!miscellaneous)
            return {}

        const { landing_SpecialOfferBanner } = miscellaneous?.at(0) as any;
        return landing_SpecialOfferBanner
    }, [data]);

    const openingHours = useMemo(() => {
        if (!miscellaneous)
            return {}

        const { WorkingHours } = miscellaneous?.at(1) as any;
        return WorkingHours
    }, [data]);

    const loadingMiscellaneous = useMemo(() => loadingData, [loadingData]);

    const miscellaneousError = useMemo(() => error, [error])

    return { miscellaneous, landingPage_LimitedTimOffer, openingHours, loadingMiscellaneous, miscellaneousError }
}

export default useGetMiscellaneous