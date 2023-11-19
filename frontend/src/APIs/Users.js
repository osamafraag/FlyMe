import { axiosInstance } from "./Config";

export const AllUsers = (headers) => {
  
  return axiosInstance.get('accounts/api/users/', {
    headers: headers,
  });
}