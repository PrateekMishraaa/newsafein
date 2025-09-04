import { apiAuth, apiJsonAuth } from "api";
import { useGlobalContext } from "global/context";
import NotFoundGif from "layout/fallback/NotFoundGif";
import { Popup } from "utils/Popup";
import useError from "hooks/useError";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import StudentCoordinatorCard from "./StudentCoordinatorCard";

function InstituteStudentCoordinators() {
  const { ErrorResponder } = useError();
  const {token} = useGlobalContext();
  const [StdCoordinates, setStdCoordinate] = useState([]);

    const [
        details,
        students,
        fetchStudents,
        fetchDelegates,
        certificates,
        delegates,
        shareableLink,
        DownloadQR,
        fetchStdCoordinate,
        StdCoordinate
      ] =
    useOutletContext();

    const fetchStdCoordinates = async () => {
      try {
        const res = await apiAuth.get(`/institute/studentCoordinate`);
        if (res.status === 200) {
          setStdCoordinate(res.data);
        }
      } catch (error) {
        
        // if (error) {
        //   toast.dismiss();
        //   toast.error(error.response?.data.message ? error.response?.data.message : "Something Went Wrong Check your Internet Connection");
        // }
      }
    };


  const removeFromCoordeinator = async (id) => {
    // console.log("Deleting..... student with studentId " + id);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove student from Coordinaters",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if(token){

          try {
            const res = await apiJsonAuth.delete(
              `/institute/studentCoordinate?studentId=${id}`, {
                headers:{
                  Authorization:token
                }
              }
            );
            if( res.status === 200 ) {
              Popup("success", " Student Removed Coordinaters");
              fetchStdCoordinate();
            }
          } catch (err) {
            ErrorResponder(err);            // Popup("error", err.response.data.message);
          }
        }
      }
    });
  };
  // console.log("STUDENT COORDINATOR",StdCoordinate[0])
  return (
    <div>
      {StdCoordinate.length ? (
        <div className="container">
          <div className="row g-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-4">
            {StdCoordinate.map((coordinate, i) => {
              return (
                <StudentCoordinatorCard
                  key={i}
                  student={coordinate}
                  removeFromCoordeinator={removeFromCoordeinator}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <NotFoundGif text={"No Student Coordinator Added Yet!"} />
      )}
    </div>
  );
}

export default InstituteStudentCoordinators