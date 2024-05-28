import React, { useEffect, useState } from "react";
import productImgDetail from "../../assets/images/prodImgDetail.png";
import productImg from "../../assets/images/product1.png";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import "../../assets/scss/dashboard.scss";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useAuthInterceptor from "../../../utils/apis";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import imageNotAvailable from "../../../assets/images/Image_not_available.png";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  // decreaseQuantity,
  clearCart,
} from "../../../redux/cartSlice";
import { useTranslation } from "react-i18next";

const ProductDetails = (props) => {
  const apis = useAuthInterceptor();
  const { t, i18n } = useTranslation();
  const query = new URLSearchParams(window.location.search);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [desc, setDesc] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const product_id = query.get("product_id");
  const supplier_id = query.get("supplier_id");
  console.log('getting supplier id----------',supplier_id);
  const retailer_accessToken = localStorage.getItem("retailer_accessToken");
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  // const {supplier_id}= useParams

  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  useEffect(() => {
    const bodyData1 = {
      sub_category: product.sub_category,
    };
    const config1 = {
      headers: {
        Authorization: `Bearer ${retailer_accessToken}`,
        permission: `product-view`,
      },
    };
    apis
      .post(`getSimilarProducts`, bodyData1, config1)
      .then((res) => {
        if (res.data.success) {
          setSimilarProducts(res.data.data);
          console.log('similar product----------',res.data.data);
        } else {
          toast.error(res.response.data.message, {
            autoClose: 1000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.message !== "revoke") {
          toast.error(err.response.data.message, {
            autoClose: 1000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  }, [retailer_accessToken, product.sub_category]);
  useEffect(() => {
    if (!retailer_accessToken) {
      navigate("/retailer/login");
    }
  }, [retailer_accessToken, navigate]);
  useEffect(() => {
    // setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${retailer_accessToken}`,
        permission: `marketplace-view`,
      },
    };
    apis
      .get(
        `retailer/getProductDetail?product_id=${product_id}&supplier_id=${supplier_id}`,
        config
      )
      .then((res) => {
        console.log('filtered product by supplier id-------------',res);
        if (res.data.success) {
          setProduct(res.data.data);
          setDesc(res.data.data.description[0]);
          setLoading(false);
        } else {
          toast.error(res.response.data.message, {
            autoClose: 1000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.message !== "revoke") {
          toast.error(err.response.data.message, {
            autoClose: 1000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  }, [product_id, supplier_id, retailer_accessToken]);
  
  console.log('--------------what------------------- ',desc);

  useEffect(() => {
    const item = cartItems.find((item) => item.product_id === product.id);
    setQuantity(item?.quantity || 1);
  }, [cartItems, product.id]);

  const handleAddToCart = (id) => {
    const item = {
      product_id: id,
      product_name: product?.product_name,
      price: product?.pricing?.total_price,
      quantity: quantity,
      attributes: {
        product_format: {
          id: product?.product_format?.id,
          name: product?.product_format?.name,
        },
        img: product?.combined_image,
        supplier: {
          id: product?.user_information?.id,
          name: product?.user_information?.full_name,
        },
      },
    };
    dispatch(updateQuantity(item));
  };
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const handleDownload = () => {
    const config = {
      headers: {
        Projectlanguageid: 1,
      },
      responseType: "blob", // Add this line to receive the response as a Blob
    };

    apis
      .get(`/downloadProductBarcode/${product.id}`, config)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "barcode.pdf"); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        console.log(err);
        if (err.message !== "revoke") {
          toast.error("Something went wrong. Please try again later", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };
  return (
    <div className="container-fluid page-wrap product-details">
      <div className="row height-inherit">
        <Sidebar userType={"retailer"} />

        <div className="col main p-0">
          <Header
            // title={t("retailer.market_place.product_detail.title")}
            title={product.product_name}
            updateSidebar={updateSidebar}
          />
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
              <div className="row mb-4">
                <div className="col">
                  {/* [Card] */}
                  <div className="card">
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col-sm-12 col-xl-4 mb-3 mb-xl-0">
                          <div className="prodDetailImg text-center">
                            <img
                              src={product.combined_image || imageNotAvailable}
                              onError={(e) => {
                                e.target.src = imageNotAvailable; // Replace with the default image source
                              }}
                              className="card-img-top"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="col-sm-12 col-xl-8">
                          <div className="prodInfoBox">
                            <label className="prodHeadMain">
                              {t("retailer.market_place.product_detail.about")}
                            </label>
                            <div className="prodDesc">
                              <p>{desc?.description}</p>
                            </div>
                            <div className="row prodMetaInfo my-3">
                              <div className="col-6 col-sm-3">
                                <label className="metaHeadSecondary">
                                  {t(
                                    "retailer.market_place.product_detail.product"
                                  )}
                                </label>
                                <div className="metaDescSecondary">
                                  {product.product_type}
                                </div>
                              </div>
                              <div className="col-6 col-sm-3">
                                <label className="metaHeadSecondary">
                                  {t(
                                    "retailer.market_place.product_detail.alcohol"
                                  )}
                                </label>
                                <div className="metaDescSecondary">
                                  {product.alcohol_percentage}%
                                </div>
                              </div>
                              <div className="col-6 col-sm-3">
                                <label className="metaHeadSecondary">
                                  {t(
                                    "retailer.market_place.product_detail.format"
                                  )}
                                </label>
                                <div className="metaDescSecondary">
                                  {product.product_format.name}
                                </div>
                              </div>
                              <div className="col-6 col-sm-3">
                                <label className="metaHeadSecondary">
                                  {t(
                                    "retailer.market_place.product_detail.style"
                                  )}
                                </label>
                                <div className="metaDescSecondary">
                                  {product.product_style.name}
                                </div>
                              </div>
                            </div>
                            <hr />
                            <div className="w-100 prodOtherInfo">
                              <div className="badge text-bg-light OtherInfo-in">
                                <label className="OtherInfoHead">
                                  {t(
                                    "retailer.market_place.product_detail.producer"
                                  )}
                                </label>
                                <div className="OtherInfoDesc text-uppercase">
                                  {product?.user_profile?.company_name}
                                </div>
                              </div>
                              {/* <div className="badge text-bg-light OtherInfo-in">
                                <label className="OtherInfoHead">Distributor</label>
                                <div className="OtherInfoDesc">Distributor 1</div>
                              </div> */}
                              <div className="badge text-bg-light OtherInfo-in">
                                <label className="OtherInfoHead">
                                  {t(
                                    "retailer.market_place.product_detail.suggested_retail_price"
                                  )}
                                </label>
                                <div className="OtherInfoDesc">
                                  $
                                  {product.pricing.retail_unit_price
                                    ? product.pricing.retail_unit_price
                                    : product.pricing.total_price}
                                </div>
                              </div>
                            </div>
                          </div>
                          {product.barcode_image_url !== null &&
                            product.barcode_image_url !== "" && (
                              <div className="mt-2">
                                <img
                                  src={
                                    product.barcode_image_url ||
                                    imageNotAvailable
                                  }
                                  height={200}
                                  onError={(e) => {
                                    e.target.src = imageNotAvailable; // Replace with the default image source
                                  }}
                                  className="card-img-top"
                                  alt=""
                                />
                                <button
                                  onClick={handleDownload}
                                  className="btn btn-purple"
                                >
                                  Download
                                </button>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* [/Card] */}
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-sm-5 mb-4 mb-sm-0">
                  {/* [Card] */}
                  <div className="card h-100">
                    <div className="card-body p-4">
                      <div className="prodOtherOptions">
                        <div className="dropdownOption mb-4">
                          <label htmlFor="">
                            {t(
                              "retailer.market_place.product_detail.format_option"
                            )}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            readOnly
                            value={product.product_format.name}
                          />
                        </div>
                        <div className="w-100 prodOtherInfo">
                          <div className="badge text-bg-light OtherInfo-in">
                            <label className="OtherInfoHead">
                              {t(
                                "retailer.market_place.product_detail.availability"
                              )}
                            </label>
                            <div className="OtherInfoDesc">10 (Max)</div>
                          </div>
                          <div className="badge text-bg-light OtherInfo-in">
                            <label className="OtherInfoHead">
                              {t(
                                "retailer.market_place.product_detail.deposit_price_container"
                              )}
                            </label>
                            <div className="OtherInfoDesc">$0.40</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* [/Card] */}
                </div>
                <div className="col-sm-7">
                  {/* [Card] */}
                  <div className="card h-100">
                    <div className="card-body p-4">
                      <div className="prodDetailActions">
                        <div className="actionBoxIn">
                          <label htmlFor="">
                            {t(
                              "retailer.market_place.product_detail.select_quantity"
                            )}
                          </label>
                          <div className="badge text-bg-light OtherInfo-in">
                            <div className="qty-box hstack gap-2">
                              <button
                                className="btn btn-purple rounded-circle d-flex align-items-center justify-content-center"
                                type="button"
                                onClick={handleDecrement}
                              >
                                -
                              </button>
                              <input
                                type="text"
                                className="form-control rounded-0"
                                value={quantity}
                                onChange={(e) =>
                                  setQuantity(Number(e.target.value))
                                }
                                readOnly
                              />
                              <button
                                className="btn btn-purple rounded-circle  d-flex align-items-center justify-content-center"
                                type="button"
                                onClick={handleIncrement}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="actionBoxIn">
                          <label htmlFor="">
                            {t(
                              "retailer.market_place.product_detail.total_price"
                            )}
                          </label>
                          <div className="badge text-bg-light OtherInfo-in">
                            <div className="price-box">
                              {/* ${product.pricing.total_price} */}
                              {/* ${product.product_format.unit*product.pricing.total_price*quantity} */}
                              {`$ ${(
                                product?.pricing?.unit_price * quantity
                              ).toFixed(2)}`}
                              {console.log(quantity, "quantity")}
                            </div>
                          </div>
                        </div>

                        <div
                          className="actionBoxIn ctaBox"
                          style={{
                            minWidth: "fit-content",
                          }}
                        >
                          <a
                            onClick={() => handleAddToCart(product?.id)}
                            className="btn btn-sm btn-purple px-3"
                          >
                            {t(
                              "retailer.market_place.product_detail.add_to_cart"
                            )}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* [/Card] */}
                </div>
              </div>
              {/* [Similar Products] */}
              <div className="row">
                <div className="col">
                  <div className="card">
                    <div className="card-body p-4">
                      <h5 className="card-title mb-3">
                        {t(
                          "retailer.market_place.product_detail.similar_products"
                        )}
                      </h5>
                      {/* [Product List] */}
                      <div className="row product-list">
                        {/* [Product Box] */}
                        {similarProducts.map((s) => (
                          <div className="col-sm-4 col-xl-3 mb-3 productBox">
                            <div className="card">
                              <a
                                onClick={() =>
                                  navigate(
                                    `/retailer/marketplace/product-details?product_id=${s?.id}&supplier_id=${s.user_id}`
                                  )
                                }
                                className="imageFix"
                              >
                                <img
                                  src={s.combined_image || imageNotAvailable}
                                  onError={(e) => {
                                    e.target.src = imageNotAvailable; // Replace with the default image source
                                  }}
                                  className="card-img-top"
                                  alt=""
                                />
                              </a>
                              <div className="card-body px-0">
                                <h5 className="card-title">
                                  {s?.user_information?.full_name}
                                </h5>
                                <h6 className="card-subtitle mb-2 text-body-secondary">
                                  {s?.product_name}
                                </h6>
                                <hr />
                                <div className="productMeta">
                                  <div className="prodInfo mb-2">
                                    Beer ({s.alcohol_percentage}%)
                                  </div>
                                  <div className="prodDesc mb-4">
                                    {s?.product_format?.name}
                                  </div>
                                  {/* <div className="distributorInfo mb-2">
                                    Distributor 1
                                  </div> */}

                                  <div className="prodPrice mb-3">
                                    ${s?.pricing?.price}
                                  </div>
                                  {/* <div className="qty-box hstack gap-3 mb-3">
                                    <label>Qty</label>
                                    <button
                                      className="btn btn-purple rounded-circle d-flex align-items-center justify-content-center"
                                      type="button"
                                    >
                                      -
                                    </button>
                                    <input
                                      type="text"
                                      className="form-control rounded-0"
                                      value="4"
                                    />
                                    <button
                                      className="btn btn-purple rounded-circle  d-flex align-items-center justify-content-center" type="button">+</button>
                                  </div> */}
                                </div>
                                {/* <a href="/retailer/marketplace/product-details" className="btn btn-purple w-100">
                                  Add to Cart
                                </a> */}
                              </div>
                            </div>
                          </div>
                        ))}
                        {/* [/Product Box] */}
                      </div>
                      {/* [/Product List] */}
                    </div>
                  </div>
                </div>
              </div>
              {/* [/Similar Products] */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
