import React from 'react'
import { Button } from "@mui/material";
import ConfettiExplosion from "react-confetti-explosion";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiJson } from 'api';
import { Popup, pop2 } from 'utils/Popup';
import { useGlobalContext } from 'global/context';

const ResultComponent = ({ globalEmail, globalPass }) => {
    const navigate = useNavigate();
    const { setUser, setToken } = useGlobalContext();

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            Popup("loading");
            let type = 1;
            const res = await apiJson.post(`auth/login?type=${type}`, {
                identifier: globalEmail,
                password: globalPass,
            });
            switch (res?.data?.status) {
                case "SUCCESS":
                    setUser(res.data.user);
                    setToken(res.data.jwt);
                    window.location.replace("/dashboard/");
                    break;
                case "ERROR":
                    pop2.error({ title: "Error while logging In", description: res?.data?.message, timer: 2000 });
                    break;
                case "ONBOARD":
                    setUser(res.data.user);
                    setToken(res.data.jwt);
                    window.location.replace("/dashboard/onboard");
                    break;
                case "NOTFOUND":
                    toast.dismiss();
                    toast.warning("Account Not Found");
                    break;
                case "WARNING":
                    console.log("Warning");
                    toast.warning(res?.data?.message);
                    break;
            }
        } catch (error) {
            if (error) {
                toast.error();
                toast.warning("Login failed please try again later");
            }
        }
    };
    return (
        <div className="text-center h-100 px-lg-4">
            <div className="d-flex align-items-center justify-content-center">
                <div>
                    <ConfettiExplosion />
                    <img src="/images/register/done.gif" alt="" className="w-100 mb-2" style={{ maxHeight: "150px", objectFit: "contain" }} />
                    <h3>Congratulations!</h3>
                    <p className="fs-6">
                        You have successfully verified your email ID and your Yuvamanthan account is active. You may proceed to create your Yuvamanthan profile and event summary by logging in to your account.
                    </p>
                    <div class="form-check">
                        <input type="checkbox" class="mx-3 pt-3" id="emailcheck" />
                        <label class="mb-2 pb-2 text-dark" for="emailcheck">Do you wish to receive regular email updates from Yuvamathan?</label>
                    </div>
                    <p>Stay connected ! <br /><Button onClick={handlesubmit} className="rounded text-capitalize mt-3" size="large" variant="outlined" color="warning">Continue to Login</Button></p>
                </div>
            </div>
            <hr className="mt-4" />
            <div className="text-start ">
                <h6>What is a YMG20 Institutional Dashboard?</h6>
                <p className="fs-6">We have created a dashboard through which you will be able to invite students and
                    even affiliated colleges in your institution to participate in the Yuvamanthan Model
                    G20 summit. The YMG20 Institutional Dashboard can also be used to manage the
                    summits by assigning roles, countries and tracks to the participants.</p>
                <hr />
                <span className="text-dark"><b className="text-danger">*</b> Due to bulk emailing sometimes our emails might get delivered to the wrong folders. Please check your emails spam and promotional folders and add us to your safe senders' list.</span>
            </div>

        </div>
    )
}

export default ResultComponent