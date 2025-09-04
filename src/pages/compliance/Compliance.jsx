import React from "react";
import ComplianceForm from "./ComplianceForm";
import { useParams } from "react-router-dom";

const Compliance = () => {
  const { complianceid } = useParams();
  const {reportId} = useParams();
  return (
    <div className="p-relative">
      <ComplianceForm complianceId={complianceid} reportId={reportId} />
    </div>
  );
};

export default Compliance;
