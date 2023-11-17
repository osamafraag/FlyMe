import { axiosInstance } from "./Config";

export const GetCities = () => {
  return axiosInstance.get('countries/api/cities/')
}

export const PostCities = (data) => {
  return axiosInstance.post('countries/api/cities/', data)
}