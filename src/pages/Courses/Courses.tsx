// Add potential earnings.
// Details of the course, when clicked shows 3 images.

import './Courses.scss';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Page } from '../../components';
import { CardFlip } from '../../components/Cards';
import CourseCard from './CourseCard/CourseCard';
import { getDocument } from '../../helpers/firebase/firestore';
import { ABT, photography } from '../../util/images';
import { REACT_APP_FIRESTORE_COURSES_COLLECTION, REACT_APP_FIRESTORE_COURSES_DOCUMENT } from '../../constants/firebase';
import { getImage } from '../../helpers/firebase/firebase';

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

const Courses = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [courseList, setCourseList] = useState<iCourse[]>([]);



  useEffect(() => {
    window.scrollTo(0, 0);


    fetchCourses();

  }, [])


  const fetchCourses = async () => {
    setIsLoading(true);


    let array: iCourse[] = [];
    await getDocument(REACT_APP_FIRESTORE_COURSES_COLLECTION as string,
      REACT_APP_FIRESTORE_COURSES_DOCUMENT as string)
      .then(res => {
        const result: iCourse[] = res['content'];
        // Only get the active items in the array.
        const filtered = result.filter((item) => item.active);
        // Sort by ID.
        array = filtered.sort((a, b) => a.id - b.id);
      });

    // Load images from Firestore.
    const mapPromises = array.map((item) =>
      getImage(item.img).then(res => item.img = res)
    );
    const results = await Promise.all(mapPromises);
    // console.log("results - " + results)

    setCourseList(array);
    setIsLoading(false);







    /*
    await getDocument(REACT_APP_FIRESTORE_COURSES_COLLECTION as string,
      REACT_APP_FIRESTORE_COURSES_DOCUMENT as string)
      .then(res => {
        const array: iCourse[] = res['content'];

        const unresolvedPromises = array.map(calc);
        const results = await Promise.all(unresolvedPromises);

        array.map((item) => {
          getImage(item.img)
          .then(res => 
            {
              // console.log("fetchCourses - " + res)
              item.img = res
            }
            );
        });
        // Only get the active items in the array.
        const filtered = array.filter((item) => item.active);
        // Sort by ID.
        const sorted = filtered.sort((a, b) => a.id - b.id);


        // sort by price
        // let sorted = array.sort((a, b) => b.price - a.price);
        // sort by popularity
        // let sorted = array.sort((a, b) => b.popularity - a.popularity);
        // sorted = [...sorted].sort((a, b) => b.salePrice - a.salePrice);
        setCourseList(sorted);
        // console.log(sorted);

        setIsLoading(false);
      })
      .catch((error) => {
        // alert(error);
        setError(error);
        setIsLoading(false);
      });
    */
  }



  // if (isLoading) {
  //   return (
  //     <Page id='courses' className='app__courses' header='Be Your Own Boss'>
  //       <div className='app__flex app__min-height'>
  //         <ActivityIndicator borderColour='rgba(239, 179, 183, 1)' borderSpinColour='rgba(16, 40, 121, 1)' />
  //       </div>
  //     </Page>
  //   );
  // }

  return (
    <Page id='courses' className='app__courses' header='Be Your Own Boss'>
      {isLoading
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
              {courseList.length != 0 && courseList.map((item, index) => {
                const { title, description, img, price, sale, duration, popularity } = item;

                return (
                  <CourseCard
                    key={title} id={index}
                    title={title}
                    frontImg={img}
                    description={description}
                    price={price}
                    sale={sale}
                    duration={duration}
                    popularity={popularity}
                  />
                )
              })}
            </div>

            <img className='abt' src={ABT} alt="" />
          </>
      }
    </Page >
  )
}

export default Courses