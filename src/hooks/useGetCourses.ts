import { useMemo } from 'react'
import { ProductItem } from '../types/ProductItem';
import useFirestoreData from './useFirestoreData';

const useGetCourses = () => {
    const { data, loadingData, error } = useFirestoreData("courses");



    const courses = useMemo(() => {
        // Only grab active items.
        const filtered = (data as ProductItem[])?.filter(item => item.active);
        // Sort by price.
        const sorted = filtered?.sort((a, b) => b.price - a.price);
        return sorted;
    }, [data]);

    const loadingCourses = useMemo(() => loadingData, [loadingData]);

    const coursesError = useMemo(() => error, [error]);

    function getCourseByID(id: string) { return courses.find(item => item.id === id) }

    return { courses, loadingCourses, coursesError, getCourseByID }
}

export default useGetCourses