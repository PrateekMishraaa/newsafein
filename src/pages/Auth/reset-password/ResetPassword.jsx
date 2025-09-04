import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Button, TextField } from "@mui/material";
import { Popup } from "utils/Popup";
import { apiJson } from "api";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const validationSchema = yup.object({
        newPassword: yup
            .string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });
    const Formik = useFormik({
        initialValues: {
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, action) => {
            console.log("Formik Data: ", values);
            console.log("Token Data: ", token);
            try {
                Popup("loading", "Processing your request");
                const res = await apiJson.post(`auth/update-password`, {
                    password: Formik.values.newPassword,
                    token: token,
                });
                console.log(res);
                if (res?.status == 200) {
                    Popup("success", res.data.message);
                    navigate('/login');
                }
                // }
            } catch (error) {
                console.log(error);
                Popup("error", error.response.data.message);
            }
        }
    });
    return (
        <div className="py-5 position-relative bg-light min-vh-100" style={{ zIndex: 10 }}>
            <div className="container border rounded rounded-4 p-3 p-lg-4 shadow-sm bg-white" style={{ maxWidth: "450px" }}>
                <form onSubmit={Formik.handleSubmit}>
                    <div className="form-action-wrapper text-center py-3 py-lg-4">
                        <div className="form-group">
                            <h4 className=" fs-2 fw-bold">
                                Reset Password
                            </h4>
                            <div className="divider">
                                <span />
                            </div>
                            <p className="pt-3">
                                Please enter your new password below to reset your password and gain access to your account.
                            </p>
                        </div>
                        <div className="form-group ">
                            {/* <label className="fs-14 text-black fw-medium lh-18">Email</label> */}
                            <TextField
                                fullWidth
                                placeholder="Your New Password"
                                label={"New Password"}
                                id="newPassword"
                                name="newPassword"
                                type={"password"}
                                value={Formik.values.newPassword}
                                onChange={Formik.handleChange}
                                error={
                                    Formik.touched.newPassword &&
                                    Boolean(Formik.errors.newPassword)
                                }
                                helperText={
                                    Formik.touched.newPassword && Formik.errors.newPassword
                                }
                            />
                        </div>
                        {/* end form-group */}
                        <div className="form-group mt-3">
                            {/* <label className="fs-14 text-black fw-medium lh-18">Email</label> */}
                            <TextField
                                fullWidth
                                placeholder="Your Confirm Password"
                                label={"Confirm Password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                type={"password"}
                                value={Formik.values.confirmPassword}
                                onChange={Formik.handleChange}
                                error={
                                    Formik.touched.confirmPassword &&
                                    Boolean(Formik.errors.confirmPassword)
                                }
                                helperText={
                                    Formik.touched.confirmPassword && Formik.errors.confirmPassword
                                }
                            />
                        </div>
                        {/* end form-group */}
                        <div className="form-group mt-3">
                            <Button
                                variant="outlined"
                                color="warning"
                                id="send-message-btn"
                                size="large"
                                className="w-100 py-3 rounded-3"
                                type="submit"
                            >
                                Update Password{" "}
                                <i className="la la-arrow-right icon ml-1" />
                            </Button>
                        </div>
                        {/* end form-group */}
                    </div>
                    {/* end row */}
                </form>
                <p className="text-center">
                    <Link to="/login" className="text-primary">
                        Return to log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;
