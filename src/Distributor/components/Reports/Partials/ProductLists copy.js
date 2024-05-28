import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import useAuthInterceptor from "../../../../utils/apis";
import Loader from "../../UI/Loader";
import { hasPermission } from "../../../../CommonComponents/commonMethods";
import { REPORTS_VIEW, REPORTS_EDIT } from "../../../../Constants/constant";
import Card from "react-bootstrap/Card";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReportsTable from "../../../../CommonComponents/UI/ReportsTable";

// define needed URLs here
const postFormDataUrl = "/PostReportProductList";
const getFormDataUrl = "/supplier/getsalesReport";
const getFormDataproductGroup = "/supplier/reportFormdataProductgroup";
const getProductListData = "/GetFullDist_model";
const ProductLists = ({ img, token, supplierName }) => {
  // config for api call
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      permission: "reports-view",
    },
  };

  const apis = useAuthInterceptor();

  // modal, formData, loading states
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    from_date: "",
    to_date: "",
    supplier: "",
    retailer: "",
    cad: "",
    product_name: "",
    product_type: "",
    product_style: "",
    product_format: "",
    order_state: "",
    invoice_state: "",
    group: "",
    language: "",
    file_type: "",
  });
  const [loading, setLoading] = useState(false);
  const [getTableDataLoading, setGetTableDataLoading] = useState(false);
  const [fullProductListDataLoading, setFullProductListDataLoading] =
    useState(true);
  const [tableData, setTableData] = useState([]);
  const [ProductGroupData, setProductGroupData] = useState([]);
  const [fullProductListData, setFullProductListData] = useState([]);
  const [retailerData, setRetailerData] = useState([]);
  const [csp_cadData, setCsp_cadData] = useState([]);

  // handle change : sets formData
  const handleChange = (e) => {
    const { name, value } = e.target;

    const retailerDataUpdated = retailerData?.filter(
      (data) => data?.added_by == value
    );
    if (!!retailerDataUpdated?.length) {
      setRetailerData(retailerDataUpdated);

      const csp_cad = setCsp_cadData?.filter(
        (data) => data?.id == retailerDataUpdated?.business_category_id
      );

      setFormData((prevData) => ({
        ...prevData,
        ["retailer"]: retailerDataUpdated[0]?.user_id,
        ["cad"]: csp_cad[0]?.id,
      }));
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // from submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    // form valid ?
    if (form.checkValidity() === true) {
      setLoading(true);

      // add permissions based on URL
      config.headers.permission = "reports-view";

      //console.log("form submit", { formData }, { config });
      console.log("form submit", { formData });
      apis
        .post(postFormDataUrl, formData, config)
        //  .post(postFormDataUrl, formData)
        .then((res) => {
          console.log("response", { res });

          if (res.status === 200) {
            toast.success("Invoice Generated Successfully!", {
              autoClose: 1000,
              position: toast.POSITION.TOP_CENTER,
            });
            setLoading(false);

            fetchFormData();
          } else {
            toast.error(res.data.message, {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log({ error });

          if (error) {
            toast.error("Invoice not available. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
          setLoading(false);
        });
    }
    setValidated(true);
  };

  // fetch saved form data from db
  const fetchFormData = () => {
    // add permissions based on URL
    config.headers.permission = "reports-view";
    setGetTableDataLoading(true);
    apis
      .get(getFormDataUrl, config)
      //.get(getFormDataUrl)
      .then((res) => {
        if (res.status === 200) {
          console.log("Response Sales table data", { res });
          setTableData(res.data.data);
          setGetTableDataLoading(false);
        }
      })
      .catch((error) => {
        console.log({ error });
        setGetTableDataLoading(false);
        if (error) {
          console.log({ error });
        }
      });
    setGetTableDataLoading(false);
  };

  // fetch saved form Product Style data from db
  const fetchProductGroupData = () => {
    // add permissions based on URL
    config.headers.permission = "reports-view";
    apis
      .get(getFormDataproductGroup, config)
      //.get(getFormDataUrl)
      .then((res) => {
        if (res.status === 200) {
          console.log("response Group data", { res });
          setProductGroupData(res.data.data);
        }
      })
      .catch((error) => {
        console.log({ error });
        if (error) {
          console.log({ error });
        }
      });
  };

  // fetch saved form Product Style data from db
  const fetchProductListData = async () => {
    // add permissions based on URL
    config.headers.permission = "reports-view";
    await apis
      .get(getProductListData, config)
      .then((res) => {
        if (res.status === 200) {
          const data = res?.data?.data;
          setFullProductListData(data);
          setRetailerData(data[1]);
          setCsp_cadData(data[2]);
          setFullProductListDataLoading(false);
        }
      })
      .catch((error) => {
        console.log({ error });
        setFullProductListDataLoading(false);
        if (error) {
          console.log({ error });
        }
      });
    setFullProductListDataLoading(false);
  };

  useEffect(() => {
    if (showModal) {
      fetchProductListData();
      fetchFormData();
      fetchProductGroupData();
      setFullProductListDataLoading(true);
    }
  }, [showModal]);

  return (
    <>
      <Card className="reports reports1">
        <Card.Body>
          <FontAwesomeIcon icon="fa-solid fa-list-check" />
          <Card.Title></Card.Title>
          <Card.Text>Distribution</Card.Text>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <FontAwesomeIcon icon="fa-solid fa-eye" />
          </Button>
        </Card.Body>
      </Card>

      <Modal
        className="modal fade"
        show={showModal}
        fullscreen={true}
        centered
        onHide={() => setShowModal(false)}
      >
        <Modal.Header>
          <Modal.Title>Distribution</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!!fullProductListDataLoading && <Loader />}
          {!fullProductListDataLoading && (
            <>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col className="report-img">
                    <img src={img} alt="" />
                  </Col>

                  <Col>
                    <h5>{supplierName} </h5>
                    Products Distributions
                    <br />
                    Find out where your products have been delivered.
                  </Col>
                  <Col xs={6}></Col>
                </Row>

                <hr />
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="from_date">
                    <Form.Label>From</Form.Label>
                    <Form.Control
                      type="date"
                      name="from_date"
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      From date is required.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="to_date">
                    <Form.Label>To</Form.Label>
                    <Form.Control
                      type="date"
                      name="to_date"
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      To date is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="supplier">
                    <Form.Label>By Supplier</Form.Label>
                    <Form.Control
                      as="select"
                      required
                      name="supplier"
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="">Choose...</option>
                      {fullProductListData &&
                        fullProductListData[0]?.map((values) => (
                          <option value={values?.user_id}>
                            {values?.company_name}
                          </option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback
                      className="error-label"
                      type="invalid"
                    >
                      Supplier is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="retailer">
                    <Form.Label>By Retailer</Form.Label>
                    <Form.Control
                      as="select"
                      name="retailer"
                      required
                      onChange={(e) => handleChange(e)}
                      value={formData?.retailer}
                    >
                      <option value="">Choose...</option>
                      <option value="all">All</option>
                      {retailerData &&
                        retailerData?.map((values) => (
                          <option value={values?.user_id}>
                            {values?.business_name}
                          </option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback
                      className="error-label"
                      type="invalid"
                    >
                      Retailer type is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="cad">
                    <Form.Label>CSP/CAD</Form.Label>
                    <Form.Control
                      as="select"
                      name="cad"
                      required
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="">Choose...</option>
                      <option value="all">All</option>
                      {fullProductListData &&
                        fullProductListData[2]?.map((values) => (
                          <option value={values?.id}>{values?.name}</option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback
                      className="error-label"
                      type="invalid"
                    >
                      CSP/CAD type is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="product-name">
                    <Form.Label>Product name</Form.Label>
                    <Form.Control
                      as="select"
                      name="product_name"
                      required
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="">Choose...</option>
                      {fullProductListData &&
                        fullProductListData[3]?.map((values) => (
                          <option value={values?.product_name}>
                            {values?.product_name}
                          </option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback
                      className="error-label"
                      type="invalid"
                    >
                      Product name is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="product-type">
                    <Form.Label>Product Type</Form.Label>
                    <Form.Control
                      as="select"
                      name="product_type"
                      required
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="">Choose...</option>
                      {fullProductListData &&
                        fullProductListData[4]?.map(({ product_type }) => (
                          <option value={product_type}>{product_type}</option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback
                      className="error-label"
                      type="invalid"
                    >
                      Product type is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="product-style">
                    <Form.Label>Product style</Form.Label>
                    <Form.Control
                      as="select"
                      name="product_style"
                      required
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="">Choose...</option>
                      {fullProductListData &&
                        fullProductListData[5]?.map((values) => (
                          <option value={values?.name}>{values?.name}</option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback
                      className="error-label"
                      type="invalid"
                    >
                      Product style is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="product-format">
                    <Form.Label>Product format</Form.Label>
                    <Form.Control
                      as="select"
                      name="product_format"
                      required
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="">Choose...</option>
                      {fullProductListData &&
                        fullProductListData[6]?.map(({ name, id }) => (
                          <option key={id} value={name}>
                            {name}
                          </option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback
                      className="error-label"
                      type="invalid"
                    >
                      Product format is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="order-state">
                    <Form.Label>Order status </Form.Label>
                    <Form.Control
                      as="select"
                      required
                      name="order_state"
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="">Choose...</option>
                      <option value="all">All</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </Form.Control>
                    <Form.Control.Feedback
                      className="error-label"
                      type="invalid"
                    >
                      Order state is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="invoice-state">
                    <Form.Label>Invoices Status</Form.Label>
                    <Form.Control
                      as="select"
                      required
                      name="invoice_state"
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="">Choose...</option>
                      <option value="All">All</option>
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                      <option value="overdue">Overdue</option>
                      <option value="closed">Closed</option>
                      <option value="collect">Collect</option>
                    </Form.Control>
                    <Form.Control.Feedback
                      className="error-label"
                      type="invalid"
                    >
                      Invoice status is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="group">
                    <Form.Label>Group</Form.Label>
                    <Form.Control
                      as="select"
                      required
                      name="group"
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="">Choose...</option>
                      {ProductGroupData.map((values) => (
                        <option value={values?.name}>{values?.name}</option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback
                      className="error-label"
                      type="invalid"
                    >
                      Group is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="file-type">
                    <Form.Label>File Type</Form.Label>
                    <Form.Control
                      as="select"
                      name="file_type"
                      onChange={(e) => handleChange(e)}
                    >
                      {" "}
                      <option value="">Choose...</option>
                      <option value="xlsx">XLSX</option>
                      <option value="csv">CSV</option>
                      <option value="pdf">PDF</option>
                    </Form.Control>
                    {/* <Form.Control.Feedback className="error-label" type="invalid">
                  Please select an option.
                </Form.Control.Feedback> */}
                  </Form.Group>
                  <Form.Group as={Col} controlId="language">
                    <Form.Label>Language</Form.Label>
                    <Form.Control
                      as="select"
                      name="language"
                      onChange={(e) => handleChange(e)}
                    >
                      {" "}
                      <option value="">Choose...</option>
                      <option value="CAeng">ENG</option>
                      <option value="CAfr">FRA</option>
                    </Form.Control>
                  </Form.Group>
                </Row>

                <button
                  type="submit"
                  class="btn btn-success w-auto"
                  disabled={loading}
                >
                  Generate List
                </button>
              </Form>
              <hr />
              {!!getTableDataLoading && <Loader />}
              {!getTableDataLoading && (
                <ReportsTable
                  tableData={tableData}
                  headings={["Created At", "File Type", "Download"]}
                  className=""
                />
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            variant="warning"
            className="btn btn-danger"
            data-bs-dismiss="modal"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductLists;
