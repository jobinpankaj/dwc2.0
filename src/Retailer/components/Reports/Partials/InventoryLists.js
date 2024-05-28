import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import useAuthInterceptor from "../../../../utils/apis";
import Loader from "../../UI/Loader";
import { hasPermission } from "../../../../CommonComponents/commonMethods";
import { REPORTS_VIEW, REPORTS_EDIT } from "../../../../Constants/constant";
import Card from 'react-bootstrap/Card';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// define needed URLs here
const postFormDataUrl = "/supplier/PostReportInventoryList";
const getFormDataUrl = "/supplier/getinventoryReport";
const getFormDataproductName = "/supplier/reportFormdataProductsName";
const getFormDataproductType = "/supplier/reportFormdataProducttype";
const getFormDataproductStyle = "/supplier/reportFormdataProductstyle";
const getFormDataproductFormat = "/supplier/reportFormdataProductformat";
const getFormDataWarehouseList = "/supplier/reportFormdataWarehousesList";
const getFormDataUsersList = "/supplier/reportFormdataUsersList";

const InventoryLists = ({ img, token }) => {
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
    date_type: "",
    from_date: "",
    to_date: "",
        warehouse: "",
        supply: "",
        product_name: "",
        product_type: "",
        product_style: "",
        product_format: "",
        by_user: "",
    language: "",
    file_type: "",
  });
  const [loading, setLoading] = useState(false);
  const [getTableDataLoading, setGetTableDataLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [ProductNameData, setProductNameData] = useState([]);
  const [ProductTypeData, setProductTypeData] = useState([]);  // testing values for table
  const [ProductStyleData, setProductStyleData] = useState([]);
  const [ProductFormatData, setProductFormatData] = useState([]);
  const [WarehouseFormatData, setWarehouseFormatData] = useState([]);
  const [UserFormatData, setUserFormatData] = useState([]);
  // testing values for table
  // {
  //   created_at: "123",
  //   file_path: "www.google.com",
  //   file_type: "pdf",
  // },

  // handle change : sets formData
  const handleChange = (e) => {
    const { name, value } = e.target;

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
            toast.success("Inventory report generated!", {
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
            toast.error("Something went wrong. Please try again later.", {
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
          console.log("response table data", { res });
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

  useEffect(() => {
    fetchFormData();
  }, []);

 // fetch saved form Product type data from db
  const fetchProductNameData = () => {
    // add permissions based on URL
    config.headers.permission = "reports-view";
    setGetTableDataLoading(true);
    apis
      .get(getFormDataproductName, config)
      //.get(getFormDataUrl)
      .then((res) => {
        if (res.status === 200) {
          console.log("response Product Name data", { res });
          setProductNameData(res.data.data);
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

  useEffect(() => {
    fetchProductNameData();
  }, []);
  // fetch saved form Product type data from db
  const fetchProductTypeData = () => {
    // add permissions based on URL
    config.headers.permission = "reports-view";
    setGetTableDataLoading(true);
    apis
      .get(getFormDataproductType, config)
      //.get(getFormDataUrl)
      .then((res) => {
        if (res.status === 200) {
          console.log("response Product type data", { res });
          setProductTypeData(res.data.data);
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

  useEffect(() => {
    fetchProductTypeData();
  }, []);

  // fetch saved form Product Style data from db
  const fetchProductStyleData = () => {
    // add permissions based on URL
    config.headers.permission = "reports-view";
    setGetTableDataLoading(true);
    apis
      .get(getFormDataproductStyle, config)
      //.get(getFormDataUrl)
      .then((res) => {
        if (res.status === 200) {
          console.log("response Product style data", { res });
          setProductStyleData(res.data.data);
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

  useEffect(() => {
    fetchProductStyleData();
  }, []);

  // fetch saved form Product Style data from db
  const fetchProductFormatData = () => {
    // add permissions based on URL
    config.headers.permission = "reports-view";
    setGetTableDataLoading(true);
    apis
      .get(getFormDataproductFormat, config)
      //.get(getFormDataUrl)
      .then((res) => {
        if (res.status === 200) {
          console.log("response Product format data", { res });
          setProductFormatData(res.data.data);
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

  useEffect(() => {
    fetchProductFormatData();
  }, []);

  // fetch saved form Inventory data from db
  const fetchWarehouseFormatData = () => {
    // add permissions based on URL
    config.headers.permission = "reports-view";
    setGetTableDataLoading(true);
    apis
      .get(getFormDataWarehouseList, config)
      //.get(getFormDataUrl)
      .then((res) => {
        if (res.status === 200) {
          console.log("response Warehouse data", { res });
          setWarehouseFormatData(res.data.data);
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

  useEffect(() => {
    fetchWarehouseFormatData();
  }, []);

  // fetch saved form Users data from db
  const fetchUserFormatData = () => {
    // add permissions based on URL
    config.headers.permission = "reports-view";
    setGetTableDataLoading(true);
    apis
      .get(getFormDataUsersList, config)
      //.get(getFormDataUrl)
      .then((res) => {
        if (res.status === 200) {
          console.log("response Warehouse data", { res });
          setUserFormatData(res.data.data);
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

  useEffect(() => {
    fetchUserFormatData();
  }, []);

  return (
    <>
        <Card className="reports reports2" style={{ width: '9rem' }}>

      <Card.Body>
        <FontAwesomeIcon icon="fa-solid fa-warehouse" />
        <Card.Title></Card.Title>
        <Card.Text>
      Inventories
        </Card.Text>
        <Button variant="primary" onClick={() => setShowModal(true)}><FontAwesomeIcon icon="fa-solid fa-eye" /></Button>
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
          <Modal.Title>List of Inventories</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col className="report-img">
                <img src={img} alt="" />
              </Col>

              <Col>
                Sébastien Morasse
                <br />
                List of products delivered to buyers
                <br />
                Category
                <br />
                Find out where your products have been delivered during the
                analyzed perio
              </Col>
              <Col xs={6}></Col>
            </Row>

            <hr />
            <Row className="mb-3">
              <Form.Group as={Col} controlId="date-type">
                <Form.Label>Date Type</Form.Label>
                <Form.Control
                  as="select"
                  name="date_type"
                  required
                  onChange={(e) => handleChange(e)}
                >
                  <option value="">Choose...</option>
                  <option value="created_at">Created at</option>
                  <option value="updated_at">Updated at</option>
                </Form.Control>
                <Form.Control.Feedback className="error-label" type="invalid">
                  Date Type is required.
                </Form.Control.Feedback>
              </Form.Group>

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
              <Form.Group as={Col} controlId="warehouse">
                <Form.Label>By warehouse</Form.Label>
                <Form.Control
                  as="select"
                  required
                  name="warehouse"
                  onChange={(e) => handleChange(e)}
                >
                  <option value="">Choose...</option>
                                                    {WarehouseFormatData.map((values) => (
                    <option value={values?.name}>{values?.name}</option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback className="error-label" type="invalid">
                  Warehouse is required.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="supply">
                <Form.Label>Supply</Form.Label>
                <Form.Control
                  as="select"
                  required
                  name="supply"
                  onChange={(e) => handleChange(e)}
                >
                  <option value="">Choose...</option>
                       <option value="all">All</option>
                </Form.Control>
                <Form.Control.Feedback className="error-label" type="invalid">
                  Supply is required.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
            <Form.Group as={Col} controlId="product-name">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                as="select"
                required
                name="product_name"
                onChange={(e) => handleChange(e)}
              >
                <option value="">Choose...</option>
                                  {ProductNameData.map((values) => (
                    <option value={values?.product_name}>{values?.product_name}</option>
                  ))}
              </Form.Control>
              <Form.Control.Feedback className="error-label" type="invalid">
                Product name is required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="product-type">
              <Form.Label>Product type</Form.Label>
              <Form.Control
                as="select"
                required
                name="product_type"
                onChange={(e) => handleChange(e)}
              >
                <option value="">Choose...</option>
                                  {ProductTypeData.map((values) => (
                    <option value={values?.product_type}>{values?.product_type}</option>
                  ))}
              </Form.Control>
              <Form.Control.Feedback className="error-label" type="invalid">
                Product type is required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="product-style">
              <Form.Label>Product style</Form.Label>
              <Form.Control
                as="select"
                required
                name="product_style"
                onChange={(e) => handleChange(e)}
              >
                <option value="">Choose...</option>
                              {ProductStyleData.map((values) => (
                  <option value={values?.name}>{values?.name}</option>
                ))}
              </Form.Control>
              <Form.Control.Feedback className="error-label" type="invalid">
                Product style is required.
              </Form.Control.Feedback>
            </Form.Group>
              <Form.Group as={Col} controlId="product-format">
                <Form.Label>Product Format</Form.Label>
                <Form.Control
                  as="select"
                  name="product_format"
                  required
                  onChange={(e) => handleChange(e)}
                >
                  <option value="">Choose...</option>
                                  {ProductFormatData.map((values) => (
                  <option value={values?.name}>{values?.name}</option>
                ))}
                </Form.Control>
                <Form.Control.Feedback className="error-label" type="invalid">
                  Product format is required.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="by-user">
                <Form.Label>By User</Form.Label>
                <Form.Control
                  as="select"
                  required
                  name="by_user"
                  onChange={(e) => handleChange(e)}
                >
                  <option value="">Choose...</option>
                  <option value="all">All</option>
                {UserFormatData.map((values) => (
                  <option value={values?.id}>{values?.first_name} {values?.last_name}</option>
                ))}
                </Form.Control>
                <Form.Control.Feedback className="error-label" type="invalid">
                  User is required.
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
                >       <option value="">Choose...</option>
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
                >       <option value="">Choose...</option>
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
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Created At</th>
                  <th>Download</th>
                  <th>File Type</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((values) => (
                  <tr>
                    <td>{new Date(values?.created_at)?.toLocaleDateString('en-GB').replace(new RegExp("/", 'g'),"-")}</td>
                    <td>
                      <a class="btn btn-success" target="_blank" href={`${values?.file_path}/${values?.filename}`}>
                        Download - {values?.file_type}
                      </a>
                    </td>
                    <td>{values?.file_type}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
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

export default InventoryLists;
