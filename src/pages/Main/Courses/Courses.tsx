import './Courses.scss';
import React, { ReactNode, useState } from 'react'
import { Page } from '../../../components';
import CourseCard from './CourseCard/CourseCard';
import { replaceAllNewLineChars } from '../../../constants/funcs';
import PotentialEarnings from './PotentialEarnings/PotentialEarnings';
import Certificate from './Certificate/Certificate';
import TrainingExpectation from './TrainingExpectation/TrainingExpectation';

export enum Popularity {
  Normal = 0,
  MostPopular = 1,
  GreatDeal = 2,
}
export interface iSale {
  active: boolean;
  price: number;
  startDate: string;
  // endDate: string;
}
export interface iSchedule {
  dates: string[];
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
  schedule: iSchedule;
}


interface CoursesProps {
  courseList: iCourse[];
  loading: boolean;
  error?: unknown;
}
const Courses: React.FC<CoursesProps> = ({ courseList, loading, error }: CoursesProps) => {

  

  const renderLoadingActivity = (): ReactNode => (
    <div className='app__item-loading' />
  )

  return (
    <>
      <Page id='courses' className='app__courses' header='Be Your Own Boss'>
        {loading
          ?
          (renderLoadingActivity())
          :
          error
            ?
            <div className='app__flex app__min-height'>
              {error.toString()}
            </div>
            :
            <>
              <div className="cards">
                {courseList.length !== 0 && courseList.map((item, index) => {
                  // Remove all newline (\n) chars from the description string.
                  item.description = replaceAllNewLineChars(item.description);

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

              <label className='app__pad-hor txt-cntr new-line'>
                {`Train directly with our Expert and Founder Emma and become an Expert Eyelash Technician in no time!\nAll Courses require a £50 deposit now, the remaining balance will be requested upon arrival.`}
              </label>
            </>
        }
      </Page>
      

      <TrainingExpectation /> 
      <Certificate />
      <PotentialEarnings />
    </>
  )
}

export default Courses