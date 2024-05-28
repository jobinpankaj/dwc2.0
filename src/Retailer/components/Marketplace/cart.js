import React, { useEffect, useState } from "react";
import modalIcon from "../../assets/images/modalIcon.png";
import productImg from "../../assets/images/product1.png";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import "../../assets/scss/dashboard.scss";
import { Link } from "react-router-dom";
import {
  // addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import useAuthInterceptor from "../../../utils/apis";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {useNavigate} from 'react-router-dom';
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const Cart = () => {
  const componentRef = useRef();
  //Handle Print function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
    console.log("Printed PDF successfully!");
    // handleClearCart();
    // navigate('retailer/supplier-list')
    }

  });

  const navigate = useNavigate();
  const apis = useAuthInterceptor();
  const { t, i18n } = useTranslation();
  const token = localStorage.getItem("retailer_accessToken");
  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems, "caytfyfdgrefyugreufhreyufgryufgrufg");
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState({});
  const [show, setShow] = useState(false);
  console.log(cartItems);
  useEffect(() => {
    const quantities = cartItems.reduce((acc, item) => {
      acc[item.product_id] = item.quantity;
      return acc;
    }, {});

    setQuantities(quantities);
  }, []);
  
  useEffect(()=>{
    setTimeout(() => {
      if(show==true)
      {
        setShow(false);
        handleClearCart();
        navigate('/retailer/supplier-list');
      }
    }, 3000);
  },[show])
  const handleIncrement = (itemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) + 1,
    }));
  };

  const handleDecrement = (itemId) => {
    setQuantities((prevQuantities) => {
      const quantity = prevQuantities[itemId] || 0;
      if (quantity > 0) {
        return {
          ...prevQuantities,
          [itemId]: quantity - 1,
        };
      }
      return prevQuantities;
    });
  };
  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleClearCart = (itemId) => {
    dispatch(clearCart(itemId));
  };
  const handleOrder = () => {
    const cart_items = cartItems.map((item) => {
      const orderObj = {
        product_id: item.product_id,
        supplier_id: item.attributes.supplier.id,
        quantity: item.quantity,
      };
      return orderObj;
    });
    console.log(cart_items);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "marketplace-edit",
        accept: "application/json",
      },
    };
    apis
      .post(
        "retailer/createOrderByRetailer",
        { cart_items: cart_items },
        config
      )
      .then((res) => {
        if (res.data.success === true) {
          setShow(true);
          // handleClearCart();
        } else {
          toast.error(res.data.data.message, {
            autoClose: 1000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((err) => {
        if (err.message !== "revoke") {
          toast.error(t("error_message.something_went_wrong"), {
            autoClose: 1000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };
  const handleAddToCart = (item) => {
    console.log(item, "vrdfvyugrduvdbrb");
    console.log(quantities);

    const updatedItem = { ...item, quantity: quantities[item.product_id] };
    console.log(updatedItem, "updated item");

    dispatch(updateQuantity(updatedItem));
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

  // const totalPrice = () => {
  //   if (cartItems.length){

  //     return cartItems.reduce((accumulator, currentValue) =>{
  //       return (
  //           (accumulator?.unit_price * accumulator?.quantity || 0) +
  //           (currentValue?.unit_price * currentValue?.quantity || 0)
  //       );
  //   }).toFixed(2);

  // };
  // }

  const totalPrice = () => {
    let total = 0
    // if (cartItems.length) {
       total = cartItems.reduce((accumulator, currentValue) => {
        // const accumulatorTotal =
        //   accumulator?.unit_price * accumulator?.quantity || 0;
        const currentValueTotal =
          currentValue?.unit_price * currentValue?.quantity || 0;
        return accumulator + currentValueTotal;
      },0);
      return total?.toFixed(2);
    // } else {
    //   return "0.00"; // or any default value if cartItems is empty
    // }
  };

  // const totalPrice = (arr) => {
  //   const total = arr.reduce((accumulator, currentValue) => {
  //     const accumulatorTotal = (accumulator?.product?.pricing?.unit_price * accumulator?.quantity) || 0;
  //     const currentValueTotal = (currentValue?.product?.pricing?.unit_price * currentValue?.quantity) || 0;
  //     return accumulatorTotal + currentValueTotal;
  //   });
  //   return total.toFixed(2);
  // };

  return (
    <>
      <div className="container-fluid page-wrap cart">
        <div className="row height-inherit">
          <Sidebar userType={"retailer"} />

          <div className="col main p-0">
            <Header title={t("retailer.market_place.cart.title")} />
            <div className="container-fluid page-content-box px-3 px-sm-4">
              <div className="row mb-4">
                <div className="col-sm-12 col-xl-12 col-xxl-11">
                  <div className="row">
                    <div ref={componentRef} id="toPrint" className="col-sm-8">
                      {/* [Cart Tile] */}
                      {cartItems?.map((item) => {
                        console.log(item, "wjfvreyufguifhreuifhrejkfref");
                        return (
                          <div className="card cartTile mb-4">
                            <div className="card-body p-4">
                              <div className="row">
                                <div className="col-sm-4 mb-3 mb-sm-0">
                                  <div className="prodDetailImg h-100">
                                    <img
                                      src={item?.attributes?.img}
                                      className="object-fit-cover rounded w-100 h-100"
                                    />
                                  </div>
                                </div>
                                <div className="col-sm-8">
                                  <div className="prodInfoBox cartInfo">
                                    <div className="w-100 d-flex justify-contents-between mb-3">
                                      <label className="prodName">
                                        {item?.product_name}
                                      </label>
                                    </div>
                                    <div className="row prodMetaInfo my-3">
                                      <div className="col-lg-6 col-12">
                                        <div className="prodOtherInfo">
                                          <div className="badge text-bg-light OtherInfo-in">
                                            <label className="OtherInfoHead">
                                            {t("retailer.market_place.cart.supplier")}
                                            </label>
                                            <div className="OtherInfoDesc">
                                              {item?.attributes?.user_profile?.company_name}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-6 col-12">
                                        <label className="metaHeadSecondary">
                                          {t(
                                            "retailer.market_place.cart.format"
                                          )}
                                        </label>
                                        <div className="metaDescSecondary">
                                          {
                                            item?.attributes?.product_format
                                              ?.name
                                          }
                                        </div>
                                      </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                      <div className="col-12 d-flex align-items-center gap-2">
                                        <div className="priceBox">
                                          {`$ ${(
                                            item?.unit_price *
                                            quantities[item?.product_id]
                                          ).toFixed(2)}`}
                                          {/* {`$ ${(item?.attributes?.product_format?.unit*item?.attributes?.price*quantities[product.id]).toFixed(2)}`} */}
                                        </div>
                                        <div className="qty-box d-flex flex-row flex-nowrap align-items-center justify-content-center gap-1">
                                          <button
                                            class="btn btn-purple rounded-circle d-flex align-items-center justify-content-center"
                                            type="button"
                                            onClick={() =>
                                              handleDecrement(item?.product_id)
                                            }
                                          >
                                            {" "}
                                            -{" "}
                                          </button>
                                          <input
                                            type="text"
                                            class="form-control rounded-0"
                                            value={quantities[item?.product_id]}
                                            onChange={(e) =>
                                              handleCartQuantity(
                                                item.product_id,
                                                e.target.value
                                              )
                                            }
                                          />
                                          <button
                                            class="btn btn-purple rounded-circle"
                                            type="button"
                                            onClick={() =>
                                              handleIncrement(item.product_id)
                                            }
                                          >
                                            +
                                          </button>
                                        </div>
                                        <button
                                          class="btn btn-purple rounded-pill btn-sm"
                                          type="button"
                                          onClick={() => handleAddToCart(item)}
                                        >
                                          {t(
                                            "retailer.market_place.cart.update_quantity"
                                          )}
                                        </button>
                                      </div>
                                      <div className="col-12">
                                        <button
                                          class="btn btn-sm btn-purple rounded-pill mt-4 w-auto"
                                          type="button"
                                          onClick={() =>
                                            handleRemoveFromCart(
                                              item?.product_id
                                            )
                                          }
                                        >
                                          {t(
                                            "retailer.market_place.cart.remove_from_cart"
                                          )}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {/* [/Cart Tile] */}
                      {!cartItems.length < 1 && (
                        <button
                          class="btn btn-sm fa-10x btn-purple rounded-pill"
                          type="button"
                          onClick={() => handleClearCart()}
                        >
                          {t("retailer.market_place.cart.clear_cart")}
                        </button>
                      )}
                    </div>
                    {cartItems.length > 0 && (
                      <div className="col-sm-4">
                        <div className="card cartTotalBox">
                          <div className="card-body">
                            <div className="prodDetailActions">
                              <div className="actionBoxIn">
                                <div className="badge text-bg-light OtherInfo-in">
                                  <label>
                                    {t(
                                      "retailer.market_place.cart.total_price_to_pay"
                                    )}
                                  </label>
                                  <div className="price-box">
                                    ${" "}{totalPrice()}
                                  </div>
                                </div>
                              </div>
                              <div className="actionBoxIn ctaBox gap-2 text-center">
                                <a
                                  onClick={() => handleOrder()}
                                  className="btn btn-sm btn-purple w-auto"
                                >
                                  {t("retailer.market_place.cart.place_order")}
                                </a>
                                <Link
                                  to={"/retailer/marketplace"}
                                  className="d-inline-block"
                                >
                                  {t("retailer.market_place.cart.go_back")}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {cartItems.length < 1 && (
                    <div className="text-center">
                      <p className="fs-4">
                        {t("retailer.market_place.cart.no_items_in_cart")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* [Modal] */}
      {/* <div class="modal fade" id="orderPlacedModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true" se>
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content p-3">
            <div class="modal-header border-0">
              <h5 class="modal-title text-center">
                <img src={modalIcon} />
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center">
              Your Order (#RW1233) has been placed successfully for the approval
            </div>
          </div>
        </div>
      </div> */}
      <Modal
        className="modal fade"
        show={show}
        centered
        onHide={() => {
          setShow(false);
          handleClearCart();
          navigate('/retailer/supplier-list');
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <img src={modalIcon} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("retailer.market_place.cart.order_successfully_placed")}
          <button class="btn btn-purple rounded-pill btn-sm"
            type="button" onClick={handlePrint}>{t("retailer.market_place.cart.print")}</button>
        </Modal.Body>
      </Modal>
      {/* [/Modal] */}
    </>
  );
};

export default Cart;

