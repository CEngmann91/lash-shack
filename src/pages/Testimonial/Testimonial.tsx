import './Testimonial.scss';
import React, { ReactNode, useEffect, useState } from 'react'
import TestimonialCard from './TestimonialCard/TestimonialCard';
import { ActivityIndicator, Page } from '../../components';
import { getDocument } from '../../helpers/firebase/firestore';
import { REACT_APP_FIRESTORE_TESTIMONIAL_COLLECTION, REACT_APP_FIRESTORE_TESTIMONIAL_DOCUMENT } from '../../constants/firebase';

// interface iClient {
//   displayName: string;
//   createdAt: string;
// }
export interface iTestimonialReview {
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
  const [reviews, setReviews] = useState<iTestimonialReview[]>([]);


  useEffect(() => {
    window.scrollTo(0, 0);

    fetchCourses();
  }, [])


  const fetchCourses = async () => {
    setIsLoading(true);

    getDocument(REACT_APP_FIRESTORE_TESTIMONIAL_COLLECTION as string,
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
        setReviews(sorted);

        setIsLoading(false);
      })
      .catch((error) => {
        // alert(error);
        setError(error);
        setIsLoading(false);
      });
  }

  const renderLoadingActivity = (): ReactNode => (
    <div className='app__flex app__min-height'>
      <ActivityIndicator borderColour='rgba(239, 179, 183, 1)' borderSpinColour='rgba(16, 40, 121, 1)' />
    </div>
  )

  const renderReviews = (): ReactNode => (
    reviews.map(({ id, createdAt, starRating, title, description }, index) =>
      <div key={index}>
        <TestimonialCard
          id={id}
          createdAt={createdAt}
          starRating={starRating}
          title={title}
          description={description}
        />
      </div>
    )
  );


  // if (isLoading) {
  //   return (
  //     <Page id='testimonial' className='app__testimonial' header='Customer Reviews'>
  //       <div className='app__flex app__min-height'>
  //         <ActivityIndicator borderColour='rgba(239, 179, 183, 1)' borderSpinColour='rgba(16, 40, 121, 1)' />
  //       </div>
  //     </Page>
  //   );
  // }

  return (
    <Page id='testimonial' className='app__testimonial' header='We Love Hearing From You'>
      {isLoading
        ?
          renderLoadingActivity()
        :
        error ?
          <>
            <p>Error is: {error}</p>

          </>
          :
          <div className="list">
            {renderReviews()}
          </div>
      }
    </Page>
  )
}

export default Testimonial