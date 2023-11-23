import { axiosInstance } from "./Config";

export const EditUserData = (numericId, form, headers) => {
  return axiosInstance.put(`accounts/api/edit/${numericId}/`, form, {
    // params: { password: password },
    headers: headers,
  })
};