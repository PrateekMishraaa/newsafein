import { apiJsonAuth } from "api";
import { useGlobalContext } from "global/context";
import React from "react";
import { toast } from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";
;
const InstituteBoard = () => {
  const navigate = useNavigate();
  const { token } = useGlobalContext()
  const startDeclarationMeeting = async (instituteId, id, track, theme) => {
    if (id && instituteId && track && theme) {
      toast.loading("Creating a Meeting for your Discussion")
      const response = await apiJsonAuth.post("/discussion/declaration", {
        instituteId: instituteId,
        id: id,
        track: track,
        theme: theme
      }, {
        headers: {
          Authorization: token
        }
      });
      console.log(response);
      const MeetingId = response?.data?.result?.id;
      if (response?.data?.status === "SUCCESS") {
        toast.dismiss()
        toast.success("Declaration Meeting Created Successfully");
        navigate("/dashboard/discussion/meeting/" + MeetingId);
      } else if (response?.data?.status === "CONFLICT") {
        toast.dismiss()
        toast("Declaration Meeting For this Track Already Existed");
      } else {
        toast.dismiss()
        toast(response?.data?.message);
      }
    } else {
      alert("Please Select a Track");
    }
  }
  return (
    <div className="container-fluid">
      <div className="discussion-board container rounded p-2 min-vh-100 border shadow-sm">
        <Outlet context={[startDeclarationMeeting]} />
      </div>
    </div>);
};

export default InstituteBoard;
