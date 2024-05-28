// import React, { useEffect, useState } from "react";
// import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
// import Header from "../../../CommonComponents/Header/header";
// import ProfileImg from "../../assets/images/userDefault.png";

// import useAuthInterceptor from "../../../utils/apis";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Oval } from "react-loader-spinner";
// import { Modal } from "react-bootstrap";
// import Multiselect from "multiselect-react-dropdown";
// import { useTranslation } from "react-i18next";

// const MyProfile = () => {
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   const [supplier, setSupplier] = useState({});
//   const [supplierType, setSupplierType] = useState({});
//   const [supplierProfile, setSupplierProfile] = useState({});
//   const [mainAddress, setMainAddress] = useState({});
//   const [billingAddress, setBillingAddress] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [selectedValues, setSelectedValues] = useState([]);
//   const [show, setShow] = useState(false);
//   const token = localStorage.getItem("supplier_accessToken");
//   const [distributorsList, setDistributorsList] = useState([]);
//   const apis = useAuthInterceptor();
//   const updateSidebar = () => {
//     setShowSidebar(!showSidebar);
//   };

//   const handleSaveLinks = () => {
//     if (selectedValues.length < 1) {
//       toast.error("No Distributor Selected", {
//         autoClose: 3000,
//         position: toast.POSITION.TOP_CENTER,
//       });
//     } else {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       let selectedId = [];

//       for (let i = 0; i < selectedValues.length; i++) {
//         selectedId.push(selectedValues[i].id);
//       }

//       const bodyData = {
//         distributors: selectedId.toString(),
//       };

//       apis
//         .post("supplier/link/distributors", bodyData, config)
//         .then((res) => {
//           if (res.data.success === true) {
//             setShow(false);
//             toast.success("Links updated.", {
//               autoClose: 3000,
//               position: toast.POSITION.TOP_CENTER,
//             });
//           } else {
//             toast.error("Could not udapte links. Please try again later.", {
//               autoClose: 3000,
//               position: toast.POSITION.TOP_CENTER,
//             });
//           }
//         })
//         .catch((error) => {
//           if(error.message !== "revoke"){
//             toast.error("Could not udapte links. Please try again later.", {
//               autoClose: 3000,
//               position: toast.POSITION.TOP_CENTER,
//             });
//           }
//         });
//     }
//   };

//   useEffect(() => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         Projectlanguageid: 1,
//       },
//     };

//     apis
//       .get("/getAllDistributors", config)
//       .then((res) => {
//         if (res.data.success === true) {
//           let newData = []
//           for(let i = 0; i < res.data.data.length; i++){
//             if(res.data.data[i].comapany_name){
//               newData.push(res.data.data[i])
//             }
//           }
//           setDistributorsList(newData);
//         } else {
//           toast.error(
//             "Could not fetch distributors list. Please try again later.",
//             { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
//           );
//         }
//       })
//       .catch((error) => {
//         if(error.message !== "revoke"){
//           toast.error(
//             "Could not fetch distributors list. Please try again later.",
//             { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
//           );
//         }
//       });

//     apis
//       .get(`/supplier/getLinkedDistributors`, config)
//       .then((res) => {
//         if (res.data.success === true) {
//           setSelectedValues(res.data.data);
//         } else {
//           toast.error(
//             "Could not fetch linked distributors. Please try again later.",
//             { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
//           );
//         }
//       })
//       .catch((error) => {
//         if(error.message !== "revoke"){
//           toast.error(
//             "Could not fetch linked distributors. Please try again later.",
//             { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
//           );
//         }
//       });
//   }, []);

//   useEffect(() => {
//     setLoading(true);
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     apis
//       .get("supplier/getSupplierData", config)
//       .then((res) => {
//         setSupplier(res.data.data);
//         setSupplierType(res.data.data.user_type);
//         if (res.data.data.user_profile !== null) {
//           setSupplierProfile(res.data.data.user_profile);
//         }
//         if (res.data.data.user_main_address) {
//           setMainAddress(res.data.data.user_main_address);
//         }
//         if (res.data.data.user_billing_address) {
//           setBillingAddress(res.data.data.user_billing_address);
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         if(err.message !== "revoke"){
//           toast.error("Something went Wrong !! Please try again Later", {
//             autoClose: 3000,
//             position: toast.POSITION.TOP_CENTER,
//           });
//           setLoading(false);
//         }
//       });
//   }, []);

//   return (
//     <div className="container-fluid page-wrap add-supplier">
//       <div className="row height-inherit">
//         <Sidebar
//           showSidebar={showSidebar}
//           updateSidebar={updateSidebar}
//           userType={"supplier"}
//         />

//         <div className="col main p-0">
//           <Header title="My Account" updateSidebar={updateSidebar} />
//           {loading ? (
//             <div class="d-flex justify-content-center">
//               <Oval
//                 height={80}
//                 width={80}
//                 color="purple"
//                 wrapperStyle={{}}
//                 wrapperClass=""
//                 visible={true}
//                 ariaLabel="oval-loading"
//                 secondaryColor="purple"
//                 strokeWidth={2}
//                 strokeWidthSecondary={2}
//               />
//             </div>
//           ) : (
//             <div className="container-fluid page-content-box px-3 px-sm-4">
//               <div className="row mb-2">
//                 <div className="col">
//                   <form>
//                     {/* [Card]  */}
//                     <div className="card height-100">
//                       <div className="card-body">
//                         <div className="row">
//                           <div className="col-sm-4 mb-4 mb-sm-0">
//                             <div className="card shadow-none img-card h-100">
//                               <div className="card-body d-flex justify-content-center align-items-center">
//                                 <div className="row">
//                                   <div className="col text-center d-flex flex-column justify-content-center align-items-center">
//                                     <div className="dp-img mb-4 mx-auto position-relative rounded-circle d-inline-flex">
//                                       <img
//                                         src={
//                                           supplier.user_image === null
//                                             ? ProfileImg
//                                             : supplier.user_image
//                                         }
//                                         alt="Profile"
//                                         className="dp-img rounded-circle"
//                                       />
//                                     </div>
//                                     <div className="w-100 text-center">
//                                       <div class="align-items-center w-auto">
//                                         <button
//                                           type="button"
//                                           onClick={() => setShow(true)}
//                                           className="btn btn-purple btn-sm"
//                                         >
//                                           {t("supplier.my_account_view.additional.link_distibuted_btn")}
//                                         </button>
//                                       </div>
//                                     </div>
//                                   </div>
//                                   <div className="text my-3">
//                                     <h4
//                                       className="mx-auto text-center"
//                                       style={{
//                                         fontSize: 16,
//                                         fontWeight: 500,
//                                         lineHeight: 1.12,
//                                         color: "rgb(36,39,49)",
//                                         fontFamily: "Ubuntu",
//                                       }}
//                                     >
//                                       {supplier.full_name === null
//                                         ? ""
//                                         : supplier.full_name}
//                                     </h4>
//                                     <h6
//                                       className="mx-auto text-center"
//                                       style={{
//                                         fontWeight: 400,
//                                         fontSize: 14,
//                                         lineHeight: "130%",
//                                         color: "#595B60",
//                                       }}
//                                     >
//                                       {supplier.email === null
//                                         ? ""
//                                         : supplier.email}
//                                     </h6>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="col-sm-8">
//                             <div className="card shadow-none img-card">
//                               <div className="card-body">
//                                 <div className="row">
//                                   <div className="form-head w-100 card-top-filter-box">
//                                     <p>Profile info.</p>

//                                     <button
//                                       type="button"
//                                       onClick={() =>
//                                         navigate(
//                                           `/supplier/my-account/edit-profile`
//                                         )
//                                       }
//                                       className="btn btn-purple"
//                                     >
//                                       {t("supplier.my_account_view.additional.edit_btn")}
//                                     </button>
//                                   </div>
//                                   <div className="col-sm-6 mb-3">
//                                     <label className="form-label">
//                                     {t("supplier.my_account_view.Profile_Info.first_name")}
//                                     </label>
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       value={
//                                         supplier.first_name === null
//                                           ? ""
//                                           : supplier.first_name
//                                       }
//                                       placeholder={t("supplier.my_account_view.Profile_Info.first_name")}
//                                       disabled
//                                     />
//                                   </div>
//                                   <div className="col-sm-6 mb-3">
//                                     <label className="form-label">
//                                     {t("supplier.my_account_view.Profile_Info.last_name")}
//                                     </label>
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       value={
//                                         supplier.last_name === null
//                                           ? ""
//                                           : supplier.last_name
//                                       }
//                                       placeholder={t("supplier.my_account_view.Profile_Info.last_name")}
//                                       disabled
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="row">
//                                   <div className="col-sm-6 mb-3">
//                                     <label className="form-label">
//                                     {t("supplier.my_account_view.Profile_Info.email_address")}
//                                     </label>
//                                     <input
//                                       type="email"
//                                       className="form-control"
//                                       value={
//                                         supplier.email === null
//                                           ? ""
//                                           : supplier.email
//                                       }
//                                       placeholder={t("supplier.my_account_view.Profile_Info.email_address")}
//                                       disabled
//                                     />
//                                   </div>
//                                   <div className="col-sm-6 mb-3">
//                                     <label className="form-label">
//                                     {t("supplier.my_account_view.Profile_Info.user_role")}
//                                     </label>
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       value={
//                                         supplierType.name === null
//                                           ? ""
//                                           : supplierType.name
//                                       }
//                                       placeholder={t("supplier.my_account_view.Profile_Info.user_role")}
//                                       id="myInput"
//                                       disabled
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="row">
//                                   <div className="col-sm-12 mb-3">
//                                     <label className="form-label">
//                                     {t("supplier.my_account_view.Profile_Info.contact_number")}
//                                     </label>
//                                     <div className="position-relative">
//                                       <input
//                                         type={"number"}
//                                         className="form-control"
//                                         value={
//                                           supplier.phone_number === null
//                                             ? ""
//                                             : supplier.phone_number
//                                         }
//                                         placeholder="N/A"
//                                         disabled
//                                       />
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//               <div className="row">
//                 {/* [Left Grid] */}
//                 <div className="col-sm-6">
//                   {/* [Card] */}
//                   <div className="card height-100">
//                     <div className="card-body">
//                       <form>
//                         <div className="row">
//                           <div className="col-sm-12">
//                             {/* [General Info] */}
//                             <div className="row mb-5">
//                               <div className="col-12">
//                                 <div className="row">
//                                   <div className="form-head w-100 card-top-filter-box">
//                                   <p>{t("supplier.my_account_view.General_Information.general_information")}</p>
//                                     <button
//                                       type="button"
//                                       onClick={() =>
//                                         navigate(`/supplier/edit-general-info`)
//                                       }
//                                       className="btn btn-purple"
//                                     >
//                                        {t("supplier.my_account_view.additional.edit_btn")}
//                                     </button>
//                                   </div>
//                                   <div className="col-sm-12 col-xl-6 mb-3">
//                                     <label className="form-label">
//                                     {t("supplier.my_account_view.General_Information.company_name")}<sup>*</sup>
//                                     </label>
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       value={
//                                         supplier.user_profile &&
//                                         supplier.user_profile.company_name
//                                           ? supplier.user_profile.company_name
//                                           : "N/A"
//                                       }
//                                       placeholder={t("supplier.my_account_view.placeholder.enter_company_name")}
//                                       disabled
//                                     />
//                                   </div>
//                                   <div className="col-sm-12 col-xl-6 mb-3">
//                                     <label className="form-label">
//                                     {t("supplier.my_account_view.General_Information.company_url")} 
//                                     </label>
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       value={
//                                         supplier.user_profile &&
//                                         supplier.user_profile.website_url
//                                           ? supplier.user_profile.website_url
//                                           : "N/A"
//                                       }
//                                       disabled
//                                       placeholder={t("supplier.my_account_view.placeholder.website_url")}
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="row">
//                                   <div className="col-sm-12 col-xl-6 mb-3">
//                                     <label className="form-label">
//                                     {t("supplier.my_account_view.General_Information.contact_name")}
//                                     </label>
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       value={
//                                         supplier.user_profile &&
//                                         supplier.user_profile.contact_name
//                                           ? supplier.user_profile.contact_name
//                                           : "N/A"
//                                       }
//                                       disabled
//                                       placeholder={t("supplier.my_account_view.placeholder.contact-no")}
//                                     />
//                                   </div>
//                                   <div className="col-sm-12 col-xl-6 mb-3">
//                                     <label className="form-label">
//                                     {t("supplier.my_account_view.General_Information.contact_email")}<sup>*</sup>
//                                     </label>
//                                     <input
//                                       type="email"
//                                       className="form-control"
//                                       value={
//                                         supplier.user_profile &&
//                                         supplier.user_profile.contact_email
//                                           ? supplier.user_profile.contact_email
//                                           : "N/A"
//                                       }
//                                       placeholder={t("supplier.my_account_view.placeholder.contact_email")}
//                                       disabled
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="row">
//                                   <div className="col-sm-12 col-xl-6 mb-3 position-relative">
//                                     <label className="form-label">
//                                       Mobile Number<sup>*</sup>
//                                     </label>
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       value={
//                                         supplier.user_profile &&
//                                         supplier.user_profile.phone_number
//                                           ? supplier.user_profile.phone_number
//                                           : "N/A"
//                                       }
//                                       placeholder="Enter mobile no."
//                                       disabled
//                                     />
//                                   </div>
//                                   <div className="col-sm-12 col-xl-6 mb-3 position-relative">
//                                     <label className="form-label">
//                                       Alcohol Production Permit<sup>*</sup>
//                                     </label>
//                                     <div className="w-100 d-flex">
//                                       <input
//                                         type="text"
//                                         className="form-control"
//                                         value={
//                                           supplier.user_profile &&
//                                           supplier.user_profile
//                                             .alcohol_production_permit
//                                             ? supplier.user_profile
//                                                 .alcohol_production_permit
//                                             : "N/A"
//                                         }
//                                         placeholder="Enter permit no."
//                                         disabled
//                                       />
//                                     </div>
//                                     {/* {permitError !== "" ? <p className="error-label">{permitError}</p> : <></>} */}
//                                   </div>
//                                 </div>
//                                 <div className="row mb-4">
//                                   <div className="col-sm-12 col-xl-6 mb-3 position-relative">
//                                     <label className="form-label">
//                                       Alcohol Production Limit (In Hectolitres)
//                                       <sup>*</sup>
//                                     </label>
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       value={
//                                         supplier.user_profile &&
//                                         supplier.user_profile
//                                           .alcohol_production_limit
//                                           ? supplier.user_profile
//                                               .alcohol_production_limit
//                                           : "N/A"
//                                       }
//                                       placeholder="Enter Alcohol production limit"
//                                       disabled
//                                     />
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="row">
//                                 <div className="col-sm-12 mb-3 d-flex align-items-start">
//                                   <input
//                                     type="checkbox"
//                                     className="me-2 mt-1"
//                                     checked={
//                                       supplier.user_profile &&
//                                       supplier.user_profile.business_name_status
//                                         ? supplier.user_profile
//                                             .business_name_status == "1"
//                                           ? true
//                                           : false
//                                         : false
//                                     }
//                                   />
//                                   <p className="m-0">
//                                     Show the business name on purchase orders
//                                   </p>
//                                 </div>
//                                 <div className="col-sm-12 mb-3 d-flex align-items-start">
//                                   <input
//                                     type="checkbox"
//                                     className="me-2 mt-1"
//                                     checked={
//                                       supplier.user_profile &&
//                                       supplier.user_profile
//                                         .distribution_bucket_status
//                                         ? supplier.user_profile
//                                             .distribution_bucket_status == "1"
//                                           ? true
//                                           : false
//                                         : false
//                                     }
//                                   />
//                                   <p className="m-0">
//                                     We produce our product in our facility but
//                                     it is distributed by Distribution Bucket
//                                   </p>
//                                 </div>
//                                 <div className="col-sm-12 mb-3 d-flex align-items-start">
//                                   <input
//                                     type="checkbox"
//                                     className="me-2 mt-1"
//                                     checked={
//                                       supplier.user_profile &&
//                                       supplier.user_profile.have_product_status
//                                         ? supplier.user_profile
//                                             .have_product_status == "1"
//                                           ? true
//                                           : false
//                                         : false
//                                     }
//                                   />
//                                   <p className="m-0">
//                                     We have a product but we do NOT produce in
//                                     our own facility
//                                   </p>
//                                 </div>
//                                 <div className="col-sm-12 mb-3 d-flex align-items-start">
//                                   <input
//                                     type="checkbox"
//                                     className="me-2 mt-1"
//                                     checked={
//                                       supplier.user_profile &&
//                                       supplier.user_profile
//                                         .agency_sell_and_collect_status
//                                         ? supplier.user_profile
//                                             .agency_sell_and_collect_status ==
//                                           "1"
//                                           ? true
//                                           : false
//                                         : false
//                                     }
//                                   />
//                                   <p className="m-0">
//                                     We are an agency and we sell and collect
//                                     payments on behalf of other suppliers
//                                   </p>
//                                 </div>
//                                 <div className="col-sm-12 mb-3 d-flex align-items-start">
//                                   <input
//                                     type="checkbox"
//                                     className="me-2 mt-1"
//                                     checked={
//                                       supplier.user_profile &&
//                                       supplier.user_profile
//                                         .produce_product_status
//                                         ? supplier.user_profile
//                                             .produce_product_status == "1"
//                                           ? true
//                                           : false
//                                         : false
//                                     }
//                                   />
//                                   <p className="m-0">
//                                     We produce our product in our facility but
//                                     we authorize Buvons Local Pro to distribute
//                                     and collect naments on our hehalf
//                                   </p>
//                                 </div>
//                               </div>
//                             </div>
//                             {/* [/General Info] */}

//                             {/* [Billing Info] */}
//                             <div className="row">
//                               <div className="col-12">
//                                 <div className="row">
//                                   <div className="form-head w-100">
//                                     <p>Billing Information</p>
//                                   </div>
//                                   <div className="col-sm-12 col-xl-6 mb-3">
//                                     <label className="form-label">
//                                       Order Number Prefix
//                                     </label>
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       value={
//                                         billingAddress.order_number_prefix !==
//                                           null ||
//                                         billingAddress.order_number_prefix !==
//                                           ""
//                                           ? billingAddress.order_number_prefix
//                                           : "N/A"
//                                       }
//                                       disabled
//                                       placeholder="Enter Order Number"
//                                     />
//                                   </div>
//                                   <div className="col-sm-6 col-xl-6 mb-3">
//                                     <label className="form-label">
//                                       GST Tax
//                                     </label>
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       value={
//                                         billingAddress.gst_registration_number !==
//                                           null ||
//                                         billingAddress.gst_registration_number !==
//                                           ""
//                                           ? billingAddress.gst_registration_number
//                                           : "N/A"
//                                       }
//                                       disabled
//                                       placeholder="Enter GST tax"
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="row">
//                                   <div className="col-sm-6 col-xl-6 mb-3">
//                                     <label className="form-label">
//                                       QST Tax Regsitration
//                                     </label>
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       value={
//                                         billingAddress.qst_registration_number !==
//                                           null ||
//                                         billingAddress.qst_registration_number !==
//                                           ""
//                                           ? billingAddress.qst_registration_number
//                                           : "N/A"
//                                       }
//                                       disabled
//                                       placeholder="Enter QST tax regsitration"
//                                     />
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                             {/* [/Billing Info] */}
//                           </div>
//                         </div>
//                       </form>
//                     </div>
//                   </div>
//                   {/* [/Card] */}
//                 </div>
//                 {/* [/Left Grid] */}

//                 {/* [Right Grid] */}
//                 <div className="col-sm-6">
//                   {/* [Card] */}
//                   <div className="card height-100">
//                     <div className="card-body">
//                       <form>
//                         <div className="row">
//                           <div className="col-sm-12">
//                             {/* [Main Address] */}
//                             <div className="row mb-5">
//                               <div className="col-12">
//                                 <div className="row">
//                                   <div className="form-head w-100 card-top-filter-box">
//                                     <p>Main Address</p>
//                                     <button
//                                       type="button"
//                                       onClick={() =>
//                                         navigate(
//                                           `/supplier/my-account/edit-main-address`
//                                         )
//                                       }
//                                       className="btn btn-purple"
//                                     >
//                                       Edit
//                                     </button>
//                                   </div>
//                                   <div className="col-sm-12 col-xl-6 mb-3">
//                                     <label className="form-label">
//                                       Address<sup>*</sup>
//                                     </label>
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       value={
//                                         mainAddress.address_1 === null
//                                           ? "N/A"
//                                           : mainAddress.address_1
//                                       }
//                                       placeholder="Enter address"
//                                       disabled
//                                     />
//                                   </div>
//                                   <div className="col-sm-12 col-xl-6 mb-3">
//                                     <label className="form-label">
//                                       Address 2
//                                     </label>
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       value={
//                                         mainAddress.address_2 === null
//                                           ? "N/A"
//                                           : mainAddress.address_2
//                                       }
//                                       placeholder="Enter address"
//                                       disabled
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="row">
//                                   <div className="col-sm-12 col-xl-6 mb-3">
//                                     <label className="form-label">
//                                       City Name
//                                     </label>
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       value={
//                                         mainAddress.city === null
//                                           ? "N/A"
//                                           : mainAddress.city
//                                       }
//                                       placeholder="Enter city name"
//                                       disabled
//                                     />
//                                   </div>
//                                   <div className="col-sm-12 col-xl-6 mb-3">
//                                     <label className="form-label">
//                                       Postal Code
//                                     </label>
//                                     <input
//                                       type="number"
//                                       className="form-control"
//                                       value={
//                                         mainAddress.postal_code === null
//                                           ? "N/A"
//                                           : mainAddress.postal_code
//                                       }
//                                       placeholder="Enter postal code"
//                                       disabled
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="row">
//                                   <div className="col-sm-12 col-xl-6 mb-3 position-relative">
//                                     <label className="form-label">
//                                       Country
//                                     </label>
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       value={
//                                         mainAddress.country === null
//                                           ? "N/A"
//                                           : mainAddress.country
//                                       }
//                                       placeholder="Enter postal code"
//                                       disabled
//                                     />
//                                   </div>
//                                   <div className="col-sm-12 col-xl-6 mb-3 position-relative">
//                                     <label className="form-label">State</label>
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       value={
//                                         mainAddress.state === null
//                                           ? "N/A"
//                                           : mainAddress.state
//                                       }
//                                       placeholder="Enter postal code"
//                                       disabled
//                                     />
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                             {/* [/Main Address] */}

//                             {/* [Billing Address] */}
//                             <div className="row">
//                               <div className="col-12">
//                                 <div className="row">
//                                   <div className="form-head w-100">
//                                     Billing Address
//                                   </div>
//                                   <div className="col-sm-12 col-xl-6 mb-3">
//                                     <label className="form-label">
//                                       Company
//                                     </label>
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       value={
//                                         supplierProfile.company_name === null
//                                           ? "N/A"
//                                           : supplierProfile.company_name
//                                       }
//                                       placeholder="Enter order number"
//                                       disabled
//                                     />
//                                   </div>
//                                   <div className="col-sm-12 col-xl-6 mb-3">
//                                     <label className="form-label">
//                                       Address
//                                     </label>
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       value={
//                                         billingAddress.address_1 === null
//                                           ? "N/A"
//                                           : billingAddress.address_1
//                                       }
//                                       placeholder="Enter address"
//                                       disabled
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="row">
//                                   <div className="col-sm-12 col-xl-6 mb-3">
//                                     <label className="form-label">
//                                       Address 2
//                                     </label>
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       value={
//                                         billingAddress.address_2 === null
//                                           ? "N/A"
//                                           : billingAddress.address_2
//                                       }
//                                       placeholder="Enter address"
//                                       disabled
//                                     />
//                                   </div>
//                                   <div className="col-sm-12 col-xl-6 mb-3">
//                                     <label className="form-label">
//                                       City Name
//                                     </label>
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       value={
//                                         billingAddress.city === null
//                                           ? "N/A"
//                                           : billingAddress.city
//                                       }
//                                       placeholder="Enter city name"
//                                       disabled
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="row">
//                                   <div className="col-sm-12 col-xl-6 mb-3 position-relative">
//                                     <label className="form-label">
//                                       Country
//                                     </label>
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       value={
//                                         billingAddress.country === null
//                                           ? "N/A"
//                                           : billingAddress.country
//                                       }
//                                       placeholder="Enter city name"
//                                       disabled
//                                     />
//                                   </div>
//                                   <div className="col-sm-12 col-xl-6 mb-3 position-relative">
//                                     <label className="form-label">State</label>
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       value={
//                                         billingAddress.state === null
//                                           ? "N/A"
//                                           : billingAddress.state
//                                       }
//                                       placeholder="Enter city name"
//                                       disabled
//                                     />
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                             {/* [/Billing Address] */}
//                           </div>
//                         </div>
//                       </form>
//                     </div>
//                   </div>
//                   {/* [/Card] */}
//                 </div>
//                 {/* [/Right Grid] */}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <Modal
//         className="modal fade"
//         show={show}
//         centered
//         onHide={() => setShow(false)}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>
//             <p>Linked Distributors</p>
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="row">
//             <div className="col-sm-12">
//               <div className="card shadow-none img-card">
//                 <div className="card-body">
//                   <form>
//                     <div className="col-12 mb-sm-3 mb-2">
//                       <label for="Warehouse-name" class="col-form-label">
//                         Select Distributors to link
//                       </label>
//                       <Multiselect
//                         options={distributorsList}
//                         selectedValues={selectedValues} // Preselected value to persist in dropdown
//                         onSelect={(e) => setSelectedValues(e)} // Function will trigger on select event
//                         onRemove={(e) => setSelectedValues(e)} // Function will trigger on remove event
//                         displayValue="comapany_name"
//                         avoidHighlightFirstOption
//                       />
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <button
//             type="button"
//             class="btn btn-outline-black"
//             data-bs-dismiss="modal"
//             onClick={() => setShow(false)}
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             class="btn btn-purple"
//             onClick={() => handleSaveLinks()}
//           >
//             Save
//           </button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default MyProfile;


import React, { useEffect, useState } from "react";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import ProfileImg from "../../assets/images/userDefault.png";

import useAuthInterceptor from "../../../utils/apis";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import { Modal } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import { useTranslation } from "react-i18next";

const MyProfile = () => {
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState({});
  const [supplierType, setSupplierType] = useState({});
  const [supplierProfile, setSupplierProfile] = useState({});
  const [mainAddress, setMainAddress] = useState({});
  const [billingAddress, setBillingAddress] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("supplier_accessToken");
  const [distributorsList, setDistributorsList] = useState([]);
  const apis = useAuthInterceptor();
  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
    
  };
  const { t } = useTranslation();

  const handleSaveLinks = () => {
    if (selectedValues.length < 1) {
      toast.error("No Distributor Selected", {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let selectedId = [];

      for (let i = 0; i < selectedValues.length; i++) {
        selectedId.push(selectedValues[i].id);
      }

      const bodyData = {
        distributors: selectedId.toString(),
      };

      apis
        .post("supplier/link/distributors", bodyData, config)
        .then((res) => {
          if (res.data.success === true) {
            setShow(false);
            toast.success("Links updated.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.error("Could not udapte links. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((error) => {
          if(error.message !== "revoke"){
            toast.error("Could not udapte links. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });
    }
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Projectlanguageid: 1,
      },
    };

    apis
      .get("/getAllDistributors", config)
      .then((res) => {
        if (res.data.success === true) {
          let newData = []
          for(let i = 0; i < res.data.data.length; i++){
            if(res.data.data[i].comapany_name){
              newData.push(res.data.data[i])
            }
          }
          setDistributorsList(newData);
        } else {
          toast.error(
            "Could not fetch distributors list. Please try again later.",
            { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
          );
        }
      })
      .catch((error) => {
        if(error.message !== "revoke"){
          toast.error(
            "Could not fetch distributors list. Please try again later.",
            { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
          );
        }
      });

    apis
      .get(`/supplier/getLinkedDistributors`, config)
      .then((res) => {
        if (res.data.success === true) {
          setSelectedValues(res.data.data);
        } else {
          toast.error(
            "Could not fetch linked distributors. Please try again later.",
            { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
          );
        }
      })
      .catch((error) => {
        if(error.message !== "revoke"){
          toast.error(
            "Could not fetch linked distributors. Please try again later.",
            { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
          );
        }
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    apis
      .get("supplier/getSupplierData", config)
      .then((res) => {
        setSupplier(res.data.data);
        setSupplierType(res.data.data.user_type);
        if (res.data.data.user_profile !== null) {
          setSupplierProfile(res.data.data.user_profile);
        }
        if (res.data.data.user_main_address) {
          setMainAddress(res.data.data.user_main_address);
        }
        if (res.data.data.user_billing_address) {
          setBillingAddress(res.data.data.user_billing_address);
        }
        setLoading(false);
      })
      .catch((err) => {
        if(err.message !== "revoke"){
          toast.error("Something went Wrong !! Please try again Later", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
          setLoading(false);
        }
      });
  }, []);

  return (
    <div className="container-fluid page-wrap add-supplier">
      <div className="row height-inherit">
        <Sidebar
          showSidebar={showSidebar}
          updateSidebar={updateSidebar}
          userType={"supplier"}
        />

        <div className="col main p-0">
          <Header title="My Account" updateSidebar={updateSidebar} />
          {loading ? (
            <div class="d-flex justify-content-center">
              <Oval
                height={80}
                width={80}
                color="purple"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="purple"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
          ) : (
            <div className="container-fluid page-content-box px-3 px-sm-4">
              <div className="row mb-2">
                <div className="col">
                  <form>
                    {/* [Card]  */}
                    <div className="card height-100">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-4 mb-4 mb-sm-0">
                            <div className="card shadow-none img-card h-100">
                              <div className="card-body d-flex justify-content-center align-items-center">
                                <div className="row">
                                  <div className="col text-center d-flex flex-column justify-content-center align-items-center">
                                    <div className="dp-img mb-4 mx-auto position-relative rounded-circle d-inline-flex">
                                      <img
                                        src={
                                          supplier.user_image === null
                                            ? ProfileImg
                                            : supplier.user_image
                                        }
                                        alt="Profile"
                                        className="dp-img rounded-circle"
                                      />
                                    </div>
                                    <div className="w-100 text-center">
                                      <div class="align-items-center w-auto">
                                        <button
                                          type="button"
                                          onClick={() => setShow(true)}
                                          className="btn btn-purple btn-sm"
                                        >
                                          {t("supplier.my_account_view.additional.link_distibuted_btn")}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text my-3">
                                    <h4
                                      className="mx-auto text-center"
                                      style={{
                                        fontSize: 16,
                                        fontWeight: 500,
                                        lineHeight: 1.12,
                                        color: "rgb(36,39,49)",
                                        fontFamily: "Ubuntu",
                                      }}
                                    >
                                      {supplier.full_name === null
                                        ? ""
                                        : supplier.full_name}
                                    </h4>
                                    <h6
                                      className="mx-auto text-center"
                                      style={{
                                        fontWeight: 400,
                                        fontSize: 14,
                                        lineHeight: "130%",
                                        color: "#595B60",
                                      }}
                                    >
                                      {supplier.email === null
                                        ? ""
                                        : supplier.email}
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-8">
                            <div className="card shadow-none img-card">
                              <div className="card-body">
                                <div className="row">
                                  <div className="form-head w-100 card-top-filter-box">
                                    <p>{t("supplier.my_account_view.Profile_Info.profile_info")}</p>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        navigate(
                                          `/supplier/my-account/edit-profile`
                                        )
                                      }
                                      className="btn btn-purple"
                                    >
                                      {t("supplier.my_account_view.additional.edit_btn")}
                                    </button>
                                  </div>
                                  <div className="col-sm-6 mb-3">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.Profile_Info.first_name")}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        supplier.first_name === null
                                          ? ""
                                          : supplier.first_name
                                      }
                                      placeholder="N/A"
                                      disabled
                                    />
                                  </div>
                                  <div className="col-sm-6 mb-3">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.Profile_Info.last_name")}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        supplier.last_name === null
                                          ? ""
                                          : supplier.last_name
                                      }
                                      placeholder="N/A"
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-6 mb-3">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.Profile_Info.email_address")}
                                    </label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      value={
                                        supplier.email === null
                                          ? ""
                                          : supplier.email
                                      }
                                      placeholder="N/A"
                                      disabled
                                    />
                                  </div>
                                  <div className="col-sm-6 mb-3">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.Profile_Info.user_role")}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        supplierType.name === null
                                          ? ""
                                          : supplierType.name
                                      }
                                      placeholder="N/A"
                                      id="myInput"
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-12 mb-3">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.Profile_Info.contact_number")}
                                    </label>
                                    <div className="position-relative">
                                      <input
                                        type={"number"}
                                        className="form-control"
                                        value={
                                          supplier.phone_number === null
                                            ? ""
                                            : supplier.phone_number
                                        }
                                        placeholder="N/A"
                                        disabled
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="row">
                {/* [Left Grid] */}
                <div className="col-sm-6">
                  {/* [Card] */}
                  <div className="card height-100">
                    <div className="card-body">
                      <form>
                        <div className="row">
                          <div className="col-sm-12">
                            {/* [General Info] */}
                            <div className="row mb-5">
                              <div className="col-12">
                                <div className="row">
                                  <div className="form-head w-100 card-top-filter-box">
                                    <p>{t("supplier.my_account_view.General_Information.general_information")}</p>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        navigate(`/supplier/edit-general-info`)
                                      }
                                      className="btn btn-purple"
                                    >
                                      {t("supplier.my_account_view.additional.edit_btn")}
                                    </button>
                                  </div>
                                  <div className="col-sm-12 col-xl-6 mb-3">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.General_Information.company_name")}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        supplier.user_profile &&
                                        supplier.user_profile.company_name
                                          ? supplier.user_profile.company_name
                                          : "N/A"
                                      }
                                      placeholder={t("supplier.my_account_view.placeholder.enter_company_name")}
                                      disabled
                                    />
                                  </div>
                                  <div className="col-sm-12 col-xl-6 mb-3">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.General_Information.company_url")}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        supplier.user_profile &&
                                        supplier.user_profile.website_url
                                          ? supplier.user_profile.website_url
                                          : "N/A"
                                      }
                                      disabled
                                      placeholder={t("supplier.my_account_view.placeholder.website_url")}
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-12 col-xl-6 mb-3">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.General_Information.contact_name")}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        supplier.user_profile &&
                                        supplier.user_profile.contact_name
                                          ? supplier.user_profile.contact_name
                                          : "N/A"
                                      }
                                      disabled
                                      placeholder={t("supplier.my_account_view.placeholder.contact-no")}
                                    />
                                  </div>
                                  <div className="col-sm-12 col-xl-6 mb-3">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.General_Information.contact_email")}
                                    </label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      value={
                                        supplier.user_profile &&
                                        supplier.user_profile.contact_email
                                          ? supplier.user_profile.contact_email
                                          : "N/A"
                                      }
                                      placeholder={t("supplier.my_account_view.placeholder.contact_email")}
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.General_Information.mobile_num")}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        supplier.user_profile &&
                                        supplier.user_profile.phone_number
                                          ? supplier.user_profile.phone_number
                                          : "N/A"
                                      }
                                      placeholder={t("supplier.my_account_view.placeholder.emobile_no")}
                                      disabled
                                    />
                                  </div>
                                  <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.General_Information.alcolhol_permit")}
                                    </label>
                                    <div className="w-100 d-flex">
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={
                                          supplier.user_profile &&
                                          supplier.user_profile
                                            .alcohol_production_permit
                                            ? supplier.user_profile
                                                .alcohol_production_permit
                                            : "N/A"
                                        }
                                        placeholder={t("supplier.my_account_view.placeholder.permit_no")}
                                        disabled
                                      />
                                    </div>
                                    {/* {permitError !== "" ? <p className="error-label">{permitError}</p> : <></>} */}
                                  </div>
                                </div>
                                <div className="row mb-4">
                                  <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.General_Information.alcolhol_production_lmit")}
                                      <sup>*</sup>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        supplier.user_profile &&
                                        supplier.user_profile
                                          .alcohol_production_limit
                                          ? supplier.user_profile
                                              .alcohol_production_limit
                                          : "N/A"
                                      }
                                      placeholder={t("supplier.my_account_view.placeholder.alcohol_permit")}
                                      disabled
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 mb-3 d-flex align-items-start">
                                  <input
                                    type="checkbox"
                                    className="me-2 mt-1"
                                    checked={
                                      supplier.user_profile &&
                                      supplier.user_profile.business_name_status
                                        ? supplier.user_profile
                                            .business_name_status == "1"
                                          ? true
                                          : false
                                        : false
                                    }
                                  />
                                  <p className="m-0">
                                  {t("supplier.my_account_view.General_Information.desc1")}
                                  </p>
                                </div>
                                <div className="col-sm-12 mb-3 d-flex align-items-start">
                                  <input
                                    type="checkbox"
                                    className="me-2 mt-1"
                                    checked={
                                      supplier.user_profile &&
                                      supplier.user_profile
                                        .distribution_bucket_status
                                        ? supplier.user_profile
                                            .distribution_bucket_status == "1"
                                          ? true
                                          : false
                                        : false
                                    }
                                  />
                                  <p className="m-0">
                                  {t("supplier.my_account_view.General_Information.desc2")}
                                  </p>
                                </div>
                                <div className="col-sm-12 mb-3 d-flex align-items-start">
                                  <input
                                    type="checkbox"
                                    className="me-2 mt-1"
                                    checked={
                                      supplier.user_profile &&
                                      supplier.user_profile.have_product_status
                                        ? supplier.user_profile
                                            .have_product_status == "1"
                                          ? true
                                          : false
                                        : false
                                    }
                                  />
                                  <p className="m-0">
                                  {t("supplier.my_account_view.General_Information.desc3")}
                                  </p>
                                </div>
                                <div className="col-sm-12 mb-3 d-flex align-items-start">
                                  <input
                                    type="checkbox"
                                    className="me-2 mt-1"
                                    checked={
                                      supplier.user_profile &&
                                      supplier.user_profile
                                        .agency_sell_and_collect_status
                                        ? supplier.user_profile
                                            .agency_sell_and_collect_status ==
                                          "1"
                                          ? true
                                          : false
                                        : false
                                    }
                                  />
                                  <p className="m-0">
                                  {t("supplier.my_account_view.General_Information.desc4")}
                                  </p>
                                </div>
                                <div className="col-sm-12 mb-3 d-flex align-items-start">
                                  <input
                                    type="checkbox"
                                    className="me-2 mt-1"
                                    checked={
                                      supplier.user_profile &&
                                      supplier.user_profile
                                        .produce_product_status
                                        ? supplier.user_profile
                                            .produce_product_status == "1"
                                          ? true
                                          : false
                                        : false
                                    }
                                  />
                                  <p className="m-0">
                                  {t("supplier.my_account_view.General_Information.desc5")}
                                  </p>
                                </div>
                              </div>
                            </div>
                            {/* [/General Info] */}

                            {/* [Billing Info] */}
                            <div className="row">
                              <div className="col-12">
                                <div className="row">
                                  <div className="form-head w-100">
                                    <p>{t("supplier.my_account_view.Billing_Information.billing_information")}</p>
                                  </div>
                                  <div className="col-sm-12 col-xl-6 mb-3">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.Billing_Information.omp")}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        billingAddress.order_number_prefix !==
                                          null ||
                                        billingAddress.order_number_prefix !==
                                          ""
                                          ? billingAddress.order_number_prefix
                                          : "N/A"
                                      }
                                      disabled
                                      placeholder={t("supplier.my_account_view.placeholder.order_no")}
                                    />
                                  </div>
                                  <div className="col-sm-6 col-xl-6 mb-3">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.Billing_Information.gst_tax")}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        billingAddress.gst_registration_number !==
                                          null ||
                                        billingAddress.gst_registration_number !==
                                          ""
                                          ? billingAddress.gst_registration_number
                                          : "N/A"
                                      }
                                      disabled
                                      placeholder={t("supplier.my_account_view.placeholder.gst_tax")}
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-6 col-xl-6 mb-3">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.Billing_Information.qst_tax")}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        billingAddress.qst_registration_number !==
                                          null ||
                                        billingAddress.qst_registration_number !==
                                          ""
                                          ? billingAddress.qst_registration_number
                                          : "N/A"
                                      }
                                      disabled
                                      placeholder={t("supplier.my_account_view.placeholder.qst_tax")}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* [/Billing Info] */}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* [/Card] */}
                </div>
                {/* [/Left Grid] */}

                {/* [Right Grid] */}
                <div className="col-sm-6">
                  {/* [Card] */}
                  <div className="card height-100">
                    <div className="card-body">
                      <form>
                        <div className="row">
                          <div className="col-sm-12">
                            {/* [Main Address] */}
                            <div className="row mb-5">
                              <div className="col-12">
                                <div className="row">
                                  <div className="form-head w-100 card-top-filter-box">
                                    <p>{t("supplier.my_account_view.Main_Address.main_address")}</p>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        navigate(
                                          `/supplier/my-account/edit-main-address`
                                        )
                                      }
                                      className="btn btn-purple"
                                    >
                                       {t("supplier.my_account_view.additional.edit_btn")}
                                    </button>
                                  </div>
                                  <div className="col-sm-12 col-xl-6 mb-3">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.Main_Address.address")}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        mainAddress.address_1 === null
                                          ? "N/A"
                                          : mainAddress.address_1
                                      }
                                      placeholder={t("supplier.my_account_view.placeholder.enter_add")}
                                      disabled
                                    />
                                  </div>
                                  <div className="col-sm-12 col-xl-6 mb-3">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.Main_Address.address2")}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        mainAddress.address_2 === null
                                          ? "N/A"
                                          : mainAddress.address_2
                                      }
                                      placeholder={t("supplier.my_account_view.placeholder.city_name")}
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-12 col-xl-6 mb-3">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.Main_Address.city_name")}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        mainAddress.city === null
                                          ? "N/A"
                                          : mainAddress.city
                                      }
                                      placeholder={t("supplier.my_account_view.placeholder.city_name")}
                                      disabled
                                    />
                                  </div>
                                  <div className="col-sm-12 col-xl-6 mb-3">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.Main_Address.postal_code")}
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      value={
                                        mainAddress.postal_code === null
                                          ? "N/A"
                                          : mainAddress.postal_code
                                      }
                                      placeholder={t("supplier.my_account_view.placeholder.postal_code")}
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.Main_Address.country")}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        mainAddress.country === null
                                          ? "N/A"
                                          : mainAddress.country
                                      }
                                      placeholder={t("supplier.my_account_view.placeholder.postal_code")}
                                      disabled
                                    />
                                  </div>
                                  <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                    <label className="form-label">{t("supplier.my_account_view.Main_Address.state")}</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        mainAddress.state === null
                                          ? "N/A"
                                          : mainAddress.state
                                      }
                                      placeholder={t("supplier.my_account_view.placeholder.postal_code")}
                                      disabled
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* [/Main Address] */}

                            {/* [Billing Address] */}
                            <div className="row">
                              <div className="col-12">
                                <div className="row">
                                  <div className="form-head w-100">
                                  {t("supplier.my_account_view.Billing_Address.billing_address")}
                                  </div>
                                  <div className="col-sm-12 col-xl-6 mb-3">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.Billing_Address.cmpany")}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        supplierProfile.company_name === null
                                          ? "N/A"
                                          : supplierProfile.company_name
                                      }
                                      placeholder={t("supplier.my_account_view.placeholder.order_no")}
                                      disabled
                                    />
                                  </div>
                                  <div className="col-sm-12 col-xl-6 mb-3">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.Billing_Address.address")}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        billingAddress.address_1 === null
                                          ? "N/A"
                                          : billingAddress.address_1
                                      }
                                      placeholder={t("supplier.my_account_view.placeholder.enter_add")}
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-12 col-xl-6 mb-3">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.Billing_Address.address2")}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        billingAddress.address_2 === null
                                          ? "N/A"
                                          : billingAddress.address_2
                                      }
                                      placeholder={t("supplier.my_account_view.placeholder.enter_add")}
                                      disabled
                                    />
                                  </div>
                                  <div className="col-sm-12 col-xl-6 mb-3">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.Billing_Address.city_name")}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        billingAddress.city === null
                                          ? "N/A"
                                          : billingAddress.city
                                      }
                                      placeholder={t("supplier.my_account_view.placeholder.city_name")}
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.Billing_Address.country")}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        billingAddress.country === null
                                          ? "N/A"
                                          : billingAddress.country
                                      }
                                      placeholder={t("supplier.my_account_view.placeholder.city_name")}
                                      disabled
                                    />
                                  </div>
                                  <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                    <label className="form-label">{t("supplier.my_account_view.Billing_Address.state")}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        billingAddress.state === null
                                          ? "N/A"
                                          : billingAddress.state
                                      }
                                      placeholder={t("supplier.my_account_view.placeholder.city_name")}
                                      disabled
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* [/Billing Address] */}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* [/Card] */}
                </div>
                {/* [/Right Grid] */}
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        className="modal fade"
        show={show}
        centered
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p>Linked Distributors</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-sm-12">
              <div className="card shadow-none img-card">
                <div className="card-body">
                  <form>
                    <div className="col-12 mb-sm-3 mb-2">
                      <label for="Warehouse-name" class="col-form-label">
                        Select Distributors to link
                      </label>
                      <Multiselect
                        options={distributorsList}
                        selectedValues={selectedValues} // Preselected value to persist in dropdown
                        onSelect={(e) => setSelectedValues(e)} // Function will trigger on select event
                        onRemove={(e) => setSelectedValues(e)} // Function will trigger on remove event
                        displayValue="comapany_name"
                        avoidHighlightFirstOption
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            class="btn btn-outline-black"
            data-bs-dismiss="modal"
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-purple"
            onClick={() => handleSaveLinks()}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyProfile;
