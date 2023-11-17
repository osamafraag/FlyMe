import { axiosInstance } from "./Config";

export const GetCountries = () => {
  return axiosInstance.get('countries/api/')
}

export const PostCountries = (data) => {
  return axiosInstance.post('countries/api/', data)
}