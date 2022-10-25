import './Testimonial.scss';
import React, { useEffect, useState } from 'react'
import TestimonialCard from './TestimonialCard/TestimonialCard';
import { Page } from '../../components';
import { getDocument } from '../../helpers/firebase/firestore';
import { REACT_APP_FIRESTORE_TESTIMONIAL_COLLECTION, REACT_APP_FIRESTORE_TESTIMONIAL_DOCUMENT } from '../../constants/firebase';
import { Timestamp } from 'firebase/firestore';

// interface iClient {
//   displayName: string;
//   createdAt: string;
// }
export interface iReview {
  id: number;
  title: string;
  description: string;
  starRating: number;
  // client: iClient;
  createdAt: string;
}

const Testimonial = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [reviews, setReviews] = useState<iReview[]>([]);


  useEffect(() => {
    window.scrollTo(0, 0);

    fetchCourses();
  }, [])


  const fetchCourses = async () => {
    setIsLoading(true);

    getDocument(REACT_APP_FIRESTORE_TESTIMONIAL_COLLECTION as string,
      REACT_APP_FIRESTORE_TESTIMONIAL_DOCUMENT as string)
      .then(res => {
        const array: iReview[] = res['content'];
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
        setReviews(sorted);

        setIsLoading(false);
      })
      .catch((error) => {
        // alert(error);
        setError(error);
        setIsLoading(false);
      });
  }


  return (
    <Page id='testimonial' className='app__testimonial' header='Customer Reviews'>
      <div className="list">
        {reviews.map(({ id, createdAt, starRating, title, description }) =>
          <TestimonialCard
            key={id}
            id={id}
            createdAt={createdAt}
            starRating={starRating}
            title={title}
            description={description}
          />
        )}
      </div>
    </Page>
    // </Parallax>



    // <div className='app__testimonial'>
    //   <h1 className="head-text title"><span>Customer Reviews</span></h1>
    //   <div className="list">
    //     {reviews.map(({ id, client, starRating, title, description }) =>
    //       <TestimonialCard key={id} id={id} client={client} starRating={starRating} title={title} description={description} />
    //     )}
    //   </div>
    // </div>
  )
}

export default Testimonial