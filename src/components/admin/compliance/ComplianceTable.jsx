import React, { useEffect, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import moment from "moment";
import { apiJsonAuth } from "api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export const ComplianceTable = ({ reload }) => {
  const [compliances, setCompliances] = useState([]);

  const fetchCompliances = () => {
    apiJsonAuth("/admin/compliance").then((response) => {
      setCompliances(response.data.result);
    });
  };
  const handleDelete = (id) => {
    apiJsonAuth.delete("/admin/compliance/" + id).then((res) => {
      toast.dismiss();
      toast.success("Deleted Successfully");
      fetchCompliances();
    });
  };
  useEffect(() => {
    fetchCompliances();
  }, [reload]);
  return (
    <div className="py-3">
      <div className="table-responsive border rounded-3">
        <table className="table">
          <thead>
            <tr>
              <th>#ID</th>
              <th colSpan={2}>Compliance Name</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {compliances?.map((template) => (
              <tr style={{ cursor: "pointer" }} key={template.id}>
                <td>{template?.id}</td>
                <td colSpan={2}>{template?.title}</td>
                <td>{moment(template?.createdAt).calendar()}</td>
                <td>
                  <div className="d-flex">
                    <Tooltip title="Edit Template" placement="top">
                      <Link to={"/admin/compliance/category/" + template?.id}>
                        <IconButton color="warning">
                          <Edit />
                        </IconButton>
                      </Link>
                    </Tooltip>
                    <Tooltip title="Delete Template" placement="top">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(template.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
