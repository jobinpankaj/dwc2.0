import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import world from "./assets/images/world.svg";
import profile from "./assets/images/userDefault.png";
import "../Header/header.scss";
import useAuthInterceptor from "../../utils/apis";
import "react-toastify/dist/ReactToastify.css";
import { handleLogout } from "../commonMethods";
import { useDispatch } from "react-redux";
import { restoreStore } from "../../redux/cartSlice";
import { Popup } from "../NotificationPopup/notification";
import RetailerRequest from "../../Supplier/components/Dashboard/retailer-request";
//import { RetailerRequest } from "../../Supplier/components/Dashboard/retailer-request";
// src\Supplier\components\Dashboard\retailer-request.js
//New changes import context 
import { useX } from "../../ContxtApi/HeaderContext";

toast.configure();

const Header = ({ title, updateSidebar, userType }) => {
  // console.log('from header admin--------', userType);
  let currentPath = window.location.pathname;
  let pathSplit = currentPath.split("/");
  let users = ["supplier", "retailer", "distributor"];
  let currentUser = pathSplit[1];
  console.log("current user---------", currentUser);
  const username = localStorage.getItem(`${currentUser}_fullName`);
  const userImg = localStorage.getItem(`${currentUser}_userImg`);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const retailertoken = localStorage.getItem("retailer_accessToken");
  const dispatch = useDispatch();
  const apis = useAuthInterceptor();
  //new 
  const { x, setX } = useX();

  if (
    currentUser == "retailer" ||
    currentUser == "supplier" ||
    currentUser == "distributor"
  ) {
    userType = currentUser;
  } else {
    userType = "admin";
  }


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

  const restoreCartItems = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${retailertoken}`,
        permission: "marketplace-edit",
      },
    };

    apis
      .get("retailer/getCartContent", config)
      .then((res) => {
        const cartItems = res.data.data;
        dispatch(restoreStore(cartItems));
      })
      .catch((err) => {
        toast.warn("Failed to get cart data still you can shop.", {
          autoClose: 1000,
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
  useEffect(() => {
    const userPermission = JSON.parse(localStorage.getItem("userPermissions"));
    console.log(userPermission);
    if (!userPermission !== null) {
      if (userPermission.length < 1) {
        doLogout();
        navigate("/");
        toast.warn(
          "You don't have permission. Complete your profile or contact admin for permission",
          {
            autoClose: 1000,
            position: toast.POSITION.TOP_CENTER,
          }
        );
      }
    } else {
      doLogout();
      navigate("/");
      toast.warn(
        "You don't have permission. Complete your profile or contact admin for permission",
        {
          autoClose: 1000,
          position: toast.POSITION.TOP_CENTER,
        }
      );
    }
    if (retailertoken) {
      restoreCartItems();
    }
  }, [retailertoken]);

  const [open, setOpen] = useState(false);
  const [openRetailerNotify, setRetailerNotify] = useState(false);

  const handleSupplierBellNotify=(()=>{
    console.log('--------------notification work------------');
  })



  return (
    <header className="bg-light">
      <div className="row m-0">
        <div className="col-12 col-sm-4 header-left">
          <h5 className="page-title p-3">{title}</h5>
        </div>
        <div className="col-12 col-sm-8 header-right">
          {/* <div className="mobile-menu" id="menu" onClick={()=>{updateSidebar(true)}}> */}
          <div className="mobile-menu" id="menu" onClick={()=>{setX(true)}}>

            {/* <img src="images/menu.svg" alt=""/>  */}
            <svg
              height="100%"
              version="1.1"
              viewBox="0 0 512 512"
              width="100%"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g className="st2" id="Layer">
                <g className="st0">
                  <polyline
                    className="st1"
                    points="89,386 424,386 424,385.999   "
                  />
                  <polyline
                    className="st1"
                    points="89,257 424,257 424,256.999   "
                  />
                  <polyline
                    className="st1"
                    points="89,127 424,127 424,126.999   "
                  />
                </g>
              </g>
              <g id="Layer_copy">
                <g>
                  <path d="M424,394H89c-4.418,0-8-3.582-8-8s3.582-8,8-8h335c4.418,0,8,3.582,8,8S428.418,394,424,394z" />
                </g>
                <g>
                  <path d="M424,265H89c-4.418,0-8-3.582-8-8c0-4.418,3.582-8,8-8h335c4.418,0,8,3.582,8,8C432,261.418,428.418,265,424,265z" />
                </g>
                <g>
                  <path d="M424,135H89c-4.418,0-8-3.582-8-8s3.582-8,8-8h335c4.418,0,8,3.582,8,8S428.418,135,424,135z" />
                </g>
              </g>
            </svg>
          </div>
          <div className="toolbar">
            {/* <div><i class="fa-solid fa-bell"></i></div> */}
            <>
              {/* {userType === "supplier" && (
                <div  className="notification-bell" onClick={()=>setRetailerNotify(true)}>
                  <div className="total-notify">5</div>
                  <i className="fa-solid fa-bell"></i>
                </div>
              )} */}
              {/* {open ? (
              <RetailerRequest text={userType} closePopup={() => setRetailerNotify(false)} />
            ) : null} */}
             {userType === "supplier" && (
                <div  className="notification-bell" onClick={()=>setRetailerNotify(!openRetailerNotify)}>
                  <div className="total-notify">5</div>
                  <i className="fa-solid fa-bell"></i>
                </div>
              )}
              {openRetailerNotify ? (
              <RetailerRequest text={userType} closePopup={() => setRetailerNotify(false)}  setRetailerNotify={setRetailerNotify}/>
            ) : null}

            </>

            <div
              className="notification icon-wrap"
              style={{ display: "block" }}
            >
              <button
                onClick={() => setOpen(true)}
                className="notification_btn"
              >
                <span className="icon">
                  <svg
                    width="18"
                    height="21"
                    viewBox="0 0 18 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.8"
                      d="M1.84713 12.7938L2.84713 12.7945C2.84781 11.9192 2.84769 11.044 2.84758 10.1694V10.1692C2.84747 9.29447 2.84736 8.42028 2.84803 7.54606H2.84808L2.84799 7.53601C2.83357 5.98259 3.37435 4.43391 4.33014 3.26839L4.33015 3.2684L4.33389 3.26379C5.13831 2.27089 6.23214 1.54811 7.41618 1.21797L7.4185 1.21732L16.1501 7.45061L15.1501 7.45262C15.1501 7.45292 15.1501 7.45322 15.1501 7.45352C15.152 8.43152 15.1517 9.40428 15.1514 10.3784C15.1511 11.1818 15.1509 11.9862 15.1519 12.7951M1.84713 12.7938L2.84713 12.7924C2.84788 13.3382 2.66713 13.8554 2.37605 14.2722C2.22378 14.4983 2.06656 14.737 1.90613 14.9805C1.63144 15.3975 1.34732 15.8288 1.06248 16.2363C0.968137 16.3994 0.982029 16.6614 1.09472 16.81L1.10022 16.8173L1.10559 16.8246C1.18843 16.9381 1.32383 16.9985 1.43041 16.9969L1.43802 16.9968L1.44563 16.9968C1.93553 16.9969 2.42606 16.9969 2.91687 16.9968C3.77638 16.9966 4.63673 16.9965 5.496 16.9977L5.76554 16.9981L6.98107 16.9972C8.32551 16.9963 9.66942 16.9968 11.0127 16.9972H11.0176L12.1319 16.9976L12.5033 16.9972C13.1778 16.9965 13.8521 16.9966 14.5257 16.9968H14.5301C15.2054 16.9969 15.88 16.997 16.5545 16.9963L16.5658 16.9963V16.9963C16.662 16.9973 16.7685 16.9559 16.8436 16.8808L16.853 16.8713L16.8531 16.8714C16.9545 16.7725 17.0214 16.5867 16.9939 16.4171L16.9923 16.4075L16.9909 16.3979C16.9802 16.3223 16.9409 16.2243 16.8583 16.1213L16.8333 16.0901L16.8109 16.057C16.5625 15.6906 16.3124 15.3123 16.0664 14.94C15.9083 14.7009 15.7519 14.4643 15.5986 14.2348C15.3173 13.8221 15.1514 13.3188 15.1519 12.7951M1.84713 12.7938C1.84758 13.1214 1.73717 13.4429 1.55212 13.7054L11.6319 0.52421C10.2167 -0.0682225 8.61821 -0.15915 7.1476 0.25471C5.75745 0.642322 4.48798 1.48504 3.55689 2.63428C2.44879 3.98554 1.83149 5.7633 1.84803 7.54529C1.84736 8.42011 1.84747 9.29482 1.84758 10.1695C1.84769 11.0442 1.84781 11.9189 1.84713 12.7938ZM15.1519 12.7951C15.1519 12.7947 15.1519 12.7942 15.1519 12.7937L16.1519 12.7952L15.1519 12.7964C15.1519 12.796 15.1519 12.7956 15.1519 12.7951Z"
                      stroke="#231F20"
                      stroke-width="2"
                    />
                  </svg>
                </span>
              </button>
            </div>
            {open ? (
              <Popup text={userType} closePopup={() => setOpen(false)} />
            ) : null}
            <div className="language icon-wrap">
              <div className="dropdown">
                <button
                  className="btn btn-outline-black btn-sm dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src={world} alt="" />{" "}
                  {i18n.language === "fr" ? "French" : "English"}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <p
                      className="dropdown-item"
                      onClick={() => i18n.changeLanguage("en")}
                    >
                      ENG
                    </p>
                  </li>
                  <li>
                    <p
                      className="dropdown-item"
                      onClick={() => i18n.changeLanguage("fr")}
                    >
                      FRA
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="profile-option">
            <hr className="seperator" />
            <div className="dropdown">
              <button
                className="profile-drop-btn border-0 dropdown-toggle d-flex align-items-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={userImg && userImg !== "null" ? userImg : profile}
                  height={50}
                  width={50}
                  style={{ borderRadius: "50%" }}
                  alt=""
                />
                <p className="page-title m-0 ps-1">{username}</p>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <p
                    className="dropdown-item"
                    onClick={() =>
                      users.includes(currentUser)
                        ? navigate(`/${currentUser}/my-account`)
                        : navigate("/admin/my-account")
                    }
                  >
                    {t("header.my_account")}
                  </p>
                </li>
                <li>
                  <p
                    className="dropdown-item"
                    onClick={() =>
                      users.includes(currentUser)
                        ? navigate(`/${currentUser}/change-password`)
                        : navigate("/admin/change-password")
                    }
                  >
                    {t("header.change_pass")}
                  </p>
                </li>
                <li>
                  <p className="dropdown-item" onClick={() => doLogout()}>
                    {t("header.logout")}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
