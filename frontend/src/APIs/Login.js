import { axiosInstance } from "./Config";

export const Login = (formData) => {
  
  return axiosInstance.post('accounts/api/login/', formData)
}

export const Logout = (headers) => {
  return axiosInstance.post('accounts/api/logout/', {}, {
    headers: headers,
  });
};