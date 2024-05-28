import React, { useEffect, useState } from "react";

import ProductImg from "../../assets/images/prod-img.png";

import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";

import "../../assets/scss/dashboard.scss";
import useAuthInterceptor from "../../../utils/apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { useTranslation } from "react-i18next";

const ProductDetail = () => {
  const apis = useAuthInterceptor();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [desc, setDesc] = useState({});
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);
  const token = localStorage.getItem("distributor_accessToken");
  const query = new URLSearchParams(window.location.search);
  const product_id = query.get("product_id");
  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "product-view",
      },
    };
    setLoading(true);
    apis
      .get(`distributor/product/${product_id}`, config)
      .then((res) => {
        console.log(res);
        setProduct(res.data.data);
        setDesc(res.data.data.description);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if(err.message !== "revoke"){
        toast.error(err.response.data.message, {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      });
  }, [token, product_id]);
  return (
    <div class="container-fluid page-wrap product-detail">
      <div class="row height-inherit">
        <Sidebar userType={"distributor"} />

        <div class="col main p-0">
          <Header
            title={t("distributor.product_detail.title")}
            updateSidebar={updateSidebar}
          />
          {loading ? (
            <div className="d-flex justify-content-center">
              <Oval color="purple" secondaryColor="purple" />
            </div>
          ) : (
            <div class="container-fluid page-content-box px-3 px-sm-4">
              {/* [Card] */}
              <div className="card height-100">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col">
                      <form>
                        <div className="mb-3">
                          <label className="form-label">
                            {t("distributor.product_detail.product_title")}
                          </label>
                          <input
                            readOnly
                            type="text"
                            className="form-control"
                            value={`${product.product_name}`}
                          />
                        </div>
                        <div className="mb-3">
                          <div className="d-flex align-items-center justify-content-between">
                            <label className="form-label">
                              {t("distributor.product_detail.description")}
                            </label>
                            <div class="form-check form-switch d-flex align-items-center">
                              <label
                                class="form-check-label"
                                for="flexSwitchCheck1"
                              >
                                En
                              </label>
                              <input
                                class="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheck1"
                              />
                              <label
                                class="form-check-label"
                                for="flexSwitchCheck1"
                              >
                                Fr
                              </label>
                            </div>
                          </div>
                          <textarea
                            className="form-control"
                            readOnly
                            value={product.product_type}
                          ></textarea>
                        </div>
                        <div className="mb-3">
                          <div className="d-flex align-items-center justify-content-between">
                            <label className="form-label">
                              {t(
                                "distributor.product_detail.public_description"
                              )}
                            </label>
                            <div class="form-check form-switch d-flex align-items-center">
                              <label
                                class="form-check-label"
                                for="flexSwitchCheck2"
                              >
                                En
                              </label>
                              <input
                                class="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheck2"
                              />
                              <label
                                class="form-check-label"
                                for="flexSwitchCheck2"
                              >
                                Fr
                              </label>
                            </div>
                          </div>
                          <textarea
                            className="form-control"
                            readOnly
                            value={desc?.public_description}
                          ></textarea>
                        </div>
                        <div className="row mb-3 mx-0">
                          <div className="col-sm-6 px-0 ps-sm-0 pe-sm-3">
                            <div className="mb-3">
                              <label className="form-label">
                                {t("distributor.product_detail.style")}
                              </label>
                              <input
                                readOnly
                                type="text"
                                className="form-control"
                                value={`${
                                  product.product_style &&
                                  product.product_style.name
                                }`}
                              />

                              <div class="form-check mt-2">
                                <input
                                  class="form-check-input me-2"
                                  checked={
                                    product.is_organic === "1" ? true : false
                                  }
                                  readOnly
                                  type="checkbox"
                                  value=""
                                  id="organic"
                                />

                                <label class="form-check-label" for="organic">
                                  {t("distributor.product_detail.organic")}
                                </label>
                              </div>
                            </div>
                            <div className="mb-3">
                              <label className="form-label">
                                {t("distributor.product_detail.subcategory")}
                              </label>
                              <input
                                readOnly
                                type="text"
                                className="form-control"
                                value={`${
                                  product.product_category
                                    ? product.product_category.name
                                    : ""
                                }`}
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">
                                {t(
                                  "distributor.product_detail.alchohal_percentage"
                                )}
                              </label>
                              <input
                                readOnly
                                type="text"
                                className="form-control"
                                value={`${product.alcohol_percentage}%`}
                              />
                            </div>
                          </div>
                          <div className="col-sm-6 px-0 pe-sm-0 ps-sm-3">
                            <div className="mb-3 prodImg">
                              <label className="form-label">
                                {t("distributor.product_detail.product_image")}
                              </label>
                              <div className="mb-3 prodImg">
                                <img
                                  src={
                                    product.product_image
                                      ? product.product_image
                                      : ProductImg
                                  }
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="mb-3">
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="inlineRadioOptions"
                                  id="inlineRadio1"
                                  value="Lable"
                                  checked
                                />
                                <label
                                  class="form-check-label"
                                  for="inlineRadio1"
                                >
                                  {t("distributor.product_detail.label")}
                                </label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="inlineRadioOptions"
                                  id="inlineRadio2"
                                  value="Image"
                                />
                                <label
                                  class="form-check-label"
                                  for="inlineRadio2"
                                >
                                  {t("distributor.product_detail.image")}
                                </label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  id="inlineCheckbox1"
                                  value="Main Visual"
                                />
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox1"
                                >
                                  {t("distributor.product_detail.main_visual")}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <button
                            className="btn btn-purple "
                            onClick={() =>
                              navigate("/distributor/product-management")
                            }
                          >
                            {t("distributor.product_detail.cancel_button")}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* [/Card] */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
