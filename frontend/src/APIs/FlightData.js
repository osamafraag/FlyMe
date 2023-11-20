import { axiosInstance } from "./Config";

export const FlightData = (flightID, headers) => {
  return axiosInstance.get(`flights/api/${flightID}`, {
    headers:headers
  })
}