import './index.scss';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Footer, Navbar } from './components';
import { UpArrow } from './util/icons';
import { About, Courses, Gallery, Landing, NotFound, Services, Testimonial } from './pages';

function App() {
  

  const RenderRoute = (component: React.ReactNode) => (
    <>
      <Navbar />
      {component}
      <Footer />


      <div className="app__desktop-hide">
        <div className='border-button app__book-now-button'>Book Now</div>
      </div>



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
            <Testimonial />
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
