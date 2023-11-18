import { axiosInstance } from "./Config";

export const Login = (formData) => {
<<<<<<< HEAD
  return axiosInstance.post('accounts/api/login/tst/', formData, {
    withCredentials: true,
  });
}
=======
  
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
>>>>>>> 8ce7fdc932f7261c13c0f3b926e8b8a0384493e3
