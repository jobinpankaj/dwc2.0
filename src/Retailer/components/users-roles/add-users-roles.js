// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import dpImg from "../../assets/images/dp.png";
// import editImg from "../../assets/images/edit-white.png";
// import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
// import Header from "../../../CommonComponents/Header/header";
// import "react-toastify/dist/ReactToastify.css";
// import useAuthInterceptor from "../../../utils/apis";
// import "../../assets/scss/dashboard.scss";
// import { useTranslation } from "react-i18next";
// toast.configure();

// const DistributorAddUsersRoles = () => {
//   const apis = useAuthInterceptor();
//   const { t, i18n } = useTranslation();
//   const [showSidebar, setShowSidebar] = useState(false);
//   const navigate = useNavigate();
//   let mobileregex = /^\d{10}$/;
//   let emailregex =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   const token = localStorage.getItem("retailer_accessToken");
//   const [firstName, setFirstName] = useState("");
//   const [firstNameError, setFirstNameError] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [lastNameError, setLastNameError] = useState("");
//   const [email, setEmail] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [mobileError, setMobileError] = useState("");
//   const [pass1, setPass1] = useState("");
//   const [pass1Error, setPass1Error] = useState("");
//   const [pass2, setPass2] = useState("");
//   const [pass2Error, setPass2Error] = useState("");
//   const [showPass1, setShowPass1] = useState(false);
//   const [showPass2, setShowPass2] = useState(false);
//   const [currentImage, setCurrentImage] = useState("");
//   const [formPic, setFormPic] = useState("");
//   const [status, setStatus] = useState("0");
//   const [address, setAddress] = useState("")
//   const [addressError, setAddressError] = useState("")
//   const [country, setCountry] = useState("")
//   const [countryError, setCountryError] = useState("")
//   const [state, setState] = useState("")
//   const [stateError, setStateError] = useState("")
//   const [city, setCity] = useState("")
//   const [cityError, setCityError] = useState("")
//   const [role, setRole] = useState("")
//   const [roleError, setRoleError] = useState("")
//   const [roleList, setRoleList] = useState("")

//   const updateSidebar = () => {
//     setShowSidebar(!showSidebar);
//   };

//   const handleCancel = (e) => {
//     e.preventDefault();
//     // setFirstName("")
//     // setLastName("")
//     // setEmail("")
//     // setMobile("")
//     // setPass1("")
//     // setPass2("")
//     // setFirstNameError("")
//     // setLastNameError("")
//     // setEmailError("")
//     // setMobileError("")
//     // setPass1Error("")
//     // setPass2Error("")
//     // setCurrentImage("")
//     // setFormPic("")
//     navigate(`/retailer/user-role`);
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     setEmailError("");
//   };

//   const handleMobileChange = (e) => {
//     setMobile(e.target.value);
//     setMobileError("");
//   };
//   const handleStateChange = (e) => {
//     setState(e.target.value);
//     setStateError("");
//   };
//   const handleCityChange = (e) => {
//     setCity(e.target.value);
//     setCityError("");
//   };

//   const handlePass1Change = (e) => {
//     setPass1(e.target.value);
//     setPass1Error("");
//   };

//   const handlePass2Change = (e) => {
//     setPass2(e.target.value);
//     setPass2Error("");
//   };

//   const handleFirstNameChange = (e) => {
//     setFirstName(e.target.value);
//     setFirstNameError("");
//   };

//   const handleLastNameChange = (e) => {
//     setLastName(e.target.value);
//     setLastNameError("");
//   };
//   const handleStatus = (e) => {
//     if (e.target.checked) {
//       setStatus("1");
//     } else {
//       setStatus("0");
//     }
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setCurrentImage(URL.createObjectURL(e.target.files[0]));
//       setFormPic(e.target.files[0]);
//     }
//   };

//   const handleNext = (e) => {
//     e.preventDefault();
//     let pass1valid = true,
//       pass2valid = true,
//       emailvalid = true,
//       mobilevalid = true,
//       firstnamevalid = true,
//       addressValid = true,
//       countryValid = true,
//       roleValid = true,
//       lastnamevalid = true;

//     if (firstName === "") {
//       setFirstNameError("First Name is required");
//       firstnamevalid = false;
//     }

//     if (lastName === "") {
//       setLastNameError("Last name is required");
//       lastnamevalid = false;
//     }

//     if (pass1.length < 8) {
//       setPass1Error("Password should be of atleast 8 characters.");
//       pass1valid = false;
//     }

//     if (pass2.length < 8) {
//       setPass2Error("Password should be of atleast 8 characters.");
//       pass2valid = false;
//     } else if (pass2 !== pass1) {
//       setPass2Error("Passwords do not match.");
//       pass2valid = false;
//     }

//     if (!emailregex.test(email)) {
//       setEmailError("Not a valid E-Mail.");
//       emailvalid = false;
//     }

//     if (!mobileregex.test(mobile)) {
//       setMobileError("Not a valid phone number.");
//       mobilevalid = false;
//     }

//     if(address === ""){
//       setAddressError("Address is required.")
//       addressValid = false
//     }

//     if(country === ""){
//       setCountryError("Country is required.")
//       countryValid = false
//     }

//     // if(state === ""){
//     //   setStateError("State is required.")
//     //   stateValid = false
//     // }

//     // if(city === ""){
//     //   setCityError("City is required.")
//     //   cityValid = false
//     // }

//     if(role === ""){
//       setRoleError("Role selection is required.")
//       roleValid = false
//     }

//     if (
//       firstNameError !== "" ||
//       lastNameError !== "" ||
//       emailError !== "" ||
//       mobileError !== "" ||
//       pass1Error !== "" ||
//       pass2Error !== "" ||
//       firstnamevalid === false ||
//       lastnamevalid === false ||
//       emailvalid === false ||
//       pass1valid === false ||
//       pass2valid === false ||
//       mobilevalid === false ||
//       !countryValid ||
//       !addressValid ||
//       !roleValid
//     ) {
//       console.log("Validation Error");
//     } else {
//       let formdata = new FormData();
//       formdata.append("first_name", firstName);
//       formdata.append("last_name", lastName);
//       formdata.append("email", email);
//       formdata.append("password", pass2);
//       formdata.append("mobile", mobile);
//       formdata.append("is_enable", status);
//       formdata.append("role", role);
//       formdata.append("address", address)
//       formdata.append("country", country)
//       formdata.append("state", state)
//       formdata.append("city", city)
//       formdata.append("confirm_password", pass2)
//       if (formPic !== "") {
//         formdata.append("user_image", formPic);
//       }
//       {console.log(formdata,"formdataformdata11")}
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           permission: "user-edit",
//         },
//       };
//       console.log(formdata,"formdataformdata")
//       apis
//         .post("/retailer/addRetailerUser", formdata, config)
//         .then((res) => {
//           if (res.data.success === true) {
//             toast.success("User added successfully.", {
//               autoClose: 1000,
//               position: toast.POSITION.TOP_CENTER,
//             });
//             console.log(formdata,"formdataformdata")
//             navigate(
//               `/retailer/user-role`
//             );
//           } else {
//             toast.error(res.data.message, {
//               autoClose: 3000,
//               position: toast.POSITION.TOP_CENTER,
//             });
//           }
//         })
//         .catch((error) => {
//           if(error.message !== "revoke"){
//           if (error.response.data.data) {
//             if (error.response.data.data.email) {
//               setEmailError(error.response.data.data.email[0]);
//             }

//             if (error.response.data.data.phone_number) {
//               setMobileError(error.response.data.data.phone_number[0]);
//             }

//             if (error.response.data.data.first_name) {
//               setFirstNameError(error.response.data.data.first_name[0]);
//             }

//             if (error.response.data.data.last_name) {
//               setLastNameError(error.response.data.data.last_name[0]);
//             }
//           } else {
//             toast.error("Something went wrong. Please try again later.", {
//               autoClose: 3000,
//               position: toast.POSITION.TOP_CENTER,
//             });
//           }
//         }
//         });
//     }
//   };

//   useEffect(() => {
//     const config = {
//       headers : {
//         Authorization : `Bearer ${token}`,
//         permission : "role-view"
//       }
//     }

//     apis.get('/retailer/RetailerRoleList', config)
//     .then((res) => {
//       if(res.data.success === true){
//         setRoleList(res.data.data)
//       }
//       else{
//         toast.error("Something went wrong. Please try again later.", {autoClose: 3000,position: toast.POSITION.TOP_CENTER,});
//       }
//     })
//     .catch((error) => {
//       if(error.message !== "revoke"){
//       toast.error("Something went wrong. Please try again later.", {autoClose: 3000,position: toast.POSITION.TOP_CENTER,});
//   }})

//   }, [])

//   return (
//     <div class="container-fluid page-wrap add-supplier">
//       <div class="row height-inherit">
//         <Sidebar
//           showSidebar={showSidebar}
//           updateSidebar={updateSidebar}
//           userType={"retailer"}
//         />

//         <div class="col main p-0">
//           <Header title="Add Retailer" updateSidebar={updateSidebar} />
//           <div class="container-fluid page-content-box px-3 px-sm-4">
//             <div class="row">
//               <div class="col">
//                 <form>
//                   {/* [Card] */}
//                   <div className="card height-100">
//                     <div className="card-body">
//                       <div className="row">
//                         <div className="col-sm-4 mb-4 mb-sm-0">
//                           <div className="card shadow-none img-card h-100">
//                             <div className="card-body d-flex justify-content-center align-items-center">
//                               <div className="row">
//                                 <div className="col text-center d-flex flex-column justify-content-center align-items-center">
//                                   <div className="dp-img mb-4 mx-auto position-relative rounded-circle d-inline-flex">
//                                     <img
//                                       src={
//                                         currentImage === ""
//                                           ? dpImg
//                                           : currentImage
//                                       }
//                                       className="dp-img rounded-circle"
//                                     />
//                                     <label
//                                       htmlFor="profile_pic"
//                                       className="editImg rounded-circle bg-purple"
//                                       style={{ display: "block" }}
//                                     >
//                                       <img
//                                         src={editImg}
//                                         className="img-fluid"
//                                       />
//                                     </label>
//                                     <input
//                                       type="file"
//                                       accept="image/*"
//                                       name="profile_pic"
//                                       id="profile_pic"
//                                       style={{ display: "none" }}
//                                       onChange={handleImageChange}
//                                     ></input>
//                                   </div>
//                                   <div className="w-100 text-center">
//                                     <div class="form-check form-switch d-inline-flex align-items-center w-auto">
//                                       <input
//                                         class="form-check-input"
//                                         type="checkbox"
//                                         checked={status === "1" ? true : false}
//                                         onChange={(e) => handleStatus(e)}
//                                         role="switch"
//                                         id="flexSwitchCheck1"
//                                       />
//                                       <label
//                                         class="form-check-label ms-2"
//                                         for="flexSwitchCheck1"
//                                       >
//                                        {t("distributor.add_user.enable_user")}
//                                       </label>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="col-sm-8">
//                           <div className="card shadow-none img-card">
//                             <div className="card-body">
//                               <div className="row">
//                                 <div className="form-head w-100">
//                                 {t("distributor.add_user.profile_info")}
//                                 </div>
//                                 <div className="col-sm-6 mb-3">
//                                   <label className="form-label">
//                                   {t("distributor.add_user.first_name")}<sup>*</sup>
//                                   </label>
//                                   <input
//                                     type="text"
//                                     className="form-control"
//                                     value={firstName}
//                                     placeholder={t("distributor.add_user.enter_first_name")}
//                                     onChange={(e) => handleFirstNameChange(e)}
//                                   />
//                                   {firstNameError !== "" ? (
//                                     <p className="error-label">
//                                       {firstNameError}
//                                     </p>
//                                   ) : (
//                                     <></>
//                                   )}
//                                 </div>
//                                 <div className="col-sm-6 mb-3">
//                                   <label className="form-label">
//                                   {t("distributor.add_user.last_name")}<sup>*</sup>
//                                   </label>
//                                   <input
//                                     type="text"
//                                     className="form-control"
//                                     value={lastName}
//                                     placeholder={t("distributor.add_user.enter_last_name")}
//                                     onChange={(e) => handleLastNameChange(e)}
//                                   />
//                                   {lastNameError !== "" ? (
//                                     <p className="error-label">
//                                       {lastNameError}
//                                     </p>
//                                   ) : (
//                                     <></>
//                                   )}
//                                 </div>
//                                 <div className="col-sm-6 mb-3">
//                                   <label className="form-label">
//                                   {t("distributor.add_user.address")}<sup>*</sup>
//                                   </label>
//                                   <input
//                                     type="text"
//                                     className="form-control"
//                                     value={address}
//                                     placeholder={t("distributor.add_user.enter_address")}
//                                     onChange={(e) => {setAddress(e.target.value); setAddressError("")}}
//                                   />
//                                   {addressError !== "" ? (
//                                     <p className="error-label">
//                                       {addressError}
//                                     </p>
//                                   ) : (
//                                     <></>
//                                   )}
//                                 </div>
//                                 <div className="col-sm-6 mb-3">
//                                   <label className="form-label">
//                                   {t("distributor.add_user.country")}<sup>*</sup>
//                                   </label>
//                                   <input
//                                     type="text"
//                                     className="form-control"
//                                     value={country}
//                                     placeholder={t("distributor.add_user.enter_country")}
//                                     onChange={(e) => {setCountry(e.target.value); setCountryError("")}}
//                                   />
//                                   {countryError !== "" ? (
//                                     <p className="error-label">
//                                       {countryError}
//                                     </p>
//                                   ) : (
//                                     <></>
//                                   )}
//                                 </div>
//                               </div>
//                               {/* sdvfbdvb */}
//                               <div className="row">
//                               <div className="col-sm-6 mb-3">
//                                   <label className="form-label">
//                                   {t("distributor.add_user.state")}<sup>*</sup>
//                                   </label>
//                                   <input
//                                     type="text"
//                                     className="form-control"
//                                     value={state}
//                                     placeholder={t("distributor.add_user.enter_state")}
//                                     onChange={(e)=>handleStateChange(e)}
//                                   />
//                                   {stateError !== "" ? (
//                                     <p className="error-label">
//                                       {stateError}
//                                     </p>
//                                   ) : (
//                                     <></>
//                                   )}
//                                 </div>
//                                 <div className="col-sm-6 mb-3">
//                                   <label className="form-label">
//                                   {t("distributor.add_user.city")}<sup>*</sup>
//                                   </label>
//                                   <input
//                                     type="text"
//                                     className="form-control"
//                                     value={city}
//                                     placeholder={t("distributor.add_user.enter_city")}
//                                     onChange={(e) => handleCityChange(e)}
//                                     // onChange={(e) => {setCity(e.target.value); setCityError("")}}
//                                   />
//                                   {cityError !== "" ? (
//                                     <p className="error-label">
//                                       {cityError}
//                                     </p>
//                                   ) : (
//                                     <></>
//                                   )}
//                                 </div>
//                                 </div>
//                               <div className="row">
//                                 <div className="col-sm-6 mb-3">
//                                   <label className="form-label">
//                                     Email<sup>*</sup>
//                                   </label>
//                                   <input
//                                     type="email"
//                                     className="form-control"
//                                     value={email}
//                                     placeholder={t("distributor.add_user.enter_email")}
//                                     onChange={(e) => handleEmailChange(e)}
//                                     id="myInput"
//                                   />
//                                   {emailError !== "" ? (
//                                     <p className="error-label">{emailError}</p>
//                                   ) : (
//                                     <></>
//                                   )}
//                                 </div>
//                                 <div className="col-sm-6 mb-3">
//                                   <label className="form-label">
//                                   {t("distributor.add_user.mobile_number")}<sup>*</sup>
//                                   </label>
//                                   <input
//                                     type="text"
//                                     className="form-control"
//                                     value={mobile}
//                                     placeholder={t("distributor.add_user.enter_mobile_no")}
//                                     onChange={(e) => handleMobileChange(e)}
//                                     // onChange={(e) => {setMobile(e.target.value); setMobileError("")}}
//                                     // autoComplete="new-password"
//                                     // id="myInput"
//                                   />
//                                   {mobileError !== "" ? (
//                                     <p className="error-label">{mobileError}</p>
//                                   ) : (
//                                     <></>
//                                   )}
//                                 </div>
//                               </div>
//                               <div className="row">
//                                 <div className="col-sm-6 mb-3">
//                                   <label className="form-label">
//                                   {t("distributor.add_user.create_pass")}<sup>*</sup>
//                                   </label>
//                                   <div className="position-relative">
//                                     <input
//                                       type={showPass1 ? "text" : "password"}
//                                       className="form-control"
//                                       value={pass1}
//                                       onChange={(e) => handlePass1Change(e)}
//                                       placeholder={t("distributor.add_user.enter_password")}
//                                     />
//                                     <span
//                                       className={
//                                         showPass1
//                                           ? "form-field-icon icon-toggle active"
//                                           : "form-field-icon icon-toggle"
//                                       }
//                                       onClick={() => setShowPass1(!showPass1)}
//                                     ></span>
//                                   </div>

//                                   {pass1Error !== "" ? (
//                                     <p className="error-label">{pass1Error}</p>
//                                   ) : (
//                                     <></>
//                                   )}
//                                 </div>
//                                 <div className="col-sm-6 mb-3 position-relative">
//                                   <label className="form-label">
//                                   {t("distributor.add_user.confirm_pass")}<sup>*</sup>
//                                   </label>
//                                   <div className="position-relative">
//                                     <input
//                                       type={showPass2 ? "text" : "password"}
//                                       className="form-control"
//                                       value={pass2}
//                                       onChange={(e) => handlePass2Change(e)}
//                                       placeholder={t("distributor.add_user.enter_confirm_pass")}
//                                     />
//                                     <span
//                                       className={
//                                         showPass2
//                                           ? "form-field-icon icon-toggle active"
//                                           : "form-field-icon icon-toggle"
//                                       }
//                                       onClick={() => setShowPass2(!showPass2)}
//                                     ></span>
//                                   </div>

//                                   {pass2Error !== "" ? (
//                                     <p className="error-label">{pass2Error}</p>
//                                   ) : (
//                                     <></>
//                                   )}
//                                 </div>
//                               </div>
//                               <div className="row">
//                                 <div className="col-sm-6 mb-3">
//                                   <label className="form-label">
//                                   {t("distributor.add_user.role")}<sup>*</sup>
//                                   </label>
//                                   <select className="form-select" value={role} onChange={(e) => {setRole(e.target.value); setRoleError("")}}>
//                                     <option value={""}>{t("distributor.add_user.select_role")}</option>
//                                     {
//                                       roleList && roleList.length > 0 ?
//                                       roleList.map((ele) => {
//                                         return (
//                                           <option value={ele.id}>{ele.name}</option>
//                                         )
//                                       })
//                                       :
//                                       <></>
//                                     }
//                                   </select>
//                                   {roleError !== "" ? (
//                                     <p className="error-label">{roleError}</p>
//                                   ) : (
//                                     <></>
//                                   )}
//                                 </div>
                              
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   {/* [/Card] */}
//                   <div className="row mt-4">
//                     <div className="col">
//                       <button
//                         type="button"
//                         className="btn btn-outline-black me-3"
//                         onClick={(e) => handleCancel(e)}
//                       >
//                         {t("distributor.add_user.cancel")}
//                       </button>
//                       <button
//                         type="button"
//                         className="btn btn-purple"
//                         onClick={(e) => handleNext(e)}
//                       >
//                         {t("distributor.add_user.next")}
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DistributorAddUsersRoles;
