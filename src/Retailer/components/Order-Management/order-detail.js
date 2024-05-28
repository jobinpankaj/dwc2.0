import React, { useEffect, useState, useRef } from "react";
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
import viewfile from "../../assets/images/view-file.png";
import useAuthInterceptor from "../../../utils/apis";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";
import * as XLSX from "xlsx";
// import { Document, Page, pdfjs } from 'react-pdf';
// import { toBase64 } from 'file-base64';

const OrderDetail = () => {
  const componentRef = useRef();
  const apis = useAuthInterceptor();
  const { t, i18n } = useTranslation();
  const language = localStorage.getItem("i18nextLng");
  const navigate = useNavigate();
  const token = localStorage.getItem("retailer_accessToken");
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [retailerId, setRetailerId] = useState();
  const [pdfUrls, setPdfUrls] = useState([]);
  const [reload,setReload]=useState(false)
  let subtotal1 = 0,
    subtotal2 = 0,
    gst = 0,
    qst = 0,
    grandtotal = 0,
    quantity = 0;
  // ---------uplode----doc-----

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileSelect = (event) => {
    const files = event.target.files;
    const allowedFileTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileType = file.type;

      if (allowedFileTypes.includes(fileType)) {
        setUploadedFiles((prevFiles) => [...prevFiles, file]);
      } else {
        alert("Only PDF, Excel, and CSV files are allowed.");
      }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const allowedFileTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileType = file.type;

      if (allowedFileTypes.includes(fileType)) {
        setUploadedFiles((prevFiles) => [...prevFiles, file]);
      } else {
        alert("Only PDF, Excel, and CSV files are allowed.");
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // const handleAttachFile = () => {
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       permission: `order-view`,
  //       "Content-Type": "multipart/form-data",
  //     },
  //   };
  //   if (selectedFile) {
      
  //     // and use callback to return the data which you get.
  //     function getBase64(selectedFile, cb) {
  //       let reader = new FileReader();
  //       reader.readAsDataURL(selectedFile);
  //       reader.onload = function () {
  //         cb(reader.result);
  //       };
  //       reader.onerror = function (error) {
  //         console.log("Error: ", error);
  //       };
  //     }

  //     let idCardBase64 = "";
  //     getBase64(selectedFile, (result) => {
  //       idCardBase64 = result;
  //       console.log("------------------------------", idCardBase64);
  //     });


  //     const formData = new FormData();
  //     // let baseFile= btoa(selectedFile)
  //     // console.log(baseFile);
  //     formData.append("file", idCardBase64);
  //     formData.append("order_id", retailerId);
  //     console.log(">>>", formData);

  //     apis
  //       .post("/retailer/uploadOrderFile", formData, config)
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
  // -----end--------------

  // ----download--toggleButtons------
  
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
        formData.append("order_id", params.id);
        console.log("FormData:", formData);

        apis
          .post("/retailer/uploadOrderFile", formData, config)
          .then((res) => {
            console.log("File Uploaded");
            setSelectedFile(null);
            toast.success("File update Sucessfully .", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            })
            setReload(!reload)

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

  
  const toggleButtons = () => {
    setIsOpen(!isOpen);
  };
  const handleClose = () => {
    setIsOpen(false); // Close the slide-buttons
  };
  // -----end------

  // ----print-----
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  // ----end-----

  // -----sidebar---data---

  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const params = useParams();
  console.log('#########################', params);
  // -----end---------

  useEffect(() => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "order-view",
      },
    };
    apis
      .get(`retailer/orderDetail/${params.id}`, config)
      .then((res) => {
        setLoading(false);
        setOrder(res.data.data);
        setRetailerId(res.data.data.retailer_id);
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
  }, [token, params.id]);

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
    order.items.forEach((item) => {
      XLSX.utils.sheet_add_aoa(
        ws,
        [
          [
            item.product.product_name,
            `$${(item.product.pricing.unit_price * item.quantity).toFixed(2)}`,
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
      ["", "", "Number of Products", `${order.items.length}`],
      ["", "", "Deposits", `$${order.totalOrderProductDeposit}`],
      [
        "",
        "",
        "Sub-Total",
        order.items
          .reduce((total, item) => total + parseFloat(item.sub_total), 0)
          .toFixed(2),
      ],
      ["", "", "GST", `$${order.totalOrderGST.toFixed(2)}`],
      ["", "", "QST", `$${order.totalOrderQST.toFixed(2)}`],
      ["", "", "GST-QST", `$${order.totalOrderGSTQST.toFixed(2)}`],
      ["", "", "Total", `$${order.finalPrice.toFixed(2)}`],
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
    const token = localStorage.getItem("retailer_accessToken");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: "order-view",
        },
      };

      apis     
        .get(`/retailer/getUploadFileList/${params.id}`, config)
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
  }, [reload]);

  return (
    <div class="container-fluid page-wrap order-details">
      <div class="row height-inherit">
        <Sidebar userType={"retailer"} />

        <div class="col main p-0">
          <Header
            title={t("retailer.order_management.order_detail.title")}
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
                          {t("retailer.order_management.order_detail.details")}
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
                          {t(
                            "retailer.order_management.order_detail.history_and_message"
                          )}
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
                          {t("retailer.order_management.order_detail.document")}
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
                                <div class="col-sm-3 text-center p-3 border-end">
                                  <img
                                    src={logoDark}
                                    style={{ width: "50%" }}
                                  />
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
                                                "retailer.order_management.order_detail.supplier"
                                              )}
                                            </label>
                                            <input
                                              type="text"
                                              value={
                                                order &&
                                                order?.supplier_information
                                                  ?.user_profile?.company_name
                                              }
                                              readOnly
                                              className="form-control"
                                            />
                                          </div>
                                          <div className="col-sm-4">
                                            <label className="form-label">
                                              {t(
                                                "retailer.order_management.order_detail.creation"
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
                                                "retailer.order_management.order_detail.order_status"
                                              )}
                                            </label>
                                            <input
                                              type="text"
                                              value={
                                                order &&
                                                (language == "en"
                                                  ? order.status
                                                  : order.status == "On Hold"
                                                  ? "En attente"
                                                  : order.status == "Approved"
                                                  ? "Approuvé"
                                                  : "Annulé")
                                              }
                                              readOnly
                                              className="form-control"
                                            />
                                          </div>
                                          <div className="w-100 mb-3"></div>
                                          <div className="col-sm-4">
                                            <label className="form-label">
                                              {t(
                                                "retailer.order_management.order_detail.expected_delivery_date"
                                              )}
                                            </label>
                                            <input
                                              type="text"
                                              value={
                                                order?.order_shipments
                                                  ?.expected_delivery_date
                                              }
                                              className="form-control"
                                              readOnly
                                            />
                                          </div>
                                          <div className="col-sm-8">
                                            <label className="form-label">
                                              {t(
                                                "retailer.order_management.order_detail.invoice_status"
                                              )}
                                            </label>
                                            <input
                                              type="test"
                                              className="form-control"
                                              value=""
                                              readOnly
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
                                            "retailer.order_management.order_detail.retailer"
                                          )}
                                        </div>
                                        <div className="row mb-3">
                                          <div className="col-6 col-sm-3">
                                            <label className="form-label">
                                              {t(
                                                "retailer.order_management.order_detail.name"
                                              )}
                                            </label>
                                            <input
                                              type="text"
                                              value={
                                                order &&
                                                order.retailer_information
                                                  .full_name
                                              }
                                              readOnly
                                              className="form-control"
                                            />
                                          </div>
                                          <div className="col-6 col-sm-3">
                                            <label className="form-label">
                                              {t(
                                                "retailer.order_management.order_detail.phone_number"
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
                                              readOnly
                                            />
                                          </div>
                                          <div className="col-6 col-sm-3">
                                            <label className="form-label">
                                              {t(
                                                "retailer.order_management.order_detail.contact_email"
                                              )}
                                            </label>
                                            <input
                                              type="text"
                                              value={
                                                order &&
                                                order.retailer_information.email
                                              }
                                              className="form-control"
                                              readOnly
                                            />
                                          </div>
                                          <div className="col-6 col-sm-3">
                                            <label className="form-label">
                                              {t(
                                                "retailer.order_management.order_detail.consumption"
                                              )}
                                            </label>
                                            <input
                                              type="text"
                                              value="On Site"
                                              className="form-control"
                                              readOnly
                                            />
                                          </div>
                                          <div className="col-6 col-sm-3">
                                            <label className="form-label">
                                              {t(
                                                "retailer.order_management.order_detail.non_commercial"
                                              )}
                                            </label>
                                            <input
                                              type="text"
                                              value={
                                                order &&
                                                order.retailer_information
                                                  ?.user_profile?.business_name
                                              }
                                              className="form-control"
                                              readOnly
                                            />
                                          </div>
                                          <div className="col-6 col-sm-3">
                                            <label className="form-label">
                                              {t(
                                                "retailer.order_management.order_detail.distributor_"
                                              )}
                                            </label>
                                            <input
                                              type="text"
                                              value={
                                                order &&
                                                order?.order_distributors
                                                  ?.distributor_info
                                                  ?.user_profile?.company_name
                                              }
                                              className="form-control"
                                              readOnly
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
                                          "retailer.order_management.order_detail.item"
                                        )}
                                      </th>
                                      <th scope="col">
                                        {t(
                                          "retailer.order_management.order_detail.price_per_unit"
                                        )}
                                      </th>
                                      <th scope="col" class="">
                                        {t(
                                          "retailer.order_management.order_detail.quantity"
                                        )}
                                      </th>
                                      {/* <th scope="col" class="">
                                        Tax
                                      </th> */}
                                      <th scope="col" class="">
                                        {t(
                                          "retailer.order_management.order_detail.sub_total"
                                        )}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {order &&
                                      order.items.map((item) => {
                                        subtotal1 += parseFloat(item.sub_total);
                                        subtotal2 = (
                                          parseFloat(subtotal1) + 9
                                        ).toFixed(2);
                                        gst = (subtotal1 / 20).toFixed(2);
                                        qst = (
                                          (subtotal1 * 9.975) /
                                          100
                                        ).toFixed(2);
                                        grandtotal =
                                          parseFloat(subtotal2) +
                                          parseFloat(gst) +
                                          parseFloat(qst);
                                        quantity += parseInt(item.quantity);
                                        return (
                                          <tr>
                                            <td>
                                              <div class="prodInfo d-flex">
                                                <div class="prod-img p-2">
                                                  <img
                                                    src={
                                                      item?.product
                                                        ?.product_image
                                                    }
                                                    className="img-fluid"
                                                  />
                                                </div>
                                                <div class="desc d-flex flex-column align-items-start">
                                                  <div className="proName">
                                                    {
                                                      item?.product
                                                        ?.product_name
                                                    }
                                                  </div>
                                                  <div className="prodMeta badge text-bg-light rounded-pill">
                                                    {
                                                      item?.product
                                                        ?.product_format?.name
                                                    }
                                                  </div>
                                                </div>
                                              </div>
                                            </td>
                                            <td class="">
                                              <div className="price-box ">
                                                <div className="mrp">
                                                  {console.log(item, "item")}$
                                                  {item.product.pricing.price}
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
                                              {item?.quantity}
                                            </td>
                                            {/* <td className="qty">
                                            {item.tax}
                                          </td> */}
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
                                        );
                                      })}
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
                                  <label>
                                    {quantity}{" "}
                                    {t(
                                      "retailer.order_management.order_detail.products"
                                    )}
                                    {/* (22.704L) */}:
                                  </label>
                                  <span>${subtotal1.toFixed(2)}</span>
                                </div>
                                <div className="price-breakage mb-2 d-flex justify-content-between">
                                  <label>
                                    {t(
                                      "retailer.order_management.order_detail.deposits"
                                    )}
                                    :
                                  </label>
                                  <span>
                                    ${order?.totalOrderProductDeposit}
                                  </span>
                                </div>
                                <div className="price-breakage-sum mb-2 d-flex justify-content-between">
                                  <label>
                                    {t(
                                      "retailer.order_management.order_detail.sub_total_2"
                                    )}
                                  </label>
                                  <span>${subtotal2}</span>
                                </div>
                                <hr />
                                <div className="price-addon mb-2 d-flex justify-content-between">
                                  <label>
                                    {t(
                                      "retailer.order_management.order_detail.gst"
                                    )}{" "}
                                    (5%){" "}
                                    {t(
                                      "retailer.order_management.order_detail.on"
                                    )}{" "}
                                    <span>${subtotal1.toFixed(2)}</span>
                                  </label>

                                  <span>${gst}</span>
                                </div>
                                <div className="price-addon d-flex justify-content-between">
                                  <label>
                                    {t(
                                      "retailer.order_management.order_detail.qst"
                                    )}{" "}
                                    (9.975%){" "}
                                    {t(
                                      "retailer.order_management.order_detail.on"
                                    )}{" "}
                                    <span>${subtotal1.toFixed(2)}</span>
                                  </label>
                                  <span>${qst}</span>
                                </div>
                                <div className="price-addon d-flex justify-content-between">
                                  <label>
                                    GST-QST (14.77%){" "}
                                    {t(
                                      "retailer.order_management.order_detail.on"
                                    )}{" "}
                                    <span>${subtotal1.toFixed(2)}</span>
                                  </label>
                                  <span>
                                    <span>
                                      $
                                      {(
                                        parseFloat(gst) + parseFloat(qst)
                                      ).toFixed(2)}
                                    </span>
                                  </span>
                                </div>
                              </div>
                              <div class="card-footer total-sum d-flex justify-content-between">
                                <label>
                                  {t(
                                    "retailer.order_management.order_detail.total"
                                  )}
                                </label>
                                <span>${grandtotal}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* ------new---- */}
                      <div className="row mt-sm-5 mt-4 bottom-btn ">
                        {/* <div class="col-12  d-flex gap-4 justify-content-sm-end justify-content-center"> */}
                        <div className="col-md-8 d-flex">
                          <div className="">
                            <button
                              className="btn btn-outline-black mx-2"
                              title="Print"
                              onClick={handlePrint}
                            >
                              <i
                                className="fa-solid fa-print"
                                style={{ color: "#ffa500" }}
                              ></i>
                            </button>
                            <button
                              className="btn btn-outline-black mx-2"
                              title="Cancel"
                              onClick={() =>
                                order &&
                                (order.status.toLowerCase() === "pending" ||
                                  order.status.toLowerCase() === "on hold")
                                  ? navigate(`/retailer/supplier-list`)
                                  : navigate(`/retailer/order-management`)
                              }
                            >
                              <i
                                class="fa-solid fa-ban"
                                style={{ color: "red" }}
                              ></i>
                            </button>
                          </div>

                          <div className="download-buttons-container">
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
                          </div>
                        </div>
                      </div>
                      {/* -----end----- */}
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
                                      {t("supplier.retailer_request.new_order")}
                                    </div>
                                    <span class="badge text-bg-orange">
                                      {t(
                                        "retailer.order_management.order_detail.pending"
                                      )}
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

                              <div className="order-progress-step d-flex mb-3 ali   gn-items-center disabled">
                                <div className="progress-inner d-flex align-items-center">
                                  <img src={delivery} className="me-3" />
                                  <div className="stepMeta d-flex align-items-start flex-column">
                                    <div className="stepName">
                                      {t(
                                        "supplier.retailer_request.estemeted_dlivery_at"
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
                                        "supplier.retailer_request.add_to_shipment"
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
                                        "supplier.retailer_request.estemeted_dlivery_at"
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
                                      {t("supplier.retailer_request.status")}
                                    </div>
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
                                    <p>
                                      {t(
                                        "supplier.retailer_request.write_message_concerning"
                                      )}{" "}
                                      #BW5522
                                    </p>
                                    <div className="row mb-3">
                                      <div className="col-md-6">
                                        <h5>
                                          {t(
                                            "supplier.retailer_request.reailer"
                                          )}
                                        </h5>
                                        <textarea
                                          className="form-control"
                                          placeholder={t(
                                            "supplier.retailer_request.write_message_ph"
                                          )}
                                        ></textarea>
                                      </div>
                                      <div className="col-md-6">
                                        <h5>
                                          {t(
                                            "supplier.retailer_request.distributor"
                                          )}
                                        </h5>
                                        <textarea
                                          className="form-control"
                                          placeholder={t(
                                            "supplier.retailer_request.write_message_ph"
                                          )}
                                        ></textarea>
                                      </div>
                                    </div>
                                    <button className="btn btn-purple width-auto">
                                      {t("supplier.retailer_request.send")}
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
                                <select className="btn btn-outline-black btn-sm text-start">
                                  <option>Invoice #BW5522</option>
                                  <option>Order #BW5522</option>
                                </select>
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
                                  type="upload"
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
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content p-3">
            <div className="modal-header justify-content-start">
              <h6 className="modal-title">Upload Files</h6>
              <hr />
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h6>Attach invoice form here</h6>
              <div
                className="dropFile rounded-2"
                id="dropArea"
                onClick={() => document.getElementById("fileInput").click()}
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
                style={{ cursor: "pointer" }}
              >
                <p>
                  Drag and Drop files here or{" "}
                  <label htmlFor="fileInput" className="text-purple">
                    Browse
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      setSelectedFile(e.target.files[0]);
                    }}
                  />
                </p>
                <input
                  type="file"
                  id="fileInput"
                  accept=".pdf,.xlsx,.csv"
                  style={{ display: "none" }}
                  onChange={handleFileSelect}
                  onClick={(event) => {
                    event.target.value = null;
                  }} // Clear file selection
                />
              </div>
              <h6>Upload Files</h6>
              <div className="dropFile rounded-2 border-0 p-3">
                {selectedFile && <div>{selectedFile.name}</div>}
                {!selectedFile && (
                  <p className="opacity-50 mt-2">No file selected</p>
                )}
              </div>
            </div>
            <div className="modal-footer border-0 justify-content-center">
              <button
                onClick={() => {
                  setSelectedFile(null);
                }}
                type="button"
                className="btn btn-outline-black width-auto"
                data-bs-dismiss="modal"
                accept=".pdf"
              >
                Cancel
              </button>
              &nbsp;&nbsp;
              <button
                type="button"
                className="btn btn-purple width-auto"
                onClick={handleAttachFile}
                data-bs-dismiss="modal"
                accept=".pdf"
              >
                Attach File
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
