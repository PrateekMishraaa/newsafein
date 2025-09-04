import React from "react";
import { Avatar } from "@mui/material";
import { useGlobalContext } from "global/context";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import {  WorkspacePremiumTwoTone } from "@mui/icons-material";
import moment from "moment";

const LeaderboradItem = ({ message, i }) => {
  const { userData } = useGlobalContext();
  const gradWiseColor = (grad) => {
    switch (grad <= 3) {
      case true:
        if (grad == 1) {
          return "bg-light-maroon-grad"
        } else if (grad == 2) {
          return "bg-light-green-grad"
        } else {
          return "bg-primary"
        }
      default:
        return "bg-dark"
    }
  }
  return (
    <div className="border">
      <div className="row g-0">
        <div className="col-1">
          <div className={"h-100 text-center " + gradWiseColor(i + 1)}>
            <h1 className="text-white">{i + 1}</h1>
          </div>
        </div>
        <div className="col-11">
          <div className="message-item-container bg-white rounded-3 p-3 h-100 m-0">
            <div className="mb-2">
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
                    <img src={message?.flag} alt="" style={{ width: 20 }} />&nbsp;{message?.cntry}
                  </small>&nbsp;&nbsp;
                  <small className="text-dark d-inline-block p-1 px-2 border border-light bg-white shadow-sm rounded-3">
                    <WorkspacePremiumTwoTone sx={{ color: "tomato", fontSize: 20 }} />&nbsp;{message?.desig}
                  </small>
                </div>
              </div>
            </div>
            <div>
              <p className="fs-6 my-0">{message?.text}</p>
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
        </div>
      </div>
    </div>
  );
};

export default LeaderboradItem;
