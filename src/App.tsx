import './index.scss';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Footer, MapView, Navbar } from './components';
import { UpArrow } from './util/icons';
import { About, Courses, Gallery, Landing, MeetExperts, NotFound, Services, Testimonial, TrainingReview } from './pages';

function App() {


  const RenderRoute = (component: React.ReactNode) => (
    <>
      <Navbar />
      {component}
      <Footer />


      {/* <div className="app__desktop-hide">
        <div className='border-button app__book-now-button'>Book Now</div>
      </div> */}



      {/* <button className='scroll-to-top' onClick={() => window.scrollTo(0, 0)}>
        <UpArrow />
      </button> */}
    </>
  );

  return (
    <Routes>
      {/* Use it in this way, and it should work: */}
      <Route path='*' element={<NotFound />} />

      <Route path="/" element={
        RenderRoute(
          <>
            <Landing />
            <About />
            <MeetExperts />
            <Testimonial />
            <TrainingReview />
            <MapView />

            {/* margin ($footer-height value in constants.scss minus 10px) used in
            order to display the footer once at the bottom seeing as it is behind
            everything else. */}
            <div style={{ height: '150px' }} />
          </>
        )
      } />
      <Route path="/services" element={RenderRoute(<Services />)} />
      <Route path="/courses" element={RenderRoute(<Courses />)} />
      <Route path="/gallery" element={RenderRoute(<Gallery />)} />
    </Routes>
  );
}

export default App;
