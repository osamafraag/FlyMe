import { axiosInstance } from "./Config";

export const GetComplaints = (headers) => {
  return axiosInstance.get('accounts/api/complaints/', {
    headers: headers
})
}

export const PostComplaints = (data, headers) => {
  return axiosInstance.post('accounts/api/complaints/', data, {
    headers: headers
})
}