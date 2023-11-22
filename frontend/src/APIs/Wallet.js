import { axiosInstance } from "./Config";

export const userWallet = (headers) => {
  
  return axiosInstance.get('accounts/api/user/wallet/', {
    headers: headers,
  });
}
