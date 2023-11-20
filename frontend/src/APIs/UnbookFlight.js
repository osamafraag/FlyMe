import { axiosInstance } from "./Config";

export const GetFlightBook = (bookId, headers) => {
  return axiosInstance.get(`flights/api/history/${bookId}`, {
    headers: headers
  })
};

export const UnbookFlight = (bookId, data, headers) => {
  return axiosInstance.put(`flights/api/history/${bookId}`, data, {
    headers: headers
  })
};