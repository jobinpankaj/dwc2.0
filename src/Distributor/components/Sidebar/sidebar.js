import React, { useState } from "react"
import logo from "../../assets/images/logo.svg"
import './sidebar.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import apis from "../../../utils/apis"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"

const Sidebar = ({ showSidebar, updateSidebar }) => {
    const { t, i18n } = useTranslation();
    const token = localStorage.getItem("distributor_accessToken");
    const adminToken = localStorage.getItem("admin_accessToken");
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleLogout = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        apis.post("/logout", {}, config)
            .then((res) => {
                if (res.data.success === true) {
                    toast.success("Logout Successful", { autoClose: 3000, position: toast.POSITION.TOP_CENTER })
                    localStorage.removeItem("distributor_accessToken")
                    navigate("/distributor/login")
                }
                else {
                    toast.error("Could not logout.", { autoClose: 3000, position: toast.POSITION.TOP_CENTER })
                    navigate("/distributor/dashboard")
                }

            })
            .catch((error) => {
                if(error.message !== "revoke"){
                toast.error("Could not logout.", { autoClose: 3000, position: toast.POSITION.TOP_CENTER })
                navigate("/ditributor/dashboard")
                }
            })
    }

    const handleSuperAdminDashboard = () => {
        localStorage.removeItem("retailer_accessToken");
        localStorage.removeItem("distributor_accessToken");
        localStorage.removeItem("supplier_accessToken");
        localStorage.removeItem("supplier_user_data");
        // localStorage.removeItem("retailer_user_data");
        // localStorage.removeItem("distributor_user_data");
        navigate("/dashboard");
    }

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
                    {adminToken ? <>
                        <li onClick={() => handleSuperAdminDashboard()}>
                            <a class="logout">
                                <span></span>
                                Back To superadmin
                            </a>
                        </li>
                        </>
                        :''
                    }
                        <li>
                            <NavLink to="/distributor/dashboard" className="dashboard" exact activeClassname="active">
                                <span class=""></span>
                                {t('distributor.sidebar.dashboard')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/distributor/order-management" className="order-manage" exact activeClassname="active">
                                <span class=""></span>
                                {t('distributor.sidebar.order_management')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/distributor/inventory-management" className="inventory-manage" exact activeClassname="active">
                                <span class=""></span>
                                {t('distributor.sidebar.inventory_management')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/distributor/product-management" className="product-manage" exact activeClassname="active">
                                <span class=""></span>
                                {t('distributor.sidebar.product_management')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/distributor/route-management" className="routes-manage" exact activeClassname="active">
                                <span class=""></span>
                                {t('distributor.sidebar.routes_management')}
                            </NavLink>

                        </li>
                        <li>
                            <NavLink to="/distributor/shipments" className="shipment" exact activeClassname="active">
                                <span class=""></span>
                                {t('distributor.sidebar.shipments')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/distributor/supplier-management" className="supplier-manage" exact activeClassname="active">
                                <span class=""></span>
                                {t('distributor.sidebar.supplier_management')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/distributor/retailer-managment/retailer-management" className="retailer-manage" exact activeClassname="active">
                                <span class=""></span>
                                {t('distributor.sidebar.retailers_management')}
                            </NavLink>

                        </li>
                        <li>
                          <NavLink to="/distributor/reports" className="report" exact activeClassname="active">
                                <span class=""></span>
                                {t('distributor.sidebar.reports')}
                            </NavLink>
                        </li>
                        <li>
                          <NavLink to="/distributor/invoice" className="invoice" exact activeClassname="active">
                                <span class=""></span>
                                {t('distributor.sidebar.invoice')}
                            </NavLink>
                        </li>
                        <li>
                            {show && <NavLink to="/distributor/test" className="user-manage" exact activeClassname="active">
                                <span class=""></span>
                              Test
                            </NavLink>}
                        </li>
                        <li>
                            {show && <NavLink to="/distributor/user-role" className="user-manage" exact activeClassname="active">
                                <span class=""></span>
                                {t('distributor.sidebar.user_role_management')}
                            </NavLink>}
                        </li>

                        <li>
                            <a onClick={() => handleLogout()} class="logout">
                                <span></span>
                                {t('distributor.sidebar.logout')}
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar
