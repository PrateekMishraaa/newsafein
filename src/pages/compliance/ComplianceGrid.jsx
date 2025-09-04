import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "global/context";

const ComplianceGrid = () => {
  const navigate = useNavigate();
  let { userData } = useGlobalContext();
  const [allcompliance, setAllCompliance] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [allCategoryOfCompliance, setAllCategoryOfCompliance] = useState([]);
  const [question, setQuestion] = useState([]);

  // const getAttempts = () => {
  //   if (userData.id) {
  //     axios.get("http://localhost:3100/api/admin/compliance_answer/institute" + userData.id).then((response) => {
  //       setAttempts(response.data.result);
  //     });
  //   }
  // };

  const getAttempts = () => {
  if (userData.id) {
    axios.get(`http://localhost:3100/api/admin/compliance_answer/institute/${userData.id}`).then((response) => {
      setAttempts(response.data.result);
      console.log("Attempts data:", response.data.result); // Debugging line
    });
  }
};

  const checkAttempts = (id) => {
    const check = attempts.find((i) => i.complianceId === id);
    return check ? true : false;
  };

  const getAllCategoryOfCompliance = (id) => {
    axios.get(process.env.REACT_APP_API_BASE_URL + "admin/compliance_category/compliance/" + id).then((res) => {
      setAllCategoryOfCompliance(res.data.result);
    });
  };

  const getQuestion = (id) => {
    axios.get(process.env.REACT_APP_API_BASE_URL + "admin/compliance_question/compliance/" + id).then((res) => {
      setQuestion(res.data.result);
    });
  };

  const getAllCompliance = () => {
    axios.get(process.env.REACT_APP_API_BASE_URL + "admin/compliance").then((response) => {
      setAllCompliance(response.data.result);
    });
  };

  const navigateToResponse = (complianceId) => {
    navigate("/dashboard/school-compliance/" + complianceId);
  };

  useEffect(() => {
    getAllCompliance();
    getAttempts();
  }, []);

  return (
    <>
      <div className="bg-light py-3 rounded-3">
        <div className="container">
          <h4 className=" ">All Compliances</h4>
        </div>
      </div>
      <div className="py-3">
        <div className="row row-cols-1 row-cols-md-2  justify-content-start">
          {allcompliance?.map((i) => {
            return (
              <div className="col mb-4" key={i.id}>
                <Card className="w-100 rounded-4 shadow-sm shadow-hover transition" style={{ overflow: "hidden" }}>
                  <div className="img-container">
                    <img
                      style={{
                        height: "257px",
                        width: "100%",
                        objectFit: "cover",
                        objectPosition: "top",
                      }}
                      src={i.thumbnail ? i.thumbnail : "https://picsum.photos/seed/picsum/200/300"}
                      alt="alt"
                    />
                  </div>
                  <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <h4 className="">{i.title}</h4>
                      <button
                        onClick={() => {
                          getAllCategoryOfCompliance(i.id);
                          getQuestion(i.id);
                          navigateToResponse(i.id);
                        }}
                        className="btn btn-outline-dark">
                        {checkAttempts(i.id) ? "Retake" : "Start"}
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
        <div className="mt-4">
          <span>Showing {allcompliance?.length} compliances</span>
        </div>
      </div>
    </>
  );
};

export default ComplianceGrid;
