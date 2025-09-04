import { ArrowCircleLeftOutlined, ArrowCircleRightOutlined } from "@mui/icons-material";
import React from "react";

const QuotesCarouselCard = ({ quote, quoteIndex }) => {
  return (
    <div className={`carousel-item h-100 ${quoteIndex == 0 && "active"}`}>
      <div className="row h-100 bg-white rounded-4">
        <div className="col-8">
          <div className="d-flex align-items-center justify-content-center h-100 px-3 quote-icn">
            <div className="text-center">
              <span className="text-dark fs-5 lh-sm d-inline">{quote?.quote}</span>
              <span className="d-block">- {quote?.quoteBy}</span>
            </div>
          </div>
        </div>
        <div className="col-4">
          <img src={quote?.img || "http://glcloud.in/uploads/safeinschool/public/65017f77266f9.png"} alt={quote?.quoteBy} className="w-100 h-100 border-end" style={{ objectFit: "cover" }} />
        </div>
      </div>
    </div>
  );
};

export const QuotesCarousel = ({ quoteData }) => {
  return (
    <div id="carouselExampleControls" className="carousel slide h-100 d-none d-lg-block border rounded-3" data-bs-ride="carousel" style={{ overflow: "hidden" }}>
      <div className="carousel-inner h-100">
        {quoteData?.map((quote, quoteIndex) => (
          <QuotesCarouselCard key={quoteIndex} quote={quote} quoteIndex={quoteIndex} />
        ))}
      </div>
      <button className="carousel-control-prev show-hover" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <ArrowCircleLeftOutlined sx={{ color: "green", fontSize: 40 }} />
        <span className="visually-hidden">Prev</span>
      </button>
      <button className="carousel-control-next show-hover" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <ArrowCircleRightOutlined sx={{ color: "green", fontSize: 40 }} />
        <span className="visually-hidden ">Next</span>
      </button>
    </div>
  );
};
