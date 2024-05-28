import React from "react";
import logo from "./assets/images/logo.svg";
import "./sidebar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthInterceptor from "../../utils/apis";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

// React Bootstrap
import { Container, Row, Col, Nav, NavItem } from "react-bootstrap";
import { handleLogout, hasPermission } from "../commonMethods";
import {
  DASHBOARD_VIEW,
  DISTRIBUTOR_VIEW,
  INVENTORY_VIEW,
  MARKETPLACE_VIEW,
  ORDER_VIEW,
  PRODUCT_VIEW,
  REPORTS_VIEW,
  RETAILER_VIEW,
  ROLE_EDIT,
  ROLE_VIEW,
  ROUTES_VIEW,
  SHIPMENT_VIEW,
  SUPPLIER_VIEW,
  USER_VIEW,
  GROUP_VIEW,
  GROUP_EDIT,
  PRICING_VIEW,
} from "../../Constants/constant";

//import context
import { useX } from "../../ContxtApi/HeaderContext";

toast.configure();

const Sidebar = ({ showSidebar, updateSidebar, userType }) => {
  const apis = useAuthInterceptor();
  const { t } = useTranslation();
  const adminToken = localStorage.getItem("admin_accessToken");
  const navigate = useNavigate();
  const { x, setX } = useX();

  const doLogout = () => {
    const res = handleLogout();
    res.then((flag) => {
      if (flag === true) {
        navigate("/dashboard");
      } else if (flag === false) {
        navigate("/");
      }
    });
  };

  const progressPrompt = () => {
    toast.error("Work in progress. Access Denied", {
      autoClose: 3000,
      position: toast.POSITION.TOP_CENTER,
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
    <div className={x ? "sidebar-menu show" : "sidebar-menu"}>
      {/* <div className={showSidebar ? "sidebar-menu show" : "sidebar-menu"}> */}
      <div class="sidebar-inner bg-purple height-100">
        {/* <div class="closeMenu" onClick={()=>{updateSidebar(false)}}> */}
        <div class="closeMenu" onClick={()=>{setX(false)}}>

          <span></span>
        </div>

        <div class="logo-box">
          <img src={logo} onClick={() => navigate("/")} class="logo" alt="" />
        </div>

        {(() => {
          switch (userType) {
            case "admin":
              return (
                <nav>
                  <Nav as="ul"
                  onClick={()=>{setX(false)}}>
                    {true && (
                      <Nav.Item as="li">
                        <NavLink
                          to="/dashboard"
                          className="dashboard"
                          exact
                          activeClassname="active"
                        >
                          <span className=""></span>
                          {t("admin.sidebar.dashboard")}
                        </NavLink>
                      </Nav.Item>
                    )}
                    {true && (
                      <Nav.Item as="li">
                        <NavLink
                          to="/supplier-management"
                          className="supplier-manage"
                          exact
                          activeClassname="active"
                        >
                          <span className=""></span>
                          {t("admin.sidebar.supplier")}
                        </NavLink>
                      </Nav.Item>
                    )}
                    <Nav.Item as="li">
                      {true && (
                        <NavLink
                          to="/distributor-management"
                          className="order-manage"
                          exact
                          activeClassname="active"
                        >
                          <span className=""></span>
                          {t("admin.sidebar.distributor")}
                        </NavLink>
                      )}
                    </Nav.Item>
                    {true && (
                      <Nav.Item as="li">
                        <NavLink
                          to="/retailer-management"
                          className="retailer-manage"
                          exact
                          activeClassname="active"
                        >
                          <span className=""></span>
                          {t("admin.sidebar.retailer")}
                        </NavLink>
                      </Nav.Item>
                    )}
                    <Nav.Item as="li">
                      <a className="logout" onClick={() => doLogout()}>
                        <span></span>
                        {t("admin.sidebar.logout")}
                      </a>
                    </Nav.Item>
                  </Nav>
                </nav>
              );
            case "supplier":
              return (
                <nav>
                  <Nav as="ul"
                  onClick={()=>{setX(false)}}>
                    {adminToken ? (
                      <>
                        <NavItem
                          as="li"
                          to="/dashboard"
                          onClick={() => doLogout()}
                        >
                          <a class="logout">
                            <span></span>
                            Back To superadmin
                          </a>
                        </NavItem>
                      </>
                    ) : (
                      ""
                    )}
                    {hasPermission(DASHBOARD_VIEW) && (
                      <NavItem as="li">
                        <NavLink
                          to="/supplier/dashboard"
                          className="dashboard"
                          exact
                          activeClassname="active"
                        >
                          <span class=""></span>
                          {t("supplier.sidebar.dashboard")}
                        </NavLink>
                      </NavItem>
                    )}
                    {hasPermission(ORDER_VIEW) && (
                      <NavItem as="li">
                        <NavLink
                          to="/supplier/order-management"
                          className="order-manage"
                          exact
                          activeClassname="active"
                        >
                          <span class=""></span>
                          {t("supplier.sidebar.order")}
                        </NavLink>
                      </NavItem>
                    )}

                    {hasPermission(INVENTORY_VIEW) && (
                      <NavItem as="li">
                        <NavLink
                          to="/supplier/inventory-management"
                          className="inventory-manage"
                          exact
                          activeClassname="active"
                        >
                          <span class=""></span>
                          {t("supplier.sidebar.inventory")}
                        </NavLink>
                      </NavItem>
                    )}
                    {hasPermission(PRODUCT_VIEW) && (
                      <NavItem as="li">
                        <NavLink
                          to="/supplier/product-management"
                          className="product-manage"
                          exact
                          activeClassname="active"
                        >
                          <span class=""></span>
                          {t("supplier.sidebar.product")}
                        </NavLink>
                      </NavItem>
                    )}

                    {hasPermission(GROUP_VIEW) && (
                      <NavItem as="li">
                        <NavLink
                          to="/supplier/groups-management"
                          className="routes-manage"
                          exact
                          activeClassname="active"
                        >
                          <span class=""></span>
                          {t("supplier.sidebar.groups")}
                        </NavLink>
                      </NavItem>
                    )}
                    {hasPermission(PRICING_VIEW) && (
                      <NavItem as="li">
                        <NavLink
                          to="/supplier/pricing-availability"
                          className="shipment"
                          exact
                          activeClassname="active"
                        >
                          <span class=""></span>
                          {t("supplier.sidebar.pricing_availability")}
                        </NavLink>
                      </NavItem>
                    )}

                    {hasPermission(RETAILER_VIEW) && (
                      <NavItem as="li">
                        <NavLink
                          to="/supplier/retailer-management"
                          className="retailer-manage"
                          exact
                          activeClassname="active"
                        >
                          <span class=""></span>
                          {t("supplier.sidebar.retailer")}
                        </NavLink>
                      </NavItem>
                    )}

                    {/* supplier reports tab */}
                    {hasPermission(REPORTS_VIEW) && (
                      <NavItem as="li">
                        <NavLink
                          to="/supplier/reports"
                          className="report"
                          exact
                          activeClassname="active"
                        >
                          <span class=""></span>
                          {t("supplier.sidebar.reports")}
                        </NavLink>
                      </NavItem>
                    )}
                    {hasPermission(REPORTS_VIEW) && (
                      <NavItem as="li">
                        <NavLink
                          to="/supplier/invoice"
                          className="report"
                          exact
                          activeClassname="active"
                        >
                          <span class=""></span>
                          {t("supplier.sidebar.invoice")}
                        </NavLink>
                      </NavItem>
                    )}
                    {hasPermission(RETAILER_VIEW) && (
                      <NavItem as="li">
                        <NavLink
                          to="/supplier/requests"
                          className="user-manage"
                          exact
                          activeClassname="active"
                        >
                          <span class=""></span>
                          {t("supplier.sidebar.retailer_request")}
                        </NavLink>
                      </NavItem>
                    )}

                    {hasPermission(USER_VIEW) && (
                      <NavItem as="li">
                        <NavLink
                          to="/supplier/user-role-management"
                          className="user-manage"
                          exact
                          activeClassname="active"
                        >
                          <span class=""></span>
                          {t("supplier.sidebar.user")}
                        </NavLink>
                      </NavItem>
                    )}
                    <NavItem as="li">
                      <a onClick={() => doLogout()} class="logout">
                        <span></span>
                        {t("supplier.sidebar.logout")}
                      </a>
                    </NavItem>
                  </Nav>
                </nav>
              );
            case "retailer":
              return (
                <nav>
                  <Nav as="ul"
                  onClick={()=>{setX(false)}}>
                    {adminToken ? (
                      <>
                        <NavItem as="li" exact onClick={() => doLogout()}>
                          <a class="logout">
                            <span></span>
                            {t("retailer.sidebar.back_superadmin")}
                          </a>
                        </NavItem>
                      </>
                    ) : (
                      ""
                    )}
                    {hasPermission(DASHBOARD_VIEW) && (
                      <NavItem as="li">
                        <NavLink
                          to="/retailer/dashboard"
                          className="dashboard"
                          exact
                          activeClassname="active"
                        >
                          <span class=""></span>
                          {t("retailer.sidebar.dashboard")}
                        </NavLink>
                      </NavItem>
                    )}
                    {hasPermission(ORDER_VIEW) && (
                      <NavItem as="li">
                        <NavLink
                          to="/retailer/order-management"
                          className="order-manage"
                          exact
                          activeClassname="active"
                        >
                          <span class=""></span>
                          {t("retailer.sidebar.order_management")}
                        </NavLink>
                      </NavItem>
                    )}
                    {hasPermission(MARKETPLACE_VIEW) && (
                      <NavItem as="li">
                        <NavLink
                          to="/retailer/supplier-list"
                          className="inventory-manage"
                          exact
                          activeClassname="active"
                        >
                          <span class=""></span>
                          {t("retailer.sidebar.marketplace")}
                        </NavLink>
                      </NavItem>
                    )}
                    {hasPermission(DASHBOARD_VIEW)}
                    <NavItem as="li">
                      <a
                        onClick={() => progressPrompt()}
                        // to="/retailer/account-payable"
                        className="product-manage"
                        exact
                        activeClassname="active"
                      >
                        <span class=""></span>
                        {t("retailer.sidebar.account_payable")}
                      </a>
                    </NavItem>
                    {hasPermission(SUPPLIER_VIEW) && (
                      <NavItem as="li">
                        <NavLink
                          to="/retailer/supplier-management"
                          className="supplier-manage"
                          exact
                          activeClassname="active"
                        >
                          <span class=""></span>
                          {t("retailer.sidebar.supplier_management")}
                        </NavLink>
                      </NavItem>
                    )}
                    {hasPermission(REPORTS_VIEW) && (
                      <NavItem as="li">
                          <NavLink
                           to="/retailer/reports"
                          className="report"
                         exact
                         activeClassname="active"
                        >
                          <span class=""></span>
                          {t("retailer.sidebar.reports")}
                      </NavLink>
                      </NavItem>
                    )}
                    {hasPermission(REPORTS_VIEW) && (
                      <NavItem as="li">
                          <NavLink
                           to="/retailer/invoice"
                          className="report"
                         exact
                         activeClassname="active"
                        >
                          <span class=""></span>
                          {t("retailer.sidebar.invoice")}
                      </NavLink>
                      </NavItem>
                    )}
                    {/* {hasPermission(USER_VIEW) && (
                      <NavItem as="li">
                        <NavLink
                          to="/retailer/user-role"
                          className="user-manage"
                          exact
                          activeClassname="active"
                        >
                          <span class=""></span>
                          {t("retailer.sidebar.user_role_management")}
                        </NavLink>
                      </NavItem>
                    )} */}
                    <NavItem as="li" onClick={() => doLogout()}>
                      <a class="logout">
                        <span></span>
                        {t("retailer.sidebar.logout")}
                      </a>
                    </NavItem>
                  </Nav>
                </nav>
              );
            case "distributor":
              return (
                <nav>
                  <Nav as="ul"
                  onClick={()=>{setX(false)}}>
                    {adminToken ? (
                      <>
                        <NavItem as="li" exact onClick={() => doLogout()}>
                          <a class="logout">
                            <span></span>
                            {t("retailer.sidebar.back_superadmin")}
                          </a>
                        </NavItem>
                      </>
                    ) : (
                      ""
                    )}
                    {hasPermission(DASHBOARD_VIEW) && (
                      <NavItem as="li">
                        <NavLink
                          to="/distributor/dashboard"
                          className="dashboard"
                          exact
                          activeClassname="active"
                        >
                          <span class=""></span>
                          {t("distributor.sidebar.dashboard")}
                        </NavLink>
                      </NavItem>
                    )}
                    {hasPermission(ORDER_VIEW) && (
                      <NavItem as="li">
                        <NavLink
                          to="/distributor/order-management"
                          className="order-manage"
                          exact
                          activeClassname="active"
                        >
                          <span class=""></span>
                          {t("distributor.sidebar.order_management")}
                        </NavLink>
                      </NavItem>
                    )}
                    {hasPermission(INVENTORY_VIEW) && (
                      <NavItem as="li">
                        <NavLink
                          to="/distributor/inventory-management"
                          className="inventory-manage"
                          exact
                          activeClassname="active"
                        >
                          <span class=""></span>
                          {t("distributor.sidebar.inventory_management")}
                        </NavLink>
                      </NavItem>
                    )}
                    {hasPermission(PRODUCT_VIEW) && (
                      <NavItem as="li">
                        <NavLink
                          to="/distributor/product-management"
                          className="product-manage"
                          exact
                          activeClassname="active"
                        >
                          <span class=""></span>
                          {t("distributor.sidebar.product_management")}
                        </NavLink>
                      </NavItem>
                    )}
                    {hasPermission(ROUTES_VIEW) && (
                      <NavItem as="li">
                        <NavLink
                          to="/distributor/route-management"
                          className="routes-manage"
                          exact
                          activeClassname="active"
                        >
                          <span class=""></span>
                          {t("distributor.sidebar.routes_management")}
                        </NavLink>
                      </NavItem>
                    )}
                    {hasPermission(SHIPMENT_VIEW) && (
                      <NavItem as="li">
                        <NavLink
                          to="/distributor/shipments"
                          className="shipment"
                          exact
                          activeClassname="active"
                        >
                          <span class=""></span>
                          {t("distributor.sidebar.shipments")}
                        </NavLink>
                      </NavItem>
                    )}
                    {hasPermission(SUPPLIER_VIEW) && (
                      <NavItem as="li">
                        <NavLink
                          to="/distributor/supplier-management"
                          className="supplier-manage"
                          exact
                          activeClassname="active"
                        >
                          <span class=""></span>
                          {t("distributor.sidebar.supplier_management")}
                        </NavLink>
                      </NavItem>
                    )}
                    {hasPermission(RETAILER_VIEW) && (
                      <NavItem as="li">
                        <NavLink
                          to="/distributor/retailer-managment/retailer-management"
                          className="retailer-manage"
                          exact
                          activeClassname="active"
                        >
                          <span class=""></span>
                          {t("distributor.sidebar.retailers_management")}
                        </NavLink>
                      </NavItem>
                    )}
                    {hasPermission(REPORTS_VIEW) && (
                      <NavItem as="li">
                              <NavLink
                           to="/distributor/reports"
                          className="report"
                           exact
                         activeClassname="active"
                        >
                          <span class=""></span>
                          {t("distributor.sidebar.reports")}
                      </NavLink>
                      </NavItem>
                    )}
                    {hasPermission(REPORTS_VIEW) && (
                      <NavItem as="li">
                              <NavLink
                           to="/distributor/invoice"
                          className="report"
                           exact
                         activeClassname="active"
                        >
                          <span class=""></span>
                          {t("distributor.sidebar.invoice")}
                      </NavLink>
                      </NavItem>
                    )}
                    {hasPermission(USER_VIEW) && (
                      <NavItem as="li">
                        <NavLink
                          to="/distributor/user-role"
                          className="user-manage"
                          // onClick={() => progressPrompt()}
                          exact
                          activeClassname="active"
                        >
                          <span class=""></span>
                          {t("distributor.sidebar.user_role_management")}
                        </NavLink>
                      </NavItem>
                    )}
                    <NavItem as="li">
                      <a onClick={() => doLogout()} class="logout">
                        <span></span>
                        {t("distributor.sidebar.logout")}
                      </a>
                    </NavItem>
                  </Nav>
                </nav>
              );
            default:
              return <></>;
          }
        })()}
      </div>
    </div>
  );
};

export default Sidebar;
