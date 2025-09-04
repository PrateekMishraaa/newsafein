import { Group, LinkTwoTone, RemoveRedEyeTwoTone, TimerTwoTone, WorkspacePremiumTwoTone } from '@mui/icons-material';
import { Button } from '@mui/material';
import { apiJsonAuth } from 'api';
import { useGlobalContext } from 'global/context';
import useError from 'hooks/useError';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import StatusBadge from './StatusBadge';

const InstituteMeetings = ({ studentData }) => {
    const [otherMeetings, setOtherMeetings] = React.useState([]);
    const [scrollAds, setScrollAds] = useState(true)
    const params = useParams();
    const { userData, token } = useGlobalContext();
    const { ErrorResponder } = useError();
    const fetchAllMeetings = async () => {
        try {
            const response = await apiJsonAuth.post("/discussion/meetings", {
                instituteId: studentData?.instituteId,
                type: "all"
            }, {
                headers: {
                    Authorization: token
                }
            })
            const result = response?.data;
            console.log("Result All", result)
            if (result?.status == "SUCCESS") {
                setOtherMeetings(result?.result)
            }
        } catch (error) {
            ErrorResponder(error);
        }
    }
    useEffect(() => {
        fetchAllMeetings();
    }, [studentData])
    return (
        <div>
            {otherMeetings?.map((meeting, i) => {
                if (params?.meetingid !== meeting?.id)
                    if (meeting.track === studentData?.g20_track || studentData?.g20_track === "Leaders Track") {
                        return (
                            <div key={i} className='card border mb-3 shadow-sm p-3 rounded-4'>
                                <div>
                                </div>
                                <h5 className='lh-md'>{meeting?.track} {meeting?.meetingtype} Meeting <StatusBadge meeting={meeting} /></h5>
                                <h6 className='fw-light'>
                                    <small>
                                        <span className='fw-semibold'>Theme</span>
                                        &nbsp;{meeting?.theme}
                                    </small>
                                </h6>
                                <h6 className='fw-light'>
                                    <small>
                                        <span className='fw-semibold'><TimerTwoTone /></span>
                                        &nbsp;{moment(meeting?.createdAt).calendar()}
                                    </small>
                                </h6>
                                {
                                    studentData?.g20_track === meeting?.track || studentData?.g20_track === "Leaders Track" ?
                                        <>
                                            <Link to={"/dashboard/discussion/meeting/" + meeting?.id}>
                                                <Button variant='outlined' color='success' className='rounded-3 py-2'>
                                                    <Group />&nbsp; Join</Button>
                                            </Link>
                                            <hr />
                                            <div>
                                                <span className='rounded-4 border-dark text-dark py-1 px-2 border d-inline-block'>
                                                    <WorkspacePremiumTwoTone color='error' />  You are a member
                                                </span>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <Link to={"/dashboard/discussion/meeting/" + meeting?.id}>
                                                <Button variant='outlined' color='warning' className='rounded-3 py-2'>
                                                    <RemoveRedEyeTwoTone />&nbsp; View</Button>
                                            </Link>
                                        </>

                                }
                            </div>
                        )
                    }
            })}
            <div className='card p-3 mb-3 position-relative' onMouseOver={() => {
                setTimeout(() => {
                    setScrollAds(false)
                }, 5000);
            }}>
                <iframe src="https://www.safeinschool.in/" height={350} style={{ width: "100%" }} frameBorder="0">
                </iframe>
                <div className={`position-absolute h-100 w-100 bg-dark bg-opacity-25 ${scrollAds ? "d-none" : "fade show"}`} style={{ top: 0, left: 0 }}>
                    <div className={`h-100 w-100 d-flex align-items-center justify-content-center `}>
                        <Button href='https://www.safeinschool.in/' target={"_blank"} variant='contained' color='warning' className='rounded-3'>Visit&nbsp;<LinkTwoTone /></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstituteMeetings