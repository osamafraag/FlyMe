import { axiosInstance } from "./Config";

export const ChangePassword = (id, current_password, password, password2, token) => {
  return axiosInstance.post(`accounts/api/change-password/${id}/`, {
    current_password,
    password,
    password2,
  }, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};
