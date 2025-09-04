// import React, { useState, useEffect } from 'react';
// import { Chart } from 'react-google-charts';
// import axios from 'axios';
// import { Sheet, Table } from '@mui/joy';
// import { apiJsonAuth } from 'api';

// function GeoChart() {
//   const [userLocations, setUserLocations] = useState([]);
//   const [stateName, setStateName] = useState([]);
//   const [totalState, setTotalState] = useState(0);
//   const googleKey = process.env.REACT_APP_GOOGLE_API_KEY;

//   const getInstitueData = () => {
//     apiJsonAuth
//       .get("institute/getInstituteCount/StateWise")
//       .then((res) => {
//         setStateName(res?.data?.result);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   // Get total No of institute registration
//   const getInstituteRegistration = () => {
//     const totalRegistrations = stateName?.reduce((acc, current) => {
//       if (!isNaN(current[1])) {
//         return acc + current[1];
//       }
//       return acc;
//     }, 0);
//     setTotalState(totalRegistrations);
//   };

//   useEffect(() => {
//     getInstitueData();
//   }, []);

//   useEffect(() => {
//     getInstituteRegistration();
//   }, [stateName]);

//   useEffect(() => {
//     // Sample user locations with street addresses, states, and postal codes
// useEffect(() => {
//   // Sample user locations (kept inside the effect)
//   const sampleUserLocations = [
//     { id: 1, username: "User1", streetAddress: "123 Main St", state: "California", pincode: "90001" },
//     { id: 2, username: "User2", streetAddress: "456 Oak Ave", state: "New York", pincode: "10001" },
//     { id: 3, username: "User3", streetAddress: "789 Pine Blvd", state: "Texas", pincode: "75001" },
//   ];

//   // Make geocode API calls
//   const geocodePromises = sampleUserLocations.map((user) =>
//     axios
//       .get("https://maps.googleapis.com/maps/api/geocode/json", {
//         params: {
//           address: `${user.streetAddress}, ${user.state}, ${user.pincode}`,
//           key: googleKey,
//         },
//       })
//       .catch((err) => {
//         console.error("Geocode API error:", err);
//         return { data: { results: [] } }; // fallback
//       })
//   );

//   Promise.all(geocodePromises)
//     .then((geocodeResponses) => {
//       const updatedUserLocations = sampleUserLocations.map((user, index) => {
//         const results = geocodeResponses[index]?.data?.results;
//         if (results && results.length > 0) {
//           const location = results[0].geometry.location;
//           return { ...user, latitude: location.lat, longitude: location.lng };
//         } else {
//           console.warn(`No geocode found for ${user.username}`);
//           return { ...user, latitude: null, longitude: null };
//         }
//       });

//       setUserLocations(updatedUserLocations);
//     })
//     .catch((error) => console.error("Error processing user locations:", error));
// }, [googleKey]);



//     // Geocode user addresses to obtain latitude and longitude
//     const geocodePromises = sampleUserLocations.map((user) => {
//       return axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
//         params: {
//           address: `${user.streetAddress}, ${user.state}, ${user.pincode}`,
//           key: googleKey,
//         },
//       });
//     });

//     // Resolve all geocode promises
//     Promise.all(geocodePromises)
//       .then((geocodeResponses) => {
//         // Extract and set the latitude and longitude in the user locations data
//         const updatedUserLocations = sampleUserLocations.map((user, index) => {
//           const location =
//             geocodeResponses[index].data.results[0].geometry.location;
//           return {
//             ...user,
//             latitude: location.lat,
//             longitude: location.lng,
//           };
//         });

//         setUserLocations(updatedUserLocations);
//       })
//       .catch((error) => console.error("Error fetching user locations:", error));
//   }, []);

//   // Convert user locations to the required format for the Geo Chart
//   // const geoChartData = [['Country', 'Users']];
//   // const geoChartData = [
//   //     ['State', 'Registered Institutes'],
//   //     ['IN-AP', 84777],  // Andhra Pradesh
//   //     ['IN-AR', 1504],   // Arunachal Pradesh
//   //     ['IN-AS', 35607],  // Assam
//   //     ['IN-BR', 12540],  // Bihar
//   //     ['IN-CT', 28724],  // Chhattisgarh
//   //     ['IN-GA', 1543],   // Goa
//   //     ['IN-GJ', 67936],  // Gujarat
//   //     ['IN-HR', 28671],  // Haryana
//   //     ['IN-HP', 6867],   // Himachal Pradesh
//   //     ['IN-JH', 38591],  // Jharkhand
//   //     ['IN-KA', 67563],  // Karnataka
//   //     ['IN-KL', 35674],  // Kerala
//   //     ['IN-MP', 85359],  // Madhya Pradesh
//   //     ['IN-MH', 12314],  // Maharashtra
//   //     ['IN-MN', 3103],   // Manipur
//   //     ['IN-ML', 680],    // Meghalaya
//   //     ['IN-MZ', 1158],   // Mizoram
//   //     ['IN-NL', 2150],   // Nagaland
//   //     ['IN-OR', 41974],  // Odisha
//   //     ['IN-PB', 30104],  // Punjab
//   //     ['IN-RJ', 81032],  // Rajasthan
//   //     ['IN-SK', 678],    // Sikkim
//   //     ['IN-TN', 75606],  // Tamil Nadu
//   //     ['IN-TS', 39181],  // Telangana
//   //     ['IN-TR', 1405],   // Tripura
//   //     ['IN-UP', 22497],  // Uttar Pradesh
//   //     ['IN-UT', 1143],   // Uttarakhand
//   //     ['IN-WB', 91918],  // West Bengal
//   //     ['IN-AN', 3807],   // Andaman and Nicobar Islands
//   //     ['IN-CH', 1179],   // Chandigarh
//   //     ['IN-DN', 773],    // Dadra and Nagar Haveli and Daman and Diu
//   //     ['IN-DL', 18043],  // Delhi
//   //     ['IN-LD', 274],    // Lakshadweep
//   //     ['IN-PY', 1454],   // Puducherry

//   // ];

//   // userLocations.forEach(user => {
//   //     geoChartData.push([`(${user.latitude}, ${user.longitude})`, 1]);
//   // });

//   return (
//     <>
//       <div className="row">
//         <div className="col col-12 col-md-4 order-1 order-md-0">
//           <Sheet
//             variant="outlined"
//             className="rounded-4"
//             sx={{
//               height: 450,
//               overflow: "auto",
//               scrollbarWidth: "none",
//             }}
//           >
//             <Table aria-label="basic table" stickyHeader stickyFooter hoverRow>
//               <thead>
//                 <tr>
//                   <th style={{ width: "70%" }}>States & UTs</th>
//                   <th>Institutes</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {stateName?.map(
//                   (state, index) =>
//                     index > 0 && (
//                       <tr key={index}>
//                         <td>{state[0]}</td>
//                         <td>{state[1]}</td>
//                       </tr>
//                     )
//                 )}
//               </tbody>
//               <tfoot>
//                 <tr>
//                   <th scope="row">Totals</th>
//                   <td>{totalState}</td>
//                 </tr>
//               </tfoot>
//             </Table>
//           </Sheet>
//         </div>
//         <div className="col col-12 col-md-8 order-0 order-md-1">
//           <div className="GeoChart w-100 rounded-4">
//             <Chart
//               width={"100%"}
//               // height={'300px'}
//               className="rounded-4"
//               chartType="GeoChart"
//               data={stateName}
//               options={{
//                 colorAxis: { colors: ["#FEF3EA", "#f88d35"] },
//                 region: "IN",
//                 dataMode: "regions",
//                 resolution: "provinces",
//                 //   colorAxis: { colors: ['#e7711c', '#4374e0'] },
//                 // backgroundColor: '#81d4fa',
//                 // datalessRegionColor: '#f8bbd0',
//                 // defaultColor: '#f5f5f5',
//               }}
//               mapsApiKey={googleKey}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default GeoChart;
import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import { Sheet, Table } from "@mui/joy";
import { apiJsonAuth } from "api";

function GeoChart() {
  const [userLocations, setUserLocations] = useState([]);
  const [stateName, setStateName] = useState([]);
  const [totalState, setTotalState] = useState(0);
  const googleKey = process.env.REACT_APP_GOOGLE_API_KEY;

  // 🔹 Fetch state-wise institute data
  const getInstitueData = () => {
    apiJsonAuth
      .get("institute/getInstituteCount/StateWise")
      .then((res) => {
        setStateName(res?.data?.result || []);
      })
      .catch((err) => {
        console.error("Error fetching institute data:", err);
      });
  };

  // 🔹 Calculate total registrations
  const getInstituteRegistration = () => {
    const totalRegistrations = stateName?.reduce((acc, current) => {
      const value = Number(current[1]);
      return !isNaN(value) ? acc + value : acc;
    }, 0);
    setTotalState(totalRegistrations);
  };

  // 🔹 Run on mount
  useEffect(() => {
    getInstitueData();
  }, []);

  // 🔹 Run whenever stateName updates
  useEffect(() => {
    getInstituteRegistration();
  }, [stateName]);

  // 🔹 Geocode sample user addresses
  useEffect(() => {
    const sampleUserLocations = [
      {
        id: 1,
        username: "User1",
        streetAddress: "123 Main St",
        state: "California",
        pincode: "90001",
      },
      {
        id: 2,
        username: "User2",
        streetAddress: "456 Oak Ave",
        state: "New York",
        pincode: "10001",
      },
      {
        id: 3,
        username: "User3",
        streetAddress: "789 Pine Blvd",
        state: "Texas",
        pincode: "75001",
      },
    ];

    const geocodePromises = sampleUserLocations.map((user) =>
      axios
        .get("https://maps.googleapis.com/maps/api/geocode/json", {
          params: {
            address: `${user.streetAddress}, ${user.state}, ${user.pincode}`,
            key: googleKey,
          },
        })
        .catch((err) => {
          console.error(`Geocode API error for ${user.username}:`, err);
          return { data: { results: [] } };
        })
    );

    Promise.all(geocodePromises)
      .then((geocodeResponses) => {
        const updatedUserLocations = sampleUserLocations.map((user, index) => {
          const results = geocodeResponses[index]?.data?.results;
          if (results && results.length > 0) {
            const location = results[0]?.geometry?.location;
            return { ...user, latitude: location.lat, longitude: location.lng };
          } else {
            console.warn(`No geocode found for ${user.username}`);
            return { ...user, latitude: null, longitude: null };
          }
        });

        setUserLocations(updatedUserLocations);
      })
      .catch((error) =>
        console.error("Error processing user locations:", error)
      );
  }, [googleKey]);

  return (
    <div className="row">
      {/* Table Section */}
      <div className="col col-12 col-md-4 order-1 order-md-0">
        <Sheet
          variant="outlined"
          className="rounded-4"
          sx={{
            height: 450,
            overflow: "auto",
            scrollbarWidth: "none",
          }}
        >
          <Table aria-label="basic table" stickyHeader stickyFooter hoverRow>
            <thead>
              <tr>
                <th style={{ width: "70%" }}>States & UTs</th>
                <th>Institutes</th>
              </tr>
            </thead>
            <tbody>
              {stateName?.map(
                (state, index) =>
                  index > 0 && (
                    <tr key={index}>
                      <td>{state[0]}</td>
                      <td>{state[1]}</td>
                    </tr>
                  )
              )}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row">Totals</th>
                <td>{totalState}</td>
              </tr>
            </tfoot>
          </Table>
        </Sheet>
      </div>

      {/* Geo Chart Section */}
      <div className="col col-12 col-md-8 order-0 order-md-1">
        <div className="GeoChart w-100 rounded-4">
          <Chart
            width={"100%"}
            chartType="GeoChart"
            data={stateName}
            options={{
              colorAxis: { colors: ["#FEF3EA", "#f88d35"] },
              region: "IN",
              dataMode: "regions",
              resolution: "provinces",
            }}
            mapsApiKey={googleKey}
          />
        </div>
      </div>
    </div>
  );
}

export default GeoChart;
