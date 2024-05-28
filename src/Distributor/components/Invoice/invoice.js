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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RadialChart from "../../../CommonComponents/Charts/RadialChart_in";
import RadialChartPro from "../../../CommonComponents/Charts/RadialChart_pro";
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
        <Header title={t("supplier.invoice_title")} />
            <div className="container-fluid page-content-box px-3 px-sm-4">
              <div className="row">
                <div className="col">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-12 md-12 mb-4 mb-sm-0">
                               <Row>
                                 <Col xs={6} sm={6} md={3}>
                                 <Card className="row-card1">
                                 <Card.Body>
                                   <Card.Text>
          <Col xs={12} md={4} className="float-left"> <FontAwesomeIcon icon="fa-solid fa-users" /></Col>
          <Col xs={12} md={6} className="float-right">
<p>156<br /> {t("supplier.invoice_customers")}</p></Col>
                                   </Card.Text>

                                 </Card.Body>
                               </Card>
                                 </Col>
                                <Col xs={6} sm={6} md={3}>
                                 <Card className="row-card2">
                                 <Card.Body>
                                   <Card.Text>
<Col xs={12} md={4} className="float-left"> <FontAwesomeIcon icon="fa-solid fa-box" /></Col>
<Col xs={12} md={6} className="float-right"> {t("supplier.invoice_products")}</Col>
                                   </Card.Text>
                                 </Card.Body>
                                 </Card>
                                 </Col>
                                  <Col xs={6} sm={6} md={3}>
                                 <Card className="row-card3">
                                 <Card.Body>
                                   <Card.Text>
<Col xs={12} md={4} className="float-left"> <FontAwesomeIcon icon="fa-solid fa-hand-holding-dollar" /></Col>
<Col xs={12} md={6} className="float-right"> {t("supplier.invoice_paid")} </Col>
                                   </Card.Text>

                                 </Card.Body>
                                 </Card>
                                 </Col>
                                <Col xs={6} sm={6} md={3}>
                                 <Card className="row-card4">
                                 <Card.Body>
                                   <Card.Text>
<Col xs={12} md={4} className="float-left"> <FontAwesomeIcon icon="fa-solid fa-sack-dollar" /></Col>
<Col xs={12} md={6} className="float-right"> {t("supplier.invoice_unpaid")} </Col>
                                   </Card.Text>

                                 </Card.Body>
                                 </Card>
                                 </Col>
                               </Row>
                               <hr />
                               <Row>
                                <Col xs={6} sm={6} md={3}>
                        <a href="/distributor/invoice_list">
                        <Card className="row-card5">
                                 <Card.Body>
                                   <Card.Text>
<Col xs={12} md={4} className="float-left"> <FontAwesomeIcon icon="fa-solid fa-paste" /></Col>
                                   <Col xs={12} md={6} className="float-right"> {t("supplier.invoice_total_invoice")} </Col>
                                   </Card.Text>
                                 </Card.Body>
                               </Card> </a>
                                 </Col>
                                 <Col xs={6} sm={6} md={3}>
                                    <a href="/distributor/invoice_list">
                                 <Card className="row-card6">
                                 <Card.Body>
                                   <Card.Text>
<Col xs={12} md={4} className="float-left"> <FontAwesomeIcon icon="fa-solid fa-file-invoice-dollar" /></Col>
                                   <Col xs={12} md={6} className="float-right"> {t("supplier.invoice_paid")} </Col>
                                   </Card.Text>

                                 </Card.Body>
                                 </Card></a>
                                 </Col>
                                 <Col xs={6} sm={6} md={3}>
                                  <a href="/distributor/invoice_list">
                                 <Card className="row-card7">
                                 <Card.Body>
                                   <Card.Text>
<Col xs={12} md={4} className="float-left"> <FontAwesomeIcon icon="fa-solid fa-file-circle-xmark" /></Col>
                                   <Col xs={12} md={6} className="float-right">  {t("supplier.invoice_unpaid")} </Col>
                                   </Card.Text>

                                 </Card.Body>
                                 </Card>
                                 </a>
                                 </Col>
                                 <Col xs={6} sm={6} md={3}>
                                  <a href="/distributor/invoice_list">
                                 <Card className="row-card8">
                                 <Card.Body>
                                   <Card.Text>
<Col xs={12} md={4} className="float-left"> <FontAwesomeIcon icon="fa-solid fa-file-circle-exclamation" /></Col>
                                   <Col xs={12} md={6} className="float-right">{t("supplier.invoice_pending")}</Col>
                                   </Card.Text>
                                 </Card.Body>
                                 </Card>
                                 </a>
                                 </Col>
                               </Row>
                               <hr />
<Row>
       <Col xs={6} md={6}>
    <RadialChart />
         </Col>
         <Col xs={6} md={6}>
      <RadialChartPro />
           </Col>
</Row>
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
