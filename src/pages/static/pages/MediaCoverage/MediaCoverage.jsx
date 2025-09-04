import React, { useState } from 'react'

export const MediaCoverage = () => {
    let [pressReleseData, setPressReleseDate] =useState([
        'pressRelese/1.png',
        'pressRelese/2.png',
        'pressRelese/3.png',
        'pressRelese/4.png',
        'pressRelese/5.png',
        'pressRelese/6.png',
        'pressRelese/7.png',
        'pressRelese/8.png',
        'pressRelese/9.png',
        'pressRelese/10.png',
        'pressRelese/11.png',
        'pressRelese/12.png',
        'pressRelese/13.png',
        'pressRelese/14.png',
        'pressRelese/15.png',
        'pressRelese/16.png',
        'pressRelese/17.png',
        'pressRelese/18.png',
        'pressRelese/19.png',
        'pressRelese/20.png',
        'pressRelese/21.png',
        'pressRelese/22.png',
        'pressRelese/23.png',
    ])
    return (
        <div>
                <h1 className='fw-semibold mx-5 fs-1'>Media Coverage</h1>
                <div className="logos">
                    <div className="logos-slide">
                    {
                        pressReleseData?.map((val, ind)=>{
                            return(
                                <img src={val} alt='' className="shadow-lg rounded-3  object-fit-cover" style={{width:'300px', height:'200px' , zIndex:'-12'}} />
                            )
                        })
                    }
                    </div>
                </div>
            </div>
      )
}
