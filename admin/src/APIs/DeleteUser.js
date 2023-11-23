import { axiosInstance } from "./Config";

export const deleteUserAPI = (token) => {
  return axiosInstance.delete(`accounts/api/edit/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};