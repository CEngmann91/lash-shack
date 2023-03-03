import { useMemo } from 'react'
import { ProductItem } from '../types/ProductItem';
import useFirestoreData from './useFirestoreData';

const useGetServices = () => {
    const { data, loadingData, error } = useFirestoreData("services");


    const services = useMemo(() => 
    {
        // Only grab active items.
        const filtered = (data as ProductItem[])?.filter(item => item.active);
        // Sort by price.
        const sorted = filtered?.sort((a, b) => a.price - b.price);
        return sorted;

        // (data as ProductItem[])?.sort((a, b) => a.subServiceCategory.localeCompare(b.subServiceCategory))
        // (data as ProductItem[])?.sort((a, b) => a.price - b.price)
    }, [data]);

    const loadingServices = useMemo(() => loadingData, [loadingData]);

    const servicesError = useMemo(() => error, [error]);

    function getServiceByID(id: string) {
        return services.find(item => item.id === id);
    }


    return { services, loadingServices, servicesError, getServiceByID }
}

export default useGetServices