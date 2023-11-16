import { axiosInstance } from "./Config";

export const FlightsAPI = () => {
  return axiosInstance.get('flights/api/all/')
}