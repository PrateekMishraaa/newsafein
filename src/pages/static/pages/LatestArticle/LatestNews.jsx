import { apiJson } from 'api';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
export const LatestNews = () => {
  const [latestNews, setLatestNews] = useState([]);
  const navigate = useNavigate()

  const newsData = async ()=>{
    await axios.get("http://localhost:3100/api/admin/news")
    .then((res)=>{
        console.log(res)
      setLatestNews(res?.data?.result)
    })
  }
  const addElipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + "..." : str;
    }

  useEffect(()=>{
    newsData()
  },[])

  return (
    <div>
        <section className='mb-2'>
        <div className="container">
          <h2 className="mx-4">Latest News</h2>
          <div className="d-flex justify-content-center">
            <div className="row justify-content-center">
              {latestNews?.slice(0,3)?.map((val, ind) => (
                <div
                  className="card col-md-4 m-3 p-1"
                  key={val?.id}
                  style={{ width: "20rem", maxHeight: "400px" , cursor: "pointer"}}
                  onClick={() => navigate(`/news/${val?.slug}`)}
                >
                  <img
                    src={val?.img}
                    className="card-img-top h-100 w-100"
                    alt="newsImage"
                  />
                  <div className="card-body">
                    <h5 className="card-title fs-6">
                      {addElipsis(val?.title, 60)}
                    </h5>
                    <p className="card-text fs-6">
                      Publisher by: {val?.author}
                    </p>
                    <p className="card-text fs-6">
                     Published Date: {val?.publish_date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button style={{background: "#f88d35", color: "white", border: "none"}}
          type="button"
          onClick={() => navigate("/news")}
          className="m-auto btn btn-outline-primary d-block mt-3 rounded-3"
        >
          Show More
        </button>
      </section>
    </div>
  )
}
