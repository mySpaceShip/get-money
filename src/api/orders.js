/* eslint-disable */
import orders from "../backend/orders.json";

/** Emulate post request */
export const getOrders = () =>
  new Promise((resolve) => {
    const delay = parseInt(Math.random() * 100);
    setTimeout(() => {
      resolve(orders);
    }, delay);
  });
export const addOrders = (neWorders) =>
  new Promise((resolve) => {
    const response = [...neWorders, ...orders]
    const delay = parseInt(Math.random() * 100);
    setTimeout(() => {
      resolve(response);
    }, delay);
  });
