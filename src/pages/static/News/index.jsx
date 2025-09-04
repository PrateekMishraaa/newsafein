import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import BreadCrumb from "layout/BreadCrumb";
import blogs from "./content";

const News = () => {
  const route = useLocation().pathname;
  const routeArr = route.split("/");
  const blogName = routeArr[2];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {blogs.map((blogItem,index) => {
        if (blogItem.slug === blogName) {
          return (
            <div key={index}>
              {/* <!-- page title --> */}
             <BreadCrumb heading={blogItem.title}/>
              {/* <!-- /page title --> */}
              <section className="section">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8">
                      {/* post thumb */}
                      <div className="position-relative mb-5">
                        <img
                          src={blogItem.image}
                          alt="post thumb"
                          className="img-fluid w-100"
                        />
                        <div className="card-type hover-ripple">News</div>
                      </div>
                      <div className="card-meta text-uppercase mb-2">
                        by{" "}
                        <strong className="text-dark">{blogItem.author}</strong>{" "}
                        / on{" "}
                        <strong className="text-dark">{blogItem.date}</strong>
                      </div>
                      <h2>{blogItem.title}</h2>
                      <p className="fs-5">{blogItem.subpara}</p>
                      {blogItem.section.map((section, index) => {
                        return (
                          <div key={index}>
                            <h3 className="fs-3">{section.title}</h3>
                            {section.paragraph.map((para) => {
                              return <p key={para} className="text-dark mb-4">{para}</p>;
                            })}
                            {section.list.map((list) => {
                              return (
                                <>
                                  <h5 key={list}>{list.title}</h5>
                                  {list.paragraph.map((para) => {
                                    return (
                                      <p key={para} className="text-dark mb-4">{para}</p>
                                    );
                                  })}
                                </>
                              );
                            })}
                          </div>
                        );
                      })}
                      <div className="mb-5">
                        <h5 className="d-inline-block me-3">Share:</h5>
                        {/* <!-- AddToAny BEGIN --> */}
                        <div className="a2a_kit a2a_kit_size_32 a2a_default_style">
                          <a
                            className="a2a_dd"
                            href="https://www.addtoany.com/share"
                          ></a>
                          <a className="a2a_button_facebook"></a>
                          <a className="a2a_button_twitter"></a>
                          <a className="a2a_button_email"></a>
                        </div>
                        <Helmet>
                          <script
                            async
                            src="https://static.addtoany.com/menu/page.js"
                          ></script>
                        </Helmet>
                        {/* <!-- AddToAny END --> */}
                      </div>
                    </div>
                    {/* sidebar */}
                    <aside className="col-lg-4">
                      {/* latest post */}
                      <div className="bg-white px-4 py-5 box-shadow mb-5">
                        <h4 className="mb-4">Latest News</h4>
                        {/* post-item */}
                        {blogs.map((blog, index) => {
                          return (
                            <div key={index} className="media d-flex border-bottom border-color pb-3 mb-3">
                              <img
                                className="me-3 mini-blog-image"
                                src={blog.image}
                                alt="post-thumb"
                              />
                              <div className="media-body">
                                <h5 className="mt-0">
                                  <a
                                    href={`/news/${blog.slug}`}
                                    className="text-dark"
                                  >
                                    {blog.title}
                                  </a>
                                </h5>
                                {blogItem.date}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </aside>
                  </div>
                </div>
              </section>
            </div>
          );
        }
      })}
    </>
  );
};

export default News;
