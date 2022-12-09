import './Testimonial.scss';
import React, { ReactNode } from 'react'
import TestimonialCard from './TestimonialCard/TestimonialCard';
import { ActivityIndicator, Page } from '../../components';
import MySection from '../../components/MySection/MySection';

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
  loading: boolean;
  error?: any;
}
const Testimonial: React.FC<iProps> = ({ testimonials, loading, error, ...props }: iProps) => {


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

  return (
    <MySection className='app__testimonial'>
      <Page id='testimonial' header='We Love Hearing From You' headerClassName='app__testimonial-title'>
        {loading
          ?
          renderLoadingActivity()
          :
          (error ?
            <p>Error is: {error}</p>
            :
            <div className="list">
              {renderReviews()}
            </div>)
        }
      </Page>
    </MySection>
  )
}

export default Testimonial