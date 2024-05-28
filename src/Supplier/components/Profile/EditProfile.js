// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
// import Header from "../../../CommonComponents/Header/header";
// import editImg from "../../assets/images/edit.svg";
// import dpImg from "../../assets/images/userDefault.png";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import useAuthInterceptor from "../../../utils/apis";
// import ProfileImg from "../../assets/images/userDefault.png";

// const EditProfile = () => {
//   const apis = useAuthInterceptor();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("supplier_accessToken");
//   let mobileregex = /^\d{10}$/;
//   let emailregex =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [formData, setFormData] = useState("");
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
//   const [pic, setPic] = useState("");
//   const [currentImage, setCurrentImage] = useState("");
//   const [formPic, setFormPic] = useState("");

//   const updateSidebar = () => {
//     setShowSidebar(!showSidebar);
//   };

//   const handleCancel = (e) => {
//     e.preventDefault();
//     navigate("/supplier/my-account");
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     setEmailError("");
//   };

//   const handleMobileChange = (e) => {
//     setMobile(e.target.value);
//     setMobileError("");
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
//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setCurrentImage(URL.createObjectURL(e.target.files[0]));
//       setFormPic(e.target.files[0]);
//     }
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let pass1valid = true,
//       pass2valid = true,
//       emailvalid = true,
//       mobilevalid = true,
//       firstnamevalid = true,
//       lastnamevalid = true;
//     if (firstName === "" || firstName === null) {
//       setFirstNameError("First Name is required");
//       firstnamevalid = false;
//     }

//     if (lastName === "" || lastName === null) {
//       setLastNameError("Last name is required");
//       lastnamevalid = false;
//     }

//     if (pass1.length < 8 && pass1 !== "") {
//       setPass1Error("Password should be of atleast 8 characters.");
//       pass1valid = false;
//     }
//     if (pass2.length < 8 && pass2 !== "") {
//       setPass2Error("Password should be of atleast 8 characters.");
//       pass2valid = false;
//     } else if (pass2 !== pass1 && pass2 !== "") {
//       setPass2Error("Passwords do not match.");
//       pass2valid = false;
//     } else if (pass1 !== "" && pass2 === "") {
//       setPass2Error("Please confirm the password.");
//       pass2valid = false;
//     }
//     if (!emailregex.test(email)) {
//       setEmailError("Not a valid E-Mail.");
//       emailvalid = false;
//     }

//     // if (!mobileregex.test(mobile)) {
//     //   setMobileError("Not a valid phone number.");
//     //   mobilevalid = false;
//     // }
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
//       mobilevalid === false
//     ) {
//       console.log("Validation Error");
//     } else {
//       if (
//         formData.first_name !== firstName ||
//         formData.last_name !== lastName ||
//         formData.email !== email ||
//         formData.phone_number !== mobile ||
//         pass2 !== "" ||
//         formPic !== ""
//       ) {
//         let formdata = new FormData();
//         formdata.append("first_name", firstName);
//         formdata.append("last_name", lastName);
//         formdata.append("email", email);
//         formdata.append("phone_number", mobile);
//         formdata.append("status", "1");
//         if (formPic !== "") {
//           formdata.append("user_image", formPic);
//         }
//         if (pass2 !== "") {
//           formdata.append("password", pass2);
//         }

//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };

//         apis
//           .post(`/supplier/editSupplierInfo`, formdata, config)
//           .then((res) => {
//             if (res.data.success === true) {
//               toast.success("Your Profile has been updated successfully", {
//                 autoClose: 3000,
//                 position: toast.POSITION.TOP_CENTER,
//               });
//               navigate(`/supplier/my-account`);
//             } else {
//               toast.error("Something went wrong. Please try again later.", {
//                 autoClose: 3000,
//                 position: toast.POSITION.TOP_CENTER,
//               });
//             }
//           })
//           .catch((error) => {
//             if(error.message !== "revoke"){
//               if (error.response.data.data) {
//                 if (error.response.data.data.email) {
//                   setEmailError(error.response.data.data.email[0]);
//                 }
  
//                 if (error.response.data.data.phone_number) {
//                   setMobileError(error.response.data.data.phone_number[0]);
//                 }
  
//                 if (error.response.data.data.first_name) {
//                   setFirstNameError(error.response.data.data.first_name[0]);
//                 }
  
//                 if (error.response.data.data.last_name) {
//                   setLastNameError(error.response.data.data.last_name[0]);
//                 }
//               } else {
//                 toast.error("Something went wrong. Please try again later.", {
//                   autoClose: 3000,
//                   position: toast.POSITION.TOP_CENTER,
//                 });
//               }
//             }
            
//           });
//       }
//       // else {
//       //   navigate(`/supplier-management/supplier-edit-general-info/${id}`)
//       // }
//     }
//   };

//   useEffect(() => {
//     console.log(token);
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     apis
//       .get("supplier/getSupplierData", config)
//       .then((res) => {
//         const retailer = res.data.data;
//         setFirstName(retailer.first_name);
//         setLastName(retailer.last_name);
//         setEmail(retailer.email);
//         setMobile(retailer.phone_number);
//         setCurrentImage(retailer.user_image);

//         console.log(retailer);
//       })
//       .catch((err) => {
//         if(err.message !== "revoke"){
//           toast.error("Something went Wrong !! Please try again Later", {
//             autoClose: 3000,
//             position: toast.POSITION.TOP_CENTER,
//           });
//         }
//       });
//   }, []);
//   return (
//     <div class="container-fluid page-wrap add-supplier">
//       <div class="row height-inherit">
//         <Sidebar
//           showSidebar={showSidebar}
//           updateSidebar={updateSidebar}
//           userType={"supplier"}
//         />

//         <div class="col main p-0">
//           <Header title="Edit Profile" updateSidebar={updateSidebar} />
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
//                                         currentImage === "" ||
//                                         currentImage === null
//                                           ? ProfileImg
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
//                                       name=" profile_pic"
//                                       id="profile_pic"
//                                       style={{ display: "none" }}
//                                       onChange={handleImageChange}
//                                     ></input>
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
//                                   Profile info.
//                                 </div>
//                                 <div className="col-sm-6 mb-3">
//                                   <label className="form-label">
//                                     First Name<sup>*</sup>
//                                   </label>
//                                   <input
//                                     type="text"
//                                     className="form-control"
//                                     value={firstName}
//                                     placeholder="Enter first name"
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
//                                     Last Name<sup>*</sup>
//                                   </label>
//                                   <input
//                                     type="text"
//                                     className="form-control"
//                                     value={lastName}
//                                     placeholder="Enter last name"
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
//                               </div>
//                               <div className="row">
//                                 <div className="col-sm-6 mb-3">
//                                   <label className="form-label">
//                                     Email<sup>*</sup>
//                                   </label>
//                                   <input
//                                     type="email"
//                                     className="form-control"
//                                     value={email}
//                                     placeholder="Enter mail"
//                                     onChange={(e) => handleEmailChange(e)}
//                                   />
//                                   {emailError !== "" ? (
//                                     <p className="error-label">{emailError}</p>
//                                   ) : (
//                                     <></>
//                                   )}
//                                 </div>
//                                 <div className="col-sm-6 mb-3">
//                                   <label className="form-label">
//                                     Mobile number<sup>*</sup>
//                                   </label>
//                                   <input
//                                     type="text"
//                                     className="form-control"
//                                     value={mobile}
//                                     placeholder="Enter mobile No."
//                                     onChange={(e) => handleMobileChange(e)}
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
//                                     Create New Password
//                                   </label>
//                                   <div className="position-relative">
//                                     <input
//                                       type={showPass1 ? "text" : "password"}
//                                       className="form-control"
//                                       value={pass1}
//                                       onChange={(e) => handlePass1Change(e)}
//                                       placeholder="Enter password"
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
//                                     Confirm New Password
//                                   </label>
//                                   <div className="position-relative">
//                                     <input
//                                       type={showPass2 ? "text" : "password"}
//                                       className="form-control"
//                                       value={pass2}
//                                       onChange={(e) => handlePass2Change(e)}
//                                       placeholder="Confirm password"
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
//                         className="btn btn-outline-black me-3"
//                         onClick={(e) => handleCancel(e)}
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         className="btn btn-purple"
//                         onClick={(e) => handleSubmit(e)}
//                       >
//                         Save
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

// export default EditProfile;


import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import editImg from "../../assets/images/edit.svg";
import dpImg from "../../assets/images/userDefault.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthInterceptor from "../../../utils/apis";
import ProfileImg from "../../assets/images/userDefault.png";
import { useTranslation } from "react-i18next";

const EditProfile = () => {
  const apis = useAuthInterceptor();
  const navigate = useNavigate();
  const token = localStorage.getItem("supplier_accessToken");
  let mobileregex = /^\d{10}$/;
  let emailregex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [showSidebar, setShowSidebar] = useState(false);
  const [formData, setFormData] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass1Error, setPass1Error] = useState("");
  const [pass2, setPass2] = useState("");
  const [pass2Error, setPass2Error] = useState("");
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [pic, setPic] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [formPic, setFormPic] = useState("");
  const { t } = useTranslation();
  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/supplier/my-account");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
    setMobileError("");
  };

  const handlePass1Change = (e) => {
    setPass1(e.target.value);
    setPass1Error("");
  };

  const handlePass2Change = (e) => {
    setPass2(e.target.value);
    setPass2Error("");
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setFirstNameError("");
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setLastNameError("");
  };
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCurrentImage(URL.createObjectURL(e.target.files[0]));
      setFormPic(e.target.files[0]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let pass1valid = true,
      pass2valid = true,
      emailvalid = true,
      mobilevalid = true,
      firstnamevalid = true,
      lastnamevalid = true;
    if (firstName === "" || firstName === null) {
      setFirstNameError("First Name is required");
      firstnamevalid = false;
    }

    if (lastName === "" || lastName === null) {
      setLastNameError("Last name is required");
      lastnamevalid = false;
    }

    if (pass1.length < 8 && pass1 !== "") {
      setPass1Error("Password should be of atleast 8 characters.");
      pass1valid = false;
    }
    if (pass2.length < 8 && pass2 !== "") {
      setPass2Error("Password should be of atleast 8 characters.");
      pass2valid = false;
    } else if (pass2 !== pass1 && pass2 !== "") {
      setPass2Error("Passwords do not match.");
      pass2valid = false;
    } else if (pass1 !== "" && pass2 === "") {
      setPass2Error("Please confirm the password.");
      pass2valid = false;
    }
    if (!emailregex.test(email)) {
      setEmailError("Not a valid E-Mail.");
      emailvalid = false;
    }

    // if (!mobileregex.test(mobile)) {
    //   setMobileError("Not a valid phone number.");
    //   mobilevalid = false;
    // }
    if (
      firstNameError !== "" ||
      lastNameError !== "" ||
      emailError !== "" ||
      mobileError !== "" ||
      pass1Error !== "" ||
      pass2Error !== "" ||
      firstnamevalid === false ||
      lastnamevalid === false ||
      emailvalid === false ||
      pass1valid === false ||
      pass2valid === false ||
      mobilevalid === false
    ) {
      console.log("Validation Error");
    } else {
      if (
        formData.first_name !== firstName ||
        formData.last_name !== lastName ||
        formData.email !== email ||
        formData.phone_number !== mobile ||
        pass2 !== "" ||
        formPic !== ""
      ) {
        let formdata = new FormData();
        formdata.append("first_name", firstName);
        formdata.append("last_name", lastName);
        formdata.append("email", email);
        formdata.append("phone_number", mobile);
        formdata.append("status", "1");
        if (formPic !== "") {
          formdata.append("user_image", formPic);
        }
        if (pass2 !== "") {
          formdata.append("password", pass2);
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        apis
          .post(`/supplier/editSupplierInfo`, formdata, config)
          .then((res) => {
            if (res.data.success === true) {
              toast.success("Your Profile has been updated successfully", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              });
              navigate(`/supplier/my-account`);
            } else {
              toast.error("Something went wrong. Please try again later.", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              });
            }
          })
          .catch((error) => {
            if(error.message !== "revoke"){
              if (error.response.data.data) {
                if (error.response.data.data.email) {
                  setEmailError(error.response.data.data.email[0]);
                }
  
                if (error.response.data.data.phone_number) {
                  setMobileError(error.response.data.data.phone_number[0]);
                }
  
                if (error.response.data.data.first_name) {
                  setFirstNameError(error.response.data.data.first_name[0]);
                }
  
                if (error.response.data.data.last_name) {
                  setLastNameError(error.response.data.data.last_name[0]);
                }
              } else {
                toast.error("Something went wrong. Please try again later.", {
                  autoClose: 3000,
                  position: toast.POSITION.TOP_CENTER,
                });
              }
            }
            
          });
      }
      // else {
      //   navigate(`/supplier-management/supplier-edit-general-info/${id}`)
      // }
    }
  };

  useEffect(() => {
    console.log(token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    apis
      .get("supplier/getSupplierData", config)
      .then((res) => {
        const retailer = res.data.data;
        setFirstName(retailer.first_name);
        setLastName(retailer.last_name);
        setEmail(retailer.email);
        setMobile(retailer.phone_number);
        setCurrentImage(retailer.user_image);

        console.log(retailer);
      })
      .catch((err) => {
        if(err.message !== "revoke"){
          toast.error("Something went Wrong !! Please try again Later", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  }, []);
  return (
    <div class="container-fluid page-wrap add-supplier">
      <div class="row height-inherit">
        <Sidebar
          showSidebar={showSidebar}
          updateSidebar={updateSidebar}
          userType={"supplier"}
        />

        <div class="col main p-0">
          <Header title="Edit Profile" updateSidebar={updateSidebar} />
          <div class="container-fluid page-content-box px-3 px-sm-4">
            <div class="row">
              <div class="col">
                <form>
                  {/* [Card] */}
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
                                        currentImage === "" ||
                                        currentImage === null
                                          ? ProfileImg
                                          : currentImage
                                      }
                                      className="dp-img rounded-circle"
                                    />
                                    <label
                                      htmlFor="profile_pic"
                                      className="editImg rounded-circle bg-purple"
                                      style={{ display: "block" }}
                                    >
                                      <img
                                        src={editImg}
                                        className="img-fluid"
                                      />
                                    </label>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      name=" profile_pic"
                                      id="profile_pic"
                                      style={{ display: "none" }}
                                      onChange={handleImageChange}
                                    ></input>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-8">
                          <div className="card shadow-none img-card">
                            <div className="card-body">
                              <div className="row">
                                <div className="form-head w-100">
                                {t("supplier.my_account_view.Profile_Info.profile_info")}
                                </div>
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                  {t("supplier.my_account_view.Profile_Info.first_name")}<sup>*</sup>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={firstName}
                                    placeholder={t("supplier.my_account_edit.efn")}
                                    onChange={(e) => handleFirstNameChange(e)}
                                  />
                                  {firstNameError !== "" ? (
                                    <p className="error-label">
                                      {firstNameError}
                                    </p>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                  {t("supplier.my_account_view.Profile_Info.last_name")}<sup>*</sup>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={lastName}
                                    placeholder={t("supplier.my_account_edit.eln")}
                                    onChange={(e) => handleLastNameChange(e)}
                                  />
                                  {lastNameError !== "" ? (
                                    <p className="error-label">
                                      {lastNameError}
                                    </p>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                  {t("supplier.my_account_view.Profile_Info.email_address")}<sup>*</sup>
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    placeholder={t("supplier.my_account_edit.em")}
                                    onChange={(e) => handleEmailChange(e)}
                                  />
                                  {emailError !== "" ? (
                                    <p className="error-label">{emailError}</p>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                  {t("supplier.my_account_edit.mobile_no")}<sup>*</sup>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={mobile}
                                    placeholder={t("supplier.my_account_edit.emn")}
                                    onChange={(e) => handleMobileChange(e)}
                                  />
                                  {mobileError !== "" ? (
                                    <p className="error-label">{mobileError}</p>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                  {t("supplier.my_account_edit.create_new_pass")}
                                  </label>
                                  <div className="position-relative">
                                    <input
                                      type={showPass1 ? "text" : "password"}
                                      className="form-control"
                                      value={pass1}
                                      onChange={(e) => handlePass1Change(e)}
                                      placeholder={t("supplier.my_account_edit.ep")}
                                    />
                                    <span
                                      className={
                                        showPass1
                                          ? "form-field-icon icon-toggle active"
                                          : "form-field-icon icon-toggle"
                                      }
                                      onClick={() => setShowPass1(!showPass1)}
                                    ></span>
                                  </div>

                                  {pass1Error !== "" ? (
                                    <p className="error-label">{pass1Error}</p>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div className="col-sm-6 mb-3 position-relative">
                                  <label className="form-label">
                                  {t("supplier.my_account_edit.confirm_pass")}
                                  </label>
                                  <div className="position-relative">
                                    <input
                                      type={showPass2 ? "text" : "password"}
                                      className="form-control"
                                      value={pass2}
                                      onChange={(e) => handlePass2Change(e)}
                                      placeholder={t("supplier.my_account_edit.cf")}
                                    />
                                    <span
                                      className={
                                        showPass2
                                          ? "form-field-icon icon-toggle active"
                                          : "form-field-icon icon-toggle"
                                      }
                                      onClick={() => setShowPass2(!showPass2)}
                                    ></span>
                                  </div>

                                  {pass2Error !== "" ? (
                                    <p className="error-label">{pass2Error}</p>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* [/Card] */}
                  <div className="row mt-4">
                    <div className="col">
                      <button
                        className="btn btn-outline-black me-3"
                        onClick={(e) => handleCancel(e)}
                      >
                        {t("supplier.my_account_edit.cancel-btn")}
                      </button>
                      <button
                        className="btn btn-purple"
                        onClick={(e) => handleSubmit(e)}
                      >
                        {t("supplier.my_account_edit.save-btn")}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
