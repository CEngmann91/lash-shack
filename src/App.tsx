import './index.scss';
import React, { useLayoutEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { REACT_APP_FIRESTORE_COURSES_COLLECTION, REACT_APP_FIRESTORE_COURSES_DOCUMENT, REACT_APP_FIRESTORE_TRAINING_COLLECTION, REACT_APP_FIRESTORE_TRAINING_DOCUMENT, REACT_APP_STORAGE_GALLERY_DIRECTORY } from './constants/firebase';
import { getImage, getImages } from './helpers/firebase/firebase';
import { getDocument } from './helpers/firebase/firestore';
import { Footer, Navbar, SidebarMenu } from './components';
import { About, Courses, Gallery, Landing, MeetExperts, NotFound, Services, Testimonial, TrainingReview } from './pages';
import Widgets from './components/Widgets/Widgets';
import { iCourse } from './pages/Courses/Courses';
import { iService } from './pages/Services/Services';
import { iTrainingReview } from './pages/TrainingReview/TrainingReview';

function App() {
  const [reviews, setReviews] = useState<iTrainingReview[]>([]);
  const [gallery, setGallery] = useState<string[]>([]);
  const [courseList, setCourseList] = useState<iCourse[]>([]);
  const [serviceList, setServiceList] = useState<iService[]>([
    {
      active: true,
      id: 0,
      name: 'Eyelash Extensions Full Sets',
      options: [
        {
          name: "Classic Semi-Permanent",
          price: 45,
          duration: 60
        },
        {
          name: "YY Express",
          price: 45,
          duration: 60
        }
      ]
    },
    {
      active: true,
      id: 1,
      name: 'Eyelash Extensions Infills',
      options: [
      ]
    }
  ]);




  useLayoutEffect(() => {
    fetchReviews();
    fetchGalleryPhotos();
    fetchCourses();
  }, [])


  const fetchReviews = async() => {
    // setIsLoading(true);

    getDocument(REACT_APP_FIRESTORE_TRAINING_COLLECTION as string,
        REACT_APP_FIRESTORE_TRAINING_DOCUMENT as string)
        .then(res => {
            const array: iTrainingReview[] = res['content'];
            let sorted = array.sort((a, b) => a.id - b.id);
            setReviews(sorted);

            // setIsLoading(false);
        })
        .catch(error => {
            // setIsLoading(false);
            // setError(error);
            // return;
        });
  }

  const fetchGalleryPhotos = async() => {
    // setIsLoading(true)

    await getImages(REACT_APP_STORAGE_GALLERY_DIRECTORY as string)
      .then(imgResult => {
        setGallery(imgResult);
        // setIsLoading(false);
        console.log("getImages - ", imgResult);
      })
      .catch(error => {
        // setIsLoading(false);
        // setError(error);
        console.log(error);
      });
  }

  const fetchCourses = async() => {
    // setIsLoading(true);

    let array: iCourse[] = [];
    await getDocument(REACT_APP_FIRESTORE_COURSES_COLLECTION as string,
      REACT_APP_FIRESTORE_COURSES_DOCUMENT as string)
      .then(res => {
        const result: iCourse[] = res['content'];
        // Only get the active items in the array.
        const filtered = result.filter((item) => item.active);
        // Sort by ID.
        array = filtered.sort((a, b) => a.id - b.id);
      })
      .catch(error => {
        // setIsLoading(false);
        // setError(error);
        return;
      });


    // Load images from Firestore.
    const mapPromises = array.map((item) =>
      getImage(item.img).then(res => item.img = res)
    );
    await Promise.all(mapPromises);
    // const results = await Promise.all(mapPromises);
    // console.log("results - " + results)

    setCourseList(array);
    // setIsLoading(false);
  }

  



  const RenderRoute = (id: string, component: React.ReactNode) => (
    <div className='route-div'>
      <Navbar />
      <SidebarMenu />
      {id !== "/" && id !== "*" ? <div className='padding-top' /> : null }
      {component}
      {id === "/" && <div className='footer-padding' /> }
      <Footer />

      <Widgets />
    </div>
  );

  return (
    <Routes>
      {/* Use it in this way, and it should work: */}
      <Route path='*' element={
        RenderRoute("*",
          <NotFound />
        )
      } />

      <Route path="/" element={
        RenderRoute(
          "/",
          <>
            <Landing />
            <About />
            <MeetExperts />
            <Testimonial />
            <TrainingReview reviews={reviews} />
          </>
        )
      } />
      <Route path="/services" element={ RenderRoute("/services", <Services services={serviceList} />)} />
      <Route path="/courses" element={ RenderRoute("/courses", <Courses courseList={courseList} />)} />
      <Route path="/gallery" element={ RenderRoute("/gallery", <Gallery photoURLs={gallery}/>)} />
    </Routes>
  );
}

export default App;
