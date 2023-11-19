import { axiosInstance } from "./Config";


export const SendPasswordResetCode = (email) => {
  const data = { email };
  return axiosInstance.post('accounts/api/request-password-reset/', data);
};


export const ResetPasswordApi = (email, code, newPassword) => {
  const data = {
    email: email,
    verification_code: code,
    new_password: newPassword
  };
  return axiosInstance.put('accounts/api/complete-password-reset/', data);
};

export const CheckVerificationCode = (email, code) => {
  const data = {
    email: email,
    verification_code: code
  };
  return axiosInstance.post('accounts/api/cheack-verification-code/', data);
};
