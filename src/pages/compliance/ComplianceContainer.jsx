import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";

const ComplianceContainer = () => {
  const navigate = useNavigate();
  const [complianceId, setCompliacneId] = useState(null);
  const getAllCompliance = () => {
    axios.get(process.env.REACT_APP_API_BASE_URL + "admin/compliance").then((response) => {
    });
  };
  const navigateToResponse = (id) => {
    navigate("/dashboard/school-compliance/" + id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigateToResponse(complianceId);
  };

  useEffect(() => {
    getAllCompliance();
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ComplianceContainer;
