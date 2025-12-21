import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    // 1. Check if Logged In
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // 2. Check if Role is Allowed
    // If we require specific roles (e.g. ['ADMIN']) and user is not one of them...
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        // You can uncomment the alert if you want a popup warning
        // alert("ACCESS DENIED: You are not authorized.");
        return <Navigate to="/" replace />;
    }

    // 3. Allowed! Show the page.
    return <Outlet />;
};

export default ProtectedRoute;