import { useMemo } from 'react'
import { Testimonial } from '../types/Testimonial';
import useFirestoreData from './useFirestoreData';

const useGetTestimonials = () => {
    const limit: number = 3;
    const { data, loadingData, error } = useFirestoreData("testimonials");

    const testimonials = useMemo(() => {
        let list: Testimonial[] = [];
        data?.map(item => list = item['content'])
        list.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        return list.slice(0, limit);
    }, [data]);

    const loadingTestimonials = useMemo(() => loadingData, [loadingData]);

    const testimonialsError = useMemo(() => error, [error])

    return { testimonials, loadingTestimonials, testimonialsError }
}

export default useGetTestimonials