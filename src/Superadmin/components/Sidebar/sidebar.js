import React from "react"
import { useTranslation } from 'react-i18next';
import logo from "../../assets/images/logo.svg"
import './sidebar.scss'
import {NavLink, useLocation, useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apis from "../../../utils/apis"

// React Bootstrap
import { Container, Row, Col, Nav } from "react-bootstrap";

toast.configure()

const Sidebar = ({showSidebar, updateSidebar}) => {
    const { t, i18n } = useTranslation();
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const token = localStorage.getItem("admin_accessToken")

    const handleLogOut = () => {
        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }

        apis.post("/logout",{}, config)
        .then((res) => {
            if(res.data.success === true){
                localStorage.removeItem("admin_accessToken")
                toast.success("Logout Successful", {autoClose : 3000, position : toast.POSITION.TOP_CENTER})
                navigate("/")
            }
            else{
                toast.error("Could not logout.", {autoClose : 3000, position : toast.POSITION.TOP_CENTER})
                navigate("/dashboard")
            }
            
        })
        .catch((error) => {
            toast.error("Could not logout.", {autoClose : 3000, position : toast.POSITION.TOP_CENTER})
            navigate("/dashboard")
        })
    }
    return(
        <div className= {showSidebar ? "sidebar-menu show" : "sidebar-menu"}>
                <div className="sidebar-inner bg-purple height-100">

                    <div className="closeMenu" onClick={updateSidebar}>
                        <span></span>
                    </div>

                    <div className="logo-box">
                        <img src={logo} className="logo" alt=""/>
                    </div>

                    <Nav>
                    <ul>
                        <li>
                            <NavLink to = "/dashboard" className="dashboard" exact activeClassname = "active">
                                <span className=""></span>
                                {t('admin.sidebar.dashboard')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to = "/supplier-management" className="supplier-manage" exact activeClassname = "active" isActive={() => ['/supplier-management', '/add-supplier'].includes(pathname)}>
                                <span className=""></span>
                                {t('admin.sidebar.supplier')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to = "/distributor-management" className="order-manage" exact activeClassname = "active">
                                <span className=""></span>
                                {t('admin.sidebar.distributor')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to = "/retailer-management" className="retailer-manage" exact activeClassname = "active">
                                <span className=""></span>
                                {t('admin.sidebar.retailer')}
                            </NavLink>
                            
                        </li>
                        <li>
                            <a className = "logout" onClick={() => handleLogOut()}>
                                <span></span>
                                {t('admin.sidebar.logout')}
                            </a>
                        </li>
                    </ul>
                    </Nav>
                </div>
            </div>
    )
}

export default Sidebar