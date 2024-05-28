// import React, { useState, useEffect } from "react";
// import logo from "../../assets/images/logo.svg";
// import uploadImg from "../../assets/images/upload.png";
// import { useNavigate, useLocation } from "react-router-dom";
// import useAuthInterceptor from "../../../utils/apis";
// import "../../assets/scss/login.scss";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
// import Header from "../../../CommonComponents/Header/header";
// import { useTranslation } from "react-i18next";
// import Select from 'react-select';

// toast.configure();

// const CreateCompanyProfile = () => {
//   const apis = useAuthInterceptor();
//   const { t, i18n } = useTranslation();
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [business, setbusiness] = useState("");
//   const [businessError, setBusinessError] = useState("");
//   const [groupName, setGroupName] = useState("");
//   const [category, setCategory] = useState(0);
//   const [deliveryStatus, setDeliveryStatus] = useState("1");
//   const [permitNo, setPermitNo] = useState([0]);
//   const [alcohalPermit, setAlchohalPermit] = useState("");
//   const [Consumption, setConsumption] = useState("0");
//  // const [opc, setOpc] = useState("0");
//   // const [homeConsumption, setHomeConsumption] = useState("0");
//   const [showBusinessName, setShowBusinessName] = useState("");
//   const [website, setWebsite] = useState("");
//   const [contactName, setContactName] = useState("");
//   const [email, setEmail] = useState("");
//   const [publicMobile, setPublicMobile] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [categoryList, setCategoryList] = useState([0]);
//   const [emailError, setEmailError] = useState(false);
//   const [phoneError, setPhoneError] = useState("");
//   const [publicPhoneError, setPublicPhoneError] = useState("");
//   const [urlError, setUrlError] = useState("");
//   const [isValid, setIsValid] = useState(true);
//   const [groupList, setGroupList] = useState([])

//   const updateSidebar = () => {
//     setShowSidebar(!showSidebar);
//   };

//   let emailregex =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   const mobileregex = /^[0-9]*$/;
//   const websiteRegex = /\.(com|ca|me|net|org)$/;
//   const phoneRegex = [
//     /^(\+\d{1,3}\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/     // 4502589632 format
//     , /^\+\d{1}\s\(\d{3}\)\s\d{3}-\d{3}-\d{4}$/ // +1 (514) 526-258-6987 format
//     ,/^\+\d{1}\(\d{3}\)\d{3}-\d{3}-\d{4}$/        // +1(514)526-258-6987 format
//   ];
//   const navigate = useNavigate();
//   const retailer_accessToken = localStorage.getItem("retailer_accessToken");
//   useEffect(() => {
//     apis
//       .get("getBusinessCategories")
//       .then((res) => {
//         console.log(res);
//         setCategoryList(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   useEffect(() => {
//     apis
//       .get("getSubCategories")
//       .then((res) => {
//         console.log('subcategories-----------------------',res.data.data);
//         setGroupList(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   useEffect(() => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${retailer_accessToken}`,
//       },
//     };
//     apis
//       .get("retailer/getRetailerData", config)
//       .then((res) => {
//         const retailer_general = res.data.data.user_profile;
//         if (retailer_general !== null) {
//           console.log(retailer_general);
//           if (retailer_general.business_name === null) {
//             setbusiness("");
//           } else {
//             setbusiness(retailer_general.business_name);
//           }

//           setGroupName(retailer_general.group_name);
//           setCategory(retailer_general.business_category_id);
//           setEmail(retailer_general.contact_email);
//           setPublicMobile(retailer_general.public_phone_number);
//           setMobile(retailer_general.phone_number);
//           setContactName(retailer_general.contact_name);
//           setWebsite(retailer_general.website_url);
//           setShowBusinessName(retailer_general.business_name_status);
//           setConsumption(retailer_general.consumtion_status);
//         //  setOpc(retailer_general.opc_status);
//        //setHomeConsumption(retailer_general.home_consumption);
//           setAlchohalPermit(retailer_general.alcohol_permit);
//           setDeliveryStatus(retailer_general.order_type);
//           // setPermitNo(retailer_general.permit_numbers)
//         }
//       })
//       .catch((err) => {
//         if(err.message !== "revoke"){
//         toast.error("Something went Wrong !! Please try again Later", {
//           autoClose: 3000,
//           position: toast.POSITION.TOP_CENTER,
//         });
//       }
//       });
//   }, [retailer_accessToken]);
//  // console.log(opc, "Opc status");

//   const handleBusiness = (e) => {
//     setbusiness(e.target.value);
//     setBusinessError("");
//   };
//   const handleGroupName = (e) => {
//     setGroupName(e.target.value);
//     console.log('-----------------------',e.target.value);
//   };
//   const handleCategory = (e) => {
//     setCategory(e.target.value);
//   };
//   const handlePermitNo = (e, index) => {
//     const { name, id, value } = e;

//     const data = [...permitNo];
//     console.log(data);
//     data[index] = value;

//     setPermitNo(data);
//   };
//   const handleAdd = (e) => {
//     e.preventDefault();
//     const data = [...permitNo, 0];
//     setPermitNo(data);
//   };
//   console.log(permitNo);

//   // const validateWebsite = (value) => {
//   //   if (value) {
//   //     const validExtensions = ['.com', '.ca', '.me', '.net', '.org'];
//   //     const isValidExtension = validExtensions.some(extension => value.endsWith(extension));
//   //     setIsValid(isValidExtension);
//   //   } else {
//   //     setIsValid(true); // Reset validation if input value is empty
//   //   }
//   // }
//   const handleWebsite = (e) => {
//     const {value}= e.target.value
//     // console.log('websit url validations',e.target.value);
//     setWebsite(e.target.value);
//     // validateWebsite(value);
//     setUrlError("");
//   };
//   const handleContactName = (e) => {
//     setContactName(e.target.value);
//   };
//   const handleMobile = (e) => {
//     setMobile(e.target.value);
//     setPhoneError("");
//   };
//   const handleEmail = (e) => {
//     setEmail(e.target.value);
//     setEmailError("");
//   };
//   const handlePublicMobile = (e) => {
//     setPublicMobile(e.target.value);
//     setPublicPhoneError("");
//   };
//   const handleCheck = (e) => {
//     if (e.target.checked === true) {
//       setAlchohalPermit("1");
//     } else {
//       setAlchohalPermit("0");
//     }
//   };
//   const handleDeliveryStatus = (e, keyword) => {
//     console.log({ e, keyword });
//     if (keyword === "Delivery") {
//       if (e.target.checked === true) {

//         setDeliveryStatus("1");
//       } else {
//         setDeliveryStatus("0");
//       }
//     } else if (keyword === "Pickup") {
//       if (e.target.checked === true) {
//         setDeliveryStatus("2");
//       } else {
//         setDeliveryStatus("0");
//       }
//     } else if (keyword === "Both"){
//       if (e.target.checked === true) {
//         setDeliveryStatus("3");
//       } else {
//         setDeliveryStatus("0");
//       }
//     } else {
//       if (e.target.checked === true) {
//         setDeliveryStatus("4");
//       } else {
//         setDeliveryStatus("0");
//       }
//     }
//     console.log(deliveryStatus);
//   };
//   const handleShowBusinessName = (e) => {
//     console.log(e.target.checked);
//     if (e.target.checked === true) {
//       setShowBusinessName("1");
//       console.log(showBusinessName);
//     } else {
//       setShowBusinessName("0");
//       console.log(showBusinessName);
//     }
//   };
//   const handleConsumption = (e, key) => {
//     console.log({ e, key });
//    if (key === "site") {
//      if (e.target.checked === true) {
//        console.log({'-----------check1-----': e.target.checked});
//        setConsumption("1");
//      } else {
//        setConsumption("0");
//      }
//    } else {
//      if (e.target.checked === true) {
//        console.log({'-----------check2-----': e.target.checked});
//        setConsumption("2");
//      } else {
//        setConsumption("0");
//      }
//    }
//  }
//   // const handleOpc = (e) => {
//   //   if (e.target.checked) {
//   //     console.log('-checked--------------',e.target.checked);
//   //     setOpc("1");
//   //   } else {
//   //     setOpc("0");
//   //   }
//   // };
//   // const handleHomeConsumption = (e) => {
//   //   if (e.target.checked) {
//   //     setHomeConsumption("1");
//   //   } else {
//   //     setHomeConsumption("0");
//   //   }
//   // };
//   // const handleHomeConsumption = (e) => {
//   //   if (e.target.checked) {
//   //     setHomeConsumption("1");
//   //   } else {
//   //     setHomeConsumption("0");
//   //   }
//   // };

//   const handleNext = (e) => {
//     e.preventDefault();
//     let businessValid = true,
//       emailValid = true,
//       phoneValid = true,
//       publicPhoneValid = true,
//       addressValid = true,
//       websiteValid=true; //New functionality
//     if (business === "") {
//       setBusinessError(t("retailer.profile.business_name_is_required"));
//       businessValid = false;
//     }
//     if (!emailregex.test(email)
//  && email !== "") {
//       setEmailError(t("retailer.profile.not_a_valid_email"));
//       emailValid = false;
//     }

//     const isValidPhoneNumber = (publicMobile) => {
//       return phoneRegex.some(regex => regex.test(publicMobile));
//     };

//     if (!isValidPhoneNumber(mobile) && mobile !== "") {
//       setPhoneError(t("retailer.profile.not_a_valid_number"));
//       phoneValid = false;
//     }

//     if (!isValidPhoneNumber(publicMobile) && publicMobile !== "") {
//       setPublicPhoneError(t("retailer.profile.not_a_valid_number"));
//       publicPhoneValid = false;
//     }
//     if(website!="" && website!==null){
//       if (!websiteRegex.test(website) && website !==""){
//         setUrlError("Enter Website .com, .ca, .me, .net, or .org only allowed");//Translation
//         websiteValid=false;
//       } }

//     if (
//       !businessValid ||
//       !emailValid ||
//       !phoneValid ||
//       !publicPhoneValid ||
//       !websiteValid ||
//       !addressValid ||
//       businessError !== ""
//     ) {
//       console.log("Validation Error");
//     } else {
//       const bodyData = {
//         business_name: business,
//         group_name: groupName,
//         business_category_id: category,
//         contact_email: email,
//         public_phone_number: publicMobile,
//         phone_number: mobile,
//         contact_name: contactName,
//         website_url: website,
//         //opc_status: String(opc),
//         business_name_status: String(showBusinessName),
//         alcohol_permit: String(alcohalPermit),
//         order_type: String(deliveryStatus),
//         permit_numbers: permitNo,
//         consumtion_status: String(Consumption),
//         // home_consumption:homeConsumption
//       };
//       console.log(bodyData);
//       const config = {
//         headers: {
//           Authorization: `Bearer ${retailer_accessToken}`,
//         },
//       };
//       apis
//         .post("retailer/createRetailerProfile", bodyData, config)
//         .then((res) => {
//           console.log(res);
//           if (res.data.success) {
//             toast.success("Profile details has been updated successfully.", {
//               autoClose: 3000,
//               position: toast.POSITION.TOP_CENTER,
//             });
//             navigate("/retailer/my-account/edit-company-address");
//           } else {
//             toast.error(res.data.message, {
//               autoClose: 3000,
//               position: toast.POSITION.TOP_CENTER,
//             });
//           }
//         })
//         .catch((err) => {
//           if(err.message !== "revoke"){
//           if (err.response.data.data?.contact_email) {
//             toast.error(err.response.data.data?.contact_email[0], {
//               autoClose: 3000,
//               position: toast.POSITION.TOP_CENTER,
//             });
//           }
//           if (err.response.data.data?.phone_number) {
//             toast.error(err.response.data.data?.phone_number[0], {
//               autoClose: 3000,
//               position: toast.POSITION.TOP_CENTER,
//             });
//           }
//         }
//           console.log(err);
//         });
//     }
//   };
//   const groupOptions = [
//     { value: 'dbsq', label: 'DBSQ' },
//     { value: 'dbsq1', label: 'DBSQ' },
//     { value: 'dbsq2', label: 'DBSQ2' },
//     { value: 'other', label: 'Other' },
//     // Add more options as needed
//   ];

//   const [selectedOption, setSelectedOption] = useState(null);

//   const handleChange = selectedOption => {
//     setSelectedOption(selectedOption);
//   };

//   return (
//     <div class="container-fluid page-wrap add-supplier">
//       <div class="row height-inherit">
//         <Sidebar userType={"retailer"} />

//         <div class="col main p-0">
//           <Header title="Edit Retailer" updateSidebar={updateSidebar} />
//           <div class="container-fluid page-content-box px-3 px-sm-4">
//             <div class="row">
//               <div class="col">
//                 <div className="card">
//                   <div className="card-body">
//                     <form>
//                       {/* [General Info] */}
//                       <div className="row mb-3">
//                         <div className="form-head w-100">{t("retailer.profile.general_information")}</div>
//                         <hr />
//                         <div className="col-xl-12 col-12">
//                           <div className="row">
//                             <div className="col-sm-6 mb-3">
//                               <label className="form-label">
//                               {t("retailer.profile.business_name")}<sup>*</sup>
//                               </label>

//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 value={business}
//                                 onChange={(e) => handleBusiness(e)}
//                                 placeholder="Enter business name"
//                               />
//                               {businessError !== "" ? (
//                                 <p className="error-label m-0 p-0">
//                                   {businessError}
//                                 </p>
//                               ) : (
//                                 <></>
//                               )}
//                             </div>
//                             <div className="col-sm-6 mb-3">
//                               <label className="form-label">{t("retailer.profile.group_name")}</label>

//                               <select
//                                 className="form-select"
//                                 value={groupName}
//                                 onChange={(e) => handleGroupName(e)}
//                                 name=""
//                                 id=""
//                                 placeholder="Select Group Name"
//                               >
//                                 <option value="">{t("retailer.profile.enter_group_name")}</option>
//                                 {groupList.map((g) => {
//                                   return (
//                                     <option key={g.id} value={g.name}>
//                                       {g.name}
//                                     </option>
//                                   );
//                                 })}
//                               </select>
//                               {/* <input
//                                 type="text"
//                                 className="form-control"
//                                 value={groupName}
//                                 onChange={(e) => handleGroupName(e)}
//                                 placeholder="Enter group name"
//                               /> */}
//                               {/* <Select className="form-control"
//                                 value={selectedOption}
//                                 onChange={handleChange}
//                                 options={options}
//                                 isSearchable={true}
//                                 placeholder="Enter Group Name"
//                               /> */}
//                             </div>
//                           </div>
//                           <div className="row">
//                             <div className="col-sm-6 mb-3">
//                               <label className="form-label">
//                               {t("retailer.profile.business_category")}
//                               </label>
//                               <select
//                                 className="form-select"
//                                 value={category}
//                                 onChange={(e) => handleCategory(e)}
//                                 name=""
//                                 id=""
//                               >
//                                 <option value="">Choose</option>
//                                 {categoryList.map((c) => {
//                                   return (
//                                     <option key={c.id} value={c.id}>
//                                       {c.name}
//                                     </option>
//                                   );
//                                 })}
//                               </select>
//                             </div>
//                             <div className="col-sm-6 mb-3">
//                               <label className="form-label">
//                               {t("retailer.profile.contact_email")}<sup>*</sup>
//                               </label>
//                               <input
//                                 type="email"
//                                 className="form-control"
//                                 value={email}
//                                 onChange={(e) => handleEmail(e)}
//                                 placeholder="Enter contact email"
//                               />
//                               {emailError !== "" ? (
//                                 <p className="error-label m-0 p-0">
//                                   {emailError}
//                                 </p>
//                               ) : (
//                                 <></>
//                               )}
//                             </div>
//                           </div>
//                           <div className="row mb-4">
//                             <div className="col-sm-6 mb-3">
//                               <label className="form-label">
//                               {t("retailer.profile.public_phone_number")}<sup>*</sup>
//                               </label>
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 value={publicMobile}
//                                 onChange={(e) => handlePublicMobile(e)}
//                                 placeholder="Enter mobile no."
//                               />
//                               {publicPhoneError !== "" ? (
//                                 <p className="error-label m-0 p-0">
//                                   {publicPhoneError}
//                                 </p>
//                               ) : (
//                                 <></>
//                               )}
//                             </div>
//                             <div className="col-sm-6 mb-3">
//                               <label className="form-label">
//                               {t("retailer.profile.phone_number")}<sup>*</sup>
//                               </label>
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 value={mobile}
//                                 onChange={(e) => handleMobile(e)}
//                                 placeholder="Enter mobile no."
//                               />
//                               {phoneError !== "" ? (
//                                 <p className="error-label m-0 p-0">
//                                   {phoneError}
//                                 </p>
//                               ) : (
//                                 <></>
//                               )}
//                             </div>
//                             <div className="col-sm-6 mb-3">
//                               <label className="form-label">{t("retailer.profile.contact_name")}</label>
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 value={contactName}
//                                 onChange={(e) => handleContactName(e)}
//                                 placeholder="Enter contact name"
//                               />
//                             </div>
//                             <div className="col-sm-6 mb-3">
//                               <label className="form-label">
//                               {t("retailer.profile.website_url")}
//                               </label>
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 value={website}
//                                 onChange={(e) => handleWebsite(e)}
//                                 placeholder="Enter website URL"
//                               />
//                               {urlError !== "" ? (
//                                 <p className="error-label m-0 p-0">
//                                   {urlError}
//                                 </p>
//                               ) : (
//                                 <></>
//                               )}
//                               {!isValid && <p>Please enter a valid domain ending with .com, .ca, .me, .net, or .org</p>}
//                             </div>
//                             <div className="col-sm-6 mb-3 d-flex align-items-start">
//                               <input
//                                 type="checkbox"
//                                 checked={
//                                   showBusinessName === "1" ? true : false
//                                 }
//                                 onChange={(e) => handleShowBusinessName(e)}
//                                 className="me-2 mt-1"
//                               />
//                               <p className="m-0">
//                               {t("retailer.profile.show_the_business_name")}
//                               </p>
//                             </div>
//                             <div className="col-sm-6 d-flex">
//                             <div className="align-items-start form-check">
//                               <input
//                                 className="form-check-input"
//                                 type="radio"
//                                 name="inlineRadioOptions02"
//                                 id="inlineRadio01"
//                                 checked={Consumption === "1"}
//                                 onChange={(e) =>
//                                   handleConsumption(e,"site")
//                                 }
//                               />
//                               <label
//                                 className="form-check-label font-regular mx-1"
//                                 htmlFor="inlineRadio01"
//                               >
//                                 {t("retailer.profile.on_premise_consumption")}
//                               </label>
//                             </div>

//                             <div className="align-items-start form-check mx-3 ">
//                               <input
//                                 className="form-check-input"
//                                 type="radio"
//                                 name="inlineRadioOptions02"
//                                 id="inlineRadio02"
//                                 checked={Consumption === "2"}
//                                 onChange={(e) =>
//                                   handleConsumption(e,"home")
//                                 }
//                               />
//                               <label
//                                 className="form-check-label font-regular mx-1"
//                                 htmlFor="inlineRadio02"
//                               >
//                                 {t("retailer.profile.home_consumption1")}
//                               </label>
//                             </div>
//                             </div>
//                             {/* <div className="col-sm-3 mb-3 d-flex align-items-start">
//                               <input
//                                 type="radio"
//                                 checked={opc === "0" ? true : false}
//                                 onChange={(e) => handleOpc(e)}
//                                 className="me-2 mt-1"
//                               />
//                               <p className="m-0">{t("retailer.profile.on_premise_consumption")}</p>
//                             </div>

//                             <div className="col-sm-3 mb-3 d-flex align-items-start">
//                               <input
//                                 type="radio"
//                                 checked={homeConsumption === "1" ? true : false}
//                                 onChange={(e) => handleHomeConsumption(e)}
//                                 className="me-2 mt-1"
//                               />
//                               <p className="m-0">{t("retailer.profile.home_consumption1")}</p>
//                             </div> */}
//                           </div>
//                           <div className="row mb-3">
//                             <p className="sub-head">{t("retailer.profile.alcohol")}</p>
//                             <div className="col-sm-6 d-flex align-items-start mb-3">
//                               <input
//                                 type="checkbox"
//                                 checked={alcohalPermit === "1" ? true : false}
//                                 onChange={(e) => handleCheck(e)}
//                                 className="me-2 mt-1"
//                               />
//                               <p className="m-0">{t("retailer.profile.permit_of_alcohol")}</p>
//                             </div>
//                             <div className="col-12">
//                               {alcohalPermit === "1" && (
//                                 <button
//                                   className="btn btn-purple mb-lg-4 mb-3 col-sm-6 col-12 m-auto"
//                                   onClick={(e) => handleAdd(e)}
//                                 >
//                                  {t("retailer.profile.add")}
//                                 </button>
//                               )}
//                             </div>
//                             {alcohalPermit === "1" &&
//                               permitNo.map((value, i) => (
//                                 <div className="col-sm-6 mb-3">
//                                   <label className="form-label">
//                                   {t("retailer.profile.permit_no")}
//                                   </label>
//                                   <input
//                                     type="text"
//                                     className="form-control"
//                                     value={value === 0 ? "" : value}
//                                     // id={`text${i}`}
//                                     name={`permitno`}
//                                     onChange={(e) =>
//                                       handlePermitNo(e.target, i)
//                                     }
//                                     placeholder="Enter permit no."
//                                   />
//                                 </div>
//                               ))}
//                           </div>
//                           <div className="w-100 mb-3">
//                             <div className="form-check form-check-inline">
//                               <input
//                                 className="form-check-input"
//                                 type="radio"
//                                 name="inlineRadioOptions"
//                                 id="inlineRadio1"
//                                 checked={deliveryStatus === "1"}
//                                 onChange={(e) =>
//                                   handleDeliveryStatus(e, "Delivery")
//                                 }
//                               />
//                               <label
//                                 className="form-check-label font-regular"
//                                 htmlFor="inlineRadio1"
//                               >
//                                 {t("retailer.profile.take_order_delivery")}
//                               </label>
//                             </div>
//                             <div className="form-check form-check-inline">
//                               <input
//                                 className="form-check-input"
//                                 type="radio"
//                                 name="inlineRadioOptions"
//                                 id="inlineRadio2"
//                                 checked={deliveryStatus === "2" && true}
//                                 onChange={(e) =>
//                                   handleDeliveryStatus(e, "Pickup")
//                                 }
//                               />
//                               <label
//                                 className="form-check-label font-regular"
//                                 htmlFor="inlineRadio2"
//                               >
//                                 {t("retailer.profile.take_order_pickup")}
//                               </label>
//                             </div>
//                             <div className="form-check form-check-inline">
//                               <input
//                                 className="form-check-input"
//                                 type="radio"
//                                 name="inlineRadioOptions"
//                                 id="inlineRadio3"
//                                 checked={deliveryStatus === "3" ? true : false}
//                                 onChange={(e) =>
//                                   handleDeliveryStatus(e, "Both")
//                                 }
//                               />
//                               <label
//                                 className="form-check-label font-regular"
//                                 htmlFor="inlineRadio3"
//                               >
//                                {t("retailer.profile.both")}
//                               </label>
//                             </div>
//                             <div className="form-check form-check-inline">
//                               <input
//                                 className="form-check-input"
//                                 type="radio"
//                                 name="inlineRadioOptions"
//                                 id="inlineRadio3"
//                                 checked={deliveryStatus === "4" ? true : false}
//                                 onChange={(e) =>
//                                   handleDeliveryStatus(e, "None")
//                                 }
//                               />
//                               <label
//                                 className="form-check-label font-regular"
//                                 htmlFor="inlineRadio3"
//                               >
//                                {t("retailer.profile.none")}
//                               </label>

//                             </div>
//                           </div>

//                         </div>
//                       </div>
//                       {/* [/General Info] */}
//                       <button
//                         className="btn btn-outline-black me-2"
//                         onClick={() => navigate("/retailer/my-account")}
//                       >
//                         {t("retailer.profile.cancel")}
//                       </button>
//                       <button
//                         className="btn btn-purple"
//                         onClick={(e) => handleNext(e)}
//                       >
//                         {t("retailer.profile.next")}
//                       </button >
//                       <button className="btn btn-green">
//                         {t("retailer.profile.save")}
//                       </button>
//                     </form>
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

// export default CreateCompanyProfile;

import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.svg";
import uploadImg from "../../assets/images/upload.png";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthInterceptor from "../../../utils/apis";
import "../../assets/scss/login.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import { useTranslation } from "react-i18next";
import Select from "react-select";

toast.configure();

const CreateCompanyProfile = () => {
  const apis = useAuthInterceptor();
  const { t, i18n } = useTranslation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [consumptionError,setConsumptionError]=useState("");
  const [business, setbusiness] = useState("");
  const [businessError, setBusinessError] = useState("");
  const [groupName, setGroupName] = useState("");
  const [category, setCategory] = useState(0);
  const [deliveryStatus, setDeliveryStatus] = useState("1");
  const [permitNo, setPermitNo] = useState([0]);
  const [alcohalPermit, setAlchohalPermit] = useState("");
  const [Consumption, setConsumption] = useState("0");
   const [opc, setOpc] = useState("0");
   const [homeConsumption, setHomeConsumption] = useState("0");
  const [showBusinessName, setShowBusinessName] = useState("");
  const [website, setWebsite] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [publicMobile, setPublicMobile] = useState("");
  const [mobile, setMobile] = useState("");
  const [categoryList, setCategoryList] = useState([0]);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [publicPhoneError, setPublicPhoneError] = useState("");
  const [urlError, setUrlError] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [groupList, setGroupList] = useState([]);

  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  

  let emailregex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const mobileregex = /^[0-9]*$/;
  const websiteRegex = /^(http:\/\/|https:\/\/)(.*)(\.com|\.ca|\.me|\.net|\.org)$/;
  const phoneRegex = [
    /^(\+\d{1,3}\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/, // 4502589632 format
    /^\+\d{1}\s\(\d{3}\)\s\d{3}-\d{3}-\d{4}$/, // +1 (514) 526-258-6987 format
    /^\+\d{1}\(\d{3}\)\d{3}-\d{3}-\d{4}$/, // +1(514)526-258-6987 format
  ];
  const navigate = useNavigate();
  const retailer_accessToken = localStorage.getItem("retailer_accessToken");
  useEffect(() => {
    apis
      .get("getBusinessCategories")
      .then((res) => {
        console.log(res);
        setCategoryList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${retailer_accessToken}`,
      },
    };
    apis
      .get("retailer/getRetailerData", config)
      .then((res) => {
        const retailer_general = res.data.data.user_profile;
        if (retailer_general !== null) {
          console.log(retailer_general);
          if (retailer_general.business_name === null) {
            setbusiness("");
          } else {
            setbusiness(retailer_general.business_name);
          }

          setGroupName(retailer_general.group_name);
          setCategory(retailer_general.business_category_id);
          setEmail(retailer_general.contact_email);
          setPublicMobile(retailer_general.public_phone_number);
          setMobile(retailer_general.phone_number);
          setContactName(retailer_general.contact_name);
          setWebsite(retailer_general.website_url);
          setShowBusinessName(retailer_general.business_name_status);
          setConsumption(retailer_general.consumtion_status);
          setOpc(retailer_general.opc_status);
          setHomeConsumption(retailer_general.home_consumption);
          setAlchohalPermit(retailer_general.alcohol_permit);
          setDeliveryStatus(retailer_general.order_type);
          // setPermitNo(retailer_general.permit_numbers)
        }
      })
      .catch((err) => {
        if (err.message !== "revoke") {
          toast.error("Something went Wrong !! Please try again Later", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  }, [retailer_accessToken]);
  // console.log(opc, "Opc status");

  useEffect(() => {
    apis
      .get("getSubCategories")
      .then((res) => {
        console.log("subcategories-----------------------", res.data.data);
        setGroupList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleBusiness = (e) => {
    setbusiness(e.target.value);
    setBusinessError("");
  };
  const handleGroupName = (e) => {
    setGroupName(e.target.value);
    console.log("-----------------------", e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handlePermitNo = (e, index) => {
    const { name, id, value } = e;

    const data = [...permitNo];
    console.log(data);
    data[index] = value;

    setPermitNo(data);
  };
  const handleAdd = (e) => {
    e.preventDefault();
    const data = [...permitNo, 0];
    setPermitNo(data);
  };
  console.log(permitNo);

  // const validateWebsite = (value) => {
  //   if (value) {
  //     const validExtensions = ['.com', '.ca', '.me', '.net', '.org'];
  //     const isValidExtension = validExtensions.some(extension => value.endsWith(extension));
  //     setIsValid(isValidExtension);
  //   } else {
  //     setIsValid(true); // Reset validation if input value is empty
  //   }
  // }
  const handleWebsite = (e) => {
    const { value } = e.target.value;
    // console.log('websit url validations',e.target.value);
    setWebsite(e.target.value);
    // validateWebsite(value);
    setUrlError("");
  };
  const handleContactName = (e) => {
    setContactName(e.target.value);
  };
  const handleMobile = (e) => {
    setMobile(e.target.value);
    setPhoneError("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handlePublicMobile = (e) => {
    setPublicMobile(e.target.value);
    setPublicPhoneError("");
  };
  const handleCheck = (e) => {
    if (e.target.checked === true) {
      setAlchohalPermit("1");
    } else {
      setAlchohalPermit("0");
    }
  };
  const handleDeliveryStatus = (e, keyword) => {
    console.log({ e, keyword });
    if (keyword === "Delivery") {
      if (e.target.checked === true) {
        setDeliveryStatus("1");
      } else {
        setDeliveryStatus("0");
      }
    } else if (keyword === "Pickup") {
      if (e.target.checked === true) {
        setDeliveryStatus("2");
      } else {
        setDeliveryStatus("0");
      }
    } else if (keyword === "Both") {
      if (e.target.checked === true) {
        setDeliveryStatus("3");
      } else {
        setDeliveryStatus("0");
      }
    } else {
      if (e.target.checked === true) {
        setDeliveryStatus("4");
      } else {
        setDeliveryStatus("0");
      }
    }
    console.log(deliveryStatus);
  };
  const handleShowBusinessName = (e) => {
    console.log(e.target.checked);
    if (e.target.checked === true) {
      setShowBusinessName("1");
      console.log(showBusinessName);
    } else {
      setShowBusinessName("0");
      console.log(showBusinessName);
    }
  };
  const handleConsumption = (e, key) => {
    setConsumptionError("");
      console.log({ e, key });
     if (key === "site") {
       if (e.target.checked === true) {
         console.log({'-----------check1-----': e.target.checked});
         setOpc("1");
         setHomeConsumption("0");
       } else {
        setHomeConsumption("1");
        setOpc("0");
       }
     } else {
       if (e.target.checked === true) {
         console.log({'-----------check2-----': e.target.checked});
         setHomeConsumption("1");
         setOpc("0");
       } else {
        setOpc("1");
        setHomeConsumption("0");
       }
     }
   }
  // const handleOpc = (e) => {
  //   if (e.target.checked) {
  //     console.log('-checked--------------',e.target.checked);
  //     setOpc("1");
  //   } else {
  //     setOpc("0");
  //   }
  // };
  // const handleHomeConsumption = (e) => {
  //   if (e.target.checked) {
  //     setHomeConsumption("1");
  //   } else {
  //     setHomeConsumption("0");
  //   }
  // };
  // const handleHomeConsumption = (e) => {
  //   if (e.target.checked) {
  //     setHomeConsumption("1");
  //   } else {
  //     setHomeConsumption("0");
  //   }
  // };

  const handleNext = (e, x=0) => {
    e.preventDefault();
    let businessValid = true,
      emailValid = true,
      phoneValid = true,
      publicPhoneValid = true,
      addressValid = true,
      consumptionvalid=true,
      websiteValid = true; //New functionality
    if (business === "") {
      setBusinessError(t("retailer.profile.business_name_is_required"));
      businessValid = false;
    }
    if (!emailregex.test(email) && email !== "") {
      setEmailError(t("retailer.profile.not_a_valid_email"));
      emailValid = false;
    }

    // if (!mobileregex.test(mobile) && mobile !== "") {
    //   setPhoneError(t("retailer.profile.not_a_valid_number"));
    //   phoneValid = false;
    // }

    const isValidPhoneNumber = (publicMobile) => {
      return phoneRegex.some((regex) => regex.test(publicMobile));
    };
    if (!isValidPhoneNumber(mobile) && mobile !== "") {
      setPhoneError(t("retailer.profile.not_a_valid_number"));
      phoneValid = false;
    }
    if (!isValidPhoneNumber(publicMobile) && publicMobile !== "") {
      setPublicPhoneError(t("retailer.profile.not_a_valid_number"));
      publicPhoneValid = false;
    }
    // if (website != "" && website !== null) {
    //   if (!websiteRegex.test(website) && website !== "") {
    //     setUrlError("Enter Website .com, .ca, .me, .net, or .org only allowed"); //Translation
    //     websiteValid = false;
    //   }
    // }
    if(homeConsumption==="1" || opc==="1")
    {
    }
    else{consumptionvalid=false;
    setConsumptionError("Please Select any value")}

    if (
      !businessValid ||
      !emailValid ||
      !phoneValid ||
      !publicPhoneValid ||
      !websiteValid ||
      !addressValid ||
      !consumptionvalid ||
      businessError !== ""
    ) {
      console.log("Validation Error");
    } else {
      const bodyData = {
        business_name: business,
        group_name: groupName,
        business_category_id: category,
        contact_email: email,
        public_phone_number: publicMobile,
        phone_number: mobile,
        contact_name: contactName,
        website_url: website,
        opc_status: opc,
        business_name_status: String(showBusinessName),
        alcohol_permit: String(alcohalPermit),
        order_type: String(deliveryStatus),
        permit_numbers: permitNo,
        // consumtion_status: String(Consumption),
        home_consumption:homeConsumption
      };
      console.log(bodyData);
      const config = {
        headers: {
          Authorization: `Bearer ${retailer_accessToken}`,
        },
      };
      apis
        .post("retailer/createRetailerProfile", bodyData, config)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            toast.success("Profile details has been updated successfully.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
            if(x==0){
              navigate("/retailer/my-account/edit-company-address");
            }
            else{
              navigate("/retailer/my-account");
            }
            
          } else {
            toast.error(res.data.message, {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((err) => {
          if (err.message !== "revoke") {
            if (err.response.data.data?.contact_email) {
              toast.error(err.response.data.data?.contact_email[0], {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              });
            }
            if (err.response.data.data?.phone_number) {
              toast.error(err.response.data.data?.phone_number[0], {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              });
            }
          }
          console.log(err);
        });
    }
  };
  const groupOptions = [
    { value: "dbsq", label: "DBSQ" },
    { value: "dbsq1", label: "DBSQ" },
    { value: "dbsq2", label: "DBSQ2" },
    { value: "other", label: "Other" },
    // Add more options as needed
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <div class="container-fluid page-wrap add-supplier">
      <div class="row height-inherit">
        <Sidebar userType={"retailer"} />

        <div class="col main p-0">
          <Header
            title={t("retailer.profile.edit_retailer")}
            updateSidebar={updateSidebar}
          />
          <div class="container-fluid page-content-box px-3 px-sm-4">
            <div class="row">
              <div class="col">
                <div className="card">
                  <div className="card-body">
                    <form>
                      {/* [General Info] */}
                      <div className="row mb-3">
                        <div className="form-head w-100">
                          {t("retailer.profile.general_information")}
                        </div>
                        <hr />
                        <div className="col-xl-12 col-12">
                          <div className="row">
                            <div className="col-sm-6 mb-3">
                              <label className="form-label">
                                {t("retailer.profile.business_name")}
                                <sup>*</sup>
                              </label>

                              <input
                                type="text"
                                className="form-control"
                                value={business}
                                onChange={(e) => handleBusiness(e)}
                                placeholder={t("retailer.edit_profile.ent_bsss_name")}
                              />
                              {businessError !== "" ? (
                                <p className="error-label m-0 p-0">
                                  {businessError}
                                </p>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="col-sm-6 mb-3">
                              <label className="form-label">
                                {t("retailer.profile.group_name")}
                              </label>

                              <select
                                className="form-select"
                                value={groupName}
                                onChange={(e) => handleGroupName(e)}
                                name=""
                                id=""
                                placeholder={t("retailer.edit_profile.slt_grp_nam")}
                              >
                                <option value="">
                                  {t("retailer.profile.enter_group_name")}
                                </option>
                                {groupList.map((g) => {
                                  return (
                                    <option key={g.id} value={g.name}>
                                      {g.name}{" "}
                                    </option>
                                  );
                                })}
                              </select>
                              {/* <input
                                type="text"
                                className="form-control"
                                value={groupName}
                                onChange={(e) => handleGroupName(e)}
                                placeholder="Enter group name"
                              /> */}
                              {/* <Select className="form-control"
                                value={selectedOption}
                                onChange={handleChange}
                                options={options}
                                isSearchable={true}
                                placeholder="Enter Group Name"
                              /> */}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6 mb-3">
                              <label className="form-label">
                                {t("retailer.profile.business_category")}
                              </label>
                              <select
                                className="form-select"
                                value={category}
                                onChange={(e) => handleCategory(e)}
                                name=""
                                id=""
                              >
                                <option value="">
                                {t("retailer.profile.business_category_choose")}
                                </option>
                                {categoryList.map((c) => {
                                  return (
                                    <option key={c.id} value={c.id}>
                                      {c.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="col-sm-6 mb-3">
                              <label className="form-label">
                                {t("retailer.profile.contact_email")}
                                <sup>*</sup>
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => handleEmail(e)}
                                placeholder={t("retailer.edit_profile.entr_con_emai")} 
                              />
                              {emailError !== "" ? (
                                <p className="error-label m-0 p-0">
                                  {emailError}
                                </p>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                          <div className="row mb-4">
                            <div className="col-sm-6 mb-3">
                              <label className="form-label">
                                {t("retailer.profile.public_phone_number")}
                                <sup>*</sup>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={publicMobile}
                                onChange={(e) => handlePublicMobile(e)}
                                placeholder={t(
                                  "retailer.profile.phone_number_placeholder"
                                )}
                              />
                              {publicPhoneError !== "" ? (
                                <p className="error-label m-0 p-0">
                                  {publicPhoneError}
                                </p>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="col-sm-6 mb-3">
                              <label className="form-label">
                                {t("retailer.profile.phone_number")}
                                <sup>*</sup>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={mobile}
                                onChange={(e) => handleMobile(e)}
                                placeholder={t(
                                  "retailer.profile.phone_number_placeholder"
                                )}
                              />
                              {phoneError !== "" ? (
                                <p className="error-label m-0 p-0">
                                  {phoneError}
                                </p>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="col-sm-6 mb-3">
                              <label className="form-label">
                                {t("retailer.profile.contact_name")}
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={contactName}
                                onChange={(e) => handleContactName(e)}
                                placeholder={t("retailer.edit_profile.ent_con")} 
                              />
                            </div>
                            <div className="col-sm-6 mb-3">
                              <label className="form-label">
                                {t("retailer.profile.website_url")}
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={website}
                                onChange={(e) => handleWebsite(e)}
                                placeholder={t(
                                  "retailer.profile.website_url_placeholder"
                                )}
                              />
                              {urlError !== "" ? (
                                <p className="error-label m-0 p-0">
                                  {urlError}
                                </p>
                              ) : (
                                <></>
                              )}
                              {!isValid && (
                                <p>
                                  Please enter a valid domain ending with .com,
                                  .ca, .me, .net, or .org
                                </p>
                              )}
                            </div>
                            <div className="col-sm-6 mb-3 d-flex align-items-start">
                              <input
                                type="checkbox"
                                checked={
                                  showBusinessName === "1" ? true : false
                                }
                                onChange={(e) => handleShowBusinessName(e)}
                                className="me-2 mt-1"
                              />
                              <p className="m-0">
                                {t("retailer.profile.show_the_business_name")}
                              </p>
                            </div>
                            <div className="col-sm-6 d-flex">
                            <div className="align-items-start form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions02"
                                id="inlineRadio01"
                                checked={opc === "1"}
                                onChange={(e) =>
                                  handleConsumption(e,"site")
                                }
                              />
                              <label
                                className="form-check-label font-regular mx-1"
                                htmlFor="inlineRadio01"
                              >
                                {t("retailer.profile.on_premise_consumption")}
                              </label>
                            </div>

                            <div className="align-items-start form-check mx-3 ">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions02"
                                id="inlineRadio02"
                                checked={homeConsumption === "1"}
                                onChange={(e) =>
                                  handleConsumption(e,"home")
                                }
                              />
                              <label
                                className="form-check-label font-regular mx-1"
                                htmlFor="inlineRadio02"
                              >
                                {t("retailer.profile.home_consumption1")}
                              </label>
                            </div>
                            {/* {consumptionError===""?(<></>):(<p className="error-label m-0 p-0">
                                  {consumptionError}
                                </p>)} */}
                            </div>
                            {/* <div className="col-sm-3 mb-3 d-flex align-items-start">
                              <input
                                type="radio"
                                checked={opc === "0" ? true : false}
                                onChange={(e) => handleOpc(e)}
                                className="me-2 mt-1"
                              />
                              <p className="m-0">{t("retailer.profile.on_premise_consumption")}</p>
                            </div>
                            
                            <div className="col-sm-3 mb-3 d-flex align-items-start">
                              <input
                                type="radio"
                                checked={homeConsumption === "1" ? true : false}
                                onChange={(e) => handleHomeConsumption(e)}
                                className="me-2 mt-1"
                              />
                              <p className="m-0">{t("retailer.profile.home_consumption1")}</p>
                            </div> */}
                          </div>
                          <div className="row mb-3">
                            <p className="sub-head">
                              {t("retailer.profile.alcohol")}
                            </p>
                            <div className="col-sm-6 d-flex align-items-start mb-3">
                              <input
                                type="checkbox"
                                checked={alcohalPermit === "1" ? true : false}
                                onChange={(e) => handleCheck(e)}
                                className="me-2 mt-1"
                              />
                              <p className="m-0">
                                {t("retailer.profile.permit_of_alcohol")}
                              </p>
                            </div>
                            <div className="col-12">
                              {alcohalPermit === "1" && (
                                <button
                                  className="btn btn-purple mb-lg-4 mb-3 col-sm-6 col-12 m-auto"
                                  onClick={(e) => handleAdd(e)}
                                >
                                  {t("retailer.profile.add")}
                                </button>
                              )}
                            </div>
                            {alcohalPermit === "1" &&
                              permitNo.map((value, i) => (
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                    {t("retailer.profile.permit_no")}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={value === 0 ? "" : value}
                                    // id={`text${i}`}
                                    name={`permitno`}
                                    onChange={(e) =>
                                      handlePermitNo(e.target, i)
                                    }
                                    placeholder={t("retailer.edit_profile.per_no")} 
                                  />
                                </div>
                              ))}
                          </div>
                          <div className="w-100 mb-3">
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio1"
                                checked={deliveryStatus === "1"}
                                onChange={(e) =>
                                  handleDeliveryStatus(e, "Delivery")
                                }
                              />
                              <label
                                className="form-check-label font-regular"
                                htmlFor="inlineRadio1"
                              >
                                {t("retailer.profile.take_order_delivery")}
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio2"
                                checked={deliveryStatus === "2" && true}
                                onChange={(e) =>
                                  handleDeliveryStatus(e, "Pickup")
                                }
                              />
                              <label
                                className="form-check-label font-regular"
                                htmlFor="inlineRadio2"
                              >
                                {t("retailer.profile.take_order_pickup")}
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio3"
                                checked={deliveryStatus === "3" ? true : false}
                                onChange={(e) =>
                                  handleDeliveryStatus(e, "Both")
                                }
                              />
                              <label
                                className="form-check-label font-regular"
                                htmlFor="inlineRadio3"
                              >
                                {t("retailer.profile.both")}
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio3"
                                checked={deliveryStatus === "4" ? true : false}
                                onChange={(e) =>
                                  handleDeliveryStatus(e, "None")
                                }
                              />
                              <label
                                className="form-check-label font-regular"
                                htmlFor="inlineRadio3"
                              >
                                {t("retailer.profile.none")}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* [/General Info] */}
                      <button
                        className="btn btn-outline-black me-2"
                        onClick={() => navigate("/retailer/my-account")}
                      >
                        {t("retailer.profile.cancel")}
                      </button>
                      <button
                        className="btn btn-purple"
                        onClick={(e) => handleNext(e)}
                      >
                        {t("retailer.profile.next")}
                      </button>
                      <button className="btn btn-green" onClick={(e) => handleNext(e,1)}>
                        {t("retailer.profile.save")}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCompanyProfile;
