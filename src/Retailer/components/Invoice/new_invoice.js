import React, { useEffect, useState } from "react";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from 'react-bootstrap/Container';
import apis from "../../../CommonComponents/apis";
import { toast } from "react-toastify";
import ReportsTable from "../../../CommonComponents/UI/ReportsTable";
// import ReportsModal from "./Partials/ReportsModal";

const token = localStorage.getItem("retailer_accessToken");
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

  const [inputs, setInputs] = useState([{ firstName: "", lastName: "" }]);

  const handleAddInput = () => {
    setInputs([...inputs, { firstName: "", lastName: "" }]);
  };

  const handleChange = (event, index) => {
    let { name, value } = event.target;
    let onChangeValue = [...inputs];
    onChangeValue[index][name] = value;
    setInputs(onChangeValue);
  };

  const handleDeleteInput = (index) => {
    const newArray = [...inputs];
    newArray.splice(index, 1);
    setInputs(newArray);
  };
  // uncomment to enable api call on loading
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      <div className="container-fluid page-wrap product-manage">
        <div className="row height-inherit">
          <Sidebar userType={"retailer"} />
          <div className="col main p-0">
        <Header title={t("supplier.invoice_create")} />
            <div className="container-fluid page-content-box px-3 px-sm-4">
              <div className="row">
                <div className="col">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                      <div className="col-sm-12">
   <Button variant="outline-secondary button-invoice">{t("supplier.invoice_create")}</Button>
   </div>
                        <div className="col-sm-12 md-12 mb-4 mb-sm-0">
                        <hr />

     <Form>
         <Row>
 <Col xs={6} sm={6} md={4}>
<Form.Label htmlFor="inputPassword5">Users</Form.Label>
<Form.Select name="users" aria-label="Default select example">
     <option>Open this select menu</option>
     <option value="1">One</option>
     <option value="2">Two</option>
     <option value="3">Three</option>
   </Form.Select>
    </Col>
 <Col xs={6} sm={6} md={4}>
 <Form.Label htmlFor="inputPassword5">Invoice Number</Form.Label>
      <Form.Control
        type="password"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
      />
</Col>
 <Col xs={6} sm={6} md={4}>
 <Form.Label>Invoice Date</Form.Label>
 <Form.Control
   type="date"
   name="invoice_date"
   required
 />
  </Col>
 </Row>
 <hr />
  <Row>
  <Col xs={6} sm={6} md={4}>
  <Form.Label>Due Date</Form.Label>
  <Form.Control
    type="date"
    name="due_date"
    required
  />
   </Col>
   <Col xs={6} sm={6} md={4}>
   <Form.Label htmlFor="inputPassword5">Status</Form.Label>
    <Form.Select name="invoice_status" aria-label="Default select example">
         <option>Open this select menu</option>
         <option value="1">One</option>
         <option value="2">Two</option>
         <option value="3">Three</option>
       </Form.Select>
    </Col>
    <Col xs={6} sm={6} md={4}>
    <Form.Label>Due Date</Form.Label>
    <Form.Control
      type="date"
      name="from_date"
      required
    />
     </Col>
  </Row>
  <hr />
  <Row>
<table className="table table-striped m-0">
  <thead>
    <tr>
        <th className="tableNameBox">Product</th>
        <th className="tableNameBox">Quantity</th>
        <th className="tableNameBox">Unit Price</th>
        <th className="tableNameBox">Tax</th>
        <th className="tableNameBox">Amount</th>
        <th className="tableNameBox">Action</th>
    </tr>
  </thead>
  <tbody>
   {inputs.map((item, index) => (
          <tr className="input_container" key={index}>
              <td>
              <Col xs={12} sm={12} md={12}>
              <Form.Control
                type="txt"
                id="input"
                aria-describedby="passwordHelpBlock"
                value={item.firstName}
                onChange={(event) => handleChange(event, index)}
              />
</Col>
                   </td>
                   <td>
                     <Col xs={12} sm={12} md={12}>
                        <Form.Control
                     name="lastName"
                     type="number"
                     value={item.qunatity}
                     onChange={(event) => handleChange(event, index)}
                   />
                   </Col>
                   </td>
              <td>
              <Col xs={12} sm={12} md={12}>
                 <Form.Control
              name="lastName"
                              type="number"
                              value={item.price}
                              onChange={(event) => handleChange(event, index)} />
                              </Col>
              </td>
              <td>
              <Form.Select aria-label="Default select example">
                   <option>Open this select menu</option>
                   <option value="1">One</option>
                   <option value="2">Two</option>
                   <option value="3">Three</option>
                 </Form.Select>
            </td>
              <td>Amount 100 $</td>
              <td>


                <div className="input_container" key={index}>

                  {inputs.length > 1 && (
                    <button onClick={() => handleDeleteInput(index)}><FontAwesomeIcon icon="fa-solid fa-circle-minus" /> </button>
                  )}
                  {index === inputs.length - 1 && (
                    <button onClick={() => handleAddInput()}> <FontAwesomeIcon icon="fa-solid fa-circle-plus" /></button>
                  )}
                </div>

              </td>
              </tr>
                   ))}
                </tbody>
              </table>
              <div className="container">
   </div>
  </Row>
  <Row>
  <Col xs={6} sm={6} md={6}>


   </Col>
   <Col xs={6} sm={6} md={6}>
   <Col xs={5} sm={5} md={5}>
--
    </Col>
    <Col xs={5} sm={5} md={5}>
--
     </Col>

    </Col>

  </Row>
 </Form>

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
