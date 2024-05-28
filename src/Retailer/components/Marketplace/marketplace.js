import React, { useEffect, useState } from "react";
import filter from "../../assets/images/filter-icon.png";

import cart from "../../assets/images/cart.png";

import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import "../../assets/scss/dashboard.scss";
import imageNotAvailable from "../../../assets/images/Image_not_available.png";
import useAuthInterceptor from "../../../utils/apis";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from 'react-router-dom';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  decreaseQuantity,
  clearCart,
} from "../../../redux/cartSlice";
import { useTranslation } from "react-i18next";

const Marketplace = () => {
  const apis = useAuthInterceptor();
  const { t, i18n } = useTranslation();
  const cartList = [1, 2, 3, 4];
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantities, setQuantities] = useState({ 0: 1 });
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("retailer_accessToken");
  const [showSidebar, setShowSidebar] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const [supplierProduct, setSupplierProduct] = useState([])
  const [searchProd,setSearchProd]=useState("")
  const [prodList,setProdList]=useState([])

 


  // console.log(cartItems,"cartItems")
  const dispatch = useDispatch();
  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const location = useLocation();
  const { pathname, search } = location;
  
  const supplier_id= search.split('=')
  console.log('=======================',supplier_id[1]);

  useEffect(() => {
    if (!token) {
      navigate("/retailer/login");
    }
    const searchKeyword = location.state?.search || "";

    setKeyword(searchKeyword);
  }, [token, navigate]);
  useEffect(() => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: `marketplace-view`,
      },
    };
    apis
      .post(`retailer/getSupplierProductList?search=${keyword}`, {}, config)
      .then((res) => {
        setProductList(res.data.data);
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        if (err.message !== "revoke") {
          toast.error(t("error_message.something_went_wrong"), {
            autoClose: 1000,
            position: toast.POSITION.TOP_CENTER,
          });
          setLoading(false);
        }
      });
  }, [keyword, token]);

  // get all product of a supplier
  useEffect(() => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: `marketplace-view`,
      },
    };
    apis
      .get(`retailer/getSupplierAllProduct/${supplier_id[1]}`, config)
      .then((res) => {
        console.log('right data of a supplier---------------',res.data.data);
        setSupplierProduct(res.data.data);
        setProdList(res.data.data)
        // setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        if (err.message !== "revoke") {
          toast.error(t("error_message.something_went_wrong"), {
            autoClose: 1000,
            position: toast.POSITION.TOP_CENTER,
          });
          setLoading(false);
        }
      });
  }, [keyword, token]);

  useEffect(() => {
    const quantities = cartItems.reduce((acc, item) => {
      acc[item.product_id] = item.quantity;
      return acc;
    }, {});
    setQuantities(quantities);
  }, []);

  useEffect(() => {
    const quantities = productList.reduce((acc, item) => {
      acc[item.id] = 1;
      return acc;
    }, {});
    setQuantities(quantities);
  }, [productList]);

  const handleAddToCart = (
    id,
    name,
    img,
    format_id,
    format_name,
    price,
    supplier_id,
    supplier_name,
    calcprice
  ) => {
    const item = {
      product_id: id,
      product_name: name,
      price: price,
      quantity: quantities[id] > 0 ? quantities[id] : 1,
      attributes: {
        product_format: {
          id: format_id,
          name: format_name,
        },
        img: img,
        supplier: {
          id: supplier_id,
          name: supplier_name,
        },
        calc_price: calcprice,
      },
    };

    dispatch(updateQuantity(item));
  };
  const handleIncrement = (itemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 1) + 1,
    }));
    console.log(itemId, quantities, "itemId");
  };

  const handleDecrement = (itemId) => {
    setQuantities((prevQuantities) => {
      const quantity = prevQuantities[itemId] || 1;
      if (quantity > 1) {
        // console.log(quantity,"quantityqwertyuiop[")
        return {
          ...prevQuantities,
          [itemId]: quantity - 1,
        };
      }
      return prevQuantities;
    });
    console.log(itemId, quantities, "itemId");
  };
  // console.log(quantities,"qwertyuiop");

  const sortList = (field, order) => {
    const sortedList = [...productList].sort((a, b) => {
      const valueA = a[field].toUpperCase();
      const valueB = b[field].toUpperCase();

      if (valueA < valueB) {
        return order === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });

    setData(sortedList);
    setSortOrder(order);
  };
  const handleCartQuantity = (itemId, q) => {
    console.log(itemId, q, "cartchange");
    setQuantities((prevQuantities) => {
      const quantity = prevQuantities[itemId] || 0;
      if (quantity > 0) {
        return {
          ...prevQuantities,
          [itemId]: Number(q),
        };
      }
      return prevQuantities;
    });
  };
  console.log(quantities, "que=antitired");
  console.log('getting data from marketplace',data);
  const handleProductSearch=(e)=>{

    setSearchProd(e)
    const matchingStrings=prodList.filter(x=>{
      return x.product_name.toLowerCase().includes(e.toLowerCase())
    })
    setSupplierProduct(matchingStrings)
  }

  return (
    <div className="container-fluid page-wrap marketplace">
      <div className="row height-inherit">
        <Sidebar userType={"retailer"} />

        <div className="col main p-0">
          <Header
            title={supplierProduct[0]?.user_information?.full_name}
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
              <div className="row mb-3">
                <div className="col">
                  <div className="filter-row page-top-filter justify-content-end"></div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  {/* [Card] */}
                  <div className="card user-card height-100">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <div className="card-top-filter-box p-3">
                            {/* [Table Search] */}
                            <div className="search-table">
                              <div className="form-group">
                              <input
                                  type="text"
                                  className="search-input"
                                  value={searchProd}
                                  onChange={(e)=>{handleProductSearch(e.target.value)}}
                                  placeholder={t(
                                    "retailer.market_place.listing.search_here"
                                  )}
                                />
                              </div>
                            </div>
                            {/* [/Table Search] */}

                            {/* [Right Filter] */}
                            <div className="filter-row text-end">
                              {/* [Page Filter Box] */}
                              <div className="filter-box">
                                {/* [Sort By] */}
                                {/* <div class="dropdown right-filter">
                                  <button
                                    type="button"
                                    class="btn dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    data-bs-auto-close="outside"
                                  >
                                    {t("retailer.market_place.listing.sort_by")}
                                  </button>
                                  <div class="dropdown-menu p-3 ">
                                    <div class="mb-3">
                                      <ul class="list-group list-group-flush">
                                        <li class="list-group-item">
                                          <div class="form-check">
                                            <input
                                              class="form-check-input"
                                              type="radio"
                                              name="flexRadioDefault"
                                              id="flexRadioDefault1"
                                              onChange={""}
                                            />
                                            <label
                                              class="form-check-label"
                                              for="flexRadioDefault1"
                                            >
                                              {t(
                                                "retailer.market_place.listing.product_asc_sort"
                                              )}
                                            </label>
                                          </div>
                                        </li>
                                        <li class="list-group-item">
                                          <div class="form-check">
                                            <input
                                              class="form-check-input"
                                              type="radio"
                                              name="flexRadioDefault"
                                              id="flexRadioDefault2"
                                            />
                                            <label
                                              class="form-check-label"
                                              for="flexRadioDefault2"
                                            >
                                              {t(
                                                "retailer.market_place.listing.product_desc_sort"
                                              )}
                                            </label>
                                          </div>
                                        </li>
                                        <li class="list-group-item">
                                          <div class="form-check">
                                            <input
                                              class="form-check-input"
                                              type="radio"
                                              name="flexRadioDefault"
                                              id="flexRadioDefault3"
                                            />
                                            <label
                                              class="form-check-label"
                                              for="flexRadioDefault3"
                                            >
                                              {t(
                                                "retailer.market_place.listing.supplier_asc_sort"
                                              )}
                                            </label>
                                          </div>
                                        </li>
                                        <li class="list-group-item">
                                          <div class="form-check">
                                            <input
                                              class="form-check-input"
                                              type="radio"
                                              name="flexRadioDefault"
                                              id="flexRadioDefault4"
                                            />
                                            <label
                                              class="form-check-label"
                                              for="flexRadioDefault4"
                                            >
                                              {t(
                                                "retailer.market_place.listing.supplier_desc_sort"
                                              )}
                                            </label>
                                          </div>
                                        </li>
                                        <li class="list-group-item">
                                          <div class="form-check">
                                            <input
                                              class="form-check-input"
                                              type="radio"
                                              name="flexRadioDefault"
                                              id="flexRadioDefault5"
                                            />
                                            <label
                                              class="form-check-label"
                                              for="flexRadioDefault5"
                                            >
                                              {t(
                                                "retailer.market_place.listing.prices_desc_sort"
                                              )}
                                            </label>
                                          </div>
                                        </li>
                                        <li class="list-group-item">
                                          <div class="form-check">
                                            <input
                                              class="form-check-input"
                                              type="radio"
                                              name="flexRadioDefault"
                                              id="flexRadioDefault6"
                                            />
                                            <label
                                              class="form-check-label"
                                              for="flexRadioDefault6"
                                            >
                                              {t(
                                                "retailer.market_place.listing.prices_asc_sort"
                                              )}
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                      <button
                                        type="button"
                                        class="btn btn-purple width-auto me-2"
                                      >
                                        {t(
                                          "retailer.market_place.listing.apply"
                                        )}
                                      </button>
                                      <input
                                        type="reset"
                                        class="btn btn-outline-black width-auto"
                                        value="Clear"
                                      />
                                    </div>
                                  </div>
                                </div> */}
                                {/* [/Sort By] */}
                                {/* [Cart Icon] */}
                                <a
                                  onClick={() =>
                                    navigate("/retailer/marketplace/cart")
                                  }
                                  class="cartBtn position-relative"
                                >
                                  <img src={cart} alt="Cart" />
                                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-purple">
                                    {cartItems.length}
                                    <span class="visually-hidden">
                                      {t(
                                        "retailer.market_place.listing.unread_messages"
                                      )}
                                    </span>
                                  </span>
                                </a>
                                {/* [Cart Icon] */}
                                {/* [Filter] */}
                                {/* <div class="dropdown right-filter">
                                  <button
                                    type="button"
                                    class="btn dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    data-bs-auto-close="outside"
                                  >
                                    <img src={filter} alt="" />{" "}
                                    {t("retailer.market_place.listing.filter")}
                                  </button>
                                  <form class="dropdown-menu p-3 ">
                                    <div class="mb-3">
                                      <label class="form-label">
                                        {t(
                                          "retailer.market_place.listing.product_type"
                                        )}
                                      </label>
                                      <select className="form-select">
                                        <option selected disabled>
                                          {t(
                                            "retailer.market_place.listing.choose_product_type"
                                          )}
                                        </option>
                                        <option value="">Product 1</option>
                                        <option value="">Product 2</option>
                                        <option value="">Product 3</option>
                                        <option value="">Product 4</option>
                                      </select>
                                    </div>
                                    <div class="mb-3">
                                      <label class="form-label">
                                        {t(
                                          "retailer.market_place.listing.supplier"
                                        )}
                                      </label>
                                      <select className="form-select">
                                        <option selected disabled>
                                          {t(
                                            "retailer.market_place.listing.choose_supplier"
                                          )}
                                        </option>
                                        <option value="">Supplier 1</option>
                                        <option value="">Supplier 2</option>
                                        <option value="">Supplier 3</option>
                                      </select>
                                    </div>
                                    <div class="mb-3">
                                      <label class="form-label">
                                        {t(
                                          "retailer.market_place.listing.format"
                                        )}
                                      </label>
                                      <select className="form-select">
                                        <option selected disabled>
                                          {t(
                                            "retailer.market_place.listing.choose_format"
                                          )}
                                        </option>
                                        <option value="">Format 1</option>
                                        <option value="">Format 2</option>
                                        <option value="">Format 3</option>
                                      </select>
                                    </div>
                                    <div class="mb-3">
                                      <label class="form-label">
                                        {t(
                                          "retailer.market_place.listing.distributor"
                                        )}
                                      </label>
                                      <select className="form-select">
                                        <option selected disabled>
                                          {t(
                                            "retailer.market_place.listing.choose_distributor"
                                          )}
                                        </option>
                                        <option value="">Distributor 1</option>
                                        <option value="">Distributor 2</option>
                                        <option value="">Distributor 3</option>
                                      </select>
                                    </div>
                                    <div class="mb-3">
                                      <div className="w-100">
                                        <label className="opacity-75">
                                          {t(
                                            "retailer.market_place.listing.products"
                                          )}
                                        </label>
                                      </div>
                                      <div class="form-check form-check-inline">
                                        <input
                                          class="form-check-input"
                                          type="checkbox"
                                          id="inlineCheckbox1"
                                          value="Invoiced"
                                        />
                                        <label
                                          class="form-check-label"
                                          for="inlineCheckbox1"
                                        >
                                          {t(
                                            "retailer.market_place.listing.available"
                                          )}
                                        </label>
                                      </div>
                                      <div class="form-check form-check-inline">
                                        <input
                                          class="form-check-input"
                                          type="checkbox"
                                          id="inlineCheckbox2"
                                          value="Expired"
                                        />
                                        <label
                                          class="form-check-label"
                                          for="inlineCheckbox2"
                                        >
                                          {t(
                                            "retailer.market_place.listing.on_sale"
                                          )}
                                        </label>
                                      </div>
                                      <div class="form-check form-check-inline">
                                        <input
                                          class="form-check-input"
                                          type="checkbox"
                                          id="inlineCheckbox3"
                                          value="Paid"
                                        />
                                        <label
                                          class="form-check-label"
                                          for="inlineCheckbox3"
                                        >
                                          {t(
                                            "retailer.market_place.listing.new"
                                          )}
                                        </label>
                                      </div>
                                      <div class="form-check form-check-inline">
                                        <input
                                          class="form-check-input"
                                          type="checkbox"
                                          id="inlineCheckbox3"
                                          value="Paid"
                                        />
                                        <label
                                          class="form-check-label"
                                          for="inlineCheckbox3"
                                        >
                                          {t(
                                            "retailer.market_place.listing.alcohol_free"
                                          )}
                                        </label>
                                      </div>
                                      <div class="form-check form-check-inline">
                                        <input
                                          class="form-check-input"
                                          type="checkbox"
                                          id="inlineCheckbox3"
                                          value="Paid"
                                        />
                                        <label
                                          class="form-check-label"
                                          for="inlineCheckbox3"
                                        >
                                          {t(
                                            "retailer.market_place.listing.recently_ordered"
                                          )}
                                        </label>
                                      </div>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                      <button
                                        type="button"
                                        class="btn btn-purple width-auto me-2"
                                      >
                                        {t(
                                          "retailer.market_place.listing.apply"
                                        )}
                                      </button>
                                      <input
                                        type="reset"
                                        class="btn btn-outline-black width-auto"
                                        value="Clear"
                                      />
                                    </div>
                                  </form>
                                </div> */}
                                {/* [/Filter] */}
                              </div>
                              {/* [/Page Filter Box] */}
                            </div>
                            {/* [/Right Filter] */}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          {/* [Product List] */}
                          <div className="row product-list m-0">
                            {/* [Product Box] */}
                            {supplierProduct?.map((product) => (
                               <div className=" col-sm-4 col-lg-4 col-xxl-2 col-xl-3 mb-3 productBox">
                               <div class="card">
                                 <a
                                   onClick={() =>
                                     navigate(
                                       `/retailer/marketplace/product-details?product_id=${product.id}&supplier_id=${product.user_id}`
                                     )
                                   }
                                   class="imageFix text-center bg-white"
                                 >
                                   <img
                                     src={
                                       product.combined_image ||
                                       imageNotAvailable
                                     }
                                     onError={(e) => {
                                       e.target.src = imageNotAvailable; // Replace with the default image source
                                     }}
                                     className="card-img-top"
                                     alt=""
                                   />
                                 </a>
                                 <div class="card-body px-0">
                                   <h5 class="card-title">
                                     {product.product_name}
                                   </h5>
                                   <h6 class="card-subtitle text-body-secondary">
                                     {product.product_type}
                                   </h6>
                                   <hr className="my-2" />
                                   <div class="productMeta">
                                     <div className="prodInfo d-flex justify-content-between mb-3">
                                       <span>{`${product?.product_type} (${product?.alcohol_percentage}%)`}{" "}</span>
                                       <span className="prodDesc">
                                         {product?.product_format?.name}{" "}
                                       </span>
                                     </div>
                                     <div className="distributorInfo text-uppercase">
                                       {product?.user_profile?.company_name}
                                     </div>
                                     <div className="d-flex my-3 justify-content-between">
                                       <div className="">
                                         <div className="qty-box hstack p-0 gap-1">
                                           <label>
                                             {t(
                                               "retailer.market_place.listing.qty"
                                             )}
                                           </label>
                                           <button
                                             class="btn btn-purple rounded-circle d-flex align-items-center justify-content-center"
                                             type="button"
                                             onClick={() =>
                                               handleDecrement(product.id)
                                             }
                                           >
                                             -
                                           </button>
                                           <input
                                             type="text"
                                             onChange={(e) =>
                                               handleCartQuantity(
                                                 product.id,
                                                 e.target.value
                                               )
                                             }
                                             class="form-control rounded-0"
                                             value={
                                               quantities[product.id] || 1
                                             }
                                           />
                                           <button
                                             class="btn btn-purple rounded-circle  d-flex align-items-center justify-content-center"
                                             type="button"
                                             onClick={() =>
                                               handleIncrement(product.id)
                                             }
                                           >
                                             +
                                           </button>
                                         </div>
                                       </div>
                                       <div className="">
                                         <div className="prodPrice h-100 d-flex align-items-center">
                                           {`$ ${(
                                             product?.pricing?.unit_price *
                                             quantities[product.id]
                                           ).toFixed(2)}`}
                                         </div>
                                       </div>
                                     </div>
                                   </div>
                                   <a
                                     onClick={() =>
                                       handleAddToCart(
                                         product.id,
                                         product.product_name,
                                         product.combined_image,
                                         product.product_format.id,
                                         product.product_format.name,
                                         product.pricing.total_price,
                                         product.user_information.id,
                                         product.user_information.full_name,
                                         product.product_format.unit *
                                         product.pricing.total_price *
                                         quantities[product.id]
                                       )
                                     }
                                     class="btn btn-sm btn-purple w-auto"
                                   >
                                     {t(
                                       "retailer.market_place.listing.add_to_cart"
                                     )}
                                   </a>
                                 </div>
                               </div>
                             </div>
                            ))}
                          </div>
                          {/* [/Product List] */}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* [/Card] */}
                </div>
              </div>
              {supplierProduct.length === 0 && (
                <div className="text-center">
                  <p className="fs-4">
                    {t("retailer.market_place.listing.no_products_to_show")}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
