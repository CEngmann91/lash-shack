import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Footer, Navbar } from './components';
import { UpArrow } from './util/icons';
import { About, Courses, Gallery, Landing, NotFound, Services, Testimonial } from './pages';

function App() {

  const RenderRoute = (component : React.ReactNode) => (
    <>
      <Navbar />
      {component}
      <Footer />

      <button className='scroll-to-top' onClick={() => window.scrollTo(0, 0)}>
        <UpArrow />
      </button>
    </>
  );

  return (
    <div className="App">
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

    </div>
  );
}

export default App;
