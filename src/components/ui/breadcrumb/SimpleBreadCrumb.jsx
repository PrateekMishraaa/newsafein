import React from "react";

export const SimpleBreadCrumb = ({ page, height, bg }) => {
  return (
    <div className={`${bg ? bg : 'bg-light'} py-2 py-lg-3 border-top border-bottom`}>
      <div className="d-flex align-items-center w-100 justify-content-center" style={{height}}>
        <h3 className="text-dark font-ubd text-center text-capitalize">{page}</h3>
      </div>
    </div>
  );
};
