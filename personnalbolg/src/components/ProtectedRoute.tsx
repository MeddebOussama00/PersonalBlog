import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../Store';

export default function ProtectedRoute() {
    const { token } = useSelector((state: RootState) => state.user);

    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />
}

