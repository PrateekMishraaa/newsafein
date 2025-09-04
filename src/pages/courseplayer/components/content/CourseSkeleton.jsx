import { CircularProgress, Skeleton } from '@mui/material';
import React from 'react'

const CourseSkeleton = () => {
    return (
        <div className='p-relative'>
            <Skeleton variant="rectangular" className='w-100' style={{ height: "550px" }} />
            <div className='p-absolute' style={{ top: "50%", left: "50%" }}>
                <CircularProgress color="inherit" />
            </div>
        </div>

    )
}

export default CourseSkeleton;