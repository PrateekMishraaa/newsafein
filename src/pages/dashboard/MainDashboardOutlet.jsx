import React from 'react'
import { Outlet } from 'react-router-dom'

const MainDashboardOutlet = () => {
    return (
        <>
 <div className='min-vh-100'>
    <Outlet />
    </div>
    </>

    )
}

export default MainDashboardOutlet