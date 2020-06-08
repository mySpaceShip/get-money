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
export const addOrders = (newOrders) =>
  new Promise((resolve) => {
    const response = [...orders, ...newOrders]
    const delay = parseInt(Math.random() * 100);
    setTimeout(() => {
      resolve(response);
    }, delay);
  });
  export const addOrder = (newOrder) =>
  new Promise((resolve) => {
    const response = [newOrder, ...orders]
    const delay = parseInt(Math.random() * 100);
    setTimeout(() => {
      resolve(response);
    }, delay);
  });
