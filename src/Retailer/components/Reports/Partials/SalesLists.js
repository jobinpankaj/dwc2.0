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
import { useTranslation } from "react-i18next";
// define needed URLs here
const postFormDataUrl = "/supplier/PostSuperSalesReports";
const getFormDataUrl = "/supplier/getSuperSalesReports";
const getFullSalesData = "/GetFullDist_model"; // "/GetFullSales_model";
const getFormDataSuppliername = "/reportCompanyName";
const getFormUserLists = "/GetInventoryUserList";
const SalesLists = ({ img, token, supplierName, usersData }) => {
  // config for api call
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      permission: "reports-view",
    },
  };

  const apis = useAuthInterceptor();
  const { t, i18n } = useTranslation();
  // modal, formData, loading states
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    by_user: "",
    supplier: "",
    retailer: "",
    from_date: "",
    product_type: "",
    product_format: "",
    to_date: "",
    language: "",
    file_type: "",
  });
  const [loading, setLoading] = useState(false);
  const [getTableDataLoading, setGetTableDataLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [fullSalesData, setFullSalesData] = useState([]);
  const [fullProductListDataLoading, setFullProductListDataLoading] =
    useState(true);
  const [productTypeData, setProductTypeData] = useState([]);
  const [productFormatData, setProductFormatData] = useState([]);
  const [retailerData, setRetailerData] = useState([]);
  const [SupplierBname, setSupplierData] = useState([]);
  const [ByUsers, setUsersData] = useState([]);
  // testing values for table
  // {
  //   created_at: "123",
  //   file_path: "www.google.com",
  //   file_type: "pdf",
  // },

  // handle change : sets formData
  const handleChange = (e) => {
    const { name, value } = e.target;

    const dataKey = e.target.options
      ? e.target.options[e.target.selectedIndex].getAttribute("data-key") ??
        null
      : null;

    let newFormData = [];
    let newProductTypeData = [];
    let newProductFormatData = [];
    let newRetailerData = [];

    // if dataKey
    // code inside finds values with common user_id
    if (dataKey) {
      newFormData = fullSalesData?.map((data) =>
        data?.find((value) => value?.user_id == dataKey)
      );

      newRetailerData = fullSalesData[1]?.filter(
        (data) => data?.user_id == dataKey
      );

      newProductTypeData = fullSalesData[4]?.filter(
        (data) => data?.user_id == dataKey
      );

      newProductFormatData = fullSalesData[6]?.filter(
        (data) => data?.user_id == dataKey
      );

      // const notEligible = newFormData.some((item) => item === undefined);
      // if (notEligible) {
      //   toast.error("Report cannot be processed!", {
      //     autoClose: 3000,
      //     position: toast.POSITION.TOP_CENTER,
      //   });
      // }

      setProductTypeData(newProductTypeData);
      setProductFormatData(newProductFormatData);
      setRetailerData(newRetailerData);

      // check if newFormData is not empty
      // then update formData
      // if no common value then that field won't be updated
      if (newFormData?.length != 0) {
        setFormData((prevData) => ({
          ...prevData,
          supplier: newFormData[0]?.company_name ?? "",
          retailer: newFormData[1]?.business_name ?? "",
          product_type: newFormData[4]?.product_type ?? "",
          product_format: newFormData[6]?.name ?? "",
        }));
      }
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
            toast.success("Profile Information saved!", {
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

  const fetchFullSalesData = async () => {
    // add permissions based on URL
    config.headers.permission = "reports-view";
    await apis
      .get(getFullSalesData, config)
      //.get(getFormDataUrl)
      .then((res) => {
        if (res.status === 200) {
          setFullSalesData(res.data.data);
          setRetailerData(res.data.data[1]);
          setProductTypeData(res?.data?.data[4]);
          setProductFormatData(res?.data?.data[6]);
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
      fetchFullSalesData();
      fetchFormData();
      setFullProductListDataLoading(true);
    }
  }, [showModal]);
  // fetch Supplier name data from db
  const fetchFormSupplierData = () => {
    // add permissions based on URL
    config.headers.permission = "reports-view";
    setGetTableDataLoading(true);
    apis
      .get(getFormDataSuppliername, config)
      //.get(getFormDataUrl)
      .then((res) => {
        if (res.status === 200) {
          console.log("response Supplier data", { res });
          setSupplierData(res.data.data);
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

  const fetchUsersData = () => {
    // add permissions based on URL
    config.headers.permission = "reports-view";
    setGetTableDataLoading(true);
    apis
      .get(getFormUserLists, config)
      //.get(getFormDataUrl)
      .then((res) => {
        if (res.status === 200) {
          console.log("response Supplier Name", { res });
          setUsersData(res.data.data);
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
    if (showModal) {
      fetchFullSalesData();
      fetchFormData();
      fetchUsersData();
      setFullProductListDataLoading(true);
      fetchFormSupplierData();
    }
  }, [showModal]);

  return (
    <>
      <Card className="reports reports3">
        <Card.Body>
          <FontAwesomeIcon icon="fa-solid fa-list-ul" />
          <Card.Title></Card.Title>
          <Card.Text>{t("modal.sales")}</Card.Text>
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
          <Modal.Title>{t("modal.list_of_sales")}</Modal.Title>
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
                  {SupplierBname.map((values) => (
                    <h5>{values?.company_name} </h5>
                  ))}
                  {t("modal.list_of_sales")}
                    <br />
                {t("modal.find_out_sales_lists")}
                  </Col>
                  <Col xs={6}></Col>
                </Row>

                <hr />
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="from_date">
                    <Form.Label>{t("modal.from")}</Form.Label>
                    <Form.Control
                      type="date"
                      name="from_date"
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                        {t("modal.from")} {t("modal.is_required")}.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="to_date">
                <Form.Label>{t("modal.to")}</Form.Label>
                    <Form.Control
                      type="date"
                      name="to_date"
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                    {t("modal.to")} {t("modal.is_required")}.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} controlId="supplier">
                  <Form.Label>{t("modal.by_supplier")}</Form.Label>
                    <Form.Control
                      as="select"
                      required
                      name="supplier"
                      onChange={(e) => handleChange(e)}
                      value={formData?.supplier}
                    >
                    <option value="">{t("modal.choose")}</option>
                      {fullSalesData &&
                        fullSalesData[0]?.map((values) => (
                          <option
                            value={values?.company_name}
                            data-key={values?.user_id}
                          >
                            {values?.company_name}
                          </option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback
                      className="error-label"
                      type="invalid"
                    >
                      {t("modal.by_supplier")} {t("modal.is_required")}.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                {/*}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="product-type">
                <Form.Label>By Frequency</Form.Label>
                <Form.Control
                  as="select"
                  name="product_type"
                  required
                  onChange={(e) => handleChange(e)}
                >
                  <option value="">Choose...</option>
                </Form.Control>
                <Form.Control.Feedback className="error-label" type="invalid">
                  Frequency is required.
                </Form.Control.Feedback>
              </Form.Group>
            <Form.Group as={Col} controlId="product-type">
            <Form.Label>Select</Form.Label>
              {['checkbox'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
             inline
             label="QTY Boxes"
             name="group1"
             type={type}
             id={`inline-${type}-1`}
           />
           <Form.Check
             inline
             label="Revenue"
             name="group1"
             type={type}
             id={`inline-${type}-2`}
           />
           <Form.Check
             inline
             label="Discount"
             type={type}
             id={`inline-${type}-3`}
           />
           <Form.Check
           inline
           label="Rank"
           name="group1"
           type={type}
           id={`inline-${type}-4`}
         />
         <Form.Check
           inline
           label="Revenue"
           name="group1"
           type={type}
           id={`inline-${type}-5`}
         />
         <Form.Check
           inline
           label="Last order"
           type={type}
           id={`inline-${type}-6`}
         />
         <Form.Check
           inline
           label="Avarage order value"
           type={type}
           id={`inline-${type}-7`}
         />
         </div>
            ))}
                </Form.Group>
            </Row>*/}
                <Row className="mb-3">

                  {/*}          <Form.Group as={Col} controlId="product-type">
            <Form.Label>Select</Form.Label>
              {['checkbox'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
             inline
             label="Trend"
             name="group1"
             type={type}
             id={`inline-${type}-1`}
           />
           <Form.Check
             inline
             label="Action"
             name="group1"
             type={type}
             id={`inline-${type}-2`}
           />
           <Form.Check
             inline
             label="City"
             type={type}
             id={`inline-${type}-3`}
           />
           <Form.Check
           inline
           label="All"
           name="group1"
           type={type}
           id={`inline-${type}-4`}
         />
         </div>
            ))}
                </Form.Group> */}
                  <Form.Group as={Col} controlId="retailer">
                <Form.Label>{t("modal.by_retailer")}</Form.Label>
                    <Form.Control
                      as="select"
                      name="retailer"
                      onChange={(e) => handleChange(e)}
                      value={formData?.retailer}
                    >
                      {" "}
                    <option value="">{t("modal.choose")}</option>
                      {retailerData?.map((values) => (
                        <option
                          value={values?.business_name}
                          data-key={values?.user_id}
                        >
                          {values?.business_name}
                        </option>
                      ))}
                    </Form.Control>
                    {/* <Form.Control.Feedback className="error-label" type="invalid">
                    Please select an option.
                  </Form.Control.Feedback> */}
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="Product_type">
                        <Form.Label>{t("modal.product_type")}</Form.Label>
                    <Form.Control
                      as="select"
                      name="product_type"
                      onChange={(e) => handleChange(e)}
                      value={formData?.product_type}
                    >
                      {" "}
                      <option value="">Choose...</option>
                      {productTypeData?.map((values) => (
                        <option
                          value={values?.product_type}
                          data-key={values?.user_id}
                        >
                          {values?.product_type}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} controlId="Product-format">
                <Form.Label>{t("modal.product_format")}</Form.Label>
                    <Form.Control
                      as="select"
                      name="product_format"
                      onChange={(e) => handleChange(e)}
                      value={formData?.product_format}
                    >
                      {" "}
                <option value="">{t("modal.choose")}</option>
                      {productFormatData?.map((values) => (
                        <option value={values?.name} data-key={values?.user_id}>
                          {values?.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} controlId="by-user">
                  <Form.Label>{t("modal.by_users")}</Form.Label>
                    <Form.Control
                      as="select"
                      required
                      name="by_user"
                      onChange={(e) => handleChange(e)}
                    >
                    <option value="">{t("modal.choose")}</option>
                    <option value="all">All</option>
                    {ByUsers.map((values) => (
                          <option value={values?.id}>
                            {values?.first_name} {values?.last_name}
                          </option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback
                      className="error-label"
                      type="invalid"
                    >
                      {t("modal.by_users")} {t("modal.is_required")}.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="file-type">
                      <Form.Label>{t("modal.file_type")}</Form.Label>
                    <Form.Control
                      as="select"
                      name="file_type"
                      onChange={(e) => handleChange(e)}
                    >
                      {" "}
              <option value="">{t("modal.choose")}</option>
                      <option value="xlsx">XLSX</option>
                      <option value="csv">CSV</option>
                      <option value="pdf">PDF</option>
                    </Form.Control>
                    {/* <Form.Control.Feedback className="error-label" type="invalid">
                  Please select an option.
                </Form.Control.Feedback> */}
                  </Form.Group>
                  <Form.Group as={Col} controlId="language">
                    <Form.Label>{t("modal.language")}</Form.Label>
                    <Form.Control
                      as="select"
                      name="language"
                      onChange={(e) => handleChange(e)}
                    >
                      {" "}
            <option value="">{t("modal.choose")}</option>
                      <option value="CAeng"> ENG </option>
                      <option value="CAfr"> FRA </option>
                    </Form.Control>
                  </Form.Group>
                </Row>

                <button
                  type="submit"
                  class="btn btn-success w-auto"
                  disabled={loading}
                >
    <option value="">{t("modal.generate_list")}</option>
                </button>
              </Form>
              <hr />
              {!!getTableDataLoading && <Loader />}
              {!getTableDataLoading && (
                // <Table responsive striped bordered hover>
                //   <thead>
                //     <tr>
                //       <th>Created At</th>
                //       <th>Download</th>
                //       <th>File Type</th>
                //     </tr>
                //   </thead>
                //   <tbody>
                //     {tableData.map((values) => (
                //       <tr>
                //         <td>{new Date(values?.created_at)?.toLocaleDateString('en-GB').replace(new RegExp("/", 'g'),"-")}</td>
                //         <td>
                //           <a class="btn btn-success" target="_blank" href={`${values?.file_path}/${values?.filename}`}>
                //             Download - {values?.file_type}
                //           </a>
                //         </td>
                //         <td>{values?.file_type}</td>
                //       </tr>
                //     ))}
                //   </tbody>
                // </Table>
                <ReportsTable
                  tableData={tableData}
                  headings={[t("modal.created_at"), t("modal.file_type"), t("modal.download")]}
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
          {t("modal.close")}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SalesLists;
