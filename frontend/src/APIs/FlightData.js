import { axiosInstance } from "./Config";

export const FlightData = (flightID) => {
  return axiosInstance.get(`flights/api/${flightID}`)
}