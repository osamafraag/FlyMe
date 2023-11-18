import { axiosInstance } from "./Config";

export const GetCities = () => {
  return axiosInstance.get('countries/api/cities/')
}

export const PostCities = (data) => {
  return axiosInstance.post('countries/api/cities/', data)
}

export const GetSpecificCity = (id) => {
  return axiosInstance.get(`countries/api/cities/${id}`)
}

export const EditCity = (id, data) => {
  return axiosInstance.put(`countries/api/cities/${id}`, data)
}