// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
// import Header from "../../../CommonComponents/Header/header";
// import { useTranslation } from "react-i18next";
// import { Modal } from "react-bootstrap";
// import "../../assets/scss/dashboard.scss";
// // import useAuthInterceptor from "../../../utils/apis";
// import { toast } from "react-toastify";
// import useAuthInterceptor from "../../../utils/apis";
// import { hasPermission } from "../../../CommonComponents/commonMethods";
// import { PRODUCT_EDIT, PRODUCT_VIEW } from "../../../Constants/constant";
// import LoadingOverlay from "react-loading-overlay";

// const ProductManagement = () => {
//   const apis = useAuthInterceptor();
//   const { t, i18n } = useTranslation();
//   const [productList, setProductList] = useState([]);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("supplier_accessToken");
//   const [show, setShow] = useState(false);
//   const [targetDelete, setTargetDelete] = useState("");
//   const [update, setUpdate] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const handleAddProduct = () => {
//     navigate("/supplier/product-management/add-product");
//   };

//   const deactivateProduct = () => {
//     setShow(false);
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         permission: "product-edit",
//       },
//     };

//     const bodyData = {
//       product_id: targetDelete,
//       status: "0",
//     };

//     apis
//       .post("supplier/product/statusUpdate", bodyData, config)
//       .then((res) => {
//         if (res.data.success === true) {
//           setUpdate(!update);
//           toast.success("Product deactivated.", {
//             autoClose: 1000,
//             position: toast.POSITION.TOP_CENTER,
//           });
//         } else {
//           toast.error("Could not deactivate product. Please try again later.", {
//             autoClose: 1000,
//             position: toast.POSITION.TOP_CENTER,
//           });
//         }
//       })
//       .catch((error) => {
//         if (error.message !== "revoke") {
//           toast.error("Could not deactivate product. Please try again later.", {
//             autoClose: 1000,
//             position: toast.POSITION.TOP_CENTER,
//           });
//         }
//       });
//   };

//   const handleViewProduct = (targetId) => {
//     navigate(`/supplier/product-management/view-product/${targetId}`);
//   };

//   useEffect(() => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         permission: `product-view`,
//       },
//     };
//     if (hasPermission(PRODUCT_VIEW)) {
//       apis
//         .get("supplier/products", config)
//         .then((res) => {
//           setLoading(false);
//           setProductList(res.data.data);
//           console.log("all product---------", res.data.data);
//         })
//         .catch((err) => {
//           setLoading(false);
//           if (err.message !== "revoke") {
//             toast.error("Something went wrong!.Please try again later.", {
//               autoClose: 1000,
//               position: toast.POSITION.TOP_CENTER,
//             });
//           }
//         });
//     }
//   }, [update]);

//   return (
//     <div class="container-fluid page-wrap product-manage">
//       <div class="row height-inherit">
//         <Sidebar userType={"supplier"} />

//         <div class="col main p-0">
//           <Header title={t("supplier.product_management.list.title")} />
//           <LoadingOverlay
//             active={loading}
//             spinner
//             styles={{
//               overlay: (base) => ({
//                 ...base,
//                 background: "#fefefe",
//                 width: "100%",
//                 "& svg circle": {
//                   stroke: "black",
//                 },
//               }),
//             }}
//           >
//             <div class="container-fluid page-content-box px-3 px-sm-4">
//               <div class="row mb-4">
//                 <div class="col">
//                   {/* [Card] */}
//                   {/* <div className="card prodInfo-card">
//                   <div className="card-body">
//                     <div className="card-title">
//                       {t("supplier.product_management.list.about")}
//                     </div>
//                     <div className="card-text">
//                       Amet minim mollit non deserunt ullamco est sit aliqua
//                       dolor do amet sint. Velit officia consequat duis enim
//                       velit mollit. Exercitation veniam consequat sunt nostrud
//                       amet. About Company/Supplier Amet minim mollit non
//                       deserunt ullamco est sit aliqua dolor do amet sint. Velit
//                       officia consequat duis enim velit mollit. Exercitation
//                       veniam consequat sunt nostrud amet. About Company/Supplier
//                     </div>
//                   </div>
//                 </div> */}
//                   {/* [/Card] */}
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col">
//                   {/* [Product List] */}
//                   <div className="row product-list m-0">
//                     {/* [Add Product] */}
//                     {hasPermission(PRODUCT_EDIT) && (
//                       <div
//                         className="col-sm-4 col-xl-3 mb-3 addProductBox"
//                         onClick={() => handleAddProduct()}
//                       >
//                         <div className="card h-100">
//                           <div className="card-body">
//                             <a className="addBtn">
//                               <i>+</i>
//                               {t("supplier.product_management.list.add_button")}
//                             </a>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                     {/* [/Add Product] */}
//                     {/* [Product Box] */}
//                     {productList && productList.length > 0 ? (
//                       productList.map((product) => (
//                         <div className="col-sm-4 col-xl-3 mb-3 productBox">
//                           <div class="card product-card">
//                             <div className="title-holder">
//                               <h5 class="card-title text-center">
//                                 {product.product_name}
//                               </h5>
//                             </div>
//                             <div
//                               className="productImg"
//                               onClick={() => handleViewProduct(product.id)}
//                             >
//                               <img
//                                 src={
//                                   // product.product_image &&
//                                   // product.product_image !== ""
//                                   //   ? product.product_image
//                                   //   : product.label_image
//                                   product.product_image
                                  
//                                 }
//                                 class="card-img-top"
//                                 alt=""
//                               />
//                               {/* {product.product_name} */}
//                             </div>
//                             <div class="card-body px-0 pb-0">
//                               <div className="custom-deactive">
//                                 <p
//                                   onClick={() => {
//                                     setShow(true);
//                                     setTargetDelete(product.id);
//                                   }}
//                                 >
//                                   <span class="badge text-bg-red">
//                                     <i class="fa-solid fa-trash"></i>
//                                   </span>
//                                 </p>
//                               </div>
//                               <h6 class="card-subtitle text-body-secondary">
//                                 {product.product_type}
//                               </h6>
//                             </div>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <></>
//                     )}
//                     {/* [/Product Box] */}

//                     {/* [Product Box] */}
//                     {/* <div className="col-sm-4 col-xl-3 mb-3 productBox">
//                             <div class="card">
//                               <a href="/retailer/marketplace/product-details" class="">
//                                 <img
//                                   src={productImg}
//                                   class="card-img-top"
//                                   alt=""
//                                 />
//                               </a>
//                               <div class="card-body px-0 pb-0">
//                                 <h5 class="card-title">Producer-1</h5>
//                                 <h6 class="card-subtitle text-body-secondary">
//                                   Product 1
//                                 </h6>
//                               </div>
//                             </div>
//                           </div> */}
//                     {/* [/Product Box] */}

//                     {/* [Product Box] */}
//                     {/* <div className="col-sm-4 col-xl-3 mb-3 productBox">
//                             <div class="card">
//                               <a href="/retailer/marketplace/product-details" class="">
//                                 <img
//                                   src={productImg}
//                                   class="card-img-top"
//                                   alt=""
//                                 />
//                               </a>
//                               <div class="card-body px-0 pb-0">
//                                 <h5 class="card-title">Producer-1</h5>
//                                 <h6 class="card-subtitle text-body-secondary">
//                                   Product 1
//                                 </h6>
//                               </div>
//                             </div>
//                           </div> */}
//                     {/* [/Product Box] */}

//                     {/* [Product Box] */}
//                     {/* <div className="col-sm-4 col-xl-3 mb-3 productBox">
//                             <div class="card">
//                               <a href="/retailer/marketplace/product-details" class="">
//                                 <img src={productImg} class="card-img-top" alt="" />
//                               </a>
//                               <div class="card-body px-0 pb-0">
//                                 <h5 class="card-title">Producer-1</h5>
//                                 <h6 class="card-subtitle text-body-secondary">
//                                   Product 1
//                                 </h6>
//                               </div>
//                             </div>
//                           </div> */}
//                     {/* [/Product Box] */}
//                   </div>
//                   {/* [/Product List] */}
//                 </div>
//               </div>
//             </div>
//           </LoadingOverlay>

//           <Modal
//             className="modal fade"
//             show={show}
//             centered
//             onHide={() => setShow(false)}
//           >
//             <Modal.Header closeButton>
//               <Modal.Title> Product deactivation</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <h3 className="titleName" style={{ textAlign: "center" }}>
//                 Are you sure you want to delete the selected product ?
//               </h3>
//             </Modal.Body>
//             <Modal.Footer>
//               <button
//                 type="button"
//                 class="btn btn-outline-black"
//                 data-bs-dismiss="modal"
//                 onClick={() => setShow(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 class="btn btn-purple"
//                 onClick={() => deactivateProduct()}
//               >
//                 Deactivate
//               </button>
//             </Modal.Footer>
//           </Modal>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductManagement;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import "../../assets/scss/dashboard.scss";
// import useAuthInterceptor from "../../../utils/apis";
import { toast } from "react-toastify";
import useAuthInterceptor from "../../../utils/apis";
import { hasPermission } from "../../../CommonComponents/commonMethods";
import { PRODUCT_EDIT, PRODUCT_VIEW } from "../../../Constants/constant";
import LoadingOverlay from "react-loading-overlay";
import beerBottle from "../../assets/images/beer-bottle.png";
import beerCane from "../../assets/images/beer_cane.png";
import beerKeg from "../../assets/images/beer_keg.png";

const ProductManagement = () => {
  const apis = useAuthInterceptor();
  const { t, i18n } = useTranslation();
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("supplier_accessToken");
  const [show, setShow] = useState(false);
  const [targetDelete, setTargetDelete] = useState("");
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  //New
  const [showFormat,setShowFormat]=useState(false);
  const [productName,setProductName]=useState("");
  const [newProducList,setNewProducList]=useState("");
  const [dropdownShow,setDropdownShow]=useState(false);
  const [productId,setProductId]=useState(0);
  const [productNameError,setProductNameError]=useState("")
  const handleProductNameChange=(e)=>{
    setProductId(0)
    setProductNameError("")
    let x=e.target.value
    console.log(x,"aada")
    setProductName(x)
    console.log(newProducList)
    const matchingStrings = productList.filter(str => str.product_name.toLowerCase().startsWith(x.toLowerCase()));
    setNewProducList(matchingStrings)
      console.log(matchingStrings,"dada")
      setDropdownShow(true);
  }
  
  const handleSubmit=()=>{
    if(productId==0)
    {
      console.log("zero")
      setProductNameError("Please select the product")
    }
    else{
      console.log("not zero")
      const optionalParamValue='some_value';
      navigate(
        `/supplier/product-management/edit-product/${productId}?optionalParam=${optionalParamValue}`
      )
    }
  }
  const handleProductDropdown=(product_name,id)=>{
    setProductNameError("")
    setProductName(product_name)
    setProductId(id)
    console.log(productName," Jaadu  ",id)

  }
  const handleAddProduct = () => {
    navigate("/supplier/product-management/add-product");
  };

  const deactivateProduct = () => {
    setShow(false);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "product-edit",
      },
    };

    const bodyData = {
      product_id: targetDelete,
      status: "0",
    };

    apis
      .post("supplier/product/statusUpdate", bodyData, config)
      .then((res) => {
        if (res.data.success === true) {
          setUpdate(!update);
          toast.success("Product deactivated.", {
            autoClose: 1000,
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error("Could not deactivate product. Please try again later.", {
            autoClose: 1000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        if (error.message !== "revoke") {
          toast.error("Could not deactivate product. Please try again later.", {
            autoClose: 1000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };

  const handleViewProduct = (targetId) => {
    navigate(`/supplier/product-management/view-product/${targetId}`);
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: `product-view`,
      },
    };
    if (hasPermission(PRODUCT_VIEW)) {
      apis
        .get("supplier/products", config)
        .then((res) => {
          setLoading(false);
          setProductList(res.data.data);
          setNewProducList(res.data.data)
          console.log("all product---------", res.data.data);
        })
        .catch((err) => {
          setLoading(false);
          if (err.message !== "revoke") {
            toast.error("Something went wrong!.Please try again later.", {
              autoClose: 1000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });
    }
  }, [update]);

  return (
    <div class="container-fluid page-wrap product-manage">
      <div class="row height-inherit">
        <Sidebar userType={"supplier"} />

        <div class="col main p-0">
          <Header title={t("supplier.product_management.list.title")} />
          <LoadingOverlay
            active={loading}
            spinner
            styles={{
              overlay: (base) => ({
                ...base,
                background: "#fefefe",
                width: "100%",
                "& svg circle": {
                  stroke: "black",
                },
              }),
            }}
          >
            <div class="container-fluid page-content-box px-3 px-sm-4">
              <div class="row mb-4">
                <div class="col">
                  {/* [Card] */}
                  {/* <div className="card prodInfo-card">
                  <div className="card-body">
                    <div className="card-title">
                      {t("supplier.product_management.list.about")}
                    </div>
                    <div className="card-text">
                      Amet minim mollit non deserunt ullamco est sit aliqua
                      dolor do amet sint. Velit officia consequat duis enim
                      velit mollit. Exercitation veniam consequat sunt nostrud
                      amet. About Company/Supplier Amet minim mollit non
                      deserunt ullamco est sit aliqua dolor do amet sint. Velit
                      officia consequat duis enim velit mollit. Exercitation
                      veniam consequat sunt nostrud amet. About Company/Supplier
                    </div>
                  </div>
                </div> */}
                  {/* [/Card] */}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  {/* [Product List] */}
                  <div className="row product-list m-0">
                    {/* [Add Product] */}
                    {hasPermission(PRODUCT_EDIT) && (
                      <div
                        className="col-sm-4 col-xl-3 mb-3 addProductBox"
                        // onClick={() => handleAddProduct()}
                      >
                        <div className="card h-100">
                          {/* changes adding tabindex */}
                          {/* tabIndex="1" onBlur={()=>{setDropdownShow(false)}} */}
                          <div className="card-body" >
                          <div className="addBtn-sup">
                              <div>
                                <button
                                  className="new-btn w-100"
                                  onClick={() => {
                                    handleAddProduct();
                                  }}
                                >
                                 <span><i class="fa-solid fa-plus"></i>&nbsp;New</span>
                                </button>
                              </div>

                              <div>
                                <button
                                  className={`format-btn w-100 mt-3 ${showFormat ? 'active' : ''}`}
                                  onClick={() => {
                                    setShowFormat(true);
                                    setDropdownShow(true);
                                  }}
                                >
                               
                                 <span><i class="fa-solid fa-pen-to-square"></i>&nbsp;Format</span>
                                </button>
                              </div>
                              <div>
                                {showFormat === true ? (
                                  <>
                                    <div style={{ position: "relative", marginTop: '10px' }}>
                                      <input
                                        type="text"
                                        placeholder="Name"
                                        value={productName}
                                        onChange={(e) => {
                                          handleProductNameChange(e);
                                        }}
                                        onFocus={(e) => {
                                          setDropdownShow(true);
                                        }}
                                        onBlur={()=>{setTimeout(() => {
                                          setDropdownShow(false)
                                        }, 250);}}
                                      />
                                      <button
                                        className="search-btn"
                                        onClick={() => {
                                          handleSubmit();
                                        }}
                                      >
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                      </button>
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>

                              <p className="error_msg">
                                {productNameError == "" ? (
                                  <></>
                                ) : (
                                  <>{productNameError}</>
                                )}
                              </p>

                              {newProducList && newProducList.length > 0 && showFormat == true ? (
                                <>
                                  <ul
                                    className={`w-100 searchListBx custom-scrollbar ${dropdownShow ? "d-block" : "d-none"}`}
                                    style={{
                                      backgroundColor: dropdownShow ? "#fff" : "transparent",
                                      padding: "8px 10px",
                                      color: "#3c3c3c",
                                      borderRadius: "5px",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {newProducList.map((s) => (
                                      <li
                                        className="dropdown-item pe-pointer"
                                        key={s.id}
                                        onClick={() =>
                                          handleProductDropdown(s.product_name, s.id)
                                        }
                                      >
                                        {s.product_name}
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              ) : (
                                <></>
                              )}
                            </div>

                          </div>
                        </div>
                      </div>
                    )}
                    {/* [/Add Product] */}
                    {/* [Product Box] */}
                    {productList && productList.length > 0 ? (
                      productList.map((product) => {
                        let productType = product.product_format.name;
                        const prodyctFType = productType.split(' ')[0];
                        let productFType = productType
                        return (
                          <div className="col-sm-4 col-xl-3 mb-3 productBox">
                            <div class="card product-page product-card">
                              <div className="title-holder">
                                <h5 class="card-title text-center">
                                  {product.product_name}
                                </h5>
                              </div>
                              <div
                                className="productImg"
                                onClick={() => handleViewProduct(product.id)}
                              >
                                {prodyctFType === "Bottle" && (
                                  <>
                                    <div class="clipBox">
                                      <img src={beerBottle} alt="Bottle" />
                                    </div>
                                    <div class="lable-bottle">
                                      <div class="lable-content">
                                        {product.label_image ? <img src={product.label_image} /> : null}
                                      </div>
                                    </div>
                                  </>
                                )}
                                {prodyctFType === "Can" && (
                                  <>
                                    <div class="clipBoxcane">
                                      <img src={beerCane} alt="Can" />
                                    </div>
                                    <div className="lable-cane">
                                      <div class="lable-content">
                                        {product.label_image ? <img src={product.label_image} /> : null}
                                      </div>
                                    </div>
                                  </>
                                )}
                                {prodyctFType === "Keg" && (
                                  <>
                                    <div class="clipBoxkeg">
                                      <img src={beerKeg} alt="Keg" />
                                    </div>
                                    <div className="lable-keg">
                                      <div class="lable-content">
                                        {product.label_image ? <img src={product.label_image} /> : null}
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                              <div class="card-body px-0 pb-0">
                                <div className="custom-deactive">
                                  <p
                                    onClick={() => {
                                      setShow(true);
                                      setTargetDelete(product.id);
                                    }}
                                  >
                                    <span class="badge text-bg-red">
                                      <i class="fa-solid fa-trash"></i>
                                    </span>
                                  </p>
                                </div>
                                <h6 class="card-subtitle text-body-secondary">
                                  {product.product_type}
                                </h6>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <></>
                    )}
                    {/* [/Product Box] */}

                    {/* [Product Box] */}
                    {/* <div className="col-sm-4 col-xl-3 mb-3 productBox">
                            <div class="card">
                              <a href="/retailer/marketplace/product-details" class="">
                                <img
                                  src={productImg}
                                  class="card-img-top"
                                  alt=""
                                />
                              </a>
                              <div class="card-body px-0 pb-0">
                                <h5 class="card-title">Producer-1</h5>
                                <h6 class="card-subtitle text-body-secondary">
                                  Product 1
                                </h6>
                              </div>
                            </div>
                          </div> */}
                    {/* [/Product Box] */}

                    {/* [Product Box] */}
                    {/* <div className="col-sm-4 col-xl-3 mb-3 productBox">
                            <div class="card">
                              <a href="/retailer/marketplace/product-details" class="">
                                <img
                                  src={productImg}
                                  class="card-img-top"
                                  alt=""
                                />
                              </a>
                              <div class="card-body px-0 pb-0">
                                <h5 class="card-title">Producer-1</h5>
                                <h6 class="card-subtitle text-body-secondary">
                                  Product 1
                                </h6>
                              </div>
                            </div>
                          </div> */}
                    {/* [/Product Box] */}

                    {/* [Product Box] */}
                    {/* <div className="col-sm-4 col-xl-3 mb-3 productBox">
                            <div class="card">
                              <a href="/retailer/marketplace/product-details" class="">
                                <img src={productImg} class="card-img-top" alt="" />
                              </a>
                              <div class="card-body px-0 pb-0">
                                <h5 class="card-title">Producer-1</h5>
                                <h6 class="card-subtitle text-body-secondary">
                                  Product 1
                                </h6>
                              </div>
                            </div>
                          </div> */}
                    {/* [/Product Box] */}
                  </div>
                  {/* [/Product List] */}
                </div>
              </div>
            </div>
          </LoadingOverlay>

          <Modal
            className="modal fade"
            show={show}
            centered
            onHide={() => setShow(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title> Product deactivation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h3 className="titleName" style={{ textAlign: "center" }}>
                Are you sure you want to delete the selected product ?
              </h3>
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
                onClick={() => deactivateProduct()}
              >
                Deactivate
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;

