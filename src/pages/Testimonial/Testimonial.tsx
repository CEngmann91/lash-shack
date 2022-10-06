import './Testimonial.scss';
import React from 'react'
import { Star } from '../../util/icons';
import { AnimatePresence, motion } from 'framer-motion';

interface iConsumer {
  displayName: string;
  createdAt: string;
}

interface iReview {
  id: number;
  consumer: iConsumer;
  stars: number;
  title: string;
  description: string;
}

const reviews: iReview[] = [
  {
    id: 0,
    consumer: {
      displayName: "Christian",
      createdAt: '29/05/1991'
    },
    stars: 5,
    title: 'Amazing, Friendly Staff',
    description: 'Always a pleasure to deal with'
  },
  {
    id: 1,
    consumer: {
      displayName: "John Smith",
      createdAt: '01/01/1991'
    },
    stars: 3,
    title: 'Insert Title Here',
    description: 'Insert Description Here'
  },
  {
    id: 2,
    consumer: {
      displayName: "John Doe",
      createdAt: '01/01/1992'
    },
    stars: 5,
    title: 'Insert Title Here',
    description: 'Insert Description Here'
  },
  {
    id: 3,
    consumer: {
      displayName: "John Snow",
      createdAt: '01/01/2020'
    },
    stars: 4,
    title: 'You Know Nothing!!',
    description: 'Still waiting for this information...'
  }
]

const Testimonial = () => {

  return (
    <div className='app__testimonial'>
      <h1 className="head-text title"><span>Customer Reviews</span></h1>
      <div className="list">
        {reviews.map(({ id, consumer, stars, title, description }) => (

          <article className="card">
            <AnimatePresence>
              <motion.div
                key={id}
                className="card--wrapper"
                initial={{ rotateY: 0 }}
                whileInView={{ rotateY: 180 }}
                transition={{
                  duration: 1,
                  delay: id * 0.2,
                  ease: 'easeIn'
                }}
                viewport={{ once: true }}
                // whileHover={{
                //   y: '-1em',
                //   boxShadow: "0 0.5em 0.5em -0.4em gray",
                //   transition: { duration: 0.1 },
                // }}
              >
                {/* <div className="front" /> */}

                <div className="back">
                  <div className="back--star">
                    {Array(stars).fill(1).map((el, i) => <Star />)}
                  </div>

                  <div className="back--title">
                    <h1>{title}</h1>
                  </div>

                  <div className="back--description">
                    <label>{description}</label>
                  </div>

                  <div className="back--name">
                    <label>{consumer.displayName}</label>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>


          </article>





          // <div>
          //   {Array(stars).fill(1).map((el, i) => <Star /> )}
          //   <p>{title}</p>
          //   <p>{description}</p>
          //   <p>{consumer.displayName}</p>
          // </div>
        ))}
      </div>

    </div>
  )
}

export default Testimonial