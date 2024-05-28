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
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  decreaseQuantity,
  clearCart,
} from "../../../redux/cartSlice";
import { useTranslation } from "react-i18next";
import axios from "axios";

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
  // console.log(cartItems,"cartItems")
  const dispatch = useDispatch();

  const [supplierList, setSupplierList] = useState([]);

  const allSupplierList = [
    { id: 1, imgSource: "https://picsum.photos/200", supplierName: "demo" },
    { id: 2, imgSource: "https://picsum.photos/200", supplierName: "test" },
    { id: 3, imgSource: "https://picsum.photos/200", supplierName: "test" },
    { id: 4, imgSource: "https://picsum.photos/200", supplierName: "test" },
    { id: 5, imgSource: "https://picsum.photos/200", supplierName: "test" },
    { id: 6, imgSource: "https://picsum.photos/200", supplierName: "test" },
    { id: 7, imgSource: "https://picsum.photos/200", supplierName: "demo" },
    { id: 8, imgSource: "https://picsum.photos/200", supplierName: "demo" },
    { id: 9, imgSource: "https://picsum.photos/200", supplierName: "demo" },
    { id: 10, imgSource: "https://picsum.photos/200", supplierName: "demo" },
    { id: 11, imgSource: "https://picsum.photos/200", supplierName: "demo" },
  ];

  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const location = useLocation();
  useEffect(() => {
    if (!token) {
      navigate("/retailer/login");
    }
    console.log(token);
    const searchKeyword = location.state?.search || "";

    setKeyword(searchKeyword);
  }, [token, navigate]);

  // useEffect(() => {
  //   setLoading(true);
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       permission: `marketplace-view`,
  //     },
  //   };

  //   const fetchData = async () => {
  //     try {
  //         const response = await apis.get('/supplier/getAllSupplierData', config);
  //         console.log('get all supplier----------------',response.data);
  //         setSupplierList(response.data);
  //     } catch (error) {
  //         console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchData();
  //   setLoading(false);
  //   },[]);

  useEffect(() => {
    // setSearchSupplierError("");
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "supplier-view",
      },
    };
    apis
      .get(`/retailer/suppliersAllList`, config)
      .then((res) => {
        setSupplierList(res.data.data);
        console.log("all data in market place-------------", res.data.data);
        setLoading(false);
      })
      .catch((err) => {});
  }, []);

  // useEffect(() => {
  //   setSearchSupplierError("");
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //       permission: "supplier-view",
  //     },
  //   };
  //   apis
  //     .get(`/retailer/suppliersAllList`, config)
  //     .then((res) => {
  //       setMapSupplierList(res.data.data);
  //       setSupplierList(res.data.data)
  //       console.log("all data of supplier-------------", res.data.data);
  //     })
  //     .catch((err) => {
  //     });
  // }, []);

  //   useEffect(() => {
  //     const quantities = cartItems.reduce((acc, item) => {
  //       acc[item.product_id] = item.quantity;
  //       return acc;
  //     }, {});
  //     setQuantities(quantities);
  //   }, []);

  //   useEffect(() => {
  //     const quantities = productList.reduce((acc, item) => {
  //       acc[item.id] = 1;
  //       return acc;
  //     }, {});
  //     setQuantities(quantities);
  //   }, [productList]);

  //   const handleAddToCart = (
  //     id,
  //     name,
  //     img,
  //     format_id,
  //     format_name,
  //     price,
  //     supplier_id,
  //     supplier_name,
  //     calcprice
  //   ) => {
  //     const item = {
  //       product_id: id,
  //       product_name: name,
  //       price: price,
  //       quantity: quantities[id] > 0 ? quantities[id] : 1,
  //       attributes: {
  //         product_format: {
  //           id: format_id,
  //           name: format_name,
  //         },
  //         img: img,
  //         supplier: {
  //           id: supplier_id,
  //           name: supplier_name,
  //         },
  //         calc_price: calcprice,
  //       },
  //     };

  //     dispatch(updateQuantity(item));
  //   };
  //   const handleIncrement = (itemId) => {
  //     setQuantities((prevQuantities) => ({
  //       ...prevQuantities,
  //       [itemId]: (prevQuantities[itemId] || 1) + 1,
  //     }));
  //     console.log(itemId, quantities, "itemId");
  //   };

  //   const handleDecrement = (itemId) => {
  //     setQuantities((prevQuantities) => {
  //       const quantity = prevQuantities[itemId] || 1;
  //       if (quantity > 1) {
  //         // console.log(quantity,"quantityqwertyuiop[")
  //         return {
  //           ...prevQuantities,
  //           [itemId]: quantity - 1,
  //         };
  //       }
  //       return prevQuantities;
  //     });
  //     console.log(itemId, quantities, "itemId");
  //   };
  // console.log(quantities,"qwertyuiop");

  //   const sortList = (field, order) => {
  //     const sortedList = [...productList].sort((a, b) => {
  //       const valueA = a[field].toUpperCase();
  //       const valueB = b[field].toUpperCase();

  //       if (valueA < valueB) {
  //         return order === "asc" ? -1 : 1;
  //       }
  //       if (valueA > valueB) {
  //         return order === "asc" ? 1 : -1;
  //       }
  //       return 0;
  //     });

  //     setData(sortedList);
  //     setSortOrder(order);
  //   };
  //   const handleCartQuantity = (itemId, q) => {
  //     console.log(itemId, q, "cartchange");
  //     setQuantities((prevQuantities) => {
  //       const quantity = prevQuantities[itemId] || 0;
  //       if (quantity > 0) {
  //         return {
  //           ...prevQuantities,
  //           [itemId]: Number(q),
  //         };
  //       }
  //       return prevQuantities;
  //     });
  //   };
  //   console.log(quantities, "que=antitired");
  //   console.log(data);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value;
    console.log("getting value from search", term);
    setSearchTerm(term);
    const filtered = supplierList.filter(
      (item) =>
        item.company_name.toLowerCase().includes(term.toLowerCase()) ||
        item.id.toString().includes(term.toLowerCase())
    );
    setFilteredData(filtered);
  };
  const displayData = searchTerm === "" ? supplierList : filteredData;

  const supplierHander = (e) => {
    console.log("get supplier id on click", e);
  };

  return (
    <div className="container-fluid page-wrap marketplace">
      <div className="row height-inherit">
        <Sidebar userType={"retailer"} />

        <div className="col main p-0">
          <Header
            title={t("retailer.market_place.listing.title")}
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
                                  value={searchTerm}
                                  onChange={handleSearch}
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
                              <div className="filter-box"></div>
                              {/* [/Page Filter Box] */}
                            </div>
                            {/* [/Right Filter] */}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        {displayData.map((s) => {
                          return (
                            <div className="col-md-4 col-lg-3 col-xl-2 supplier-card mt-3">
                              <a
                                onClick={() =>
                                  navigate(
                                    `/retailer/marketplace?supplier_id=${s.id}`
                                  )
                                }
                              >
                                <div className="card">
                                  <div className="supplier-img">
                                    <img
                                      src={s.user_image || imageNotAvailable}
                                      onError={(e) => {
                                        e.target.src = imageNotAvailable; // Replace with the default image source
                                      }}
                                      className="card-img-top"
                                      alt=""
                                    />
                                  </div>
                                  <div className="card-title">
                                    {s.company_name}
                                  </div>
                                </div>
                              </a>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* [/Card] */}
                </div>
              </div>
              {displayData.length === 0 && (
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
