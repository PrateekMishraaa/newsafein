import React, { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { toast } from "react-toastify";
const SignaturePad = ({ admin,initialSign, user, getSignature }) => {
  const [signatureImage, setSignatureImage] = useState(null);
  const signatureRef = useRef(null);
  const [show, setShow] = useState(true);

  const clearSignature = () => {
    // setShow(true)
    if (signatureRef) {
      signatureRef.current.clear();
    }
    setSignatureImage(null);
    console.log("inside the clear");
  };
  useEffect(()=>{
   if(initialSign){
    setSignatureImage(initialSign);
    setShow(false)
   }
  },[initialSign])
  const saveSignature = () => {
    if (user) {
      setShow(false);
      const signatureData = signatureRef && signatureRef.current.toDataURL();
      console.log(signatureData);
      getSignature(signatureData);
      toast.dismiss();
      toast.success("Signature Saved");
      setSignatureImage(signatureData);
      // handleChange()
      console.log("inside the save", show);
    }
  };

  return (
    <div>
      {show ? (
        <SignatureCanvas penColor="black" canvasProps={{ className: "signature-canvas w-100 bg-light", style: { height: "200px", border: "1px dashed gray", marginBottom: "12px" } }} ref={signatureRef} />
      ) : (
        <div className="mb-3 border w-100 bg-light">
          <img src={signatureImage} alt="alt" className="w-100" style={{ height: "200px" }} />
        </div>
      )}
      {show && (
        <div className="mb-3">
          <button className="btn btn-outline-danger btn-lg rounded-0 px-2 me-2" onClick={clearSignature} style={{ marginRight: "12px" }}>
            Clear
          </button>
          <button
            className="btn btn-outline-primary btn-lg rounded-0 px-2"
            onClick={() => {
              saveSignature();
              setShow(false);
            }}>
            Save
          </button>
        </div>
      )}
      {!show && (
        <div>
          <button className="btn btn-outline-primary btn-lg rounded-0 px-3" onClick={() => setShow(true)}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default SignaturePad;
