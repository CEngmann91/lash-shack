// Details of the course, when clicked shows 3 images.

import './Courses.scss';
import './TrainingExpectation.scss';
import './Certificate.scss';
import './PotentialEarnings.scss';
import React from 'react'
import { ActivityIndicator, MyIFrame, Page } from '../../components';
import CourseCard from './CourseCard/CourseCard';
import { ABT, TrainingCertificate_Watermark, Training_1to1Training, Training_Mannequin, Training_Manuals, Training_Models } from '../../util/images';
import { SectionedCard } from '../../components/Cards';
import { formatCurrency, replaceAllNewLineChars } from '../../constants/funcs';

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

interface CoursesProps {
  courseList: iCourse[];
  loading: boolean;
  error?: any;
}
const Courses: React.FC<CoursesProps> = ({ courseList, loading, error }: CoursesProps) => {




  const renderTrainingExpectation = () => (
    <Page id='training-expectation' className='app__flex app__training-expectation' header='What Can I Expect?'>
      {/* <p>All training performed will be conducted by our certified Lash Technician Specialist who will</p> */}

      <div className="list">
        <SectionedCard
          className='expectation-card'
          leftChildren={(
            <div className='app__flex pad--left txt-cntr'>
              <h1>1:1 Training</h1>
              <label></label>
            </div>
          )}
          rightChildren={(
            <img src={Training_1to1Training} />
          )}
        />



        <SectionedCard
          // className='expectation-card'
          leftChildren={(
            <div className='app__flex pad--right txt-cntr'>
              <h1>Theory Sessions</h1>
              <label>Learn</label>
            </div>
          )}
          rightChildren={(
            <img src={Training_Manuals} />
          )}
          reversed={true}
        />


        <SectionedCard
          // className='expectation-card'
          leftChildren={(
            <div className='app__flex pad--left txt-cntr'>
              <h1>Mannequin Sessions</h1>
              <label>Learn</label>
            </div>
          )}
          rightChildren={(
            <img src={Training_Mannequin} />
          )}
        />



        <SectionedCard
          // className='expectation-card'
          leftChildren={(
            <div className='app__flex pad--right txt-cntr'>
              <h1>Live Model Sessions</h1>
              <label>Learn</label>
            </div>
          )}
          rightChildren={(
            <img src={Training_Models} />
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
        <img src={TrainingCertificate_Watermark} className='app__glassmorphism' />
      </div>

      <img className='abt' src={ABT} alt="" />
    </Page>
  )

  const renderPotentialEarnings = () => (
    <Page id='potential-earnings' className='app__potential-earnings' header='What Could I Earn?*'>
      {/* <p>Insert Potential Earnings here!</p> */}

      <div className="earnings-grid-container">
        <div className="Header">
          <h3>Potential Earnings: Russian Lashes</h3>
        </div>
        <div className="Clients">
          <header>Clients</header>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
        </div>
        <div className="Daily">
          <header>Daily</header>
          <p>{formatCurrency(120)}</p>
          <p>{formatCurrency(180)}</p>
          <p>{formatCurrency(240)}</p>
          <p>{formatCurrency(300)}</p>
        </div>
        <div className="Weekly">
          <header>Weekly</header>
          <p>{formatCurrency(600)}</p>
          <p>{formatCurrency(900)}</p>
          <p>{formatCurrency(1200)}</p>
          <p>{formatCurrency(1500)}</p>
        </div>
        <div className="Monthly">
          <header>Monthly</header>
          <p>{formatCurrency(2400)}</p>
          <p>{formatCurrency(3600)}</p>
          <p>{formatCurrency(4800)}</p>
          <p>{formatCurrency(6000)}</p>
        </div>
        <div className="Annually">
          <header>Annually</header>
          <p>{formatCurrency(31200)}</p>
          <p>{formatCurrency(46800)}</p>
          <p>{formatCurrency(62400)}</p>
          <p>{formatCurrency(78000)}</p>
        </div>
      </div>


      <p className='asterisk-data'>*Data collected based upon charging £60 per set, five days a week.</p>

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

              <label className='app__pad-hor txt-cntr new-line'>{`Train directly with our Expert and Founder Emma and become an Expert Eyelash Technician in no time!\nAll Courses require a £50 deposit now, the remaining balance will be requested upon arrival.`}
              </label>
              <p></p>
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