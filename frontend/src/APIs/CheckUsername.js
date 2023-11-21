import { axiosInstance } from "./Config";

export const CheckUsername = (username) => {
  return axiosInstance.post('accounts/api/check_user_name/',{username})
}