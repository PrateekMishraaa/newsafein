import { apiAuth } from "api";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import VideoPlayer from "./player/VideoPlayer";
import PdfPlayer from "./player/PdfPlayer";
import QuizPlayer from "./player/QuizPlayer";
import CourseSkeleton from "./content/CourseSkeleton";

const ViewComponentChanger = (data, progress, postProgress, activeContentId, setActiveContentId, fetchNextStop) => {
  switch (data?.type) {
    case 1:
      return <VideoPlayer content={data} postProgress={postProgress} />;
    case 2:
      return <PdfPlayer content={data} postProgress={postProgress} />;
    case 3:
      return <QuizPlayer content={data} progress={progress} postProgress={postProgress} activeContentId={activeContentId} setActiveContentId={setActiveContentId} fetchNextStop={fetchNextStop} />;
    default:
      return <CourseSkeleton />;
  }
};

const CourseScreen = () => {
  const { courseDetail, activeContentId, setActiveContentId, fetchNextContent, progress, postProgress, fetchNextStop } = useOutletContext();
  const [content, setContent] = useState(null);
  const fetchContent = async () => {
    const res = await apiAuth.get("/v2/course/play/content-detail/" + activeContentId);
    if (res.data?.status === "success") {
      setContent(res?.data?.result);
    }
  };
  useEffect(() => {
    fetchContent();
  }, [activeContentId]);

  return (
    <>
      <div className="border-bottom">{content ? ViewComponentChanger(content, progress, postProgress, activeContentId, setActiveContentId, fetchNextStop) : <CourseSkeleton />}</div>
    </>
  );
};

export default CourseScreen;
