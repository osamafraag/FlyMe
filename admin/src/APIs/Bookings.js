import { axiosInstance } from "./Config";

export const Bookings = () => {
  return axiosInstance.get('flights/api/history/')
}