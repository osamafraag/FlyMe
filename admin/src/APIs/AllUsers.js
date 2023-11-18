import { axiosInstance } from "./Config";

export const AllUsers = () => {
  
  return axiosInstance.get('accounts/api/users/')
}