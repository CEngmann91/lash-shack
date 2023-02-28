import { useMemo } from 'react'
import { ProductItem } from '../types/ProductItem';
import useFirestoreData from './useFirestoreData';

const useGetServices = () => {
    const { data, loadingData, dataError } = useFirestoreData("services");


    const services = useMemo(() =>
        // (data as ProductItem[])?.sort((a, b) => a.subServiceCategory.localeCompare(b.subServiceCategory))
        (data as ProductItem[])?.sort((a, b) => a.price - b.price)
        , [data]);

    const loadingServices = useMemo(() => loadingData, [loadingData]);

    const getServicesError = useMemo(() => dataError, [dataError]);


    const getServiceByID = (id: string) => {
        const product = services.find(item => item.id === id)
        return product;
    }


    return { services, loadingServices, getServicesError, getServiceByID }
}

export default useGetServices