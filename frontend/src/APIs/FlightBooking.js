import { axiosInstance } from "./Config";

export const FlightBooking = (formData) => {

  return axiosInstance.put(`flights/api/history/`, formData);
};
