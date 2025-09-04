import {apiAuth, apiJson} from "api";
import React, {useState} from "react";
import {useEffect} from "react";
import moment from "moment";
import {NavLink} from "react-router-dom";
import Swal from "sweetalert2";
import {useGlobalContext} from "global/context";

const News = () => {
  const {adminRoles} = useGlobalContext()
  let [newsData, setNewsData] = useState("");
  let [update, setUpdate] = useState();
  const getAllNews = async () => {
    console.log("Fetching Quites Data ");
    try {
      const res = await apiJson.get("admin/news");
      if (res.status == 200) {
        console.log("All blogs Data: ", res.data.result);
        setNewsData(res?.data?.result);
      }
    } catch (error) {
      console.log("All Quotes Error: ", error);
    }
  };
  useEffect(() => {
    console.log(newsData);
    getAllNews();
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
          const res = await apiAuth.delete("admin/news?id=" + id);
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
            title: error?.response?.data?.message
              ? error?.response?.data?.message
              : "Something Went Wrong Check  your Network Connection",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h4>Manage News</h4>
        <div hidden={!(adminRoles() === 1)}>
          <NavLink to={"/admin/news/add"} className="btn rounded-3">
            Add News
          </NavLink>
        </div>
      </div>
      <div>
        <div class="table-responsive rounded-3">
          <table class="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">img</th>
                <th scope="col">title</th>
                <th scope="col">slug</th>
                <th scope="col">heading</th>
                <th scope="col">content</th>
                <th scope="col">created_at</th>
                <th hidden={adminRoles() === 5} scope="col">actions</th>
              </tr>
            </thead>
            <tbody>
              {newsData[0] &&
                newsData?.map((value, index) => {
                  console.log(value);
                  return (
                    <>
                      <tr>
                        <td scope="col">
                          <img src={value?.img} alt="" width={80} height={80} />
                        </td>
                        <td scope="col">
                          <span className="line-clamp"> {value?.title}</span>
                        </td>
                        <td scope="col">
                          <span className="line-clamp"> {value?.slug}</span>
                        </td>
                        <td scope="col">
                          {" "}
                          <span className="line-clamp"> {value?.heading}</span>
                        </td>
                        <td scope="col">
                          <span className="line-clamp"> {value?.content}</span>
                        </td>
                        <td scope="col">
                          {moment(value?.created_at).fromNow()}
                        </td>
                        <NavLink
                          hidden={adminRoles() === 5}
                          to={`edit/${value.id}`}
                          className="btn bg-success text-white btn-sm rounded w-100 my-1"
                        >
                          Edit
                        </NavLink>
                        <button
                          hidden={adminRoles() === 3 || adminRoles() === 5}
                          type="button"
                          onClick={() => {
                            handleDelete(value?.id);
                          }}
                          className="btn bg-danger text-white btn-sm rounded w-100 my-1"
                        >
                          Delete
                        </button>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default News;
