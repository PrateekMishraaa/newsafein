import React from "react";
// import Swal from "sweetalert2";
// const PDF = require("./points.pdf");

const IframePdfViewer = ({
  file,
  viewIndex,
  setViewIndex,
  series,
  postProgress,
}) => {
  const startTime = new Date().getTime();
  const onEndHandler = () => {
    let gap = (new Date().getTime() - startTime) / 60000;
    if (gap > 0.1) {
      postProgress(series[viewIndex].id);
    } else {
      // Swal.fire({
      //   title: "PDF not read Completely",
      //   text: "too less time you have spent to read",
      //   icon: "warning",
      // });
    }
  };
  return (
    <>
      <div>
        <iframe
          className="d-block"
          src={`${file}#view=fitV`}
          title="testPdf"
          // style={{ height: "600px",marginTop:"-30px" }}
          style={{ height: "600px" }}
          width="100%"
        />
      </div>
      {/* Buttons  */}
      <div style={{ position: "absolute", top: "45%", width: "100%" }}>
        <div className="w-100 d-flex justify-content-between align-items-center">
          <button
            type="button"
            className="btn btn-outline-warning rounded-pill py-2 px-4"
            disabled={viewIndex == 0}
            onClick={() => setViewIndex(viewIndex - 1)}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
          <button
            type="button"
            className="btn btn-outline-warning rounded-pill py-2 px-4"
            onClick={() => {
              if (viewIndex == series.length - 1) {
                // setCertificateDownloadable(true);
              } else {
                setViewIndex(viewIndex + 1);
              }
              onEndHandler();
            }}
          >
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default IframePdfViewer;
