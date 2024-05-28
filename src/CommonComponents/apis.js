import axios from "axios";

const apis = axios.create({
  baseURL: process.env.REACT_APP_PROD_URL,
});
export default apis;
