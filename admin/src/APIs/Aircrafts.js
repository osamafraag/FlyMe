import { axiosInstance } from "./Config";

export const AircraftsAPI = () => {
  
  return axiosInstance.get('flights/api/aircrafts/')
}