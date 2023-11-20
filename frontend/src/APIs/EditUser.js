import { axiosInstance } from "./Config";

export const EditUserData = (form, token, password, userId) => {
  return axiosInstance.put(`accounts/api/edit/${userId}`, {
    form,
    params: { password: password },
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};