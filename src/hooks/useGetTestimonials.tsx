import React, { useMemo, useState } from 'react'
import { Testimonial } from '../types/Testimonial';
import useFirestoreData from './useFirestoreData';

const useGetTestimonials = () => {
    const { data, loadingData, dataError } = useFirestoreData("testimonials");


    const testimonials = useMemo(() => {
        let list = [] as Testimonial[];
        data?.map(item => list = item['content'])
        return list;
    }, [data,]);

    const loadingTestimonials = useMemo(() => loadingData, [loadingData]);

    const getTestimonialsError = useMemo(() => dataError, [dataError])

    return { testimonials, loadingTestimonials, getTestimonialsError }
}

export default useGetTestimonials