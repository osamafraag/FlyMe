import { axiosInstance } from "./Config";

export const deleteUserAPI = (token, password, userId) => {
  return axiosInstance.delete(`accounts/api/edit/${userId}`, {
    params: { password: password },
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};