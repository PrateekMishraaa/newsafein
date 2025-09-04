import { apiAuth } from "api";
import React, { useEffect, useState } from "react";
import AnalyticsChart from "./AnalyticsChart";
import "./analytic.component.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Spinner } from "react-bootstrap";
import moment from "moment";
import { Download } from "@mui/icons-material";
import axios from "axios";

function AdminAnalytics() {
  const [analyticsData, setAnalyticsData] = useState({});
  const [data, setData] = useState([]);
  useEffect(() => {}, []);
  console.log(data);
  async function getUpdatedReport() {
    try {
      // const res = await apiAuth.get("admin/analytics");
      const res = await axios.get("http://localhost:3100/api/admin/analytics")
      console.log("analytics",res.data);
      setAnalyticsData(res.data)
      if (res.status === 200) {
        setAnalyticsData(res?.data?.result);
      }
    } catch (err) {
      console.log(err);
    }
  }
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3100/api/admin/analytics/users-per-day");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getUpdatedReport();
    fetchData();
  }, []);

  const renderCard = (title, value) => {
    return (
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text fs-2 fw-bold">{value != undefined ? value : <Spinner />}</p>
        </div>
      </div>
    );
  };
  const [loading, setIsLoading] = useState(false);
  const generatePDF = () => {
    setIsLoading(true);

    const input = document.getElementById("analytic-pdf");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${moment().format("DD-MM-YYYY")}.pdf`);
      setIsLoading(false);
    });
  };
  return (
    <div>
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Analytics Dashboard</h1>
          <button className="btn rounded-0" onClick={generatePDF}>
            {loading ? <Spinner size="sm" /> : <Download />} Print
          </button>
        </div>
        <div id="analytic-pdf" className="p-2 p-lg-3">
          <div className="py-3 bg-light border">
            <div className="container">
              <h5>Yuvamanthan Analytics for Date {moment().format("DD-MM-YYYY")}</h5>
            </div>
          </div>
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-2 mt-2">
            {analyticsData && (
              <>
                <div className="col">{renderCard("Total Students", analyticsData?.totalStudents)}</div>
                <div className="col">{renderCard("Students Registered Today", analyticsData?.totalStudentsToday)}</div>
                <div className="col">{renderCard("Active Students", analyticsData?.totalActiveStudents)}</div>
                <div className="col">{renderCard("Certified Students", analyticsData?.totalCertificationsStudents)}</div>
                <div className="col">{renderCard("Total Teachers", analyticsData?.totalTeachers)}</div>
                <div className="col">{renderCard("Teachers Registered Today", analyticsData?.totalTeachersToday)}</div>
                <div className="col">{renderCard("Active Teachers", analyticsData?.totalActiveTeachers)}</div>
                <div className="col">{renderCard("Certified Teachers", analyticsData?.totalCertificationsTeachers)}</div>
                <div className="col">{renderCard("Total Institutions", analyticsData?.totalInstitutions)}</div>
                <div className="col">{renderCard("Institutions Registered Today", analyticsData?.totalInstitutionsToday)}</div>
                <div className="col">{renderCard("Active Institutions", analyticsData?.totalActiveInstitutions)}</div>
                <div className="col">{renderCard("Total Course Enrolled", analyticsData?.totalCourseEnrolled)}</div>
              </>
            )}
          </div>
          <div className="row row-cols-1 row-cols-lg-2">
            {data?.map((chart, chartIndex) => {
              return <AnalyticsChart title={chart?.title} dates={chart?.dates} data={chart?.data} key={chartIndex} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;
