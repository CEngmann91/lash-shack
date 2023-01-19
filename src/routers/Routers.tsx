import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Basket, Checkout, Courses, Dashboard, ForgotPassword, Gallery, Landing, LatestNews, Login, NotFound, Privacy, ProductDetails, Register, Services, Shop, TermsConditions, Wishlist } from '../pages';
import { Dashboard_Account } from '../pages/Dashboard';

const Routers = () => {
    const location = useLocation();

    
    // Scroll to the top only when the route location changes.
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location.pathname]);


    return (
       <Routes>
            <Route path='*' element={<NotFound />} />

            {/* Ensures that we redirect the page back to home if this occurs. */}
            <Route path='/' element={<Navigate to='home' />} />
            
            <Route path='/home' element={<Landing />} />
            <Route path='/services' element={<Services />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/news' element={<LatestNews />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/shop/:id' element={<ProductDetails />} />
            
            <Route path='/basket' element={<Basket />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/wishlist' element={<Wishlist />} />
            
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot' element={<ForgotPassword />} />

            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/dashboard/account' element={<Dashboard_Account />} />

            <Route path='/privacy' element={<Privacy />} />
            <Route path='/terms' element={<TermsConditions />} />
       </Routes>
    )
}

export default Routers