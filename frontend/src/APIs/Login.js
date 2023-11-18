import { axiosInstance } from "./Config";

export const Login = (formData) => {
  
  return axiosInstance.post('accounts/api/login/', formData)
}

// import { axiosInstance } from "./Config";
// import { Token } from "../Context/Token";
// import { useContext } from "react";

// export const Login = (formData) => {
//   let { token, setToken } = useContext(Token);

//   if (!token) {
//     console.error("Token is missing. Redirect to login page or handle accordingly.");
//     return Promise.reject("Token is missing");
//   }

//   const headers = {
//     'Authorization': `Bearer ${token} `,
//   };

//   const config = {
//     headers: headers,
//   };

//   return axiosInstance.post('accounts/api/login/', formData, config);
// };
