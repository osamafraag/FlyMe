import { axiosInstance } from "./Config";

export const Bookings = (headers) => {
  return axiosInstance.get('flights/api/history/', {
    headers: headers
})
}