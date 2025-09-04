import { ExitToAppTwoTone, Leaderboard, MeetingRoomTwoTone, MoreVertTwoTone, PauseCircleFilledTwoTone, PlayCircleFilledTwoTone, RemoveCircleTwoTone } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { apiJsonAuth } from 'api';
import { useGlobalContext } from 'global/context';
import useError from 'hooks/useError';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import useChat from '../useChat';
import InstituteLeaderBoard from './ChatRoom/InstituteLeaderBoard';
import DeclarationPoints from './DeclarationPoints';
import MeetingPoints from './MeetingPoints';
import RelatedMeetings from './RelatedMeetings';
import StatusBadge from '../student/StatusBadge';

const MeetingRoom = () => {
    const [meetingData, setMeetingData] = useState({});
    const { userData, token } = useGlobalContext();
    const [startDeclarationMeeting] = useOutletContext();
    const { ErrorResponder } = useError();
    const navigate = useNavigate();
    const params = useParams();
    const { updateEventStatus, reloader } = useChat(params?.meetingid)
    // Fetch Meeting Data 
    const fetchMeetings = async () => {
        try {
            const response = await apiJsonAuth.post("/discussion/meetings", {
                instituteId: userData?.id,
                meetingId: params?.meetingid,
                type: "single"
            }, {
                headers: {
                    Authorization: token
                }
            })
            const result = response?.data;
            if (result?.status == "SUCCESS") {
                setMeetingData(result?.result)
            }
        } catch (error) {
            ErrorResponder(error);
        }
    }
    // Meeting Play And Pause 
    const MeetingPausePlayHandler = async () => {
        toast.loading("loading..");
        try {
            if (params?.meetingid && meetingData?.meeting_status) {
                const response = await apiJsonAuth.post("/discussion/update", {
                    meetingId: params?.meetingid,
                    instituteId: userData?.id,
                    status: meetingData?.meeting_status === "pause" ? "started" : "pause"
                }, {
                    headers: {
                        Authorization: token
                    }
                })
                console.log("response Status", response)
                if (response?.data?.status === "SUCCESS") {
                    toast.dismiss()
                    toast.success(response?.data?.message);
                    fetchMeetings();
                    updateEventStatus(meetingData?.meeting_status === "pause" ? "started" : "pause");
                } else {
                    toast.dismiss();
                    toast(response?.data?.message);
                }
            } else {
                toast.dismiss()
            }
        } catch (error) {
            ErrorResponder();
        }

    }
    // Meeting End Handler 
    const MeetingEndHandler = async () => {
        toast.loading("loading..");
        try {
            if (params?.meetingid && meetingData?.meeting_status) {
                const response = await apiJsonAuth.post("/discussion/update", {
                    meetingId: params?.meetingid,
                    instituteId: userData?.id,
                    status: "end"
                }, {
                    headers: {
                        Authorization: token
                    }
                })
                console.log("response Status", response)
                if (response?.data?.status === "SUCCESS") {
                    toast.dismiss()
                    toast.success(response?.data?.message);
                    fetchMeetings();
                    updateEventStatus("ended");
                } else {
                    toast.dismiss()
                    toast(response?.data?.message);
                }
            } else {
                toast.dismiss()
            }
        } catch (error) {
            ErrorResponder();
        }

    }
    // Url Based Componnet 
    const urlBasedRoute = () => {
        switch (params?.page) {
            case "meeting":
                if (meetingData?.meetingtype == "declaration") {
                    return <DeclarationPoints reloader={reloader} />;
                } else if (meetingData?.meetingtype == "resolution") {
                    return <MeetingPoints reloader={reloader} />;
                }
                break;
            case "leaderboard":
                if (meetingData?.meetingtype == "declaration") {
                    return <InstituteLeaderBoard limit={10} />;
                } else if (meetingData?.meetingtype == "resolution") {
                    return <InstituteLeaderBoard limit={30} />;
                }
                break;
            default:
                return <MeetingPoints />;
        }
    }
    // Use Effect For Syncing 
    useEffect(() => {
        fetchMeetings();
    }, [params, reloader]);
    return (
        <div >
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-8">
                        {/* Header  */}
                        <div className='border bg-light-white2-grad border-light shadow-sm rounded-0 p-3'>
                            <div className="row g-2">
                                <div className="col-12 col-lg-8">
                                    <h3 className='fs-3 border-start border-4 border-warning ps-2'>{meetingData?.track}  {meetingData?.meetingtype} Meeting
                                        &nbsp;<StatusBadge meeting={meetingData} />
                                    </h3>
                                    <p className='fs-6'>
                                        <span className="text-dark fw-bold">Theme:</span> {meetingData?.theme}</p>
                                    {meetingData?.meeting_status === "end" && meetingData?.meetingtype === "resolution" && <Button
                                        onClick={() => startDeclarationMeeting(meetingData?.instituteId, meetingData?.id, meetingData?.track, meetingData?.theme)} variant='contained' className='rounded-3 text-capitalize' size='large'>Start Declaration Meeting</Button>}
                                </div>
                                <div className="col-12 col-lg-4 text-end">
                                    <div className="d-flex alig-items-center justify-content-end">
                                        <div className="dropdown" style={{ minWidth: 250 }}>
                                            <IconButton sx={{ background: "whitesmoke" }} type="button" data-bs-toggle="dropdown">
                                                <MoreVertTwoTone />
                                            </IconButton>
                                            <ul className="dropdown-menu border-0 shadow p-3 rounded-3 " style={{ right: "0px !important" }}>
                                                <div className="row row-cols-2 g-2">
                                                    <div className="col-12">
                                                        <small>Meeting Id</small> <br />
                                                        <small>{meetingData?.id}</small>
                                                    </div>
                                                    <div className="col">
                                                        {
                                                            params?.page !== "meeting" &&
                                                            <Button onClick={() =>
                                                                navigate("/dashboard/discussion/meeting/" + meetingData?.id)} variant='outlined' color='success' size='small' fullWidth className='rounded text-capitalize h-100'>
                                                                <div>
                                                                    <MeetingRoomTwoTone /> <br /> Meeting
                                                                </div>
                                                            </Button>

                                                        }
                                                        {
                                                            params?.page === "meeting" &&
                                                            <Button onClick={() => navigate("/dashboard/discussion/leaderboard/" + meetingData?.id)} variant='outlined' color='warning' size='small' fullWidth className='rounded text-capitalize h-100'>
                                                                <div>
                                                                    <Leaderboard /> <br /> Leaderboard
                                                                </div>
                                                            </Button>
                                                        }
                                                    </div>
                                                    {meetingData?.meeting_status !== "end" &&
                                                        <div className='col'>
                                                            <Button onClick={MeetingPausePlayHandler} variant='outlined' fullWidth color='success' size='small' className='rounded text-capitalize h-100 '>
                                                                <div>{
                                                                    meetingData?.meeting_status !== "pause" ?
                                                                        <>
                                                                            <PauseCircleFilledTwoTone /> <br /> Pause Meeting
                                                                        </>
                                                                        : <>
                                                                            <PlayCircleFilledTwoTone /> <br /> Play Meeting
                                                                        </>
                                                                }
                                                                </div>
                                                            </Button>
                                                        </div>
                                                    }
                                                    {
                                                        meetingData?.meeting_status !== "end" &&
                                                        <div className='col'>
                                                            <Button variant='outlined' onClick={MeetingEndHandler} fullWidth color='error' size='small' className='rounded text-capitalize h-100'>
                                                                <div>
                                                                    <RemoveCircleTwoTone /> <br /> End Meeting
                                                                </div>
                                                            </Button>
                                                        </div>
                                                    }
                                                </div>
                                            </ul>
                                        </div>
                                        <Button onClick={() => navigate("/dashboard/discussion")} variant='outlined' color='error' size='small' className='rounded text-capitalize ms-2 d-flex'>
                                            <ExitToAppTwoTone />&nbsp;Exit
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='points-container'>
                            {urlBasedRoute()}
                        </div>
                    </div>
                    {/* Related Meetings  */}
                    <div className="col-12 col-lg-4">
                        <RelatedMeetings />
                    </div>
                </div>
            </div >
        </div >
    )
}

export default MeetingRoom