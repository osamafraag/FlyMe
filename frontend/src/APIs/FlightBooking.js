import { axiosInstance } from "./Config";

export const FlightBooking = (formData, headers) => {

  return axiosInstance.post(`flights/api/history/`, formData, {
    headers: headers
  })
};
