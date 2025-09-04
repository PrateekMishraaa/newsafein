import React, { useEffect, useState } from "react";

import { useGlobalContext } from "global/context";
import { Spinner, Table } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Visibility } from "@mui/icons-material";
import { IconButton } from "@mui/joy";
import {TransparentBreadcrumb} from "components/layout";

const AttemptsTable = () => {
  const navigate = useNavigate();
  const { userData } = useGlobalContext();
  const [attempts, setAttempts] = useState([]);
  const [allcompliance, setAllCompliance] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [doneAttemps, setDoneAttempts] = useState([]);
  const [pendingAttemps, setPendingAttempts] = useState([]);

  const filterAttempts = () => {
    let done = [];
    let pending = [];
    done = attempts?.filter((i) => i.status === "Done");
    pending = attempts?.filter((i) => i.status === "Pending");
    setPendingAttempts(pending);
    setDoneAttempts(done);
  };

  
  // const fetchingDetail = () => {
  //   axios.get(process.env.REACT_APP_API_BASE_URL + "admin/institute/" + userData.id).then((res) => {
  //     // console.log(res.data);
  //   });
  // };
  // useEffect(() => {
  //   fetchingDetail();
  // }, []);


  //   const fetchingDetail = () => {
  //   axios.get("http://localhost:3100/admin/institute/userData.id")
  //   .then((res) => {
  //     // console.log(res.data);
  //   });
  // };
  // useEffect(() => {
  //   fetchingDetail();
  // }, []);

  // const getAllCompliance = () => {
  //   setIsLoading(true);
  //   // console.log('compliance')
  //   axios
  //     .get(process.env.REACT_APP_API_BASE_URL + "admin/compliance")
  //     .then((response) => {
  //       // console.log("inside compliance",response.data.result);
  //       setAllCompliance(response.data.result);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //       setIsLoading(false);
  //     });
  // };

  // const getAttempts = () => {
  //   setIsLoading(true);

  //   if (userData.id) {
  //     axios
  //       .get(process.env.REACT_APP_API_BASE_URL + "admin/compliance_answer/institute/" + userData.id)
  //       .then((response) => {
  //         // console.log('inside getAttempts', response.data.result);
  //         setAttempts(response.data.result);
  //         setIsLoading(false);

  //         // getAnswer();
  //       })
  //       .catch((error) => {
  //         setIsLoading(false);
  //         console.log(error.message);
  //       });
  //   }
  // };
  const handleResultPage = (id) => {
    navigate("/dashboard/school-compliance/report/" + id);
  };
  const handleContinue = (id, complianceId) => {
    navigate("/dashboard/school-compliance/" + complianceId + "/continue/" + id);
  };

  useEffect(() => {
    // getAllCompliance();
    // getAttempts();
    // getAnswer();
  }, []);

  const complianceName = (id) => {
    // console.log(allcompliance);
    const compliance = allcompliance?.find((i) => i.id === id);
    return compliance ? compliance.title : null;
  };

  const calculateGrade = (score, totalScore) => {
    let percentage = Math.ceil((score / totalScore) * 100).toFixed();
    // console.log(percentage, "this is percentage")

    // if (percentage >= 90) {
    //     return 'A+';
    // } else if (percentage >= 80) {
    //     return 'A';
    // } else if (percentage >= 70) {
    //     return 'B';
    // } else if (percentage >= 60) {
    //     return 'C';
    // } else if (percentage >= 50) {
    //     return 'D';
    // } else {
    //     return 'F';
    // }
    if (percentage <= 0) {
      percentage = 0;
    } else if (percentage >= 100) {
      percentage = 100;
    }
    return percentage ? percentage + "%" : "0%";
  };
  useEffect(() => {
    filterAttempts();
  }, [attempts]);

  return (
    <div>
      <TransparentBreadcrumb heading={"Compliance History"} />

      <div className=" table-responsive mt-3" style={{ padding: "30px" }}>
        <h4>Pending Compliance</h4>
        <br></br>
        {pendingAttemps?.length > 0 ? (
          <div className="table-responsive rounded-3 border">
            <Table striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th colSpan={2}>Compliance</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Score</th>
                  <th>Continue</th>
                </tr>
              </thead>
              <tbody>
                {pendingAttemps.map((attempt, index) => (
                  <tr key={index} style={{ cursor: "pointer" }}>
                    <td>{index + 1}</td>
                    <td colSpan={2}>{complianceName(attempt.complianceId)}</td>
                    <td>{attempt.name}</td>

                    <td>{attempt.createdAt.substring(0, 10)}</td>
                    <td>{attempt && calculateGrade(attempt.score, attempt.total_score)}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary rounded-1" onClick={() => handleContinue(attempt.id, attempt.complianceId)}>
                        Continue
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : isLoading ? (
          " "
        ) : (
          <span style={{ fontSize: "20px" }}>No Compliance Result to Show</span>
        )}
      </div>

      <div className=" table-responsive mt-3" style={{ padding: "30px" }}>
        <h4>Completed Compliance</h4>
        <br></br>
        {doneAttemps?.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th colSpan={2}>Compliance</th>
                <th>Name</th>
                <th>Date</th>
                <th>Score</th>
                <th>View Detail</th>
              </tr>
            </thead>
            <tbody>
              {doneAttemps.map((attempt, index) => (
                <tr key={index} style={{ cursor: "pointer" }}>
                  <td>{index + 1}</td>
                  <td colSpan={2}>{complianceName(attempt.complianceId)}</td>
                  <td>{attempt.name}</td>
                  <td>{attempt.createdAt.substring(0, 10)}</td>
                  <td>{attempt && calculateGrade(attempt.score, attempt.total_score)}</td>
                  <td>
                    <IconButton onClick={() => handleResultPage(attempt.id)}>
                      <Visibility />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : isLoading ? (
          " "
        ) : (
          <span style={{ fontSize: "20px" }}>No Compliance Result to Show</span>
        )}
      </div>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
          className="loader-overlay">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </div>
  );
};

export default AttemptsTable;
