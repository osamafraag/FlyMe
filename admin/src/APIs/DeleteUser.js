import { axiosInstance } from "./Config";

export const deleteUserAPI = (token, userId) => {
  return axiosInstance.delete(`accounts/api/edit/${userId}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};