import { apiAuth, apiJsonAuth } from "api";
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { SchoolOutlined } from "@mui/icons-material";
import UploadResources from "../components/UploadResources";
import { useGlobalContext } from "global/context";
import { Avatar } from "@mui/material";
import { postAffiliateInstitute, deleteAffiliateInstitute } from "../components/APIHandleFunction";
import { Tab, Tabs } from "react-bootstrap";
import { AdminInstituteGallery, AdminInstituteStudents, CertificateData, InstituteDetail } from "components/admin";

function SingleInstitutesData() {
  let [datas, setData] = useState("");
  let [dataStudent, setDataStudent] = useState([]);
  let [dataDelegates, setDataDelegates] = useState([]);
  let [certificatesByInstitutes, setCertificatesByInstitutes] = useState();
  let [affiliated, setAffiliated] = useState([]);
  let [update, setUpdate] = useState(0);
  let { adminRoles } = useGlobalContext();
  let [students, setStudents] = useState([]);

  const navigate = useNavigate();
  let id = useParams();
  let location = useLocation();
  let url = location.pathname.split("/");
  let idToSend = id.id;

  const getDataById = async () => {
    try {
      const res = await apiJsonAuth.get(`admin/institute/${id.id}`);
      if (res.status == 200) {
        setData(res?.data?.result);
      }
    } catch (error) {
      console.log("All Error: ", error);
    }
  };

  const getStudentData = async () => {
    console.log(id?.id);
    try {
      const res = await apiJsonAuth.get(`admin/students/${id?.id}`);
      // console.log(res, id);
      if (res.status == 200) {
        setDataStudent(res?.data.result);
      }
    } catch (error) {
      console.log("All News Error: ", error);
    }
  };
  const getDelegatesData = async () => {
    try {
      const res = await apiJsonAuth.get(`admin/delegates/${id?.id}`);
      if (res.status == 200) {
        setDataDelegates(res?.data?.result);
      }
    } catch (error) {
      console.log("All News Error: ", error);
    }
  };

  const getCertificatesByInstitutes = async () => {
    try {
      const res = await apiJsonAuth.get(`admin/institute-certificates/${id.id}`);
      if (res.status == 200) {
        setCertificatesByInstitutes(res?.data?.result);
      }
    } catch (error) {
      console.log("All certificates Error: ", error);
    }
  };

  async function getAffiliateInstitute() {
    try {
      const res = await apiAuth.get(`admin/institute-affiliate/${id.id}`);
      if (res.status == 200) {
        // console.log("All certificates Data: ", res?.data?.result);
        setAffiliated(res?.data?.result);
      }
    } catch (error) {
      console.log("All Errors: ", error);
    }
  }

  useEffect(() => {
    getDataById();
    getStudentData();
    getDelegatesData();
    getCertificatesByInstitutes();
  }, [students]);
  
  useEffect(() => {
    getAffiliateInstitute();
    getStudentData();
  }, [update]);

  return (
    <div>
      <div className={"container py-3"}>
        {/* Title And Affiliation,Edit Button  */}
        <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-start mb-2">
            <Avatar src={datas["logo"]} className="rounded-0">
              <SchoolOutlined />
            </Avatar>
            <div className="px-2">
              <h4 className="m-0 lh-sm">
                &nbsp;
                {datas?.institution_name}
              </h4>
              <small>
                &nbsp;
                {datas?.district},{datas?.state},{datas?.pincode}
              </small>
            </div>
          </div>
          {url[2] !== "affiliate-institutes" ? (
            <div className="d-flex justify-content-end mb-2">
              <button
                hidden={adminRoles() === 5}
                className="btn me-1"
                onClick={() => {
                  navigate("/admin/editdetail/institute/" + idToSend);
                }}
                type="button">
                Edit Details
              </button>
              {!affiliated[0]?.instituteId ? (
                <button
                  hidden={adminRoles() === 5}
                  className="btn"
                  onClick={() => {
                    postAffiliateInstitute(id.id, () => {
                      setUpdate(update + 1);
                    });
                  }}
                  type="button">
                  Affiliate to Institute
                </button>
              ) : (
                <button
                  hidden={adminRoles() === 5}
                  className="btn btn-primary m-3 "
                  onClick={() => {
                    deleteAffiliateInstitute(affiliated[0]?.id, () => {
                      setUpdate(update + 1);
                    });
                  }}
                  type="button">
                  Remove Affiliate Institute
                </button>
              )}
              {affiliated[0]?.instituteId == id?.id ? <p className="fs-3 mt-4">This Institute is Affiliated</p> : ""}
            </div>
          ) : (
            ""
          )}
        </div>
        {/* Tabs To Manage All Details  */}
        <Tabs defaultActiveKey="detail" id="institute-detail-tab" className="my-3 settings-navs">
          {/* Details  */}
          <Tab eventKey="detail" title={<small>Details</small>}>
            {/* Data Representation  */}
            <InstituteDetail datas={datas} dataStudent={dataStudent} dataDelegates={dataDelegates} certificatesByInstitutes={certificatesByInstitutes} />
          </Tab>
          {/* Students Data  */}
          <Tab eventKey="students-data" title={<small>Users Data</small>}>
            <AdminInstituteStudents />
          </Tab>
          {/* Institute Gallery  */}
          <Tab eventKey="gallery" title={<small>Gallery</small>}>
            <AdminInstituteGallery />
          </Tab>
          {/* Uploaded Resources  */}
          <Tab eventKey="resources" title={<small>Institute Resources</small>}>
            <UploadResources />
          </Tab>
          {/* Certificates Data  */}
          <Tab eventKey="certificates" title={<small>Certificates Data</small>}>
            <CertificateData certificatesByInstitutes={certificatesByInstitutes} idToSend={idToSend} />
          </Tab>
          {/* Delegates Data  */}
          <Tab eventKey="participants-data" title={<small>Participants Data</small>}>
            <div className="delegates-data m-3 table-responsive">
              <table className="table table-borderless">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="p-3 px-2">
                      ID
                    </th>
                    <th scope="col" className="p-3 px-2">
                      StudentId
                    </th>
                    <th scope="col" className="p-3 px-2">
                      DesignationId
                    </th>
                    <th scope="col" className="p-3 px-2">
                      CountryId
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataDelegates?.map((value, index) => {
                    {
                      /* console.log(value); */
                    }
                    return (
                      <>
                        <tr>
                          <th className="p-3 px-2" scope="row">
                            {value?.id}
                          </th>
                          <td className="p-3 px-2">{value?.studentId}</td>
                          <td className="p-3 px-2">{value?.designationId}</td>
                          <td className="p-3 px-2">{value?.countryId}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default SingleInstitutesData;
