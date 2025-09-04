import React from "react";
import { CertificateForm } from "..";
import { Avatar } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";

export const CertificateData = ({ certificatesByInstitutes, idToSend }) => {
  return (
    <div>
      {/* Certificates Data  */}
      <div className="certificates-by-institutes-data table-responsive rounded-3 border mb-4">
        <table className="table table-borderless table-lg">
          <thead className="table-light">
            <tr>
              <th scope="col" className="p-3 px-2">
                Profile
              </th>
              <th scope="col" className="p-3 px-2">
                StudentId
              </th>
              <th scope="col" className="p-3 px-2">
                Name
              </th>
              <th scope="col" className="p-3 px-2">
                Certificate Key
              </th>
              <th scope="col" className="p-3 px-2">
                Accredited By
              </th>
              <th scope="col" className="p-3 px-2">
                Endorsed By
              </th>
              <th scope="col" className="p-3 px-2">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {certificatesByInstitutes?.map((value, index) => {
              return (
                <>
                  <tr>
                    <th className="p-3" scope="row">
                      <Avatar src={value?.profile} sx={{ backgroundColor: "orange" }}>
                        <FaUserCircle/>
                      </Avatar>
                    </th>
                    <td>{value?.studentId}</td>
                    <td>{value?.first_name + " " + value?.last_name}</td>
                    <td scope="row">{value?.certificate_key}</td>
                    <td>{value?.accredited_by}</td>
                    <td>{value?.endorsed_by}</td>
                    <td>{value?.created_at}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <hr />
      {/* Institute Specific Certificate*/}
      <CertificateForm id={idToSend} />
    </div>
  );
};
