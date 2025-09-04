import React, { useEffect, useState } from 'react'
import "./LogoScroll.css"
import { apiJsonAuth } from 'api';

export const LogoScroll = () => {
    const [schoolData, setSchoolData] = useState([]);

    async function getAllScroll() {
        try {
          const result = await apiJsonAuth.get("admin/getAllSchool");
          if (result.status === 200) {
            setSchoolData(result?.data?.getAllNewSchool);
          }
        } catch (err) {
          console.log(err);
        }
      }

      useEffect(()=>{
        getAllScroll()
      },[])

  return (
    <>
      {
        schoolData?.length > 0 && 
        <div className="container py-5">
            <div>
                <h1 className='text-center fw-bolder mx-5'>Over 5000+ institutes registered and still counting</h1>
                <div className="logos">
                    <div className="logos-slide">
                {schoolData?.map((ele) => (
                  <div key={ele.id} className="img_title">
                    <img src={ele.profile} alt="" />
                    <div>{ele.name}</div>
                  </div>
                ))}
                </div>
                </div>
            </div>
        </div>
      }
    </>
  )
}
