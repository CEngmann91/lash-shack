// Add potential earnings.
// Details of the course, when clicked shows 3 images.

import './Courses.scss';
import React from 'react'
import { ActivityIndicator, Page } from '../../components';
import CourseCard from './CourseCard/CourseCard';
import { ABT } from '../../util/images';

export enum Popularity {
  Normal = 0,
  MostPopular = 1,
  GreatDeal = 2,
}
export interface iSale {
  price: number;
  startDate: string;
  endDate: string;
}
export interface iCourse {
  active: boolean;
  id: number;
  img: string;
  title: string;
  description: string;
  price: number;
  sale: iSale;
  duration: string;
  popularity: Popularity.Normal;
}

interface iProps {
  courseList: iCourse[];
  loading: boolean;
  error?: any;
}
const Courses: React.FC<iProps> = ({ courseList, loading, error, ...props }: iProps) => {



  return (
    <Page id='courses' className='app__courses' header='Be Your Own Boss'>
      {loading
        ?
        <div className='app__flex app__min-height'>
          <ActivityIndicator borderColour='rgba(239, 179, 183, 1)' borderSpinColour='rgba(16, 40, 121, 1)' />
        </div>
        :
        error
          ?
          <div className='app__flex app__min-height'>
            {error}
          </div>
          :
          <main>
            <div className="cards">
              {courseList.length !== 0 && courseList.map((item, index) => {
                const { title, description, img, price, sale, duration, popularity } = item;

                return (
                  <CourseCard
                    key={title} id={index}
                    title={title}
                    imgSrc={img}
                    description={description}
                    price={price}
                    sale={sale}
                    duration={duration}
                    popularity={popularity}
                  />
                )
              })}
            </div>

            <p>Train directly with our Expert and Founder Emma and become an Expert Eyelash Technician in no time!</p>
            <p></p>

            <img className='abt' src={ABT} alt="" />
          </main>
      }
    </Page >
  )
}

export default Courses