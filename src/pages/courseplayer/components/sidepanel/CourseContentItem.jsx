import { PictureAsPdfTwoTone, QuizTwoTone, VideoCameraBackTwoTone } from "@mui/icons-material";
import { ButtonBase } from "@mui/material";
import { apiAuth } from "api";
import React, { useEffect, useState } from "react";

const typeWiseIcon = (type) => {
  switch (type) {
    case 1:
      return <VideoCameraBackTwoTone sx={{ color: "blue", fontSize: 20 }} />;
    case 2:
      return <PictureAsPdfTwoTone sx={{ color: "red", fontSize: 20 }} />;
    case 3:
      return <QuizTwoTone sx={{ color: "green", fontSize: 20 }} />;
  }
};

const CourseContentItem = ({ sectionId, active, progress, activeContentId, setActiveContentId, setActiveSession }) => {
  const [sectionContent, setSectionContent] = useState([]);
  const FetchSectionContent = async () => {
    const res = await apiAuth.get(`v2/course/play/${sectionId}/content`);
    if (res?.data?.status === "success") {
      setSectionContent(res?.data?.result);
    }
  };
  const SelectActiveSession = () => {
    sectionContent.forEach((ele) => {
      if (ele?.seriesId === activeContentId) {
        setActiveSession(sectionId);
      }
    });
  };
  const HandleClick = (topicId, sectionId) => {
    setActiveContentId(topicId);
    setActiveSession(sectionId);
  };
  useEffect(() => {
    FetchSectionContent();
  }, []);
  useEffect(() => {
    SelectActiveSession();
  }, [activeContentId]);
  return (
    <ul className="module-sublist ps-0 mb-0">
      {sectionContent?.map((topic, index) => (
        <li key={index} className={activeContentId == topic.seriesId ? "rounded active" : "rounded"} style={{ cursor: "pointer" }}>
          <ButtonBase className="p-3 border rounded-0 p-relative d-flex align-items-center justify-content-start text-start w-100" onClick={() => HandleClick(topic.seriesId, sectionId)}>
            {typeWiseIcon(topic?.vd_type)}
            <span className="ms-1">{topic?.series_title} </span>
            {progress?.includes(topic.seriesId) ? (
              <img
                src="https://cdn-icons-png.flaticon.com/512/1634/1634264.png"
                alt=""
                style={{
                  height: "25px",
                  position: "absolute",
                  right: "0",
                  top: "0",
                }}
              />
            ) : (
              ""
            )}
          </ButtonBase>
        </li>
      ))}
    </ul>
  );
};

export default CourseContentItem;
