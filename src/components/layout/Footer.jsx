import { useGlobalContext } from "global/context";
import React from "react";
import * as yup from "yup";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Widget from "../../layout/whatsapp/Widget";
import { apiJson } from "api";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { pop2 } from "../../utils/Popup";

export const Footer = () => {
  const { token } = useGlobalContext();
  var CurrentYear = new Date().getFullYear();
  var NextYear = new Date().getFullYear() + 1;
  const copydate = CurrentYear + " ~ " + NextYear;
  const { pathname } = useLocation();
  const validationSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values, action) => {
      const responce = await apiJson.post("/public/newsletter", { ...values, type: "newsletter" });
      switch (responce?.data?.status) {
        case "success":
          toast.dismiss("");
          pop2.success({ title: "Thank You", description: "Your subscription to our newsletter is active now. Through the Safeinschool monthly newsletter, you will receive our latest updates, news, views and more. You can unsubscribe any time by clicking on the ‘unsubscribe’ link on the newsletter.", timer: 3000 });
          action.resetForm();
          break;
        case "warning":
          toast.dismiss("");
          toast.warning(responce?.data?.message);
          break;
        case "error":
          toast.dismiss("");
          toast.error(responce?.data?.message);
          break;
      }
    },
  });
  return (
    <footer className="mb-5 mb-sm-0">
      {/* main footer */}
      <div className={`py-5 bg-darkprime border-top ${token || pathname == "/login" ? "d-none" : ""}`}>
        <div className="container">
          <div className="row justify-content-between">
            {/* footer content */}
            <div className="col-lg-5 mb-5 mb-lg-0">
              {/* logo */}
              <Link to={"/"}>
                <img
                  className="img-responsive"
                  style={{
                    maxWidth: "150px",
                    objectFit: "contain",
                  }}
                  src={"/logo.png"}
                  alt="Safeinschool"
                />
              </Link>
              <p className="text-white mb-1 lh-sm mt-4">
                SafeInSchool Learning is a one-stop junction for topics, training, resources and guidance on aspects of school safety created by school-system leaders for the K-12 community.
                <br />
                It is already the platform of choice in thousands of schools. We have tie-ups with chains of schools across India and are already training millions of students, staff and parents through our solutions.
              </p>
              <h4 className="text-white my-2">Follow Us On</h4>
              {/* social links */}
              <ul className="list-inline social-icon-alt">
                <li className="list-inline-item">
                  <a className="hover-ripple border-secondary" target={"_blank"} href="https://www.facebook.com/profile.php?id=100089167461647&mibextid=ZbWKwL">
                    <i className="bi bi-facebook text-white"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="hover-ripple border-secondary" target={"_blank"} href="https://www.instagram.com/yuvamanthan_org/">
                    <i className="bi bi-instagram text-white"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="hover-ripple border-secondary" target={"_blank"} href="https://twitter.com/Yuvamanthan_org">
                    <i className="bi bi-twitter text-white"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="hover-ripple border-secondary" target={"_blank"} href="https://www.linkedin.com/in/yuva-manthan-09aa2025b/">
                    <i className="bi bi-linkedin text-white"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="hover-ripple border-secondary" target={"_blank"} href="https://pin.it/1HUmny3">
                    <i className="bi bi-pinterest text-white"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="hover-ripple border-secondary" target={"_blank"} href="https://www.snapchat.com/add/yuvamanthan?sender_web_id=cc1dcfed-7ef4-4996-9c78-6d5df3acdee6&device_type=desktop&is_copy_url=true">
                    <i className="bi bi-snapchat text-white"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a className="hover-ripple border-secondary" target={"_blank"} href="https://www.youtube.com/@safeinschool">
                    <i className="bi bi-youtube text-white"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-6">
              <div className="row">
                {/* service list */}
                <div className="col-12 col-md-6 mb-5">
                  <h4 className="text-white mb-4">Community</h4>
                  <ul className="list-styled">
                    <li className="mb-2">
                      <a className="text-white d-block" href="/learning">
                        SIS Learning
                      </a>
                    </li>
                    <li className="mb-2">
                      <a className="text-white d-block" href="/compliance">
                        SIS Compliance
                      </a>
                    </li>
                    <li className="mb-2">
                      <a className="text-white d-block" href="/certification">
                        SIS Certifications
                      </a>
                    </li>
                  </ul>
                </div>
                {/* contact info */}
                <div className="col-12 col-md-6 mb-5">
                  <a href="/contactus">
                    <h4 className="text-white mb-4">Contact Us</h4>
                  </a>
                  <ul className="list-unstyled">
                    <li className="text-white mb-3">A 92 (First Floor) South Extension Part II New Delhi- 110049</li>
                    <a href="tel:+919560771911." className="text-white mb-3">
                      +91 95607 71911
                    </a>
                    <br />
                    <a href="mailto:hello@safeinschool.in" className="text-white mb-3">
                      help@safeinschool.in
                    </a>
                  </ul>
                </div>
                {/* newsletter */}
                <div className="col-12">
                  <h4 className="text-white mb-4">Subscribe to our newsletter</h4>
                  <form onSubmit={formik.handleSubmit} className="col-12 col-lg-8">
                    <div className="input-group">
                      <input type="email" className="form-control h-100 text-black bg-white border" id="email" name="email" value={formik?.values?.email} onChange={formik.handleChange} placeholder="Enter your email" />
                      <button type="submit" className="btn btn-primary border-0">
                        Subscribe
                      </button>
                    </div>
                  </form>
                </div>
                {/* Useful links */}
                <div className="col-6">
                  <h4 className="text-white mt-5 mb-2">Resources</h4>
                  <ul className="ps-0">
                    <li>
                      <a href="/press-and-media" className="text-white">
                        Press Release
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-6">
                  <h4 className="text-white mt-5 mb-2">Company</h4>
                  <ul className="ps-0">
                    <Link className="text-white" to="/terms-conditions">
                      Terms & Conditions
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* copyright */}
      <div className="bg-secondary-darken py-3">
        <div className="container">
          <div className="row">
            <div className=" text-center text-md-left mb-3 mb-md-0">
              <p className="mb-0 text-white fs-6">
                <span className="text-primary fs-6">safeinschool</span> &copy; {copydate} All Rights Reserved |{" "}
                <a href="https://nasp.in" target="_blank">
                  <i className="bi bi-cloud-fill"></i> Glcloud
                </a>
              </p>
            </div>
            {/* <div className="col-md-6 text-center text-md-right">
              <ul className="list-inline">
                <li className="list-inline-item mx-0">
                  <a
                    className="d-inline-block px-3 text-white border-right"
                    href="terms-conditions.html"
                  >
                    Terms of Service
                  </a>
                </li>
                <li className="list-inline-item mx-0">
                  <a
                    className="d-inline-block px-3 text-white"
                    href="privacy-policy.html"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
      <Widget />
    </footer>
  );
};
