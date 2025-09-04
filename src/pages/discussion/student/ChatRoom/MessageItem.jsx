import React, { useEffect, useState } from "react";
import { Avatar, Button } from "@mui/material";
import { useGlobalContext } from "global/context";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { CheckCircleOutlineTwoTone, Edit, WorkspacePremiumTwoTone } from "@mui/icons-material";
import moment from "moment";
import { apiJsonAuth } from "api";
const MessageItem = ({ message, i, voted, reloadVote, showVote }) => {
  const { userData } = useGlobalContext();
  const voteHandler = async (pointId, type) => {
    try {
      const voteResponse = await apiJsonAuth.post("/discussion/points/vote", {
        pointId,
        type,
      });
      if (voteResponse.status === 200) {
        console.log("Response Vote", voteResponse);
        reloadVote();
      } else {
      }
    } catch (error) {
      console.log("Error", error)
    }
  };
  const editHandler = () => {
    alert("Editing")
    
  }
  return (
    <div className="message-item-container bg-white border shadow-sm rounded-0 p-3 m-0">
      <div className="mb-2">
        <div className={`d-flex justify-content-between flex-wrap`}>
          <div className="d-flex">
            <Avatar sx={{ width: 35, height: 35 }} src={message?.profile}></Avatar>
            <div className="ps-2 lh-1">
              <span className="text-dark d-block ">
                {userData.id == message?.userId ? "You" : message?.first_name}
              </span>
              <small className="text-secondary"> {moment(message?.createdAt).calendar()}</small>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-end">
            <small className="text-dark d-inline-block p-1 px-2 border border-light bg-white shadow-sm rounded-3">
              <img src={message?.flag} width={20} alt="flag" /> &nbsp;{message?.cntry}
            </small>&nbsp;&nbsp;
            <small className="text-dark d-inline-block p-1 px-2 border border-light bg-white shadow-sm rounded-3">
              <WorkspacePremiumTwoTone sx={{ color: "tomato", fontSize: 20 }} />&nbsp;{message?.desig}
            </small>
            {userData.id == message?.userId ? <Button size="small" variant="outlined" onClick={editHandler} className="text-capitalize rounded px-2 ms-2"><Edit sx={{ fontSize: 15 }} />&nbsp;Edit</Button> : ""}
          </div>
        </div>
      </div>
      <div key={i} className={`message-item bg-white rounded-1 ${userData.id == message?.userId ? "my-message" : "received-message"}`}>
        <p className="fs-6 lh-sm">{message?.text}</p>
        {showVote &&
          <div>
            {message?.userId == userData.id ? (
              ""
            ) : voted ? (
              <div>
                <small className="text-success">
                  <CheckCircleOutlineTwoTone sx={{ fontSize: 18 }} /> Voted
                </small>{" "}
              </div>
            ) : (
              <div className={`d-flex justify-content-start input-group mt-4`}>
                {" "}
                <Button variant="outlined" color="success" size="small" className="rounded-0 rounded-start py-2" onClick={() => voteHandler(message?.id, "up")}>
                  <ThumbUpOffAltIcon sx={{ fontSize: 18 }} />&nbsp;&nbsp;Upvote
                </Button>
                <Button variant="outlined" color="error" size="small" className="rounded-0 border-start-0 rounded-end px-2 py-2" onClick={() => voteHandler(message?.id, "down")}>
                  <ThumbDownOffAltIcon sx={{ fontSize: 18 }} />
                </Button>
              </div>
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default MessageItem;
