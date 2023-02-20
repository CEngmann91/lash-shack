import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'

const AuthRoute = () => {
    const { authenticated } = useAuth();

    return authenticated ? <Outlet /> : <Navigate to={'/login'} />
}

export default AuthRoute