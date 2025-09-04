import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import CourseSkeleton from "../content/CourseSkeleton";
// Plugins
// const Skeleton = () => {
//   return (
//     <>
//       <div className="d-flex align-items-center justify-content-center w-100 h-100 bg-success bg-opacity-25">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     </>
//   );
// };
const PdfPlayer = ({ content, postProgress }) => {
  const [showButtons, setShowButtons] = useState(false);
  const hideSpinner = () => {
    // setSpinner(false);
  };
  useEffect(() => {
    // setSpinner(true);
  }, [content]);
  const onEndHandler = () => {
    postProgress(content?.id);
  };
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [width, setWidth] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const pdfProxyUrl = process.env.REACT_APP_API_BASE_URL + "v2/pdf?url=";
  /*To Prevent right click on screen*/
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  /*When document gets loaded successfully*/
  function onDocumentLoadSuccess(pdfData) {
    setNumPages(pdfData.numPages);
    setPageNumber(1);
    hideSpinner();
    setShowButtons(true);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function handlePageRenderSuccess(page) {
    setWidth(page.width);
  }
  return (
    <div>
      <div className="main container px-0" style={{ width: width ? width : "auto", maxWidth: "100%", overflow: "hidden" }}>
        <Document file={pdfProxyUrl + content.path} error={<CourseSkeleton />} onLoadSuccess={onDocumentLoadSuccess} loading={<CourseSkeleton />}>
          <Page pageNumber={pageNumber} renderAnnotationLayer={false} error={<CourseSkeleton />} loading={<CourseSkeleton />} onRenderSuccess={handlePageRenderSuccess} />
        </Document>
        {showButtons && (
          <div className="d-flex align-items-center justify-content-center p-2">
            <div className="buttonc input-group align-items-center justify-content-center">
              <button type="button" className="btn rounded-3 me-1 btn-outline-success fw-semibold btn-sm pre" disabled={pageNumber <= 1} onClick={previousPage}>
                Prev
              </button>
              {!(pageNumber >= numPages) ? (
                <button type="button" className="btn rounded-3 btn-outline-success fw-semibold btn-sm" disabled={pageNumber >= numPages} onClick={nextPage}>
                  Next
                </button>
              ) : (
                <button type="button" className="btn btn-success border border-success fw-semibold rounded-3 btn-sm" onClick={onEndHandler}>
                  Submit
                </button>
              )}
            </div>
            <div className="pagec">
              <small className="fw-semibold">
                Page&nbsp;{pageNumber || (numPages ? 1 : "--")}&nbsp;of&nbsp;
                {numPages || "--"}
              </small>
            </div>
          </div>
        )}
      </div>{" "}
    </div>
  );
};

export default PdfPlayer;
