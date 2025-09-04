import { apiAuth } from "api";
import React from "react";
import { Avatar, Button } from "@mui/material";
import { useGlobalContext } from "global/context";
import { useOutletContext } from "react-router-dom";
import { InsertPhotoOutlined, UploadTwoTone } from "@mui/icons-material";
import useError from "hooks/useError";
import { imgCompressor } from "hooks/useImgCompressor";
import { toast } from "react-toastify";
import { IconButton } from "@mui/joy";

const EditProfilePic = () => {
  const { token } = useGlobalContext();
  const { fullDetails, fetchDetails } = useOutletContext();
  const [profile, setProfile] = React.useState("");
  const { ErrorResponder } = useError();
  // Profile Photo upload
  async function uploadPhoto(e) {
    e.preventDefault();
    toast.loading("Updating....");
    if (profile?.size && profile.size < 5169186) {
      const formData = new FormData();
      formData.append("file", profile);
      if (token) {
        try {
          const res = await apiAuth.put(
            `/student/profile?update_type=profile_pic`,
            formData,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          if (res.status === 200) {
            fetchDetails();
            toast.dismiss();
            toast.success(res.data.message);
          }
        } catch (error) {
          ErrorResponder(error);
        }
      } else {
        toast.dismiss();
      }
    } else if (profile.size >= 5169186) {
      toast.dismiss();
      toast.warning("Max 5mb is allowed");
    } else {
      toast.dismiss();
      toast.warning("Image not selected!");
    }
  }
  return (
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
            alt=""
            name="profilepic"
            className="rounded ms-0"
            src={profile ? URL.createObjectURL(profile) : fullDetails?.profile}
            sx={{ width: 80, height: 80 }}
          />
          <div className="d-flex align-items-center justify-content-start">
            <IconButton
              color="success"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                name="profile"
                accept=".png, .jpg, .jpeg"
                type="file"
                onChange={(e) => setProfile(imgCompressor(e.target.files[0]))}
              />
              <InsertPhotoOutlined />
            </IconButton>
            <Button
              startIcon={<UploadTwoTone />}
              color="success"
              variant="outlined"
              className="ms-2 rounded-3"
              size="large"
              type="submit"
            >
              Upload Profile Pic
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePic;
