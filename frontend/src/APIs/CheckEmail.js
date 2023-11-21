import { axiosInstance } from "./Config";

export const CheckEmail = (email) => {
  return axiosInstance.post('accounts/api/check_email/',{email})
}