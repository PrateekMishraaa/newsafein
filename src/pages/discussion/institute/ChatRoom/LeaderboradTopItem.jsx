import React from "react";
import { Avatar } from "@mui/material";
import { useGlobalContext } from "global/context";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import {  WorkspacePremiumTwoTone } from "@mui/icons-material";
import moment from "moment";

const LeaderboradTopItem = ({ message, i }) => {
  const { userData } = useGlobalContext();
  return (
    <div className="message-item-container bg-white rounded-3 p-3">
      <div className="mb-4">
        <div className={`d-flex justify-content-between flex-wrap`}>
          <div className="d-flex">
            <Avatar sx={{ width: 45, height: 45 }} src={message?.profile}></Avatar>
            <h6 className="text-dark d-inline-block ps-2">
              {userData.id == message?.userId ? "You" : message?.first_name}
              <br /><small className="fw-lighter"> {moment(message?.createdAt).calendar()}</small>
            </h6>
          </div>
          <div className="d-flex align-items-center justify-content-end">
            <small className="text-dark d-inline-block p-1 px-2 border border-light bg-white shadow-sm rounded-3">
              &nbsp;{message?.cntry}
            </small>&nbsp;&nbsp;
            <small className="text-dark d-inline-block p-1 px-2 border border-light bg-white shadow-sm rounded-3">
              <WorkspacePremiumTwoTone sx={{ color: "tomato", fontSize: 20 }} />&nbsp;{message?.desig}
            </small>
          </div>
        </div>

      </div>
      <div>
        <p>{message?.text}</p>
      </div>
      <div className="d-flex">
        <div className="d-flex align-items-center text-success  pe-2 border-end border-2 me-2">
          <ThumbUpOffAltIcon />
          <span className="fw-semibold ms-1">{message?.upvote}</span>
        </div>
        <div className="d-flex align-items-center text-danger">
          <ThumbDownOffAltIcon />
          <span className="fw-semibold ms-1">{message?.downvote}</span>
        </div>
      </div>
    </div>
  );
};

export default LeaderboradTopItem;
