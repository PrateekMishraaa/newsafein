import React from 'react';
import YuvaLoader from './YuvaLoader';

const MsgLoader = () => {
    return (
        <div className='message p-5  rounded-4 border  w-100'>
            <div className="d-flex flex-column justify-content-center align-items-center w-100">
                <h3 className='fs-2'>{title}</h3>
                <YuvaLoader/>
                {/* <p className='px-5 text-center'>{message} {
                    contact ?
                        <span>Or you can write us at <a href={`mailto:${contact}`}>{contact}</a>.</span> : null
                }</p> */}


                <p className='px-5 text-center'>It seems like you don't have access to the Q&A portal currently, Please contact your admin to activate the feature. Or you can write us at <a href='mailto:support@yuvamanthan.org'>support@yuvamanthan.org</a>. </p>

                <p>If you already have the access rights to forum, Please report this issue to us.</p>
                <Button variant='outlined' className='fw-bold text-capitalize'>Report</Button>
            </div>
        </div>
    )
}

export default MsgLoader;