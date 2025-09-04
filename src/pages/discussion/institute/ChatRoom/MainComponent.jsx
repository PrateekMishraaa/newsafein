import { Button, ButtonBase } from '@mui/material';
import React from 'react'
import { Outlet } from 'react-router-dom';

const MainComponent = ({ status }) => {
    const meetings = [{ key: "resolution", name: "Resolution Meeting" }, { key: "declaration", name: "Declaration Meeting" }, { key: "joint", name: "Joint Declaration" }]
    const tracks = [{ key: "sherpa", name: "Sherpa Track" }, { key: "finance", name: "Finance Track" }, { key: "foreignminister", name: "Foriegn Minister Track" }]
    const [currentRoomId, setCurrentRoomId] = React.useState("sherpa");
    const [meetingKey, setMeetingKey] = React.useState("resolution");
    const [showLeaderBoard, setShowLeaderBoard] = React.useState(false);
    const leaderBoardToggle = () => {
        setShowLeaderBoard(!showLeaderBoard);
    }
    return (
        <div className="container p-0 border" style={{ overflow: "hidden" }}>
            <div className="row g-0">
                <div className="col-9">
                    <div className="p-3">
                        <div className="d-flex align-items-end">
                            <div className="m-2 ms-0">
                                <h5>Discussion Meeting</h5>
                                <select name="meetingkey" id="meetingkey" onChange={(e) => { setMeetingKey(e.target.value) }} defaultValue={meetings[0]?.key}>
                                    {meetings?.map((meeting) => {
                                        return <option key={meeting?.key} value={meeting?.key}>{meeting?.name}</option>
                                    })}
                                </select>
                            </div>
                            <div className="m-2">
                                <h5>Track</h5>
                                <select name="track" id="track" onChange={(e) => {
                                    setCurrentRoomId(e.target.value)
                                }} defaultValue={tracks[0]?.key}>
                                    {tracks?.map((track, i) => {
                                        return <option key={track?.key} value={track?.key}>{track?.name}</option>
                                    })}
                                </select>
                            </div>
                            <div className="m-2">
                                <div className="dropdown">
                                    <Button variant="outlined" size="small" color="warning" className="dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                        More
                                    </Button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">Show Meeting Controls</a></li>
                                        <li><a className="dropdown-item" href="#">Meeting Board</a></li>
                                        <li><ButtonBase onClick={leaderBoardToggle} className="dropdown-item" href="#">Leader Board
                                        </ButtonBase></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="container p-3">
                        <h4>Meeting Controls</h4>
                        <div className="discussion-headers">
                            <Button variant="outlined" color="success" className="m-1 ms-0 rounded">
                                Start The Event
                            </Button>
                            <Button variant="outlined" color="success" className="m-1 rounded">
                                Pause Event
                            </Button>
                            <Button variant="outlined" color="success" className="m-1 rounded">
                                End Event
                            </Button>
                            <Button variant="outlined" color="success" className="m-1 rounded">
                                Announce Result
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="col-12"><Outlet /></div>
            </div>
        </div>
    );
};

export default MainComponent