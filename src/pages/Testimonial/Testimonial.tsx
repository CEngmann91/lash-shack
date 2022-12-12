import './Testimonial.scss';
import React, { ReactNode } from 'react'
import TestimonialCard from './TestimonialCard/TestimonialCard';
import { ActivityIndicator, Page } from '../../components';

export interface iTestimonialReview {
  id: number;
  title: string;
  description: string;
  starRating: number;
  createdAt: string;
}


type TestimonialProps = {
  testimonials: iTestimonialReview[];
  loading: boolean;
  error?: any;
}
const Testimonial: React.FC<TestimonialProps> = ({ testimonials, loading, error }: TestimonialProps) => {
  

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
    <Page id='testimonial' className='app__testimonial' header='We Love Hearing From You' headerClassName='app__testimonial-title'>
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
  )
}

export default Testimonial