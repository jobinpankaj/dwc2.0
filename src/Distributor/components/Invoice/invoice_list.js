import React, { useEffect, useState } from "react";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from 'react-bootstrap/Container';
import apis from "../../../CommonComponents/apis";
import { toast } from "react-toastify";
import ReportsTable from "../../../CommonComponents/UI/ReportsTable";
// import ReportsModal from "./Partials/ReportsModal";

const token = localStorage.getItem("distributor_accessToken");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    permission: "",
  },
};
const url = "";

const Invoice = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const { t, i18n } = useTranslation();
  // call to fetch data
  const fetchData = () => {
    apis
      .get(url, config)
      .then((res) => {
        setLoading(false);
        if (res.data.success === true) {
          setData(res.data.data);
        } else {
          toast.error("Something went wrong. Please try again later.", {
            autoClose: 2000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.message !== "revoke") {
          toast.error("Something went wrong. Please try again later.", {
            autoClose: 2000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };

  // uncomment to enable api call on loading
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      <div className="container-fluid page-wrap product-manage">
        <div className="row height-inherit">
          <Sidebar userType={"distributor"} />
          <div className="col main p-0">
        <Header title={t("supplier.invoice_title_list")} />
            <div className="container-fluid page-content-box px-3 px-sm-4">
              <div className="row">
                <div className="col">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                      <div className="col-sm-12">
                      <a href="/distributor/create_invoice">
   <Button variant="outline-secondary button-invoice">{t("supplier.invoice_create")}</Button>
   </a>
   </div>
                        <div className="col-sm-12 md-12 mb-4 mb-sm-0">
     <hr />
                        <ReportsTable
                        //  tableData={tableData}
headings={[t("supplier.invoice_customer"), t("supplier.invoice_date"), t("supplier.invoice_amount"), t("supplier.invoice_status"), t("supplier.invoice_action")]}
                          className=""
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

export default Invoice;
