import { useCallback, useMemo } from 'react'
import { ProductItem } from '../types/ProductItem';
import useFirestoreData from './useFirestoreData';

const useGetServices = () => {
    const { data, loadingData, error } = useFirestoreData("services");


    const services = useMemo(() => {
        // Only grab active items.
        const filtered = (data as ProductItem[])?.filter(item => item.active);
        // Sort by subServiceCategory and price.
        const sorted = filtered?.sort((a, b) => {
            const categoryComparison = a.subServiceCategory.localeCompare(b.subServiceCategory);
            return categoryComparison !== 0 ? categoryComparison : a.price - b.price;
        });
        return sorted;
    }, [data]);


    const filterAndSortServices = useCallback((subServiceCategory: string, sortComparator: (a: ProductItem, b: ProductItem) => number) => {
        return services?.filter(item => item.active && item.subServiceCategory === subServiceCategory)
            ?.sort(sortComparator);
    }, [services]);

    const getAllFullSetExtensions = useMemo(() => {
        return filterAndSortServices("Eyelash Extensions Full Sets", (a, b) => a.price - b.price);
    }, [filterAndSortServices]);
    
    const getAllExtensionInfills = useMemo(() => {
        return filterAndSortServices("Eyelash Extensions Infills", (a, b) => a.price - b.price);
    }, [filterAndSortServices]);
    
    const getAllAesthetics = useMemo(() => {
        return filterAndSortServices("Aesthetics", (a, b) => (a.aestheticCategory ?? '').localeCompare(b?.aestheticCategory ?? ''));
    }, [filterAndSortServices]);
    
    const getAllEyebrows = useMemo(() => {
        return filterAndSortServices("Eyebrows", (a, b) => a.price - b.price);
    }, [filterAndSortServices]);

    // const getAllLips = useMemo(() => services?.filter(item => item.subServiceCategory === "Lips"), [data]);

    // const getAllSMPU = useMemo(() => services?.filter(item => item.subServiceCategory === "Semi-Permanent Makeup"), [data]);

    const loadingServices = useMemo(() => loadingData, [loadingData]);

    const servicesError = useMemo(() => error, [error]);

    function getServiceByID(id: string) {
        return services.find(item => item.id === id);
    }

    return {
        services,
        getAllFullSetExtensions,
        getAllExtensionInfills,
        getAllAesthetics,
        getAllEyebrows,
        // getAllLips,
        // getAllSMPU,
        loadingServices,
        servicesError,
        getServiceByID
    }
}

export default useGetServices