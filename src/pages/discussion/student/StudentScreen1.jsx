import { Group, RemoveRedEye, WorkspacePremiumTwoTone } from '@mui/icons-material';
import { Button } from '@mui/material';
import { apiJsonAuth } from 'api';
import { useGlobalContext } from 'global/context';
import useError from 'hooks/useError';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom';
import fallback1 from "../fallback/fallbackscreen1.svg"
import StatusBadge from './StatusBadge';

const StudentScreen1 = () => {
    const [otherMeetings, setOtherMeetings] = useState([]);
    const [studentData, fetchDetails] = useOutletContext();
    const { ErrorResponder } = useError()
    const { token, userData } = useGlobalContext();
    const fetchAllMeetings = async () => {
        try {
            let requestPayload;
            if (studentData?.g20_track === "Leaders Track") {
                requestPayload = {
                    instituteId: userData?.instituteId,
                    type: "all",
                }
            } else {
                requestPayload = {
                    instituteId: userData?.instituteId,
                    type: "all",
                    track: studentData?.g20_track ? studentData?.g20_track : "NULL",
                }
            }
            const response = await apiJsonAuth.post("/discussion/meetings", requestPayload, {
                headers: {
                    Authorization: token
                }
            })
            const result = response?.data;
            if (result?.status == "SUCCESS") {
                setOtherMeetings(result?.result)
            }
        } catch (error) {
            ErrorResponder(error);
        }
    }
    useEffect(() => {
        if (Object.keys(studentData)?.length == 0) {
            fetchDetails();
        }
        fetchAllMeetings();
    }, [studentData])
    return (
        <>
            {!otherMeetings?.length ?
                (// No Previous Meetings 
                    <div className="border border-2 py-5 rounded-4 text-center bg-white">
                        <img src={fallback1} alt="FallBack Screen" style={{ maxHeight: "400px", width: "100%", objectFit: "contain" }} />
                        <h4 className="text-center">Discuss as a G20 Delegate </h4>
                        <h3 className="text-center">
                            <span className="fs-6">with </span>
                            <span className="text-primary"> Yuvamanthan</span>
                        </h3>
                    </div>)
                :
                (
                    // Previous Meetings 
                    <div>
                        <h4 className='mb-4'>Dicussions <span className="p-2 bg-light-green-grad text-white rounded px-3">Live</span></h4>
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                            {otherMeetings?.map((meeting, i) => {
                                return (
                                    <div className="col" key={i} >
                                        <div className='card p-3 rounded-4 h-100 shadow-sm'>
                                            <span className='fs-5 fw-bold text-dark ps-2 border-start border-warning border-4 text-capitalize'>
                                                {meeting?.track} {meeting?.meetingtype} Meeting
                                                &nbsp;<StatusBadge meeting={meeting} />
                                            </span>
                                            <br />
                                            <table className="table table-borderless table-sm">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <span className='text-dark'>Theme</span>
                                                        </td>
                                                        <td>
                                                            <span className='text-dark'>{meeting?.theme} </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <span className='text-dark'>Started</span>
                                                        </td>
                                                        <td>
                                                            <span className='text-dark'>{moment(meeting?.createdAt).calendar()} </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            {
                                                studentData?.g20_track === meeting?.track || studentData?.g20_track == "Leaders Track" ?
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
                                                                <RemoveRedEye />&nbsp; View</Button>
                                                        </Link>
                                                    </>

                                            }

                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default StudentScreen1