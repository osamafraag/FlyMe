import { axiosInstance } from "./Config";

export const UserFlightHistory = (userID, headers) => {
  
  return axiosInstance.get(`flights/api/user/${userID}/history/`, {
    headers: headers
  })
}