import React from 'react'
import fallbackimg1 from "../../../components/fallback/fallbackscreen1.svg";

const NotStarted = () => {
    return (
        <div>
            <div className="border border-2 py-5 rounded-4">
                <img src={fallbackimg1} alt="FallBack Screen" style={{ maxHeight: "400px", width: "100%", objectFit: "contain" }} />
                <h4 className="text-center">Discussion Board For The Event Coming Soon</h4>
                <h3 className="text-center">
                    <span className="fs-6">with </span>
                    <span className="text-primary"> Yuvamanthan</span>
                </h3>
            </div>
        </div>
    )
}

export default NotStarted