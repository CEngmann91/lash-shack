import './index.scss';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Footer, Navbar, SidebarMenu } from './components';
import { About, Contact, Courses, Gallery, Landing, MeetExperts, NotFound, Services, Testimonial, TrainingReview } from './pages';
import Widgets from './components/Widgets/Widgets';
import { useTrainingReviews } from './helpers/hooks/useTrainingReviews';
import { useGalleryPhotos } from './helpers/hooks/useGalleryPhotos';
import { useCourses } from './helpers/hooks/useCourses';
import { useServices } from './helpers/hooks/useServices';
import { useTestimonial } from './helpers/hooks/useTestimonial';

function App() {
  const location = useLocation();
  const { testimonials } = useTestimonial();
  const { reviews } = useTrainingReviews();
  const { gallery } = useGalleryPhotos();
  const { courses } = useCourses();
  const { services } = useServices();




  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);


  const RenderRoute = (id: string, component: React.ReactNode) => (
    <div className='route-div'>
      <Navbar />
      <SidebarMenu />
      {id !== "/" && id !== "*" ? <div className='padding-top' /> : null}
      {component}
      {id !== "/contact" && <Contact />}
      <div className='footer-padding' />
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
            <Testimonial testimonials={testimonials} />
            <TrainingReview reviews={reviews} />
          </>
        )
      } />
      <Route path="/gallery"  element={ RenderRoute("/gallery", <Gallery photoURLs={gallery} />)} />
      <Route path="/services" element={ RenderRoute("/services", <Services services={services} />)} />
      <Route path="/courses"  element={ RenderRoute("/courses", <Courses courseList={courses} />)} />
      <Route path="/contact"  element={ RenderRoute("/contact",<Contact />) } />
    </Routes>
  );
}

export default App;
