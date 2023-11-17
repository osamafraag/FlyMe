import { axiosInstance } from "./Config";

export const GetClasses = () => {
  return axiosInstance.get('flights/api/classes/')
}

export const PostClasses = (data) => {
  return axiosInstance.post('flights/api/classes/', data)
}