import React, { useMemo } from 'react'
import { ProductItem } from '../types/ProductItem';
import useFirestoreData from './useFirestoreData';

const useGetCourses = () => {
    const { data, loadingData, dataError } = useFirestoreData("courses");


    
    const courses = useMemo(() => (data as ProductItem[])?.sort((a, b) => a.price - b.price), [data]);

    const loadingCourses = useMemo(() => loadingData, [loadingData]);

    const getCoursesError = useMemo(() => dataError, [dataError]);

    const getCourseByID = (id: string) => {
        const product = courses.find(item => item.id === id)
        return product;
    }

    return { courses, loadingCourses, getCoursesError, getCourseByID }
}

export default useGetCourses