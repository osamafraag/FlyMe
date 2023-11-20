import { axiosInstance } from "./Config";

export const GetCities = (headers) => {
  return axiosInstance.get('countries/api/cities/', {
    headers: headers
})
}

export const PostCities = (data, headers) => {
  return axiosInstance.post('countries/api/cities/', data, {
    headers: headers
})
}

export const GetSpecificCity = (id, headers) => {
  return axiosInstance.get(`countries/api/cities/${id}`, {
    headers: headers
})
}

export const EditCity = (id, data, headers) => {
  return axiosInstance.put(`countries/api/cities/${id}`, data, {
    headers: headers
})
}