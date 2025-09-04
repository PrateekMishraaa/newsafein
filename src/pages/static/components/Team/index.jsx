import React from "react";

const teamDetails = [
  {
    img: "https://glcloud.in/images/static/team/sakshi.webp",
    name: "Sakshi Verma",
    position: "Operations Head"
  },
  {
    img: "https://glcloud.in/images/static/team/saurabh.webp",
    name: "Saurabh Sharma",
    position: "Software Developer"
  },
  {
    img: "https://glcloud.in/images/static/team/santosh.webp",
    name: "Santosh Kushwaha",
    position: "Software Developer"
  },
  {
    img: "https://glcloud.in/images/static/team/garg.webp",
    name: "Mr. Garg",
    position: "DevOps Engineer"
  },
  {
    img: "https://glcloud.in/images/static/team/eshanika.webp",
    name: "Eshanika Ray",
    position: "Content and Editing"
  },
  {
    img: "https://glcloud.in/images/static/team/rohit.webp",
    name: "Rohit Dabaas",
    position: "Graphic Design"
  },
  {
    img: "https://glcloud.in/images/static/team/ayush.webp",
    name: "Ayush Antiwal",
    position: "Web Developer"
  },
  {
    img: "https://glcloud.in/images/static/team/rishabh.webp",
    name: "Rishabh Jain",
    position: "Web Developer"
  },
  {
    img: "https://glcloud.in/images/static/team/roop.webp",
    name: "Roop Kishor",
    position: "Web Developer"
  },
  {
    img: "https://glcloud.in/images/static/team/Prakhar-Varshney.webp",
    name: "Prakhar",
    position: "State Coordinator and PR"
  },
  {
    img: "https://glcloud.in/images/static/team/Prashant-Yadav.webp",
    name: "Prashant yadav",
    position: "State Coordinator and PR"
  },
  {
    img: "https://glcloud.in/images/static/team/Gaurav-Baghel.webp",
    name: "Gaurav",
    position: "State Coordinator"
  },
  {
    img: "https://glcloud.in/images/static/team/Durga-Prasad-Mishra.webp",
    name: "Durga Prasad Mishra",
    position: "Content writer"
  },
  {
    img: "https://glcloud.in/images/static/team/Pooja-Vishwakarma.webp",
    name: "Pooja Vishwakarma",
    position: "Graphic Designer"
  },
  {
    img: "https://glcloud.in/images/static/team/Janvi-sethi.webp",
    name: "Janvi",
    position: "Graphic Designer"
  },
  {
    img: "https://glcloud.in/images/static/team/Aarya-Singh-Parihar.webp",
    name: "Aarya",
    position: "Coordinator"
  },
  {
    img: "https://glcloud.in/images/static/team/Abhishek-Chaurasiya.webp",
    name: "Abhishek",
    position: "Coordinator"
  },
  {
    img: "https://glcloud.in/images/static/team/Khushboo-Jha.webp",
    name: "Khushboo",
    position: "Coordinator"
  },
]
const Team = () => {
  return (
    <div>
      {/* <BreadCrumb heading={"Leadership Team"} /> */}
      <div className="container-fluid py-5" style={{ background: 'linear-gradient(180deg,#fff8ee,rgba(255,255,255,0) 100%) !important' }}>
        <div className="mt-3">
          <section className="section py-5 m-0">
            <div className="container">
              <div className="row">
                <div className="col-12 text-center">
                  <span className="section-title-border border-center"></span>
                  <h2 className="fs-1 mb-3 ">
                    WE ARE A YOUNG TEAM AND GROWING
                  </h2>
                </div>
              </div>
              <div className="row justify-content-center">
                {/* <!-- team member --> */}
                {
                  teamDetails?.map((person, index) => {
                    return <div className="col-lg-3 col-sm-6 mb-5" key={index}>
                      <div className="team-member text-center">
                        <div className="team-member-img position-relative mb-2">
                          <img
                            className="img-fluid w-100 rounded"
                            src={person?.img}
                            alt="team-member"
                            style={{
                              height: "350px",
                              objectFit: "cover",
                              filter: `${person?.name == "Roop Kishore" ? "brightness(1.7)" : ""}`
                            }}
                          />
                        </div>
                        <h4>
                          {person?.name}
                        </h4>
                        <span>{person?.position}</span>
                      </div>
                    </div>
                  })
                }
              </div>
            </div>
          </section>

          <section className="section py-5 m-0">
            <div className="container">
              <div className="row">
                <div className="col-12 text-center">
                  <span className="section-title-border border-center"></span>
                  <h2 className="fs-1 section-title">Our Advisors</h2>
                </div>
              </div>
              <div className="row g-3 g-lg-4 align-items-center">
                <div className="col-lg-4 col-12">
                  <div className="team-member text-center">
                    <div className="team-member-img position-relative mb-5">
                      <img
                        className="img-fluid w-100 rounded"
                        src="https://glcloud.in/images/static/team/amit-kapoor.webp"
                        alt="team-member"
                        style={{
                          height: "450px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="hover-icon py-4">
                        <ul className="list-inline social-icon">
                          <li className="list-inline-item">
                            <a href="#" className="hover-ripple ripple-white">
                              <i className="bi bi-linkedin"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-8">
                  <div>
                    <h4 className="fs-3 font-monospace">Amit Kapoor</h4>
                    {/* <p>Honorary Chairman at Institute for Competitiveness</p> */}
                    <p className="text-justify fs-6">
                      Amit Kapoor, PhD, is Honorary Chairman at Institute for
                      Competitiveness, India. He is an affiliate faculty for the
                      Microeconomics of Competitiveness & Value-Based Health Care
                      Delivery courses of the Institute of Strategy and
                      Competitiveness, Harvard Business School and an instructor
                      with Harvard Business Publishing in the area of Strategy,
                      Competitiveness and Business Models. He has been inducted
                      into the Competitiveness Hall of Fame which is administered
                      by the Institute for Strategy and Competitiveness at Harvard
                      Business School.
                    </p>
                    <p className="fs-6">
                      Amit is the author of bestsellers “Riding the Tiger”, which
                      he has co-authored with Wilfried Aulber and “The Age of
                      Awakening: The Story of the Indian Economy Since
                      Independence” published by Penguin Random House.
                    </p>
                    <p className="fs-6">
                      He is also a columnist with IANS in addition to his
                      contributions being published by Economic Times, Hindu,
                      Business Insider, Hindu Business Line, Mint, Financial
                      Express, Outlook Business, Governance Now, Business Today et
                      al. In all, he has written over 500 opinion pieces apart
                      from publishing academic research (cases and articles).
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="row g-3 g-lg-4 align-items-center">
                <div className="col-12 col-lg-8 order-2 order-lg-1">
                  <div>
                    <h4 className="fs-3 font-monospace">Ravi Pokharna</h4>

                  </div>
                  <div className="fs-6">
                    <p className="text-justify fs-6 fst-italic">
                      Ravi is currently Joint Coordinator at NITI Aayog’s Standing Committee on Civil Society
                      Organisation. He is also the member of the Working Group for the New National Policy for
                      Voluntary Sector constituted by NITI Aayog.
                    </p>
                    <p className="fs-6 fst-italic">
                      Previously, he had served as the Chief Executive Officer at the UN-ECOSOC recognized
                      leadership and training think tank, Rambhau Mhalgi Prabodhini (RMP). He had also served
                      as the Deputy Dean at the Indian Institute of Democratic Leadership and the Chief Mentor at
                      the Atal Incubation Centre- RMP Foundation

                    </p>
                    <p className="fs-6 fst-italic">
                      Ravi was also part of the Committee on Developing the ranking framework for Gram
                      Panchayats for the Ministry of Panchayati Raj.
                    </p>
                    <p className="fs-6 fst-italic">
                      Ravi is an alumnus of the prestigious Indian Institute of Management, Ahmedabad, Faculty
                      of Management Studies, University of Delhi and Dhirubhai Ambani Institute of Information
                      Communication and Technology, Gandhinagar. Earlier he has held several leadership
                      assignments in the field of Education, Training and Skill Development like Director, PT
                      Education; Vice President Lok Bharti Skilling Solution Pvt Ltd, Founder and Director Phoenix
                      International Business School.

                    </p>
                    <p className="fs-6 fst-italic">
                      Few publications by Ravi include Creativity in Cooperation (2012), One Nation One Election
                      (2018) published by Rambhau Mhalgi Prabodhini.

                    </p>
                  </div>
                </div>
                <div className="col-lg-4 col-12 order-1 order-lg-2">
                  <div className="team-member text-center">
                    <div className="team-member-img position-relative mb-5">
                      <img
                        className="img-fluid w-100"
                        src="https://glcloud.in/images/static/team/ravi-pokharna.webp"
                        alt="team-member"
                        style={{
                          height: "450px",
                          objectFit: "cover",
                          clipPath: "circle()",
                        }}
                      />
                      <div className="hover-icon py-4">
                        <ul className="list-inline social-icon">
                          
                          <li className="list-inline-item">
                            <a href="#" className="hover-ripple ripple-white">
                              <i className="bi bi-linkedin"></i>
                            </a>
                          </li>
                         
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="row g-3 g-lg-4 align-items-center">
                <div className="col-lg-6 col-12 order-0 order-lg-1">
                  <div className="team-member text-center d-flex justify-content-end">
                    <div className="team-member-img position-relative" style={{ maxWidth: "400px" }}>
                      <img
                        className="img-fluid w-100 rounded"
                        src="https://glcloud.in/images/static/team/pankaj-sharma.webp"
                        alt="team-member"
                        style={{
                          height: "450px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="hover-icon py-4">
                        <ul className="list-inline social-icon">
                          <li className="list-inline-item">
                            <a href="#" className="hover-ripple ripple-white">
                              <i className="bi bi-linkedin"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6 order-1 order-lg-0">
                  <div>
                    <h4 className="fs-3 font-monospace">Pankaj Sharma</h4>
                    {/* <p>Honorary Chairman at Institute for Competitiveness</p> */}
                    <p className="text-justify fs-6">
                      Based out of New York, USA, Pankaj Sharma is a public policy
                      and management consultant. He is an alumnus of the
                      prestigious international Visitors Leadership Program( Deptt
                      of State, Government of USA) Alumnus, Ex Civil Rights
                      Commissioner, State of Colorado and Ex Advisor on
                      Sustainability and Technology Initiatives, City of Boulder,
                      Colorado. His passion lies in the advancement of education,
                      youth empowerment and international affairs.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </section>

          <div className="col-12 text-center">
            <span className="section-title-border border-center"></span>
            <h3 className="fs-2 section-title">Leadership Team</h3>
          </div>
          <div className="container">
            <div className="row g-3 g-lg-4">
              <div className="col-lg-4 col-12">
                <div className="team-member text-center">
                  <div className="team-member-img position-relative mb-5">
                    <img
                      className="img-fluid w-100 rounded-5"
                      src="https://glcloud.in/images/static/team/nitin.webp"
                      alt="team-member"
                      style={{
                        objectPosition: "center",
                        height: "450px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="hover-icon py-4">
                      <ul className="list-inline social-icon">
                        {/* <li className="list-inline-item">
                        <a href="#" className="hover-ripple ripple-white">
                          <i className="bi bi-facebook"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#" className="hover-ripple ripple-white">
                          <i className="bi bi-twitter"></i>
                        </a>
                      </li> */}
                        <li className="list-inline-item">
                          <a
                            href="https://www.linkedin.com/in/nitinagarwaleducator/"
                            target="_blank"
                            className="hover-ripple ripple-white"
                          >
                            <i className="bi bi-linkedin"></i>
                          </a>
                        </li>
                        {/* <li className="list-inline-item">
                        <a href="#" className="hover-ripple ripple-white">
                          <i className="bi bi-pinterest"></i>
                        </a>
                      </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-8">
                <div>
                  <h4 className="fs-3 font-monospace">Nitin Agarwal</h4>
                  <p>Director</p>
                </div>
                <p className="text-justify fs-6">
                  Nitin is the Convenor of{" "}
                  {/* <a
                  href="https://nasp.in"
                  target="_blank"
                  rel="noopener noreferrer"
                > */}
                  National Association of School {" "}
                  {/* </a>  */}
                  Professionals, an NGO working towards bringing a fresh
                  impact-based approach to Learning Beyond Curriculum in India.
                  National Association of School Professionals owns and operates
                  the Yuvamanthan Platform.
                  {/* Nitin is CEO of{" "}
                <a
                  href="https://glcloud.in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Govardhan Learning Cloud (GLC)
                </a>
                , an organization focused on solving societal issues through
                learning based intervention among students. GLC is working with
                the government on issues such as Women Empowerment,{" "}
                <a
                  href="https://safeinschool.in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Child Safety
                </a>
                , Financial Literacy, Environment Protection etc. */}
                </p>
                <p className="fs-6">
                  He is also CEO of{" "}
                  <a
                    href="https://glcloud.in"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Govardhan Learning Cloud (GLC)
                  </a>{" "}
                  , an organization focused on solving societal issues through
                  learning based intervention among students. GLC is working with
                  the government on issues such as Women Empowerment, Child
                  Safety, Financial Literacy, Environment Protection etc.
                </p>
                <p className="fs-6">
                  He is also a Director at{" "}
                  <a
                    href="https://pahleindia.org/about-us/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pahle India Foundation (PIF)
                  </a>{" "}
                  . PIF undertakes analytical research and disseminates its
                  findings both to policy makers and in the public domain. The
                  driving vision in all that we do is “Putting India First to make
                  India First.”
                </p>
                <p className="fs-6">
                  He was previously Advisor at the UN-ECOSOC recognized leadership
                  and training think tank,{" "}
                  <a
                    href="https://rmponweb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Rambhau Mhalgi Prabodhini (RMP)
                  </a>
                  . He founded{" "}
                  <a
                    href='https://www.google.com/search?q="chakh+le+india"+"nitin+agarwal"'
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chakh Le India
                  </a>{" "}
                  in the food space and{" "}
                  <a
                    href="http://mbawithus.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mbawithus.com
                  </a>
                  , one of India's earliest edtech companies in the past.
                </p>
                <p className="fs-6">
                  He is an engineer who holds an MBA from Management Development
                  Institute (MDI Gurgaon) and loves to explore Indian culture
                  through his travels. He is a prolific author and has written 4
                  bestsellers Viz.{" "}
                  <a
                    href="https://www.amazon.in/Leadership-Lessons-Narendra-Damodardas-Modi/dp/9381841489/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    21 Leadership Lessons of Narendra Damodardas Modi
                  </a>
                  ,{" "}
                  <a
                    href="https://www.amazon.in/Indias-Greatest-Speeches-Nitin-Agarwal-ebook/dp/B00Q9RN4K6/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    India's Greatest Speeches
                  </a>
                  ,{" "}
                  <a
                    href="https://www.amazon.in/Do-You-Know-Narendra-Modi/dp/9381841594/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Do You Know Narendra Modi?
                  </a>
                  , and{" "}
                  <a
                    href="https://www.amazon.in/Narendra-Modi-Ke-Netritva-Sutra/dp/9381841993/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Narendra Modi Ke Netritva ke 21 Sutra
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="row g-3 g-lg-4 mt-4">
              <div className="col-12 col-lg-8 order-1 order-lg-0">
                <div>
                  <h4 className="fs-3 font-monospace">Danish Kamal</h4>
                  <p>Director - Strategy and Communications</p>
                </div>
                <p className="text-justify fs-6">
                  Danish brings with him a vast experience in digital marketing
                  and communications strategy. Having worked with big brands like
                  Apple, Dentsu, WPP etc. and for multiple startups, he is
                  responsible for strategy, communications and development of
                  YMG20 platform. He has also been previously associated with
                  Energy, Aviation, Security and Defense think tanks and was
                  responsible for events, expositions, digital development and
                  branding efforts. He has two entrepreneural stints as founder of
                  digital agencies. His experience extends beyond building brands
                  to public policy and driving social narratives for government
                  initiatives. He holds an MBA in International Business and loves
                  to explore Indian and international cuisine.
                </p>
              </div>
              <div className="col-lg-4 col-12 order-0 order-lg-1">
                <div className="team-member text-center">
                  <div className="team-member-img position-relative mb-5">
                    <img
                      className="img-fluid w-100 rounded-5"
                      src="https://glcloud.in/images/static/team/danish.webp"
                      alt="team-member"
                      style={{
                        objectPosition: "center",
                        height: "450px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="hover-icon py-4">
                      <ul className="list-inline social-icon">
                        {/* <li className="list-inline-item">
                        <a href="#" className="hover-ripple ripple-white">
                          <i className="bi bi-facebook"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="#" className="hover-ripple ripple-white">
                          <i className="bi bi-twitter"></i>
                        </a>
                      </li> */}
                        <li className="list-inline-item">
                          <a
                            href="https://www.linkedin.com/in/danish-kamal-9130b05/"
                            target={"_blank"}
                            className="hover-ripple ripple-white"
                          >
                            <i className="bi bi-linkedin"></i>
                          </a>
                        </li>
                        {/* <li className="list-inline-item">
                        <a href="#" className="hover-ripple ripple-white">
                          <i className="bi bi-pinterest"></i>
                        </a>
                      </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
