import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { setpasswordSchema } from "schema";
import { api } from "api";
import { toast } from "react-hot-toast";
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const SetPassword = () => {
  let query = useQuery();
  const [emailId, setEmail] = useState("");
  let collegeId = query.get("id");
  let secretKey = query.get("key");
  const navigate = useNavigate();
  async function fetchEmail() {
    try {
      const res = await api.post("/institute/info?instituteId=" + collegeId);
      if (res.status == 200) {
        setEmail(res.data.result[0].email);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something Went Wrong");
      navigate("/");
    }
  }

  useEffect(() => {
    fetchEmail();
  }, []);

  return (
    <>
      <div className="p-5"></div>
      <div className="py-5">
        <div
          className="container py-5 border rounded-4 p-4 bg-light"
          style={{ maxWidth: "450px" }}
        >
          <h4 className="text-center">Set Account Password</h4>
          <Formik
            initialValues={{
              password: "",
              confirm_password: "",
            }}
            validationSchema={setpasswordSchema}
            onSubmit={(values, { setSubmitting }) => {
              (async function submitForm() {
                try {
                  const res = await api.post(
                    `auth/setpassword?id=${collegeId}&key=${secretKey}`,
                    {
                      email: emailId,
                      password: values.password,
                    }
                  );
                  if (res.status == 200) {
                    toast.success("Password set successfully Now you can login");
                    navigate("/login");
                  }
                } catch (error) {
                  toast.dismiss();
                  toast.error("Invalid Request try again later");
                  navigate("/");
                }
              })();
            }}
          >
            {({ isSubmitting, values }) => (
              <Form>
                <div className="row g-3">
                  <div className="col-12">
                    <span className="form-label text-dark">Email Address</span>
                    <span
                      type="email"
                      value={emailId}
                      disabled={true}
                      className="form-control p-3"
                    >
                      {emailId}
                    </span>
                  </div>
                  <div className="col-12">
                    <span className="text-dark form-label">Password</span>
                    <Field
                      type="password"
                      name="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      className="text-danger"
                      component="div"
                    />
                  </div>
                  <div className="col-12">
                    <span className="text-dark form-label">
                      Confirm Password
                    </span>
                    <Field
                      type="password"
                      name="confirm_password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="confirm_password"
                      className="text-danger"
                      component="div"
                    />
                  </div>
                  <div className="col-12 text-center">
                    <button
                      type="submit"
                      className="btn btn-primary-outline"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default SetPassword;
