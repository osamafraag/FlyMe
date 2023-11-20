import { axiosInstance } from "./Config";

export const Login = (formData, headers) => {
  
  return axiosInstance.post('accounts/api/login/', formData,{
    headers: headers
  })
}

export const Logout = (headers) => {
  return axiosInstance.post('accounts/api/logout/', {}, {
    headers: headers,
  });
};