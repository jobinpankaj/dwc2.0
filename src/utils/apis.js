import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const useAuthInterceptor = () => {
  const navigate = useNavigate();

  const apis = axios.create({

    // baseURL: process.env.REACT_APP_PROD_URL,
    //baseURL: 'http://backapi.com/api/v1',

    baseURL: process.env.REACT_APP_PROD_URL,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods":
      "HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });

  apis.interceptors.response.use(
    (response) => {
      console.log(response)
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem("supplier_accessToken");
        localStorage.removeItem("distributor_accessToken");
        localStorage.removeItem("retailer_accessToken");
        toast.warn("Permissions revised. Please login again.", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
          toastId: "revoke"
        });
        navigate("/");
        return Promise.reject(new Error('revoke'));
      }else{
        throw error
      }
    }
  );

  return apis;
};

export default useAuthInterceptor;
