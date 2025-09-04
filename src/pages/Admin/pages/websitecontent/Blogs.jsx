import { apiAuth, apiJson } from "api";
import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";
import { useGlobalContext } from "global/context";
import axios from "axios";

const Blogs = () => {
  const { adminRoles } = useGlobalContext();
  let [blogData, setBlogData] = useState("");
  let [update, setUpdate] = useState(0);
  const getAllBlogs = async () => {
    try {
      const res = await axios.get("https://www.api.safeinschool.in/admin/blogs"); // testing case 
      // const res = await apiJson.get("admin/blogs");
      if (res.status == 200) {
        // console.log("All blogs Data: ", res.data.result);
        setBlogData(res?.data?.result);
      }
    } catch (error) {
      console.log("All Quotes Error: ", error);
    }
  };
  useEffect(() => {
    // console.log(blogData);
    getAllBlogs();
  }, [update]);

  const handleDelete = async (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You wanted to delete this student!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      console.log(result);
      if (result.isConfirmed) {
        console.log(result);
        try {
          const res = await apiAuth.delete("admin/blogs?id=" + id);
          if (res.status == 200) {
            Swal.fire({
              title: res.data.message,
              icon: "success",
            });
            setUpdate(update + 1);
          }
        } catch (error) {
          Swal.fire({
            width: 400,
            title: error?.response?.data?.message ? error?.response?.data?.message : "Something Went Wrong Check  your Network Connection",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h4>Manage Blogs</h4>
        <div hidden={!(adminRoles() === 1)}>
          <NavLink to={"/admin/blogs/add"} className="btn rounded-3">
            Add Blogs
          </NavLink>
        </div>
      </div>
      <div>
        <div class="table-responsive border rounded-3">
          <table class="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">img</th>
                <th scope="col">title</th>
                <th scope="col">slug</th>
                <th scope="col">created_at</th>
                <th hidden={adminRoles() === 5} scope="col">
                  actions
                </th>
              </tr>
            </thead>
            <tbody>
              {blogData[0] &&
                blogData?.map((value, index) => {
                  // console.log(value);
                  return (
                    <>
                      <tr>
                        <td scope="col">
                          <img src={value?.img} alt="" width={80} height={80} />
                        </td>
                        <td scope="col">
                          <span className="line-clamp-blog">{value?.title}</span>
                        </td>
                        <td scope="col">
                          <span className="line-clamp-blog">{value?.slug}</span>
                        </td>
                        <td scope="col">{moment(value?.createdAt).calendar()}</td>
                        <td hidden={adminRoles() === 5}>
                          <div className="d-flex h-100">
                            <NavLink to={`edit/${value.id}`}>
                              <button className="btn rounded-3 btn-sm btn-outline-dark d-flex me-2" sx={{ backgroundColor: "orange" }}>
                                <i className="bi bi-trash"></i>&nbsp;Edit
                              </button>
                            </NavLink>
                            <button
                              hidden={adminRoles() === 3}
                              type="button"
                              className="btn rounded-3 btn-sm btn-outline-danger rounded d-flex"
                              onClick={() => {
                                handleDelete(value?.id);
                              }}>
                              <i className="bi bi-trash"></i>&nbsp;delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Blogs;