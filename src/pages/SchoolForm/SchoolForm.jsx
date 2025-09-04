// import React, { useState, useCallback } from "react";
// import axios from "axios";

// // import SchoolIcon from '@mui/icons-material/School';
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Paper,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormControlLabel,
//   Radio,
//   RadioGroup,
//   Snackbar,
//   Alert,
//   Chip,
//   Stack,
//   styled,
// } from "@mui/material";
// import { Upload as UploadIcon, Close as CloseIcon } from "@mui/icons-material";
// import { API_BASE_URL } from "../../api/index.js";
// import { useEffect } from "react";

// const DropZone = styled("div")(({ theme, isDragActive }) => ({
//   border: `2px dashed ${
//     isDragActive ? theme.palette.primary.main : theme.palette.divider
//   }`,
//   borderRadius: theme.shape.borderRadius,
//   padding: theme.spacing(3),
//   textAlign: "center",
//   backgroundColor: isDragActive ? "rgba(25, 118, 210, 0.04)" : "transparent",
//   cursor: "pointer",
//   marginBottom: theme.spacing(2),
//   transition: "all 0.2s ease",
//   "&:hover": {
//     borderColor: theme.palette.primary.main,
//     backgroundColor: "rgba(25, 118, 210, 0.04)",
//   },
// }));

// const FilePreview = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between",
//   padding: theme.spacing(1),
//   backgroundColor: theme.palette.grey[100],
//   borderRadius: theme.shape.borderRadius,
//   marginBottom: theme.spacing(1),
// }));

// const SchoolForm = ({
//   uploadedImages = [],
//   uploadedVideos = [],
//   uploadedLetter = null,
//   onResetImages = () => {},
//   onResetVideos = () => {},
//   onResetLetter = () => {},
// }) => {
//   // Form state
//   const [formData, setFormData] = useState({
//     schoolName: "",
//     teacherName: "",
//     teacherContact: "",
//     email: "",
//     schoolType: "",
//     state: "",
//     district: "",
//     block: "",
//     udiseCode: "",
//     totalStudentsMale: "",
//     totalStudentsFemale: "",
//     trainedStudentsMale: "",
//     trainedStudentsFemale: "",
//     trainedDisabledStudentsMale: "",
//     trainedDisabledStudentsFemale: "",
//     totalTeachersMale: "",
//     totalTeachersFemale: "",
//     trainedTeachersMale: "",
//     trainedTeachersFemale: "",
//     trainedDisabledTeachersMale: "",
//     trainedDisabledTeachersFemale: "",
//     hasDMPlan: "",
//     rapidSurvay: "",
//     hasDrill: "",
//     fireDrillConducted: "",
//     fireDrillCount: "",
//     fireDrillLastDate: "",
//     earthquakeDrillConducted: "",
//     earthquakeDrillCount: "",
//     earthquakeDrillLastDate: "",
//     heatwaveDrillConducted: "",
//     heatwaveDrillCount: "",
//     heatwaveDrillLastDate: "",
//     regionaldisasterDrillConducted: "",
//     regionaldisasterDrillCount: "",
//     regionaldisasterDrillLastDate: "",
//     urbanfloodDrillConducted: "",
//     urbanfloodDrillCount: "",
//     urbanfloodDrillLastDate: "",
//     otherDrillConducted: "",
//     otherDrillCount: "",
//     otherDrillLastDate: "",
//     hasSDMC: "",
//     hasRI: "",
//     hasMap: "",
//   });

//   // File states
//   const [sdmcFile, setSdmcFile] = useState(null);
//   const [riFile, setRiFile] = useState(null);
//   const [mapFile, setMapFile] = useState(null);
//   const [fireDrillFile, setFireDrillFile] = useState(null);
//   const [earthquakeDrillFile, setEarthquakeDrillFile] = useState(null);
//   const [heatwaveDrillFile, setHeatwaveDrillFile] = useState(null);
//   const [regionDisasterDrillFile, setRegionDisasterDrillFile] = useState(null);
//   const [urbanFloodDrillFile, setUrbanFloodDrillFile] = useState(null);
//   const [otherDrillFile, setOtherDrillFile] = useState(null);
//   const [dragActive, setDragActive] = useState(false);

//   const [selectedState, setSelectedState] = useState("all-india");
//   const [selectedDistrict, setSelectedDistrict] = useState("districts");
//   const [selectedStateId, setSelectedStateId] = useState("");
//   const [selectedDistrictName, setSelectedDistrictName] = useState("");
//   const [selectedDistrictId, setSelectedDistrictId] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [state1, setState1] = useState("");

//   const [allState, setAllState] = useState([]);
//   const [availableDistricts, setAvailableDistricts] = useState(["districts"]);
//   const [stateNum, setStateNum] = useState(50);
//   const [blockName, setBlockName] = useState("");
//   // UI states
//   const [loading, setLoading] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const [udiseCode, setUdiseCode] = useState("");
//   const [districtId, setDistrictId] = useState("");
//   const [allblock, setAllBlock] = useState([]);

//   useEffect(() => {
//     const fetchStates = async () => {
//       try {
//         // const res = await fetch(`${API_BASE_URL}/school/getStateWithId`);
//         const res = await fetch("http://localhost:5001/api/school/getStateWithId")
//         // const res = await fetch("http://localhost:5001/school/getStateWithId")
//         const data = await res.json();

//         if (data.success) {
//           const uniqueStates = Array.from(
//             new Map(data.states.map((item) => [item.stateId, item])).values()
//           );
//           setAllState(uniqueStates);
//         }
//       } catch (err) {
//         console.error("Error fetching states:", err);
//       }
//     };

//     fetchStates();
//   }, []);

//   useEffect(() => {
//     const fetchSchlByUdisecode = async () => {
//       if (!udiseCode || udiseCode === "0") return;

//       try {
//         let response = await axios.get(
//             `http://localhost:5001/api/register/getSchoolByUdiseCode/${udiseCode}`
//         //   `${API_BASE_URL}/register/getSchoolByUdiseCode/${udiseCode}`
//         );
//         let data = response.data.data.school;

//         console.log(response.data.data.school);

//         //Update form data
//         setFormData((prev) => ({
//           ...prev,
//           schoolName: data.address_y,
//           state: data.state,
//           block: data.block,
//           district: data.district,
//           state: data.state,
//           email: data.email,

//           totalStudentsMale: data.totalMaleStudent,
//           totalStudentsFemale: data.totalFemaleStudent,
//           trainedStudentsMale: data.totalTrainedMaleStudent,
//           trainedStudentsFemale: data.totalTrainedFemaleStudent,
//           trainedDisabledStudentsMale: data.totalTrainedDisabledMaleStudent,
//           trainedDisabledStudentsFemale: data.totalTrainedDisabledFemaleStudent,
//           totalTeachersMale: data.totalMaleTeacher,
//           totalTeachersFemale: data.totalFemaleTeacher,
//           trainedTeachersMale: data.totalTrainedMaleTeacher,
//           trainedTeachersFemale: data.totaltrainedFemaleTeacher,
//         }));

//         // Update dropdown selections
//         setSelectedStateId(data.state);
//         setBlockName(data.block);

//         // If you need to fetch districts for the state
//         if (data.stateName) {
//           const stateObj = allState.find((s) => s.stateName === data.stateName);
//           if (stateObj) {
//             const districtRes = await fetch(
//                 `http://localhost:5001/api/school/districts/${stateObj.stateId}`
//             //   `${API_BASE_URL}/school/districts/${stateObj.stateId}`
//             );
//             const districtData = await districtRes.json();
//             setAvailableDistricts(districtData.districts);
//           }
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchSchlByUdisecode();
//   }, [udiseCode]);

//   const handleData = (regionId, stateName) => {
//     const strId = String(regionId);
//     let formattedRegionId;
//     setState1(stateName);

//     // Special number swaps
//     if (strId === "9") {
//       formattedRegionId = "05";
//     } else if (strId === "5") {
//       formattedRegionId = "09";
//     }
//     // Handle other single-digit (1-9) → two-digit (01-09)
//     else if (/^[1-9]$/.test(strId)) {
//       formattedRegionId = strId.padStart(2, "0");
//     } else if (/^[0-9]{3}$/.test(strId)) {
//       formattedRegionId = strId.padStart(4, "0");
//     } else {
//       formattedRegionId = strId;
//     }

//     setStateNum(formattedRegionId);
//   };

//   const handleStateChange = async (event) => {
//     const stateId = event.target.value;
//     setSelectedStateId(stateId);

//     const selectedStateObj = allState.find(
//       (state) => state.stateId === stateId
//     );

//     if (selectedStateObj) {
//       setFormData((prev) => ({
//         ...prev,
//         state: selectedStateObj.stateName,
//         state1: selectedStateObj.stateId,
//         district: "",
//       }));

//       setState1(selectedStateObj.stateName);
//       handleData(selectedStateObj.stateRegionId, selectedStateObj.stateName);
//     }

//     try {
//     //   const response = await fetch(`${API_BASE_URL}/school/districts/${stateId}`);
//     const response = await fetch(`http://localhost:5001/school/districts/${stateId}`)
//       const data = await response.json();

//       const uniqueDistricts = [
//         ...new Map(data.districts.map((d) => [d.districtId, d])).values(),
//       ];

//       setAvailableDistricts(uniqueDistricts);
//     } catch (error) {
//       console.error("Failed to fetch districts:", error);
//     }
//   };

//   const handleDistrictChange = (e) => {
//     const districtId = e.target.value;

//     setSelectedDistrictId(districtId);
//     setSelectedDistrictName(districtId);

//     setDistrictId(districtId);
//   };

//   useEffect(() => {
//     const fetchBlocks = async () => {
//       if (!districtId) return;

//       try {
//         const response = await axios.get(
//             `http://localhost:5001/api/school/blocks/${districtId}`
//         //   `${API_BASE_URL}/school/blocks/${districtId}`
//         );
//         console.log("Blocks data:", response.data.blocks);

//         // Set the blocks in state
//         setAllBlock(response.data.blocks);

//         // If there's a pre-filled block name (from UDISE lookup), try to match it
//         if (blockName && response.data.blocks.length > 0) {
//           const matchedBlock = response.data.blocks.find(
//             (b) => b.blockName === blockName
//           );
//           if (matchedBlock) {
//             setBlockName(matchedBlock.blockName);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching blocks:", error);
//         setAllBlock([]);
//       }
//     };

//     fetchBlocks();
//   }, [districtId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleDrag = useCallback((e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   }, []);

//   const handleDrop = useCallback((e, setter) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       setter(e.dataTransfer.files[0]);
//     }
//   }, []);

//   const handleFileChange = (setter) => (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setter(e.target.files[0]);
//     }
//   };

//   const removeFile = (setter) => () => {
//     setter(null);
//   };

//   const renderFileUpload = (
//     label,
//     file,
//     setter,
//     accept = ".jpg,.jpeg,.png,.gif"
//   ) => {
//     return (
//       <Box sx={{ mb: 3 }}>
//         <Typography variant="subtitle1" gutterBottom>
//           {label}
//         </Typography>
//         {file ? (
//           <FilePreview>
//             <Typography variant="body2">{file.name}</Typography>
//             <CloseIcon
//               fontSize="small"
//               color="error"
//               onClick={removeFile(setter)}
//               sx={{ cursor: "pointer" }}
//             />
//           </FilePreview>
//         ) : (
//           <>
//             <DropZone
//               isDragActive={dragActive}
//               onDragEnter={handleDrag}
//               onDragLeave={handleDrag}
//               onDragOver={handleDrag}
//               onDrop={(e) => handleDrop(e, setter)}
//               onClick={() => document.getElementById(`${label}-input`).click()}
//             >
//               <UploadIcon color="action" />
//               <Typography variant="body2" sx={{ mt: 1 }}>
//                 Drag and drop your file here or click to browse
//               </Typography>
//               <Typography variant="caption" color="textSecondary">
//                 Accepted formats: {accept}
//               </Typography>
//             </DropZone>
//             <input
//               id={`${label}-input`}
//               type="file"
//               accept={accept}
//               onChange={handleFileChange(setter)}
//               style={{ display: "none" }}
//             />
//           </>
//         )}
//       </Box>
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formDataToSend = new FormData();

//     // formDataToSend.append("district", selectedDistrictName);
//     formDataToSend.append("block", blockName);
//     formDataToSend.append("udiseCode", udiseCode);
//     formDataToSend.append("district", formData.district);

//     // Append all form data
//     for (const key in formData) {
//       console.log(key);
//       if (formData[key] !== "") {
//         formDataToSend.append(key, formData[key]);
//       }
//     }

//     // Append files from props
//     uploadedImages.forEach((image, index) => {
//       formDataToSend.append(`photo`, image);
//     });

//     uploadedVideos.forEach((video, index) => {
//       formDataToSend.append(`video`, video);
//     });

//     if (uploadedLetter) {
//       formDataToSend.append("letter", uploadedLetter);
//     }

//     // Append conditional files
//     if (sdmcFile) formDataToSend.append("sdmc", sdmcFile);
//     if (riFile) formDataToSend.append("ri", riFile);
//     if (mapFile) formDataToSend.append("map", mapFile);
//     if (fireDrillFile) formDataToSend.append("fireDrillDoc", fireDrillFile);
//     if (earthquakeDrillFile)
//       formDataToSend.append("earthquakeDrillDoc", earthquakeDrillFile);
//     if (heatwaveDrillFile)
//       formDataToSend.append("heatwaveDrillDoc", heatwaveDrillFile);
//     if (regionDisasterDrillFile)
//       formDataToSend.append("regionDisasterDrillDoc", regionDisasterDrillFile);
//     if (urbanFloodDrillFile)
//       formDataToSend.append("urbanFloodDrillDoc", urbanFloodDrillFile);
//     if (otherDrillFile) formDataToSend.append("otherDrillDoc", otherDrillFile);

//     try {
//       const response = await axios.post(
//         // "http://localhost:5001/register/upload/${formData.email",
//         `${API_BASE_URL}/register/upload/${formData.email}`,
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log(response)
//       setSnackbar({
//         open: true,
//         message: "Form submitted successfully!",
//         severity: "success",
//       });

//       resetForm();
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setSnackbar({
//         open: true,
//         message: "Error submitting form. Please try again.",
//         severity: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       schoolName: "",
//       teacherName: "",
//       teacherContact: "",
//       email: "",
//       schoolType: "",
//       udiseCode: "",
//       blockName: "",
//       state1: "",
//       district: "",
//       totalStudentsMale: "",
//       totalStudentsFemale: "",
//       trainedStudentsMale: "",
//       trainedStudentsFemale: "",
//       trainedDisabledStudentsMale: "",
//       trainedDisabledStudentsFemale: "",
//       totalTeachersMale: "",
//       totalTeachersFemale: "",
//       trainedTeachersMale: "",
//       trainedTeachersFemale: "",
//       trainedDisabledTeachersMale: "",
//       trainedDisabledTeachersFemale: "",
//       hasDMPlan: "",
//       rapidSurvay: "",
//       hasDrill: "",
//       fireDrillConducted: "",
//       fireDrillCount: "",
//       fireDrillLastDate: "",
//       earthquakeDrillConducted: "",
//       earthquakeDrillCount: "",
//       earthquakeDrillLastDate: "",
//       heatwaveDrillConducted: "",
//       heatwaveDrillCount: "",
//       heatwaveDrillLastDate: "",
//       regionaldisasterDrillConducted: "",
//       regionaldisasterDrillCount: "",
//       regionaldisasterDrillLastDate: "",
//       urbanfloodDrillConducted: "",
//       urbanfloodDrillCount: "",
//       urbanfloodDrillLastDate: "",
//       otherDrillConducted: "",
//       otherDrillCount: "",
//       otherDrillLastDate: "",
//       hasSDMC: "",
//       hasRI: "",
//       hasMap: "",
//       state: "",
//     });

//     // Call the reset callbacks for the props
//     if (typeof onResetImages === "function") onResetImages();
//     if (typeof onResetVideos === "function") onResetVideos();
//     if (typeof onResetLetter === "function") onResetLetter();

//     // Reset file states
//     setSdmcFile(null);
//     setRiFile(null);
//     setMapFile(null);
//     setFireDrillFile(null);
//     setEarthquakeDrillFile(null);
//     setHeatwaveDrillFile(null);
//     setRegionDisasterDrillFile(null);
//     setUrbanFloodDrillFile(null);
//     setOtherDrillFile(null);
//     setUdiseCode("");
//     setBlockName("");

//     // Reset location selections
//     setSelectedStateId("");
//     setSelectedDistrictName("");
//     setSelectedDistrictId("");
//     setState1("all-india");
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar((prev) => ({ ...prev, open: false }));
//   };

//   // Check if UDISE code is empty or 0
//   const isUdiseEmpty = !udiseCode || udiseCode === "0";

//   // console.log("UDISE CODE", udiseCode);

//   return (
//     <div className="container">
// <Box sx={{ p: 3 }}>
//       <Paper elevation={3} sx={{ p: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           School Registration Form
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           {/* UDISE Code at the top */}
//           <Grid container spacing={3} sx={{ mb: 3 }}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="UDISE Code"
//                 name="udiseCode"
//                 variant="outlined"
//                 fullWidth
//                 required
//                 value={udiseCode}
//                 onChange={(e) => setUdiseCode(e.target.value)}
//                 helperText="Enter UDISE code to auto-fill school details"
//               />
//             </Grid>
//           </Grid>

//           {/* School Information Section */}
//           <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
//             School Information
//           </Typography>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="School Name"
//                 name="schoolName"
//                 value={formData.schoolName}
//                 onChange={handleChange}
//                 required
//                 disabled={isUdiseEmpty}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Teacher Name"
//                 name="teacherName"
//                 value={formData.teacherName}
//                 onChange={handleChange}
//                 required
//                 disabled={isUdiseEmpty}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Teacher Contact"
//                 name="teacherContact"
//                 value={formData.teacherContact}
//                 onChange={handleChange}
//                 required
//                 disabled={isUdiseEmpty}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 disabled={isUdiseEmpty}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth>
//                 <InputLabel required>School Type</InputLabel>
//                 <Select
//                   name="schoolType"
//                   value={formData.schoolType}
//                   onChange={handleChange}
//                   label="School Type"
//                   required
//                   disabled={isUdiseEmpty}
//                 >
//                   <MenuItem value="Private">Private</MenuItem>
//                   <MenuItem value="Government">Government</MenuItem>
//                   <MenuItem value="Other">Other</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth>
//                 <InputLabel required>State</InputLabel>
//                 <Select
//                   label="State"
//                   value={selectedStateId || ""}
//                   onChange={handleStateChange}
//                   disabled={isLoading || isUdiseEmpty}
//                   displayEmpty
//                   variant="outlined"
//                 >
//                   {formData.state ? (
//                     <MenuItem value={selectedStateId} key="prefilled-state">
//                       {formData.state}
//                     </MenuItem>
//                   ) : (
//                     allState.map((state) => (
//                       <MenuItem
//                         key={state.stateId}
//                         value={state.stateId}
//                         sx={{ fontSize: "0.875rem" }}
//                       >
//                         {state.stateName}
//                       </MenuItem>
//                     ))
//                   )}
//                 </Select>
//               </FormControl>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth>
//                 <InputLabel key={''} required>District</InputLabel>
//                 <Select
//                   label="District"
//                   value={formData.district || ""}
//                   onChange={handleDistrictChange}
//                   required
//                   disabled={!selectedStateId || isLoading || isUdiseEmpty}
//                   variant="outlined"
//                 >
//                   {formData.district ? (
//                     <MenuItem value={formData.district}>
//                       {formData.district}
//                     </MenuItem>
//                   ) : (
//                     availableDistricts.map((district) => (
//                       <MenuItem
//                         key={district.districtId}
//                         value={district.districtId}
//                       >
//                         {district.districtName}
//                       </MenuItem>
//                     ))
//                   )}
//                 </Select>
//               </FormControl>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Block"
//                 name="block"
//                 variant="outlined"
//                 fullWidth
//                 required
//                 value={blockName}
//                 onChange={(e) => setBlockName(e.target.value)}
//                 disabled={isUdiseEmpty}
//               />
//             </Grid>
//           </Grid>

//           {/* Student Information Section */}
//           <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
//             Student Information
//           </Typography>
//           <Grid container spacing={3}>
//             {/* Total Students */}
//             <Grid item xs={12}>
//               <Typography variant="subtitle1" gutterBottom>
//                 Total Students
//               </Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Male"
//                 name="totalStudentsMale"
//                 type="number"
//                 value={formData.totalStudentsMale}
//                 onChange={handleChange}
//                 disabled={isUdiseEmpty}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Female"
//                 name="totalStudentsFemale"
//                 type="number"
//                 value={formData.totalStudentsFemale}
//                 onChange={handleChange}
//                 disabled={isUdiseEmpty}
//               />
//             </Grid>

//             {/* Trained Students */}
//             <Grid item xs={12} sx={{ mt: 1 }}>
//               <Typography variant="subtitle1" gutterBottom>
//                 Trained Students
//               </Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Male"
//                 name="trainedStudentsMale"
//                 type="number"
//                 value={formData.trainedStudentsMale}
//                 onChange={handleChange}
//                 disabled={isUdiseEmpty}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Female"
//                 name="trainedStudentsFemale"
//                 type="number"
//                 value={formData.trainedStudentsFemale}
//                 onChange={handleChange}
//                 disabled={isUdiseEmpty}
//               />
//             </Grid>

//             {/* Trained Disabled Students */}
//             <Grid item xs={12} sx={{ mt: 1 }}>
//               <Typography variant="subtitle1" gutterBottom>
//                 Trained Disabled Students
//               </Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Male"
//                 name="trainedDisabledStudentsMale"
//                 type="number"
//                 value={formData.trainedDisabledStudentsMale}
//                 onChange={handleChange}
//                 disabled={isUdiseEmpty}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Female"
//                 name="trainedDisabledStudentsFemale"
//                 type="number"
//                 value={formData.trainedDisabledStudentsFemale}
//                 onChange={handleChange}
//                 disabled={isUdiseEmpty}
//               />
//             </Grid>
//           </Grid>

//           {/* Teacher Information Section */}
//           <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
//             Teacher Information
//           </Typography>
//           <Grid container spacing={3}>
//             {/* Total Teachers */}
//             <Grid item xs={12}>
//               <Typography variant="subtitle1" gutterBottom>
//                 Total Teachers
//               </Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Male"
//                 name="totalTeachersMale"
//                 type="number"
//                 value={formData.totalTeachersMale}
//                 onChange={handleChange}
//                 disabled={isUdiseEmpty}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Female"
//                 name="totalTeachersFemale"
//                 type="number"
//                 value={formData.totalTeachersFemale}
//                 onChange={handleChange}
//                 disabled={isUdiseEmpty}
//               />
//             </Grid>

//             {/* Trained Teachers */}
//             <Grid item xs={12} sx={{ mt: 1 }}>
//               <Typography variant="subtitle1" gutterBottom>
//                 Trained Teachers
//               </Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Male"
//                 name="trainedTeachersMale"
//                 type="number"
//                 value={formData.trainedTeachersMale}
//                 onChange={handleChange}
//                 disabled={isUdiseEmpty}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Female"
//                 name="trainedTeachersFemale"
//                 type="number"
//                 value={formData.trainedTeachersFemale}
//                 onChange={handleChange}
//                 disabled={isUdiseEmpty}
//               />
//             </Grid>
//           </Grid>

//           {/* Disaster Management Section */}
//           <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
//             Disaster Management
//           </Typography>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <FormControl component="fieldset">
//                 <Typography component="legend">
//                   Rapid Visual Survay Done?
//                 </Typography>
//                 <RadioGroup
//                   row
//                   name="rapidSurvay"
//                   value={formData.rapidSurvay}
//                   onChange={handleChange}
//                 >
//                   <FormControlLabel
//                     value="yes"
//                     control={<Radio />}
//                     label="Yes"
//                     disabled={isUdiseEmpty}
//                   />
//                   <FormControlLabel
//                     value="no"
//                     control={<Radio />}
//                     label="No"
//                     disabled={isUdiseEmpty}
//                   />
//                 </RadioGroup>
//               </FormControl>
//             </Grid>

//             <Grid item xs={12}>
//               <FormControl component="fieldset">
//                 <Typography component="legend">
//                   Conducted any drills in last 6 months?
//                 </Typography>
//                 <RadioGroup
//                   row
//                   name="hasDrill"
//                   value={formData.hasDrill}
//                   onChange={handleChange}
//                 >
//                   <FormControlLabel
//                     value="yes"
//                     control={<Radio />}
//                     label="Yes"
//                     disabled={isUdiseEmpty}
//                   />
//                   <FormControlLabel
//                     value="no"
//                     control={<Radio />}
//                     label="No"
//                     disabled={isUdiseEmpty}
//                   />
//                 </RadioGroup>
//               </FormControl>
//             </Grid>

//             {formData.hasDrill === "yes" && (
//               <>
//                 <Grid item xs={12}>
//                   <Typography variant="subtitle1">Fire Drill</Typography>
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <FormControl fullWidth>
//                     <InputLabel>Conducted?</InputLabel>
//                     <Select
//                       name="fireDrillConducted"
//                       value={formData.fireDrillConducted}
//                       onChange={handleChange}
//                       label="Conducted?"
//                       disabled={isUdiseEmpty}
//                     >
//                       <MenuItem value="yes">Yes</MenuItem>
//                       <MenuItem value="no">No</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 {formData.fireDrillConducted === "yes" && (
//                   <>
//                     <Grid item xs={12} md={4}>
//                       <TextField
//                         fullWidth
//                         label="Last Date"
//                         name="fireDrillLastDate"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         value={formData.fireDrillLastDate}
//                         onChange={handleChange}
//                         disabled={isUdiseEmpty}
//                       />
//                     </Grid>

//                     <Grid item xs={12} md={4}>
//                       <TextField
//                         fullWidth
//                         label="Count"
//                         name="fireDrillCount"
//                         type="number"
//                         InputLabelProps={{ shrink: true }}
//                         value={formData.fireDrillCount}
//                         onChange={handleChange}
//                         disabled={isUdiseEmpty}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       {renderFileUpload(
//                         "Upload Fire Drill Images/Document",
//                         fireDrillFile,
//                         setFireDrillFile
//                       )}
//                     </Grid>
//                   </>
//                 )}

//                 <Grid item xs={12}>
//                   <Typography variant="subtitle1">Earthquake Drill</Typography>
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <FormControl fullWidth>
//                     <InputLabel>Conducted?</InputLabel>
//                     <Select
//                       name="earthquakeDrillConducted"
//                       value={formData.earthquakeDrillConducted}
//                       onChange={handleChange}
//                       label="Conducted?"
//                       disabled={isUdiseEmpty}
//                     >
//                       <MenuItem value="yes">Yes</MenuItem>
//                       <MenuItem value="no">No</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 {formData.earthquakeDrillConducted === "yes" && (
//                   <>
//                     <Grid item xs={12} md={4}>
//                       <TextField
//                         fullWidth
//                         label="Last Date"
//                         name="earthquakeDrillLastDate"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         value={formData.earthquakeDrillLastDate}
//                         onChange={handleChange}
//                         disabled={isUdiseEmpty}
//                       />
//                     </Grid>

//                     <Grid item xs={12} md={4}>
//                       <TextField
//                         fullWidth
//                         label="Count"
//                         name="earthquakeDrillCount"
//                         type="number"
//                         InputLabelProps={{ shrink: true }}
//                         value={formData.earthquakeDrillCount}
//                         onChange={handleChange}
//                         disabled={isUdiseEmpty}
//                       />
//                     </Grid>

//                     <Grid item xs={12}>
//                       {renderFileUpload(
//                         "Upload Earthquake Drill Images/Document",
//                         earthquakeDrillFile,
//                         setEarthquakeDrillFile
//                       )}
//                     </Grid>
//                   </>
//                 )}

//                 <Grid item xs={12}>
//                   <Typography variant="subtitle1">Heatwave Drill</Typography>
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <FormControl fullWidth>
//                     <InputLabel>Conducted?</InputLabel>
//                     <Select
//                       name="heatwaveDrillConducted"
//                       value={formData.heatwaveDrillConducted}
//                       onChange={handleChange}
//                       label="Conducted?"
//                       disabled={isUdiseEmpty}
//                     >
//                       <MenuItem value="yes">Yes</MenuItem>
//                       <MenuItem value="no">No</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 {formData.heatwaveDrillConducted === "yes" && (
//                   <>
//                     <Grid item xs={12} md={4}>
//                       <TextField
//                         fullWidth
//                         label="Last Date"
//                         name="heatwaveDrillLastDate"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         value={formData.heatwaveDrillLastDate}
//                         onChange={handleChange}
//                         disabled={isUdiseEmpty}
//                       />
//                     </Grid>

//                     <Grid item xs={12} md={4}>
//                       <TextField
//                         fullWidth
//                         label="Count"
//                         name="heatwaveDrillCount"
//                         type="number"
//                         InputLabelProps={{ shrink: true }}
//                         value={formData.heatwaveDrillCount}
//                         onChange={handleChange}
//                         disabled={isUdiseEmpty}
//                       />
//                     </Grid>

//                     <Grid item xs={12}>
//                       {renderFileUpload(
//                         "Upload Heatwave Drill Images/Document",
//                         heatwaveDrillFile,
//                         setHeatwaveDrillFile
//                       )}
//                     </Grid>
//                   </>
//                 )}

//                 <Grid item xs={12}>
//                   <Typography variant="subtitle1">
//                     Region Specific Disaster Drill
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <FormControl fullWidth>
//                     <InputLabel>Conducted?</InputLabel>
//                     <Select
//                       name="regionaldisasterDrillConducted"
//                       value={formData.regionaldisasterDrillConducted}
//                       onChange={handleChange}
//                       label="Conducted?"
//                       disabled={isUdiseEmpty}
//                     >
//                       <MenuItem value="yes">Yes</MenuItem>
//                       <MenuItem value="no">No</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 {formData.regionaldisasterDrillConducted === "yes" && (
//                   <>
//                     <Grid item xs={12} md={4}>
//                       <TextField
//                         fullWidth
//                         label="Last Date"
//                         name="regionaldisasterDrillLastDate"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         value={formData.regionaldisasterDrillLastDate}
//                         onChange={handleChange}
//                         disabled={isUdiseEmpty}
//                       />
//                     </Grid>

//                     <Grid item xs={12} md={4}>
//                       <TextField
//                         fullWidth
//                         label="Count"
//                         name="regionaldisasterDrillCount"
//                         type="number"
//                         InputLabelProps={{ shrink: true }}
//                         value={formData.regionaldisasterDrillCount}
//                         onChange={handleChange}
//                         disabled={isUdiseEmpty}
//                       />
//                     </Grid>

//                     <Grid item xs={12}>
//                       {renderFileUpload(
//                         "Upload Region Disaster Drill Images/Document",
//                         regionDisasterDrillFile,
//                         setRegionDisasterDrillFile
//                       )}
//                     </Grid>
//                   </>
//                 )}

//                 <Grid item xs={12}>
//                   <Typography variant="subtitle1">Urban Flood Drill</Typography>
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <FormControl fullWidth>
//                     <InputLabel>Conducted?</InputLabel>
//                     <Select
//                       name="urbanfloodDrillConducted"
//                       value={formData.urbanfloodDrillConducted}
//                       onChange={handleChange}
//                       label="Conducted?"
//                       disabled={isUdiseEmpty}
//                     >
//                       <MenuItem value="yes">Yes</MenuItem>
//                       <MenuItem value="no">No</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 {formData.urbanfloodDrillConducted === "yes" && (
//                   <>
//                     <Grid item xs={12} md={4}>
//                       <TextField
//                         fullWidth
//                         label="Last Date"
//                         name="urbanfloodDrillLastDate"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         value={formData.urbanfloodDrillLastDate}
//                         onChange={handleChange}
//                         disabled={isUdiseEmpty}
//                       />
//                     </Grid>

//                     <Grid item xs={12} md={4}>
//                       <TextField
//                         fullWidth
//                         label="Count"
//                         name="urbanfloodDrillCount"
//                         type="number"
//                         InputLabelProps={{ shrink: true }}
//                         value={formData.urbanfloodDrillCount}
//                         onChange={handleChange}
//                         disabled={isUdiseEmpty}
//                       />
//                     </Grid>

//                     <Grid item xs={12}>
//                       {renderFileUpload(
//                         "Upload Urban Flood Drill Images/Document",
//                         urbanFloodDrillFile,
//                         setUrbanFloodDrillFile
//                       )}
//                     </Grid>
//                   </>
//                 )}

//                 <Grid item xs={12}>
//                   <Typography variant="subtitle1">Other Drill</Typography>
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <FormControl fullWidth>
//                     <InputLabel>Conducted?</InputLabel>
//                     <Select
//                       name="otherDrillConducted"
//                       value={formData.otherDrillConducted}
//                       onChange={handleChange}
//                       label="Conducted?"
//                       disabled={isUdiseEmpty}
//                     >
//                       <MenuItem value="yes">Yes</MenuItem>
//                       <MenuItem value="no">No</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 {formData.otherDrillConducted === "yes" && (
//                   <>
//                     <Grid item xs={12} md={4}>
//                       <TextField
//                         fullWidth
//                         label="Last Date"
//                         name="otherDrillLastDate"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         value={formData.otherDrillLastDate}
//                         onChange={handleChange}
//                         disabled={isUdiseEmpty}
//                       />
//                     </Grid>

//                     <Grid item xs={12} md={4}>
//                       <TextField
//                         fullWidth
//                         label="Count"
//                         name="otherDrillCount"
//                         type="number"
//                         InputLabelProps={{ shrink: true }}
//                         value={formData.otherDrillCount}
//                         onChange={handleChange}
//                         disabled={isUdiseEmpty}
//                       />
//                     </Grid>

//                     <Grid item xs={12}>
//                       {renderFileUpload(
//                         "Upload Other Drill Document",
//                         otherDrillFile,
//                         setOtherDrillFile
//                       )}
//                     </Grid>
//                   </>
//                 )}
//               </>
//             )}

//             <Grid item xs={12}>
//               <FormControl component="fieldset">
//                 <Typography component="legend">
//                   School Disaster Management Committee formed?
//                 </Typography>
//                 <RadioGroup
//                   row
//                   name="hasSDMC"
//                   value={formData.hasSDMC}
//                   onChange={handleChange}
//                 >
//                   <FormControlLabel
//                     value="yes"
//                     control={<Radio />}
//                     label="Yes"
//                     disabled={isUdiseEmpty}
//                   />
//                   <FormControlLabel
//                     value="no"
//                     control={<Radio />}
//                     label="No"
//                     disabled={isUdiseEmpty}
//                   />
//                 </RadioGroup>
//               </FormControl>
//             </Grid>

//             {formData.hasSDMC === "yes" && (
//               <Grid item xs={12}>
//                 {renderFileUpload(
//                   "Upload SDMC Document",
//                   sdmcFile,
//                   setSdmcFile
//                 )}
//               </Grid>
//             )}

//             <Grid item xs={12}>
//               <FormControl component="fieldset">
//                 <Typography component="legend">
//                   Resource Inventory Maintained?
//                 </Typography>
//                 <RadioGroup
//                   row
//                   name="hasRI"
//                   value={formData.hasRI}
//                   onChange={handleChange}
//                 >
//                   <FormControlLabel
//                     value="yes"
//                     control={<Radio />}
//                     label="Yes"
//                     disabled={isUdiseEmpty}
//                   />
//                   <FormControlLabel
//                     value="no"
//                     control={<Radio />}
//                     label="No"
//                     disabled={isUdiseEmpty}
//                   />
//                 </RadioGroup>
//               </FormControl>
//             </Grid>

//             {formData.hasRI === "yes" && (
//               <Grid item xs={12}>
//                 {renderFileUpload(
//                   "Upload Resource Inventory",
//                   riFile,
//                   setRiFile
//                 )}
//               </Grid>
//             )}

//             <Grid item xs={12}>
//               <FormControl component="fieldset">
//                 <Typography component="legend">
//                   Evacuation plan with exit map.
//                 </Typography>
//                 <RadioGroup
//                   row
//                   name="hasMap"
//                   value={formData.hasMap}
//                   onChange={handleChange}
//                 >
//                   <FormControlLabel
//                     value="yes"
//                     control={<Radio />}
//                     label="Yes"
//                     disabled={isUdiseEmpty}
//                   />
//                   <FormControlLabel
//                     value="no"
//                     control={<Radio />}
//                     label="No"
//                     disabled={isUdiseEmpty}
//                   />
//                 </RadioGroup>
//               </FormControl>
//             </Grid>

//             {formData.hasMap === "yes" && (
//               <Grid item xs={12}>
//                 {renderFileUpload(
//                   "Upload School Map / Exit Plan",
//                   mapFile,
//                   setMapFile,
//                   ".pdf,.doc,.docx,.jpg,.jpeg,.png"
//                 )}
//               </Grid>
//             )}

//             {/* Disaster Management Section */}

//             <Grid item xs={12}>
//               <FormControl component="fieldset">
//                 <Typography component="legend">
//                   School Disaster Management Plan created?
//                 </Typography>
//                 <RadioGroup
//                   row
//                   name="hasDMPlan"
//                   value={formData.hasDMPlan}
//                   onChange={handleChange}
//                 >
//                   <FormControlLabel
//                     value="yes"
//                     control={<Radio />}
//                     label="Yes"
//                     disabled={isUdiseEmpty}
//                   />
//                   <FormControlLabel
//                     value="no"
//                     control={<Radio />}
//                     label="No"
//                     disabled={isUdiseEmpty}
//                   />
//                 </RadioGroup>
//               </FormControl>
//             </Grid>
//           </Grid>

//           <Box sx={{ mt: 4 }}>
//             <Button
//               type="submit"
//               variant="contained"
//             //   color="secondary"
//               size="large"
//               disabled={loading || isUdiseEmpty}
//               fullWidth
//               style={{backgroundColor:"#f88d35", color:"whitesmoke"}}
//             >
//               {loading ? "Submitting..." : "Submit Form"}
//             </Button>
//           </Box>
//         </form>
//       </Paper>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//     </div>
//   );
// };

// export default SchoolForm;


import React, { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  Snackbar,
  Alert,
  styled,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { Upload as UploadIcon, Close as CloseIcon } from "@mui/icons-material";
import { API_BASE_URL } from "../../api/index.js";

// Custom hook for debouncing
const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);

  const debouncedCallback = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [debouncedCallback, cancel];
};

const DropZone = styled("div")(({ theme, isDragActive }) => ({
  border: `2px dashed ${
    isDragActive ? theme.palette.primary.main : theme.palette.divider
  }`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  textAlign: "center",
  backgroundColor: isDragActive ? "rgba(25, 118, 210, 0.04)" : "transparent",
  cursor: "pointer",
  marginBottom: theme.spacing(2),
  transition: "all 0.2s ease",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: "rgba(25, 118, 210, 0.04)",
  },
}));

const FilePreview = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(1),
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
}));

const validationSchema = Yup.object({
  udiseCode: Yup.string().required("UDISE Code is required"),
  schoolName: Yup.string().required("School Name is required"),
  teacherName: Yup.string().required("Teacher Name is required"),
  teacherContact: Yup.string()
    .matches(/^[0-9]{10}$/, "Contact must be 10 digits")
    .required("Teacher Contact is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  schoolType: Yup.string().required("School Type is required"),
  state: Yup.string().required("State is required"),
  district: Yup.string().required("District is required"),
  block: Yup.string().required("Block is required"),
  totalStudentsMale: Yup.number().min(0, "Must be positive").nullable(),
  totalStudentsFemale: Yup.number().min(0, "Must be positive").nullable(),
  trainedStudentsMale: Yup.number().min(0, "Must be positive").nullable(),
  trainedStudentsFemale: Yup.number().min(0, "Must be positive").nullable(),
  trainedDisabledStudentsMale: Yup.number().min(0, "Must be positive").nullable(),
  trainedDisabledStudentsFemale: Yup.number().min(0, "Must be positive").nullable(),
  totalTeachersMale: Yup.number().min(0, "Must be positive").nullable(),
  totalTeachersFemale: Yup.number().min(0, "Must be positive").nullable(),
  trainedTeachersMale: Yup.number().min(0, "Must be positive").nullable(),
  trainedTeachersFemale: Yup.number().min(0, "Must be positive").nullable(),
  hasDMPlan: Yup.string().required("Please select an option"),
  rapidSurvay: Yup.string().required("Please select an option"),
  hasDrill: Yup.string().required("Please select an option"),
  hasSDMC: Yup.string().required("Please select an option"),
  hasRI: Yup.string().required("Please select an option"),
  hasMap: Yup.string().required("Please select an option"),
});

const initialValues = {
  udiseCode: "",
  schoolName: "",
  teacherName: "",
  teacherContact: "",
  email: "",
  schoolType: "",
  state: "",
  district: "",
  block: "",
  totalStudentsMale: "",
  totalStudentsFemale: "",
  trainedStudentsMale: "",
  trainedStudentsFemale: "",
  trainedDisabledStudentsMale: "",
  trainedDisabledStudentsFemale: "",
  totalTeachersMale: "",
  totalTeachersFemale: "",
  trainedTeachersMale: "",
  trainedTeachersFemale: "",
  trainedDisabledTeachersMale: "",
  trainedDisabledTeachersFemale: "",
  hasDMPlan: "",
  rapidSurvay: "",
  hasDrill: "",
  fireDrillConducted: "",
  fireDrillCount: "",
  fireDrillLastDate: "",
  earthquakeDrillConducted: "",
  earthquakeDrillCount: "",
  earthquakeDrillLastDate: "",
  heatwaveDrillConducted: "",
  heatwaveDrillCount: "",
  heatwaveDrillLastDate: "",
  regionaldisasterDrillConducted: "",
  regionaldisasterDrillCount: "",
  regionaldisasterDrillLastDate: "",
  urbanfloodDrillConducted: "",
  urbanfloodDrillCount: "",
  urbanfloodDrillLastDate: "",
  otherDrillConducted: "",
  otherDrillCount: "",
  otherDrillLastDate: "",
  hasSDMC: "",
  hasRI: "",
  hasMap: "",
};

const FormikTextField = ({ field, form, ...props }) => {
  const { name } = field;
  const { touched, errors } = form;
  
  return (
    <TextField
      {...field}
      {...props}
      error={touched[name] && !!errors[name]}
      helperText={touched[name] && errors[name]}
    />
  );
};

const FormikSelect = ({ field, form, children, label, ...props }) => {
  const { name } = field;
  const { touched, errors } = form;
  
  return (
    <FormControl fullWidth error={touched[name] && !!errors[name]} {...props}>
      <InputLabel>{label}</InputLabel>
      <Select {...field} label={label}>
        {children}
      </Select>
      {touched[name] && errors[name] && (
        <FormHelperText>{errors[name]}</FormHelperText>
      )}
    </FormControl>
  );
};

const SchoolForm = ({
  uploadedImages = [],
  uploadedVideos = [],
  uploadedLetter = null,
  onResetImages = () => {},
  onResetVideos = () => {},
  onResetLetter = () => {},
}) => {
  // File states
  const [sdmcFile, setSdmcFile] = useState(null);
  const [riFile, setRiFile] = useState(null);
  const [mapFile, setMapFile] = useState(null);
  const [fireDrillFile, setFireDrillFile] = useState(null);
  const [earthquakeDrillFile, setEarthquakeDrillFile] = useState(null);
  const [heatwaveDrillFile, setHeatwaveDrillFile] = useState(null);
  const [regionDisasterDrillFile, setRegionDisasterDrillFile] = useState(null);
  const [urbanFloodDrillFile, setUrbanFloodDrillFile] = useState(null);
  const [otherDrillFile, setOtherDrillFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // Location states
  const [selectedStateId, setSelectedStateId] = useState("");
  const [selectedDistrictName, setSelectedDistrictName] = useState("");
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [state1, setState1] = useState("");
  const [allState, setAllState] = useState([]);
  const [availableDistricts, setAvailableDistricts] = useState(["districts"]);
  const [stateNum, setStateNum] = useState(50);
  const [blockName, setBlockName] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [allblock, setAllBlock] = useState([]);

  // Loading states for API calls
  const [udiseLoading, setUdiseLoading] = useState(false);
  const [stateLoading, setStateLoading] = useState(false);
  const [districtLoading, setDistrictLoading] = useState(false);

  // UI states
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Debounced functions with different delays based on operation complexity
  const [debouncedUdiseFetch] = useDebounce(async (udiseCode, setFieldValue) => {
    if (!udiseCode || udiseCode === "0") {
      setUdiseLoading(false);
      return;
    }

    try {
      setUdiseLoading(true);
      const response = await axios.get(
        `http://localhost:5001/api/register/getSchoolByUdiseCode/${udiseCode}`
      );
      const data = response.data.data.school;

      // Update form values using Formik's setFieldValue
      setFieldValue("schoolName", data.address_y || "");
      setFieldValue("state", data.state || "");
      setFieldValue("block", data.block || "");
      setFieldValue("district", data.district || "");
      setFieldValue("email", data.email || "");
      setFieldValue("totalStudentsMale", data.totalMaleStudent || "");
      setFieldValue("totalStudentsFemale", data.totalFemaleStudent || "");
      setFieldValue("trainedStudentsMale", data.totalTrainedMaleStudent || "");
      setFieldValue("trainedStudentsFemale", data.totalTrainedFemaleStudent || "");
      setFieldValue("trainedDisabledStudentsMale", data.totalTrainedDisabledMaleStudent || "");
      setFieldValue("trainedDisabledStudentsFemale", data.totalTrainedDisabledFemaleStudent || "");
      setFieldValue("totalTeachersMale", data.totalMaleTeacher || "");
      setFieldValue("totalTeachersFemale", data.totalFemaleTeacher || "");
      setFieldValue("trainedTeachersMale", data.totalTrainedMaleTeacher || "");
      setFieldValue("trainedTeachersFemale", data.totaltrainedFemaleTeacher || "");

      // Update other states
      setSelectedStateId(data.state);
      setBlockName(data.block);

      // Fetch districts if state is available
      if (data.stateName) {
        const stateObj = allState.find((s) => s.stateName === data.stateName);
        if (stateObj) {
          const districtRes = await fetch(
            `http://localhost:5001/api/school/districts/${stateObj.stateId}`
          );
          const districtData = await districtRes.json();
          setAvailableDistricts(districtData.districts);
        }
      }
    } catch (error) {
      console.error("Error fetching school data:", error);
      setSnackbar({
        open: true,
        message: "Error fetching school data. Please check the UDISE code.",
        severity: "error",
      });
    } finally {
      setUdiseLoading(false);
    }
  }, 800); // 800ms delay for UDISE lookup

  const [debouncedStateChange] = useDebounce(async (stateId, setFieldValue) => {
    setSelectedStateId(stateId);

    const selectedStateObj = allState.find(
      (state) => state.stateId === stateId
    );

    if (selectedStateObj) {
      setFieldValue("state", selectedStateObj.stateName);
      setFieldValue("district", "");
      
      setState1(selectedStateObj.stateName);
      handleData(selectedStateObj.stateRegionId, selectedStateObj.stateName);
    }

    try {
      setStateLoading(true);
      const response = await fetch(`http://localhost:5001/school/districts/${stateId}`);
      const data = await response.json();

      const uniqueDistricts = [
        ...new Map(data.districts.map((d) => [d.districtId, d])).values(),
      ];

      setAvailableDistricts(uniqueDistricts);
    } catch (error) {
      console.error("Failed to fetch districts:", error);
      setSnackbar({
        open: true,
        message: "Error fetching districts. Please try again.",
        severity: "error",
      });
    } finally {
      setStateLoading(false);
    }
  }, 500); // 500ms delay for state change

  const [debouncedDistrictChange] = useDebounce(async (districtId) => {
    setSelectedDistrictId(districtId);
    setSelectedDistrictName(districtId);
    setDistrictId(districtId);
  }, 300); // 300ms delay for district change

  const [debouncedBlockFetch] = useDebounce(async (districtId) => {
    if (!districtId) return;

    try {
      setDistrictLoading(true);
      const response = await axios.get(
        `http://localhost:5001/api/school/blocks/${districtId}`
      );
      setAllBlock(response.data.blocks);

      if (blockName && response.data.blocks.length > 0) {
        const matchedBlock = response.data.blocks.find(
          (b) => b.blockName === blockName
        );
        if (matchedBlock) {
          setBlockName(matchedBlock.blockName);
        }
      }
    } catch (error) {
      console.error("Error fetching blocks:", error);
      setAllBlock([]);
    } finally {
      setDistrictLoading(false);
    }
  }, 400); // 400ms delay for block fetch

  // Fetch states on component mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/school/getStateWithId");
        const data = await res.json();

        if (data.success) {
          const uniqueStates = Array.from(
            new Map(data.states.map((item) => [item.stateId, item])).values()
          );
          setAllState(uniqueStates);
        }
      } catch (err) {
        console.error("Error fetching states:", err);
      }
    };

    fetchStates();
  }, []);

  // Auto-fill school data based on UDISE code (now debounced)
  const fetchSchoolByUdise = (udiseCode, setFieldValue) => {
    setUdiseLoading(true);
    debouncedUdiseFetch(udiseCode, setFieldValue);
  };

  const handleData = (regionId, stateName) => {
    const strId = String(regionId);
    let formattedRegionId;
    setState1(stateName);

    if (strId === "9") {
      formattedRegionId = "05";
    } else if (strId === "5") {
      formattedRegionId = "09";
    } else if (/^[1-9]$/.test(strId)) {
      formattedRegionId = strId.padStart(2, "0");
    } else if (/^[0-9]{3}$/.test(strId)) {
      formattedRegionId = strId.padStart(4, "0");
    } else {
      formattedRegionId = strId;
    }

    setStateNum(formattedRegionId);
  };

  const handleStateChange = (stateId, setFieldValue) => {
    setStateLoading(true);
    debouncedStateChange(stateId, setFieldValue);
  };

  const handleDistrictChange = (districtId) => {
    debouncedDistrictChange(districtId);
  };

  // Fetch blocks when district changes (now debounced)
  useEffect(() => {
    debouncedBlockFetch(districtId);
  }, [districtId, debouncedBlockFetch]);

  // File handling functions
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e, setter) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setter(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (setter) => (e) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const removeFile = (setter) => () => {
    setter(null);
  };

  const renderFileUpload = (
    label,
    file,
    setter,
    accept = ".jpg,.jpeg,.png,.gif"
  ) => {
    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          {label}
        </Typography>
        {file ? (
          <FilePreview>
            <Typography variant="body2">{file.name}</Typography>
            <CloseIcon
              fontSize="small"
              color="error"
              onClick={removeFile(setter)}
              sx={{ cursor: "pointer" }}
            />
          </FilePreview>
        ) : (
          <>
            <DropZone
              isDragActive={dragActive}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={(e) => handleDrop(e, setter)}
              onClick={() => document.getElementById(`${label}-input`).click()}
            >
              <UploadIcon color="action" />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Drag and drop your file here or click to browse
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Accepted formats: {accept}
              </Typography>
            </DropZone>
            <input
              id={`${label}-input`}
              type="file"
              accept={accept}
              onChange={handleFileChange(setter)}
              style={{ display: "none" }}
            />
          </>
        )}
      </Box>
    );
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);

    const formDataToSend = new FormData();

    // Append form values
    Object.keys(values).forEach(key => {
      if (values[key] !== "") {
        formDataToSend.append(key, values[key]);
      }
    });

    formDataToSend.append("block", blockName);

    // Append uploaded files from props
    uploadedImages.forEach((image) => {
      formDataToSend.append("photo", image);
    });

    uploadedVideos.forEach((video) => {
      formDataToSend.append("video", video);
    });

    if (uploadedLetter) {
      formDataToSend.append("letter", uploadedLetter);
    }

    // Append conditional files
    if (sdmcFile) formDataToSend.append("sdmc", sdmcFile);
    if (riFile) formDataToSend.append("ri", riFile);
    if (mapFile) formDataToSend.append("map", mapFile);
    if (fireDrillFile) formDataToSend.append("fireDrillDoc", fireDrillFile);
    if (earthquakeDrillFile) formDataToSend.append("earthquakeDrillDoc", earthquakeDrillFile);
    if (heatwaveDrillFile) formDataToSend.append("heatwaveDrillDoc", heatwaveDrillFile);
    if (regionDisasterDrillFile) formDataToSend.append("regionDisasterDrillDoc", regionDisasterDrillFile);
    if (urbanFloodDrillFile) formDataToSend.append("urbanFloodDrillDoc", urbanFloodDrillFile);
    if (otherDrillFile) formDataToSend.append("otherDrillDoc", otherDrillFile);

    try {
      const response = await axios.post(
        `${API_BASE_URL}api/register/upload/${values.email}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSnackbar({
        open: true,
        message: "Form submitted successfully!",
        severity: "success",
      });

      // Reset form and files
      resetForm();
      resetAllFiles();
      
    } catch (error) {
      console.error("Error submitting form:", error);
      setSnackbar({
        open: true,
        message: "Error submitting form. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const resetAllFiles = () => {
    setSdmcFile(null);
    setRiFile(null);
    setMapFile(null);
    setFireDrillFile(null);
    setEarthquakeDrillFile(null);
    setHeatwaveDrillFile(null);
    setRegionDisasterDrillFile(null);
    setUrbanFloodDrillFile(null);
    setOtherDrillFile(null);
    setBlockName("");
    setSelectedStateId("");
    setSelectedDistrictName("");
    setSelectedDistrictId("");
    
    if (typeof onResetImages === "function") onResetImages();
    if (typeof onResetVideos === "function") onResetVideos();
    if (typeof onResetLetter === "function") onResetLetter();
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <div className="container">
      <Box sx={{ p: 3 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            School Registration Form
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, errors, touched, isSubmitting }) => {
              const isUdiseEmpty = !values.udiseCode || values.udiseCode === "0";

              return (
                <Form>
                  {/* UDISE Code Section */}
                  <Grid container spacing={3} sx={{ mb: 3 }}>
                    <Grid item xs={12} md={6}>
                      <Field
                        name="udiseCode"
                        component={FormikTextField}
                        label="UDISE Code"
                        variant="outlined"
                        fullWidth
                        required
                        helperText="Enter UDISE code to auto-fill school details"
                        onChange={(e) => {
                          setFieldValue("udiseCode", e.target.value);
                          fetchSchoolByUdise(e.target.value, setFieldValue);
                        }}
                        InputProps={{
                          endAdornment: udiseLoading && (
                            <CircularProgress size={20} />
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>

                  {/* School Information Section */}
                  <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                    School Information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Field
                        name="schoolName"
                        component={FormikTextField}
                        label="School Name"
                        fullWidth
                        required
                        disabled={isUdiseEmpty}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        name="teacherName"
                        component={FormikTextField}
                        label="Teacher Name"
                        fullWidth
                        required
                        disabled={isUdiseEmpty}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        name="teacherContact"
                        component={FormikTextField}
                        label="Teacher Contact"
                        fullWidth
                        required
                        disabled={isUdiseEmpty}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        name="email"
                        component={FormikTextField}
                        label="Email"
                        type="email"
                        fullWidth
                        required
                        disabled={isUdiseEmpty}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        name="schoolType"
                        component={FormikSelect}
                        label="School Type"
                        required
                        disabled={isUdiseEmpty}
                      >
                        <MenuItem value="Private">Private</MenuItem>
                        <MenuItem value="Government">Government</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Field>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth error={touched.state && !!errors.state}>
                        <InputLabel required>State</InputLabel>
                        <Select
                          label="State"
                          value={selectedStateId || ""}
                          onChange={(e) => {
                            handleStateChange(e.target.value, setFieldValue);
                            setFieldValue("state", e.target.value);
                          }}
                          disabled={isLoading || isUdiseEmpty || stateLoading}
                          displayEmpty
                          variant="outlined"
                          endAdornment={stateLoading && (
                            <CircularProgress size={20} sx={{ mr: 2 }} />
                          )}
                        >
                          {values.state ? (
                            <MenuItem value={selectedStateId} key="prefilled-state">
                              {values.state}
                            </MenuItem>
                          ) : (
                            allState.map((state) => (
                              <MenuItem
                                key={state.stateId}
                                value={state.stateId}
                                sx={{ fontSize: "0.875rem" }}
                              >
                                {state.stateName}
                              </MenuItem>
                            ))
                          )}
                        </Select>
                        {touched.state && errors.state && (
                          <FormHelperText>{errors.state}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth error={touched.district && !!errors.district}>
                        <InputLabel required>District</InputLabel>
                        <Select
                          label="District"
                          value={values.district || ""}
                          onChange={(e) => {
                            handleDistrictChange(e.target.value);
                            setFieldValue("district", e.target.value);
                          }}
                          required
                          disabled={!selectedStateId || isLoading || isUdiseEmpty || districtLoading}
                          variant="outlined"
                          endAdornment={districtLoading && (
                            <CircularProgress size={20} sx={{ mr: 2 }} />
                          )}
                        >
                          {values.district ? (
                            <MenuItem value={values.district}>
                              {values.district}
                            </MenuItem>
                          ) : (
                            availableDistricts.map((district) => (
                              <MenuItem
                                key={district.districtId}
                                value={district.districtId}
                              >
                                {district.districtName}
                              </MenuItem>
                            ))
                          )}
                        </Select>
                        {touched.district && errors.district && (
                          <FormHelperText>{errors.district}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Block"
                        name="block"
                        variant="outlined"
                        fullWidth
                        required
                        value={blockName}
                        onChange={(e) => {
                          setBlockName(e.target.value);
                          setFieldValue("block", e.target.value);
                        }}
                        disabled={isUdiseEmpty}
                        error={touched.block && !!errors.block}
                        helperText={touched.block && errors.block}
                      />
                    </Grid>
                  </Grid>

                  {/* Student Information Section */}
                  <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                    Student Information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" gutterBottom>
                        Total Students
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        name="totalStudentsMale"
                        component={FormikTextField}
                        label="Male"
                        type="number"
                        fullWidth
                        disabled={isUdiseEmpty}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        name="totalStudentsFemale"
                        component={FormikTextField}
                        label="Female"
                        type="number"
                        fullWidth
                        disabled={isUdiseEmpty}
                      />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 1 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Trained Students
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        name="trainedStudentsMale"
                        component={FormikTextField}
                        label="Male"
                        type="number"
                        fullWidth
                        disabled={isUdiseEmpty}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        name="trainedStudentsFemale"
                        component={FormikTextField}
                        label="Female"
                        type="number"
                        fullWidth
                        disabled={isUdiseEmpty}
                      />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 1 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Trained Disabled Students
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        name="trainedDisabledStudentsMale"
                        component={FormikTextField}
                        label="Male"
                        type="number"
                        fullWidth
                        disabled={isUdiseEmpty}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        name="trainedDisabledStudentsFemale"
                        component={FormikTextField}
                        label="Female"
                        type="number"
                        fullWidth
                        disabled={isUdiseEmpty}
                      />
                    </Grid>
                  </Grid>

                  {/* Teacher Information Section */}
                  <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                    Teacher Information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" gutterBottom>
                        Total Teachers
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        name="totalTeachersMale"
                        component={FormikTextField}
                        label="Male"
                        type="number"
                        fullWidth
                        disabled={isUdiseEmpty}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        name="totalTeachersFemale"
                        component={FormikTextField}
                        label="Female"
                        type="number"
                        fullWidth
                        disabled={isUdiseEmpty}
                      />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 1 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Trained Teachers
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        name="trainedTeachersMale"
                        component={FormikTextField}
                        label="Male"
                        type="number"
                        fullWidth
                        disabled={isUdiseEmpty}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        name="trainedTeachersFemale"
                        component={FormikTextField}
                        label="Female"
                        type="number"
                        fullWidth
                        disabled={isUdiseEmpty}
                      />
                    </Grid>
                  </Grid>

                  {/* Disaster Management Section */}
                  <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                    Disaster Management
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FormControl component="fieldset" error={touched.rapidSurvay && !!errors.rapidSurvay}>
                        <Typography component="legend">
                          Rapid Visual Survey Done?
                        </Typography>
                        <Field name="rapidSurvay">
                          {({ field }) => (
                            <RadioGroup {...field} row>
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                                disabled={isUdiseEmpty}
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                                disabled={isUdiseEmpty}
                              />
                            </RadioGroup>
                          )}
                        </Field>
                        {touched.rapidSurvay && errors.rapidSurvay && (
                          <FormHelperText>{errors.rapidSurvay}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl component="fieldset" error={touched.hasDrill && !!errors.hasDrill}>
                        <Typography component="legend">
                          Conducted any drills in last 6 months?
                        </Typography>
                        <Field name="hasDrill">
                          {({ field }) => (
                            <RadioGroup {...field} row>
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                                disabled={isUdiseEmpty}
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                                disabled={isUdiseEmpty}
                              />
                            </RadioGroup>
                          )}
                        </Field>
                        {touched.hasDrill && errors.hasDrill && (
                          <FormHelperText>{errors.hasDrill}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    {values.hasDrill === "yes" && (
                      <>
                        {/* Fire Drill Section */}
                        <Grid item xs={12}>
                          <Typography variant="subtitle1">Fire Drill</Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Field
                            name="fireDrillConducted"
                            component={FormikSelect}
                            label="Conducted?"
                            disabled={isUdiseEmpty}
                          >
                            <MenuItem value="yes">Yes</MenuItem>
                            <MenuItem value="no">No</MenuItem>
                          </Field>
                        </Grid>
                        {values.fireDrillConducted === "yes" && (
                          <>
                            <Grid item xs={12} md={4}>
                              <Field
                                name="fireDrillLastDate"
                                component={FormikTextField}
                                label="Last Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                disabled={isUdiseEmpty}
                              />
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <Field
                                name="fireDrillCount"
                                component={FormikTextField}
                                label="Count"
                                type="number"
                                fullWidth
                                disabled={isUdiseEmpty}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              {renderFileUpload(
                                "Upload Fire Drill Images/Document",
                                fireDrillFile,
                                setFireDrillFile
                              )}
                            </Grid>
                          </>
                        )}

                        {/* Earthquake Drill Section */}
                        <Grid item xs={12}>
                          <Typography variant="subtitle1">Earthquake Drill</Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Field
                            name="earthquakeDrillConducted"
                            component={FormikSelect}
                            label="Conducted?"
                            disabled={isUdiseEmpty}
                          >
                            <MenuItem value="yes">Yes</MenuItem>
                            <MenuItem value="no">No</MenuItem>
                          </Field>
                        </Grid>
                        {values.earthquakeDrillConducted === "yes" && (
                          <>
                            <Grid item xs={12} md={4}>
                              <Field
                                name="earthquakeDrillLastDate"
                                component={FormikTextField}
                                label="Last Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                disabled={isUdiseEmpty}
                              />
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <Field
                                name="earthquakeDrillCount"
                                component={FormikTextField}
                                label="Count"
                                type="number"
                                fullWidth
                                disabled={isUdiseEmpty}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              {renderFileUpload(
                                "Upload Earthquake Drill Images/Document",
                                earthquakeDrillFile,
                                setEarthquakeDrillFile
                              )}
                            </Grid>
                          </>
                        )}

                        {/* Heatwave Drill Section */}
                        <Grid item xs={12}>
                          <Typography variant="subtitle1">Heatwave Drill</Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Field
                            name="heatwaveDrillConducted"
                            component={FormikSelect}
                            label="Conducted?"
                            disabled={isUdiseEmpty}
                          >
                            <MenuItem value="yes">Yes</MenuItem>
                            <MenuItem value="no">No</MenuItem>
                          </Field>
                        </Grid>
                        {values.heatwaveDrillConducted === "yes" && (
                          <>
                            <Grid item xs={12} md={4}>
                              <Field
                                name="heatwaveDrillLastDate"
                                component={FormikTextField}
                                label="Last Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                disabled={isUdiseEmpty}
                              />
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <Field
                                name="heatwaveDrillCount"
                                component={FormikTextField}
                                label="Count"
                                type="number"
                                fullWidth
                                disabled={isUdiseEmpty}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              {renderFileUpload(
                                "Upload Heatwave Drill Images/Document",
                                heatwaveDrillFile,
                                setHeatwaveDrillFile
                              )}
                            </Grid>
                          </>
                        )}

                        {/* Regional Disaster Drill Section */}
                        <Grid item xs={12}>
                          <Typography variant="subtitle1">
                            Region Specific Disaster Drill
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Field
                            name="regionaldisasterDrillConducted"
                            component={FormikSelect}
                            label="Conducted?"
                            disabled={isUdiseEmpty}
                          >
                            <MenuItem value="yes">Yes</MenuItem>
                            <MenuItem value="no">No</MenuItem>
                          </Field>
                        </Grid>
                        {values.regionaldisasterDrillConducted === "yes" && (
                          <>
                            <Grid item xs={12} md={4}>
                              <Field
                                name="regionaldisasterDrillLastDate"
                                component={FormikTextField}
                                label="Last Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                disabled={isUdiseEmpty}
                              />
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <Field
                                name="regionaldisasterDrillCount"
                                component={FormikTextField}
                                label="Count"
                                type="number"
                                fullWidth
                                disabled={isUdiseEmpty}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              {renderFileUpload(
                                "Upload Region Disaster Drill Images/Document",
                                regionDisasterDrillFile,
                                setRegionDisasterDrillFile
                              )}
                            </Grid>
                          </>
                        )}

                        {/* Urban Flood Drill Section */}
                        <Grid item xs={12}>
                          <Typography variant="subtitle1">Urban Flood Drill</Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Field
                            name="urbanfloodDrillConducted"
                            component={FormikSelect}
                            label="Conducted?"
                            disabled={isUdiseEmpty}
                          >
                            <MenuItem value="yes">Yes</MenuItem>
                            <MenuItem value="no">No</MenuItem>
                          </Field>
                        </Grid>
                        {values.urbanfloodDrillConducted === "yes" && (
                          <>
                            <Grid item xs={12} md={4}>
                              <Field
                                name="urbanfloodDrillLastDate"
                                component={FormikTextField}
                                label="Last Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                disabled={isUdiseEmpty}
                              />
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <Field
                                name="urbanfloodDrillCount"
                                component={FormikTextField}
                                label="Count"
                                type="number"
                                fullWidth
                                disabled={isUdiseEmpty}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              {renderFileUpload(
                                "Upload Urban Flood Drill Images/Document",
                                urbanFloodDrillFile,
                                setUrbanFloodDrillFile
                              )}
                            </Grid>
                          </>
                        )}

                        {/* Other Drill Section */}
                        <Grid item xs={12}>
                          <Typography variant="subtitle1">Other Drill</Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Field
                            name="otherDrillConducted"
                            component={FormikSelect}
                            label="Conducted?"
                            disabled={isUdiseEmpty}
                          >
                            <MenuItem value="yes">Yes</MenuItem>
                            <MenuItem value="no">No</MenuItem>
                          </Field>
                        </Grid>
                        {values.otherDrillConducted === "yes" && (
                          <>
                            <Grid item xs={12} md={4}>
                              <Field
                                name="otherDrillLastDate"
                                component={FormikTextField}
                                label="Last Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                disabled={isUdiseEmpty}
                              />
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <Field
                                name="otherDrillCount"
                                component={FormikTextField}
                                label="Count"
                                type="number"
                                fullWidth
                                disabled={isUdiseEmpty}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              {renderFileUpload(
                                "Upload Other Drill Document",
                                otherDrillFile,
                                setOtherDrillFile
                              )}
                            </Grid>
                          </>
                        )}
                      </>
                    )}

                    {/* SDMC Section */}
                    <Grid item xs={12}>
                      <FormControl component="fieldset" error={touched.hasSDMC && !!errors.hasSDMC}>
                        <Typography component="legend">
                          School Disaster Management Committee formed?
                        </Typography>
                        <Field name="hasSDMC">
                          {({ field }) => (
                            <RadioGroup {...field} row>
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                                disabled={isUdiseEmpty}
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                                disabled={isUdiseEmpty}
                              />
                            </RadioGroup>
                          )}
                        </Field>
                        {touched.hasSDMC && errors.hasSDMC && (
                          <FormHelperText>{errors.hasSDMC}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    {values.hasSDMC === "yes" && (
                      <Grid item xs={12}>
                        {renderFileUpload(
                          "Upload SDMC Document",
                          sdmcFile,
                          setSdmcFile
                        )}
                      </Grid>
                    )}

                    {/* Resource Inventory Section */}
                    <Grid item xs={12}>
                      <FormControl component="fieldset" error={touched.hasRI && !!errors.hasRI}>
                        <Typography component="legend">
                          Resource Inventory Maintained?
                        </Typography>
                        <Field name="hasRI">
                          {({ field }) => (
                            <RadioGroup {...field} row>
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                                disabled={isUdiseEmpty}
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                                disabled={isUdiseEmpty}
                              />
                            </RadioGroup>
                          )}
                        </Field>
                        {touched.hasRI && errors.hasRI && (
                          <FormHelperText>{errors.hasRI}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    {values.hasRI === "yes" && (
                      <Grid item xs={12}>
                        {renderFileUpload(
                          "Upload Resource Inventory",
                          riFile,
                          setRiFile
                        )}
                      </Grid>
                    )}

                    {/* Evacuation Plan Section */}
                    <Grid item xs={12}>
                      <FormControl component="fieldset" error={touched.hasMap && !!errors.hasMap}>
                        <Typography component="legend">
                          Evacuation plan with exit map.
                        </Typography>
                        <Field name="hasMap">
                          {({ field }) => (
                            <RadioGroup {...field} row>
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                                disabled={isUdiseEmpty}
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                                disabled={isUdiseEmpty}
                              />
                            </RadioGroup>
                          )}
                        </Field>
                        {touched.hasMap && errors.hasMap && (
                          <FormHelperText>{errors.hasMap}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    {values.hasMap === "yes" && (
                      <Grid item xs={12}>
                        {renderFileUpload(
                          "Upload School Map / Exit Plan",
                          mapFile,
                          setMapFile,
                          ".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        )}
                      </Grid>
                    )}

                    {/* Disaster Management Plan Section */}
                    <Grid item xs={12}>
                      <FormControl component="fieldset" error={touched.hasDMPlan && !!errors.hasDMPlan}>
                        <Typography component="legend">
                          School Disaster Management Plan created?
                        </Typography>
                        <Field name="hasDMPlan">
                          {({ field }) => (
                            <RadioGroup {...field} row>
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                                disabled={isUdiseEmpty}
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                                disabled={isUdiseEmpty}
                              />
                            </RadioGroup>
                          )}
                        </Field>
                        {touched.hasDMPlan && errors.hasDMPlan && (
                          <FormHelperText>{errors.hasDMPlan}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>

                  {/* Submit Button */}
                  <Box sx={{ mt: 4 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={isSubmitting || loading || isUdiseEmpty}
                      fullWidth
                      style={{ backgroundColor: "#f88d35", color: "whitesmoke" }}
                    >
                      {isSubmitting || loading ? "Submitting..." : "Submit Form"}
                    </Button>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </Paper>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
};

export default SchoolForm;