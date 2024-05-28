// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
// import Header from "../../../CommonComponents/Header/header";
// import editImg from "../../assets/images/edit.svg";
// import dpImg from "../../assets/images/userDefault.png";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import useAuthInterceptor from "../../../utils/apis";
// import { useTranslation } from "react-i18next";
// //{t("retailer.profile.address")}
// const EditProfile = () => {
//   const navigate = useNavigate();
//   const { t, i18n } = useTranslation();
//   const apis = useAuthInterceptor();
//   const retailer_accessToken = localStorage.getItem("retailer_accessToken");
//   // let mobileregex = /^\d{10}$/;
//   const { id } = useParams();
//   let emailregex =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     const phoneRegex = [
//       /^(\+\d{1,3}\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/     // 4502589632 format
//       , /^\+\d{1}\s\(\d{3}\)\s\d{3}-\d{3}-\d{4}$/ // +1 (514) 526-258-6987 format
//       ,/^\+\d{1}\(\d{3}\)\d{3}-\d{3}-\d{4}$/        // +1(514)526-258-6987 format
//     ];
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
//     navigate("/retailer/my-account");
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
//       setFirstNameError(t("retailer.profile.first_name_required"));
//       firstnamevalid = false;
//     }//(t("retailer.profile.first_name_required"));

//     if (lastName === "" || lastName === null) {
//       setLastNameError(t("retailer.profile.last_name_required"));
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
//       setEmailError(t("retailer.profile.not_a_valid_email"));
//       emailvalid = false;
//     }

//     const isValidPhoneNumber = (publicMobile) => {
//       return phoneRegex.some(regex => regex.test(publicMobile));
//     };
//     if (!isValidPhoneNumber(mobile)) {
//       setMobileError(t("retailer.profile.not_a_valid_number"));
//       mobilevalid = false;
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

//         const config = {
//           headers: {
//             Authorization: `Bearer ${retailer_accessToken}`,
//           },
//         };

//         apis
//           .post(`/retailer/editRetailerInfo`, formdata, config)
//           .then((res) => {
//             if (res.data.success === true) {
//               toast.success("Your profile has been updated successfully.", {
//                 autoClose: 3000,
//                 position: toast.POSITION.TOP_CENTER,
//               });
//               // localStorage.setItem("userImg",res)
//               navigate(`/retailer/my-account`);
//             } else {
//               toast.error("Something went wrong. Please try again later.", {
//                 autoClose: 3000,
//                 position: toast.POSITION.TOP_CENTER,
//               });
//             }
//           })
//           .catch((error) => {
//             if(error.message !== "revoke"){
//             if (error.response.data.data) {
//               if (error.response.data.data.email) {
//                 setEmailError(error.response.data.data.email[0]);
//               }

//               if (error.response.data.data.phone_number) {
//                 setMobileError(error.response.data.data.phone_number[0]);
//               }

//               if (error.response.data.data.first_name) {
//                 setFirstNameError(error.response.data.data.first_name[0]);
//               }

//               if (error.response.data.data.last_name) {
//                 setLastNameError(error.response.data.data.last_name[0]);
//               }
//             } else {
//               toast.error("Something went wrong. Please try again later.", {
//                 autoClose: 3000,
//                 position: toast.POSITION.TOP_CENTER,
//               });
//             }
//           }
//           });
//       }
//       // else {
//       //   navigate(`/supplier-management/supplier-edit-general-info/${id}`)
//       // }
//     }
//   };

//   useEffect(() => {
//     console.log(retailer_accessToken);
//     const config = {
//       headers: {
//         Authorization: `Bearer ${retailer_accessToken}`,
//       },
//     };
//     apis
//       .get("retailer/getRetailerData", config)
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
//         toast.error("Something went Wrong !! Please try again Later", {
//           autoClose: 3000,
//           position: toast.POSITION.TOP_CENTER,
//         });
//       }
//       });
//   }, []);
//   return (
//     <div class="container-fluid page-wrap add-supplier">
//       <div class="row height-inherit">
//         <Sidebar userType={"retailer"} />

//         <div class="col main p-0">
//           <Header title="Edit Retailer" updateSidebar={updateSidebar} />
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
//                                 {t("retailer.edit_profile.profile_info")}
//                                 </div>
//                                 <div className="col-sm-6 mb-3">
//                                   <label className="form-label">
//                                   {t("retailer.edit_profile.first_name")} <sup>*</sup>
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
//                                   {t("retailer.edit_profile.last_name")}<sup>*</sup>
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
//                                   {t("retailer.edit_profile.email_address")} <sup>*</sup>
//                                   </label>
//                                   <input
//                                     type="email"
//                                     className="form-control"
//                                     value={email}
//                                     placeholder="Enter email"
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
//                                   {t("retailer.edit_profile.phone_number")}<sup>*</sup>
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
//                         {t("retailer.edit_profile.cancel")}
//                       </button>
//                       <button
//                         className="btn btn-purple"
//                         onClick={(e) => handleSubmit(e)}
//                       >
//                         {t("retailer.edit_profile.save")}
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
import { useTranslation } from "react-i18next";
//{t("retailer.profile.address")}
const EditProfile = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const apis = useAuthInterceptor();
  const retailer_accessToken = localStorage.getItem("retailer_accessToken");
  let mobileregex = /^\d{10}$/;
  const { id } = useParams();
  let emailregex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegex = [
      /^(\+\d{1,3}\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/     // 4502589632 format
      , /^\+\d{1}\s\(\d{3}\)\s\d{3}-\d{3}-\d{4}$/ // +1 (514) 526-258-6987 format
      ,/^\+\d{1}\(\d{3}\)\d{3}-\d{3}-\d{4}$/        // +1(514)526-258-6987 format
    ];
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

  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/retailer/my-account");
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
      setFirstNameError(t("retailer.profile.first_name_required"));
      firstnamevalid = false;
    }//(t("retailer.profile.first_name_required"));

    if (lastName === "" || lastName === null) {
      setLastNameError(t("retailer.profile.last_name_required"));
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
      setEmailError(t("retailer.profile.not_a_valid_email"));
      emailvalid = false;
    }
    const isValidPhoneNumber = (publicMobile) => {
      return phoneRegex.some(regex => regex.test(publicMobile));
    };
    if (!isValidPhoneNumber(mobile)) {
      setMobileError(t("retailer.profile.not_a_valid_number"));
      mobilevalid = false;
    }
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

        const config = {
          headers: {
            Authorization: `Bearer ${retailer_accessToken}`,
          },
        };

        apis
          .post(`/retailer/editRetailerInfo`, formdata, config)
          .then((res) => {
            if (res.data.success === true) {
              toast.success("Your profile has been updated successfully.", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              });
              // localStorage.setItem("userImg",res)
              navigate(`/retailer/my-account`);
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
    console.log(retailer_accessToken);
    const config = {
      headers: {
        Authorization: `Bearer ${retailer_accessToken}`,
      },
    };
    apis
      .get("retailer/getRetailerData", config)
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
        <Sidebar userType={"retailer"} />

        <div class="col main p-0">
          <Header title={t("retailer.edit_profile.edit_retailer")} updateSidebar={updateSidebar} />
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
                                          ? dpImg
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
                                {t("retailer.edit_profile.profile_info")}
                                </div>
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                  {t("retailer.edit_profile.first_name")} <sup>*</sup>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={firstName}
                                    placeholder={t("retailer.edit_profile.efn")} 
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
                                  {t("retailer.edit_profile.last_name")}<sup>*</sup>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={lastName}
                                    placeholder={t("retailer.edit_profile.eln")} 
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
                                  {t("retailer.edit_profile.email_address")} <sup>*</sup>
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    placeholder={t("retailer.edit_profile.em")} 
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
                                  {t("retailer.edit_profile.phone_number")}<sup>*</sup>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={mobile}
                                    placeholder={t("retailer.edit_profile.emn")} 
                                    onChange={(e) => handleMobileChange(e)}
                                  />
                                  {mobileError !== "" ? (
                                    <p className="error-label">{mobileError}</p>
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
                        {t("retailer.edit_profile.cancel")}
                      </button>
                      <button
                        className="btn btn-purple"
                        onClick={(e) => handleSubmit(e)}
                      >
                        {t("retailer.edit_profile.save")}
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