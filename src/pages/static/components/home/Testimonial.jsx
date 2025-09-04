import { ArrowCircleLeftOutlined, ArrowCircleRightOutlined } from "@mui/icons-material";
import React from "react";
const testimonialData = [
  {
    name: "Divya Sharma",
    img: "/img/testimonial2.jpg",
    position: "Teacher",
    text: "There was a pressing need for a platform that transforms the way schools comply with safety standards emphasised by the hon'ble Supreme Court and guidelines mandated by the government. Safe schools can only be created when school management takes steps to sensitise and orient all stakeholders towards every aspect of school safety. SafeInSchool’s platform for compliances creates an opportunity for the school management to make their schools as safe as possible.",
  },
  {
    name: "Mr. K. Ravi",
    img: "/img/testimonial2.jpg",
    position: "Principal, SV Public School",
    text: "We never knew such a solution existed until we got our hands on it. Now SIS has made our school safety compliance a breeze. We are also using the learning modules to educate our staff and students about child and school safety standards and it has helped us take our schools safety to the next level.",
  },
  {
    name: "Mr. Prasanna Purukumar",
    img: "/img/testimonial3.webp",
    position: "Parent of a school going daughter",
    text: "I came to know about SIS through media articles and decided to check it out. I was immediately hooked by the level to detail when it comes to school safety. I have recommended the app to my daughter’s school and I am currently following the news and articles on school safety that have helped me open my mind and become a better parent.",
  },
];

const Testimonial = () => {
  return (
    <div className="py-5 container">
      <div className="row">
        <div className="col-md-7">
          <p>Testimonials</p>
          <h2 className="text-start ">What our partners say</h2>
        </div>
        <div className="col-md-5">
          <p>Hear from teachers, trainers, and leaders in the learning space about how SafeInSchool empowers them to create safer schools</p>
        </div>
      </div>
      <div id="TestimonialSlider" className="carousel slide py-5" data-bs-ride="carousel">
        <div className="carousel-inner">
          {testimonialData.map((testimonial, index) => {
            return (
              <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`} data-bs-interval="3000">
                <div className="row row-cols-1 row-cols-lg-2 g-0 rounded-4 border" style={{ minHeight: "500px", overflow: "hidden" }}>
                  <div className="col">
                    <img src={testimonial?.img} alt="carousel" width="100%" style={{ height: "100%", objectFit: "cover" }} />
                  </div>
                  <div className="col">
                    <div className="d-sm-flex justify-content-center h-100 align-items-center bg-light p-3">
                      <div className="px-3 py-1">
                        <p className="text-start">{testimonial?.text} </p>
                        <h5 className="fw-bold lh-1 mt-4 ">{testimonial?.name}</h5>
                        <p className="text-secondary">{testimonial?.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button className="carousel-control-prev show-hover" type="button" data-bs-target="#TestimonialSlider" data-bs-slide="prev">
          <ArrowCircleLeftOutlined sx={{ color: "green", fontSize: 40 }} />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next show-hover" type="button" data-bs-target="#TestimonialSlider" data-bs-slide="next">
          <ArrowCircleRightOutlined sx={{ color: "green", fontSize: 40 }} />
          <span className="visually-hidden ">Next</span>
        </button>
        {/* <button className="carousel-control-prev p-2" type="button" data-bs-target="#TestimonialSlider" data-bs-slide="prev">
          <span className="carousel-control-prev-icon bg-warning rounded-circle" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#TestimonialSlider" data-bs-slide="next">
          <span className="carousel-control-next-icon  bg-warning rounded-circle" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button> */}
      </div>
    </div>
  );
};

export default Testimonial;
