/* eslint-disable */
import { user } from "../backend/user.json";
/** Emulate post request */
export const getAuth = (auth) =>
  new Promise((resolve, reject) => {
    const response = {
      login: user.login !== auth.login ? false : true,
      password: user.password !== auth.password ? false : true,
    };
    
    const delay = parseInt(Math.random() * 100);
    setTimeout(() => {
      resolve(response);
    }, delay);
  });
