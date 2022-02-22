import React, { useState } from 'react';
import ConfigRoutes from "../../config/routes"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { useUserContext } from '../../context/UserContext'
import NavbarGuest from '../../containers/NavbarGuest/NavbarGuest';
import NavbarUser from '../../containers/NavbarUser/NavbarUser';
import NavbarAdmin from '../../containers/NavbarAdmin/NavbarAdmin';
import FoodModal from '../../containers/Menu/FoodModal';

function PrivateRoutes() {
    // const { user } = useUserContext()
    // const role = user.role || 'guest'
    const role = 'admin'
    const allowedRoutes = ConfigRoutes[role].allowedRoutes
    const redirectRoutes = ConfigRoutes[role].redirectRoutes
    const location = useLocation()
    const backgroundLocation = location.state && location.state.backgroundLocation

    const [isHideSidebar, setIsHideSidebar] = useState(true)

    const NavbarFromRole = () => {
        if (role === 'user') {
            return (<NavbarUser />)
        } else if (role === 'admin') {
            return (<NavbarAdmin isHideSidebar={isHideSidebar} setIsHideSidebar={setIsHideSidebar} />)
        } else {
            return (<NavbarGuest />)
        }
    }
    return (
        <>
            <Routes location={backgroundLocation || location}>
                {allowedRoutes.map(route =>
                (<Route
                    path={route.url}
                    key={route.url}
                    element={<route.component isHideSidebar={isHideSidebar} />} />)
                )}
                <Route path="*" element={<Navigate replace to={redirectRoutes} />} />
            </Routes>
            {/* Show the modal when a `backgroundLocation` is set */}
            {backgroundLocation && (
                <Routes>
                    <Route path="/food/:id" element={<FoodModal/>}/>
                </Routes>
            )}
            {NavbarFromRole()}
        </>
    )
}

export default PrivateRoutes;
