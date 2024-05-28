import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logoDark from "../../assets/images/logo-dark.svg";
import newOrder from "../../assets/images/new-order.png";
import delivery from "../../assets/images/order-delivery.svg";
import shipment from "../../assets/images/order-shipment.svg";
import orderSuccess from "../../assets/images/order-tick.svg";
import calender from "../../assets/images/calender.png";
import viewfile from "../../assets/images/view-file.png";
import pdf from "../../assets/images/pdf.png";
import useAuthInterceptor from "../../../utils/apis";
import { toast } from "react-toastify";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import "../../assets/scss/dashboard.scss";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";
import * as XLSX from "xlsx";
import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import moment from "moment";

// class ComponentToPrint extends React.Component {
// constructor(props) {
//   super(props);
//   this.componentRef = React.createRef(); // Initialize componentRef
// }
//   render() {
//     return (
//       <div>
//         Content that you want to print
//       </div>
//     );
//   }
// }

const OrderDetail = () => {
  const params = useParams();
  const componentRef = useRef();
  // constructor(props){
  //   super(props);
  //   this.componentRef = React.createRef(); // Initialize componentRef
  // }

  const apis = useAuthInterceptor();
  const token = localStorage.getItem("supplier_accessToken");
  const { t, i18n } = useTranslation();
  const { order_id } = useParams();
  const [orderDetail, setOrderDetail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editFunctionality, setEditFunctionality] = useState(false);
  const [eachItemQuantity, setEachItemQuantity] = useState();
  const [masterEditForID, setMasterEditForID] = useState();
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [dateError, setDateError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [supplierId, setSupplierId] = useState();
  const [pdfUrls, setPdfUrls] = useState([]);

  let subtotal1 = 0,
    subtotal2 = 0,
    gst = 0,
    qst = 0,
    grandtotal = 0,
    quantity = 0;

  // const handleAttachFile = () => {
  //   if (selectedFile) {
  //     const formData = new FormData();
  //     formData.append("file", selectedFile);
  //     console.log(">>>", formData);

  //     const config = {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         // Authorization: `Bearer ${token}`,
  //         // permission: `order-view`,
  //       },
  //     };

  //     apis
  //       .post("/uploadfile", formData, config)
  //       .then((res) => {
  //         console.log("File Uploaded");
  //         setSelectedFile(null);
  //       })
  //       .catch((err) => {
  //         console.log("Error uploading file", err);
  //       });
  //   } else {
  //     console.log("No file selected");
  //   }
  // };

  const generateFileName = (extension) => {
    const timestamp = Date.now();

    const randomString = Math.random().toString(36).substring(2, 7);
    return `${timestamp}_${randomString}.${extension}`;
  };

  //----download PDF------
  const handlePDFDownload = () => {
    const element = document.getElementById("printItem");
    const fileName = generateFileName("pdf"); // Generate a unique file name with .pdf extension
    html2pdf().from(element).toPdf().save(fileName);
    setIsOpen(false); // Close the slide-buttons
  };

  //-----download excel--------
  const handleExcelDownload = () => {
    const wb = XLSX.utils.book_new();

    // Create a new worksheet
    const ws = XLSX.utils.aoa_to_sheet([
      ["Item", "Price Per Unit", "Quantity", "Subtotal"],
    ]);

    // Add table data to the worksheet
    orderDetail.items.forEach((item) => {
      XLSX.utils.sheet_add_aoa(
        ws,
        [
          [
            item.product.product_name,
            `$${item.product.pricing.price}`,
            item.quantity,
            `$${item.sub_total}`,
          ],
        ],
        { origin: -1 }
      );
    });

    // Add additional content to the worksheet
    const additionalContentData = [
      [],
      [],
      ["", "", "Number of Products", `${orderDetail.items.length}`],
      ["", "", "Deposits", `$${orderDetail.totalOrderProductDeposit}`],
      [
        "",
        "",
        "Sub-Total",
        `$${orderDetail.items
          .reduce((total, item) => total + parseFloat(item.sub_total), 0)
          .toFixed(2)}`,
      ],
      ["", "", "GST", `$${orderDetail.totalOrderGST.toFixed(2)}`],
      ["", "", "QST", `$${orderDetail.totalOrderQST.toFixed(2)}`],
      // ["", "", "GST-QST", `$${orderDetail.totalOrderGSTQST.toFixed(2)}`],
      ["", "", "Total", `$${orderDetail.finalPrice.toFixed(2)}`],
    ];

    additionalContentData.forEach((row) => {
      XLSX.utils.sheet_add_aoa(ws, [row], { origin: -1 });
    });

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Generate a binary string from the workbook
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

    // Convert string to ArrayBuffer
    const buf = new ArrayBuffer(wbout.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < wbout.length; i++) {
      view[i] = wbout.charCodeAt(i) & 0xff;
    }

    // Create a Blob object
    const blob = new Blob([buf], { type: "application/octet-stream" });

    // Create a download link
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = generateFileName("xlsx");

    // Append the link to the body and click it programmatically
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    setIsOpen(false); // Close the slide-buttons
  };

  useEffect(() => {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     permission: "order-view",
    //   },
    // };

    // apis
    //   .get(`/supplier/orderDetail/${order_id}`, config)
    //   .then((res) => {
    //     if (res.data.success === true) {
    //       setOrderDetail(res.data.data);
    //     } else {
    //       toast.error(
    //         "Could not fetch order details. Please try again later.",
    //         { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
    //       );
    //     }
    //   })
    //   .catch((error) => {
    //     if (error.message !== "revoke") {
    //       toast.error(
    //         "Could not fetch order details. Please try again later.",
    //         {
    //           autoClose: 3000,
    //           position: toast.POSITION.TOP_CENTER,
    //         }
    //       );
    //     }
    //   });

    fetchOrderDetail();
  }, []);

  // ----print-----
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  // ----end-----

  // ----download--toggleButtons------
  const toggleButtons = () => {
    setIsOpen(!isOpen);
  };
  const handleClose = () => {
    setIsOpen(false); // Close the slide-buttons
  };
  // -----end------

  // -----product qunatity update-------
  const editHandlerIcon = (ele) => {
    setMasterEditForID(ele.id);
    setEditFunctionality(false);
    setEachItemQuantity(ele.quantity);
  };
  const handleInputChange = (e) => {
    setEachItemQuantity(e.target.value);
  };

  const fetchOrderDetail = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "order-view",
      },
    };

    apis
      .get(`/supplier/orderDetail/${order_id}`, config)
      .then((res) => {
        if (res.data.success === true) {
          setOrderDetail(res.data.data);
          setSupplierId(res.data.data.supplier_id);
        } else {
          toast.error(
            "Could not fetch order details. Please try again later.",
            { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
          );
        }
      })
      .catch((error) => {
        if (error.message !== "revoke") {
          toast.error(
            "Could not fetch order details. Please try again later.",
            {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            }
          );
        }
      });
  };

  const handleUpdateStatus = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "order-edit",
      },
    };

    const bodyData = {
      order_id: order_id.toString(),
      action: "1",
    };
    bodyData["expected_delivery_date"] = moment(startDate).format("YYYY-MM-DD");
    apis
      .post("/supplier/order/status/update", bodyData, config)
      .then((res) => {
        if (res.data.success === true) {
          fetchOrderDetail();
          setShow(false);
          toast.success("Status updated for selected orders.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error("Could not update status. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        if (error.message !== "revoke") {
          toast.error("Could not update status. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };
  // const sumitHandler = ()  => {
  //   //api calling for upadte the quantity of item
  //   const config2 ={
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       permission: "order-edit",
  //     }
  //   }
  //   const data ={
  //     "quantity":`${eachItemQuantity}`
  //   }
  //   apis
  //   .post(`/supplier/order/${order_id}/${masterEditForID}/updateQuantity`, data, config2)
  //   .then((res) => {
  //     if (res) {
  //       fetchOrderDetail();
  //       toast.success(
  //         "Order update Sucessfully .",
  //         { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
  //       );
  //     } else {
  //       toast.error(
  //         "Could not update order . Please try again later.",
  //         { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
  //       );
  //     }
  //   })
  //   .catch((error) => {
  //     if (error.message !== "revoke") {
  //       toast.error(
  //         "Could not update order . Please try again later.",
  //         {
  //           autoClose: 3000,
  //           position: toast.POSITION.TOP_CENTER,
  //         }
  //       );
  //     }
  //   });

  //   setMasterEditForID(null)
  //   setEditFunctionality(true)
  // }
  //Changing Functionality 6th May :)
  const sumitHandler = () => {
    //api calling for upadte the quantity of item
    const config2 = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "order-edit",
      },
    };
    const data = {
      order_id: order_id,
      id: masterEditForID,
      quantity: `${eachItemQuantity}`,
    };
    apis
      .post(`/supplier/order/updatequantity`, data, config2)
      .then((res) => {
        if (res) {
          fetchOrderDetail();
          toast.success("Order update Sucessfully .", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error("Could not update order . Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        if (error.message !== "revoke") {
          toast.error("Could not update order . Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });

    setMasterEditForID(null);
    setEditFunctionality(true);
  };

  const handleAttachFile = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: `order-view`,
        "Content-Type": "multipart/form-data",
      },
    };
    if (selectedFile) {
      // and use callback to return the data which you get.
      function getBase64(selectedFile, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = function () {
          cb(reader.result);
        };
        reader.onerror = function (error) {
          console.log("Error: ", error);
        };
      }

      getBase64(selectedFile, (idCardBase64) => {
        console.log("Base64 data:", idCardBase64);

        const formData = new FormData();
        formData.append("file", idCardBase64); // Append base64 data instead of selectedFile
        formData.append("order_id", params.order_id);
        console.log("FormData:", formData);

        apis
          .post("/retailer/uploadOrderFile", formData, config)
          .then((res) => {
            console.log("File Uploaded");
            setSelectedFile(null);
            toast.success("File update Sucessfully .", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          })
          .catch((err) => {
            if (err.message !== "revoke") {
              toast.error("Could not update order . Please try again later.", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              });
            }
            console.log("Error uploading file", err);
          });
      });
    } else {
      console.log("No file selected");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("supplier_accessToken");
    // Check if token exists
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: "order-view",
        },
      };

      apis
        .get(`/supplier/getUploadFileList/${params.order_id}`, config)
        .then((res) => {
          if (res.data.success === true) {
            setPdfUrls(res.data.data);
            console.log("<<<", res.data.data);
            // setSupplierId(res.data.data.supplier_id);
          } else {
            console.log("No files available for this supplier.");
          }
        })
        .catch((error) => console.error("Error fetching PDF URLs:", error));
    } else {
      // Handle case when token is missing or invalid
      console.error("Access token not found or invalid");
      // Optionally, redirect to login page or display an error message
    }
  }, []);

  return (
    <div class="container-fluid page-wrap order-details">
      {/* <div>
        <ReactToPrint
          trigger={() => <button>Print this document</button>}
          content={() => this.componentRef}
        />
        <div ref={(el) => (this.componentRef = el)}>
          Content to print
        </div>
      </div> */}

      <div class="row height-inherit">
        <Sidebar userType={"supplier"} />

        <div class="col main p-0">
          <Header title={t("supplier.order_management.view_order.title")} />
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
                        {t("supplier.order_management.view_order.detail")}
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="order-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#history-msg-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="order-tab-pane"
                        aria-selected="false"
                      >
                        {t("supplier.order_management.view_order.history")}
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="order-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#document-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="order-tab-pane"
                        aria-selected="false"
                      >
                        {t("supplier.order_management.view_order.document")}
                      </button>
                    </li>
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
                              <div class="col-sm-3 d-flex justify-content-center align-items-center p-5 border-end">
                                <img src={logoDark} className="img-fluid" />
                              </div>
                              <div class="col-sm-9 p-0">
                                {/* [Form 1] */}
                                <div className="row m-0">
                                  <div className="col p-3">
                                    <form>
                                      <div className="form-head">
                                        {t(
                                          "supplier.order_management.view_order.supplier"
                                        )}
                                      </div>
                                      <div className="row mb-3">
                                        <div className="col-sm-4">
                                          <label className="form-label">
                                            {t(
                                              "supplier.order_management.view_order.name"
                                            )}
                                          </label>
                                          <input
                                            type="text"
                                            value={
                                              orderDetail &&
                                              orderDetail.supplier_information
                                                .user_profile
                                                ? orderDetail
                                                    .supplier_information
                                                    .user_profile.company_name
                                                  ? orderDetail
                                                      .supplier_information
                                                      .user_profile.company_name
                                                  : "N/A"
                                                : "N/A"
                                            }
                                            className="form-control"
                                            disabled
                                          />
                                        </div>
                                        <div className="col-sm-4">
                                          <label className="form-label">
                                            {t(
                                              "supplier.order_management.view_order.creation"
                                            )}
                                          </label>
                                          <input
                                            type="text"
                                            value={orderDetail.order_date}
                                            className="form-control"
                                            disabled
                                          />
                                        </div>
                                        <div className="col-sm-4">
                                          <label className="form-label">
                                            {t(
                                              "supplier.order_management.view_order.status"
                                            )}
                                          </label>
                                          <input
                                            type="text"
                                            value={orderDetail.status}
                                            className="form-control"
                                            disabled
                                          />
                                        </div>
                                        <div className="w-100 mb-3"></div>
                                        {orderDetail.delivery_date ? (
                                          <div className="col-sm-4">
                                            <label className="form-label">
                                              Expected Delivery Date
                                            </label>
                                            <input
                                              type="date"
                                              value="20 March, 2021"
                                              className="form-control"
                                            />
                                          </div>
                                        ) : (
                                          <></>
                                        )}
                                        <div className="col-sm-8">
                                          <label className="form-label">
                                            {t(
                                              "supplier.order_management.view_order.invoice"
                                            )}
                                          </label>
                                          <input
                                            type="test"
                                            className="form-control"
                                            value="TBD"
                                            disabled
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
                                          "supplier.order_management.view_order.retailer"
                                        )}
                                      </div>
                                      <div className="row mb-3">
                                        <div className="col-6 col-sm-3">
                                          <label className="form-label">
                                            {t(
                                              "supplier.order_management.view_order.name"
                                            )}
                                          </label>
                                          <input
                                            type="text"
                                            value={
                                              orderDetail &&
                                              orderDetail.retailer_information
                                                .user_profile
                                                ? orderDetail
                                                    .retailer_information
                                                    .user_profile.business_name
                                                  ? orderDetail
                                                      .retailer_information
                                                      .user_profile
                                                      .business_name
                                                  : "N/A"
                                                : "N/A"
                                            }
                                            className="form-control"
                                            disabled
                                          />
                                        </div>
                                        <div className="col-6 col-sm-3">
                                          <label className="form-label">
                                            {t(
                                              "supplier.order_management.view_order.phone_number"
                                            )}
                                          </label>
                                          <input
                                            type="text"
                                            value={
                                              orderDetail
                                                ? orderDetail
                                                    .retailer_information
                                                    .phone_number
                                                : "N/A"
                                            }
                                            className="form-control"
                                            disabled
                                          />
                                        </div>
                                        <div className="col-6 col-sm-3">
                                          <label className="form-label">
                                            {t(
                                              "supplier.order_management.view_order.contact_email"
                                            )}
                                          </label>
                                          <input
                                            type="text"
                                            value={
                                              orderDetail
                                                ? orderDetail
                                                    .retailer_information.email
                                                : "N/A"
                                            }
                                            className="form-control"
                                            disabled
                                          />
                                        </div>
                                        <div className="col-6 col-sm-3">
                                          <label className="form-label">
                                            {t(
                                              "supplier.order_management.view_order.consumption"
                                            )}
                                          </label>
                                          <input
                                            type="text"
                                            value={
                                              orderDetail &&
                                              orderDetail.retailer_information
                                                ? orderDetail
                                                    .retailer_information
                                                    .user_profile.opc_status ===
                                                  "1"
                                                  ? "On-site"
                                                  : "N/A"
                                                : "N/A"
                                            }
                                            className="form-control"
                                            disabled
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
                    <div class="row mb-3" id="printItem" ref={componentRef}>
                      <div class="col">
                        <div class="card shadow-none height-100">
                          <div class="card-body p-0">
                            <div className="table-responsive">
                              <table class="table m-0">
                                <thead>
                                  <tr>
                                    <th scope="col">
                                      {t(
                                        "supplier.order_management.view_order.table_col1"
                                      )}
                                    </th>
                                    <th scope="col">
                                      {t(
                                        "supplier.order_management.view_order.table_col2"
                                      )}
                                    </th>
                                    <th scope="col">
                                      {t(
                                        "supplier.order_management.view_order.table_col3"
                                      )}
                                    </th>
                                    <th scope="col">
                                      {t(
                                        "supplier.order_management.view_order.table_col4"
                                      )}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {orderDetail &&
                                  orderDetail.items.length > 0 ? (
                                    orderDetail.items.map((ele) => {
                                      subtotal1 += parseFloat(ele.sub_total);
                                      subtotal2 = (subtotal1 + 9).toFixed(2);
                                      gst = (subtotal1 / 20).toFixed(2);
                                      qst = ((subtotal1 * 9.975) / 100).toFixed(
                                        2
                                      );
                                      grandtotal =
                                        parseFloat(subtotal2) +
                                        parseFloat(gst) +
                                        parseFloat(qst);
                                      quantity += parseInt(ele.quantity);
                                      return (
                                        <tr>
                                          <td>
                                            <div class="prodInfo d-flex">
                                              <div class="prod-img p-2">
                                                <img
                                                  src={
                                                    ele.product.product_image
                                                  }
                                                  className="img-fluid"
                                                />
                                              </div>
                                              <div class="desc d-flex flex-column align-items-start">
                                                <div className="proName">
                                                  {ele.product.product_name}
                                                </div>
                                                <div className="prodMeta badge text-bg-light rounded-pill">
                                                  {
                                                    ele.product.product_format
                                                      .name
                                                  }
                                                </div>
                                              </div>
                                            </div>
                                          </td>

                                          <td class="">
                                            <div className="price-box ">
                                              <div className="mrp">
                                                {"$ " +
                                                  ele.product.pricing.price}
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
                                          <td className="qty">
                                            {masterEditForID == ele.id ? (
                                              <>
                                                <input
                                                  type="number"
                                                  min="0"
                                                  max="999"
                                                  value={eachItemQuantity}
                                                  onChange={(e) =>
                                                    handleInputChange(e)
                                                  }
                                                />
                                                <button
                                                  onClick={sumitHandler}
                                                  style={{
                                                    border: "none",
                                                    background: "#9366e8",
                                                    padding: "3px 5px",
                                                    color: "#fff",
                                                  }}
                                                >
                                                  <i class="fa-solid fa-circle-arrow-up"></i>
                                                </button>
                                              </>
                                            ) : (
                                              <>
                                                {ele.quantity}
                                                {editFunctionality ? (
                                                  <span
                                                    onClick={() =>
                                                      editHandlerIcon(ele)
                                                    }
                                                    style={{
                                                      margin: "0px 5px",
                                                    }}
                                                  >
                                                    {" "}
                                                    <i
                                                      className="fa fa-pencil"
                                                      aria-hidden="true"
                                                      style={{
                                                        cursor: "pointer",
                                                      }}
                                                    ></i>{" "}
                                                  </span>
                                                ) : null}{" "}
                                              </>
                                            )}
                                          </td>
                                          <td class="">
                                            <div className="price-box">
                                              <div className="mrp">
                                                {"$ " + ele.sub_total}
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
                                      );
                                    })
                                  ) : (
                                    <tr>
                                      <td>No data to show</td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row justify-content-end">
                        <div className="col-sm-3">
                          <div className="card shadow-none order-subtotal-box">
                            <div className="card-body p-3">
                              <div className="price-breakage mb-2 d-flex justify-content-between">
                                <label>{quantity} Products (22.704L):</label>
                                <span>${subtotal1.toFixed(2)}</span>
                              </div>
                              <div className="price-breakage mb-2 d-flex justify-content-between">
                                <label>Deposits:</label>
                                <span>$9</span>
                              </div>
                              <div className="price-breakage-sum mb-2 d-flex justify-content-between">
                                <label>Subtotal</label>
                                <span>${subtotal2}</span>
                              </div>
                              <hr />
                              <div className="price-addon mb-2 d-flex justify-content-between">
                                <label>
                                  GST (5%) on $ {subtotal1.toFixed(2)}
                                </label>
                                <span>${gst}</span>
                              </div>
                              <div className="price-addon d-flex justify-content-between">
                                <label>
                                  QST (9.975%) on ${subtotal1.toFixed(2)}
                                </label>
                                <span>${qst}</span>
                              </div>
                            </div>
                            <div class="card-footer total-sum d-flex justify-content-between">
                              <label>Total</label>
                              <span>${grandtotal.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between mt-sm-5 mt-4 bottom-btn ">
                      {/* <div class="col-12  d-flex gap-4 justify-content-sm-end justify-content-center"> */}
                      <div className="">
                        <div className="">
                          <button
                            className="btn btn-outline-black"
                            title="Edit"
                            onClick={() => setEditFunctionality(true)}
                          >
                            <i
                              class="fa-solid fa-pen-to-square"
                              style={{ color: "blue" }}
                            ></i>
                          </button>
                          <button
                            onClick={handlePrint}
                            className="btn btn-outline-black mx-2"
                            title="Print"
                          >
                            <i
                              class="fa-solid fa-print"
                              style={{ color: "#ffa500" }}
                            ></i>
                          </button>
                          <button
                            className="btn btn-outline-black mx-2"
                            title="Cancel"
                          >
                            <i
                              class="fa-solid fa-ban"
                              style={{ color: "red" }}
                            ></i>
                          </button>

                          <span className="download-buttons-container">
                            <button
                              className="btn btn-outline-black"
                              title="Download"
                              onClick={toggleButtons}
                            >
                              <i
                                className="fa-solid fa-download"
                                style={{ color: "#20c152" }}
                              ></i>
                            </button>

                            {isOpen && (
                              <div className="slide-buttons">
                                <button
                                  className="btn btn-outline-black my-1"
                                  title="PDF"
                                  onClick={handlePDFDownload}
                                >
                                  <i
                                    className="fa-solid fa-file-pdf"
                                    style={{ color: "red" }}
                                  ></i>
                                </button>
                                <button
                                  className="btn btn-outline-black my-1"
                                  title="EXCEL"
                                  onClick={handleExcelDownload}
                                >
                                  <i
                                    className="fa-solid fa-file-excel"
                                    style={{ color: "green" }}
                                  ></i>
                                </button>
                              </div>
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="">
                        <button
                          class="btn btn-outline-success"
                          title="Accept"
                          disabled={orderDetail.status == "Approved"}
                          onClick={() => {
                            setShow(true);
                          }}
                        >
                          <i
                            class="fa-solid fa-check"
                            style={{ color: "#fff" }}
                          ></i>
                        </button>
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
                                  <div className="stepName">New Order</div>
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
                                    Estimated Delivery at
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
                                    Added to Shipment
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
                                    Estimated Delivery at
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
                                  <div className="stepName">Status</div>
                                  <span class="badge text-bg-green">
                                    APPROVED
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
                                  <p>Write Message Concerning Order #BW5522</p>
                                  <div className="row mb-3">
                                    <div className="col-md-6">
                                      <h5>Retailer</h5>
                                      <textarea
                                        className="form-control"
                                        placeholder="Write message here..."
                                      ></textarea>
                                    </div>
                                    <div className="col-md-6">
                                      <h5>Distributer</h5>
                                      <textarea
                                        className="form-control"
                                        placeholder="Write message here..."
                                      ></textarea>
                                    </div>
                                  </div>
                                  <button className="btn btn-purple width-auto">
                                    Send
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
                            <div>
                              {/* <select className="btn btn-outline-black btn-sm text-start">
                                <option>Invoice #BW5522</option>
                                <option>Order #BW5522</option>
                              </select> */}
                            </div>
                            <div>
                              <button
                                className="btn btn-outline-black mx-2"
                                title="PDF"
                              >
                                <i
                                  class="fa-solid fa-file-pdf"
                                  style={{ color: "red" }}
                                ></i>
                              </button>

                              <button
                                className="btn btn-outline-black mx-2"
                                title="CSV"
                              >
                                <i
                                  class="fa-solid fa-file-csv"
                                  style={{ color: "black" }}
                                ></i>
                              </button>

                              <button
                                className="btn btn-outline-black mx-2"
                                title="Excel"
                              >
                                <i
                                  class="
                                  fa-solid fa-file-excel"
                                  style={{ color: "green" }}
                                ></i>
                              </button>

                              <button
                                className="btn btn-outline-black"
                                type="button"
                                title="Upload Document"
                                data-bs-toggle="modal"
                                data-bs-target="#uploadFiles"
                              >
                                <i
                                  class="fa-solid fa-upload"
                                  style={{ color: "blue" }}
                                ></i>
                              </button>
                            </div>
                          </div>
                          {/* [/Page Filter Box] */}
                        </div>
                      </div>
                    </div>

                    {/* [Card] */}
                    <div className="card user-card height-100">
                      <div className="card-body p-0">
                      { pdfUrls.length==0?<>"No such data found</>:
                       <>
                       <div className="pdf-download mt-4">
                          
                          <div className="row">
                            { pdfUrls.map((ele, index) => {
                              let path = ele.file_path;
                              // let pathId= path.slice('/')
                              const filename = path.substring(
                                path.lastIndexOf("/") + 1
                              );
                              console.log(
                                "-------------------------",
                                filename
                              );
                              return (
                                <div className="col-md-3">
                                  <div class="card-pdf">
                                    <span class="file-type">
                                      <i
                                        class="fa-solid fa-file-pdf"
                                        style={{
                                          color: "red",
                                          fontSize: "25px",
                                        }}
                                      ></i>
                                    </span>
                                    <p class="file-name m-0">
                                      Invoice #{filename}
                                    </p>
                                    <p class="file-size"></p>
                                    <span class="lock-icon">
                                      <a href={path} download={path}>
                                        <i class="fa-solid fa-download"></i>
                                      </a>
                                    </span>
                                  </div>
                                </div> 
                              );
                            }) }
                          </div>
                        </div>
                       </>
                       }
                      </div>
                    </div>
                    {/* [/Card] */}
                  </div>
                  {/* [/Document Tab] */}
                </div>
              </div>
            </div>
          </div>
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
        <div class="modal-dialog modal-dialog-centered modal-md">
          <div class="modal-content p-3">
            <div class="modal-header justify-content-start">
              <h6 class="modal-title">Upload Files</h6>
              <hr />
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <h6>Attach invoice form here</h6>
              <div
                className="dropFile rounded-2"
                onClick={() => {
                  document.getElementById("fileInput").click();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  setSelectedFile(file);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDragEnter={(e) => {
                  e.preventDefault();
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                }}
              >
                <p>
                  Drag and Drop files here or
                  <label htmlFor="fileInput" className="text-purple">
                    Browse
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      console.log(e.target.files[0]);
                      setSelectedFile(e.target.files[0]);
                    }}
                  />
                </p>
              </div>

              <h6>Upload Files</h6>
              <div className="dropFile rounded-2 border-0 p-3">
                {selectedFile && <div>{selectedFile.name}</div>}
                {!selectedFile && (
                  <p className="opacity-50 mt-2">No file selected</p>
                )}
              </div>
            </div>
            <div class="modal-footer border-0 justify-content-center">
              <button
                onClick={() => {
                  setSelectedFile(null);
                }}
                type="button"
                class="btn btn-outline-black width-auto"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              &nbsp;&nbsp;
              <button
                type="button"
                class="btn btn-purple width-auto"
                onClick={handleAttachFile}
                data-bs-dismiss="modal"
              >
                Attach File
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* [/Modal] */}
      <Modal
        className="modal fade"
        show={show}
        centered
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header>
          <h5 class="modal-title text-purpal">Change Order Status</h5>
          <button
            type="button"
            class="btn-close text-purpal"
            aria-label="Close"
            onClick={() => setShow(false)}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <p>{`Total number of selected orders : ${order_id}`}</p>
          <div
            className="border-purple p-3 mt-3 rounded-2"
            style={{ display: "block" }}
          >
            <div>Delivery Date</div>
            <div className="mt-2">
              <div className="input-group">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    setDateError("");
                  }}
                  minDate={new Date()}
                  dateFormat="yyyy/MM/dd"
                />
              </div>
              {dateError === "" ? (
                <></>
              ) : (
                <p className="error-label">{dateError}</p>
              )}
            </div>
          </div>
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
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-purple btn-md w-auto"
            onClick={() => handleUpdateStatus()}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderDetail;
