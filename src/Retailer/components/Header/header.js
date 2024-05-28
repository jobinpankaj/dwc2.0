import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import world from "../../assets/images/world.svg";
import profile from "../../assets/images/userDefault.png";
import "./header.scss";
import cart from "../../assets/images/cart.png";
import useAuthInterceptor from "../../../utils/apis";

import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { restoreStore } from "../../../redux/cartSlice";

const Header = (props) => {
  const apis = useAuthInterceptor();
  const curr_lang = localStorage.getItem("i18nextLng");
  const { i18n, t } = useTranslation();
  const token = localStorage.getItem("retailer_accessToken");
  const retailerImage = localStorage.getItem("retailerImage");
  console.log(retailerImage);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/retailer/login");
    }
  }, [token, navigate]);
  const handleLanguageChange = (value) => {
    console.log("language", value);
    i18n.changeLanguage(value);
    localStorage.setItem("i18nextLng", value);
  };
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
  return (
    <header className="bg-light">
      <div className="row m-0">
        <div className="col-12 col-sm-4 header-left">
          <h5 className="page-title p-3">
            {/* Dashboard */}
            {props.title}
          </h5>
        </div>
        <div className="col-12 col-sm-8 header-right">
          <div className="mobile-menu" id="menu" onClick={props.updateSidebar}>
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
            {/* <div className="wishlist icon-wrap">
                            <span className="icon">
                                <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.8" d="M10.9156 18.7342L10.9141 18.733C7.80374 16.0432 5.30481 13.8768 3.57178 11.8548C1.84802 9.84361 1 8.10693 1 6.29428C1 3.35565 3.40984 1 6.6 1C8.4029 1 10.1373 1.80545 11.2567 3.04933L12 3.87527L12.7433 3.04933C13.8627 1.80545 15.5971 1 17.4 1C20.5902 1 23 3.35565 23 6.29428C23 8.10693 22.152 9.84361 20.4282 11.8548C18.6952 13.8768 16.1963 16.0432 13.0859 18.733L13.0844 18.7342L12 19.6757L10.9156 18.7342Z" stroke="#231F20" strokeWidth="2" />
                                </svg>
                            </span>
                        </div> */}
            <div className="cart icon-wrap">
              <a
                onClick={() => navigate("/retailer/marketplace/cart")}
                class="cartBtn position-relative"
              >
                <img src={cart} alt="Cart" />
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-purple">
                  {cartItems.length}
                  <span class="visually-hidden">unread messages</span>
                </span>
              </a>
            </div>
            <div className="notification icon-wrap">
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
                    strokeWidth="2"
                  />
                </svg>
              </span>
            </div>

            <div className="language icon-wrap">
              <div className="dropdown">
                <button
                  className="btn btn-outline-black btn-sm dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src={world} alt="" />
                  {curr_lang === "en" ? "English" : "French"}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={() => handleLanguageChange("en")}
                    >
                      ENG
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={() => handleLanguageChange("fr")}
                    >
                      FRA
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="profile-option">
              <hr className="seperator" />
              <div className="dropdown">
                <button
                  className="profile-drop-btn border-0 dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={retailerImage === "null" ? profile : retailerImage}
                    alt=""
                    width={"40px"}
                    height={"40px"}
                    className="rounded-circle"
                  />
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => navigate("/retailer/my-account")}
                    >
                      My Account
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => navigate("/retailer/change-password")}
                    >
                      Change Password
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={() => handleLogout()}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
