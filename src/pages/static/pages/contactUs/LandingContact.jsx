import React from 'react'
import { Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
const LandingContact = () => {
    // const navigate = useNavigate();
    return (
        <div className="container-fluid py-5">
            <div className="container h-100">
                <div className="row h-100 g-3">
                    <div className="col-12 col-lg-7 text-center text-sm-start order-2 order-lg-1">
                        <div className="d-flex align-items-center h-100">
                            <div>
                                <div className=" display-1 fs-56 mb-4 ls-xs pe-xl-5 pe-xxl-0"> <h3>Connect with us to collaborate, create relationships and more.</h3>
                                </div>
                                <div className=" lead fs-23 lh-sm mb-7 pe-lg-5 pe-xl-5 pe-xxl-0">
                                    <p>Yuvamanthan aims to create awareness, soft skills and participation amongst the youth on
                                        the principles of self-awareness, inclusivity, role sharing and innovation. Therefore,
                                        advancing their role in a fast changing world by promoting sustainability and inclusive
                                        growth.
                                        <br /><br />
                                        Join us in our initiatives and help us achieve our goals of creating a powerful youth
                                        ecosystem in India.
                                    </p>
                                </div>
                                <Button
                                    variant="contained"
                                    sx={{ p: 2 }}
                                    color="warning"
                                    href='#contact'
                                    className="py-2 text-initial fs-6 rounded px-4"
                                >
                                    Contact Now
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="col order-1 order-lg-2">
                        <img src="https://glcloud.in/images/static/events/hansraj/img17.webp" alt="" className="d-block w-100"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingContact