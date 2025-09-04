import { TimerTwoTone } from '@mui/icons-material';
import { Button } from '@mui/material';
import { apiJsonAuth } from 'api';
import { useGlobalContext } from 'global/context';
import useError from 'hooks/useError';
import moment from 'moment';
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const RelatedMeetings = () => {
    const [otherMeetings, setOtherMeetings] = React.useState([]);
    const params = useParams();
    const { userData, token } = useGlobalContext();
    const { ErrorResponder } = useError();
    const fetchAllMeetings = async () => {
        try {
            const response = await apiJsonAuth.post("/discussion/meetings", {
                instituteId: userData?.id,
                type: "all"
            }, {
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
        fetchAllMeetings();
    }, [])
    const typeWiseColor = (type) => {
        switch (type) {
            case "resolution":
                return "bg-white";
            case "declaration":
                return "bg-primary"
        }
    }
    return (
        <div>
            {otherMeetings?.map((meeting, i) => {
                if (params?.meetingid !== meeting?.id)
                    return (
                        <div key={i} className={'card p-3 rounded mt-2 shadow-sm border-light ' + typeWiseColor(meeting?.meetingtype)}>
                            <h5>{meeting?.track} {meeting?.meetingtype} Meeting {meeting?.meeting_status === "started" ? <span className='bg-success rounded fs-6 fw-light p-1 px-2 text-white'>Live</span> : <span className='bg-danger rounded fs-6 fw-light p-1 px-2 text-white'>{meeting?.meeting_status}</span>}</h5>
                            <h6 className='fw-light'>
                                <small>
                                    <span className='fw-semibold'>Meeting ID</span>
                                    &nbsp;{meeting?.id}
                                </small>
                            </h6>
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
                            <Link to={"/dashboard/discussion/meeting/" + meeting?.id}>
                                <Button variant='outlined' size='small' color='success' className='rounded-3 text-capitalize'>Enter</Button>
                            </Link>
                        </div>
                    )
            })}
        </div>
    )
}

export default RelatedMeetings