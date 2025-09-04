import { apiJson } from 'api';
import axios from 'axios';
import React from 'react'
import { Link, NavLink } from 'react-router-dom';

const NavRecentBlogs = () => {
    let [blogData, setBlogData] = React.useState([]);
    const getAllBlogs = async () => {
        try {
            const res = await 
            // apiJson.get("admin/blogs");
            axios.get("http://localhost:3100/api/admin/blogs")
            console.log("blogs",res.data)
            if (res.status === 200) {
                setBlogData(res?.data?.result);
            }
        } catch (error) {

        }
    };
    React.useEffect(() => {
        getAllBlogs();
    }, [])
    return (
        <div className="p-4">
            <div className="d-flex align-items-center justify-content-between">
                <h5 className="text-darkprime">Latest News </h5>
                <NavLink to={"/blog"} className={"mt-2 text-primary"}>
                    <span>Read More <i className="bi bi-arrow-right-circle"></i></span>
                </NavLink>
            </div>
            <div>
                {blogData?.map((blogDetail, blogIndex) => {
                    if (blogIndex < 4)
                        return <Link to={"/blog/" + blogDetail?.slug} className="d-flex align-items-center mt-2" key={blogIndex} >
                            <div>
                                <img src={blogDetail?.img} alt="" className="rounded-3 img-cover" height={60} width={80} />
                            </div>
                            <p className="text-darkprime ps-2 fs-6">
                                {blogDetail?.title}
                            </p>
                        </Link>
                })}
            </div>

        </div>
    )
}

export default NavRecentBlogs