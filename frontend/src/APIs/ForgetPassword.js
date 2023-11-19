import { axiosInstance } from "./Config";


export const SendPasswordResetCode = (email, headers) => {
  const data = { email };
  return axiosInstance.post('accounts/api/request-password-reset/', data,{
    headers: headers
  })
};


export const ResetPasswordApi = (email, code, newPassword, headers) => {
  const data = {
    email: email,
    verification_code: code,
    new_password: newPassword
  };
  return axiosInstance.put('accounts/api/complete-password-reset/', data,{
    headers: headers
  })
};

export const CheckVerificationCode = (email, code, headers) => {
  const data = {
    email: email,
    verification_code: code
  };
  return axiosInstance.post('accounts/api/cheack-verification-code/', data,{
    headers: headers
  })
};
