import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SendIcon from "@mui/icons-material/Send";
import DownloadIcon from "@mui/icons-material/Download";
import QRCode from "qrcode.react";
import SharePopup from "./SharePopup";
import { CheckCircle } from "@mui/icons-material";
import { useRef } from "react";
import { useEffect } from "react";

export default function ProfileCard({ details, shareableLink, affiliated }) {
  const [open, setOpen] = React.useState(false);
  const [QRWidth, setQRWidth] = React.useState(null);
  // console.log({ Institutue: details })
  const [copiedLink, setCopiedLink] = React.useState({
    student: false,
    teacher: false,
  });
  const [sharedType, setSharedType] = React.useState();
  React.useEffect(() => {
    clearTimeout();
    setTimeout(() => {
      setCopiedLink(false);
    }, 2000);
  }, [copiedLink]);
  const [qrurl, setqrurl] = React.useState("");
  const [show, setShow] = React.useState(false);

  const QrWrapRef = useRef(null);

  useEffect(() => {
    if (QrWrapRef?.current) {
      const QRWrapper = QrWrapRef?.current;
      const width = QRWrapper?.offsetWidth;
      console.log({ width });
      if (Boolean(width)) {
        setQRWidth(width);
      }
    }
  }, [QrWrapRef]);

  const DownloadQR = () => {
    const canvas = document.getElementById("qrcode");
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    setqrurl(pngUrl);
    if (show) {
      setShow(false);
      setTimeout(() => {
        setShow(true);
      }, 500);
    } else {
      setShow(true);
    }
  };
  function DownloadOldQR() {
    const canvas = document.getElementById("qrcode");
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "registerqrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  return (
    <>
      <Card variant="outlined" className="rounded-4 py-3 shadow-sm mx-auto text-center">
        {/* <CardContent className="m-0">
          {" "}
          <h5>Invite Your School Teachers and Students to Create Their Own SIS Accounts.</h5>
        </CardContent> */}
        {/* {show && (
          <NewWindow>
            <PosterDownload setShow={setShow} qrcodeimg={qrurl} event_date={details?.appointment_date ? "Summit Date : " + moment(details?.appointment_date).format("DD-MM-YYYY") : ""} link={shareableLink} image={poster} name={details?.institution_name} addline1={details?.institution_address ? details?.institution_address : ""} addline2={`${details?.district ? details?.district + "," : ""} ${details?.state ? details?.state + "-" : ""} ${details?.pincode ? details?.pincode : ""}`} />
          </NewWindow>
        )} */}
        <CardActions className="d-block mt-0">
          {/* <h5 className=" lh-1 text-start">Invite Students</h5>
          <div className="justify-content-between">
            <div className="py-3 bg-light rounded-0 overflow-hidden text-wrap rounded-0 lh-sm" style={{ border: "2px dashed darkgray" }}>
              <small>{shareableLink}</small>
            </div>
            <div className="row row-cols-2 g-0">
              <div className="col">
                <Button
                  variant="outlined"
                  fullWidth
                  className="px-2 py-2 border-2 rounded-0 rounded-0"
                  color={copiedLink ? "success" : "warning"}
                  onClick={() => {
                    navigator.clipboard.writeText(shareableLink);
                    setCopiedLink((pv) => ({ ...pv, student: true }));
                  }}>
                  {!copiedLink.student ? <ContentCopyIcon /> : <CheckCircle />} <br />
                  {copiedLink.student ? <small>COPIED</small> : <small>COPY</small>}
                </Button>
              </div>
              <div className="col">
                <Button
                  fullWidth
                  variant="outlined"
                  className="px-2 py-2 border-2 rounded-0 rounded-0"
                  onClick={() => {
                    setOpen(true);
                    setSharedType("");
                  }}
                  endIcon={<SendIcon />}>
                  SHARE
                </Button>
              </div>
            </div>
          </div> */}
          <h5 className="m-1 p-1 lh-1 text-start mt-2"> Copy the Link Below to Invite Teachers</h5>
          <div className="qr-container text-center mx-auto p-relative">
            <div ref={QrWrapRef}>{Boolean(QRWidth) && <QRCode id="qrcode" value={shareableLink + `?type=teacher`} size={QRWidth} includeMargin={true} level={"H"} bgColor={"#ffffff"} />}</div>
            <div className="qr-download p-absolute d-flex align-items-center justify-content-center">
              <button className="rounded-3 py-3 btn btn-success border border-3 border-success bg-success bg-opacity-75" size="lg" onClick={DownloadOldQR}>
                <DownloadIcon /> DOWNLOAD
              </button>
            </div>
          </div>
          <div className="justify-content-between m-1">
            <div className="py-3 px-2 bg-light overflow-hidden text-wrap rounded lh-sm mb-1" style={{ border: "2px dashed darkgray" }}>
              <small>{shareableLink + `?type=teacher`}</small>
            </div>
            <div className="row row-cols-2 g-1">
              <div className="col">
                <Button
                  variant="outlined"
                  style={{ borderBottomLeftRadius: "5px" }}
                  fullWidth
                  className="px-2 py-2 border-2"
                  color={copiedLink ? "success" : "warning"}
                  onClick={() => {
                    navigator.clipboard.writeText(shareableLink + `?type=teacher`);
                    setCopiedLink((pv) => ({ ...pv, teacher: true }));
                  }}>
                  {!copiedLink.teacher ? <ContentCopyIcon /> : <CheckCircle />} <br />
                  {copiedLink.teacher ? <small>COPIED</small> : <small>COPY</small>}
                </Button>
              </div>
              <div className="col">
                <Button
                  fullWidth
                  variant="outlined"
                  className="px-2 py-2 border-2"
                  onClick={() => {
                    setOpen(true);
                    setSharedType("?type=teacher");
                  }}
                  endIcon={<SendIcon />}>
                  SHARE
                </Button>
              </div>
            </div>
          </div>
          {/* <div className="d-flex w-100 align-items-center justify-content-center flex-wrap">
            <Button
              variant="outlined"
              size="small"
              color="success"
              className="py-2 rounded-3 px-3 m-1"
              // onClick={DownloadOldQR}
              data-bs-toggle="modal"
              data-bs-target="#ShareQR"
              endIcon={<DownloadIcon />}>
              DOWNLOAD QR CODE
            </Button>
          </div> */}
        </CardActions>
      </Card>
      {/* <div className="modal fade" id="ShareQR" tabindex="-1" role="dialog" aria-labelledby="ShareQR" aria-bs-hidden="false">
        <div className="modal-dialog rounded-4" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="d-flex align-items-center justify-content-between">
                <h4 className="">Download Register QR Code</h4>
                <IconButton className="border rounded" data-bs-dismiss="modal">
                  <CancelOutlined />
                </IconButton>
              </div>
              <p>This QR Code should go on all your event promotion collaterals like Posters, Banners, WhatsApp images etc. Scanning this QR Code generates a unique joining link which takes the students to their registration page.</p>
            </div>
          </div>
        </div>
      </div> */}
      <SharePopup shareableLink={shareableLink + sharedType} institution_name={details?.institution_name} open={open} setOpen={setOpen} />
    </>
  );
}
