import { axiosInstance } from "./Config";

export const Register = (formData) => {
  
  return axiosInstance.post('accounts/api/register/', formData)
}

export const SendActivateEmail = (formData) => {
  
  return axiosInstance.post('accounts/api/request-activate-code/', formData)
}

export const ActivateEmail = (emailAddress , code) => {
  
  return axiosInstance.put('accounts/api/activate-account/', {
    email:emailAddress,
    verification_code:code,
  })
}
