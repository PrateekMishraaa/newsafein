import React, { useEffect, useState } from "react";
import { Avatar, Button } from "@mui/material";
import { useGlobalContext } from "global/context";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { CheckCircleOutlineTwoTone, WorkspacePremiumTwoTone } from "@mui/icons-material";
import moment from "moment";
import { apiJsonAuth } from "api";

const StudentDeclarationItem = ({ message, i, voted, votesArr, reloadVote, showVote }) => {
  const { userData } = useGlobalContext();
  const [questionWiseVote, setQuestionWiseVote] = useState([])
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
  const CheckVoteEligibility = async () => {
    const mappedVotes = await votesArr.filter(vote => vote === message.id);
    setQuestionWiseVote(mappedVotes)
  }
  const voteHandler = async (pointId, type) => {
    try {
      const voteResponse = await apiJsonAuth.post("/discussion/points/vote", {
        pointId,
        type,
      });
      if (voteResponse.status === 200) {
        console.log("Response Vote", voteResponse);
        reloadVote();
        CheckVoteEligibility();
      } else {
      }
    } catch (error) {
      console.log("Error", error)
    }
  };
  useEffect(() => {
    CheckVoteEligibility();
  }, [votesArr, userData])
  return (
    <div className="d-flex g-0 m-0 rounded-0 border" style={{ overflow: "hidden" }}>
      <div>
        <div className={"h-100 text-center p-2 " + gradWiseColor(i + 1)}>
          <h1 className="text-white">{i + 1}</h1>
        </div>
      </div>
      <div>
        <div className="message-item-container bg-white rounded-3 p-3 h-100 m-0">
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
                <img src={message?.flag} width={20} alt="flag" />&nbsp;{message?.cntry}
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
          {showVote && message?.userId !== userData.id &&
            <div>
              {questionWiseVote.length > 1 ? (
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
    </div>
  );
};

export default StudentDeclarationItem;
