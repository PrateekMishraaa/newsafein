import React from 'react'
import fallbackimg3 from "../../../components/fallback/fallbackscreen3.jpg";
const EventEnd = () => {
    return (
        <div>
            <div className="border-start border-2 py-5 rounded-4">
                <img src={fallbackimg3} alt="FallBack Screen" style={{ maxHeight: "400px", width: "100%", objectFit: "contain" }} />
                <h4 className="text-center">we will come again</h4>
                <h3 className="text-center">
                    <span className="fs-6">with </span>
                    <span className="text-primary"> Yuvamanthan</span>
                </h3>
            </div>
        </div>
    )
}

export default EventEnd