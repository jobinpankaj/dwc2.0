import React, { useEffect, useState } from "react";
import bottle from "../../assets/images/bottle.png";
import infoVector from "../../assets/images/info-Vector.png";
import useAuthInterceptor from "../../../utils/apis";

import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import { useTranslation } from "react-i18next";
import "../../assets/scss/dashboard.scss";
import { toast } from "react-toastify";
import { useParams, Link, useNavigate } from "react-router-dom";
// import { useHistory } from 'react-router-dom';

const Receive = () => {
  const navigate = useNavigate();
  const apis = useAuthInterceptor();
  const { t, i18n } = useTranslation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [products, setProducts] = useState([]);
  const [recieveList, setRecieveList] = useState();
  const [senderId, setSenderId] = useState("");
  const [receiverId, setreceiverId] = useState("");
  const [updateInventory, setUpdateInventory] = useState(false);
  const [transfer, setTransfer] = useState({});
  const token = localStorage.getItem("distributor_accessToken");
  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const { id } = useParams();

  const updateReceiver = (e) => {
    e.preventDefault();
    // //sender:9
    // recepient:24
    // products[1][product_id]:1
    // products[1][batch]:PR12344
    // //products[1][received]:5
    // //products[1][broken]:1
    // products[1][inventory_id]:15

    // let newProduct = []
    // for(let i =0 ; i<products.length; i++){
    //   let newObj = {
    //     products[i][broken]:products[i].broken,
    //   }
    // }

    let transferArr = [];
    for (let i = 0; i < products.length; i++) {
      let newObj = {
        product_id: products[i].product_id,
        batch: products[i].batch,
        received: products[i].received,
        broken: products[i].broken,
        inventory_id: products[i].inventory_id,
      };
      transferArr.push(newObj);
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "inventory-edit",
      },
    };

    const bodyData = {
      sender: senderId,
      recepient: receiverId,
      products: transferArr,
    };
    console.log(bodyData, "bodyData");

    apis
      .post(`distributor/inventoryRecieve/${id}/update`, bodyData, config)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });

          navigate("/distributor/inventory-management");
        } else {
          toast.error("Could not update data. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        if(error.message !== "revoke"){
        toast.error("Could not update data. Please try again later.", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      });
  };
  
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "supplier-view",
      },
    };
    apis
      .get("distributor/getLinkedSuppliers", config)
      .then((res) => {
        console.log(res);
        setTransfer(res.data.data);
      })
      .catch((err) => {
        if(err.message !== "revoke"){
        console.log(err);
        toast.error(err.response.data.message, {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      });
  }, [token]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "inventory-view",
      },
    };

    apis
      .get(`distributor/inventoryRecieve/${id}`, config)
      .then((res) => {
        if (res.data.success === true) {
          setRecieveList(res.data.data);
          const product = res.data.data.transfer_products.map((ele, i) => {
            return { ...ele, received:ele.broken==0?ele.send:ele.received };
          });

          setSenderId(res.data.data.sender);
          setreceiverId(res.data.data.recipient);
          setProducts(product);
        } else {
          toast.error(
            "Could not fetch inventory list. Please try again later.",
            { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
          );
        }
      })
      .catch((err) => {
        if(err.message !== "revoke"){
        toast.error("Could not fetch inventory list. Please try again later.", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      });
  }, [updateInventory]);

  // const handleCancelClick = () => {
  //   history.push("/distributor/inventory-management");
  // };

  //Received
  const incrementReceivedQuantity = (productId) => {
    // console.log(productId,"productIdIncerment")
    const updatedProducts = products.map((product) =>
      product.id === productId && product.broken > 0
        ? {
            ...product,
            received: product.received + 1,
            broken: product.broken - 1,
          }
        : product
    );
    setProducts(updatedProducts);
    // console.log(updatedProducts,"productIdIncerment1")
  };

  const decrementReceivedQuantity = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId && product.received > 0
        ? {
            ...product,
            received: product.received - 1,
            broken: product.broken + 1,
          }
        : product
    );
    setProducts(updatedProducts);
    // console.log(updatedProducts,"productIdIncerment")
  };

  //Broken
  const incrementBrokenQuantity = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId && product.received > 0
        ? {
            ...product,
            broken: product.broken + 1,
            received: product.received - 1,
          }
        : product
    );
    setProducts(updatedProducts);
  };

  const decrementBrokenQuantity = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId && product.broken > 0
        ? {
            ...product,
            broken: product.broken - 1,
            received: product.received + 1,
          }
        : product
    );
    setProducts(updatedProducts);
  };

  //Received
  // const incrementReceivedQuantity = (productId) => {
  //   // console.log(productId,"productIdIncerment")
  //   const updatedProducts = products.map((product) =>{
  //     if (product.id === productId && product.broken > 0) {
  //       // Increment received by 1 and decrement broken by 1
  //       return { ...product, received: product.received + 1, broken: product.broken - 1 };
  //     }
  //     return product;
  //   });
  //   setProducts(updatedProducts);
  //   // console.log(updatedProducts,"productIdIncerment1")
  // };

  // const decrementReceivedQuantity = (productId) => {
  //   const updatedProducts = products.map((product) =>{
  //     if (product.id === productId && product.received > 0) {
  //       // Decrement received by 1 and increment broken by 1
  //       return { ...product, received: product.received - 1, broken: product.broken + 1 };
  //     }
  //     return product;
  //   });
  //   setProducts(updatedProducts);
  //   // console.log(updatedProducts,"productIdIncerment")
  // };

  // //Broken
  // const incrementBrokenQuantity = (productId) => {
  //   const updatedProducts = products.map((product) =>{
  //     if (product.id === productId && product.received > 0) {
  //       // Increment broken by 1 and decrement received by 1
  //       return { ...product, broken: product.broken + 1, received: product.received - 1 };
  //     }
  //     return product;
  //   });
  //   setProducts(updatedProducts);
  // };

  // const decrementBrokenQuantity = (productId) => {
  //   const updatedProducts = products.map((product) =>{
  //     if (product.id === productId && product.broken > 0) {
  //       // Decrement broken by 1 and increment received by 1
  //       return { ...product, broken: product.broken - 1, received: product.received + 1 };
  //     }
  //     return product;
  //   });
  //   setProducts(updatedProducts);
  // };

  return (
    <div class="container-fluid page-wrap inventory-manage">
      <div class="row height-inherit">
        <Sidebar userType={"distributor"} />

        <div class="col main p-0">
          <Header
            title="Inventory Detail form producer-1"
            updateSidebar={updateSidebar}
          />
          <div class="container-fluid page-content-box px-3 px-sm-4">
            <div class="row">
              <div class="col">
                <form>
                  {/* [Card] */}
                  <div className="card mb-4">
                    <div className="card-body">
                      <div className="row">
                        <div className="col mb-3">
                          <label className="form-label">
                            {t("distributor.create_transfer.sender")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            readOnly
                            value={recieveList?.senderName}
                          />
                        </div>
                        <div className="col">
                          <label className="form-label">
                            {t("distributor.create_transfer.recipient")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            readOnly
                            value={recieveList?.recipentName}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* [/Card] */}

                  <div
                    class="alert alert-purple d-flex align-items-center"
                    role="alert"
                  >
                    <img className="icon me-2" src={infoVector} />
                    {t(
                      "distributor.create_transfer.the_product_will_be_available"
                    )}
                  </div>

                  {/* [Card] */}
                  <div className="card mb-4">
                    <div className="card-body p-0">
                      <div className="row">
                        <div className="col">
                          <div className="table-responsive">
                            <table class="table m-0">
                              <thead>
                                <tr>
                                  <th scope="col">
                                    {t("distributor.create_transfer.product")}
                                  </th>
                                  <th scope="col">
                                    {t("distributor.create_transfer.received")}
                                  </th>
                                  <th scope="col">
                                    {t("distributor.create_transfer.broken")}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {recieveList?.transfer_products.map(
                                  (ele, i) => {
                                    return (
                                      <>
                                        <tr>
                                          <td>
                                            <div class="prodInfo d-flex">
                                              <div class="prod-img p-2">
                                                <img
                                                  src={
                                                    ele.product?.product_image
                                                  }
                                                  className="img-fluid"
                                                />
                                              </div>
                                              <div class="desc d-flex flex-column align-items-start">
                                                <div className="proName">
                                                  {ele.product?.product_type}
                                                </div>
                                                <div className="prodMeta badge text-bg-light rounded-pill">
                                                  {
                                                    ele.product?.product_format
                                                      ?.name
                                                  }
                                                </div>
                                                <div className="prodQTY">
                                                  Quantity:{ele?.send}
                                                </div>
                                              </div>
                                            </div>
                                          </td>
                                          <td class="">
                                            <div className="qty-box hstack gap-3">
                                              <button
                                                class="btn btn-purple rounded-circle d-flex align-items-center justify-content-center"
                                                type="button"
                                                onClick={() =>
                                                  decrementReceivedQuantity(
                                                    ele.id
                                                  )
                                                }
                                              >
                                                -
                                              </button>
                                              <input
                                                type="text"
                                                class="form-control rounded-0"
                                                value={
                                                  products[i]?.broken == 0
                                                    ? ele?.send
                                                    : products[i]?.received
                                                }
                                              />
                                              <button
                                                class="btn btn-purple rounded-circle  d-flex align-items-center justify-content-center"
                                                type="button"
                                                onClick={() =>
                                                  incrementReceivedQuantity(
                                                    ele.id
                                                  )
                                                }
                                              >
                                                +
                                              </button>
                                            </div>
                                          </td>
                                          <td>
                                            <div className="qty-box hstack gap-3">
                                              <button
                                                class="btn btn-purple rounded-circle d-flex align-items-center justify-content-center"
                                                type="button"
                                                onClick={() =>
                                                  decrementBrokenQuantity(
                                                    ele.id
                                                  )
                                                }
                                              >
                                                -
                                              </button>
                                              <input
                                                type="text"
                                                class="form-control rounded-0"
                                                value={products[i]?.broken}
                                              />
                                              <button
                                                class="btn btn-purple rounded-circle  d-flex align-items-center justify-content-center"
                                                type="button"
                                                onClick={() =>
                                                  incrementBrokenQuantity(
                                                    ele.id
                                                  )
                                                }
                                              >
                                                +
                                              </button>
                                            </div>
                                          </td>
                                        </tr>
                                      </>
                                    );
                                  }
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* [/Card] */}

                  <div className="mb-3 hstack gap-3">
                    {/* <button className="btn btn-purple">{t("distributor.create_transfer.save")}</button> */}
                    <Link
                      // type="button"
                      to="/distributor/inventory-management"
                      className="btn btn-outline-black"
                    >
                      {t("distributor.create_transfer.cancel")}
                    </Link>
                    <button
                      className="btn btn-purple"
                      onClick={(e) => updateReceiver(e)}
                    >
                      {t("distributor.create_transfer.confirm_reception")}
                    </button>
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

export default Receive;
