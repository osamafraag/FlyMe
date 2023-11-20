import { axiosInstance } from "./Config";

export const FlightBooking = (formData) => {

  return axiosInstance.post(`flights/api/history/`, formData)
};
