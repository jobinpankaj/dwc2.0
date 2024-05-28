import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.svg";
import "./sidebar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthInterceptor from "../../../utils/apis";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Sidebar = ({ showSidebar, updateSidebar }) => {
  const apis = useAuthInterceptor();
  const { t } = useTranslation();
  const [sidebar, setSidebar] = useState(true);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("retailer_accessToken");
  const adminToken = localStorage.getItem("admin_accessToken");
  const handleLogout = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    apis
      .post("/logout", {}, config)
      .then((res) => {
        if (res.data.success === true) {
          localStorage.removeItem("admin_accessToken");
          toast.success("Logout Successful", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
          localStorage.clear();
          navigate("/retailer/login");
        } else {
          toast.error("Could not logout.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
          navigate("/retailer/dashboard");
        }
      })
      .catch((error) => {
        if(error.message !== "revoke"){
        toast.error("Could not logout.", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/retailer/dashboard");
      }
      });
  };

  const handleSuperAdminDashboard = () => {
    localStorage.removeItem("retailer_accessToken");
    localStorage.removeItem("distributor_accessToken");
    localStorage.removeItem("supplier_accessToken");
    localStorage.removeItem("supplier_user_data");
    // localStorage.removeItem("retailer_user_data");
    // localStorage.removeItem("distributor_user_data");
    navigate("/dashboard");
  };

  return (
    <div class={showSidebar ? "sidebar-menu show" : "sidebar-menu"}>
      <div class="sidebar-inner bg-purple height-100">
        <div class="closeMenu" onClick={updateSidebar}>
          <span></span>
        </div>

        <div class="logo-box">
          <img src={logo} class="logo" alt="" />
        </div>

        <nav>
          <ul>
            {adminToken ? (
              <>
                <li onClick={() => handleSuperAdminDashboard()}>
                  <a class="logout">
                    <span></span>
                    {t("retailer.sidebar.back_superadmin")}
                  </a>
                </li>
              </>
            ) : (
              ""
            )}
            <li>
              <NavLink
                to="/retailer/dashboard"
                className="dashboard"
                exact
                activeClassname="active"
              >
                <span class=""></span>
                {t("retailer.sidebar.dashboard")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/retailer/order-management"
                className="order-manage"
                exact
                activeClassname="active"
              >
                <span class=""></span>
                {t("retailer.sidebar.order_management")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/retailer/marketplace"
                className="inventory-manage"
                exact
                activeClassname="active"
              >
                <span class=""></span>
                {t("retailer.sidebar.marketplace")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/retailer/account-payable"
                className="product-manage"
                exact
                activeClassname="active"
              >
                <span class=""></span>
                {t("retailer.sidebar.account_payable")}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/retailer/supplier-management"
                className="supplier-manage"
                exact
                activeClassname="active"
              >
                <span class=""></span>
                {t("retailer.sidebar.supplier_management")}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/retailer/reports"
                className="report"
                exact
                activeClassname="active"
              >
                <span class=""></span>
                {t("retailer.sidebar.reports")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/retailer/invoice"
                className="report"
                exact
                activeClassname="active"
              >
                <span class=""></span>
                {t("retailer.sidebar.invoice")}
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/retailer/user-role"
                className="user-manage"
                exact
                activeClassname="active"
              >
                <span class=""></span>
                {t("retailer.sidebar.user_role_management")}
              </NavLink>
            </li> */}
            <li onClick={() => handleLogout()}>
              <a class="logout">
                <span></span>
                {t("retailer.sidebar.logout")}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
