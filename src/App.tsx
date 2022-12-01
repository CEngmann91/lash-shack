import './index.scss';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Footer, Navbar, SidebarMenu } from './components';
import { About, Courses, Gallery, Landing, MeetExperts, NotFound, Services, Testimonial, TrainingReview } from './pages';
import Widgets from './components/Widgets/Widgets';

function App() {



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
