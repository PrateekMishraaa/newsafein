import { Avatar, Rating } from '@mui/material'
import React from 'react'

const TestimonialCard = ({ review }) => {
    return (
        <div className="item col-md-6 col-xl-4">
            <div className="card border-0 rounded-4 shadow p-3 p-lg-4">
                <div className="card-body">
                    <Rating name="half-rating-read" value={review?.rating} precision={0.5} readOnly />
                    <div className="icon mb-0 mt-3">
                        <p className="fs-6">{review?.review}</p>
                        <div className="div-details d-flex align-items-center">
                            <Avatar src={review?.user.img} alt="photo" />
                            <div className="info ps-2">
                                <h5 className="mb-1 fs-6">{review?.user?.name}</h5>
                                <p className="mb-0 fs-6">{review?.user?.position}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /.card-body */}
            </div>
            {/* /.card */}
        </div>
    )
}

export default TestimonialCard