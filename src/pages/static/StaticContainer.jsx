import React from 'react'
import { Outlet } from 'react-router-dom'

const StaticContainer = () => {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default StaticContainer