import Collapse from "react-bootstrap/Collapse";
import NavRecentBlogs from "pages/static/pages/Blog/NavRecentBlogs";
import { NavLink } from "react-router-dom";
import { IconButton } from "@mui/material";

export const MegaMenu = ({ data }) => {
  return (
    <>
      <Collapse in={data?.state} dimension="height" id="solutionsCollapse" className={`collapse${data?.id} menu-content border-top border-bottom p-absolute bg-white w-100`} style={{ zIndex: 200 }}>
        <div className="bg-white">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-8">
                <div className="container-fluid py-4">
                  <h6 className="text-darkprime">{data?.title}</h6>
                  <ul className="row row-cols-2 g-3">
                    {data?.links.map((link, index) => {
                      return (
                        <div className="col" key={index}>
                          <li className="link-list-item">
                            <div>
                              <NavLink to={link?.path}>
                                <h5 className="text-darkprime hover-primary fw-semibold">
                                  {link?.name}{" "}
                                  <IconButton className="p-0 text-darkprime">
                                    <i className="bi bi-arrow-right-circle"></i>
                                  </IconButton>
                                </h5>
                              </NavLink>
                              <p>{link?.description}</p>
                            </div>
                          </li>
                        </div>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="col">
                <div className="bg-light my-2 rounded-4 border">
                  <NavRecentBlogs />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Collapse>
    </>
  );
};
