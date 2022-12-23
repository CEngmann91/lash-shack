// Landing page with carousel
// Details of the course, when clicked shows 3 images.
// Add upcoming days/dates that are available for the selected course for the next 3 months.



import './index.scss';
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Footer, GetInTouch, Navbar, ShoppingBasketDrawer, SidebarMenu } from './components';
import { About, Contact, Courses, Gallery, Landing, MeetExperts, NotFound, Services, Testimonial, TrainingReview } from './pages/Main';
import Widgets from './components/Widgets/Widgets';
import { useCourses, useGalleryMedia, useServices, useTestimonial, useTrainingReviews } from './helpers/hooks';
import ShoppingBasketProvider from './providers/ShoppingBasketProvider';
import { scrollToTop } from './constants/funcs';
import { Dashboard } from './pages/Main/Account';
import { LoginModal } from './pages/Auth';

function App() {
  const location = useLocation();
  const { testimonials, loadingTestimonial } = useTestimonial();
  const { reviews, loadingReviews } = useTrainingReviews();
  const { gallery, loadingGallery } = useGalleryMedia();
  const { courses, loadingCourses } = useCourses();
  const { services, loadingServices } = useServices();




  useEffect(() => {
    scrollToTop();
  }, [location.pathname]);


  const renderRoute = (id: string, component: React.ReactNode) => {
    const isHome = (id === "/");
    const isNotFound = (id === "*");
    const isGetInTouch = (id === "/getintouch");
    const isContactPage = (id === "/contact");

    return (
      <div className='route-div'>
        <Navbar />
        <SidebarMenu />
        <ShoppingBasketDrawer services={services} courses={courses} />
        {!isHome && !isNotFound ? <div className='padding-top' /> : null}
        {component}
        {!isGetInTouch && !isContactPage ? <GetInTouch /> : null}
        <div className='footer-padding' />
        <Footer />

        <Widgets />
      </div>
    );
  }


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
      <Route path="/gallery" element={renderRoute("/gallery", <Gallery media={gallery} loading={loadingGallery} /> )} />
      <Route path="/services" element={renderRoute("/services", <Services services={services} loading={loadingServices} /> )} />
      <Route path="/courses" element={renderRoute("/courses", <Courses courseList={courses} loading={loadingCourses} /> )} />
      <Route path="/getintouch" element={renderRoute("/getintouch", <GetInTouch /> )} />
      <Route path="/contact" element={renderRoute("/contact", <Contact /> )} />

      {/* <Route path="/dashboard" element={renderRoute("/dashboard", <Dashboard /> )} /> */}
    </Routes>
  );

  return (
    <ShoppingBasketProvider>
      {renderRoutes()}
      {/* <LoginModal /> */}
    </ShoppingBasketProvider>
  )
}

export default App;
