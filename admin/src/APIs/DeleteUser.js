import { axiosInstance } from "./Config";

export const deleteUserAPI = (token, id,) => {
  return axiosInstance.delete(`accounts/api/edit/${id}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};