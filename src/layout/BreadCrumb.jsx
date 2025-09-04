import { Button } from "@mui/material";
import { useGlobalContext } from "global/context";
import React from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";

const BreadCrumb = ({ heading, image, link }) => {
  const route = useLocation().pathname;
  const { token } = useGlobalContext();
  const routeArr = route.split("/");
  let Image = image ? image : `/images/backgrounds/g20.jpg`;
  return (
    <>
      <Helmet>
        <title>{heading}</title>
        <link rel="canonical" href={"https://www.yuvamanthan.org" + route} />
      </Helmet>
      <section
        className="section breadcrumb"
        style={{
          // background: `url(${process.env.REACT_APP_MAIN_URL}images/backgrounds/g20.jpg) no-repeat center`,
          background: `url(${Image}) no-repeat center`,
          backgroundSize: "cover",
          boxShadow: "inset 0 0 0 2000px rgba(8, 8, 8, 0.618)",
        }}
      >
        <div className="container pt-2 pt-sm-3 pt-md-4 pt-lg-5 mb-0">
          <div className="row">
            <div className="col-lg-8">
              <h2 className="text-white mb-3 text-initial">{heading}</h2>
              {/* <!-- breadcrumb --> */}
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-transparent p-0">
                  {routeArr.map((rout, index) => {
                    return index === 0 ? (
                      <li key={index} className="breadcrumb-item font-weight-semebold">
                        <Link className="text-white" to="/">
                          Home
                        </Link>
                      </li>
                    ) : (
                      <li key={index} className="breadcrumb-item font-weight-semebold">
                        <Link className="text-white text-uppercase" to={"/" + rout}>
                          {rout}
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              </nav>
              {link && !token ? (
                <Link to={link}>
                  <Button size="large" variant="contained" color="warning"  className="text-capitalize rounded-3 py-3 px-4">
                    Register Now
                  </Button>
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BreadCrumb;
