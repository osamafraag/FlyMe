import { axiosInstance } from "./Config";

export const Register = (formData) => {
  
  return axiosInstance.post('accounts/api/register/', formData)
}