import { apiJson } from "api";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const SingleBlog = ({ data }) => {
  const titleStyle = {
    maxHeight: "44px", // Adjust the value as needed
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2, // Number of lines to display
  };

  return (
    <div className="border rounded-3 p-2 p-lg-3 pb-0 shadow-sm mx-auto bg-white" style={{ maxWidth: 400 , height: "520px"}}>
      <Link target={"_blank"} to={"/blog/" + data.slug}>
        <img className="card-img-top rounded-3" src={data.img} alt="Card image cap" />
      </Link>
      <div className="d-flex justify-content-between flex-column" style={{height: "220px"}}>
      <div className="mt-3">
        <div className="title-border-left ps-3 lh-1">
          <div className="card-meta mb-2 d-flex align-items-center justify-content-between">
            <span className="text-secondary d-flex align-items-center">by {data?.author}</span> <span className="text-secondary">{moment(data?.createdAt).calendar()}</span>
          </div>
          <h6 className="card-title " style={titleStyle}>
            <a href={"/blog/" + data?.slug} className="text-dark fs-6">
              {data?.title}
            </a>
          </h6>
        </div>
        <div className="card-text line-clamp mt-2">{data?.heading}</div>
      </div>
      {/* {blog.content} */}
      <div>
      <a href={"/blog/" + data?.slug} className="btn btn-secondary btn-arrow ">
        read more
      </a>
      </div>
      </div>
    </div>
  );
};

const BlogSwiper = () => {
  let [blogData, setBlogData] = useState([]);
  const getAllBlogs = async () => {
    try {
      const res = await apiJson.get("admin/blogs");
      if (res.status == 200) {
        setBlogData(res?.data?.result);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <div>
      <Swiper
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1000: {
            slidesPerView: 3,
          },
        }}
        slidesPerView={1}
        navigation={true}
        loop={false}
        className="py-2 py-md-3"
        modules={[Navigation]}>
        {blogData.map((blog, index) => {
          return (
            <SwiperSlide key={index} className="py-2">
              <SingleBlog data={blog} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default BlogSwiper;
