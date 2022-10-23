import './Courses.scss';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Page } from '../../components';
import { CardFlip } from '../../components/Cards';
import CourseCard from './CourseCard/CourseCard';
import { getDocument } from '../../helpers/firebase/firestore';
import { aurora, photography } from '../../util/images';

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
  id: number;
  title: string;
  description: string;
  price: number;
  sale: iSale;
  popularity: Popularity.Normal;
}

const Courses = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseList, setCourseList] = useState<iCourse[]>([]);



  useEffect(() => {
    window.scrollTo(0, 0);


    getDocument("courses", "7I2dfy5anxP6v75USrIc")
      .then(res => {
        const array: iCourse[] = res['content'];
        // sort by price
        // let sorted = array.sort((a, b) => b.price - a.price);
        let sorted = array.sort((a, b) => b.popularity - a.popularity);
        // sorted = [...sorted].sort((a, b) => b.salePrice - a.salePrice);
        setCourseList(sorted);

        setLoading(false);
      })
      .catch((error) => {
        alert(error);
        setError(error);
      });

  }, [])


  return (
    <Page id='courses' className='app__courses' header='Be Your Own Boss'>
      {loading ?
        <div className='app__flex app__min-height'>
          <ActivityIndicator borderColour='rgba(239, 179, 183, 1)' borderSpinColour='rgba(16, 40, 121, 1)' />
        </div>
        :
        <>
          <h3>Fully Accredited</h3>

          {/* <p>Classic, Classic Xtra, Hybrid, Russian.</p>
          <p>Live Models</p>
          <p>In-depth Manuals</p>
          <p>Ongoing Support</p>
          <p>Fully Accredited</p>
          <p>Over 100 Students Qualified.</p> */}

          <br />
          <p>
            We offer a range of different courses to help advance your capabilities. We pride ourselves on building relationships and inspiring people to achieve their best.
            All courses come with in-depth manuals, live models
          </p>

          <div className="cards">
            {courseList.length != 0 && courseList.map((item, index) => {
              const { title, description, price, sale, popularity } = item;

              return (
                <CourseCard
                  key={title} id={index}
                  title={title}
                  frontImg={
                    // 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=955&q=80'
                    photography
                  }
                  description={description}
                  price={price}
                  sale={sale}
                  popularity={popularity}
                />
              )
            })}
          </div>
        </>
      }
    </Page>
  )
}

export default Courses