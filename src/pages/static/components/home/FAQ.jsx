import React from "react";
import Faqcomponent from "../contact/Faqcomponent";

const FAQ = () => {
  return (
    <div
      className="container py-5 d-flex align-items-center"
      style={{ minHeight: "70vh" }}
    >
      <div className="row align-items-center justify-content-evenly">
        <div className="col-12 col-lg-6">
          <h6>SIS FAQS</h6>
          <h1 className="heroHeading ">Frequently asked questions</h1>
          <button className="btn btn-outline-type1 rounded-pill px-4 py-2 mt-4">
            View All
          </button>
        </div>
        <div className="col-12 col-lg-6">
          <ol class="accordion accordion-flush ps-0" id="accordionFlushExample">
            <Faqcomponent
              faqId="faq1"
              faqLabelId="faqLabel1"
              faqTitle="What does the SIS Compliance App do?"
              faqDescription="SIS Compliance App is integrated in the SIS App and allows school administration to meet government mandated safety standards through an easy-to-use interface. You can even create safety teams and inspection reports and file them directly to the district administration. Contact us for more details."
            />
            <Faqcomponent
              faqId="faq2"
              faqLabelId="faqLabel2"
              faqTitle="Our school has already taken SIS Compliance but we want to use SIS Learning and Certifications to enhance school safety among our stakeholders. How do we integrate all  three?"
              faqDescription="The SIS Platform is pre-integrated with all three solutions namely, SIS Compliance, SIS Learning and SIS Certifications. You can access all solutions through your dashboard no matter what solution you are currently subscribed to. In-app purchases allow you to subscribe, access and upgrade your account. Contact us for more details. "
            />
            <Faqcomponent
              faqId="faq3"
              faqLabelId="faqLabel3"
              faqTitle="Is SIS Compliance safe to use?"
              faqDescription="Yes – SIS Compliance is certified by NCPCR and the Department of Education for use in public schools, it is extremely safe to use by schools. Only school admins have total control on who gets to access the SIS platform and ability to restrict users. Complaints filed on the app and all performance reports generated through the app go directly to school administration.. "
            />
          </ol>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
