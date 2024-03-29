import { useMemo } from 'react'
import { calculateDaysFromTodayString, processStringData } from '../res/funcs';
import { ProductItem } from '../types/ProductItem';
import useFirestoreData from './useFirestoreData';
import { UpcomingDate } from '../types/UpcomingDate';

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

        // sorted?.map(item => {
        //     if (item.upcomingDates) {
        //         item.upcomingDates = item.upcomingDates?.filter(date => {
        //             const days = calculateDaysFromTodayString(date.date);
        //             return !isNaN(days) && days >= 0;
        //         })
        //     }
        // });

        // array.sort(function(a, b) {
        //     var c = new Date(a.date);
        //     var d = new Date(b.date);
        //     return c-d;
        // });


        return sorted;
    }, [data]);

    const loadingCourses = useMemo(() => loadingData, [loadingData]);

    const coursesError = useMemo(() => error, [error]);

    function getCourseByID(id: string) { return courses.find(item => item.id === id) }

    return { courses, loadingCourses, coursesError, getCourseByID }
}

export default useGetCourses