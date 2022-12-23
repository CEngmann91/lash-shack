import React, { useEffect, useState } from "react";
import { REACT_APP_FIRESTORE_TESTIMONIAL_COLLECTION, REACT_APP_FIRESTORE_TESTIMONIAL_DOCUMENT } from "../../constants/firebase";
import { iTestimonialReview } from "../../pages/Main/Testimonial/Testimonial";
import { getDocument } from "../../networking/firebase/firestore";
import { useFetchDocument } from "../../networking/firebase/hooks/useFetchDocument";

export const useTestimonial = () => {
  const [testimonials, setTestimonials] = useState<iTestimonialReview[]>([]);
  const [testimonialError, setTestimonialError] = useState<any>();
  const [loadingTestimonial, setLoadingTestimonial] = useState(false);



  const fetchTestimonials = async () => {
    try {
      setLoadingTestimonial(true);

      await getDocument(REACT_APP_FIRESTORE_TESTIMONIAL_COLLECTION as string,
        REACT_APP_FIRESTORE_TESTIMONIAL_DOCUMENT as string)
        .then(res => {
          const array: iTestimonialReview[] = res['content'];
          // Sort by date.
          let sorted = array.sort(function (a, b) {
            let aa = a.createdAt.split('/').reverse().join(),
              bb = b.createdAt.split('/').reverse().join();
            return aa > bb ? -1 : (aa < bb ? 1 : 0);
          });
          
          // let sorted = array.sort((a, b) => a.id - b.id);
          // sort by price
          // let sorted = array.sort((a, b) => b.price - a.price);
          // let sorted = array.sort((a, b) => b.popularity - a.popularity);
          // sorted = [...sorted].sort((a, b) => b.salePrice - a.salePrice);
          setTestimonials(sorted);
          setLoadingTestimonial(false);
        })
        .catch(error => {
          setTestimonialError(error)
          setLoadingTestimonial(false);
        });
    }
    catch (error) {
      setTestimonialError(error)
      setLoadingTestimonial(false);
    };
  }

  useEffect(() => {
    fetchTestimonials();
  }, [])

  return { testimonials, loadingTestimonial, testimonialError };













  /*const { data, loading, error } = useFetchDocument(
    REACT_APP_FIRESTORE_TESTIMONIAL_COLLECTION as string,
    REACT_APP_FIRESTORE_TESTIMONIAL_DOCUMENT as string
  );

  let testimonials : iTestimonialReview[] = []; 
  let testimonialError: any = error;
  let loadingTestimonial: boolean = loading;

  if (!data)
    return { testimonials, loadingTestimonial, testimonialError };


  const array: iTestimonialReview[] = data['content'];
  // Sort by date.
  let sorted = array.sort(function (a, b) {
    let aa = a.createdAt.split('/').reverse().join(),
      bb = b.createdAt.split('/').reverse().join();
    return aa > bb ? -1 : (aa < bb ? 1 : 0);
  });


  // let sorted = array.sort((a, b) => a.id - b.id);
  // sort by price
  // let sorted = array.sort((a, b) => b.price - a.price);
  // let sorted = array.sort((a, b) => b.popularity - a.popularity);
  // sorted = [...sorted].sort((a, b) => b.salePrice - a.salePrice);
  testimonials = sorted;

  return { testimonials, loadingTestimonial, testimonialError };
  */
}