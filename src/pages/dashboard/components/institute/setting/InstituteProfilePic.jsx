import { Avatar, Divider } from "@mui/material";
import { apiAuth } from "api";
import IconButton from "@mui/joy/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import React from "react";
import { useOutletContext } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import { useGlobalContext } from "global/context";
import useError from "hooks/useError";
import { Popup } from "utils/Popup";
import { toast } from "react-toastify";
import { InsertPhotoOutlined } from "@mui/icons-material";

const InstituteProfilePic = () => {
  const { ErrorResponder } = useError();
  const { token } = useGlobalContext();
  const [details] = useOutletContext();
  const [profile, setProfile] = React.useState(null);
  const profileValidate = (e) => {
    if (e.target?.files[0]?.size < 5000000) {
      setProfile(e.target.files[0]);
    } else {
      if (e.target?.files[0]) {
        e.target.value = null;
        Popup("warning", "Exceed Logo size Limit!! \n Size Limit : 5 MB ");
      }
    }
  };
  // Profile Photo upload
  async function uploadPhoto(e) {
    e.preventDefault();
    toast.loading("Please wait...");
    const formData = new FormData();
    formData.append("file", profile);
    if (token) {
      try {
        const res = await apiAuth.put(
          `/institute/profile?update_type=logo`,
          formData,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (res.status === 200) {
          toast.dismiss();
          toast.success(res.data.message);
        }
      } catch (error) {
        ErrorResponder(error);
      }
    }
  }
  return (
    <>
      <div className="row row-cols-1 row-cols-lg-2 mb-3 g-2">
        <div className="col">
          <h6>Profile Picture</h6>
        </div>
        <div className="col">
          <form
            onSubmit={uploadPhoto}
            className="d-flex align-items-center justify-content-between"
          >
            <Avatar
              alt="profile"
              name="profilepic"
              className="rounded"
              src={profile ? URL.createObjectURL(profile) : details?.logo}
              sx={{ width: 80, height: 80 }}
            />
            <div className="d-flex align-items-center justify-content-start">
              <IconButton color="success" size="lg" component="label">
                <input
                  hidden
                  name="profile"
                  accept=".png, .jpg, .jpeg"
                  type="file"
                  onChange={profileValidate}
                />
                <InsertPhotoOutlined />
              </IconButton>
              <button
                className="btn btn-outline-success ms-1 rounded-3 fw-semibold"
                type="submit"
              >
                Upload Logo
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default InstituteProfilePic;
