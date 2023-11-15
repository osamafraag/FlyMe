import { axiosInstance } from "./Config";

export const TripsCities = () => {
  
  return axiosInstance.get('countries/api/cities/featured/')
}