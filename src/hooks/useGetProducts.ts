import { useMemo } from 'react'
import { SalesProduct } from '../types/SalesProduct';
import useFirestoreData from './useFirestoreData';

const useGetProducts = () => {
    const { data, loadingData, error } = useFirestoreData("products");
    

    const items = useMemo(() => {
        // Only grab active items.
        const filtered = (data as SalesProduct[])?.filter(item => item.active);
        // Sort by price.
        const sorted = filtered?.sort((a, b) => b.price - a.price)
        return sorted;
    }, [data]);

    const loadingProducts = useMemo(() => loadingData, [loadingData]);

    const productsError = useMemo(() => error, [error]);

    return {
        items,
        loadingProducts,
        productsError
    }
}

export default useGetProducts