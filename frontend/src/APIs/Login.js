import { axiosInstance } from "./Config";

export const Login = (formData) => {
  return axiosInstance.post('accounts/api/login/tst/', formData, {
    withCredentials: true,
  });
}