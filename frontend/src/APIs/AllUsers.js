import { axiosInstance } from "./Config";

export const userData = (headers) => {
  return axiosInstance.get('accounts/api/user-data/', {
    headers: headers,
  });
};