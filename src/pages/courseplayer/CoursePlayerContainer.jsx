import { apiAuth, apiJsonAuth } from "api";
import { useGlobalContext } from "global/context";
import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CourseSidePanel from "./components/CourseSidePanel";
import CourseDescriptions from "pages/course/CourseDescriptions";

const CoursePlayerContainer = () => {
  const { token } = useGlobalContext();
  const [progress, setProgress] = useState(null);
  const [activeContentId, setActiveContentId] = useState(null);
  const [activeSession, setActiveSession] = useState(null);
  const [courseDetail, setCourseDetail] = useState();
  const { courseId } = useParams();
  const [stopFetchNext, setStopFetchNext] = useState(false);
  //Fetch Course Data
  const getCourse = async (courseId) => {
    try {
      if (courseId) {
        const res = await apiAuth.get(`v2/course/play/${courseId}`, { headers: { Authorization: token } });
        if (res?.data?.status == "success") {
          setCourseDetail(res?.data?.result);
          setProgress(JSON.parse(res?.data?.result?.section_progress)?.progress);
        }
      }
    } catch (error) {
      let msg = error?.response?.data?.message ? error?.response?.data?.message : "Something Went Wrong Check  your Network Connection";
      toast.error(msg);
    }
  };
  // StopFetch Next For a Delay
  const fetchNextStop = (time) => {
    setStopFetchNext(true);
    clearTimeout();
    setTimeout(() => {
      setStopFetchNext(false);
    }, time * 1000);
  };
  // Fetch Next Course
  const fetchNextContent = async (courseId, id) => {
    try {
      if (!stopFetchNext) {
        const res = await apiAuth.get(`v2/course/play/content/next?courseId=${courseId ? courseId : ""}&currentContentId=${id ? id : ""}`, { headers: { Authorization: token } });
        if (res?.data?.status == "success") {
          setActiveContentId(res?.data?.nextContentId);
        }
      }
    } catch (error) {
      let msg = error.response.data.message ? error.response.data.message : "Something Went Wrong Check  your Network Connection";
      toast.error(msg);
    }
  };
  //Function for Post Progress
  async function postProgress(seriesId) {
    try {
      if (!progress.includes(seriesId)) {
        const res = await apiJsonAuth.post("v2/course/updateprogress", { enrollmentId: courseDetail?.enrollmentId, seriesId }, { headers: { Authorization: token } });
        if (res.status == 200) {
          toast.dismiss();
          toast.success("Section Marked as Completed");
          let newIcreasedSection_completed = Number(courseDetail?.section_completed) + 1;
          setCourseDetail({ ...courseDetail, section_completed: newIcreasedSection_completed });
          setProgress([...progress, seriesId]);
        }
      } else {
        fetchNextContent(courseDetail?.courseId, seriesId);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message ? error.response.data.message : "Something Went Wrong Check Your Internet Connnection");
    }
  }
  useEffect(() => {
    if (progress?.length && courseDetail) {
      let n = progress.length - 1;
      fetchNextContent(courseDetail?.courseId, progress[n]);
    } else {
      if (courseDetail) {
        fetchNextContent(courseDetail?.courseId);
      }
    }
  }, [progress]);
  useEffect(() => {
    getCourse(courseId);
  }, [courseId]);
  return (
    <div className="container-fluid px-0 border-top">
      <div className="row g-0">
        <div className="col-12 col-md-9 col-xxl-9">
          <Outlet context={{ courseDetail, progress, setProgress, activeContentId, setActiveContentId, fetchNextContent, postProgress, fetchNextStop }} />
          <CourseDescriptions course={courseDetail} />
        </div>
        <div className="col-12 col-lg-3 col-xxl-3 border-start">
          <CourseSidePanel courseDetail={courseDetail} progress={progress} setProgress={setProgress} activeContentId={activeContentId} setActiveContentId={setActiveContentId} activeSession={activeSession} setActiveSession={setActiveSession} />
        </div>
      </div>
    </div>
  );
};

export default CoursePlayerContainer;
