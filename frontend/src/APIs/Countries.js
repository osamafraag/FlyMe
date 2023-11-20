import { axiosInstance } from "./Config";

export const getCountries = async () => {
  try {
    const response = await axiosInstance.get('countries/api/')
    return response.data;
  } catch (error) {
    throw error;
  }
};
