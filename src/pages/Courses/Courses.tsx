// Details of the course, when clicked shows 3 images.

import './Courses.scss';
import './TrainingExpectation.scss';
import './Certificate.scss';
import './PotentialEarnings.scss';
import React from 'react'
import { ActivityIndicator, MyIFrame, Page } from '../../components';
import CourseCard from './CourseCard/CourseCard';
import { ABT, Landing0, Landing1, Training, TrainingCertificate_Watermark } from '../../util/images';
import { SectionedCard } from '../../components/Cards';

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




  const renderTrainingExpectation = () => (
    <Page id='training-expectation' className='app__flex app__training-expectation' header='What Can I Expect?'>
      <p>All training performed will be conducted by our certified Lash Technician Specialist who will</p>

      <div className="list">
        <SectionedCard
          className='expectation-card'
          leftChildren={(
            <div className=''>
              <h1>1:1 Training</h1>
              <label></label>
            </div>
          )}
          rightChildren={(
            <img src={Landing0} />
          )}
        />



        <SectionedCard
          // className='expectation-card'
          leftChildren={(
            <div className='app__flex'>
              <h1>Theory Sessions</h1>
              <label>Learn</label>
            </div>
          )}
          rightChildren={(
            <img src={Landing1} />
          )}
          reversed={true}
        />


        <SectionedCard
          // className='expectation-card'
          leftChildren={(
            <div className='app__flex'>
              <h1>Mannequin Sessions</h1>
              <label>Learn</label>
            </div>
          )}
          rightChildren={(
            <img src={Landing1} />
          )}
        />



        <SectionedCard
          // className='expectation-card'
          leftChildren={(
            <div className='app__flex'>
              <h1>Live Model Sessions</h1>
              <label>Learn</label>
            </div>
          )}
          rightChildren={(
            <img src={Landing1} />
          )}
          reversed={true}
        />
      </div>


    </Page >
  )

  const renderCertificate = () => (
    <Page id='certificate' className='app__flex app__certificate' header='What Happens Next?'>
      <p>At the end of every training, we present the newly qualified trainee with this certficate.</p>
      <div className="app__certificate--img">
        <img src={TrainingCertificate_Watermark} />
      </div>
    </Page>
  )

  const renderPotentialEarnings = () => (
    <Page id='potential-earnings' className='app__potential-earnings' header='How Much Could I Earn?'>
      <p>Insert Potential Earnings here!</p>

    </Page>
  )





  return (
    <>
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
            <>
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
            </>
        }
      </Page>

      {renderTrainingExpectation()}
      {renderCertificate()}
      {renderPotentialEarnings()}
    </>
  )
}

export default Courses