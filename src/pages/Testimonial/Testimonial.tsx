import './Testimonial.scss';
import React from 'react'
import TestimonialCard from './TestimonialCard/TestimonialCard';
import { Page } from '../../components';

interface iClient {
  displayName: string;
  createdAt: string;
}
export interface iReview {
  id: number;
  title: string;
  description: string;
  starRating: number;
  client: iClient;
  instagramUrl?: string;
}
const reviews: iReview[] = [
  {
    id: 1,
    title: 'Amazing',
    description: 'My lashes look fab and Emma did an amazing job. Quick and Professional',
    starRating: 5,
    instagramUrl: "",
    client: {
      displayName: "John Doe",
      createdAt: '11/10/2022'
    },
  },
  {
    id: 2,
    title: 'Will Be A Regular',
    description: 'Emma was lovely and I will definitely be booking again.',
    starRating: 5,
    instagramUrl: "",
    client: {
      displayName: "John Doe",
      createdAt: '06/10/2022'
    },
  },
  {
    id: 3,
    title: 'Welcoming',
    description: 'Emma was so welcoming, she spoke everything before she did it. Was nice and chatty made me feel at ease. Will be back again. Thank you Emma!',
    starRating: 5,
    instagramUrl: "",
    client: {
      displayName: "John Doe",
      createdAt: '30/09/2022'
    },
  },
  {
    id: 4,
    title: 'You Know Nothing!!',
    description: 'Still waiting for this information...',
    starRating: 1,
    instagramUrl: "",
    client: {
      displayName: "John Snow",
      createdAt: '01/01/2020'
    },
  }
]

const Testimonial = () => {

  return (
    <Page id='testimonial' className='app__testimonial' header='Customer Reviews'>
      <div className="list">
        {reviews.map(({ id, client, starRating, title, description }) =>
          <TestimonialCard
            key={id}
            id={id}
            client={client}
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