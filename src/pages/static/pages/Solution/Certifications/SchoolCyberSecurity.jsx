import React from "react";

const SchoolCyberSecurity = () => {
  return (
    <>
      <div className="container py-5">
        <div className="row ">
          <h1 className="text-start heroHeading  fs-1">
            Certificate in School Cybersecurity <br />
          </h1>
        </div>
        <img src="/img/cyber-safety.jpg" alt="" className="w-100 my-4" />
        <div className="row text-align-center">
          <p>
            Cybersecurity refers to the protection of computers, networks, and digital informationfrom unauthorized access, theft, and damage. It
            encompasses a wide range oftechnologies, practices, and processes aimed at protecting sensitive information fromcyber attacks, breaches,
            and other types of cybercrime.
            <br /> <br />
            There are scenarios where it is evident that schools are becoming the easy target ofcyber threats. Moreover, there are many types of cyber
            threats that schools face,including hacking, phishing, malware, and more. Hackers can steal sensitive information,such as personal data,
            financial information, and intellectual property. Someone mayraise questions about the importance of cybersecurity, so cybersecurity is of
            utmostimportance for Indian schools, as technology plays a significant role in education, andsensitive information is stored and
            transmitted digitally.
          </p>{" "}
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col ">
            <h3 className="text-start heroHeading  fs-2">What will you learn?</h3>
            <p>For students and teachers learning about cybersecurity basics, the topics included:</p>
            <ol className="bulletpoints">
              <li> Identifying Threat And Vulnerability</li>
              <ul>
                <li>Threat Assessment</li>
              </ul>
              <ul>
                <li>Vulnerability Scanning</li>
              </ul>
              <ul>
                <li>Risk Management</li>
              </ul>
              <ul>
                <li>Monitoring and Detection</li>
              </ul>
              <br />

              <li>Development measures and Detection Methods.</li>
              <ul>
                {" "}
                <li>Access Control</li>{" "}
              </ul>
              <ul>
                <li>Encryption</li>
              </ul>
              <ul>
                <li>Firewall</li>
              </ul>
              <ul>
                <li>Intrusion Detection and Prevention Systems (IDS/IPS)</li>
              </ul>
              <br />

              <li>Protection of Sensitive Data.</li>
              <ul>
                <li>Data Classification</li>
              </ul>
              <ul>
                <li>Data Backup and Recovery</li>
              </ul>
              <ul>
                <li>Data Disposal</li>
              </ul>
              <br />

              <li>Respond And Recover from Cyber Security Incidents.</li>
              <ul>
                <li>Incident Response Plan</li>
              </ul>
              <ul>
                <li>Containment</li>
              </ul>
              <ul>
                <li>Analysis and Investigation</li>
              </ul>
              <ul>
                <li>Remediation</li>
              </ul>
              <br />
            </ol>
          </div>
        </div>
      </div>
      <div className="container pb-5">
        <div className="row">
          <div className="col">
            <h3 className="text-start heroHeading  fs-2">Who Is It For..?</h3>
            <p>
              The Basic Cybersecurity Course is designed for individuals who want to understand the basics of cybersecurity and protect their personal
              and professional digital assets. This course is suitable for individuals who are new to the field of cybersecurity and have limited or
              no prior knowledge of the subject. The course is also appropriate for professionals looking to upgrade their skills and knowledge in
              this rapidly evolving field. The course covers essential topics such as types of cyber attacks, security measures and best practices,
              passwords, online privacy , and more. The curriculum is designed to provide a comprehensive understanding of cybersecurity concepts and
              practices and equip individuals with the tools and skills necessary to stay safe online. The course is delivered through a combination
              of lectures, hands-on exercises, and interactive quizzes. It is a self-paced course that can be completed at any time, making it a
              convenient option for busy individuals.{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SchoolCyberSecurity;
