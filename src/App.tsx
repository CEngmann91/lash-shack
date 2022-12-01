import './index.scss';
import React, { useLayoutEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Footer, Navbar, SidebarMenu } from './components';
import { About, Courses, Gallery, Landing, MeetExperts, NotFound, Services, Testimonial, TrainingReview } from './pages';
import Widgets from './components/Widgets/Widgets';
import { iService } from './pages/Services/Services';
import { useTrainingReviews } from './helpers/hooks/useTrainingReviews';
import { useGalleryPhotos } from './helpers/hooks/useGalleryPhotos';
import { useCourses } from './helpers/hooks/useCourses';
import { useServices } from './helpers/hooks/useServices';

function App() {
  const { reviews } = useTrainingReviews();
  const { gallery } = useGalleryPhotos();
  const { courses } = useCourses();
  const { services } = useServices();


  



  



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
      <Route path="/services" element={ RenderRoute("/services", <Services services={services} />)} />
      <Route path="/courses" element={ RenderRoute("/courses", <Courses courseList={courses} />)} />
      <Route path="/gallery" element={ RenderRoute("/gallery", <Gallery photoURLs={gallery}/>)} />
    </Routes>
  );
}

export default App;
