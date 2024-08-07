import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Basket, Checkout, Contact, Courses, Dashboard, FAQs, Gallery, Landing, LatestNews, NotFound, ProductDetails, Services, Shop, SlaveryStatement, TermsOfService, Wishlist } from '../pages';
// import { Dashboard_Account, Dashboard_Catalog, Dashboard_Messages, Dashboard_Orders, Dashboard_Schedule, Dashboard_Settings, Dashboard_Users } from '../0DELETE/Dashboard/Dashboard';
// import AuthRoute from './AuthRoute';
// import useGeolocateStore from '../hooks/useGeolocateStore';
// import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
// import Login from '../pages/Login/Login';
// import Register from '../pages/Register/Register';

const Routers = () => {
    // const { loading, error, closestStore } = useGeolocateStore();

    return (
        <Routes>
            <Route path='*' element={<NotFound />} />

            <Route index element={<Landing />} />
            {/* Ensures that we redirect the page back to home if this occurs. */}
            {/* <Route path='/' element={<Navigate to='home' />} /> */}
            {/* <Route path='/home' element={<Landing />} /> */}
            <Route path='/services' element={<Services />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/contact' element={<Contact />} />
            {/* <Route path='/news' element={<LatestNews />} /> */}
            {/* <Route path='/shop' element={<Shop />} /> */}
            <Route path='/product/:id' element={<ProductDetails />} />

            {/* <Route path='/checkout' element={<Checkout />} /> */}

            {/* <Route path='/basket' element={<Basket />} />
            <Route path='/wishlist' element={<Wishlist />} /> */}

            {/* <Route path='/*' element={<AuthRoute />}>
                <Route path='checkout' element={<Checkout />} />
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='dashboard/account' element={<Dashboard_Account />} />
                <Route path='dashboard/orders' element={<Dashboard_Orders />} />
                <Route path='dashboard/users' element={<Dashboard_Users />} />
                <Route path='dashboard/planner' element={<Dashboard_Schedule />} />
                <Route path='dashboard/messages' element={<Dashboard_Messages />} />
                <Route path='dashboard/catalog' element={<Dashboard_Catalog />} />
                <Route path='dashboard/settings' element={<Dashboard_Settings />} />
            </Route> */}

            {/* <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot' element={<ForgotPassword />} /> */}

            <Route path='/terms' element={<TermsOfService />} />
            {/* <Route path='/privacy' element={<Privacy />} /> */}
            {/* <Route path='/slavery' element={<SlaveryStatement />} /> */}
            {/* <Route path='/faqs' element={<FAQs />} /> */}
        </Routes>
    )
}

export default Routers