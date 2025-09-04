import { Person } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { apiJson } from "api";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BreadCrumb from "layout/BreadCrumb";

const AllBlogs = () => {
  const route = useLocation().pathname;
  const routeArr = route.split("/");
  const blogName = routeArr[2];
  let [blogData, setBlogData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [courseParameter, setCourseParameter] = useState({
    search: "",
    sort: "recent",
  });

  const getAllBlogs = async () => {
    console.log("Fetching Quites Data ");
    try {
      const res = await apiJson.get(`admin/blogs?search=${courseParameter.search}&sort=${courseParameter.sort}&page=${currentPage}`);
      if (res.status == 200) {
        console.log("All blogs Data: ", res.data.result);
        setBlogData(res?.data?.result);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      console.log("All Quotes Error: ", error);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageItems = () => {
    const pageItems = [];
    for (let i = 1; i <= totalPages; i++) {
      pageItems.push(
        <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`} aria-current={currentPage === i ? "page" : null}>
          <a className="page-link" onClick={() => setCurrentPage(i)}>
            {i}
          </a>
        </li>
      );
    }
    return pageItems;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllBlogs();
  }, [currentPage, courseParameter.sort]);
  function createMarkup(data) {
    return { __html: data };
  }

  console.log("blogData", blogData);
  return (
    <div>
      <BreadCrumb heading={"Blogs"} />
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {/* Top Bar  */}
              <div className="row mb-4">
                <div className="col-12 col-md-9">
                  <div className="input-group d-flex">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Write Course Name Here"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                      onChange={(e) =>
                        setCourseParameter({
                          ...courseParameter,
                          search: e.target.value,
                        })
                      }
                    />
                    <button className="btn btn-primary rounded-start-0" type="button" id="button-addon2" onClick={getAllBlogs}>
                      Search
                    </button>
                  </div>
                </div>
                <div className="col-12 col-md-3">
                  <select
                    className="form-select bg-white fs-5 rounded h-100"
                    value={courseParameter.sort}
                    onChange={(e) =>
                      setCourseParameter({
                        ...courseParameter,
                        sort: e.target.value,
                      })
                    }>
                    <option value="" disabled>
                      Sort Courses
                    </option>
                    <option value="recent">Recent</option>
                    <option value="atoz">A to Z</option>
                    <option value="ztoa">Z to A</option>
                  </select>
                </div>
              </div>
              {/* Blogs */}
              <div className="row">
                {/* <!-- blog post --> */}
                {blogData?.map((blog, index) => {
                  console.log(blog);
                  return (
                    <>
                      <div className="col-sm-6 mb-4">
                        <article className="card rounded-3 position-relative shadow-sm border  zindex-1 overflow-hidden">
                          <img className="card-img-top rounded-top-0 " src={blog?.img} alt="blog-thumb" />
                          <div className="card-body">
                            <div className="title-border-left">
                              <div className="card-meta mb-2 d-flex align-items-center justify-content-between">
                                <span className="text-secondary d-flex align-items-center">
                                  by{" "}
                                  <Avatar
                                    className="ms-2 me-1"
                                    sx={{
                                      height: 30,
                                      width: 30,
                                    }}
                                    src="/favicon/favicon.ico">
                                    <Person />
                                  </Avatar>{" "}
                                  {blog?.author}
                                </span>{" "}
                                <span className="text-secondary">{moment(blog?.createdAt).calendar()}</span>
                              </div>
                              <h6 className="card-title">
                                <a href={"/blog/" + blog?.slug} className="text-dark fs-6">
                                  {blog?.title}
                                </a>
                              </h6>
                            </div>
                            {/* <p className="card-text">
                            {blog.content}...
                          </p> */}
                            <div className="line-clamp-blog text-secondary">{blog?.heading}</div>
                            {/* {blog.content} */}
                            <a href={"/blog/" + blog?.slug} className="btn btn-secondary btn-arrow">
                              read more
                            </a>
                          </div>
                        </article>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            {/* sidebar */}
            <aside className="col-lg-4">
              {/* latest post */}
              <div className="bg-white p-2 p-lg-3 border mb-5 rounded-3">
                <h4 className="mb-4">Latest Article</h4>
                {/* post-item */}
                {blogData.map((blog, index) => {
                  return (
                    <div className="media d-flex border-bottom border-color pb-3 mb-3">
                      <img className="me-2" src={blog.img} alt="post-thumb" style={{ width: 100, height: 60 }} />
                      <div className="media-body">
                        <h5 className="mt-0 fs-6">
                          <a href={"/blog/" + blog?.slug} className="text-dark">
                            {blog.title}
                          </a>
                        </h5>
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>
          </div>
          <nav aria-label="...">
            <ul className="pagination mt-5">
              <li className="page-item disabled">
                <a className="page-link" onClick={handlePrevious}>
                  Prev
                </a>
              </li>
              {renderPageItems()}
              <li className="page-item">
                <a className="page-link" onClick={handleNext}>
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </div>
  );
};

export default AllBlogs;
