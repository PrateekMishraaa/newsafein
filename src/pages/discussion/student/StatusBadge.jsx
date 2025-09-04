import React from 'react'

const StatusBadge = ({meeting}) => {
    return (<>{meeting?.meeting_status === "started" ? <span className='bg-light-green-grad rounded fs-6 fw-light p-1 px-2 text-white'>Live</span> : <span className='bg-light-maroon-grad rounded fs-6 fw-light p-1 px-2 text-white'>{meeting?.meeting_status}</span>}</>
    )
}

export default StatusBadge