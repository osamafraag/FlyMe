import { axiosInstance } from "./Config";

export const GetComplaints = () => {
  return axiosInstance.get('accounts/api/complaints/')
}

export const PostComplaints = (data, headers) => {
  return axiosInstance.post('accounts/api/complaints/', data, {
    headers: headers
  })
}