// import React, { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// // import { canvasPreview } from "./cropper/canvasPreview";
// // import { canvasPreviewProduct } from "./cropper/imgPreview";
// import { Modal } from "react-bootstrap";
// // import { useDebounceEffect } from "./cropper/useDebounceEffect";
// // import ReactCrop, {
// //   centerCrop,
// //   makeAspectCrop,
// //   Crop,
// //   PixelCrop,
// // } from "react-image-crop";
// import { toast } from "react-toastify";
// import { useTranslation } from "react-i18next";
// import editImg from "../../assets/images/upload.png";
// import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
// import Header from "../../../CommonComponents/Header/header";
// import "react-toastify/dist/ReactToastify.css";
// import "../../assets/scss/dashboard.scss";
// import useAuthInterceptor from "../../../utils/apis";
// import noImage from "../../assets/images/no-image.png";

// toast.configure();

// // function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
// //   return centerCrop(
// //     makeAspectCrop(
// //       {
// //         unit: "px",
// //         width: 500,
// //       },
// //       aspect,
// //       mediaWidth,
// //       mediaHeight
// //     ),
// //     mediaWidth,
// //     mediaHeight
// //   );
// // }

// const EditProduct = () => {
//   const numberRegEx = /^\d*\.?\d*$/
//   const { t, i18n } = useTranslation();
//   const apis = useAuthInterceptor();
//   const token = localStorage.getItem("supplier_accessToken");
//   const { product_id } = useParams();
//   const navigate = useNavigate();
//   const [productName, setProductName] = useState("");
//   const [productNameError, setProductNameError] = useState("");
//   const [description, setDescription] = useState("");
//   const [descriptionErr, setDescriptionErr] = useState("");
//   const [publicDescription, setPublicDescription] = useState("");
//   const [publicDescriptionErr, setPublicDescriptionErr] = useState("");
//   const [lowbla, setLowbla] = useState("");
//   const [lowblaError, setLowblaError] = useState("");
//   const [showbay, setShowbay] = useState("");
//   const [showbayError, setShowbayError] = useState("");
//   const [metro, setMetro] = useState("");
//   const [metroError, setMetroError] = useState("");
//   const [alcohol, setAlcohol] = useState("");
//   const [alcoholError, setAlcoholError] = useState("");
//   const [stylesList, setStylesList] = useState("");
//   const [subCatList, setSubCatList] = useState("");
//   const [formatList, setFormatList] = useState("");
//   const [selectedFormat, setSelectedFormat] = useState("");
//   const [formatError, setFormatError] = useState("");
//   const [selectedSubCat, setSelectedSubCat] = useState("");
//   const [subCatError, setSubCatError] = useState("");
//   const [selectedStyle, setSelectedStyle] = useState("");
//   const [styleError, setStyleError] = useState("");
//   const [formPic, setFormPic] = useState("");
//   const [formPicProduct, setFormPicProduct] = useState("");
//   const [organic, setOrganic] = useState("");
//   const [show, setShow] = useState(false);
//   const [show2, setShow2] = useState(false);
//   const [imageError, setImageError] = useState("");
//   const [imageProductError, setImageProductError] = useState("");
//   const [currentImage, setCurrentImage] = useState("")
//   const [currentImageProduct, setCurrentImageProduct] = useState("")
//   const [currentCode, setCurrentCode] = useState("");
//   const [codePic, setCodePic] = useState("");
//   const [codeError, setCodedError] = useState("");
//   // const previewCanvasRef = useRef(null);
//   // const previewCanvasRefProduct = useRef(null);
//   // const [completedCrop, setCompletedCrop] = useState("");
//   // const [completedCropProduct, setCompletedCropProduct] = useState("");
//   // const [crop, setCrop] = useState({
//   //   unit: "px", // Can be 'px' or '%'
//   //   x: 25,
//   //   y: 25,
//   //   width: 50,
//   //   height: 50,
//   // });
//   // const [cropProduct, setCropProduct] = useState({
//   //   unit: "px", // Can be 'px' or '%'
//   //   x: 25,
//   //   y: 25,
//   //   width: 50,
//   //   height: 50,
//   // });

//   // useDebounceEffect(
//   //   async () => {
//   //     if (
//   //       completedCrop?.width &&
//   //       completedCrop?.height &&
//   //       imgRef.current &&
//   //       previewCanvasRef.current
//   //     ) {
//   //       // We use canvasPreview as it's much faster than imgPreview.
//   //       canvasPreview(
//   //         imgRef.current,
//   //         previewCanvasRef.current,
//   //         completedCrop,
//   //         scale,
//   //         rotate
//   //       );
//   //     }
//   //   },
//   //   100,
//   //   [completedCrop, scale, rotate]
//   // );

//   // useDebounceEffect(
//   //   async () => {
//   //     if (
//   //       completedCropProduct?.width &&
//   //       completedCropProduct?.height &&
//   //       imgRefProduct.current &&
//   //       previewCanvasRefProduct.current
//   //     ) {
//   //       // We use canvasPreview as it's much faster than imgPreview.
//   //       canvasPreviewProduct(
//   //         imgRefProduct.current,
//   //         previewCanvasRefProduct.current,
//   //         completedCropProduct,
//   //         scale,
//   //         rotate
//   //       );
//   //     }
//   //   },
//   //   100,
//   //   [completedCropProduct, scale, rotate]
//   // );

//   // const handleLableCrop = () => {
//   //   if (crop) {
//   //     if (crop.height == 0) {
//   //       toast.error("Please select area to be cropped.", {
//   //         autoClose: 1000,
//   //         position: toast.POSITION.TOP_CENTER,
//   //       });
//   //     } else {
//   //       if (!previewCanvasRef.current) {
//   //         throw new Error("Crop canvas does not exist");
//   //       }

//   //       previewCanvasRef.current.toBlob((blob) => {
//   //         if (!blob) {
//   //           throw new Error("Failed to create blob");
//   //         }
//   //         if (blobUrlRef.current) {
//   //           URL.revokeObjectURL(blobUrlRef.current);
//   //         }
//   //         var reader = new FileReader();
//   //         reader.readAsDataURL(blob);
//   //         reader.onloadend = function () {
//   //           var base64data = reader.result;
//   //           setFormPic(base64data);
//   //           setShow(false);
//   //         };
//   //       });
//   //     }
//   //   } else {
//   //     toast.error("Please select area to be cropped.", {
//   //       autoClose: 1000,
//   //       position: toast.POSITION.TOP_CENTER,
//   //     });
//   //   }
//   // };

//   // function onImageLoad(e) {
//   //   if (aspect) {
//   //     const { width, height } = e.currentTarget;
//   //     console.log(width);
//   //     console.log(height);
//   //     setCrop(centerAspectCrop(width, height, aspect));
//   //     setCompletedCrop(centerAspectCrop(width, height, aspect));
//   //   }
//   // }

//   // function onImageLoadProduct(e) {
//   //   if (aspect) {
//   //     const { width, height } = e.currentTarget;
//   //     console.log(width);
//   //     console.log(height);
//   //     setCropProduct(centerAspectCrop(width, height, aspect));
//   //     setCompletedCropProduct(centerAspectCrop(width, height, aspect));
//   //   }
//   // }

//   const getBase64 = (file, cb) => {
//     let reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onload = function () {
//       cb(reader.result)
//     }
//     reader.onerror = function (error) {
//       console.log(error)
//     }
//   }
//   const handleBarCode = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       let pattern = /image-*/;
//       let fileType = e.target.files[0].type;
//       setCodedError("");
//       if (fileType.match(pattern) && e.target.files[0].size < 2 * 1024 * 1024) {
//         setCurrentCode(URL.createObjectURL(e.target.files[0]));
//         getBase64(e.target.files[0], (result) => {
//           setCodePic(result)
//         })
//       } else {
//         if (e.target.files[0].size > 2 * 1024 * 1024) {
//           setCodedError("The image size can not be greater than 2mb.");
//         } else {
//           setCodedError("Only 'image' file type is allowed.");
//         }
//         setCurrentImage("");
//         setCodePic("");
//       }
//     }
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       let pattern = /image-*/;
//       let fileType = e.target.files[0].type;
//       setImageError("");
//       if (fileType.match(pattern) && e.target.files[0].size < 2 * 1024 * 1024) {
//         setCurrentImage(URL.createObjectURL(e.target.files[0]));
//         getBase64(e.target.files[0], (result) => {
//           setFormPic(result)
//         })
//         // setShow(true);
//       } else {
//         if (e.target.files[0].size > 2 * 1024 * 1024) {
//           toast.error("The image size can not be greater than 2mb.", {
//             autoClose: 3000,
//             position: toast.POSITION.TOP_CENTER,
//           });
//         } else {
//           toast.error("Only 'image' file type is allowed.", {
//             autoClose: 3000,
//             position: toast.POSITION.TOP_CENTER,
//           });
//         }
//       }
//     }
//   };

//   // const handleProductCrop = () => {
//   //   if (cropProduct) {
//   //     if (cropProduct.height == 0) {
//   //       toast.error("Please select area to be cropped.", {
//   //         autoClose: 1000,
//   //         position: toast.POSITION.TOP_CENTER,
//   //       });
//   //     } else {
//   //       if (!previewCanvasRefProduct.current) {
//   //         throw new Error("Crop canvas does not exist");
//   //       }

//   //       previewCanvasRefProduct.current.toBlob((blob) => {
//   //         if (!blob) {
//   //           throw new Error("Failed to create blob");
//   //         }
//   //         if (blobUrlRefProduct.current) {
//   //           URL.revokeObjectURL(blobUrlRefProduct.current);
//   //         }
//   //         var reader = new FileReader();
//   //         reader.readAsDataURL(blob);
//   //         reader.onloadend = function () {
//   //           var base64data = reader.result;
//   //           setFormPicProduct(base64data);
//   //           setShow2(false);
//   //         };
//   //       });
//   //     }
//   //   } else {
//   //     toast.error("Please select area to be cropped.", {
//   //       autoClose: 1000,
//   //       position: toast.POSITION.TOP_CENTER,
//   //     });
//   //   }
//   // };

//   const handleImageChangeProduct = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       let pattern = /image-*/;
//       let fileType = e.target.files[0].type;
//       setImageProductError("");
//       // setCropProduct(undefined)

//       if (fileType.match(pattern) && e.target.files[0].size < 2 * 1024 * 1024) {
//         setCurrentImageProduct(URL.createObjectURL(e.target.files[0]));
//         getBase64(e.target.files[0], (result) => {
//           setFormPicProduct(result)
//         })
//         // setShow2(true);
//       } else {
//         if (e.target.files[0].size > 2 * 1024 * 1024) {
//           setImageProductError("The image size can not be greater than 2mb.");
//         } else {
//           setImageProductError("Only 'image' file type is allowed.");
//         }
//         // setCompletedCropProduct(null);
//         setCurrentImageProduct("");
//         setFormPicProduct("");
//       }
//     }
//   };

//   const handleAdd = () => {
//     let nameValid = true,
//       descriptionValid = true,
//       publicDescriptionValid = true,
//       lowblaValid = true,
//       metroValid = true,
//       showbayValid = true,
//       alcoholValid = true,
//       formatValid = true,
//       subCatValid = true,
//       styleValid = true,
//       lableValid = true,
//       productValid = true;
//     if (productName === "") {
//       nameValid = false;
//       setProductNameError("Product Name is required");
//     }

//     if (description === "") {
//       descriptionValid = false;
//       setDescriptionErr("Description is required.");
//     }

//     if (publicDescription === "") {
//       publicDescriptionValid = false;
//       setPublicDescriptionErr("Public Description is required.");
//     }

//     if (alcohol === "" || parseFloat(alcohol) > 100) {
//       alcoholValid = false;
//       if (alcohol === "") {
//         setAlcoholError("Alcohol percentage is required.");
//       } else if (parseFloat(alcohol) > 100) {
//         setAlcoholError("Percentage can't be greater than 100.");
//       }
//     }

//     if (selectedFormat === "") {
//       formatValid = false;
//       setFormatError("Please select format.");
//     }

//     if (selectedStyle === "") {
//       styleValid = false;
//       setStyleError("Please select style.");
//     }

//     if (selectedSubCat === "") {
//       subCatValid = false;
//       setSubCatError("Please select sub-category.");
//     }

//     if (currentImage === "") {
//       lableValid = false;
//       setImageError("Lable image is required.");
//     }

//     if (
//       subCatValid == false ||
//       styleValid == false ||
//       formatValid == false ||
//       alcoholValid == false ||
//       showbayValid == false ||
//       metroValid == false ||
//       lowblaValid == false ||
//       publicDescriptionValid == false ||
//       descriptionValid == false ||
//       nameValid == false ||
//       imageError !== "" ||
//       imageProductError !== "" ||
//       !lableValid ||
//       !productValid
//     ) {
//       console.log("Validation Error");
//     } else {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           permission: "product-edit",
//         },
//       };

//       let descriptionArr = [];
//       let descriptionObj = {
//         description: description,
//         public_description: publicDescription,
//         language_id: "1",
//       };

//       descriptionArr.push(descriptionObj);

//       const formData = new FormData();
//       formData.append("product_name", productName);
//       formData.append("product_type", "Beer");
//       formData.append("product_format", selectedFormat);
//       formData.append("product_desc", JSON.stringify(descriptionArr));
//       formData.append("style", selectedStyle);
//       formData.append("organic", organic);
//       formData.append("sub_category", selectedSubCat);
//       // formData.append("batch_number", batch);
//       formData.append("sap_lowbla", lowbla);
//       formData.append("sap_metro", metro);
//       formData.append("sap_showbay", showbay);
//       formData.append("alcohol_percentage", parseFloat(alcohol));

//       if (codePic !== "") {
//         formData.append("barcode_image", codePic);
//       }

//       if(formPicProduct !== ""){
//         formData.append("product_image", formPicProduct);
//       }

//       if(formPic !== ""){
//         formData.append("product_label", formPic);
//       }

//       apis
//         .post(`supplier/product/${product_id}/update`, formData, config)
//         .then((res) => {
//           if (res.data.success === true) {
//             toast.success("Product updated successfully.", {
//               autoClose: 3000,
//               position: toast.POSITION.TOP_CENTER,
//             });
//             navigate("/supplier/product-management");
//           } else {
//             toast.error("Could not update product. Please try again later.", {
//               autoClose: 3000,
//               position: toast.POSITION.TOP_CENTER,
//             });
//           }
//         })
//         .catch((error) => {
//           if(error.message !== "revoke"){
//             if (error.response.data.message === "validation_error") {
//               // if(error.response.data.data.product_image){
//               //     setImageError("The image size can not be greater than 2mb.")
//               // }
//             } else {
//               toast.error("Could not update product. Please try again later.", {
//                 autoClose: 3000,
//                 position: toast.POSITION.TOP_CENTER,
//               });
//             }
//           }

//         });
//     }
//   };

//   useEffect(() => {
//     apis
//       .get("/getProductStyles", {})
//       .then((res) => {
//         if (res.data.success === true) {
//           setStylesList(res.data.data);
//         } else {
//           console.log("Styles List could not be fetched");
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     apis
//       .get("/getSubCategories", {})
//       .then((res) => {
//         if (res.data.success === true) {
//           setSubCatList(res.data.data);
//         } else {
//           console.log("Sub Category list could not be fetched.");
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     apis
//       .get("/getProductFormats", {})
//       .then((res) => {
//         if (res.data.success == true) {
//           setFormatList(res.data.data);
//         } else {
//           console.log("Format List could not be fetched.");
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   useEffect(() => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         permission: "product-view",
//       },
//     };

//     apis
//       .get(`/supplier/product/${product_id}`, config)
//       .then((res) => {
//         if (res.data.success === true) {
//           setProductName(res.data.data.product_name);
//           setDescription(res.data.data.description[0].description);
//           setPublicDescription(res.data.data.description[0].public_description);
//           setLowbla(res.data.data.sap_lowbla ? res.data.data.sap_lowbla : "");
//           setShowbay(res.data.data.sap_showbay ? res.data.data.sap_lowbla : "");
//           setMetro(res.data.data.sap_metro ? res.data.data.sap_metro : "");
//           setAlcohol(res.data.data.alcohol_percentage);
//           setSelectedFormat(res.data.data.product_format.id);
//           setSelectedStyle(res.data.data.product_style.id);
//           setSelectedSubCat(res.data.data.product_category.id);
//           setOrganic(res.data.data.is_organic);
//           setCurrentImage(res.data.data.label_image)
//           setCurrentImageProduct(res.data.data.product_image)
//           if(res.data.data.barcode_image_url !== null || res.data.data.barcode_image_url !== ""){
//             setCurrentCode(res.data.data.barcode_image_url)
//           }
//         } else {
//           toast.error(
//             "Could not fetch product information. Please try again later.",
//             { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
//           );
//         }
//       })
//       .catch((error) => {
//         if(error.message !== "revoke"){
//           toast.error(
//             "Could not fetch product information. Please try again later.",
//             { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
//           );
//         }
//       });
//   }, []);

//   const handleProductChange = (e) => {
//     setProductName(e.target.value);
//     setProductNameError("");
//   };

//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//     setDescriptionErr("");
//   };

//   const handlePublicDescriptionChange = (e) => {
//     setPublicDescription(e.target.value);
//     setPublicDescriptionErr("");
//   };

//   const handleLowblaChange = (e) => {
//     setLowbla(e.target.value);
//     setLowblaError("");
//   };

//   const handleMetroChange = (e) => {
//     setMetro(e.target.value);
//     setMetroError("");
//   };

//   const handleShowbayChange = (e) => {
//     setShowbay(e.target.value);
//     setShowbayError("");
//   };

//   const handleStyleChange = (e) => {
//     setSelectedStyle(e.target.value);
//     setStyleError("");
//   };

//   const handleSubCatChange = (e) => {
//     setSubCatError("");
//     setSelectedSubCat(e.target.value);
//   };

//   const handleAlcoholChange = (e) => {
//     if (numberRegEx.test(e.target.value) || e.target.value === "") {
//       setAlcohol(e.target.value);
//       setAlcoholError("");
//     }
//   };

//   const handleFormatChange = (e) => {
//     setSelectedFormat(e.target.value);
//     setFormatError("");
//   };

//   const handleOrganicChange = (e) => {
//     if (e.target.checked === true) {
//       setOrganic("1");
//     } else {
//       setOrganic("0");
//     }
//   };

//   return (
//     <div class="container-fluid page-wrap product-detail">
//       <div class="row height-inherit">
//         <Sidebar userType={"supplier"} />

//         <div class="col main p-0">
//           <Header title={t("supplier.product_management.edit.title")} />
//           <div class="container-fluid page-content-box px-3 px-sm-4">
//             {/* [Card] */}
//             <div className="card height-100">
//               <div className="card-body p-4">
//                 <div className="row">
//                   <div className="col">
//                     <form>
//                       <div className="mb-3">
//                         <label className="form-label">
//                           {t("supplier.product_management.add.name")}
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           value={productName}
//                           onChange={(e) => handleProductChange(e)}
//                         />
//                         {productNameError === "" ? (
//                           <></>
//                         ) : (
//                           <p className="error-label">{productNameError}</p>
//                         )}
//                       </div>
//                       <div className="mb-3">
//                         <div className="d-flex align-items-center justify-content-between">
//                           <label className="form-label">
//                             {t("supplier.product_management.add.description")}
//                           </label>
//                         </div>
//                         <textarea
//                           className="form-control"
//                           value={description}
//                           onChange={(e) => handleDescriptionChange(e)}
//                         ></textarea>
//                         {descriptionErr === "" ? (
//                           <></>
//                         ) : (
//                           <p className="error-label">{descriptionErr}</p>
//                         )}
//                       </div>
//                       <div className="mb-3">
//                         <div className="d-flex align-items-center justify-content-between">
//                           <label className="form-label">
//                             {t(
//                               "supplier.product_management.add.public_description"
//                             )}
//                           </label>
//                         </div>
//                         <textarea
//                           className="form-control"
//                           value={publicDescription}
//                           onChange={(e) => handlePublicDescriptionChange(e)}
//                         ></textarea>
//                         {publicDescriptionErr === "" ? (
//                           <></>
//                         ) : (
//                           <p className="error-label">{publicDescriptionErr}</p>
//                         )}
//                       </div>
//                       {/* <div className="mb-3">
//                                             <label className="form-label">{t('supplier.product_management.add.batch')}</label>
//                                             <input type="text" className="form-control" value={batch} onChange = {(e) => handleBatchChange(e)}/>
//                                             {batchError === "" ? <></> : <p className="error-label">{batchError}</p>}
//                                         </div> */}
//                       <div className="mb-3">
//                         <label className="form-label">
//                           {t("supplier.product_management.add.loblaws")}
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           value={lowbla}
//                           onChange={(e) => handleLowblaChange(e)}
//                         />
//                         {lowblaError === "" ? (
//                           <></>
//                         ) : (
//                           <p className="error-label">{lowblaError}</p>
//                         )}
//                       </div>
//                       <div className="mb-3">
//                         <label className="form-label">
//                           {t("supplier.product_management.add.metro")}
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           value={metro}
//                           onChange={(e) => handleMetroChange(e)}
//                         />
//                         {metroError === "" ? (
//                           <></>
//                         ) : (
//                           <p className="error-label">{metroError}</p>
//                         )}
//                       </div>
//                       <div className="mb-3">
//                         <label className="form-label">
//                           {t("supplier.product_management.add.sobeys")}
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           value={showbay}
//                           onChange={(e) => handleShowbayChange(e)}
//                         />
//                         {showbayError === "" ? (
//                           <></>
//                         ) : (
//                           <p className="error-label">{showbayError}</p>
//                         )}
//                       </div>
//                       <div className="row mb-3 mx-0">
//                         <div className="col-sm-6 px-0 ps-sm-0 pe-sm-3">
//                           <div className="mb-3">
//                             <label className="form-label">
//                               {t("supplier.product_management.add.style")}
//                             </label>
//                             <select
//                               className="form-select"
//                               value={selectedStyle}
//                               onChange={(e) => handleStyleChange(e)}
//                             >
//                               <option value="">Select Style</option>
//                               {stylesList &&
//                                 stylesList.map((ele) => {
//                                   return (
//                                     <option key={ele.id} value={ele.id}>
//                                       {ele.name}
//                                     </option>
//                                   );
//                                 })}
//                             </select>
//                             {styleError === "" ? (
//                               <></>
//                             ) : (
//                               <p className="error-label">{styleError}</p>
//                             )}
//                             <div class="form-check mt-2">
//                               <input
//                                 class="form-check-input me-2"
//                                 type="checkbox"
//                                 checked={organic === "1" ? true : false}
//                                 onChange={(e) => handleOrganicChange(e)}
//                                 id="organic"
//                               />
//                               <label class="form-check-label" for="organic">
//                                 {t("supplier.product_management.add.organic")}
//                               </label>
//                             </div>
//                           </div>
//                           <div className="mb-3">
//                             <label className="form-label">
//                               {t("supplier.product_management.add.subcategory")}
//                             </label>
//                             <select
//                               className="form-select"
//                               value={selectedSubCat}
//                               onChange={(e) => handleSubCatChange(e)}
//                             >
//                               <option value="">Select Sub Category</option>
//                               {subCatList &&
//                                 subCatList.map((ele) => {
//                                   return (
//                                     <option key={ele.id} value={ele.id}>
//                                       {ele.name}
//                                     </option>
//                                   );
//                                 })}
//                             </select>
//                             {subCatError === "" ? (
//                               <></>
//                             ) : (
//                               <p className="error-label">{subCatError}</p>
//                             )}
//                           </div>
//                           <div className="mb-3">
//                             <label className="form-label">
//                               {t("supplier.product_management.add.percentage")}
//                             </label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               value={alcohol}
//                               onChange={(e) => handleAlcoholChange(e)}
//                             />
//                             {alcoholError === "" ? (
//                               <></>
//                             ) : (
//                               <p className="error-label">{alcoholError}</p>
//                             )}
//                           </div>
//                           <div className="mb-3">
//                             <label className="form-label">
//                               {t("supplier.product_management.add.format")}
//                             </label>
//                             <select
//                               className="form-select"
//                               value={selectedFormat}
//                               onChange={(e) => handleFormatChange(e)}
//                             >
//                               <option value="">Select Format</option>
//                               {formatList &&
//                                 formatList.map((ele) => {
//                                   return (
//                                     <option key={ele.id} value={ele.id}>
//                                       {ele.name}
//                                     </option>
//                                   );
//                                 })}
//                             </select>
//                             {formatError === "" ? (
//                               <></>
//                             ) : (
//                               <p className="error-label">{formatError}</p>
//                             )}
//                           </div>

//                           <div className="mb-3">
//                             <label className="form-label">Upload Barcode</label>
//                             <div className="uploadBtn">
//                               {currentCode !== "" && currentCode !== null ? (
//                                 <img
//                                   src={currentCode}
//                                   width={200}
//                                   height={113}
//                                   className="mb-3"
//                                 ></img>
//                               ) : (
//                                 <></>
//                               )}
//                               <input
//                                 type="file"
//                                 className="mt-3"
//                                 id="upload3"
//                                 hidden
//                                 accept="image/png, image/gif, image/jpeg"
//                                 onChange={(e) => handleBarCode(e)}
//                               />
//                               <label for="upload3">
//                                 {t("supplier.product_management.add.choose")}
//                                 &nbsp;&nbsp;
//                                 <img src={editImg} />
//                               </label>
//                             </div>
//                             {codeError === "" ? (
//                               <></>
//                             ) : (
//                               <p className="error-label">{codeError}</p>
//                             )}
//                           </div>
//                         </div>
//                         <div className="col-sm-6 px-0 pe-sm-0 ps-sm-3">
//                           <div className="mb-3 prodImg">
//                             <div>
//                               <label className="form-label">
//                                 {"Lable Image"}
//                               </label>
//                               <>
//                                 <div className="mb-3 prodImg position-relative">
//                                   {/* {completedCrop && (
//                                     <>
//                                       <div style={{ display: "block" }}>
//                                         <canvas
//                                           ref={previewCanvasRef}
//                                           style={{
//                                             border: "1px solid black",
//                                             width: "200px",
//                                             height: "200px",
//                                           }}
//                                         />
//                                       </div> */}
//                                       {/* <div>
//                                                             <button onClick={onDownloadCropClick}>Download Crop</button>
//                                                             <a
//                                                             ref={hiddenAnchorRef}
//                                                             download
//                                                             style={{
//                                                                 position: 'absolute',
//                                                                 top: '-200vh',
//                                                                 visibility: 'hidden',
//                                                             }}
//                                                             >
//                                                             Hidden download
//                                                             </a>
//                                                         </div> */}
//                                     {/* </>
//                                   )} */}
//                                   <div className="productImg min-square-width border px-2 mb-3 ">
//                                     <img src={currentImage === "" || !currentImage ? noImage : currentImage}></img>
//                                   </div>
//                                   {imageError === "" ? (
//                                     <></>
//                                   ) : (
//                                     <p className="error-label">{imageError}</p>
//                                   )}
//                                   <div className="uploadBtn">
//                                     <input
//                                       type="file"
//                                       id="upload1"
//                                       hidden
//                                       accept="image/png, image/gif, image/jpeg"
//                                       onChange={(e) => handleImageChange(e)}
//                                     />
//                                     <label for="upload1">
//                                       {t(
//                                         "supplier.product_management.add.choose"
//                                       )}
//                                       &nbsp;&nbsp;
//                                       <img src={editImg} />
//                                     </label>
//                                   </div>
//                                 </div>
//                               </>
//                             </div>

//                             <div>
//                               <label className="form-label">
//                                 {"Product Image"}
//                               </label>
//                               <>
//                                 <div className="mb-3 prodImg position-relative">
//                                   {/* {completedCropProduct && (
//                                     <>
//                                       <div style={{ display: "block" }}>
//                                         <canvas
//                                           ref={previewCanvasRefProduct}
//                                           style={{
//                                             border: "1px solid black",
//                                             width: "200px",
//                                             height: "200px",
//                                           }}
//                                         />
//                                       </div> */}
//                                       {/* <div>
//                                                             <button onClick={onDownloadCropClick}>Download Crop</button>
//                                                             <a
//                                                             ref={hiddenAnchorRef}
//                                                             download
//                                                             style={{
//                                                                 position: 'absolute',
//                                                                 top: '-200vh',
//                                                                 visibility: 'hidden',
//                                                             }}
//                                                             >
//                                                             Hidden download
//                                                             </a>
//                                                         </div> */}
//                                     {/* </>
//                                   )} */}
//                                   <div className="productImg min-square-width border px-2 mb-3 ">
//                                     <img src={currentImageProduct === "" || !currentImageProduct ? noImage : currentImageProduct}></img>
//                                   </div>
//                                   {imageProductError === "" ? (
//                                     <></>
//                                   ) : (
//                                     <p className="error-label">
//                                       {imageProductError}
//                                     </p>
//                                   )}
//                                   <div className="uploadBtn">
//                                     <input
//                                       type="file"
//                                       id="upload2"
//                                       hidden
//                                       accept="image/png, image/gif, image/jpeg"
//                                       onChange={(e) =>
//                                         handleImageChangeProduct(e)
//                                       }
//                                     />
//                                     <label for="upload2">
//                                       {t(
//                                         "supplier.product_management.add.choose"
//                                       )}
//                                       &nbsp;&nbsp;
//                                       <img src={editImg} />
//                                     </label>
//                                   </div>
//                                 </div>
//                               </>
//                             </div>
//                           </div>
//                           {/* <div className="mb-3">
//                                                     <div class="form-check form-check-inline">
//                                                         <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Lable" checked/>
//                                                         <label class="form-check-label" for="inlineRadio1">{t('supplier.product_management.add.lable')}</label>
//                                                     </div>
//                                                     <div class="form-check form-check-inline">
//                                                         <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Image" />
//                                                         <label class="form-check-label" for="inlineRadio2">{t('supplier.product_management.add.img')}</label>
//                                                     </div>
//                                                     <div class="form-check form-check-inline">
//                                                         <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="Main Visual" />
//                                                         <label class="form-check-label" for="inlineCheckbox1">{t('supplier.product_management.add.main')}</label>
//                                                     </div>
//                                                 </div> */}
//                         </div>
//                       </div>
//                       <div className="mb-3 col">
//                         <button
//                           type="button"
//                           className="btn btn-outline-black me-3"
//                           onClick={() =>
//                             navigate("/supplier/product-management")
//                           }
//                         >
//                           {t("supplier.product_management.add.close_btn")}
//                         </button>
//                         <button
//                           type="button"
//                           className="btn btn-purple"
//                           onClick={() => handleAdd()}
//                         >
//                           {t("supplier.product_management.edit.save_btn")}
//                         </button>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* [/Card] */}
//           </div>
//         </div>
//       </div>
//       <Modal
//         className="modal fade"
//         show={show}
//         centered
//         // onHide={() => { setShow(false) }}
//       >
//         <Modal.Header>
//           <h5 class="modal-title text-purpal">Crop Lable Image</h5>
//           {/* <button type="button" class="btn-close text-purpal" aria-label="Close" onClick={closeAgeConfirm}></button> */}
//         </Modal.Header>
//         <Modal.Body
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             background: "black",
//           }}
//         >
//           {/* <ReactCrop
//             crop={crop}
//             onChange={(crop, percentCrop) => {
//               setCrop(crop);
//             }}
//             onComplete={(c) => {
//               setCompletedCrop(c);
//             }}
//             aspect={aspect}
//           >
//             <img
//               ref={imgRef}
//               src={currentImage}
//               className="mb-3"
//               alt=""
//               onLoad={onImageLoad}
//             />
//           </ReactCrop> */}
//         </Modal.Body>

//         <Modal.Footer
//           style={{
//             display: "flex",
//             justifyContent: "center",
//           }}
//         >
//           <button
//             type="button"
//             class="btn btn-outline-purple"
//             onClick={() => {
//               setShow(false);
//               setCurrentImage("");
//               // setCompletedCrop(null);
//             }}
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             class="btn btn-purple btn-md w-auto"
//             // onClick={() => handleLableCrop()}
//           >
//             Crop
//           </button>
//         </Modal.Footer>
//       </Modal>

//       <Modal
//         className="modal fade"
//         show={show2}
//         centered
//         // onHide={() => { setShow(false) }}
//       >
//         <Modal.Header>
//           <h5 class="modal-title text-purpal">Crop Product Image</h5>
//           {/* <button type="button" class="btn-close text-purpal" aria-label="Close" onClick={closeAgeConfirm}></button> */}
//         </Modal.Header>
//         <Modal.Body
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             background: "black",
//           }}
//         >
//           {/* <ReactCrop
//             crop={cropProduct}
//             onChange={(c) => setCropProduct(c)}
//             onComplete={(c) => setCompletedCropProduct(c)}
//             aspect={aspect}
//           >
//             <img
//               ref={imgRefProduct}
//               src={currentImageProduct}
//               className="mb-3"
//               alt=""
//               onLoad={onImageLoadProduct}
//             />
//           </ReactCrop> */}
//         </Modal.Body>

//         <Modal.Footer
//           style={{
//             display: "flex",
//             justifyContent: "center",
//           }}
//         >
//           <button
//             type="button"
//             class="btn btn-outline-purple"
//             onClick={() => {
//               setShow2(false);
//               setCurrentImageProduct("");
//               // setCompletedCropProduct(null);
//             }}
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             class="btn btn-purple btn-md w-auto"
//             // onClick={() => handleProductCrop()}
//           >
//             Crop
//           </button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default EditProduct;


import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { canvasPreview } from "./cropper/canvasPreview";
// import { canvasPreviewProduct } from "./cropper/imgPreview";
import { Modal } from "react-bootstrap";
// import { useDebounceEffect } from "./cropper/useDebounceEffect";
// import ReactCrop, {
//   centerCrop,
//   makeAspectCrop,
//   Crop,
//   PixelCrop,
// } from "react-image-crop";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import editImg from "../../assets/images/upload.png";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/scss/dashboard.scss";
import useAuthInterceptor from "../../../utils/apis";
import noImage from "../../assets/images/no-image.png";

import { useLocation } from 'react-router-dom';
import beerBottle from "../../assets/images/beer-bottle.png";
import beerKeg from "../../assets/images/beer_keg.png";
import beerCane from "../../assets/images/beer_cane.png";

toast.configure();

// function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
//   return centerCrop(
//     makeAspectCrop(
//       {
//         unit: "px",
//         width: 500,
//       },
//       aspect,
//       mediaWidth,
//       mediaHeight
//     ),
//     mediaWidth,
//     mediaHeight
//   );
// }

const EditProduct = () => {
  const numberRegEx = /^\d*\.?\d*$/
  const { t, i18n } = useTranslation();
  const apis = useAuthInterceptor();
  const token = localStorage.getItem("supplier_accessToken");
  const { product_id } = useParams();
  // new
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const optionalParam = searchParams.get('optionalParam');
  console.log(optionalParam, "adda")
  const [disableInputs, setDisableInputs] = useState(false);
  useEffect(() => {
    // Check the condition based on product_id
    if (optionalParam === 'some_value') {
      setDisableInputs(true);
    }
  }, [product_id]);
  console.log(disableInputs, "assa")
  // new
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productNameError, setProductNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionErr, setDescriptionErr] = useState("");
  const [publicDescription, setPublicDescription] = useState("");
  const [publicDescriptionErr, setPublicDescriptionErr] = useState("");
  const [lowbla, setLowbla] = useState("");
  const [lowblaError, setLowblaError] = useState("");
  const [showbay, setShowbay] = useState("");
  const [showbayError, setShowbayError] = useState("");
  const [metro, setMetro] = useState("");
  const [metroError, setMetroError] = useState("");
  const [alcohol, setAlcohol] = useState("");
  const [alcoholError, setAlcoholError] = useState("");
  const [stylesList, setStylesList] = useState("");
  const [subCatList, setSubCatList] = useState("");
  const [formatList, setFormatList] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [formatError, setFormatError] = useState("");
  const [selectedSubCat, setSelectedSubCat] = useState("");
  const [subCatError, setSubCatError] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [styleError, setStyleError] = useState("");
  const [formPic, setFormPic] = useState("");
  const [formPicProduct, setFormPicProduct] = useState("");
  const [organic, setOrganic] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [imageError, setImageError] = useState("");
  const [imageProductError, setImageProductError] = useState("");
  const [currentImage, setCurrentImage] = useState("")
  const [currentImageProduct, setCurrentImageProduct] = useState("")
  const [currentCode, setCurrentCode] = useState("");
  const [codePic, setCodePic] = useState("");
  const [codeError, setCodedError] = useState("");

  const [showStyleModal, setShowStyleModal] = useState(false);
  const [otherStyle, setOtherStyle] = useState("");
  const [showOther, setShowOther] = useState(false);

  const [showFormatModal, setShowFormatModal] = useState(false);
  const [otherFormat, setOtherFormat] = useState("");
  const [showNewFormat, setShowNewFormat] = useState(false);
  const [formatUnit, setFormatUnit] = useState(0);
  const [formatType, setFormatType] = useState("")
  // console.log("saddddd",otherStyle)
  const submit = () => {
    console.log(otherStyle, "sdagsajkjksa")
    if (otherStyle.trim() === "" || otherStyle === null || otherStyle.toLowerCase().trim() == "other") {

      toast.error("Please enter valid value", {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });

    }
    else {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: "product-edit",
        },
      };
      const formDataStyle = new FormData();
      formDataStyle.append("style", otherStyle)
      apis
        .post("/supplier/createProductStyles", formDataStyle, config)
        .then((res) => {
          // setDisable(false);
          if (res.data.success === true) {
            toast.success("Style added to the list successfully.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
            setSelectedStyle("")
            // setSelectedStyle(otherStyle)
            setShowOther(true);
            setShowStyleModal(false);
          } else {

            toast.error("Could not add Style. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((error) => {
          // setDisable(false);
          toast.error("Could not add style. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });

        });



    }
  }
  const submitFormat = () => {
    // console.log(otherStyle,"sdagsajkjksa")
    if (otherFormat.trim() === "" || otherFormat === null || formatUnit <= 0 || formatUnit === null) {

      toast.error("Please enter valid value", {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });

    }
    else {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: "product-edit",
        },
      };
      const formDataFormat = new FormData();
      formDataFormat.append("name", otherFormat)
      formDataFormat.append("unit", formatUnit)
      apis
        .post("/supplier/createProductFormats", formDataFormat, config)
        .then((res) => {
          // setDisable(false);
          if (res.data.success === true) {
            toast.success("Format added to the list successfully.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
            setSelectedFormat("")
            setShowNewFormat(true);
            setShowFormatModal(false);
          } else {

            toast.error("Could not add Format. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((error) => {
          // setDisable(false);
          toast.error("Could not add Format. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });

        });

      // setSelectedFormat("")
      // setShowNewFormat(true);
      // setShowFormatModal(false);

    }
  }

  // const previewCanvasRef = useRef(null);
  // const previewCanvasRefProduct = useRef(null);
  // const [completedCrop, setCompletedCrop] = useState("");
  // const [completedCropProduct, setCompletedCropProduct] = useState("");
  // const [crop, setCrop] = useState({
  //   unit: "px", // Can be 'px' or '%'
  //   x: 25,
  //   y: 25,
  //   width: 50,
  //   height: 50,
  // });
  // const [cropProduct, setCropProduct] = useState({
  //   unit: "px", // Can be 'px' or '%'
  //   x: 25,
  //   y: 25,
  //   width: 50,
  //   height: 50,
  // });

  // useDebounceEffect(
  //   async () => {
  //     if (
  //       completedCrop?.width &&
  //       completedCrop?.height &&
  //       imgRef.current &&
  //       previewCanvasRef.current
  //     ) {
  //       // We use canvasPreview as it's much faster than imgPreview.
  //       canvasPreview(
  //         imgRef.current,
  //         previewCanvasRef.current,
  //         completedCrop,
  //         scale,
  //         rotate
  //       );
  //     }
  //   },
  //   100,
  //   [completedCrop, scale, rotate]
  // );

  // useDebounceEffect(
  //   async () => {
  //     if (
  //       completedCropProduct?.width &&
  //       completedCropProduct?.height &&
  //       imgRefProduct.current &&
  //       previewCanvasRefProduct.current
  //     ) {
  //       // We use canvasPreview as it's much faster than imgPreview.
  //       canvasPreviewProduct(
  //         imgRefProduct.current,
  //         previewCanvasRefProduct.current,
  //         completedCropProduct,
  //         scale,
  //         rotate
  //       );
  //     }
  //   },
  //   100,
  //   [completedCropProduct, scale, rotate]
  // );

  // const handleLableCrop = () => {
  //   if (crop) {
  //     if (crop.height == 0) {
  //       toast.error("Please select area to be cropped.", {
  //         autoClose: 1000,
  //         position: toast.POSITION.TOP_CENTER,
  //       });
  //     } else {
  //       if (!previewCanvasRef.current) {
  //         throw new Error("Crop canvas does not exist");
  //       }

  //       previewCanvasRef.current.toBlob((blob) => {
  //         if (!blob) {
  //           throw new Error("Failed to create blob");
  //         }
  //         if (blobUrlRef.current) {
  //           URL.revokeObjectURL(blobUrlRef.current);
  //         }
  //         var reader = new FileReader();
  //         reader.readAsDataURL(blob);
  //         reader.onloadend = function () {
  //           var base64data = reader.result;
  //           setFormPic(base64data);
  //           setShow(false);
  //         };
  //       });
  //     }
  //   } else {
  //     toast.error("Please select area to be cropped.", {
  //       autoClose: 1000,
  //       position: toast.POSITION.TOP_CENTER,
  //     });
  //   }
  // };

  // function onImageLoad(e) {
  //   if (aspect) {
  //     const { width, height } = e.currentTarget;
  //     console.log(width);
  //     console.log(height);
  //     setCrop(centerAspectCrop(width, height, aspect));
  //     setCompletedCrop(centerAspectCrop(width, height, aspect));
  //   }
  // }

  // function onImageLoadProduct(e) {
  //   if (aspect) {
  //     const { width, height } = e.currentTarget;
  //     console.log(width);
  //     console.log(height);
  //     setCropProduct(centerAspectCrop(width, height, aspect));
  //     setCompletedCropProduct(centerAspectCrop(width, height, aspect));
  //   }
  // }

  const getBase64 = (file, cb) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      cb(reader.result)
    }
    reader.onerror = function (error) {
      console.log(error)
    }
  }
  const handleBarCode = (e) => {
    if (e.target.files && e.target.files[0]) {
      let pattern = /image-*/;
      let fileType = e.target.files[0].type;
      setCodedError("");
      if (fileType.match(pattern) && e.target.files[0].size < 2 * 1024 * 1024) {
        setCurrentCode(URL.createObjectURL(e.target.files[0]));
        getBase64(e.target.files[0], (result) => {
          setCodePic(result)
        })
      } else {
        if (e.target.files[0].size > 2 * 1024 * 1024) {
          setCodedError("The image size can not be greater than 2mb.");
        } else {
          setCodedError("Only 'image' file type is allowed.");
        }
        setCurrentImage("");
        setCodePic("");
      }
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let pattern = /image-*/;
      let fileType = e.target.files[0].type;
      setImageError("");
      if (fileType.match(pattern) && e.target.files[0].size < 2 * 1024 * 1024) {
        setCurrentImage(URL.createObjectURL(e.target.files[0]));
        getBase64(e.target.files[0], (result) => {
          setFormPic(result)
        })
        // setShow(true);
      } else {
        if (e.target.files[0].size > 2 * 1024 * 1024) {
          toast.error("The image size can not be greater than 2mb.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error("Only 'image' file type is allowed.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    }
  };

  // const handleProductCrop = () => {
  //   if (cropProduct) {
  //     if (cropProduct.height == 0) {
  //       toast.error("Please select area to be cropped.", {
  //         autoClose: 1000,
  //         position: toast.POSITION.TOP_CENTER,
  //       });
  //     } else {
  //       if (!previewCanvasRefProduct.current) {
  //         throw new Error("Crop canvas does not exist");
  //       }

  //       previewCanvasRefProduct.current.toBlob((blob) => {
  //         if (!blob) {
  //           throw new Error("Failed to create blob");
  //         }
  //         if (blobUrlRefProduct.current) {
  //           URL.revokeObjectURL(blobUrlRefProduct.current);
  //         }
  //         var reader = new FileReader();
  //         reader.readAsDataURL(blob);
  //         reader.onloadend = function () {
  //           var base64data = reader.result;
  //           setFormPicProduct(base64data);
  //           setShow2(false);
  //         };
  //       });
  //     }
  //   } else {
  //     toast.error("Please select area to be cropped.", {
  //       autoClose: 1000,
  //       position: toast.POSITION.TOP_CENTER,
  //     });
  //   }
  // };

  const handleImageChangeProduct = (e) => {
    if (e.target.files && e.target.files[0]) {
      let pattern = /image-*/;
      let fileType = e.target.files[0].type;
      setImageProductError("");
      // setCropProduct(undefined)

      if (fileType.match(pattern) && e.target.files[0].size < 2 * 1024 * 1024) {
        setCurrentImageProduct(URL.createObjectURL(e.target.files[0]));
        getBase64(e.target.files[0], (result) => {
          setFormPicProduct(result)
        })
        // setShow2(true);
      } else {
        if (e.target.files[0].size > 2 * 1024 * 1024) {
          setImageProductError("The image size can not be greater than 2mb.");
        } else {
          setImageProductError("Only 'image' file type is allowed.");
        }
        // setCompletedCropProduct(null);
        setCurrentImageProduct("");
        setFormPicProduct("");
      }
    }
  };

  const handleAdd = () => {
    let nameValid = true,
      descriptionValid = true,
      publicDescriptionValid = true,
      lowblaValid = true,
      metroValid = true,
      showbayValid = true,
      alcoholValid = true,
      formatValid = true,
      subCatValid = true,
      styleValid = true,
      lableValid = true,
      productValid = true;
    if (productName === "") {
      nameValid = false;
      setProductNameError("Product Name is required");
    }

    if (description === "") {
      descriptionValid = false;
      setDescriptionErr("Description is required.");
    }

    if (publicDescription === "") {
      publicDescriptionValid = false;
      setPublicDescriptionErr("Public Description is required.");
    }

    if (alcohol === "" || parseFloat(alcohol) > 100) {
      alcoholValid = false;
      if (alcohol === "") {
        setAlcoholError("Alcohol percentage is required.");
      } else if (parseFloat(alcohol) > 100) {
        setAlcoholError("Percentage can't be greater than 100.");
      }
    }

    if (selectedFormat === "") {
      formatValid = false;
      setFormatError("Please select format.");
    }

    if (selectedStyle === "") {
      styleValid = false;
      setStyleError("Please select style.");
    }

    if (selectedSubCat === "") {
      subCatValid = false;
      setSubCatError("Please select sub-category.");
    }

    if (currentImage === "") {
      lableValid = false;
      setImageError("Lable image is required.");
    }

    if (
      subCatValid == false ||
      styleValid == false ||
      formatValid == false ||
      alcoholValid == false ||
      showbayValid == false ||
      metroValid == false ||
      lowblaValid == false ||
      publicDescriptionValid == false ||
      descriptionValid == false ||
      nameValid == false ||
      imageError !== "" ||
      imageProductError !== "" ||
      !lableValid ||
      !productValid
    ) {
      console.log("Validation Error");
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: "product-edit",
        },
      };

      let descriptionArr = [];
      let descriptionObj = {
        description: description,
        public_description: publicDescription,
        language_id: "1",
      };

      descriptionArr.push(descriptionObj);

      const formData = new FormData();
      formData.append("product_name", productName);
      formData.append("product_type", "Beer");
      formData.append("product_format", selectedFormat);
      formData.append("product_desc", JSON.stringify(descriptionArr));
      formData.append("style", selectedStyle);
      formData.append("organic", organic);
      formData.append("sub_category", selectedSubCat);
      // formData.append("batch_number", batch);
      formData.append("sap_lowbla", lowbla);
      formData.append("sap_metro", metro);
      formData.append("sap_showbay", showbay);
      formData.append("alcohol_percentage", parseFloat(alcohol));

      if (codePic !== "") {
        formData.append("barcode_image", codePic);
      }

      if (formPicProduct !== "") {
        formData.append("product_image", formPicProduct);
      }

      if (formPic !== "") {
        formData.append("product_label", formPic);
      }

      apis
        .post(`supplier/product/${product_id}/update`, formData, config)
        .then((res) => {
          if (res.data.success === true) {
            toast.success("Product updated successfully.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
            navigate("/supplier/product-management");
          } else {
            toast.error("Could not update product. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((error) => {
          if (error.message !== "revoke") {
            if (error.response.data.message === "validation_error") {
              // if(error.response.data.data.product_image){
              //     setImageError("The image size can not be greater than 2mb.")
              // }
            } else {
              toast.error("Could not update product. Please try again later.", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              });
            }
          }

        });
    }
  };

  useEffect(() => {
    apis
      .get("/Styles", {})
      .then((res) => {
        if (res.data.success === true) {
          setStylesList(res.data.data);
        } else {
          console.log("Styles List could not be fetched");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    apis
      .get("/getSubCategories", {})
      .then((res) => {
        if (res.data.success === true) {
          setSubCatList(res.data.data);
        } else {
          console.log("Sub Category list could not be fetched.");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    apis
      .get("/getProductFormats", {})
      .then((res) => {
        if (res.data.success == true) {
          setFormatList(res.data.data);
        } else {
          console.log("Format List could not be fetched.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedStyle, selectedFormat]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "product-view",
      },
    };


    apis
      .get(`/supplier/product/${product_id}`, config)
      .then((res) => {
        if (res.data.success === true) {
          setProductName(res.data.data.product_name);
          setDescription(res.data.data.description[0].description);
          setPublicDescription(res.data.data.description[0].public_description);
          setAlcohol(res.data.data.alcohol_percentage);
          setSelectedStyle(res.data.data.product_style.id);
          setSelectedSubCat(res.data.data.product_category.id);
          setOrganic(res.data.data.is_organic);
          setCurrentImageProduct(res.data.data.product_image)
          if (disableInputs == false) {
            setCurrentImage(res.data.data.label_image)
            setSelectedFormat(res.data.data.product_format.id);
            setLowbla(res.data.data.sap_lowbla ? res.data.data.sap_lowbla : "");
            setShowbay(res.data.data.sap_showbay ? res.data.data.sap_lowbla : "");
            setMetro(res.data.data.sap_metro ? res.data.data.sap_metro : "");
            if (res.data.data.barcode_image_url !== null || res.data.data.barcode_image_url !== "") {
              setCurrentCode(res.data.data.barcode_image_url)
            }
          }
        } else {
          toast.error(
            "Could not fetch product information. Please try again later.",
            { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
          );
        }
      })
      .catch((error) => {
        if (error.message !== "revoke") {
          toast.error(
            "Could not fetch product information. Please try again later.",
            { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
          );
        }
      });
  }, []);

  const handleProductChange = (e) => {
    setProductName(e.target.value);
    setProductNameError("");
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setDescriptionErr("");
  };

  const handlePublicDescriptionChange = (e) => {
    setPublicDescription(e.target.value);
    setPublicDescriptionErr("");
  };

  const handleLowblaChange = (e) => {
    setLowbla(e.target.value);
    setLowblaError("");
  };

  const handleMetroChange = (e) => {
    setMetro(e.target.value);
    setMetroError("");
  };

  const handleShowbayChange = (e) => {
    setShowbay(e.target.value);
    setShowbayError("");
  };

  const handleStyleChange = (e) => {
    setShowOther(false)
    setSelectedStyle(e.target.value);
    console.log(e.target.value);
    if (e.target.value === 'other') {
      console.log("NO entry")
      handleStylePopup()
    }
    else if (e.target.value === 'Other') {
      handleStylePopup()
    }
    setStyleError("");

  };
  const handleStylePopup = () => {
    setOtherStyle("")
    console.log('done');
    setShowStyleModal(true);

  }

  const handleSubCatChange = (e) => {
    setSubCatError("");
    setSelectedSubCat(e.target.value);
  };

  const handleAlcoholChange = (e) => {
    if (numberRegEx.test(e.target.value) || e.target.value === "") {
      setAlcohol(e.target.value);
      setAlcoholError("");
    }
  };

  const handleFormatChange = (e) => {
    const formatId = e.target.value;
    const ab = formatList.filter((x) => {
      return x.id == formatId
    });

    let formatName = ab[0].name.split(' ')[0];
    setFormatType(formatName);
    setShowNewFormat(false);
    setOtherFormat("");
    setSelectedFormat(e.target.value);
    if (e.target.value === "other") {
      handleFormatPopup();
    }
    setFormatError("");

    // Clear current image when format changes
    if (currentImage !== "") {
      setCurrentImage("");
      document.getElementById('upload1').value = null;
    }




    setShowNewFormat(false)
    setSelectedFormat(e.target.value);
    if (e.target.value === "other") {
      console.log("xaaa");
      handleFormatPopup()
    }
    setFormatError("");
  };
  const handleFormatPopup = () => {
    setOtherFormat("")
    setShowFormatModal(true)
  }
  const handleOrganicChange = (e) => {
    if (e.target.checked === true) {
      setOrganic("1");
    } else {
      setOrganic("0");
    }
  };

  return (
    <div class="container-fluid page-wrap product-detail">
      <div class="row height-inherit">
        <Sidebar userType={"supplier"} />

        <div class="col main p-0">
          <Header title={t("supplier.product_management.edit.title")} />
          <div class="container-fluid page-content-box px-3 px-sm-4">
            {/* [Card] */}
            <div className="card height-100">
              <div className="card-body p-4">
                <div className="row">
                  <div className="col">
                    <form>
                      <div className="mb-3">
                        <label className="form-label">
                          {t("supplier.product_management.add.name")}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={productName}
                          disabled={disableInputs}
                          onChange={(e) => handleProductChange(e)}
                        />
                        {productNameError === "" ? (
                          <></>
                        ) : (
                          <p className="error-label">{productNameError}</p>
                        )}
                      </div>
                      <div className="mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                          <label className="form-label">
                            {t("supplier.product_management.add.description")}
                          </label>
                        </div>
                        <textarea
                          className="form-control"
                          value={description}
                          disabled={disableInputs}
                          onChange={(e) => handleDescriptionChange(e)}
                        ></textarea>
                        {descriptionErr === "" ? (
                          <></>
                        ) : (
                          <p className="error-label">{descriptionErr}</p>
                        )}
                      </div>
                      <div className="mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                          <label className="form-label">
                            {t(
                              "supplier.product_management.add.public_description"
                            )}
                          </label>
                        </div>
                        <textarea
                          className="form-control"
                          value={publicDescription}
                          disabled={disableInputs}
                          onChange={(e) => handlePublicDescriptionChange(e)}
                        ></textarea>
                        {publicDescriptionErr === "" ? (
                          <></>
                        ) : (
                          <p className="error-label">{publicDescriptionErr}</p>
                        )}
                      </div>
                      {/* <div className="mb-3">
                                            <label className="form-label">{t('supplier.product_management.add.batch')}</label>
                                            <input type="text" className="form-control" value={batch} onChange = {(e) => handleBatchChange(e)}/>
                                            {batchError === "" ? <></> : <p className="error-label">{batchError}</p>}
                                        </div> */}
                      <div className="mb-3">
                        <label className="form-label">
                          {t("supplier.product_management.add.loblaws")}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={lowbla}
                          onChange={(e) => handleLowblaChange(e)}
                        />
                        {lowblaError === "" ? (
                          <></>
                        ) : (
                          <p className="error-label">{lowblaError}</p>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          {t("supplier.product_management.add.metro")}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={metro}
                          onChange={(e) => handleMetroChange(e)}
                        />
                        {metroError === "" ? (
                          <></>
                        ) : (
                          <p className="error-label">{metroError}</p>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          {t("supplier.product_management.add.sobeys")}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={showbay}
                          onChange={(e) => handleShowbayChange(e)}
                        />
                        {showbayError === "" ? (
                          <></>
                        ) : (
                          <p className="error-label">{showbayError}</p>
                        )}
                      </div>
                      <div className="row mb-3 mx-0">
                        <div className="col-sm-6 px-0 ps-sm-0 pe-sm-3">
                          <div className="mb-3">
                            <label className="form-label">
                              {t("supplier.product_management.add.style")}
                            </label>
                            <select
                              className="form-select"
                              value={selectedStyle}
                              disabled={disableInputs}
                              onChange={(e) => handleStyleChange(e)}
                            >
                              <option value="">
                                {t(
                                  "supplier.product_management.add.select_style"
                                )}
                              </option>
                              {stylesList &&
                                stylesList.map((ele) => {
                                  return (
                                    <option key={ele.id} value={ele.id}>
                                      {ele.name}
                                    </option>
                                  );
                                })}
                              {/* New style */}
                              {/* {showOther==true?(<option value={otherStyle}>
                                {otherStyle}
                                </option>):(<></>)} */}
                              <option value="other">
                                {t("supplier.product_management.add.other")}
                              </option>

                            </select>
                            {styleError === "" ? (
                              <></>
                            ) : (
                              <p className="error-label">{styleError}</p>
                            )}
                            <div class="form-check mt-2">
                              <input
                                class="form-check-input me-2"
                                type="checkbox"
                                checked={organic === "1" ? true : false}
                                onChange={(e) => handleOrganicChange(e)}
                                disabled={disableInputs}
                                id="organic"
                              />
                              <label class="form-check-label" for="organic">
                                {t("supplier.product_management.add.organic")}
                              </label>
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">
                              {t("supplier.product_management.add.subcategory")}
                            </label>
                            <select
                              className="form-select"
                              value={selectedSubCat}
                              disabled={disableInputs}
                              onChange={(e) => handleSubCatChange(e)}
                            >
                              <option value="">Select Sub Category</option>
                              {subCatList &&
                                subCatList.map((ele) => {
                                  return (
                                    <option key={ele.id} value={ele.id}>
                                      {ele.name}
                                    </option>
                                  );
                                })}
                            </select>
                            {subCatError === "" ? (
                              <></>
                            ) : (
                              <p className="error-label">{subCatError}</p>
                            )}
                          </div>
                          <div className="mb-3">
                            <label className="form-label">
                              {t("supplier.product_management.add.percentage")}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={alcohol}
                              disabled={disableInputs}
                              onChange={(e) => handleAlcoholChange(e)}
                            />
                            {alcoholError === "" ? (
                              <></>
                            ) : (
                              <p className="error-label">{alcoholError}</p>
                            )}
                          </div>
                          <div className="mb-3">
                            <label className="form-label">
                              {t("supplier.product_management.add.format")}
                            </label>
                            <select
                              className="form-select"
                              value={selectedFormat}
                              onChange={(e) => handleFormatChange(e)}
                            >
                              <option value="">Select Format</option>
                              {formatList &&
                                formatList.map((ele) => {
                                  return (
                                    <option key={ele.id} value={ele.id}>
                                      {ele.name}
                                    </option>
                                  );
                                })}
                              {/* {showNewFormat==true?(<option value={otherFormat}>
                                {otherFormat}
                                </option>):(<></>)} */}
                              <option value="other">
                                {t("supplier.product_management.add.other")}
                              </option>
                            </select>
                            {formatError === "" ? (
                              <></>
                            ) : (
                              <p className="error-label">{formatError}</p>
                            )}
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Upload Barcode</label>
                            <div className="uploadBtn">
                              {currentCode !== "" && currentCode !== null ? (
                                <img
                                  src={currentCode}
                                  width={200}
                                  height={113}
                                  className="mb-3"
                                ></img>
                              ) : (
                                <></>
                              )}
                              <input
                                type="file"
                                className="mt-3"
                                id="upload3"
                                hidden
                                accept="image/png, image/gif, image/jpeg"
                                onChange={(e) => handleBarCode(e)}
                              />
                              <label for="upload3">
                                {t("supplier.product_management.add.choose")}
                                &nbsp;&nbsp;
                                <img src={editImg} />
                              </label>
                            </div>
                            {codeError === "" ? (
                              <></>
                            ) : (
                              <p className="error-label">{codeError}</p>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-6 px-0 pe-sm-0 ps-sm-3">
                          <div className="mb-3 prodImg">
                            <div>
                              <label className="form-label">
                                {"Lable Image"}
                              </label>
                              <>
                                <div className="mb-3 prodImg position-relative">

                                  {/* <div className="productImg min-square-width border px-2 mb-3 ">
                                    <img src={currentImage === "" || !currentImage ? noImage : currentImage}></img>
                                  </div> */}

                                  <div className="productImg min-square-width border px-2 mb-3">
                                    {formatType === "Bottle" && (
                                      <>
                                        <div class="clipBox">
                                          <img src={beerBottle} alt="Bottle" />
                                        </div>
                                        <div class="lable-bottle">
                                          <div class="lable-content">
                                            {currentImage ? <img src={currentImage} /> : null}
                                          </div>
                                        </div>
                                      </>
                                    )}
                                    {formatType === "Can" && (
                                      <>
                                        <div class="clipBoxcane">
                                          <img src={beerCane} alt="Can" />
                                        </div>
                                        <div className="lable-cane">
                                          <div class="lable-content">
                                            {currentImage ? <img src={currentImage} /> : null}
                                          </div>
                                        </div>
                                      </>
                                    )}
                                    {formatType === "Keg" && (
                                      <>
                                        <div class="clipBoxkeg">
                                          <img src={beerKeg} alt="Keg" />
                                        </div>
                                        <div className="lable-keg">
                                          <div class="lable-content">
                                            {currentImage ? <img src={currentImage} /> : null}
                                          </div>
                                        </div>
                                      </>
                                    )}
                                    {(formatType !== "Bottle" && formatType !== "Can" && formatType !== "Keg") && (
                                      <img src={noImage} alt="No Image" />
                                    )}

                                  </div>
                                  {imageError === "" ? (
                                    <></>
                                  ) : (
                                    <p className="error-label">{imageError}</p>
                                  )}
                                  <div className="uploadBtn">
                                    <input
                                      type="file"
                                      id="upload1"
                                      hidden
                                      accept="image/png, image/gif, image/jpeg"
                                      onChange={(e) => handleImageChange(e)}
                                    />
                                    <label for="upload1">
                                      {t(
                                        "supplier.product_management.add.choose"
                                      )}
                                      &nbsp;&nbsp;
                                      <img src={editImg} />
                                    </label>
                                  </div>
                                </div>
                              </>
                            </div>

                            <div>
                              <label className="form-label">
                                {"Product Image"}
                              </label>
                              <>
                                <div className="mb-3 prodImg position-relative">

                                  <div className="productImg min-square-width border px-2 mb-3 ">
                                    <img src={currentImageProduct === "" || !currentImageProduct ? noImage : currentImageProduct}></img>
                                  </div>
                                  {imageProductError === "" ? (
                                    <></>
                                  ) : (
                                    <p className="error-label">
                                      {imageProductError}
                                    </p>
                                  )}
                                  <div className="uploadBtn">
                                    <input
                                      type="file"
                                      id="upload2"
                                      hidden
                                      accept="image/png, image/gif, image/jpeg"
                                      disabled={disableInputs}
                                      onChange={(e) =>
                                        handleImageChangeProduct(e)
                                      }
                                    />
                                    <label for="upload2">
                                      {t(
                                        "supplier.product_management.add.choose"
                                      )}
                                      &nbsp;&nbsp;
                                      <img src={editImg} />
                                    </label>
                                  </div>
                                </div>
                              </>
                            </div>
                          </div>
                          {/* <div className="mb-3">
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Lable" checked/>
                                                        <label class="form-check-label" for="inlineRadio1">{t('supplier.product_management.add.lable')}</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Image" />
                                                        <label class="form-check-label" for="inlineRadio2">{t('supplier.product_management.add.img')}</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="Main Visual" />
                                                        <label class="form-check-label" for="inlineCheckbox1">{t('supplier.product_management.add.main')}</label>
                                                    </div>
                                                </div> */}
                        </div>
                      </div>
                      <div className="mb-3 col">
                        <button
                          type="button"
                          className="btn btn-outline-black me-3"
                          onClick={() =>
                            navigate("/supplier/product-management")
                          }
                        >
                          {t("supplier.product_management.add.close_btn")}
                        </button>
                        <button
                          type="button"
                          className="btn btn-purple"
                          onClick={() => handleAdd()}
                        >
                          {t("supplier.product_management.edit.save_btn")}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* [/Card] */}
          </div>
        </div>
      </div>
      <Modal
        className="modal fade"
        show={show}
        centered
      // onHide={() => { setShow(false) }}
      >
        <Modal.Header>
          <h5 class="modal-title text-purpal">Crop Lable Image</h5>
          {/* <button type="button" class="btn-close text-purpal" aria-label="Close" onClick={closeAgeConfirm}></button> */}
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "center",
            background: "black",
          }}
        >
          {/* <ReactCrop
            crop={crop}
            onChange={(crop, percentCrop) => {
              setCrop(crop);
            }}
            onComplete={(c) => {
              setCompletedCrop(c);
            }}
            aspect={aspect}
          >
            <img
              ref={imgRef}
              src={currentImage}
              className="mb-3"
              alt=""
              onLoad={onImageLoad}
            />
          </ReactCrop> */}
        </Modal.Body>

        <Modal.Footer
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            class="btn btn-outline-purple"
            onClick={() => {
              setShow(false);
              setCurrentImage("");
              // setCompletedCrop(null);
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-purple btn-md w-auto"
          // onClick={() => handleLableCrop()}
          >
            Crop
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        className="modal fade"
        show={show2}
        centered
      // onHide={() => { setShow(false) }}
      >
        <Modal.Header>
          <h5 class="modal-title text-purpal">Crop Product Image</h5>
          {/* <button type="button" class="btn-close text-purpal" aria-label="Close" onClick={closeAgeConfirm}></button> */}
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "center",
            background: "black",
          }}
        >
          {/* <ReactCrop
            crop={cropProduct}
            onChange={(c) => setCropProduct(c)}
            onComplete={(c) => setCompletedCropProduct(c)}
            aspect={aspect}
          >
            <img
              ref={imgRefProduct}
              src={currentImageProduct}
              className="mb-3"
              alt=""
              onLoad={onImageLoadProduct}
            />
          </ReactCrop> */}
        </Modal.Body>

        <Modal.Footer
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            class="btn btn-outline-purple"
            onClick={() => {
              setShow2(false);
              setCurrentImageProduct("");
              // setCompletedCropProduct(null);
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-purple btn-md w-auto"
          // onClick={() => handleProductCrop()}
          >
            Crop
          </button>
        </Modal.Footer>
      </Modal>
      {/* new stylemodal */}

      <Modal
        className="modal fade"
        show={showStyleModal}
        centered
      // onHide={() => { setShow(false) }}
      >
        <Modal.Header>
          <h5 class="modal-title text-purpal">Add New Style</h5>
          {/* <button type="button" class="btn-close text-purpal" aria-label="Close" onClick={closeAgeConfirm}></button> */}
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "center",
            background: "black",
          }}
        >

          <input
            type="text"
            className="form-control"
            value={otherStyle}
            placeholder="Enter Style"
            onChange={(e) => setOtherStyle(e.target.value)} />
        </Modal.Body>

        <Modal.Footer
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            class="btn btn-outline-purple"
            onClick={() => {
              setSelectedStyle("");
              setShowStyleModal(false);
              setOtherStyle("");
              // setCurrentImageProduct("");
              // setCompletedCropProduct(null);
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-purple btn-md w-auto"
            onClick={() => submit()}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
      <Modal
        className="modal fade"
        show={showFormatModal}
        centered
      // onHide={() => { setShow(false) }}
      >
        <Modal.Header>
          <h5 class="modal-title text-purpal">Add New Format</h5>
          {/* <button type="button" class="btn-close text-purpal" aria-label="Close" onClick={closeAgeConfirm}></button> */}
        </Modal.Header>
        <Modal.Body
        // style={{
        //   display: "flex",
        //   justifyContent: "center",
        //   background: "black",
        // }}
        >
          <label>Format name</label>
          <input
            type="text"
            className="form-control"
            value={otherFormat}
            placeholder="Enter Format Name"
            onChange={(e) => setOtherFormat(e.target.value)} />
          <br />
          <label>Format Unit</label>
          <input
            type="number"
            className="form-control"
            value={formatUnit}
            placeholder="Enter Unit"
            onChange={(e) => setFormatUnit(e.target.value)} />

        </Modal.Body>

        <Modal.Footer
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            class="btn btn-outline-purple"
            onClick={() => {
              setSelectedFormat("");
              setShowFormatModal(false);
              setOtherFormat("");
              setFormatUnit(0);
              // setCurrentImageProduct("");
              // setCompletedCropProduct(null);
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-purple btn-md w-auto"
            onClick={() => submitFormat()}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default EditProduct;
