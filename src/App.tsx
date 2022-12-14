import './index.scss';
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Footer, Navbar, ShoppingBasketDrawer, SidebarMenu } from './components';
import { About, Contact, Courses, Gallery, Landing, MeetExperts, NotFound, Services, Testimonial, TrainingReview } from './pages';
import Widgets from './components/Widgets/Widgets';
import { useCourses, useGalleryPhotos, useServices, useTestimonial, useTrainingReviews } from './helpers/hooks';
import ShoppingBasketProvider from './providers/ShoppingBasketProvider';
import { scrollToTop } from './constants/funcs';

function App() {
  const location = useLocation();
  const { testimonials, loadingTestimonial } = useTestimonial();
  const { reviews, loadingReviews } = useTrainingReviews();
  const { gallery, loadingGallery } = useGalleryPhotos();
  const { courses, loadingCourses } = useCourses();
  const { services, loadingServices } = useServices();




  useEffect(() => {
    scrollToTop();
  }, [location.pathname]);


  const renderRoute = (id: string, component: React.ReactNode) => (
    <div className='route-div'>
      <Navbar />
      <SidebarMenu />
      <ShoppingBasketDrawer services={services} courses={courses} />
      {id !== "/" && id !== "*" ? <div className='padding-top' /> : null}
      {component}
      {id !== "/contact" && <Contact />}
      <div className='footer-padding' />
      <Footer />

      <Widgets />
    </div>
  );

  const renderRoutes = () => (
    <Routes>
      {/* Use it in this way, and it should work: */}
      <Route path='*' element={renderRoute("*", <NotFound />)} />

      <Route path="/" element={
        renderRoute(
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
      <Route path="/gallery" element={renderRoute("/gallery", <Gallery photoURLs={gallery} loading={loadingGallery} />)} />
      <Route path="/services" element={renderRoute("/services", <Services services={services} loading={loadingServices} />)} />

      <Route path="/courses" element={
        renderRoute("/courses",
          <Courses courseList={courses} loading={loadingCourses} />
        )
      } />
      <Route path="/contact" element={renderRoute("/contact", <Contact />)} />
    </Routes>
  );

  return (
    <ShoppingBasketProvider>
      {renderRoutes()}
    </ShoppingBasketProvider>
  )
}

export default App;
