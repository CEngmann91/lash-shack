import { useMemo } from 'react'
import { Testimonial } from '../types/Testimonial';
import useFirestoreData from './useFirestoreData';

const useGetTestimonials = () => {
    const { data, loadingData, error } = useFirestoreData("testimonials");


    const testimonials = useMemo(() => {
        let list = [] as Testimonial[];
        data?.map(item => list = item['content'])
        const sorted = list.slice().sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).reverse();
        return sorted;
    }, [data,]);

    const loadingTestimonials = useMemo(() => loadingData, [loadingData]);

    const testimonialsError = useMemo(() => error, [error])

    return { testimonials, loadingTestimonials, testimonialsError }
}

export default useGetTestimonials