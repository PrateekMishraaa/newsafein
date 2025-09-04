import { BadgeTwoTone, CheckCircleTwoTone, Dashboard } from '@mui/icons-material';
import { apiJsonAuth } from 'api';
import { useGlobalContext } from 'global/context';
import { Popup } from 'utils/Popup';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CourseCertificationButton = ({ courseDetail, progress }) => {
    const { userData, token } = useGlobalContext();
    const [isGenerating, setIsGenerating] = useState(false);
    const [certAvail, setCertAvail] = useState(false);
    const navigate = useNavigate();
    //Generating the certificate
    const generateCertificate = async () => {
        setIsGenerating(true);
        Popup("loading", "Please wait", "Applying for the Certificate ");
        try {
            let formdata = { courseId: courseDetail?.courseId, studentId: userData.id, };
            const res = await apiJsonAuth.post("/course/certificate", formdata, {
                headers: {
                    Authorization: token,
                },
            });
            if (res.status == 200) {
                console.log("OK 200!!!!");
                // isGenerating(false);
                // navigate(`/dashboard/certificate/${courseId}`);
                Popup("success", "Applied Successfully", res?.data?.message);

                // again check for certificate 
                console.log("again show the checkCertificate")
                setCertAvail(true)
            }
        } catch (err) {
            if (err?.response?.status === 409) {
                console.log("NOT OK 409!!!!");
                // navigate("/dashboard/certificate/" + courseId);
                Popup("warning", "Already Applied", err?.response?.data?.message);
            } else {
                console.log("NOT OK!!!!");
                Popup("error", err?.response?.data?.message);
            }
        }
    };
    //Check Certification
    const CheckCertificate = async () => {
        console.log('course=>> ', courseDetail)
        try {
            let response = await apiJsonAuth.get(`/course/certificate/check?courseId=${courseDetail?.courseId}&studentId=${userData.id}`);
            console.log("=>>>>", response)
            if (response.status == 200) {
                if (response?.data?.result?.checked) {
                    setCertAvail(true);
                    console.log("inside this=>>>>====")
                }
            }
        } catch (error) {
            Popup(error?.response?.data?.message);
        }
    };
    useEffect(() => {
        if(courseDetail){
            CheckCertificate();
        }
    }, [courseDetail]);
    return (
        <div>
       { 
        progress?.length == courseDetail?.contentCount &&
            <>
                    {certAvail ? (
                        <div
                            className={"rounded btn-bg-green-grad active"}
                            onClick={() => navigate("/dashboard/certificate/" + courseDetail?.courseId)}
                            style={{ cursor: "pointer" }}
                        >
                            <div className="p-3 py-4 border text-dark fw-bold fs-6 rounded-0 ">
                                <BadgeTwoTone />
                                &nbsp;&nbsp; Download Certificate
                            </div>
                        </div>
                    ) : (
                        <div className={isGenerating ? "bg-light" : "bg-light-maroon-grad"} onClick={() => !isGenerating && generateCertificate()} style={{ cursor: "pointer" }}>
                            <div className="p-3 py-4 border text-dark fw-bold fs-6 rounded-0 ">
                                {isGenerating ? <span className="text-success">
                                    <CheckCircleTwoTone />
                                    &nbsp;&nbsp; Applied Successfully
                                </span> :
                                    <>
                                        <BadgeTwoTone />
                                        &nbsp;&nbsp; Apply For Certificate
                                    </>
                                }
                            </div>
                        </div>
                    )}
                    <div
                        className={"rounded text-primary"}
                        onClick={() => navigate("/dashboard/")}
                        style={{ cursor: "pointer" }}
                    >
                        <div className="p-3 py-4 border text-dark fw-bold fs-6 rounded-0 ">
                            <Dashboard />
                            &nbsp;&nbsp; Dashboard
                        </div>
                    </div>
                </>}
        </div>
    )
}

export default CourseCertificationButton