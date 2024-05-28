import React, { useEffect, useState } from "react";
import logoDark from "../../assets/images/logo-dark.svg";
import bottle from "../../assets/images/bottle.png";
import newOrder from "../../assets/images/new-order.png";
import delivery from "../../assets/images/order-delivery.svg";
import shipment from "../../assets/images/order-shipment.svg";
import orderSuccess from "../../assets/images/order-tick.svg";
import calender from "../../assets/images/calender.png";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import "../../assets/scss/dashboard.scss";
import { useNavigate, useParams } from "react-router-dom";
import useAuthInterceptor from "../../../utils/apis";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const OrderDetail = () => {
  const apis = useAuthInterceptor();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const token = localStorage.getItem("distributor_accessToken");
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState();

  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const params = useParams();

  useEffect(() => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "order-view",
      },
    };
    apis
      .get(`distributor/orderDetail/${params.orderId}`, config)
      .then((res) => {
        setLoading(false);
        setOrder(res.data.data);
      })
      .catch((err) => {
        if (err.message !== "revoke") {
          setLoading(false);
          toast.error(t("error_message.something_went_wrong"), {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  }, [token, params.orderId]);
  return (
    <div class="container-fluid page-wrap order-details">
      <div class="row height-inherit">
        <Sidebar userType={"distributor"} />

        <div class="col main p-0">
          <Header
            title={t("distributor.order_management.order_detail.title")}
            updateSidebar={updateSidebar}
          />
          {loading ? (
            <div className="d-flex justify-content-center">
              <Oval color="purple" secondaryColor="purple" />
            </div>
          ) : (
            <div class="container-fluid page-content-box px-3 px-sm-4">
              <div className="card">
                <div className="card-body">
                  <div class="tab-link-row">
                    <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link active"
                          id="value-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#details-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="value-tab-pane"
                          aria-selected="true"
                        >
                          {t(
                            "distributor.order_management.order_detail.details"
                          )}
                        </button>
                      </li>
                      {/* <li class="nav-item" role="presentation">
                                                <button class="nav-link" id="order-tab" data-bs-toggle="tab" data-bs-target="#history-msg-tab-pane" type="button" role="tab" aria-controls="order-tab-pane" aria-selected="false">{t('distributor.order_management.order_detail.history_and_message')}</button>
                                            </li>
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link" id="order-tab" data-bs-toggle="tab" data-bs-target="#document-tab-pane" type="button" role="tab" aria-controls="order-tab-pane" aria-selected="false">{t('distributor.order_management.order_detail.document')}</button>
                                            </li> */}
                    </ul>
                  </div>

                  <div class="tab-content" id="myTabContent">
                    {/* [Details Tab] */}
                    <div
                      class="tab-pane fade show active"
                      id="details-tab-pane"
                      role="tabpanel"
                      aria-labelledby="value-tab"
                      tabindex="0"
                    >
                      <div class="row mb-3">
                        <div class="col">
                          <div class="card shadow-none">
                            <div class="card-body p-0">
                              <div class="row m-0">
                                <div class="col-sm-3 d-flex justify-content-center align-items-center p-3 border-end">
                                  <img src={logoDark} className="img-fluid" />
                                </div>
                                <div class="col-sm-9 p-0">
                                  {/* [Form 1] */}
                                  <div className="row m-0">
                                    <div className="col p-3">
                                      <form>
                                        <div className="row mb-3">
                                          <div className="col-sm-4">
                                            <label className="form-label">
                                              {t(
                                                "distributor.order_management.order_detail.supplier"
                                              )}
                                            </label>
                                            <input
                                              type="text"
                                              value={
                                                order &&
                                                order.supplier_information
                                                  ?.user_profile?.company_name
                                              }
                                              readOnly
                                              className="form-control"
                                            />
                                          </div>
                                          <div className="col-sm-4">
                                            <label className="form-label">
                                              {t(
                                                "distributor.order_management.order_detail.creation"
                                              )}
                                            </label>
                                            <input
                                              type="text"
                                              value={order && order.order_date}
                                              readOnly
                                              className="form-control"
                                            />
                                          </div>
                                          <div className="col-sm-4">
                                            <label className="form-label">
                                              {t(
                                                "distributor.order_management.order_detail.order_status"
                                              )}
                                              s
                                            </label>
                                            <input
                                              type="text"
                                              value={order && order.status}
                                              readOnly
                                              className="form-control"
                                            />
                                          </div>
                                          <div className="w-100 mb-3"></div>
                                          <div className="col-sm-4">
                                            <label className="form-label">
                                              {t(
                                                "distributor.order_management.order_detail.expected_delivery_date"
                                              )}
                                            </label>
                                            <input
                                              type="text"
                                              value={
                                                order?.order_shipments
                                                  ?.expected_delivery_date
                                              }
                                              className="form-control"
                                            />
                                          </div>
                                          <div className="col-sm-8">
                                            <label className="form-label">
                                              {t(
                                                "distributor.order_management.order_detail.invoice_status"
                                              )}
                                            </label>
                                            <input
                                              type="test"
                                              className="form-control"
                                              value=""
                                            />
                                          </div>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                  {/* [/Form 1] */}

                                  {/* [Form 2] */}
                                  <div className="row m-0 bg-light py-4 border-top">
                                    <div className="col p-3">
                                      <form>
                                        <div className="form-head">
                                          {t(
                                            "distributor.order_management.order_detail.retailer"
                                          )}
                                        </div>
                                        <div className="row mb-3">
                                          <div className="col-6 col-sm-3">
                                            <label className="form-label">
                                              {t(
                                                "distributor.order_management.order_detail.name"
                                              )}
                                            </label>
                                            <input
                                              type="text"
                                              value={
                                                order &&
                                                order.retailer_information
                                                  .full_name
                                              }
                                              className="form-control"
                                            />
                                          </div>
                                          <div className="col-6 col-sm-3">
                                            <label className="form-label">
                                              {t(
                                                "distributor.order_management.order_detail.phone_number"
                                              )}
                                            </label>
                                            <input
                                              type="text"
                                              value={
                                                order &&
                                                order.retailer_information
                                                  .phone_number
                                              }
                                              className="form-control"
                                            />
                                          </div>
                                          <div className="col-6 col-sm-3">
                                            <label className="form-label">
                                              {t(
                                                "distributor.order_management.order_detail.contact_email"
                                              )}
                                            </label>
                                            <input
                                              type="text"
                                              value={
                                                order &&
                                                order.retailer_information.email
                                              }
                                              className="form-control"
                                            />
                                          </div>
                                          <div className="col-6 col-sm-3">
                                            <label className="form-label">
                                              {t(
                                                "distributor.order_management.order_detail.consumption"
                                              )}
                                            </label>
                                            <input
                                              type="text"
                                              value="On Site"
                                              className="form-control"
                                            />
                                          </div>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                  {/* [/Form 2] */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col">
                          <div class="card shadow-none height-100">
                            <div class="card-body p-0">
                              <div className="table-responsive">
                                <table class="table m-0">
                                  <thead>
                                    <tr>
                                      <th scope="col">
                                        {t(
                                          "distributor.order_management.order_detail.item"
                                        )}
                                      </th>
                                      <th scope="col">
                                        {t(
                                          "distributor.order_management.order_detail.price_per_unit"
                                        )}
                                      </th>
                                      <th scope="col" class="">
                                        {t(
                                          "distributor.order_management.order_detail.quantity"
                                        )}
                                      </th>
                                      <th scope="col" class="">
                                        {t(
                                          "distributor.order_management.order_detail.sub_total"
                                        )}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {order &&
                                      order.items.map((item) => (
                                        <tr>
                                          <td>
                                            <div class="prodInfo d-flex">
                                              <div class="prod-img p-2">
                                                <img
                                                  src={
                                                    item?.product?.product_image
                                                  }
                                                  className="img-fluid"
                                                />
                                              </div>
                                              <div class="desc d-flex flex-column align-items-start">
                                                <div className="proName">
                                                  {item?.product?.product_name}
                                                </div>
                                                <div className="prodMeta badge text-bg-light rounded-pill">
                                                  {
                                                    item?.product
                                                      ?.product_format.name
                                                  }
                                                </div>
                                              </div>
                                            </div>
                                          </td>
                                          <td class="">
                                            <div className="price-box ">
                                              <div className="mrp">
                                                ${item?.price}
                                              </div>
                                              {/* <div className="old-price">
                                                                                            <span className="price-cut d-inline-block me-2">
                                                                                                ${item?.product?.pricing.price}
                                                                                            </span>
                                                                                            <span className="discount badge bg-purple rounded-pill d-inline-block">
                                                                                                -0%
                                                                                            </span>
                                                                                        </div> */}
                                            </div>
                                          </td>
                                          <td className="qty">
                                            {item.quantity}
                                          </td>
                                          <td class="">
                                            <div className="price-box">
                                              <div className="mrp">
                                                ${item?.sub_total}
                                              </div>
                                              {/* <div className="old-price">
                                                                                            <span className="price-cut d-inline-block me-2">
                                                                                                $50.00
                                                                                            </span>
                                                                                            <span className="discount badge bg-purple rounded-pill d-inline-block">
                                                                                                -12%
                                                                                            </span>
                                                                                        </div> */}
                                            </div>
                                          </td>
                                        </tr>
                                      ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row justify-content-end">
                        <div className="col-sm-3">
                          <div className="card shadow-none order-subtotal-box">
                            <div className="card-body p-3">
                              <div className="price-breakage mb-2 d-flex justify-content-between">
                                <label>
                                  {order?.items.length}{" "}
                                  {t(
                                    "distributor.order_management.order_detail.products"
                                  )}
                                  {/* (22.704L) */}:
                                </label>
                                <span>
                                  {order?.items
                                    .reduce(
                                      (total, item) =>
                                        total + parseFloat(item.sub_total),
                                      0
                                    )
                                    .toFixed(2)}
                                </span>
                              </div>
                              <div className="price-breakage mb-2 d-flex justify-content-between">
                                <label>
                                  {t(
                                    "distributor.order_management.order_detail.deposits"
                                  )}
                                  :
                                </label>
                                <span>${order?.totalOrderProductDeposit}</span>
                              </div>
                              <div className="price-breakage-sum mb-2 d-flex justify-content-between">
                                <label>
                                  {t(
                                    "distributor.order_management.order_detail.sub_total_2"
                                  )}
                                </label>
                                <span>
                                  $
                                  {order?.items
                                    .reduce(
                                      (total, item) =>
                                        total + parseFloat(item.sub_total),
                                      0
                                    )
                                    .toFixed(2)}
                                </span>
                              </div>
                              <hr />
                              <div className="price-addon mb-2 d-flex justify-content-between">
                                <label>
                                  {t(
                                    "distributor.order_management.order_detail.gst"
                                  )}{" "}
                                  (5%){" "}
                                  {t(
                                    "distributor.order_management.order_detail.on"
                                  )}{" "}
                                  <span>
                                  $
                                  {order?.items
                                    .reduce(
                                      (total, item) =>
                                        total + parseFloat(item.sub_total),
                                      0
                                    )
                                    .toFixed(2)}
                                </span>
                                </label>
                                <span>${order?.totalOrderGST}</span>
                              </div>
                              <div className="price-addon d-flex justify-content-between">
                                <label>
                                  {t(
                                    "distributor.order_management.order_detail.qst"
                                  )}{" "}
                                  (9.975%){" "}
                                  {t(
                                    "distributor.order_management.order_detail.on"
                                  )}{" "}
                                  <span>
                                  $
                                  {order?.items
                                    .reduce(
                                      (total, item) =>
                                        total + parseFloat(item.sub_total),
                                      0
                                    )
                                    .toFixed(2)}
                                </span>
                                </label>
                                <span>${order?.totalOrderQST}</span>
                              </div>
                              <div className="price-addon d-flex justify-content-between">
                                <label>
                                  GST-QST{" "}
                                  (14.77%){" "}
                                  {t(
                                    "distributor.order_management.order_detail.on"
                                  )}{" "}
                                  <span>
                                  $
                                  {order?.items
                                    .reduce(
                                      (total, item) =>
                                        total + parseFloat(item.sub_total),
                                      0
                                    )
                                    .toFixed(2)}
                                </span>
                                </label>
                                <span>${order?.totalOrderGSTQST}</span>
                              </div>
                            </div>
                            <div class="card-footer total-sum d-flex justify-content-between">
                              <label>
                                {t(
                                  "distributor.order_management.order_detail.total"
                                )}
                              </label>
                              <span>${order?.finalPrice}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* [/Details Tab] */}

                    {/* [History Tab] */}
                    <div
                      class="tab-pane fade"
                      id="history-msg-tab-pane"
                      role="tabpanel"
                      aria-labelledby="order-tab"
                      tabindex="0"
                    >
                      <div className="card shadow-none">
                        <div className="card-body">
                          <div className="row mb-3">
                            {/* [Steps List] */}
                            <div className="col-12 order-progress-list">
                              {/* [Step 1] */}
                              <div className="order-progress-step d-flex mb-3 align-items-center">
                                <div className="progress-inner d-flex align-items-center">
                                  <img src={newOrder} className="me-3" />
                                  <div className="stepMeta d-flex align-items-start flex-column">
                                    <div className="stepName">
                                      {t(
                                        "distributor.order_management.order_detail.new_order"
                                      )}
                                    </div>
                                    <span class="badge text-bg-orange">
                                      PENDING
                                    </span>
                                  </div>
                                </div>
                                <div className="progress-info">
                                  <div className="date">
                                    <img src={calender} />
                                    20 March 2023
                                  </div>
                                  <div className="badge rounded-pill">
                                    felicia.reid@example.com
                                  </div>
                                </div>
                              </div>
                              {/* [/Step 1] */}

                              {/* [Step 2] */}
                              <div className="order-progress-step d-flex mb-3 align-items-center disabled">
                                <div className="progress-inner d-flex align-items-center">
                                  <img src={delivery} className="me-3" />
                                  <div className="stepMeta d-flex align-items-start flex-column">
                                    <div className="stepName">
                                      {t(
                                        "distributor.order_management.order_detail.estimate_delivery_at"
                                      )}
                                    </div>
                                    <p className="m-0">20 March 2021</p>
                                  </div>
                                </div>
                              </div>
                              {/* [/Step 2] */}

                              {/* [Step 3] */}
                              <div className="order-progress-step d-flex mb-3 align-items-center disabled">
                                <div className="progress-inner d-flex align-items-center">
                                  <img src={shipment} className="me-3" />
                                  <div className="stepMeta d-flex align-items-start flex-column">
                                    <div className="stepName">
                                      {t(
                                        "distributor.order_management.order_detail.added_to_shipment"
                                      )}
                                    </div>
                                    <p className="m-0">
                                      #1610-Buckle Disrtibution
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {/* [/Step 3] */}

                              {/* [Step 4] */}
                              <div className="order-progress-step d-flex mb-3 align-items-center disabled">
                                <div className="progress-inner d-flex align-items-center">
                                  <img src={delivery} className="me-3" />
                                  <div className="stepMeta d-flex align-items-start flex-column">
                                    <div className="stepName">
                                      {t(
                                        "distributor.order_management.order_detail.estimate_delivery_at"
                                      )}
                                    </div>
                                    <p className="m-0">20 March 2021</p>
                                  </div>
                                </div>
                              </div>
                              {/* [/Step 4] */}

                              {/* [Step 5] */}
                              <div className="order-progress-step d-flex mb-3 align-items-center disabled">
                                <div className="progress-inner d-flex align-items-center">
                                  <img src={orderSuccess} className="me-3" />
                                  <div className="stepMeta d-flex align-items-start flex-column">
                                    <div className="stepName">
                                      {t(
                                        "distributor.order_management.order_detail.status"
                                      )}
                                    </div>
                                    <span class="badge text-bg-green">
                                      {t(
                                        "distributor.order_management.order_detail.approved"
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {/* [/Step 5] */}
                            </div>
                            {/* [/Steps List] */}
                          </div>

                          <div className="row">
                            <div className="col msg-for-order">
                              <div className="card shadow-none">
                                <div className="card-body">
                                  <form>
                                    <p>
                                      {t(
                                        "distributor.order_management.order_detail.write_message_concerning"
                                      )}
                                    </p>
                                    <div className="mb-3">
                                      <textarea
                                        className="form-control"
                                        placeholder={t(
                                          "distributor.order_management.order_detail.write_message_here"
                                        )}
                                      ></textarea>
                                    </div>
                                    <button className="btn btn-purple width-auto">
                                      {t(
                                        "distributor.order_management.order_detail.send"
                                      )}
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* [/History Tab] */}

                    {/* [Document Tab] */}
                    <div
                      class="tab-pane fade"
                      id="document-tab-pane"
                      role="tabpanel"
                      aria-labelledby="order-tab"
                      tabindex="0"
                    >
                      <div className="row mb-3">
                        <div className="col">
                          <div className="filter-row page-top-filter">
                            {/* [Page Filter Box] */}
                            <div className="filter-box justify-content-between w-100">
                              <select className="btn btn-outline-black btn-sm text-start">
                                <option>
                                  {t(
                                    "distributor.order_management.order_detail.invoice"
                                  )}
                                </option>
                                <option>
                                  {t(
                                    "distributor.order_management.order_detail.order"
                                  )}
                                </option>
                              </select>

                              <button
                                type="button"
                                class="btn btn-purple btn-sm"
                                data-bs-toggle="modal"
                                data-bs-target="#uploadFiles"
                              >
                                {t(
                                  "distributor.order_management.order_detail.upload"
                                )}
                              </button>
                            </div>
                            {/* [/Page Filter Box] */}
                          </div>
                        </div>
                      </div>

                      {/* [Card] */}
                      <div className="card user-card height-100">
                        <div className="card-body p-0">
                          <div className="row">
                            <div className="col"></div>
                          </div>
                          <div className="row">
                            <div className="col"></div>
                          </div>
                        </div>
                      </div>
                      {/* [/Card] */}
                    </div>
                    {/* [/Document Tab] */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* [Modal] */}
      <div
        class="modal fade"
        id="uploadFiles"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-hidden="true"
        se
      >
        <div class="modal-dialog modal-dialog-centered modal-sm">
          <div class="modal-content p-3">
            <div class="modal-header justify-content-start">
              <h6 class="modal-title">
                {t("distributor.order_management.order_detail.upload_file")}
              </h6>
              <hr />
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p>
                {t("distributor.order_management.order_detail.attach_invoice")}
              </p>
            </div>
            <div class="modal-footer border-0 justify-content-center">
              <button
                type="button"
                class="btn btn-outline-black width-auto"
                data-bs-dismiss="modal"
              >
                {t("distributor.order_management.order_detail.cancel")}
              </button>
              &nbsp;&nbsp;
              <button type="button" class="btn btn-purple width-auto">
                {t("distributor.order_management.order_detail.attach_file")}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* [/Modal] */}
    </div>
  );
};

export default OrderDetail;
