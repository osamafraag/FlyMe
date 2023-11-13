import { axiosInstance } from "./Config";

export const PopularCities = () => {
  
  return axiosInstance.get('countries/api/cities/popular/')
}