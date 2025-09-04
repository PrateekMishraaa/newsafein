import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FormControl from "@mui/material/FormControl";
import { toast } from "react-toastify";
import { apiAuth } from "api";
import { FormHelperText, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import Swal from "sweetalert2";
import { useGlobalContext } from "global/context";
import useError from "hooks/useError";
import SimpleBreadCrumb from "components/ui/breadcrumb/SimpleBreadCrumb";
import * as Yup from "yup";


const EditPassword = () => {
  const validationSchema = Yup.object({
    oldpassword: Yup.string()
      .required("Old Password is required"),
    password: Yup.string()
      .required("New Password is required")
      .min(8, "New Password must be at least 8 characters")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
        "New Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm New Password is required"),
  });


  const { ErrorResponder } = useError();
  const { userData, token } = useGlobalContext();
  // password eye
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickShowPassword = (setState) => setState((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //Reset Password
  const passwordformik = useFormik({
    initialValues: {
      oldpassword: "",
      password: "",
      confirm_password: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      toast.loading();
      toast.dismiss();
      toast.loading("Updating Password please wait.");
      // toast.loading("Changing Password");
      const formData = new FormData();
      formData.append("password", values.oldpassword);
      formData.append("newpassword", values.password);
      formData.append("type", userData.type);
      formData.append("email", userData.email);
      if (token) {
        try {
          const res = await apiAuth.post(`/auth/changepassword?id=${userData.id}`, formData, {
            headers: {
              Authorization: token,
            },
          });
          if (res.status === 200) {
            toast.dismiss();
            toast.success("Password Changed Successfully");
            resetForm();
          }
        } catch (error) {
          ErrorResponder(error);
        }
      }
      resetForm()
    },
  });
  return (
    <>
      <form onSubmit={passwordformik.handleSubmit}>
        <div className="row gy-4">
          <div className="col-12 col-lg-6">
            <h6>Change Account Password</h6>
          </div>
          <div className="col-12 col-lg-6">
            <div className="row g-3">
              <div className="col-12">
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">Old Password</InputLabel>
                  <OutlinedInput
                    id="oldpassword"
                    label="Old Password"
                    name="oldpassword"
                    type={showOldPassword ? "text" : "password"}
                    value={passwordformik.values.oldpassword}
                    onChange={passwordformik.handleChange}
                    error={passwordformik.touched.oldpassword && Boolean(passwordformik.errors.oldpassword)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={() => handleClickShowPassword(setShowOldPassword)} onMouseDown={handleMouseDownPassword} edge="end">
                          {showOldPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText className="text-danger">{passwordformik.touched.oldpassword && passwordformik.errors.oldpassword}</FormHelperText>
                </FormControl>
              </div>
              <div className="col-12">
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={passwordformik.values.password}
                    onChange={passwordformik.handleChange}
                    error={passwordformik.touched.password && Boolean(passwordformik.errors.password)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={() => handleClickShowPassword(setShowPassword)} onMouseDown={handleMouseDownPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText className="text-danger">{passwordformik.touched.password && passwordformik.errors.password}</FormHelperText>
                </FormControl>
              </div>
              <div className="col-12">
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                  <OutlinedInput
                    id="confirm_password"
                    name="confirm_password"
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordformik.values.confirm_password}
                    onChange={passwordformik.handleChange}
                    error={passwordformik.touched.confirm_password && Boolean(passwordformik.errors.confirm_password)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={() => handleClickShowPassword(setShowConfirmPassword)} onMouseDown={handleMouseDownPassword} edge="end">
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText className="text-danger">{passwordformik.touched.confirm_password && passwordformik.errors.confirm_password}</FormHelperText>
                </FormControl>
              </div>
              <div className="col-12">
                <Button color="warning" variant="contained" className="py-3" size="large" fullWidth type="submit">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default EditPassword;
