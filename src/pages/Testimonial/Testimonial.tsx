import './Testimonial.scss';
import React from 'react'
import TestimonialCard from './TestimonialCard/TestimonialCard';
import { Page } from '../../components';

import { Parallax } from 'react-parallax';
import { photography } from '../../util/images';

interface iConsumer {
  displayName: string;
  createdAt: string;
}
export interface iReview {
  id: number;
  consumer: iConsumer;
  starRating: number;
  title: string;
  description: string;
}
const reviews: iReview[] = [
  {
    id: 1,
    consumer: {
      displayName: "John Doe",
      createdAt: '11/10/2022'
    },
    starRating: 5,
    title: 'Amazing',
    description: 'My lashes look fab and Emma did an amazing job. Quick and Professional'
  },
  {
    id: 2,
    consumer: {
      displayName: "John Doe",
      createdAt: '06/10/2022'
    },
    starRating: 5,
    title: 'Will Be A Regular',
    description: 'Emma was lovely and I will definitely be booking again.'
  },
  {
    id: 3,
    consumer: {
      displayName: "John Doe",
      createdAt: '30/09/2022'
    },
    starRating: 5,
    title: 'Welcoming',
    description: 'Emma was so welcoming, she spoke everything before she did it. Was nice and chatty made me feel at ease. Will be back again. Thank you Emma!'
  },
  {
    id: 4,
    consumer: {
      displayName: "John Snow",
      createdAt: '01/01/2020'
    },
    starRating: 1,
    title: 'You Know Nothing!!',
    description: 'Still waiting for this information...'
  }
]

const Testimonial = () => {

  return (
    // <Parallax blur={3} bgImage={photography} strength={600}>

    <Page id='testimonial' className='app__testimonial' header='Customer Reviews'>
      <div className="list">
        {reviews.map(({ id, consumer, starRating, title, description }) =>
          <TestimonialCard
            key={id}
            id={id}
            consumer={consumer}
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
    //     {reviews.map(({ id, consumer, starRating, title, description }) =>
    //       <TestimonialCard key={id} id={id} consumer={consumer} starRating={starRating} title={title} description={description} />
    //     )}
    //   </div>
    // </div>
  )
}

export default Testimonial