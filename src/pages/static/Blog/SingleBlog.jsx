import { apiJson } from "api";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import moment from "moment";

const SingleBlog = () => {
  let slug = useParams();
  console.log(slug);
  let [blogData, setBlogData] = useState();
  let [blogContent, setBlogContent] = useState();
  let [blogDatas, setBlogDatas] = useState([]);

  const getBlogsById = async () => {
    console.log("Fetching Quites Data ");
    try {
      const res = await apiJson.get(`public/dynamic-blog/${slug.slug}`);
      console.log("result" + res, slug.slug);
      if (res.status == 200) {
        setBlogData(res?.data?.result);
        setBlogContent(res?.data?.result?.content);
      }
    } catch (error) {
    }
  };

  const getAllBlogs = async () => {
    console.log("Fetching Quites Data ");
    try {
      const res = await apiJson.get("admin/blogs");
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
    getAllBlogs();
  }, [slug]);
  console.log(blogDatas);
  function createMarkup(data) {
    return { __html: data };
  }
  return (
    <>
      {/* <BreadCrumb heading={blogData?.title} /> */}
      <div>
        <div className="container py-4">
          <div className="row g-3">
            <div className="col-12 col-lg-8 ">
              <h2 className="">{blogData?.title}</h2>
              <div className="card-meta text-capitalize mb-2">
                by <strong className="text-dark">{blogData?.author}</strong> / on{" "}
                <strong className="text-dark">{moment(blogData?.createdAt).calendar()}</strong>
              </div>
              {/* share */}
              <div className="mb-3">
                {/* <!-- AddToAny BEGIN --> */}
                <div className="a2a_kit a2a_kit_size_32 a2a_default_style">
                  <a className="a2a_dd" href="https://www.addtoany.com/share"></a>
                  <a className="a2a_button_facebook"></a>
                  <a className="a2a_button_twitter"></a>
                  <a className="a2a_button_email"></a>
                </div>
                <Helmet>
                  <script async src="https://static.addtoany.com/menu/page.js"></script>
                </Helmet>
                {/* <!-- AddToAny END --> */}
              </div>
              {/* post thumb */}
              <div className="position-relative mb-5">
                <img src={blogData?.img} alt="post thumb" className="img-fluid w-100" />
                <div className="card-type hover-ripple">Article</div>
              </div>

              <div dangerouslySetInnerHTML={createMarkup(blogData?.content)}></div>

            </div>
            {/* sidebar */}
            <aside className="col-12 col-lg-4">
              {/* latest post */}
              <h4 className=" fs-3">Latest Articles</h4>
              <div className="bg-white p-2 p-lg-3 border">
                {/* post-item */}
                {blogDatas?.map((blog, index) => {
                  return (
                    <Link to={"/blog/" + blog?.slug} key={index} className="media d-flex mb-2">
                      <img className="me-3 mini-blog-image" src={blog?.img} alt="post-thumb" />
                      <div className="media-body">
                        <p className="mt-0 fs-6 lh-sm">
                          {blog.title}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
