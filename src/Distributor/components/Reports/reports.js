import React, { useEffect, useState } from "react";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import generateReportImage from "../../assets/images/logo.png";
import ProductLists from "./Partials/ProductLists";
import InventoryLists from "./Partials/InventoryLists";
import SalesLists from "./Partials/SalesLists";
import InvoiceLists from "./Partials/InvoiceLists";
import CustomMade from "./Partials/CustomMade";
import SuperInvoice from "./Partials/SuperInvoice";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import apis from "../../../CommonComponents/apis";
//const token = localStorage.getItem("supplier_accessToken");
import { useTranslation } from "react-i18next";
const getFormDataSupplierName = "/supplier/reportSuppliername";
const getFormDataUsersList = "/supplier/reportFormdataUsersList";

const Reports = () => {
  const token = localStorage.getItem("distributor_accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      permission: "reports-view",
    },
  };

  const { t, i18n } = useTranslation();
  const [supplierName, setSupplierName] = useState([]);
  const [usersData, setUsersData] = useState([]);

  const fetchSupplierName = () => {
    // add permissions based on URL
    config.headers.permission = "reports-view";
    apis
      .get(getFormDataSupplierName, config)
      //.get(getFormDataUrl)
      .then((res) => {
        if (res.status === 200) {
          setSupplierName(res.data.data ? res.data.data[0]?.company_name : "");
        }
      })
      .catch((error) => {
        console.log({ error });
        if (error) {
          console.log({ error });
        }
      });
  };

  const fetchUserList = () => {
    // add permissions based on URL
    config.headers.permission = "reports-view";
    apis
      .get(getFormDataUsersList, config)
      //.get(getFormDataUrl)
      .then((res) => {
        if (res.status === 200) {
          setUsersData(res.data.data ?? []);
        }
      })
      .catch((error) => {
        console.log({ error });
        if (error) {
          console.log({ error });
        }
      });
  };

  useEffect(() => {
    fetchSupplierName();
    fetchUserList();
  }, []);

  return (
    <>
      <div className="container-fluid page-wrap product-manage">
        <div className="row height-inherit">
       <Sidebar userType={"distributor"} />

          <div className="col main p-0">
            <Header title="Reports" />
            <div className="container-fluid page-content-box px-3 px-sm-4">
              <div className="row">
                <div className="col">
                  <div className="card">
                    <div className="card-body centere-align">
                      <div className="row">
                        <Breadcrumb>
                          <Breadcrumb.Item href="#">{t("modal.products")}</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="col-2 width-9rem">
                          <ProductLists
                            img={generateReportImage}
                            token={token}
                            supplierName={supplierName}
                            usersData={usersData}
                          />
                        </div>
                        <div className="col-2 width-9rem">
                          <InventoryLists
                            img={generateReportImage}
                            token={token}
                            supplierName={supplierName}
                            usersData={usersData}
                          />
                        </div>
                        <div className="col-2 width-9rem">
                          <CustomMade img={generateReportImage} token={token} />
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <Breadcrumb>
                          <Breadcrumb.Item href="#">{t("modal.sales")}</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="col-2 width-9rem">
                          <SalesLists
                            img={generateReportImage}
                            token={token}
                            supplierName={supplierName}
                            usersData={usersData}
                          />
                        </div>
                        <div className="col-2 width-9rem">
                          <InvoiceLists
                            img={generateReportImage}
                            token={token}
                          />
                        </div>
                        <div className="col-2 width-9rem">
                          <SuperInvoice
                            img={generateReportImage}
                            token={token}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
