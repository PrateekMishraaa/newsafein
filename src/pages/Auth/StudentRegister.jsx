import { api } from "api";
import BreadCrumb from "layout/BreadCrumb";
import { Popup } from "utils/Popup";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css/pagination";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { FormatQuote, LocationOn } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { UserRegisterForm } from "components/auth";
const styles = {
  title: {
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  },
};
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const TestimonialCard = () => {
  return (
    <Card className="bg-asteriod-gray rounded-4 text-white p-2 p-lg-3 h-100">
      <CardContent>
        {/* <Typography variant="body2" className="text-white fs-4 lh-sm font-ubd">
          {content?.content}
          <FormatQuoteTwoToneIcon className="fs-1 text-primary" />
        </Typography> */}
        <iframe className="d-block" height="300" style={{ width: "100%" }} src="https://www.youtube.com/embed/DIxr7CrdGxA" title="pramod sawant g20" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </CardContent>
      {/* <CardActions>
        <List
          className="ps-0 p-0 row"
          sx={{
            width: "100%",
          }}
        >
          <ListItem className="col">
            <ListItemAvatar>
              <Avatar
                sx={{ backgroundColor: "orange", height: 55, width: 55 }}
                src={`${process.env.REACT_APP_API_BASE_URL}${content.img}`}
              >
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              className="text-white"
              primary={
                <span className="fs-5 font-ubd ms-2">{content?.name}</span>
              }
            // secondary={content?.subinfo}
            />
          </ListItem>
        </List>
      </CardActions> */}
    </Card>
  );
};

const StudentRegister = () => {
  // const [youthTestimonials, setYouthTestimonials] = useState([]);
  // const fetchYouths = async () => {
  //   try {
  //     const res = await getYouthGallery();
  //     setYouthTestimonials(res.data.resources);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
  let query = useQuery();
  const navigate = useNavigate();
  let collegeId = query.get("collegeId");
  const [details, setDetails] = useState({});
  const fetchCollegeDetails = async () => {
    try {
      const res = await api.get(`/public/institute?collegeId=${collegeId}`);
      console.log("response", res);
      if (res.status === 200) {
        setDetails(res.data.result[0]);
      } else if (res.status === 404) {
        toast.error("Invalid Url College not Found");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("OOps something went wrong");
      navigate("/404");
    }
  };
  useEffect(() => {
    // fetchYouths();
    if (!collegeId) {
      Popup("error", "Invalid link");
    } else {
      fetchCollegeDetails();
    }
  }, []);

  return (
    <div>
      <BreadCrumb heading={details?.institution_name} />
      <div className="container">
        <div className="d-flex justify-content-start flex-column flex-lg-row">
          <div className=" p-3">
            <img
              src={details?.logo && details?.logo !== "" ? process.env.REACT_APP_API_BASE_URL + details.logo : "/images/icons/university.png"}
              alt="Logo"
              className="p-3 shadow border border-3 rounded-4"
              style={{
                width: "180px",
                height: "180px",
                objectFit: "contain",
              }}
            />
          </div>
          <div className=" p-3">
            <div>
              <h3>{details?.institution_name}</h3>
              <div className="d-flex align-items-center">
                <Avatar sx={{ backgroundColor: "lightgrey", my: 1, me: 3 }}>
                  <LocationOn sx={{ color: "black" }} />
                </Avatar>
                {console.log("detals", details)}
                <span className="px-3 text-dark font-ubd ">
                  {details?.institution_address}, {details?.state} {details?.pincode}
                </span>
              </div>
              <p>{details?.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid py-5">
        <div className="h-100 border">
          {/* <!-- ========== Start Login ========== --> */}
          <div className="row row-cols-1 row-cols-lg-2">
            <div className="col" style={styles.title}>
              <div className="bg-light h-100 rounded-4 d-flex flex-column justify-content-center">
                <div className="container p-2 p-md-3 p-lg-4">
                  <h3 className="fs-2">Hi Student!!!!</h3>
                  <h3 className="fs-3">Welcome to the world of leadership, ideas and diplomacy.</h3>
                  <span className="fs-6 lh-sm">In order to register for the Yuvamanthan Model G20 Summit in your institution, please fill in the details and follow the steps. You will be asked some questions and there is a small e-module we have created to tell you more about G20 which will come as the next steps. Make sure you complete the e-module and you will be ready to participate!</span>
                  <hr />
                  {/* Testimonial Swiper  */}
                  <div>
                    <Swiper spaceBetween={20} slidesPerView={1} pagination={true} modules={[Pagination]} className="mySwiper w-100 pb-4">
                      <SwiperSlide className="p-2 bg-light">
                        <TestimonialCard />
                      </SwiperSlide>
                    </Swiper>
                    <blockquote>
                      <p>
                        <FormatQuote sx={{ rotate: "180deg", marginBottom: 1 }} />
                        Pramod Sawant, Chief Minister, Goa is inviting you to participate in YMG20. <FormatQuote />
                      </p>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <UserRegisterForm collegeId={collegeId} />
            </div>
          </div>

          {/* <!-- ========== End Login ========== --> */}
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
