import {UserRegisterForm} from "components/auth";
import React from "react";
import {useParams} from "react-router-dom";

const StudentOpenRegister = () => {
  const { user } = useParams();

  return (
    <div className="container py-5">
      <div className=" border">
        {/* <!-- ========== Start Login ========== --> */}
        <div className="row row-cols-1 row-cols-lg-2 g-0">
          <div className="col">
            <div className="bg-light h-100">
              <div className="container p-2 p-md-3 p-lg-4 p-xl-5 text-center">
                <h2 className="text-capitalize">Hi {user}!</h2>
                <h4>Welcome to SafeInSchool</h4>
                <p className="text-center lh-base">Welcome to the gateway to the world of school safety for educators. Here is where you, as a teacher, create your SafeInSchool account.</p>
                <p>Complete the necessary information and follow straightforward instructions to become a cornerstone in making your school genuinely safe. Through this account creation, you gain entry to a wealth of e-modules and professional certifications covering diverse facets of school and child safety.</p>
                <p>Seize this opportunity to enhance your role in ensuring a safe educational environment.</p>
                <img src="/img/schoolsafety.png" alt="" className="w-100" style={{ height: "350px", objectFit: "contain" }} />{" "}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="container py-5">
              <UserRegisterForm />
            </div>
          </div>
        </div>
        {/* <!-- ========== End Login ========== --> */}
      </div>
    </div>
  );
};

export default StudentOpenRegister;
