import { useMemo } from 'react'
import { ProductItem } from '../types/ProductItem';
import useFirestoreData from './useFirestoreData';

const useGetServices = () => {
    const { data, loadingData, error } = useFirestoreData("services");


    const services = useMemo(() => {
        // Only grab active items.
        const filtered = (data as ProductItem[])?.filter(item => item.active);
        // Sort by price.
        const sorted =
            // filtered?.sort((a, b) => b.price - a.price);
            filtered?.sort((a, b) => a.subServiceCategory.localeCompare(b.subServiceCategory))
                .sort((a, b) => a.price - b.price)
        return sorted;
    }, [data]);

    const getAllFullSetExtensions = useMemo(() => {
        const filtered = services?.filter(item => item.active && item.subServiceCategory === "Eyelash Extensions Full Sets")
        const sorted = filtered?.sort((a, b) => b.price - a.price);
        return sorted;
    }, [data]);

    const getAllExtensionInfills = useMemo(() => {
        const filtered = services?.filter(item => item.active && item.subServiceCategory === "Eyelash Extensions Infills")
        const sorted = filtered?.sort((a, b) => b.price - a.price);
        return sorted;
    }, [data]);

    const getAllEyebrows = useMemo(() => {
        const filtered = services?.filter(item => item.active && item.subServiceCategory === "Eyebrows")
        const sorted = filtered?.sort((a, b) => b.price - a.price);
        return sorted;
    }, [data]);

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
        getAllEyebrows,
        // getAllLips,
        // getAllSMPU,
        loadingServices,
        servicesError,
        getServiceByID
    }
}

export default useGetServices