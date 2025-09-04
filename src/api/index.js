// // import axios from "axios";

// // export const api = axios.create({
// //   baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3100/",
// //   timeout: 25000,
// //   headers: {
// //     "Content-Type": "multipart/form-data",
// //   },
// // });
// // export const apiJson = axios.create({
// //   baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3100/",
// //   timeout: 25000,
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// // });
// // let token = localStorage.getItem("token") || null;
// // export const apiAuth = axios.create({
// //   baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3100/",
// //   timeout: 25000,
// //   headers: {
// //     "Content-Type": "multipart/form-data",
// //     Authorization: localStorage.getItem("token"),
// //   },
// // });
// // export const apiJsonAuth = axios.create({
// //   baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3100/",
// //   timeout: 25000,
// //   headers: {
// //     "Content-Type": "application/json",
// //     Authorization: localStorage.getItem("token"),
// //   },
// // });
// // export async function postInstituteRegister(data) {
// //   try {
// //     const res = await api.post("v2/register/institution", data);
// //     return res;
// //   } catch (error) {
// //     return error;
// //   }
// // }
// // export async function postCampusRegister(data) {
// //   try {
// //     const res = await api.post("register/campussherpa", data);
// //     return res;
// //   } catch (error) {
// //     return error;
// //   }
// // }
// // export async function getResourcesLibrary() {
// //   const res = await api.get("content/resource");
// //   return res;
// // }
// // export async function getYouthGallery() {
// //   const res = await api.get("content/youthgallery");
// //   return res;
// // }

// // export async function postVerifyCaptcha(data) {
// //   try {
// //     const res = await api.post("captcha/verify", data, {
// //       headers: {
// //         'Content-Type': 'application/json'
// //       }
// //     });
// //     return res;
// //   } catch (error) {
// //     return error;
// //   }
// // }

// // export const apiForum = axios.create({
// //   baseURL: process.env.REACT_APP_EKS_API_ENDPOINT || "http://localhost:5000",
// //   headers: {
// //     "x-api-key": process.env.REACT_APP_EKS_API_KEY
// //   },
// // });

// // export const apiEksathi = axios.create({
// //   baseURL: process.env.REACT_APP_EKSATHI_API_ENDPOINT || "http://localhost:5000",
// // });

// import axios from "axios";

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3100/";

// // 🔹 Base API instance
// export const api = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 25000,
//   headers: { "Content-Type": "multipart/form-data" },
// });

// export const apiJson = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 25000,
//   headers: { "Content-Type": "application/json" },
// });

// // 🔹 Authenticated instances (dynamic token injection)
// export const apiAuth = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 25000,
//   headers: { "Content-Type": "multipart/form-data" },
// });

// export const apiJsonAuth = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 25000,
//   headers: { "Content-Type": "application/json" },
// });

// // 🔹 Interceptors to inject latest token dynamically
// const injectToken = (config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// };

// apiAuth.interceptors.request.use(injectToken);
// apiJsonAuth.interceptors.request.use(injectToken);
// api.interceptors.request.use(injectToken);
// apiJson.interceptors.request.use(injectToken);

// // 🔹 API helper functions
// export async function postInstituteRegister(data) {
//   try {
//     return await api.post("v2/register/institution", data);
//   } catch (error) {
//     return error;
//   }
// }

// export async function postCampusRegister(data) {
//   try {
//     return await api.post("register/campussherpa", data);
//   } catch (error) {
//     return error;
//   }
// }

// export async function getResourcesLibrary() {
//   return await api.get("content/resource");
// }

// export async function getYouthGallery() {
//   return await api.get("content/youthgallery");
// }

// export async function postVerifyCaptcha(data) {
//   try {
//     return await api.post("captcha/verify", data, {
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     return error;
//   }
// }

// // 🔹 Other APIs
// export const apiForum = axios.create({
//   baseURL: process.env.REACT_APP_EKS_API_ENDPOINT || "http://localhost:5000",
//   headers: { "x-api-key": process.env.REACT_APP_EKS_API_KEY },
// });

// export const apiEksathi = axios.create({
//   baseURL: process.env.REACT_APP_EKSATHI_API_ENDPOINT || "http://localhost:5000",
// });
import axios from "axios";

// ✅ Export API_BASE_URL so it can be imported elsewhere
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3100";

// 🔹 Base API instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 25000,
  headers: { "Content-Type": "multipart/form-data" },
});

export const apiJson = axios.create({
  baseURL: API_BASE_URL,
  timeout: 25000,
  headers: { "Content-Type": "application/json" },
});

// 🔹 Authenticated instances (dynamic token injection)
export const apiAuth = axios.create({
  baseURL: API_BASE_URL,
  timeout: 25000,
  headers: { "Content-Type": "multipart/form-data" },
});

export const apiJsonAuth = axios.create({
  baseURL: API_BASE_URL,
  timeout: 25000,
  headers: { "Content-Type": "application/json" },
});

// 🔹 Interceptors to inject latest token dynamically
const injectToken = (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

apiAuth.interceptors.request.use(injectToken);
apiJsonAuth.interceptors.request.use(injectToken);
api.interceptors.request.use(injectToken);
apiJson.interceptors.request.use(injectToken);

// 🔹 API helper functions
export async function postInstituteRegister(data) {
  try {
    return await api.post("v2/register/institution", data);
  } catch (error) {
    return error;
  }
}

export async function postCampusRegister(data) {
  try {
    return await api.post("register/campussherpa", data);
  } catch (error) {
    return error;
  }
}

export async function getResourcesLibrary() {
  return await api.get("content/resource");
}

export async function getYouthGallery() {
  return await api.get("content/youthgallery");
}

export async function postVerifyCaptcha(data) {
  try {
    return await api.post("captcha/verify", data, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return error;
  }
}

// 🔹 Other APIs
export const apiForum = axios.create({
  baseURL: process.env.REACT_APP_EKS_API_ENDPOINT || "http://localhost:5000",
  headers: { "x-api-key": process.env.REACT_APP_EKS_API_KEY },
});
export const apiForum2 = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000",
  headers: { "x-api-key": process.env.REACT_APP_API_BASE_URL },
});

export const apiEksathi = axios.create({
  baseURL: process.env.REACT_APP_EKSATHI_API_ENDPOINT || "http://localhost:5000",
});
