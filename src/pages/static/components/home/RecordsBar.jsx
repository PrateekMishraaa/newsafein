import React from "react";
const recordsData = [
  {
    icon: "/img/collegeIcon.png",
    count: "20000+",
    text: "Schools in India",
  },
  {
    icon: "/img/universityIcon.png",
    count: "2.5 lakh+",
    text: "Trainings completed",
  },
  {
    icon: "/img/certificateIcon.png",
    count: "45+",
    text: "Certifications to choose from",
  },
  {
    icon: "/img/usergroupIcon.png",
    count: "25 lakh+",
    text: "Active users",
  },
];
const RecordsBar = () => {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
      {recordsData.map((record, recordIndex) => {
        return (
          <div className="col" key={recordIndex}>
            <div className="text-center border py-4 rounded-4 shadow-sm">
              <img src={record?.icon} alt="Schools in India" width={"60px"} />
              <h1 className="">{record?.count}</h1>
              <p className="text-secondary">{record?.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecordsBar;
