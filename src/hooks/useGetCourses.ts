import { useMemo } from 'react'
import { processStringData } from '../helpers/firebase/firebaseHelper';
import { calculateDaysFromTodayString } from '../res/funcs';
import { ProductItem } from '../types/ProductItem';
import useFirestoreData from './useFirestoreData';

const useGetCourses = () => {
    const { data, loadingData, error } = useFirestoreData("courses");


    const courses = useMemo(() => {
        // Only grab active items.
        const filtered = (data as ProductItem[])?.filter(item => item.active);

        filtered?.map(item => {
            item.description = processStringData(item.description)
            if (item.courseItinerary)
                item.courseItinerary = processStringData(item.courseItinerary)
            if (item.courseTopics)
                item.courseTopics = processStringData(item.courseTopics)
        })

        // Sort by price.
        const sorted = filtered?.sort((a, b) => b.price - a.price);

        // sorted?.map(item => { item.isOnSale = true; item.salePrice = 20; } );

        sorted?.map(item =>
            item.upcomingDates = item.upcomingDates?.filter(date => {
                const days = calculateDaysFromTodayString(date);
                return !isNaN(days) && days >= 0;
            })
        );
        return sorted;
    }, [data]);

    const loadingCourses = useMemo(() => loadingData, [loadingData]);

    const coursesError = useMemo(() => error, [error]);

    function getCourseByID(id: string) { return courses.find(item => item.id === id) }

    return { courses, loadingCourses, coursesError, getCourseByID }
}

export default useGetCourses