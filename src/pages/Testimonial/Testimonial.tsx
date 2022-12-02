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


interface iProps {
  testimonials: iTestimonialReview[];
}
const Testimonial: React.FC<iProps> = ({ testimonials, ...props }: iProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');



  const renderLoadingActivity = (): ReactNode => (
    <div className='app__flex app__min-height'>
      <ActivityIndicator borderColour='rgba(239, 179, 183, 1)' borderSpinColour='rgba(16, 40, 121, 1)' />
    </div>
  )

  const renderReviews = (): ReactNode => (
    testimonials.map(({ id, createdAt, starRating, title, description }, index) =>
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
    <Page id='testimonial' className='app__testimonial' header='We Love Hearing From You' headerClassName='app__testimonial-title'>
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