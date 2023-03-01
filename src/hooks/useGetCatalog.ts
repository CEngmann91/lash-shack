import { useMemo } from 'react'
import { ProductItem } from '../types/ProductItem';
import useGetCourses from './useGetCourses';
import useGetServices from './useGetServices';

const useGetCatalog = () => {
    const { courses, loadingCourses, getCoursesError } = useGetCourses();
    const { services, loadingServices, getServicesError } = useGetServices();


    const catalog = useMemo(() => {
        if (loadingServices && loadingCourses)
            return [] as ProductItem[];

        let data = [...courses, ...services];
        // data = data.sort((a, b) => a.category.localeCompare(b.category));
        return data;
    }, [courses, services]);

    const loading = useMemo(() => loadingCourses, [loadingCourses, loadingServices]);

    const error = useMemo(() => (!getCoursesError || !getServicesError), [getCoursesError, getServicesError]);

    

    return { loading, error, catalog, courses, services }
}

export default useGetCatalog