import { axiosInstance } from "./Config";

export const GetCountries = (headers) => {
  return axiosInstance.get('countries/api/', {
    headers: headers
})
}

export const PostCountries = (data, headers) => {
  return axiosInstance.post('countries/api/', data, {
    headers: headers
})
}