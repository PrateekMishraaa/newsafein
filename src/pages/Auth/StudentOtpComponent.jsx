import React, { useEffect, useState } from 'react'
import { Button } from "@mui/material";
import { useFormik } from 'formik';
import { apiJson } from 'api';
import { Popup, pop2 } from 'utils/Popup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ReplayCircleFilled } from '@mui/icons-material';
import { useGlobalContext } from 'global/context';

const StudentOtpComponent = ({ globalEmail, globalPass }) => {
    const navigate = useNavigate();
    const { setUser, setToken } = useGlobalContext();
    // const location = useLocation();
    const otpFormik = useFormik({
        initialValues: {
            email: globalEmail,
            otp: ""
        },
        onSubmit: async (values) => {
            if (globalEmail && values?.otp) {
                const response = await apiJson.post("register/student/verify", { email: values?.email, otp: values?.otp });
                switch (response?.data?.status) {
                    case "SUCCESS":
                        // pop2.success({ title: "Registered", description: "Thank you for registering on Yuvamanthan" })
                        // window.location.replace("/login/student");
                        try {
                            Popup("loading");
                            let userType = 0;
                            const res = await apiJson.post(`auth/login?type=${userType}`, {
                                identifier: globalEmail,
                                password: globalPass,
                            });
                            if (res.status == 200) {
                                setUser(res.data.user);
                                setToken(res.data.jwt);
                                navigate("/dashboard/");
                                window.location.reload(true);
                            }
                        } catch (error) {
                            if (error) {
                                toast.error("Something Went Wrong!!")
                            }
                        }

                        break;
                    case "WARNING":
                        pop2.warning({ description: response?.data?.message });
                        break;
                    case "ERROR":
                        pop2.error({ title: "Error", description: response?.data?.message });
                        break;
                }
            } else {
                pop2.warning({ title: "Unable to send OTP", description: "Please try Again Later" })
            }
        }
    })
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(59);

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    });
    const handleResendOtp = async () => {
        if (minutes == 0 && seconds == 0) {
            try {
                const response = await apiJson.post("/register/student/resendotp", { email: globalEmail })
                if (response.data?.status === "SUCCESS") {
                    toast.dismiss()
                    toast.success("Otp resent your email address");
                    setMinutes(2);
                    setSeconds(59);
                } else {
                    toast.dismiss()
                    toast.error(response?.data?.message);
                    setMinutes(2);
                    setSeconds(59);
                }
            } catch (error) {
                toast.dismiss()
                toast.error(error?.response?.data?.message ? error?.response?.data?.message : "Error While sending OTP");
                setMinutes(2);
                setSeconds(59);
            }
        }
    }
    return (
        <form onSubmit={otpFormik?.handleSubmit} className="mt-2 px-lg-4 d-flex h-100 align-items-center justify-content-center" style={{ maxWidth: "1100px" }}>
            <div className="container" style={{ maxWidth: "450px" }}>
                <h4 className="fs-2 mb-0 text-center">Enter Your OTP</h4>
                <p className="rounded-3 fs-6 text-center">Please enter the OTP sent to your email address</p>
                <div className="row g-3 mt-4 rounded">
                    <>
                        <div className="col-12">
                            <input id='otp' name='otp' value={otpFormik?.values?.otp} onChange={otpFormik?.handleChange} className="form-control py-4 text-center fs-1 border border-dark" style={{ height: "100px" }} />
                        </div>
                        <div className="col-12">
                            <Button color='success' disabled={minutes !== 0 || seconds !== 0} onClick={handleResendOtp}
                                className='rounded text-capitalize'>Resend OTP&nbsp;<ReplayCircleFilled /></Button>
                            <span>{minutes} min : {seconds} sec</span>
                        </div>
                        <div className="col-12">
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                fullWidth
                                size="large"
                                className="text-capitalize py-3 rounded-3 fs-5 fw-regular font-ubd"
                            >
                                {"Verify OTP"}
                            </Button>
                        </div>
                    </>
                </div>
            </div>
        </form>
    )
}

export default StudentOtpComponent