import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import {
  AddTask,
  CalendarMonth,
  Call,
  CardMembershipTwoTone,
  Celebration,
  Class,
  DeleteForever,
  Email,
  Person,
  VerifiedOutlined,
  VerifiedTwoTone,
} from "@mui/icons-material";
import { apiAuth, apiJsonAuth } from "api";
import Swal from "sweetalert2";
import { Button, CardActions, Tooltip } from "@mui/material";
import { useGlobalContext } from "global/context";
import StudentProfileModal from "./StudentProfileModal";
import useError from "hooks/useError";
import { toast } from "react-toastify";
import moment from "moment";

export default function StudentProfileCard({ student, reload, role }) {
  const { token } = useGlobalContext();
  const { ErrorResponder } = useError();
  //   Handle Delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You wanted to delete this School safety ${role}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (token) {
          try {
            const res = await apiAuth.delete(
              "/institute/student?studentId=" + id,
              {
                headers: {
                  Authorization: token,
                },
              }
            );
            if (res.status == 200) {
              toast.dismiss();
              toast.success("Delete Successfully.");
              reload();
            }
          } catch (error) {
            ErrorResponder(error);
          }
        }
      }
    });
  };
  return (
    <div className="col">
      <Card className="rounded-4 certified-wrapper position-relative w-100 h-100 p-0 bg-white border text-dark">
        <div className="h-100 d-flex flex-column w-100 justify-content-between">
          <div>
            <Tooltip title={`Delete ${role}'s Account`}>
              <span
                color="red"
                className="position-absolute top-0 end-0 m-2"
                onClick={() => handleDelete(student?.id)}
              >
                <DeleteForever
                  sx={{
                    fontSize: 20,
                    color: "grey",
                    cursor: "pointer",
                    "&:hover": {
                      margin: 0,
                      color: "red",
                    },
                  }}
                />
              </span>
            </Tooltip>
            {student?.certified ? (
              <div class="badge-promo">
                <span class="badge-promo-content fw-semibold">
                  <i className="bi bi-patch-check-fill"></i> Certified
                </span>
              </div>
            ) : (
              ""
            )}
            <CardHeader
              avatar={
                <Avatar
                  alt={student.first_name}
                  src={student?.profile}
                  sx={{ width: 46, height: 46, bgcolor: red[500] }}
                />
              }
              title={
                <div>
                  <span className="font-ubd fw-bold fs-6">
                    {student?.first_name} {student?.last_name}
                  </span>{" "}
                  <br />
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
                </div>
              }
            />
            <CardContent className="py-0">
              <div className="row">
                <div className="col-12">
                  {student?.assigned_designation && (
                    <small className="d-inline-block mb-1 me-1 text-center border me-1 mb-1 p-1 px-2 rounded-2  text-dark">
                      <VerifiedTwoTone sx={{ color: "blue", fontSize: 20 }} />{" "}
                      {student?.assigned_designation}
                    </small>
                  )}
                </div>
                <div className="col-12">
                  {student?.dob && (
                    <CalendarMonth
                      sx={{
                        fontSize: 16,
                        color: "grey",
                        borderRadius: 1,
                        mr: 1,
                      }}
                    />
                  )}{" "}
                  <small>
                    DOB :{" "}
                    {student?.dob && moment(student?.dob).format("DD-MM-YYYY")}
                  </small>
                </div>
                {/* <div className="col-12">
                  <Person
                    sx={{
                      fontSize: 16,
                      color: "grey",
                      mr: 1,
                    }}
                  />{" "}
                  <small>Guardian : {student?.father_name}</small>
                </div> */}
                <div className="col-12">
                  <a href={`mailto:${student?.email}`} className="text-dark">
                    <Email
                      sx={{
                        fontSize: 16,
                        color: "grey",
                        mr: 1,
                      }}
                    />{" "}
                    <small>{student?.email}</small>
                  </a>
                </div>
                <div className="col-12">
                  <a href={`tel:${student?.contact}`} className="text-dark">
                    <Call
                      sx={{
                        fontSize: 16,
                        color: "grey",
                        mr: 1,
                      }}
                    />{" "}
                    <small>{student?.contact}</small>
                  </a>
                </div>
                {student?.class ? (
                  <div className="col-12">
                    <Class
                      sx={{
                        fontSize: 16,
                        color: "grey",
                        mr: 1,
                      }}
                    />{" "}
                    <small>{student?.class}</small>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </CardContent>
          </div>
          <CardActions className="mb-0 px-0">
            <div className="container-fluid mb-2 mt-2">
              <div className="row g-1"></div>
              <Button
                variant="outlined"
                data-bs-toggle="modal"
                fullWidth
                data-bs-target={"#ProfileModal" + student?.id}
                className="rounded-3 text-capitalize mt-1"
                size="large"
                aria-label="add to favorites"
              >
                <i className="bi bi-arrows-angle-expand me-2"></i>
                View Details
              </Button>
            </div>
          </CardActions>
        </div>
      </Card>
      <StudentProfileModal student={student} />
    </div>
  );
}
