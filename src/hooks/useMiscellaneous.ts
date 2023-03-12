import { useMemo } from 'react'
import useFirestoreData from './useFirestoreData';

const useGetMiscellaneous = () => {
    const { data, loadingData, error } = useFirestoreData("miscellaneous");


    const miscellaneous = useMemo(() => {


        return data?.at(0);
    }, [data,]);

    const loadingMiscellaneous = useMemo(() => loadingData, [loadingData]);

    const miscellaneousError = useMemo(() => error, [error])

    return { miscellaneous, loadingMiscellaneous, miscellaneousError }
}

export default useGetMiscellaneous