import { axiosInstance } from "./Config";

export const SearchFlight = (from, to, year, month, day, directFlightsOnly) => {
  const directFlightsPromise = axiosInstance.get(`flights/api/?from=${from}&to=${to}&year=${year}&month=${month}&day=${day}&type=D`)
  
  const transitFlightsPromise = directFlightsOnly
    ? Promise.resolve([])  
    : axiosInstance.get(`flights/api/?from=${from}&to=${to}&year=${year}&month=${month}&day=${day}&type=T`)

  return Promise.all([directFlightsPromise, transitFlightsPromise])
    .then(([directFlightsResponse, transitFlightsResponse]) => {
      return {
        data: [
          ...(directFlightsResponse.data || []),
          ...(transitFlightsResponse.data || []) 
        ],
      };
    });
};