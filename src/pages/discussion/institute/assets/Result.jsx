import React from 'react'
import fallbackimg3 from "../../"

const Result = () => {
    return (
        <div>
            <div className="border-start border-2 py-5 rounded-4">
                <img src={fallbackimg3} alt="FallBack Screen" style={{ maxHeight: "400px", width: "100%", objectFit: "contain" }} />
                <h4 className="text-center">Result</h4>
                <h3 className="text-center">
                    <span className="fs-6">with </span>
                    <span className="text-primary"> Yuvamanthan</span>
                </h3>
            </div>
        </div>
    )
}

export default Result