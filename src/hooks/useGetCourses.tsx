import { useMemo } from 'react'
import { ProductItem } from '../types/ProductItem';
import useFirestoreData from './useFirestoreData';

const useGetCourses = () => {
    const { data, loadingData, dataError } = useFirestoreData("courses");



    const courses = useMemo(() => {
        // Only grab active items.
        const filtered = (data as ProductItem[])?.filter(item => item.active);
        // Sort by price.
        const sorted = filtered?.sort((a, b) => a.price - b.price);
        return sorted;
    }, [data]);

    const loadingCourses = useMemo(() => loadingData, [loadingData]);

    const getCoursesError = useMemo(() => dataError, [dataError]);

    const getCourseByID = (id: string) => courses.find(item => item.id === id)

    return { courses, loadingCourses, getCoursesError, getCourseByID }
}

export default useGetCourses