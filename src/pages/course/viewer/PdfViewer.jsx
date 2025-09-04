import React, { useEffect, useState } from "react";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Button } from "@mui/material";
// Plugins
const Skeleton = () => {
  return <>
    <div className="d-flex align-items-center justify-content-center w-100 h-100 bg-dark bg-opacity-25" style={{ position: "absolute", top: 0, left: 0 }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div>
        <h5 className=" ms-2">Loading PDF File</h5>
      </div>
    </div>
  </>
};
function PdfViewer({
  file,
  viewIndex,
  series,
  postProgress,
}) {
  // on End Handler
  const onEndHandler = () => {
    postProgress(series[viewIndex].seriesId);
  };
  const [spinner, setSpinner] = useState(true)
  const hideSpinner = () => {
    setSpinner(false);
  }
  useEffect(() => {
    setSpinner(true)
  }, [file]);
  return (
    <div>
      <div className="border p-2" id="myPdf" style={{ position: "relative" }}>
        {spinner && <Skeleton />}
        <iframe src={"https://docs.google.com/gview?embedded=true&url=" + file} onLoad={hideSpinner} height={500} style={{ width: "100%" }}></iframe>
        <Button color="success" variant="outlined" className="rounded mt-2" onClick={onEndHandler}>Mark Completed</Button>
      </div>
    </div>
  );
}

export default PdfViewer;
