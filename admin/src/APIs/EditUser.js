import { axiosInstance } from "./Config";

export const EditUserData = (form, headers, userId) => {
  return axiosInstance.put(`accounts/api/edit/${userId}/`, form, {
    // params: { password: password },
    headers: headers,
  })
};