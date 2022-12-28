import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Footer, GetInTouch, Navbar, ShoppingBasketDrawer, SidebarMenu } from './components';
import { About, Contact, Courses, Gallery, Landing, MeetExperts, NotFound, Services, Testimonial, TrainingReview } from './pages/Main';
import Widgets from './components/Widgets/Widgets';
import { useCourses, useGalleryMedia, useServices, useTestimonial, useTrainingReviews } from './helpers/hooks';
import { scrollToTop } from './constants/funcs';
import { useAuthContext } from './providers/AuthContextProvider';
import { Authentication, Dashboard } from './pages/Auth';

const AppMain = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { testimonials, loadingTestimonial } = useTestimonial();
    const { reviews, loadingReviews } = useTrainingReviews();
    const { gallery, loadingGallery } = useGalleryMedia();
    const { courses, loadingCourses } = useCourses();
    const { services, loadingServices } = useServices();
    const { isAuthenticated } = useAuthContext();
    const [showAuthenication, setShowAuthenication] = useState<boolean>(false);



    useEffect(() => {
        scrollToTop();
    }, [location.pathname]);


    const renderRoute = (id: string, component: React.ReactNode) => {
        const isHome = (id === "/");
        const isNotFound = (id === "*");
        const isGetInTouch = (id === "/getintouch");
        const isContactPage = (id === "/contact");


        return (
            <>
                <Navbar onAccountOpen={() => {!isAuthenticated() ? setShowAuthenication(true) : navigate('/dashboard') } } />
                <SidebarMenu />
                <ShoppingBasketDrawer services={services} courses={courses} />
                {!isHome && !isNotFound ? <div className='padding-top' /> : null}
                {component}
                {/* {!isGetInTouch && !isContactPage ? <GetInTouch /> : null} */}
                <div className='footer-padding' />
                <Footer />

                <Widgets />
            </>
        );
    }


    const renderRoutes = () => (
        <Routes>
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
            <Route path="/gallery" element={renderRoute("/gallery", <Gallery media={gallery} loading={loadingGallery} />)} />
            <Route path="/services" element={renderRoute("/services", <Services services={services} loading={loadingServices} />)} />
            <Route path="/courses" element={renderRoute("/courses", <Courses courseList={courses} loading={loadingCourses} />)} />
            <Route path="/getintouch" element={renderRoute("/getintouch", <GetInTouch />)} />
            <Route path="/contact" element={renderRoute("/contact", <Contact />)} />

            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );

    return (
        <>
            {renderRoutes()}
            <Authentication isOpen={showAuthenication} onOpen={() => {}} onClose={() => setShowAuthenication(false)} />
        </>
    )
}

export default AppMain