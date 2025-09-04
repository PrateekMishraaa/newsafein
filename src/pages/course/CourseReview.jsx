import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Badge from "@mui/material/Badge";
import { Avatar } from "@mui/material";
import { useGlobalContext } from "global/context";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { apiAuth, apiJsonAuth } from "api";
import Typography from "@mui/material/Typography";
import moment from "moment";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const CourseReview = ({ courseId }) => {
  const { userData, token } = useGlobalContext();
  const [value, setValue] = React.useState(0);
  const [reviews, setReviews] = React.useState([]);
  const [hover, setHover] = React.useState(-1);
  const [reviewCount, setReviewCount] = React.useState(2);
  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };
  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }
  const fetchReview = async () => {
    if (courseId && token) {
      const reviewData = await apiJsonAuth.get(`/course/review?courseId=${courseId}`, {
        headers: {
          Authorization: token,
        },
      });
      setReviews(reviewData.data.message);
    }
  };
  useEffect(() => {
    fetchReview();
  }, [courseId, token]);

  // Bsic Formik
  const Formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: async (values, { resetForm }) => {
      Swal.fire({
        width: 300,
        title: "Loading...",
        didOpen: () => {
          Swal.showLoading();
        },
       
      }
      );
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("rating", value);
      formData.append("courseId", courseId);
      formData.append("userId", userData?.id);
      try {
        const res = await apiAuth.post(`/course/review`, formData, {
          headers: {
            Authorization: token,
          },
        });
        if (res.status === 200) {
          Swal.fire({
            title: res.data.message,
            icon: "success",
            width: 400,
          });
          resetForm();
      fetchReview()

        }
      } catch (error) {
        if (error) {
          if (error.response.status === 409) {
            Swal.fire({
              width: 400,
              title: error.response.data.message ? error.response.data.message : "Something Went Wrong Check  your Network Connection",
              icon: "warning",
            });
          } else {
            Swal.fire({
              width: 400,
              title: error.response.data.message ? error.response.data.message : "Something Went Wrong Check  your Network Connection",
              icon: "error",
            });
          }
        }
      }
    },
  });
  return (
    <div>
      {/* Review Form  */}
      <div className="container-fluid p-0">
        <form onSubmit={Formik.handleSubmit}>
          <div className="align-items-start">
            <div className="">
              <TextField
                fullWidth
                variant="outlined"
                color="warning"
                id="title"
                name="title"
                label="Title"
                value={Formik.values.title}
                onChange={Formik.handleChange}
                error={Formik.touched.title && Boolean(Formik.errors.title)}
                required
              />
              <TextField
                fullWidth
                variant="outlined"
                color="warning"
                id="description"
                name="description"
                label="Write a Review for Course"
                value={Formik.values.description}
                onChange={Formik.handleChange}
                error={Formik.touched.description && Boolean(Formik.errors.description)}
                className="mt-2"
                multiline
                rows={4}
                required
              />
            </div>
            <div className="d-flex align-items-center">
              <div className="p-2">
                <StyledBadge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot">
                  <Avatar
                    alt={userData?.email}
                    src={process.env.REACT_APP_API_BASE_URL + userData?.profile}
                    sx={{ width: 46, height: 46, background: "orange" }}
                    className="shadow-lg"
                  />
                </StyledBadge>
              </div>
              <div className="p-2">
                <Box
                  sx={{
                    width: 300,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Rating
                    name="hover-feedback"
                    value={value}
                    precision={1}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                  />
                  {value !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
                </Box>
              </div>
            </div>
          </div>
          <Button variant="contained" color="warning" className="mt-3" type="submit">
            Submit
          </Button>
        </form>
      </div>
      {/* Reviews Grid  */}

      {/* Student Reviews */}
      {reviews.length > 0 && (
        <div className="container StudentReviews pt-5">
          <h4 sx={{ alineText: "center", borderBottom: 1 }}>
             Reviews <span>[{reviews.length}]</span>
          </h4>
          <div>
            {reviews.slice(0, reviewCount).map((rws) => {
              return (
                <Card sx={{ my: 2, pt: 2 }} className="border rounded-3">
                  <Typography variant="body2" color="text.secondary" sx={{ mx: 5, mb: 2 }}>
                    <h6>{rws.title}</h6>
                    <p className="fs-6">{rws.description}</p>
                    {rws?.created_at && moment(rws?.created_at).startOf("min").fromNow()}
                  </Typography>
                  <Rating
                    sx={{ mx: 5 }}
                    name="text-feedback"
                    value={rws.rating}
                    readOnly
                    precision={0.5}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                  />
                  <div className="px-3">
                    <CardHeader
                      sx={{ borderRadius: 3 }}
                      avatar={
                        <Avatar src={process.env.REACT_APP_API_BASE_URL + rws?.profile} sx={{ bgcolor: "skyblue" }}>
                          {/* {rws.title[0]} */}
                        </Avatar>
                      }
                      title={rws?.first_name + " " + rws?.last_name}
                      subheader={
                        <div>
                          <span>{rws?.institution_name}</span>
                        </div>
                      }
                    />
                  </div>
                </Card>
              );
            })}
            {reviewCount < reviews.length && (
              <Button
                onClick={() => {
                  setReviewCount(reviews.length - reviewCount < 20 ? reviews.length : reviewCount + 20);
                }}
              >
                More...
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseReview;
