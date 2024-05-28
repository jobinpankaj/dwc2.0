import { useHistory } from "react-router-dom";
import apis from "./apis";
import axios from "axios";
import { toast } from "react-toastify";

export const handleLogout = async () => {
  //   const history = useHistory();
  let result;
  let token;
  if (
    localStorage.getItem("admin_accessToken") &&
    (localStorage.getItem("retailer_accessToken") ||
      localStorage.getItem("distributor_accessToken") ||
      localStorage.getItem("supplier_accessToken"))
  ) {
    token =
      localStorage.getItem("retailer_accessToken") ||
      localStorage.getItem("distributor_accessToken") ||
      localStorage.getItem("supplier_accessToken");
  } else {
    token =
      localStorage.getItem("admin_accessToken") ||
      localStorage.getItem("retailer_accessToken") ||
      localStorage.getItem("distributor_accessToken") ||
      localStorage.getItem("supplier_accessToken");
  }

  console.log(token);
  const adminToken = localStorage.getItem("admin_accessToken");
  const retailerToken = localStorage.getItem("retailer_accessToken");
  const distributorToken = localStorage.getItem("distributor_accessToken");
  const supplierToken = localStorage.getItem("supplier_accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };


  await apis
    .post("/logout", {}, config)
    .then((res) => {
      if (res.data.success === true) {
        toast.success("Logout Successful", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
        // history.push("/"); // Use history.push to navigate to the specified path
        if (adminToken) {
          // Check if there are other tokens present
          const otherTokens = [retailerToken, distributorToken, supplierToken];
          const otherTokenExists = otherTokens.some((token) => token !== null);

          // Keep admin token and navigate to dashboard if other tokens exist
          if (otherTokenExists) {
            localStorage.removeItem("retailer_accessToken");
            localStorage.removeItem("distributor_accessToken");
            localStorage.removeItem("supplier_accessToken");
            result = true;
            // history.push("/dashboard"); // Use history.push to navigate to the dashboard
            return; // Exit the function to prevent further code execution
          } else {
            localStorage.removeItem("admin_accessToken");
            result = false;
            // history.push("/");
          }
        } else {
          localStorage.removeItem("admin_accessToken");
          localStorage.removeItem("retailer_accessToken");
          localStorage.removeItem("distributor_accessToken");
          localStorage.removeItem("supplier_accessToken");
          result = false;
        }
      } else {
        toast.error("Could not logout.", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
    })
    .catch((error) => {
      toast.error("Could not logout.", {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    });
  return result;
};

export const colors = [
  "red",
  "green",
  "blue",
  "yellow",
  "orange",
  "purple",
  "pink",
  "brown",
  "black",
  "white",
];
export const hasPermission = (permissionName) => {
  const permissionsArray = JSON.parse(localStorage.getItem("userPermissions"));
  return permissionsArray.some(
    (permission) => permission.name === permissionName
  );
};
