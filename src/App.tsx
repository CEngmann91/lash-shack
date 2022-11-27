import './index.scss';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Footer, Navbar } from './components';
import { ShoppingCartWidget, ScrollTopArrow } from './components/Widgets';
import { About, Courses, Gallery, Landing, MeetExperts, NotFound, Services, Testimonial, TrainingReview } from './pages';

function App() {


  const RenderRoute = (id: string, component: React.ReactNode) => (
    <>
      <Navbar />
      {component}
      {id === "/" && <div className='footer-padding' /> }
      <Footer />

      {/* <ShoppingCartWidget /> */}
      <ScrollTopArrow />
    </>
  );

  return (
    <Routes>
      {/* Use it in this way, and it should work: */}
      <Route path='*' element={<NotFound />} />

      <Route path="/" element={
        RenderRoute(
          "/",
          <>
            <Landing />
            <About />
            <MeetExperts />
            <Testimonial />
            <TrainingReview />
          </>
        )
      } />
      <Route path="/services" element={ RenderRoute("/services", <Services />)} />
      <Route path="/courses" element={ RenderRoute("/courses", <Courses />)} />
      <Route path="/gallery" element={ RenderRoute("/gallery", <Gallery />)} />
    </Routes>
  );
}

export default App;
