import React from "react";
import { Avatar} from "@mui/material";
import { useGlobalContext } from "global/context";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import {  WorkspacePremiumTwoTone } from "@mui/icons-material";
import moment from "moment";

const MessageItem = ({ message, i }) => {
  const { userData } = useGlobalContext();
  return (
    <div className="message-item-container bg-white border border shadow-sm rounded-0 p-3 mt-0">
      <div className="mb-2">
        <div className={`d-flex justify-content-between flex-wrap`}>
          <div className="d-flex align-items-start">
            <Avatar sx={{ width: 35, height: 35 }} src={message?.profile}></Avatar>
            <div className="ps-2 lh-sm">
              <div className="text-dark">
                {userData.id == message?.userId ? "You" : message?.first_name}
              </div>
              <div>
                <small className="text-secondary"> {moment(message?.createdAt).calendar()}</small>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-end">
            <small className="text-dark d-inline-block p-1 px-2 border border-light bg-white shadow-sm rounded-3">
              <img src={message?.flag} alt="flag" style={{ width: 20 }} /> &nbsp;{message?.cntry}
            </small>&nbsp;&nbsp;
            <small className="text-dark d-inline-block p-1 px-2 border border-light bg-white shadow-sm rounded-3">
              <WorkspacePremiumTwoTone sx={{ color: "tomato", fontSize: 20 }} />&nbsp;{message?.desig}
            </small>
          </div>
        </div>
      </div>
      <div>
        <p className="fs-6 lh-sm">{message?.text}</p>
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

export default MessageItem;
