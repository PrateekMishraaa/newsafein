import { apiAuth, apiJson } from "api";
import { useGlobalContext } from "global/context";
import React, { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import { ButtonBase } from "@mui/material";

const Contact = () => {
  let {adminRoles} = useGlobalContext()
  let [contactData, setContactData] = useState([]);
  let [update, setUpdate] = useState(0);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [contact, setContact] = useState("");

  const getAllContact = async () => {
    try {
      const res = await apiJson.get(`/admin/pagination/contactUs?page=${limit}&offset=${offset}&subject=${contact}`);
      if (res.status === 200) {
        // console.log("All contacts Data: ", res.data);
        setContactData(res?.data);
      }
    } catch (error) {
      console.log("All Contacts Error: ", error);
    }
  };

  const handlePaginationNext = () => {
    let increment = Number(offset) + Number(limit);
    console.log(increment);

    if (increment < contactData?.count) {
      setOffset(increment);
      console.log("Pagination to next page " + offset);
    }
  };

  useEffect(() => {
    getAllContact();
  }, [update, limit, offset, contact]);

  const handlePaginationPrev = () => {
    let decrement = Number(offset) - Number(limit);
    console.log(decrement);

    if (decrement > 0) {
      setOffset(decrement);
      console.log("Pagination to prev page " + offset);
    } else {
      setOffset(0);
    }
  };

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
          const res = await apiAuth.delete("admin/contactus?id=" + id);
          if (res.status === 200) {
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
    <div>
      <div class="d-flex justify-content-between">
        <p>Contact Management</p>
        <select
                name="limit"
                className="form-control pe-2" style={{width: "10rem"}}
                onChange={(e) => setContact(e.target.value)}
              >
                <option value="">Contacts</option>
                <option value="NEWSLETTER">Newsletter</option>
                <option value="query">Other</option>
              </select>
      </div>
      <div class="table-responsive">
        <table class="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">full name</th>
              <th scope="col">subject</th>
              <th scope="col">message</th>
              <th scope="col">contact</th>
              <th scope="col">email</th>
              <th hidden={adminRoles() === 3 || adminRoles() === 5} scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {contactData?.result &&
                contactData?.result?.map((value, index) => {
                  // console.log(value);
                  return(
                    <>
                    <tr>
                    <td scope="col"><span className="line-clamp-blog">{value?.full_name}</span></td>
                    <td scope="col"><span className="line-clamp-blog">{value?.subject}</span></td>
                    <td scope="col"><span className="line-clamp-blog">{value?.message}</span></td>
                    <td scope="col"><span className="line-clamp-blog">{value?.contact}</span></td>
                    <td scope="col"><span className="line-clamp-blog">{value?.email}</span></td>
                    <td hidden = {adminRoles() === 3 || adminRoles() === 5}>
                    <button 
                            type="button"
                            className="btn btn-sm btn-outline-danger rounded"
                            onClick={() => {
                              handleDelete(value?.id);
                            }}
                          >
                            delete
                          </button>
                    </td>
                    </tr>

                    </>
                  )
                } )
              }
              
            </tbody>
        </table>
        <div className="bg-light p-3">
          <div className="d-flex justify-content-between">
            <span className="text-dark">
              Showing {contactData?.result?.length} out of {contactData?.count}
            </span>
            <div className="d-flex align-items-center">
              <select
                name="limit"
                className="form-control pe-2 text-start"
                onChange={(e) => setLimit(e.target.value)}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
              </select>
              <Button
                size="sm"
                variant="outline-primary"
                disabled={Number(offset) < Number(limit) ? true : false}
                onClick={handlePaginationPrev}
                className="text-capitalize h-100 mx-2"
              >
                prev
              </Button>
              <ButtonBase>1</ButtonBase>
              <Button
                size="sm"
                onClick={handlePaginationNext}
                disabled={
                  Number(offset) + Number(limit) + 1 > contactData?.count
                    ? true
                    : false
                }
                variant="outline-primary"
                className="text-capitalize h-100 ms-2"
              >
                next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
 
export default Contact