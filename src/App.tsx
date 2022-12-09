import './index.scss';
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Footer, Navbar, ShoppingCartDrawer, SidebarMenu } from './components';
import { About, Contact, Courses, Gallery, Landing, MeetExperts, NotFound, Services, Testimonial, TrainingReview } from './pages';
import Widgets from './components/Widgets/Widgets';
import { useCourses, useGalleryPhotos, useServices, useTestimonial, useTrainingReviews } from './helpers/hooks';

function App() {
  const location = useLocation();
  const { testimonials, loadingTestimonial } = useTestimonial();
  const { reviews, loadingReviews } = useTrainingReviews();
  const { gallery, loadingGallery } = useGalleryPhotos();
  const { courses, loadingCourses } = useCourses();
  const { services, loadingServices } = useServices();




  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);


  const RenderRoute = (id: string, component: React.ReactNode) => (
    <div className='route-div'>
      <Navbar />
      <SidebarMenu />
      <ShoppingCartDrawer
        onOpen={() => {
          // alert('opened')
        }}
        onClose={() => {
          // alert('closed')
        }}
      />
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
      <Route path='*' element={RenderRoute("*", <NotFound />)} />

      <Route path="/" element={
        RenderRoute(
          "/",
          <>
            <Landing />
            <About />
            <MeetExperts />
            <Testimonial testimonials={testimonials} loading={loadingTestimonial} />
            <TrainingReview reviews={reviews} loading={loadingReviews} />
          </>
        )
      } />
      <Route path="/gallery" element={RenderRoute("/gallery", <Gallery photoURLs={gallery} loading={loadingGallery} />)} />
      <Route path="/services" element={RenderRoute("/services", <Services services={services} loading={loadingServices} />)} />
      <Route path="/courses" element={RenderRoute("/courses", <Courses courseList={courses} loading={loadingCourses} />)} />
      <Route path="/contact" element={RenderRoute("/contact", <Contact />)} />
    </Routes>
  );
}

export default App;
