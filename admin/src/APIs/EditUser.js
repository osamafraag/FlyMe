import { axiosInstance } from "./Config";

export const EditUserData = (form, headers) => {
  return axiosInstance.put(`accounts/api/edit/`, form, {
    // params: { password: password },
    headers: headers,
  })
};