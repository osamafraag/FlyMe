import { axiosInstance } from "./Config";

export const UnbookFlight = (token, bookId) => {
  return axiosInstance.put(`flights/api/history/${bookId}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};