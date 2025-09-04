import { apiJson } from "api";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
// import { useLocation } from "react-router-dom";
import BreadCrumb from "../../../layout/BreadCrumb";
import moment from "moment";

const SingleNews = () => {
  //   const route = useLocation().pathname;
  //   const routeArr = route.split("/");
  //   const blogName = routeArr[2];
  let slug = useParams();
  console.log(slug);
  let Send = slug.slug;
  let [blogData, setBlogData] = useState();

  let [blogContent, setBlogContent] = useState();

  const getBlogsById = async () => {
    console.log("Fetching Quites Data ");
    try {
      console.log(`public/dynamic-news/${slug.slug}`);
      // /dynamic-blog/:slug blogs/edit/
      const res = await apiJson.get(`public/dynamic-news/${slug.slug}`);
      console.log("result" + res, slug.slug);

      if (res.status == 200) {
        console.log("All blogs Data: ", res.data.result);
        setBlogData(res?.data?.result);
        setBlogContent(res?.data?.result?.content);
      }
    } catch (error) {
      console.log("All Quotes Error: ", error);
    }
  };
  let [blogDatas, setBlogDatas] = useState([]);

  const getAllNews = async () => {
    console.log("Fetching Quites Data ");
    try {
      const res = await apiJson.get("admin/news");
      if (res.status == 200) {
        console.log("All blogs Data: ", res.data.result);
        setBlogDatas(res?.data?.result);
      }
    } catch (error) {
      console.log("All Quotes Error: ", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getBlogsById();
    getAllNews();
  }, []);
  console.log(blogDatas, blogData);
  function createMarkup(data) {
    return { __html: data };
  }
  return (
    <>
      <div>
        <BreadCrumb heading={blogData?.title} />
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                {/* post thumb */}
                <div className="position-relative mb-5">
                  <img src={blogData?.img} alt="post thumb" className="img-fluid w-100" style={{ maxHeight: 550 }} />
                  <div className="card-type hover-ripple">Article</div>
                </div>
                <div className="card-meta text-uppercase mb-2">
                  by <strong className="text-dark">{blogData?.author}</strong>/ on{" "}
                  <strong className="text-dark">{moment(blogData?.createdAt).calendar()}</strong>
                </div>
                <div dangerouslySetInnerHTML={createMarkup(blogData?.content)}></div>

                {/* <p className="fs-5">{blogData.heading}</p>
                      {blogData.section.map((section, index) => {

                        return (
                          <div key={index}>
                            <h3 className="fs-3">{section.title}</h3>
                            {section.paragraph.map((para) => {
                              return <p className="text-dark mb-4">{para}</p>;
                            })}
                            {section.list.map((list) => {
                              return (
                                <>
                                  <h5>{list.title}</h5>
                                  {list.paragraph.map((para) => {
                                    return (
                                      <p className="text-dark mb-4">{para}</p>
                                    );
                                  })}
                                </>
                              );
                            })}
                          </div>
                        );
                      })} */}

                {/* share */}
                {/* <div className="mb-5"> */}
                  {/* <h5 className="d-inline-block me-3">Share:</h5> */}
                  {/* <!-- AddToAny BEGIN --> */}
                  {/* <div className="a2a_kit a2a_kit_size_32 a2a_default_style">
                    <a className="a2a_dd" href="https://www.addtoany.com/share"></a>
                    <a className="a2a_button_facebook"></a>
                    <a className="a2a_button_twitter"></a>
                    <a className="a2a_button_email"></a>
                  </div>
                  <Helmet>
                    <script async src="https://static.addtoany.com/menu/page.js"></script>
                  </Helmet> */}
                  {/* <!-- AddToAny END --> */}
                {/* </div> */}
              </div>
              {/* sidebar */}
              <aside className="col-lg-4">
                {/* latest post */}
                <div className="bg-white px-4 py-5 box-shadow mb-5">
                  <h4 className="mb-4">Latest Article</h4>
                  {/* post-item */}
                  {blogDatas?.map((blog, index) => {
                    console.log(blog?.slug);
                    return (
                      <div className="media d-flex border-bottom border-color pb-3 mb-3">
                        <img src={blog?.img} className="me-3 mini-blog-image" alt="post-thumb" />
                        <div className="media-body">
                          <h5 className="mt-0">
                            <a href={`/news/${blog?.slug}`} className="text-dark">
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
          </div>
        </section>
      </div>
    </>
  );
};

export default SingleNews;
