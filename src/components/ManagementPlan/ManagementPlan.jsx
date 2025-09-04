import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "lucide-react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// import Loader from "../Component/Loader";

const ManagementPlan = () => {
  const [formData, setFormData] = useState({
    nameofSchoolandLocation: "",
    dateAndTime: "",
    concernedDepartment: "",
    emergencyContactNo: "",
    educationAuthority: "",
    workplaceIdentified: "",
    evacuationPlan: "",
    rolesAndresponsibilities: "",
    staffResponsibilities: "",
    childrenBelowClassV: "",
    addressTheStudent: "",
    dmTeam: "",
    calenderFormockDrill: "",
    localPoliceAndFirebrigade: "",
  });
  const ValidationSchema = Yup.object({
    nameofSchoolandLocation:Yup.string().required("School Name is required"),
    dateAndTime:Yup.string().required("Date and Time is required"),
    concernedDepartment:Yup.string().required("Concerened Department is required"),
    emergencyContactNo:Yup.string().required("Emergency contact number is required"),
    educationAuthority:Yup.string().required("Education Authority is required"),
    workplaceIdentified:Yup.string().required("Work Place Identified is required"),
    evacuationPlan:Yup.string().required("Evacuation plan is required"),
    rolesAndresponsibilities:Yup.string().required("Roles and responsibilitiies is required"),
    staffResponsibilities:Yup.string().required("Staff Responsibilites is required"),
    childrenBelowClassV:Yup.string().required("ChildRen Below Class V is required"),
    addressTheStudent:Yup.string().required("Student Address is required"),
    dmTeam:Yup.string().required("Dm Team is required"),
    calenderFormockDrill:Yup.string().required("form Calender is required"),
    localPoliceAndFirebrigade:Yup.string().required("Local Police and Fire Brigade is required")
  })
console.log(formData)
  const [files, setFiles] = useState({}); 
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, name) => {
    setFiles((prev) => ({ ...prev, [name]: e.target.files[0] }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();


  const isEmpty = Object.values(formData).some((val) => val === "");
  if (isEmpty) {
    toast.error("All fields are required");
    return;
  }

  try {
    setLoading(true);

    // Use FormData to send files
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    Object.entries(files).forEach(([key, file]) => {
      if (file) data.append(key, file);
    });

    const response = await axios.post(
      "http://localhost:5000/emergency-checklist",
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log(response.data);
    toast.success("Form has been submitted successfully");


    setFormData({
      nameofSchoolandLocation: "",
      dateAndTime: "",
      concernedDepartment: "",
      emergencyContactNo: "",
      educationAuthority: "",
      workplaceIdentified: "",
      evacuationPlan: "",
      rolesAndresponsibilities: "",
      staffResponsibilities: "",
      childrenBelowClassV: "",
      addressTheStudent: "",
      dmTeam: "",
      calenderFormockDrill: "",
      localPoliceAndFirebrigade: "",
    });
    setFiles({});
  } catch (error) {
    console.error(error);
    toast.error("Error submitting form");
  } finally {
    setLoading(false);
  }
};


  const questions = [
    {
      label: "1. Have the emergency numbers been confirmed with the concerned departments?",
      name: "concernedDepartment",
    },
    {
      label: "2. Are the emergency contact numbers prominently displayed in the principal room?",
      name: "emergencyContactNo",
    },
    {
      label: "3. Does the plan clearly specify procedures for reporting emergencies to the government services and the relevant education authority?",
      name: "educationAuthority",
    },
    {
      label: "4. Are the potential risks within and up to a kilometre from the workplace identified?",
      name: "workplaceIdentified",
    },
    {
      label: "5. Does the plan clearly mention about the evacuation plan?",
      name: "evacuationPlan",
    },
    {
      label: "6. Are the roles and responsibilities of key personnel clearly defined?",
      name: "rolesAndresponsibilities",
    },
    {
      label: "7. Are the staff responsibilities to account for and supervise students during and following the emergency clearly described?",
      name: "staffResponsibilities",
    },
    {
      label: "8. Does the plan give emphasis on the more vulnerable children below class V?",
      name: "childrenBelowClassV",
    },
    {
      label: "9. Does the plan address the students with special physical, mental and medical needs?",
      name: "addressTheStudent",
    },
    {
      label: "10. Does the plan describe how the DM team will be trained?",
      name: "dmTeam",
    },
    {
      label: "11. Does the plan provide the calendar for mock drills to be conducted?",
      name: "calenderFormockDrill",
    },
    {
      label: "12. Has the plan been endorsed by local police and fire brigade?",
      name: "localPoliceAndFirebrigade",
    },
  ];

  return (
    <>
     <div className="container">
       <section className="w-full min-h-screen flex justify-center bg-gray-50 py-10">
        <form
          className="w-full max-w-5xl bg-white border-2 border-black p-8 shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="text-center mb-8">
            <h1 className="uppercase text-2xl font-bold mb-4 text-[#808080]" style={{color:"#808080"}}>
              Emergency Management Plan Checklist
            </h1>
            <div className="flex flex-wrap gap-4 mb-6 items-center justify-between ">
             <div className="">
                 <div className="flex gap-2 items-center">
                <label className="italic font-semibold" style={{fontFamily:"sans-serif",fontWeight:"bold"}}>
                  Name of School & Location:
                </label>
                <input
                  type="text"
                  name="nameofSchoolandLocation"
                  value={formData.nameofSchoolandLocation}
                  onChange={handleChange}
                  placeholder="Enter School Name and Location"
                  className="w-72 border border-gray-300 rounded px-2 py-1"
                  style={{marginLeft:"20px",width:"300px"}}
                />
              </div>
              <div className="flex gap-2 items-center">
                <label className="italic font-semibold"  style={{fontFamily:"sans-serif",fontWeight:"bold"}}>Date:</label>
                <input
                  type="date"
                  name="dateAndTime"
                  value={formData.dateAndTime}
                  onChange={handleChange}
                  className="w-40 border border-gray-300 rounded px-2 py-1"
                  style={{marginLeft:"180px",width:"300px",marginTop:"10px"}}
                />
              </div>
             </div>
            </div>
          </div>

          
          <div className="space-y-4 text-sm">
            {questions.map((q, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 border border-gray-300 rounded-lg p-4 h-14"
              >
                <div className="flex justify-between items-center">
                  <p className="font-medium">{q.label}</p>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-8">
                      <input
                        type="radio"
                        name={q.name}
                        value="Yes"
                        checked={formData[q.name] === "Yes"}
                        onChange={handleChange}
                        className="w-5 h-5 accent-green-600"
                      />
                      Yes
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name={q.name}
                        value="No"
                        checked={formData[q.name] === "No"}
                        onChange={handleChange}
                        className="w-5 h-5 accent-red-600"
                      />
                      No
                    </label>
                  </div>
                </div>

                {/* Show upload if Yes */}
                {formData[q.name] === "Yes" && (
                  <div>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, q.name)}
                      className="w-full border border-gray-300 rounded px-2 py-1"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-green-600 text-white bg-black rounded font-semibold h-18 w-40 cursor-pointer rounded-lg shadow hover:bg-green-700 transition disabled:opacity-50"
              style={{backgroundColor:"#f88d35"}}
            >
              {loading ? <Loader/> : "Submit" }
            </button>
          </div>
        </form>
      </section>
     </div>
      <ToastContainer />
    </>
  );
};

export default ManagementPlan;



// import React, { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Loader } from "lucide-react";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


// const ManagementPlan = () => {
//   const [files, setFiles] = useState({});
//   const [loading, setLoading] = useState(false);

//   // Initial form values
//   const initialValues = {
//     nameofSchoolandLocation: "",
//     dateAndTime: "",
//     concernedDepartment: "",
//     emergencyContactNo: "",
//     educationAuthority: "",
//     workplaceIdentified: "",
//     evacuationPlan: "",
//     rolesAndresponsibilities: "",
//     staffResponsibilities: "",
//     childrenBelowClassV: "",
//     addressTheStudent: "",
//     dmTeam: "",
//     calenderFormockDrill: "",
//     localPoliceAndFirebrigade: "",
//   };

//   // Validation schema
//   const validationSchema = Yup.object({
//     nameofSchoolandLocation: Yup.string().required("School Name is required"),
//     dateAndTime: Yup.string().required("Date and Time is required"),
//     concernedDepartment: Yup.string().required("Concerned Department is required"),
//     emergencyContactNo: Yup.string().required("Emergency contact number is required"),
//     educationAuthority: Yup.string().required("Education Authority is required"),
//     workplaceIdentified: Yup.string().required("Work Place Identified is required"),
//     evacuationPlan: Yup.string().required("Evacuation plan is required"),
//     rolesAndresponsibilities: Yup.string().required("Roles and responsibilities is required"),
//     staffResponsibilities: Yup.string().required("Staff Responsibilities is required"),
//     childrenBelowClassV: Yup.string().required("Children Below Class V is required"),
//     addressTheStudent: Yup.string().required("Student Address is required"),
//     dmTeam: Yup.string().required("DM Team is required"),
//     calenderFormockDrill: Yup.string().required("Calendar for mock drill is required"),
//     localPoliceAndFirebrigade: Yup.string().required("Local Police and Fire Brigade is required")
//   });

//   const handleFileChange = (e, name) => {
//     setFiles((prev) => ({ ...prev, [name]: e.target.files[0] }));
//   };

//   // Form submission handler
//   const handleSubmit = async (values, { setSubmitting, resetForm }) => {
//     try {
//       setLoading(true);

//       // Create FormData for file upload
//       const data = new FormData();
      
//       // Append form values
//       Object.entries(values).forEach(([key, value]) => {
//         data.append(key, value);
//       });
      
//       // Append files
//       Object.entries(files).forEach(([key, file]) => {
//         if (file) data.append(key, file);
//       });

//       const response = await axios.post(
//         // `${REACT_APP_API_BASE_URL}emergency-checklist`,
//         "http://localhost:5000/emergency-checklist",
//         data,
//         {
//           headers: { "Content-Type": "multipart/form-data" }, 
//         }
//       );

//       console.log(response.data);
//       toast.success("Form has been submitted successfully");

//       // Reset form and files
//       resetForm();
//       setFiles({});
//     } catch (error) {
//       console.error(error);
//       toast.error("Error submitting form");
//     } finally {
//       setLoading(false);
//       setSubmitting(false);
//     }
//   };

//   const questions = [
//     {
//       label: "1. Have the emergency numbers been confirmed with the concerned departments?",
//       name: "concernedDepartment",
//     },
//     {
//       label: "2. Are the emergency contact numbers prominently displayed in the principal room?",
//       name: "emergencyContactNo",
//     },
//     {
//       label: "3. Does the plan clearly specify procedures for reporting emergencies to the government services and the relevant education authority?",
//       name: "educationAuthority",
//     },
//     {
//       label: "4. Are the potential risks within and up to a kilometre from the workplace identified?",
//       name: "workplaceIdentified",
//     },
//     {
//       label: "5. Does the plan clearly mention about the evacuation plan?",
//       name: "evacuationPlan",
//     },
//     {
//       label: "6. Are the roles and responsibilities of key personnel clearly defined?",
//       name: "rolesAndresponsibilities",
//     },
//     {
//       label: "7. Are the staff responsibilities to account for and supervise students during and following the emergency clearly described?",
//       name: "staffResponsibilities",
//     },
//     {
//       label: "8. Does the plan give emphasis on the more vulnerable children below class V?",
//       name: "childrenBelowClassV",
//     },
//     {
//       label: "9. Does the plan address the students with special physical, mental and medical needs?",
//       name: "addressTheStudent",
//     },
//     {
//       label: "10. Does the plan describe how the DM team will be trained?",
//       name: "dmTeam",
//     },
//     {
//       label: "11. Does the plan provide the calendar for mock drills to be conducted?",
//       name: "calenderFormockDrill",
//     },
//     {
//       label: "12. Has the plan been endorsed by local police and fire brigade?",
//       name: "localPoliceAndFirebrigade",
//     },
//   ];

//   return (
//     <>
//       <div className="container">
//         <section className="w-full min-h-screen flex justify-center bg-gray-50 py-10">
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ values, errors, touched, isSubmitting, setFieldValue }) => (
//               <Form className="w-full max-w-5xl bg-white border-2 border-black p-8 shadow-lg">
//                 <div className="text-center mb-8">
//                   <h1 
//                     className="uppercase text-2xl font-bold mb-4" 
//                     style={{ color: "#808080" }}
//                   >
//                     Emergency Management Plan Checklist
//                   </h1>
//                   <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
//                     <div>
//                       <div className="flex gap-2 items-center mb-2">
//                         <label className="italic font-semibold">
//                           Name of School & Location:
//                         </label>
//                         <Field
//                           type="text"
//                           name="nameofSchoolandLocation"
//                           placeholder="Enter School Name and Location"
//                           className="w-72 border border-gray-300 rounded px-2 py-1"
//                         />
//                       </div>
//                       {touched.nameofSchoolandLocation && errors.nameofSchoolandLocation && (
//                         <div className="text-red-500 text-sm">{errors.nameofSchoolandLocation}</div>
//                       )}
                      
//                       <div className="flex gap-2 items-center mt-2">
//                         <label className="italic font-semibold">Date:</label>
//                         <Field
//                           type="date"
//                           name="dateAndTime"
//                           className="w-40 border border-gray-300 rounded px-2 py-1"
//                         />
//                       </div>
//                       {touched.dateAndTime && errors.dateAndTime && (
//                         <div className="text-red-500 text-sm">{errors.dateAndTime}</div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-4 text-sm">
//                   {questions.map((q, index) => (
//                     <div
//                       key={index}
//                       className="flex flex-col gap-3 border border-gray-300 rounded-lg p-4"
//                       style={{ minHeight: values[q.name] === "Yes" ? "auto" : "56px" }}
//                     >
//                       <div className="flex justify-between items-center">
//                         <p className="font-medium">{q.label}</p>
//                         <div className="flex gap-4">
//                           <label className="flex items-center gap-2">
//                             <Field
//                               type="radio"
//                               name={q.name}
//                               value="Yes"
//                               className="w-5 h-5 accent-green-600"
//                             />
//                             Yes
//                           </label>
//                           <label className="flex items-center gap-2">
//                             <Field
//                               type="radio"
//                               name={q.name}
//                               value="No"
//                               className="w-5 h-5 accent-red-600"
//                             />
//                             No
//                           </label>
//                         </div>
//                       </div>

                  
//                       {touched[q.name] && errors[q.name] && (
//                         <div className="text-red-500 text-sm">{errors[q.name]}</div>
//                       )}

                    
//                       {values[q.name] === "Yes" && (
//                         <div>
//                           <input
//                             type="file"
//                             onChange={(e) => handleFileChange(e, q.name)}
//                             className="w-full border border-gray-300 rounded px-2 py-1"
//                             accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//                           />
//                           {files[q.name] && (
//                             <p className="text-sm text-green-600 mt-1">
//                               File selected: {files[q.name].name}
//                             </p>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-8 text-center">
//                   <button
//                     type="submit"
//                     disabled={isSubmitting || loading}
//                     className="px-6 py-3 text-white rounded font-semibold h-18 w-40 cursor-pointer rounded-lg shadow hover:opacity-80 transition disabled:opacity-50 flex items-center justify-center"
//                     style={{ backgroundColor: "#f88d35" }}
//                   >
//                     {(isSubmitting || loading) ? (
//                       <Loader className="animate-spin" size={20} />
//                     ) : (
//                       "Submit"
//                     )}
//                   </button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </section>
//       </div>
//       <ToastContainer />
//     </>
//   );
// };

// export default ManagementPlan;