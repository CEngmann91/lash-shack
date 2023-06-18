import { useMemo } from 'react'
import { ProductItem } from '../types/ProductItem';
import useGetCourses from './useGetCourses';
import useGetServices from './useGetServices';

const useGetCatalog = () => {
    const { courses, loadingCourses, coursesError } = useGetCourses();
    const { services, loadingServices, servicesError } = useGetServices();


    const catalog = useMemo(() => {
        if (courses && services)
        {
            let data = [...courses, ...services];
            // data = data.sort((a, b) => a.category.localeCompare(b.category));
            return data;
        }
        return [] as ProductItem[];
    }, [courses, services]);

    function getByID(id: string) { return catalog?.find(item => item.id === id) as ProductItem; }
    
    // const getUserByID = (id: string) => data?.find(item => item.id === id);

    const loading = useMemo(() => loadingCourses, [loadingCourses, loadingServices]);

    const error = useMemo(() => (!coursesError || !servicesError), [coursesError, servicesError]);
    

    return { loading, error, catalog, courses, services, getByID }
}

export default useGetCatalog