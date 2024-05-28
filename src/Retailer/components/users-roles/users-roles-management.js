// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { styled } from "@mui/system";
// import {
//   TablePagination,
//   tablePaginationClasses as classes,
// } from "@mui/base/TablePagination";
// import filter from "../../assets/images/filter-icon.png";
// import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
// import Header from "../../../CommonComponents/Header/header";
// import "../../assets/scss/dashboard.scss";
// import useAuthInterceptor from "../../../utils/apis";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useTranslation } from "react-i18next";

// toast.configure();

// const CustomTablePagination = styled(TablePagination)`
//   & .${classes.toolbar} {
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 10px;

//     @media (min-width: 768px) {
//       flex-direction: row;
//       align-items: center;
//     }
//   }

//   & .${classes.selectLabel} {
//     margin: 0;
//   }

//   & .${classes.displayedRows} {
//     margin: 0;

//     @media (min-width: 768px) {
//       margin-left: auto;
//     }
//   }

//   & .${classes.spacer} {
//     display: none;
//   }

//   & .${classes.actions} {
//     display: flex;
//     gap: 0.25rem;
//   }
// `;

// const RetailerUsersRoles = () => {
//   const apis = useAuthInterceptor()
//   const { t, i18n } = useTranslation();
//   const token = localStorage.getItem("retailer_accessToken")
//   const navigate = useNavigate()
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [rolesList, setRolesList] = useState("")
//   const [userList, setUserList] = useState("")

//   useEffect(() => {
//     const config = {
//       headers : {
//         Authorization : `Bearer ${token}`,
//         permission : "role-view"
//       }
//     }

//     apis.get("/retailer/RetailerRoleList", config)
//     .then((res) => {
//       if(res.data.success === true){
//         setRolesList(res.data.data)
//       }else{
//         toast.error("Something went wrong. Please try again later.", {autoClose: 3000, position: toast.POSITION.TOP_CENTER,});
//       }
//     })
//     .catch((error) => {
//       if(error.message !== "revoke"){
//       toast.error("Something went wrong. Please try again later.", {autoClose: 3000, position: toast.POSITION.TOP_CENTER,});
//   }})

//     const config1 = {
//       headers : {
//         Authorization : `Bearer ${token}`,
//         permission : "user-view"
//       }
//     }

//     apis.get("/retailer/getUserList", config1)
//     .then((res) => {
//       if(res.data.success === true){
//         setUserList(res.data.data)
//       }else{
//         toast.error("Something went wrong. Please try again later.", {autoClose: 3000, position: toast.POSITION.TOP_CENTER,});
//       }
//     })
//     .catch((error) => {
//       if(error.message !== "revoke"){
//       toast.error("Something went wrong. Please try again later.", {autoClose: 3000, position: toast.POSITION.TOP_CENTER,});
//   }})
//   }, [])

//   const updateSidebar = () => {
//     setShowSidebar(!showSidebar);
//   };

//   return (
//     <div class="container-fluid page-wrap product-manage">
//       <div class="row height-inherit">
//         <Sidebar
//           showSidebar={showSidebar}
//           updateSidebar={updateSidebar}
//           userType={"retailer"}
//         />

//         <div class="col main p-0">
//           <Header title="Retailer Management" updateSidebar={updateSidebar} />
//           <div class="container-fluid page-content-box px-3 px-sm-4">
//             <div class="row">
//               <div class="col">
//                 <div class="tab-link-row position-relative">
//                   <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
//                     <li class="nav-item" role="presentation">
//                       <button
//                         class="nav-link active"
//                         id="Pricing-tab"
//                         data-bs-toggle="tab"
//                         data-bs-target="#Pricing-tab-pane"
//                         type="button"
//                         role="tab"
//                         aria-controls="Pricing-tab-pane"
//                         aria-selected="true"
//                       >
//                         {t("distributor.user_roles.user")}
//                       </button>
//                     </li>
//                     <li class="nav-item" role="presentation">
//                       <button
//                         class="nav-link"
//                         id="Availability-tab"
//                         data-bs-toggle="tab"
//                         data-bs-target="#Availability-tab-pane"
//                         type="button"
//                         role="tab"
//                         aria-controls="Availability-tab-pane"
//                         aria-selected="false"
//                       >
//                         {t("distributor.user_roles.role")}
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//                 <div class="tab-content" id="myTabContent">
//                   <div
//                     class="tab-pane fade show active"
//                     id="Pricing-tab-pane"
//                     role="tabpanel"
//                     aria-labelledby="Pricing-tab"
//                     tabindex="0"
//                   >
//                     {/* [Card] */}
//                     <h6 className="page-title">{t("distributor.user_roles.manage_users")}</h6>
//                     <div className="card user-card height-100">
//                       <div className="card-body p-0">
//                         <div className="row">
//                           <div className="col">
//                             <div className="card-top-filter-box p-3">
//                               {/* [Table Search] */}
//                               <div className="search-table">
//                                 <div className="form-group">
//                                   <input
//                                     type="text"
//                                     className="search-input"
//                                     placeholder={t("distributor.user_roles.search")}
//                                   ></input>
//                                 </div>
//                               </div>
//                               {/* [/Table Search] */}

//                               {/* Right Filter */}
//                               <div class="dropdown right-filter">
//                                 <button
//                                   type="button"
//                                   className="btn btn-purple"
//                                   onClick={() => navigate('/retailer/user-role/add-user-role')}
//                                 >
//                                   + {t("distributor.user_roles.add_user")}
//                                 </button>
//                                 <button
//                                   type="button"
//                                   className={`btn dropdown-toggle`}
//                                   data-bs-toggle="dropdown"
//                                   aria-expanded="false"
//                                   data-bs-auto-close="outside"
//                                 >
//                                   <img src={filter} alt="" /> {t("distributor.user_roles.filter")}
//                                 </button>
//                                 <form
//                                   className={`dropdown-menu p-3`}
//                                   data-popper-placement="bottom-end"
//                                   style={{
//                                     position: "absolute",
//                                     inset: "0px 0px auto auto",
//                                     margin: "0px",
//                                     transform: "translate(0px, 42px)",
//                                   }}
//                                 >
//                                   <div class="mb-3">
//                                     <label class="form-label">
//                                     {t("distributor.user_roles.retailer_name")}
//                                     </label>
//                                     <select className="form-select">
//                                       <option value="">{t("distributor.user_roles.choose_retailer")}</option>
//                                     </select>
//                                   </div>
//                                   <div class="mb-3">
//                                     <label class="form-label">{t("distributor.user_roles.route_name")}</label>
//                                     <select className="form-select">
//                                       <option selected disabled>
//                                       {t("distributor.user_roles.choose_route")}
//                                       </option>
//                                     </select>
//                                   </div>

//                                   <div className="d-flex justify-content-end">
//                                     <button
//                                       type="button"
//                                       class="btn btn-purple width-auto me-2"
//                                     >
//                                       {t("distributor.user_roles.apply")}
//                                     </button>
//                                     <button
//                                       type="button"
//                                       class="btn btn-outline-black width-auto"
//                                     >
//                                       {t("distributor.user_roles.reset")}
//                                     </button>
//                                   </div>
//                                 </form>
//                               </div>
//                               {/* Right Filter */}
//                             </div>
//                           </div>
//                         </div>
//                         <div className="row">
//                           <div className="col">
//                             <div className="table-responsive">
//                               <table className="table table-striped m-0">
//                                 <thead>
//                                   <tr>
//                                     <th>{t("distributor.user_roles.name")}</th>
//                                     <th>{t("distributor.user_roles.email")}</th>
//                                     <th>{t("distributor.user_roles.contact")}</th>
//                                     <th>{t("distributor.user_roles.role")}</th>
//                                     <th className="tableActionBox"></th>
//                                   </tr>
//                                 </thead>
//                                 <tbody>
//                                   {
//                                     userList && userList.length > 0 ?
//                                     userList.map((ele) => {
//                                       return(
//                                         <tr>
//                                           <td>{ele.full_name}</td>
//                                           <td>{ele.email}</td>
//                                           <td>{ele.phone_number}</td>
//                                           <td>{ele.role_name}</td>
//                                           <td>
//                                             <div class="btn-group dropstart table-action">
//                                               <button
//                                                 type="button"
//                                                 class="dropdown-toggle"
//                                                 data-bs-toggle="dropdown"
//                                                 aria-expanded="false"
//                                               >
//                                                 <span></span>
//                                               </button>
//                                               <ul class="dropdown-menu">
//                                                 <li>
//                                                   <a
//                                                     className="dropdown-item"
//                                                     href="/order-detail"
//                                                   >
//                                                     {t("distributor.user_roles.view")}
//                                                   </a>
//                                                 </li>
//                                                 <li>
//                                                   <a className="dropdown-item">
//                                                   {t("distributor.user_roles.edit")}
//                                                   </a>
//                                                 </li>
//                                               </ul>
//                                             </div>
//                                           </td>
//                                         </tr>
//                                       )
//                                     }) :
//                                     <>{t("distributor.user_roles.no_data_to_show")}</>
//                                   }
//                                 </tbody>
//                               </table>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     {/* [/Card] */}
//                   </div>
//                   <div
//                     class="tab-pane fade"
//                     id="Availability-tab-pane"
//                     role="tabpanel"
//                     aria-labelledby="Availability-tab"
//                     tabindex="1"
//                   >
//                     {/* [Card] */}
//                     <h6 className="page-title">{t("distributor.user_roles.manage_roles")}</h6>
//                     <div className="card user-card height-100">
//                       <div className="card-body p-0">
//                         <div className="row">
//                           <div className="col">
//                             <div className="card-top-filter-box p-3">
//                               {/* [Table Search] */}
//                               <div className="search-table">
//                                 <div className="form-group">
//                                   <input
//                                     type="text"
//                                     className="search-input"
//                                     placeholder={t("distributor.user_roles.search_by_role_name")}
//                                   ></input>
//                                 </div>
//                               </div>
//                               {/* [/Table Search] */}

//                               {/* Right Filter */}
//                               <div class="dropdown right-filter">
//                                 <button
//                                   type="button"
//                                   className="btn btn-purple"
//                                   onClick={() => navigate("/retailer/user-role/add-role")}
//                                 >
//                                   + {t("distributor.user_roles.add_role")}
//                                 </button> 
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="row">
//                           <div className="col">
//                             <div className="table-responsive">
//                               <table className="table table-striped m-0">
//                                 <thead>
//                                   <tr>
//                                   <th>{t("distributor.user_roles.role_name")}</th>
//                                     <th>{t("distributor.user_roles.update_date")}</th>
//                                     <th className="tableActionBox"></th>
//                                   </tr>
//                                 </thead>
//                                 <tbody>
//                                   {
//                                     rolesList && rolesList.length > 0 ? 
//                                     rolesList.map((ele) => {
//                                       let myData = ele.updated_at.split("T")[0]
//                                       return(
//                                         <tr>
//                                           <td>{ele.name}</td>
//                                           <td>{myData}</td>
//                                           <td>
//                                             <div class="btn-group dropstart table-action">
//                                               <button
//                                                 type="button"
//                                                 class="dropdown-toggle"
//                                                 data-bs-toggle="dropdown"
//                                                 aria-expanded="false"
//                                               >
//                                                 <span></span>
//                                               </button>
//                                               <ul class="dropdown-menu">
//                                                 <li>
//                                                   <a
//                                                     className="dropdown-item"
//                                                     href="/order-detail"
//                                                   >
//                                                     {t("distributor.user_roles.view")}
//                                                   </a>
//                                                 </li>
//                                                 <li>
//                                                   <a className="dropdown-item">
//                                                     {t("distributor.user_roles.edit")}
//                                                   </a>
//                                                 </li>
//                                               </ul>
//                                             </div>
//                                           </td>
//                                         </tr>
//                                       )
//                                     }):
//                                   <>{t("distributor.user_roles.no_data_to_show")}</>
//                                   }
//                                 </tbody>
//                               </table>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     {/* [/Card] */}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RetailerUsersRoles;
