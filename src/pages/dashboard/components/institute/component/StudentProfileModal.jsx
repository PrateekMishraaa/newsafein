import React from "react";
import {
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import moment from "moment";
import {
  CalendarMonth,
  Call,
  Email,
  Facebook,
  Instagram,
  LinkedIn,
  LocationOn,
  Twitter,
  VerifiedOutlined,
  YouTube,
} from "@mui/icons-material";
import { apiJsonAuth } from "api";
import { toast } from "react-toastify";
const StudentProfileModal = ({ student, ApplyForParticipation }) => {
  return (
    <div id={"ProfileModal" + student?.id} className="modal" tabIndex="-1">
      <div
        className="modal-dialog p-0 modal-lg"
        style={{ backgroundColor: "transparent" }}
      >
        <div className="modal-content bg-light border rounded-4 border-2">
          <div className="modal-body p-0">
            <div className="shadow-sm">
              <button
                type="button"
                className="btn-close bg-white p-2 text-dark p-absolute"
                data-bs-dismiss="modal"
                style={{ top: "10px", right: "10px", zIndex: 2000 }}
                aria-label="Close"
              ></button>
              <div className="d-flex align-items-center justify-content-start p-2 p-lg-3">
                <div className="">
                  <div className=" p-2">
                    <Avatar
                      alt={student?.first_name}
                      className={"shadow-lg"}
                      src={student?.profile}
                      sx={{
                        width: 106,
                        height: 106,
                        backgroundColor: "tomato",
                      }}
                      data-bs-toggle="modal"
                      data-bs-target={"#ProfileModal" + student?.id}
                    />
                  </div>
                </div>
                <div className="">
                  <div className="p-2">
                    <h4 className="text-dark">
                      {student?.first_name} {student?.last_name}{" "}
                      {student?.middle_name}
                    </h4>
                    {student?.assigned_flag && (
                      <small className="d-inline-block mb-1 me-1 text-center border p-1 px-2 rounded-2 text-dark">
                        <img
                          width={20}
                          src={student?.assigned_flag}
                          alt={student?.assigned_flag}
                        />{" "}
                        {student?.assigned_country}
                      </small>
                    )}
                    {student?.assigned_designation && (
                      <small className="d-inline-block mb-1 me-1 text-center border me-1 mb-1 p-1 px-2 rounded-2  text-dark">
                        <VerifiedOutlined
                          sx={{ color: "blue", fontSize: 20 }}
                        />{" "}
                        {student?.assigned_designation}
                      </small>
                    )}
                    <div className="mt-2">
                      {student?.fb && (
                        <IconButton
                          target={"_blank"}
                          href={student?.fb}
                          className="text-secondary me-1 bg-white shadow-sm"
                        >
                          <Facebook className="fs-6" />
                        </IconButton>
                      )}
                      {student?.insta && (
                        <IconButton
                          target={"_blank"}
                          href={student?.insta}
                          className="text-secondary mx-1 bg-white shadow-sm"
                        >
                          <Instagram className="fs-6" />
                        </IconButton>
                      )}
                      {student?.twitter && (
                        <IconButton
                          target={"_blank"}
                          href={student?.twitter}
                          className="text-secondary mx-1 bg-white shadow-sm"
                        >
                          <Twitter className="fs-6" />
                        </IconButton>
                      )}
                      {student?.lkd && (
                        <IconButton
                          target={"_blank"}
                          href={student?.lkd}
                          className="text-secondary mx-1 bg-white shadow-sm"
                        >
                          <LinkedIn className="fs-6" />
                        </IconButton>
                      )}
                      {student?.ytb && (
                        <IconButton
                          target={"_blank"}
                          href={student?.ytb}
                          className="text-secondary mx-1 bg-white shadow-sm"
                        >
                          <YouTube className="fs-6" />
                        </IconButton>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container p-3">
              <List
                className="row"
                sx={{
                  width: "100%",
                  color: "white",
                }}
              >
                <div className="col-12">
                  <div>
                    <span className="text-dark fs-6">Bio</span>
                    <div>
                      <small className="text-dark">{student?.bio}</small>
                    </div>
                  </div>
                  {student?.address && (
                    <div className="mt-3">
                      <span className="text-dark fs-6 ">Address</span>
                      <div>
                        <small className="text-dark">
                          {student?.address +
                            " " +
                            student?.state +
                            " " +
                            student?.pincode}
                        </small>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-12 col-lg-6">
                  <ListItem className="p-0 py-2">
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: "orange" }}>
                        <Email />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={"Email Address"}
                      secondary={
                        <span className="text-dark">{student?.email}</span>
                      }
                    />
                  </ListItem>
                </div>
                <div className="col-12 col-lg-6">
                  <ListItem className="p-0 py-2">
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: "orange" }}>
                        <Call />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={"Contact"}
                      secondary={
                        <span className="text-dark">{student?.contact}</span>
                      }
                    />
                  </ListItem>
                </div>
                {/* <div className="col-6">
                  <ListItem className="p-0 py-2">
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: "orange" }}>
                        <Email />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={"Guardian"} secondary={<span className="text-dark">{student?.father_name}</span>} />
                  </ListItem>
                </div> */}
                <div className="col-12 col-lg-6">
                  <ListItem className="p-0 py-2">
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: "orange" }}>
                        <CalendarMonth />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={"Date Of Birth"}
                      secondary={
                        <span className="text-dark">
                          {moment(student?.dob).format("DD-MM-YYYY")}
                        </span>
                      }
                    />
                  </ListItem>
                </div>
                <div className="col-12">
                  {student?.topic && (
                    <ListItem className="p-0 py-2">
                      <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: "orange" }}>
                          <Email />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={"Preferred Theme"}
                        secondary={
                          <span className="text-dark">{student?.topic}</span>
                        }
                      />
                    </ListItem>
                  )}
                </div>
                <div className="col-12">
                  {student?.sub_topic && (
                    <ListItem className="p-0 py-2">
                      <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: "orange" }}>
                          <Email />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={"Preferred Topic"}
                        secondary={
                          <span className="text-dark">
                            {student?.sub_topic}
                          </span>
                        }
                      />
                    </ListItem>
                  )}
                </div>
                {/* <div className="container p-1 ">
                  <div className="d-flex justify-content-center">
                    <Button variant="outlined" onClick={() => { ApplyForParticipation(student?.id) }} >Add to Delegates</Button>
                  </div>
                </div> */}
                {/* <div className="col-12">
                    {student?.reporting_council && (
                      <ListItem className="p-0 py-2">
                        <ListItemAvatar>
                          <Avatar sx={{ backgroundColor: "orange" }}>
                            <Email />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          
                          primary={"Wanted to be Reporting Council?"}
                          secondary={<span className="text-dark">{student?.reporting_council}</span>}
                        />
                      </ListItem>
                    )}
                  </div> */}
              </List>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileModal;
