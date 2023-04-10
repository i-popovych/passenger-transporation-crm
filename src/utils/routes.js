import SignUp from "../pages/Authorization/SignUp";
import SignIn from "../pages/Authorization/SignIn";
import React from "react";
import Dashboard from "../pages/Dashboard";
import CreateTrip from "../pages/CreateTrip";
import Trips from "../pages/Trips";
import Home from "../pages/Home";
import PermissionDenied from "../pages/PermissionDenied";
import {NavLink} from "react-router-dom";

export const publicRoutes = [
    {path: '/registration', element: <SignUp/>},
    {path: '/login', element: <SignIn/>},
    {path: '/', element: <Home/>},
]

export const adminRoutes = [
    {path: '/dashboard', element: <Dashboard/>},
    {path: '/create-trip', element: <CreateTrip/>},
    {path: '/trips', element: <Trips/>},
    {path: '/', element: <Home/>},
]

export const driverRoutes = [
    {path: '/create-trip', element: <CreateTrip/>},
    {path: '/trips', element: <Trips/>},
    {path: '/', element: <Home/>},
]

export const passengerRoutes = [
    {path: '/trips', element: <Trips/>},
    {path: '/', element: <Home/>},
]