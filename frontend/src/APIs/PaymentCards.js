import { axiosInstance } from "./Config";

export const userPaymentCards = (headers) => {
  return axiosInstance.get('accounts/api/user/paymentCards', {
    headers: headers,
  });
}

export const addPaymentCard = (headers,paymentCard) => {
    return axiosInstance.post('accounts/api/paymentCards/',paymentCard, {
      headers: headers,
    });
  }

export const deletePaymentCard = (headers,id) => {
    return axiosInstance.delete(`accounts/api/paymentCards/${id}`, {
      headers: headers,
    });
  }