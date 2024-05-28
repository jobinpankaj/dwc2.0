import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import "../../assets/scss/dashboard.scss";
import noImage from '../../assets/images/no-image.png'
import useAuthInterceptor from "../../../utils/apis";
import "react-toastify/dist/ReactToastify.css";
import { hasPermission } from "../../../CommonComponents/commonMethods";
import { PRODUCT_EDIT, PRODUCT_VIEW } from "../../../Constants/constant";

toast.configure();

const ProductDetail = () => {
  const apis = useAuthInterceptor();
  const { t, i18n } = useTranslation();
  const { product_id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("supplier_accessToken");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [publicDescription, setPublicDescription] = useState("");
  const [batch, setBatch] = useState("");
  const [lowbla, setLowbla] = useState("");
  const [showbay, setShowbay] = useState("");
  const [metro, setMetro] = useState("");
  const [alcohol, setAlcohol] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [selectedSubCat, setSelectedSubCat] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [organic, setOrganic] = useState("");
  const [productImage, setProductImage] = useState("");
  const [labelImage, setLabelImage] = useState("")
  const [currentCode, setCurrentCode] = useState("")

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "product-view",
      },
    };
    
    if(hasPermission(PRODUCT_VIEW)){
      apis
      .get(`/supplier/product/${product_id}`, config)
      .then((res) => {
        if (res.data.success === true) {
          setProductName(res.data.data.product_name);
          setDescription(res.data.data.description[0].description);
          setPublicDescription(res.data.data.description[0].public_description);
          setBatch(res.data.data.batch_number);
          setLowbla(res.data.data.sap_lowbla);
          setShowbay(res.data.data.sap_showbay);
          setMetro(res.data.data.sap_metro);
          setAlcohol(res.data.data.alcohol_percentage);
          setSelectedFormat(res.data.data.product_format.name);
          setSelectedStyle(res.data.data.product_style.name);
          setSelectedSubCat(res.data.data.product_category.name);
          setOrganic(res.data.data.is_organic);
          setProductImage(res.data.data.product_image);
          setLabelImage(res.data.data.label_image)
          setCurrentCode(res.data.data.barcode_image_url)
        } else {
          toast.error(
            "Could not fetch product information. Please try again later.",
            { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
          );
        }
      })
      .catch((error) => {
        if(error.message !== "revoke"){
          toast.error(
            "Could not fetch product information. Please try again later.",
            { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
          );
        }
      });
    }

    
  }, []);

  return (
    <div class="container-fluid page-wrap product-detail h-100">
      <div class="row">
        <Sidebar userType={"supplier"} />

        <div class="col main p-0">
          <Header title={t("supplier.product_management.view.title")} />
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
                        <p>{productName}</p>
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
                          disabled
                        ></textarea>
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
                          disabled
                        ></textarea>
                      </div>
                      <div className="row mx-0">
                        <div className="col-sm-6 px-0 ps-sm-0 pe-sm-3">
                          <div className="mb-3">
                            <label className="form-label">
                              {t("supplier.product_management.add.style")}
                            </label>
                            <p>{selectedStyle}</p>
                            <div class="form-check mt-2">
                              <input
                                class="form-check-input me-2"
                                type="checkbox"
                                disabled
                                checked={organic === "1" ? true : false}
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
                            <p>{selectedSubCat}</p>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">
                              {t("supplier.product_management.add.percentage")}
                            </label>
                            <p>{alcohol}</p>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">
                              {t("supplier.product_management.add.format")}
                            </label>
                            <p>{selectedFormat}</p>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Barcode</label>
                            <div>
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
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 px-0 pe-sm-0 ps-sm-3">
                          <div className="row mb-3">
                            <div className="col-sm-6">
                              <label className="form-label">
                                {"Lable Image"}
                              </label>
                              <>
                                <div className="mb-3  position-relative">
                                  <div className="productImg min-square-width top-image border mb-3">
                                    <img src={labelImage === "" || labelImage === null ? noImage : labelImage}></img>
                                  </div>
                                </div>
                              </>
                            </div>

                            <div className="col-sm-6">
                              <label className="form-label">
                                {"Product Image"}
                              </label>
                              <>
                                <div className="mb-3 position-relative">
                                  <div className="productImg prodtImg min-square-width border  mb-3 ">
                                    <img src={productImage === "" || productImage === null ? noImage : productImage}></img>
                                  </div>
                                </div>
                              </>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          {t("supplier.product_management.add.loblaws")}
                        </label>
                        <p>{lowbla}</p>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          {t("supplier.product_management.add.metro")}
                        </label>
                        <p>{metro}</p>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          {t("supplier.product_management.add.sobeys")}
                        </label>
                        <p>{showbay}</p>
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
                          onClick={() =>
                            hasPermission(PRODUCT_EDIT) ? navigate(
                              `/supplier/product-management/edit-product/${product_id}`
                            ) : toast.warn(
                              "You do not have permission to add/edit product.",
                              { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
                            )
                          }
                        >
                          {t("supplier.product_management.view.edit_btn")}
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
    </div>
  );
};

export default ProductDetail;
