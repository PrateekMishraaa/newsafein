import React from "react";
import {DoughnutInstitute} from ".";

export const InstituteDetail = ({ datas, dataStudent, dataDelegates, certificatesByInstitutes }) => {
  return (
    <div>
      {" "}
      <div className="charts row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2 mb-3">
        <div className="col">
          <DoughnutInstitute Student={dataStudent?.length} allStudents={datas?.question1} StudentName={"Students"} allStudentsName={"All Students"} />
        </div>
        <div className="col">
          <DoughnutInstitute Student={dataStudent?.length - dataDelegates?.length} allStudents={dataDelegates?.length} StudentName={"Students"} allStudentsName={"Delegates "} />
        </div>
        <div className="col">
          <DoughnutInstitute Student={dataStudent?.length - certificatesByInstitutes?.length} allStudents={certificatesByInstitutes?.length} StudentName={"Students"} allStudentsName={"Certificates"} />
        </div>
      </div>
      <div className="table-responsive institute-data rounded-3 border">
        <table className="table table-borderless table-striped table-lg">
          <tbody>
            {Object.keys(datas).map((keyName, index) => {
              const regex = /title|first_name|last_name|institution_name|institution_address|ytb|lkd|twitter|ig|state|pincode|email|contact/;
              if (regex.test(keyName))
                return (
                  <tr key={index} className={`${!datas[keyName] ? "d-none" : ""}`}>
                    <td scope="row" className=" fs-6 text-capitalize">
                      {keyName?.replace("_", " ")}
                    </td>
                    <td>
                      <span className="fs-6 line-clamp-blog"> {datas[keyName]}</span>
                    </td>
                  </tr>
                );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
