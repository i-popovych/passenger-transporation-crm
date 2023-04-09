import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {AuthUserContext} from "../App";
import config from "../project-config.json"
import {adminRoutes, driverRoutes, passengerRoutes, publicRoutes} from "../utils/routes";
import PermissionDenied from "../pages/PermissionDenied";

const AppRoutes = () => {
    const {currentUser} = useContext(AuthUserContext)

    if (!currentUser) {
        return (
            <Routes>
                {
                    publicRoutes.map(i => {
                        return <Route key={i.path} path={i.path} element={i.element}/>
                    })
                }
                <Route path='/*' element={<PermissionDenied role={null}/>}/>
            </Routes>
        )
    }

    switch (currentUser.role) {
        case config.role.admin:
            return (
                <Routes>
                    {
                        adminRoutes.map(i => {
                            return <Route key={i.path} path={i.path} element={i.element}/>
                        })
                    }
                    <Route path='/login' element={<Navigate to={'/'}/>}/>
                    <Route path='/*' element={<PermissionDenied role={config.role.admin}/>}/>
                </Routes>
            )
        case config.role.passenger:
            return (
                <Routes>
                    {
                        passengerRoutes.map(i => {
                            return <Route key={i.path} path={i.path} element={i.element}/>
                        })
                    }
                    <Route path='/login' element={<Navigate to={'/'}/>}/>
                    <Route path='/*' element={<PermissionDenied role={config.role.passenger}/>}/>
                </Routes>
            )
        case config.role.driver:
            return (
                <Routes>
                    {
                        driverRoutes.map(i => {
                            return <Route key={i.path} path={i.path} element={i.element}/>
                        })
                    }
                    <Route path='/login' element={<Navigate to={'/'}/>}/>
                    <Route path='/*' element={<PermissionDenied role={config.role.driver}/>}/>
                </Routes>
            )
    }
};

export default AppRoutes;