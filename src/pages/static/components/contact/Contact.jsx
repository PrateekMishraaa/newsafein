import FormContactUs from 'pages/static/pages/contactUs/FormContactUs'
import React from 'react'

const Contact = () => {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#34507c" }}>
        <div className="container">
          <div
            className="row py-5 align-items-center justify-content-evenly"
            style={{
              background: ` url(/img/old/blob.svg) no-repeat `,
              backgroundPosition: "0% 100%",
              backgroundSize: "700px  ",
            }}
          >
            <div className="col-12 col-md-5 ">
              <h5 className="text-white ">
                <i className="bi bi-circle-fill me-2 text-warning fs-6"></i>
                Contact Us
              </h5>
              <h1 className="heroHeading   text-white">Get in Touch</h1>
              <p className="  text-white">
                Need help choosing a SIS solution or can’t find answers to your
                question in our FAQ centre? Our team is here to help! <br />
                <br />
                Simply fill out your details and the nature of your enquiry and
                one of our team or partners will get back to you.
              </p>
              <div>
                <img src={"/assets/contact.png"} alt="contact" width={"100%"} />
              </div>
            </div>
            <div className="col-12 col-md-5">
              <FormContactUs/>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Contact