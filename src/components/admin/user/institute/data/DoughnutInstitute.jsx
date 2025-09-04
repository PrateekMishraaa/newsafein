import { CChart } from "@coreui/react-chartjs";
import React from "react";

export function DoughnutInstitute({ Student, allStudents, StudentName, allStudentsName }) {
  // console.log("Props", Student, allStudents);
  return (
    <div className="border shadow-sm rounded-4 p-4 h-100">
      <div className="">
        <div className="d-flex justify-content-between text-secondary align-items-center">
          <div>
            <h1 className="fs-2 text-secondary ">{allStudentsName}</h1>
          </div>
          <div>
            <h1 className="fw-bolder text-primary">{allStudents ? allStudents : "0"}</h1>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div style={{ width: "250px" }}>
          <CChart
            type={"doughnut"}
            className="text-bolder h-100 w-100"
            data={{
              labels: [allStudentsName, StudentName],
              datasets: [
                {
                  backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
                  data: [allStudents, Student],
                  weight: 100,
                },
              ],
              hoverOffset: 2,
            }}
          />
        </div>
      </div>
    </div>
  );
}
