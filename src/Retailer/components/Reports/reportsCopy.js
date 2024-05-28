import React, { useEffect, useState } from "react";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import generateReportImage from "../../assets/images/generate-report-icon.svg";
import apis from "../../../CommonComponents/apis";
import { toast } from "react-toastify";
// import ReportsModal from "./Partials/ReportsModal";

const token = localStorage.getItem("supplier_accessToken");
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    permission: "groups-view",
  },
};
const url = "";

const Reports = () => {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

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
          <Sidebar userType={"supplier"} />

          <div className="col main p-0">
            <Header title="Reports" />
            <div className="container-fluid page-content-box px-3 px-sm-4">
              <div className="row">
                <div className="col">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-8 mb-4 mb-sm-0">
                          Products
                          <hr />
                          <div className="col-12 col-sm-6 col-xxl-3 d-flex">
                            <div className="card illustration flex-fill">
                              <div className="card-body p-0 d-flex flex-fill">
                                <div className="row g-0 w-100">
                                  <div className="col-12">
                                    <div className="illustration-text p-3 m-1">
                                      <h6 className="illustration-text">
                                        Products List
                                      </h6>
                                      <p className="mb-0">AppStack Dashboard</p>
                                      <hr />
                                      <Button
                                        variant="primary"
                                        size="sm"
                                        type="button"
                                        onClick={() => setShowModal1(true)}
                                      >
                                        View
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr />
                          Sales
                          <hr />
                          <div className="col-12 col-sm-6 col-xxl-3 d-flex">
                            <div className="card illustration flex-fill">
                              <div className="card-body p-0 d-flex flex-fill">
                                <div className="row g-0 w-100">
                                  <div className="col-12">
                                    <div className="illustration-text p-3 m-1">
                                      <h6 className="illustration-text">
                                        Sales List
                                      </h6>
                                      <p className="mb-0">AppStack Dashboard</p>
                                      <hr />
                                      <Button
                                        variant="primary"
                                        size="sm"
                                        type="button"
                                        onClick={() => setShowModal2(true)}
                                      >
                                        View
                                      </Button>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        className="modal fade"
        show={showModal1}
        fullscreen={true}
        centered
        onHide={() => setShowModal1(false)}
      >
        <Modal.Header>
          <Modal.Title>List of products delivered to buyers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col className="report-img">
                <img src={generateReportImage} alt="" />
              </Col>

              <Col>
                Name
                <br />
                List of products delivered to buyers
                <br />
                Category
                <br />
                <br />
                Marketing
                <br />
                Description
                <br />
                <br />
                Find out where your products have been delivered during the
                analyzed perio
              </Col>
              <Col xs={6}></Col>
            </Row>

            <hr />
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Date Type</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Created at</option>
                  <option>Updated at</option>
                  <option>Approved at</option>
                  <option>Delivered at</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>From</Form.Label>
                <Form.Control type="date" placeholder="Date" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>To</Form.Label>
                <Form.Control type="date" placeholder="Date" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Distributer</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Group</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Order state</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Paid</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Order Issuer</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Order detail type</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Form.Group as={Col} className="mb-3" controlId="formGridState">
              <Form.Label>Language</Form.Label>
              <Form.Select defaultValue="Choose...">
                <option>CA Eng</option>
                <option>CA Fr</option>
              </Form.Select>
            </Form.Group>
          </Form>
          <hr />
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>State</th>
                <th>Buyer name</th>
                <th>Distributor name</th>
                <th>Groups #1</th>
                <th>Delivered at</th>
                <th>Producer name</th>
                <th>Item name</th>
                <th>Item type</th>
                <th>Item quantity</th>
                <th>Shipping address</th>
                <th>Shipping address line 1</th>
                <th>Shipping address line 2</th>
                <th>Shipping address city</th>
                <th>Shipping address postal code</th>
                <th>Shipping address state</th>
                <th>Buyer id</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Download as CSV
          </Button>

          <Button variant="primary" type="submit">
            Download as Excel
          </Button>

          <button
            type="button"
            className="btn btn-outline-black"
            data-bs-dismiss="modal"
            onClick={() => setShowModal1(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>

      {/* <Modal
        className="modal fade"
        show={showModal2}
        fullscreen={true}
        centered
        onHide={() => setShowModal2(false)}
      >
        <Modal.Header>
          <Modal.Title>Sales List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Row>
              <Col className="report-img">
                <img src={generateReportImage} alt="" />
              </Col>

              <Col>
                Name
                <br />
                List of Sales
                <br />
                Category
                <br />
                <br />
                Marketing
                <br />
                Description
                <br />
                <br />
                Find out your Sales volume
              </Col>
              <Col xs={6}></Col>
            </Row>

            <hr />
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Date Type</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Created at</option>
                  <option>Updated at</option>
                  <option>Approved at</option>
                  <option>Delivered at</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>From</Form.Label>
                <Form.Control type="date" placeholder="Date" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>To</Form.Label>
                <Form.Control type="date" placeholder="Date" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Distributer</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Group</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Order state</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Paid</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Order Issuer</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Order detail type</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Form.Group as={Col} className="mb-3" controlId="formGridState">
              <Form.Label>Language</Form.Label>
              <Form.Select defaultValue="Choose...">
                <option>CA Eng</option>
                <option>CA Fr</option>
              </Form.Select>
            </Form.Group>
          </Form> 
          <hr />
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>State</th>
                <th>Buyer name</th>
                <th>Distributor name</th>
                <th>Groups #1</th>
                <th>Delivered at</th>
                <th>Producer name</th>
                <th>Item name</th>
                <th>Item type</th>
                <th>Item quantity</th>
                <th>Shipping address</th>
                <th>Shipping address line 1</th>
                <th>Shipping address line 2</th>
                <th>Shipping address city</th>
                <th>Shipping address postal code</th>
                <th>Shipping address state</th>
                <th>Buyer id</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
               <Button variant="primary" type="submit">
            Download as CSV
          </Button>

          <Button variant="primary" type="submit">
            Download as Excel
          </Button>

          <button
            type="button"
            className="btn btn-outline-black"
            data-bs-dismiss="modal"
            onClick={() => setShowModal2(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};

export default Reports;
