import { axiosInstance } from "./Config";

export const EditUserData = (form, headers, password, userId) => {
  return axiosInstance.put(`accounts/api/edit/${userId}/`, form, {
    params: { password: password },
    headers: headers,
  })
};