import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { apiJson } from 'api';
import { useGlobalContext } from 'global/context';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { pop2 } from 'utils/Popup';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const YuvaLoginModal = () => {
    const { setUser, setToken } = useGlobalContext();
    const [loading, setLoading] = useState(false);
    const [submitState, setSubmitState] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleClickShowPassword = (setState) => setState((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            setSubmitState(true);
            const res = await apiJson.post(`auth/login/yuva`, {
                identifier: email,
                password,
            });
            if (res) {
                setSubmitState(false)
            }
            switch (res?.data?.status) {
                case "success":
                    setUser(res.data.user);
                    setToken(res.data.jwt);
                    window.location.replace("/dashboard/");
                    break;
                case "error":
                    pop2.error({ title: "Error while logging In", description: res?.data?.message, timer: 2000 });
                    break;
                case "warning":
                    console.log("Warning");
                    toast.warning(res?.data?.message);
                    break;
                case "OTP":
                    toast.dismiss();
                    toast.success(res?.data?.message);
                    break;

            }
            setLoading(false)
        } catch (error) {
            setSubmitState(false)
            if (error) {
                toast.error();
                toast.warning("Login failed please try again later");
                setLoading(false)
            }
        }
    };
    return (
        <div className="modal fade" id="yuvaModalLogin" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Login with Yuvamanthan</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handlesubmit} className="login-card container py-2">
                            <div className="mb-3">
                                <TextField
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    label="Enter your Yuvamanthan Email ID"
                                    fullWidth
                                    required
                                />
                            </div>
                            <div className="mb-1">
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        name="password"
                                        required
                                        label="Enter Yuvamanthan Password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => handleClickShowPassword(setShowPassword)}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </div>
                            <div className="mt-3 text-center">
                                <Button
                                    disabled={submitState}
                                    type="submit"
                                    name="login-btn"
                                    id="login-btn"
                                    color="warning"
                                    className={submitState ? "rounded-3 bg-success" : "rounded-3"}
                                    variant="contained"
                                    fullWidth
                                    sx={{ mt: 3, py: 2 }}
                                >
                                    {submitState ? <div className="d-flex justify-content-around text-light"> <div class="spinner-border" role="status">
                                        <span class="visually-hidden">loading...</span>
                                    </div><span className="text-light mx-3 text-capitalize">Logging...</span> </div> : "Login"}
                                </Button>
                            </div>
                            <div className="text-center mt-4">
                                <Link
                                    to={`/forget-password`}
                                    //   state={{ type: usertype }}
                                    className="text-end w-100"
                                >
                                    Forgot Password ?
                                </Link>{" "}
                                <br />
                                {
                                    <>
                                        <span className="font-ubd text-initial">
                                            Do not have an account yet?{" "}
                                            <a href="/registration" className="text-end w-100 fw-bold" >
                                                Register
                                            </a>
                                        </span>
                                    </>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default YuvaLoginModal