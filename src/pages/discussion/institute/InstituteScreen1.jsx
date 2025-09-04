import { Button, ButtonBase, IconButton, Tooltip } from '@mui/material'
import { apiJsonAuth } from 'api'
import { useGlobalContext } from 'global/context'
import { pop2 } from 'utils/Popup'
import CreatePDF from 'utils/communique/CreatePDF'
import useError from 'hooks/useError'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import fallback1 from "../fallback/fallbackscreen1.svg"
import StatusBadge from '../student/StatusBadge'
import Swal from 'sweetalert2'
import { Delete } from '@mui/icons-material'
const InstituteScreen1 = () => {
  const [showTracks, setShowTracks] = useState(false);
  const [otherMeetings, setOtherMeetings] = useState([]);
  const [startDeclarationMeeting] = useOutletContext()
  const { token, userData } = useGlobalContext();
  const { ErrorResponder } = useError();
  const navigate = useNavigate();
  const [data, setData] = useState(null)
  const [plannedData, setPlannedData] = useState({});
  async function fetchData() {
    if (token) {
      try {
        const responce = await apiJsonAuth.get("institute/event", {
          headers: {
            Authorization: token,
          },
        });
        if (responce?.data?.result[0]) {
          const finResult = responce?.data?.result[0];
          setPlannedData(finResult);
        }
      } catch (err) {
        ErrorResponder(err);
      }
    }
  }
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
  const isAssignedChecker = async () => {
    try {
      const response = await apiJsonAuth.post("/discussion/assigncheck", {
        instituteId: userData?.id
      }, {
        headers: {
          Authorization: token
        }
      });
      if (response?.data?.status === "SUCCESS") {
        if (response?.data?.result == true) {
          fetchData();
          setShowTracks(response?.data?.result);
        } else {
          Swal.fire({
            title: "Warning",
            html: "Discussion Board should be activated on the day of the summit only. 'Plan Your YMG20' and 'Auto Assign' roles to students before activating.",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/8213/8213126.png",
            imageHeight: 100,
            width: 400,
            confirmButtonText: "Go to Plan Your YMG20",
            showCancelButton: false,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/dashboard/planevent")
            } else if (result.isDenied) {
              Swal.dismiss();
            }
          })
        }
      }
    } catch (error) {
      pop2.error({ description: "Error while checking assign" })
    }
  }
  //Meetings Creaters
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const meetingHandler = async () => {
    if (selectedTrack && selectedTheme) {
      toast.loading("Creating a Meeting for your Discussion")
      const response = await apiJsonAuth.post("/discussion/start", {
        instituteId: userData?.id,
        roomId: selectedTrack,
        track: selectedTrack,
        theme: selectedTheme
      });
      console.log(response);
      toast.dismiss()
      const MeetingId = response?.data?.result?.id;
      if (response?.data?.status === "SUCCESS") {
        toast.success("Meeting Created Successfully");
        navigate("/dashboard/discussion/meeting/" + MeetingId);
      } else if (response?.data?.status === "CONFLICT") {
        navigate("/dashboard/discussion/meeting/" + MeetingId);
        toast("Meeting For this Track Already Existed");
      } else {
        toast(response?.data?.message);
      }
    } else {
      alert("Please Select a Track");
    }
  }
  const fetchCommunique = async () => {
    try {
      const response = await apiJsonAuth.post("/discussion/communique", {
        instituteId: userData?.id,
      }, {
        headers: {
          Authorization: token
        }
      })
      const data = response?.data;
      if (data?.status === "SUCCESS") {
        setData(data?.result);
        pop2.success({ title: "Communique Document Created", description: "Communique Document is available for download" })
      } else if (data?.status === "WARNING") {
        pop2.warning({ title: "Not Available", description: data?.message })
      }
    } catch (error) {
      ErrorResponder(error);
    }
  }
  const CommuniqueAvailChecker = () => {
    fetchCommunique()
  }
  return (
    <div className='py-4'>
      {/* Communique Document  */}
      {data &&
        <div className="container-fluid mb-5">
          <div className="row row-cols-1 row-cols-lg-2 g-3 pb-4">
            <div className="col">
              <div className='d-flex flex-column h-100 align-items-center justify-content-center'>
                <img src="http://glcloud.in/uploads/safeinschool/64b3b3c2d9d8b.jpg" alt="" style={{ width: "100%", height: 350, objectFit: "contain" }} />
                <h3 className='text-center'>
                  Your Communique Document
                </h3>
                <h4>with <span className="text-primary">Yuvamanthan</span></h4>
              </div>
            </div>
            <div className="col">
              <div className="p-3 bg-white border rounded shadow">
                <CreatePDF data={data} />
              </div>
            </div>
          </div>
        </div>
      }
      {/* Meetings  */}
      {!showTracks ?
        (<div className='container'>
          <>
            {!otherMeetings?.length ?
              (// No Previous Meetings 
                <div className="py-5 text-center bg-white">
                  <img src={fallback1} alt="FallBack Screen" style={{ maxHeight: "400px", width: "100%", objectFit: "contain" }} />
                  <h4 className="text-center">Welcome to the <span className="text-primary"> #YMG20 Discussion Board!</span></h4>
                  <div style={{ maxWidth: "600px" }} className="container">
                    <p className="text-center fs-6">
                      This is where all the action happens on the summit day. Students can note down their ideas, vote on other peoples idea's and include opinions and suggestions on their own. Their Top ideas automatically get created into a Communique document at the end of the day!  <br />
                      NOTE: As an administrator, you are required to activate the Discussion Board on the day of the summit.
                    </p>
                  </div>
                  <Button variant='outlined' onClick={isAssignedChecker} size='large' color='warning'>ACTIVATE DISCUSSION</Button>
                </div>)
              :
              (
                // Previous Meetings 
                <div className="container-fluid ">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h3 className='fs-3'>Previous Meetings</h3>
                    <div className="d-flex align-items-center justify-content-end">
                      {!data && <Button onClick={CommuniqueAvailChecker} variant='outlined' color='warning' className='p-2 me-2 text-capitalize rounded' size='small'>Apply For Communique</Button>}
                      <Button onClick={isAssignedChecker} variant='contained' color='success' className='p-2 text-capitalize rounded' size='small'>New Meeting</Button>
                    </div>
                  </div>
                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                    {otherMeetings?.map((meeting, i) => {
                      return (
                        <div className="col">
                          <div key={i} className='card shadow-sm p-3 rounded-4 h-100 text-dark'>
                            <div>
                              <span className='fs-5 text-dark ps-2 border-start border-warning border-4 text-capitalize'>
                                {meeting?.track} {meeting?.meetingtype} Meeting
                              </span>&nbsp;
                              <StatusBadge meeting={meeting} /> &nbsp;
                              <Tooltip title="Delete Meeting">
                                <IconButton variant='outlined' color='error' className='fs-6 py-2'><Delete className='fs-6' /></IconButton>
                              </Tooltip>

                            </div>
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
                            <Link to={"/dashboard/discussion/meeting/" + meeting?.id}>
                              <Button size="small" variant='outlined' color='success' className='rounded-3 py-2'>Enter</Button>
                            </Link>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            }
          </>
        </div>)
        : (
          <div className='container'>
            <div>
              <h4>Select a track to start Discussion Meeting</h4>
              <div className="row row-cols-1 row-cols-lg-3 mt-5">
                {plannedData?.track && JSON.parse(plannedData?.track).map((track, i) => {
                  return (
                    <div className='col' key={i}>
                      <ButtonBase onClick={() => {
                        setSelectedTrack(track);
                        setSelectedTheme(JSON.parse(plannedData?.theme)[track]);
                      }} className={`border border-light ${selectedTrack === track ? "shadow-lg bg-light-green-grad text-white" : "bg-white shadow-sm"} text-center p-2 p-lg-3 h-100 rounded-4`}>
                        <div className="py-3">
                          <h4>{track}</h4>
                          <p><b>Theme :</b> <br /> {JSON.parse(plannedData?.theme)[track]}</p>
                        </div>
                      </ButtonBase>
                    </div>
                  )
                })}
              </div>
              <div>
                {selectedTrack !== null &&
                  <div className='text-center mt-5'>
                    <Button variant="outlined" size='large' color='warning' className='text-capitalize rounded py-3 px-4' onClick={meetingHandler}>Start Resolution Meeting</Button>
                  </div>}
              </div>
            </div>
          </div>
        )
      }


    </div>
  )
}

export default InstituteScreen1