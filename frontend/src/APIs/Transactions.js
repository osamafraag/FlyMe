import { axiosInstance } from "./Config";

export const userTransactions = (headers) => {
  
  return axiosInstance.get('accounts/api/user/transactions', {
    headers: headers,
  });
}

export const createTransaction = (headers,transaction) => {
  
    return axiosInstance.post('accounts/api/transactions', transaction,{
      headers: headers,
    });
  }

export const deleteTransaction = (headers,id) => {
  
    return axiosInstance.delete(`accounts/api/transactions/${id}`, {
      headers: headers,
    });
  }