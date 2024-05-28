import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import NumericInput from "react-numeric-input";
import { toast } from "react-toastify";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import "../../assets/scss/dashboard.scss";
import useAuthInterceptor from "../../../utils/apis";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const EditPricing = () => {
  const apis = useAuthInterceptor();
  const {state} = useLocation()
  const { t, i18n } = useTranslation();
  let numberRegEx = /^\d*\.?\d*$/;
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("supplier_accessToken");
  const [taxes, setTaxes] = useState("");
  const [pricing, setPricing] = useState("");
  const [priceError, setPriceError] = useState("");
  const [selectedTax, setSelectedTax] = useState("");
  const [targetTax, setTargetTax] = useState("");
  const [taxId, setTaxId] = useState("");
  const [taxError, setTaxError] = useState("");
  const [suggestion, setSuggestion] = useState(false);
  const [calUnit, setCalUnit] = useState("");
  const [calTotal, setCalTotal] = useState("");
  const [calUnitTotal, setCalUnitTotal] = useState("");
  const [marginPer, setMarginPer] = useState("");
  const [marginAmt, setMarginAmt] = useState("");
  const [retailUnitPrice, setRetailerUnitPrice] = useState("");
  const [totalRetailUnitPrice, setTotalRetailUnitPrice] = useState("");
  const [internalName, setInternalName] = useState("");
  const [discountType, setDiscountType] = useState("dollars");
  const [discount, setDiscount] = useState(0);
  const [isMinimum, setIsMinimum] = useState(false);
  const [forMinimum, setForMinimum] = useState(1);
  const [toAll, setToAll] = useState(false);
  const [groupsList, setGroupsList] = useState("");
  const [companyList, setCompanyList] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [groupError, setGroupError] = useState("");
  const [units, setUnits] = useState("")
  const [targetProduct, setTargetProduct] = useState("")

  const handlePriceChange = (e) => {
    if (numberRegEx.test(e.target.value)) {
      setPriceError("");
      setPricing(e.target.value);
      if (e.target.value == "") {
        setRetailerUnitPrice(0.0);
        setMarginAmt(0);
        setMarginPer(0);
      }
    }
  };

  const handleSuggestionCheck = (e) => {
    setSuggestion(e.target.checked);
  };

  const handleTaxChange = (e) => {
    setTargetTax(e.target.value);
    setTaxError("");
    if (e.target.value !== "") {
      let parseTax = JSON.parse(e.target.value);
      setSelectedTax(parseTax.taxValue);
      setTaxId(parseTax.taxId);
    } else {
      setSelectedTax("");
      setTaxId("");
    }
  };

  const handleRetailPriceChange = (e) => {
    setRetailerUnitPrice(e);
  };

  const handleSavePricing = () => {
    let priceValid = true,
      taxValid = true,
      companyValid = true,
      groupValid = true;

    if (pricing == "") {
      priceValid = false;
      setPriceError("Price is required.");
    }

    if (targetTax == "") {
      taxValid = false;
      setTaxError("Tax selection required.");
    }

    if (toAll && selectedGroup == "") {
      groupValid = false;
      setGroupError("Please select a group.");
    }

    if (toAll && selectedCompany == "") {
      companyValid = false;
      setCompanyError("Please select a company.");
    }

    if (
      priceValid == false ||
      taxValid == false ||
      companyValid == false ||
      groupValid == false
    ) {
      console.log("Validation Error");
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: "pricing-edit",
        },
      };

      let discountAsOf = forMinimum.toString();

      const bodyData = {
        product_id: targetProduct,
        unit_price: calUnit,
        price: pricing,
        tax_id: taxId,
        tax_amount: selectedTax,
        suggest_retail_price: suggestion ? "1" : "0",
        retail_unit_price: retailUnitPrice,
        total_price: calTotal,
        total_unit_price: calUnitTotal,
        total_retail_price: totalRetailUnitPrice,
        discount_percent: discount,
        discount_name: internalName,
        discount_type: discountType,
        is_minimum: isMinimum ? "1" : "0",
        discount_as_of: discountAsOf,
        specific_audience: toAll ? "1" : "0",
        group_id: selectedGroup,
        company_id: selectedCompany,
      };

      apis
        .post(`/supplier/pricing/${id}/update`, bodyData, config)
        .then((res) => {
          if (res.data.success === true) {
            toast.success("Pricing updated successfully", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
            navigate("/supplier/pricing-availability");
          } else {
            toast.error("Could not add pricing. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((error) => {
          if(error.message !== "revoke"){
            toast.error("Could not add pricing. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });
    }
  };

  useEffect(() => {
    if (pricing !== "" && selectedTax !== "") {
      // Total Price Calculation
      const convertedPricing = parseFloat(pricing);
      const convertedTax = parseFloat(selectedTax);
      const calculatedTax = (convertedTax / 100) * convertedPricing;
      const totalPrice = convertedPricing + calculatedTax;
      setCalTotal(totalPrice.toFixed(2));

      // Total Unit price calculation
      const calculatedUnitPrice = convertedPricing / units;
      const calculatedUnitTax = (convertedTax / 100) * calculatedUnitPrice;
      const totalUnitPrice = calculatedUnitTax + calculatedUnitPrice;
      setCalUnitTotal(totalUnitPrice.toFixed(2));
    }
  }, [pricing, selectedTax]);

  useEffect(() => {
    if (pricing !== "") {
      // Unit Price Calculation
      const convertedPricing = parseFloat(pricing);
      const calculatedUnitPrice = convertedPricing / units;
      setCalUnit(calculatedUnitPrice.toFixed(2));
      if(retailUnitPrice === ""){
        setRetailerUnitPrice(calculatedUnitPrice.toFixed(2));
      }
    }
  }, [pricing]);

  useEffect(() => {
    // Calculate Margin
    if (suggestion && pricing !== "") {
      const calMarginAmt = retailUnitPrice - calUnit;
      setMarginAmt(calMarginAmt.toFixed(2));
      const calMarginPer = (calMarginAmt / calUnit) * 100;
      setMarginPer(calMarginPer.toFixed(2));
    }

    if (selectedTax !== "" && suggestion) {
      const convertedTax = parseFloat(selectedTax);
      const calculatedTax = (convertedTax / 100) * parseFloat(retailUnitPrice);
      const totalRetailUnit = parseFloat(retailUnitPrice) + calculatedTax;
      const convertedTotal = parseFloat(totalRetailUnit);
      setTotalRetailUnitPrice(convertedTotal.toFixed(2));
    }
  }, [retailUnitPrice, suggestion, selectedTax]);

  useEffect(() => {
    const calMarginAmt = (marginPer/100) * calUnit
    setMarginAmt(calMarginAmt.toFixed(2))
    const newRetailUnitPrice = parseFloat(calMarginAmt) + parseFloat(calUnit)
    setRetailerUnitPrice(newRetailUnitPrice.toFixed(2))
  }, [marginPer])

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    apis
      .get(`/getTaxes`, config)
      .then((res) => {
        if (res.data.success === true) {
          setTaxes(res.data.data);
        } else {
          toast.error("Could not fetch taxes. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        if(error.message !== "revoke"){
          toast.error("Could not fetch taxes. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });

    apis
      .get("/supplier/getLinkedDistributorsCompany", config)
      .then((res) => {
        if (res.data.success === true) {
          setCompanyList(res.data.data);
        } else {
          toast.error("Could not fetch companies. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        if(error.message !== "revoke"){
          toast.error("Could not fetch companies. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });

    const config2 = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "groups-view",
      },
    };

    apis
      .get("/supplier/groups", config2)
      .then((res) => {
        if (res.data.success === true) {
          setGroupsList(res.data.data);
        } else {
          toast.error("Could not fetch groups. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        if(error.message !== "revoke"){
          toast.error("Could not fetch groups. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });

      const config3 = {
        headers : {
          Authorization: `Bearer ${token}`,
          permission: "pricing-view"
        }
      }

      apis.get(`/supplier/pricing/${id}`, config3)
      .then((res) => {
        if(res.data.success === true){
          setTargetTax(JSON.stringify({
            taxId: res.data.data.tax_id,
            taxValue: res.data.data.tax_amount,
          }))
          setSelectedTax(res.data.data.tax_amount);
          setTaxId(res.data.data.tax_id);
          setPricing(res.data.data.price)
          if(res.data.data.suggest_retail_price === 1){
            setSuggestion(true)
          }else{
            setSuggestion(false)
          }
          setUnits(1)
          setRetailerUnitPrice(res.data.data.retail_unit_price)
          setCalTotal(res.data.data.total_price)
          setCalUnit(res.data.data.unit_price)
          setCalUnitTotal(res.data.data.total_unit_price)
          setTotalRetailUnitPrice(res.data.data.total_retail_price)
          setDiscount(res.data.data.discount_percent)
          setInternalName(res.data.data.discount_name)
          setDiscountType(res.data.data.discount_type)
          if(res.data.data.is_minimum === 1){
            setIsMinimum(true)
          }else{
            setIsMinimum(false)
          }

          setForMinimum(res.data.data.discount_as_of)
          if(res.data.data.specific_audience === 1){
            setToAll(true)
          }else{
            setToAll(false)
          }
          setSelectedCompany(res.data.data.company_id)
          setSelectedGroup(res.data.data.group_id)
          setTargetProduct(res.data.data.product_id)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  useEffect(() => {
    if (selectedGroup !== "" && selectedGroup) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: "groups-view",
        },
      };

      apis
        .get(`/supplier/group/${selectedGroup}`, config)
        .then((res) => {
          if (res.data.success === true) {
            setCompanyList(res.data.data.retailers);
          } else {
            toast.error("Could not fetch companies. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((error) => {
          if(error.message !== "revoke"){
            toast.error("Could not fetch companies. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });
    }
  }, [selectedGroup]);
  return (
    <div class="container-fluid page-wrap inventory-manage">
      <div class="row height-inherit">
        <Sidebar userType={"supplier"} />

        <div class="col main p-0">
          <Header
            title={"Edit Pricing"}
          />
          <div class="container-fluid page-content-box px-3 px-sm-4">
            <div class="row">
              <div class="col-sm-12">
                <form>
                  <div className="card p-2 p-sm-4  mb-3">
                    <div className="card-body">
                      <h3 className="titleName">
                        Edit Pricing
                      </h3>
                      <hr />
                      <div className="row">
                        <div className="col-sm-12 col-xxl-10">
                          <h4 className="d-flex align-items-center gap-2">
                            {t(
                              "supplier.inventory_management.config_price.for"
                            ) +
                            `: ${state.product_name} (${state.product_format})`}
                          </h4>
                          <div className="formBx">
                            <div className="row">
                              <div className="col-sm-6 col-xl-3 mb-3">
                                <label className="form-label">
                                  {t(
                                    "supplier.inventory_management.config_price.price"
                                  )}
                                </label>
                                <div className="sudo dollerSign">
                                  <input
                                    className="form-control border-0 border-bottom rounded-0"
                                    type="text"
                                    placeholder={t(
                                      "supplier.inventory_management.config_price.price_ph"
                                    )}
                                    value={pricing}
                                    onChange={(e) => handlePriceChange(e)}
                                  />
                                  {priceError !== "" ? (
                                    <p className="error-label">{priceError}</p>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                              <div className="col-sm-6 col-xl-3 mb-3">
                                <label className="form-label">
                                  {t(
                                    "supplier.inventory_management.config_price.tax"
                                  )}
                                </label>
                                <select
                                  className="form-select border-0 border-bottom rounded-0"
                                  value={targetTax}
                                  onChange={(e) => handleTaxChange(e)}
                                >
                                  <option value="">
                                    {t(
                                      "supplier.inventory_management.config_price.tax_ph"
                                    )}
                                  </option>
                                  {taxes && taxes.length > 0 ? (
                                    taxes.map((ele) => {
                                      return (
                                        <option
                                          value={JSON.stringify({
                                            taxId: ele.id,
                                            taxValue: ele.tax,
                                          })}
                                        >
                                          {ele.name}
                                        </option>
                                      );
                                    })
                                  ) : (
                                    <></>
                                  )}
                                </select>
                                {taxError !== "" ? (
                                  <p className="error-label">{taxError}</p>
                                ) : (
                                  <></>
                                )}
                              </div>

                              <div className="col-sm-12 mb-3">
                                <div class="form-check">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                    checked={suggestion}
                                    onChange={(e) => handleSuggestionCheck(e)}
                                  />
                                  <label
                                    class="form-check-label"
                                    for="flexCheckDefault"
                                  >
                                    {" "}
                                    {t(
                                      "supplier.inventory_management.config_price.suggested"
                                    )}{" "}
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div
                              className="row"
                              style={{ display: suggestion ? "" : "none" }}
                            >
                              <div className="col-sm-6 col-xl-3 mb-3">
                                <label className="form-label">
                                  {t(
                                    "supplier.inventory_management.config_price.retail"
                                  )}
                                </label>
                                <div className="sudo dollerSign">
                                  <NumericInput
                                    className="form-control border-0 border-bottom rounded-0"
                                    value={retailUnitPrice}
                                    min={calUnit}
                                    onChange={(e) => handleRetailPriceChange(e)}
                                    step={0.01}
                                    precision={2}
                                    size={5}
                                    strict
                                  />
                                  {/* <input className="form-control border-0 border-bottom rounded-0" type="text" placeholder="" value="65"/> */}
                                </div>
                              </div>
                              <div className="col-sm-6 col-xl-3 mb-3">
                                <label className="form-label">
                                  Suggested Retail Margin (%)
                                </label>
                                <div className="sudo percentSign">
                                  <NumericInput
                                    className="form-control border-0 border-bottom rounded-0"
                                    value={marginPer}
                                    min={0.00}
                                    onChange={(e) => setMarginPer(e)}
                                    step={0.01}
                                    precision={2}
                                    size={5}
                                    strict
                                  />
                                  
                                </div>
                              </div>
                              <div className="col-sm-6 col-xl-3 mb-3">
                                <label className="form-label">
                                  Suggested Retail Margin ($)
                                </label>
                                <div className="">
                                  <input
                                    className="form-control border-0 border-bottom rounded-0 percent"
                                    type="text"
                                    placeholder=""
                                    value={`$ ${marginAmt}`}
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>

                            <div
                              className="row"
                              style={{ display: pricing === "" ? "none" : "" }}
                            >
                              <div className="col-sm-12 col-xl-auto mb-4">
                                <div className="card p-1 p-sm-3 w-auto">
                                  <div className="card-body">
                                    <div className="row totalCalulationPrice">
                                      <div className="col-sm-auto col-12 mb-2 mb-sm-0">
                                        <div class="prodOtherInfo h-100">
                                          <div class="badge text-bg-light OtherInfo-in w-100">
                                            <div class="name">
                                              {t(
                                                "supplier.inventory_management.config_price.unit"
                                              )}
                                            </div>
                                            <div className="sudo dollerSign">
                                              <div class="discreption-In price">
                                                {calUnit}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        className="col-sm-auto col-12 mb-2 mb-sm-0"
                                        style={{
                                          display:
                                            selectedTax && selectedTax !== "" ? "" : "none",
                                        }}
                                      >
                                        <div class="prodOtherInfo h-100">
                                          <div class="badge text-bg-light OtherInfo-in w-100">
                                            <div class="name">
                                              {t(
                                                "supplier.inventory_management.config_price.total"
                                              )}
                                            </div>
                                            <div className="sudo dollerSign">
                                              <div class="discreption-In price">
                                                {calTotal}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        className="col-sm-auto col-12 mb-2 mb-sm-0"
                                        style={{
                                          display:
                                          selectedTax && selectedTax !== "" ? "" : "none"
                                        }}
                                      >
                                        <div class="prodOtherInfo h-100">
                                          <div class="badge text-bg-light OtherInfo-in w-100">
                                            <div class="name">
                                              {t(
                                                "supplier.inventory_management.config_price.total_unit"
                                              )}
                                            </div>
                                            <div className="sudo dollerSign">
                                              <div class="discreption-In price">
                                                {calUnitTotal}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        className="col-sm-auto col-12 mb-2 mb-sm-0"
                                        style={{
                                          display:
                                            selectedTax && selectedTax !== "" && suggestion && suggestion !== false
                                              ? ""
                                              : "none",
                                        }}
                                      >
                                        <div class="prodOtherInfo h-100">
                                          <div class="badge text-bg-light OtherInfo-in w-100">
                                            <div class="name">
                                              {t(
                                                "supplier.inventory_management.config_price.total_retail"
                                              )}{" "}
                                            </div>
                                            <div className="sudo dollerSign">
                                              <div class="discreption-In price">
                                                {totalRetailUnitPrice}
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
                  <div className="card  p-2 p-sm-4 mb-5">
                    <div className="card-body">
                      <h3 className="titleName">
                        {t(
                          "supplier.inventory_management.config_price.header_2"
                        )}
                      </h3>
                      <hr />
                      <div className="row">
                        <div className="col-sm-12 col-xxl-10">
                          <div className="formBx">
                            <div className="row">
                              <div className="col-sm-6 col-xl-3 mb-3">
                                <label className="form-label">
                                  {t(
                                    "supplier.inventory_management.config_price.discount"
                                  )}
                                </label>
                                <div
                                  className={
                                    discountType == "percentage"
                                      ? "sudo percentSign"
                                      : "sudo dollerSign"
                                  }
                                >
                                  <NumericInput
                                    className="form-control border-0 border-bottom rounded-0"
                                    value={discount}
                                    min={0}
                                    onChange={(e) => setDiscount(e)}
                                    step={1}
                                    precision={0}
                                    size={5}
                                    strict
                                  />
                                  {/* <input className="form-control border-0 border-bottom rounded-0" type="text" placeholder="" value=" 65"/> */}
                                </div>
                              </div>
                              <div className="col-sm-6 col-xl-3 mb-3">
                                <label className="form-label">
                                  {t(
                                    "supplier.inventory_management.config_price.name"
                                  )}
                                </label>
                                <input
                                  className="form-control border-0 border-bottom rounded-0"
                                  type="text"
                                  placeholder={t(
                                    "supplier.inventory_management.config_price.name_ph"
                                  )}
                                  value={internalName}
                                  onChange={(e) =>
                                    setInternalName(e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-sm-12 mb-3">
                                <div
                                  className="radioBox"
                                  onChange={(e) =>
                                    setDiscountType(e.target.value)
                                  }
                                >
                                  <div class="form-check form-check-inline">
                                    <input
                                      class="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault"
                                      id="Percentage"
                                      value="percentage"
                                      checked={discountType === "percentage"}
                                    />
                                    <label
                                      class="form-check-label"
                                      for="Percentage"
                                    >
                                      {t(
                                        "supplier.inventory_management.config_price.percentage"
                                      )}
                                    </label>
                                  </div>
                                  <div class="form-check form-check-inline">
                                    <input
                                      class="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault"
                                      id="Dollors"
                                      value="dollars"
                                      checked={discountType === "dollars"}
                                    />
                                    <label
                                      class="form-check-label"
                                      for="Dollors"
                                    >
                                      {t(
                                        "supplier.inventory_management.config_price.dollors"
                                      )}
                                    </label>
                                  </div>
                                  <div class="form-check form-check-inline">
                                    <input
                                      class="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault"
                                      id="Special_Price"
                                      value="special price"
                                      checked={discountType === "special price"}
                                    />
                                    <label
                                      class="form-check-label"
                                      for="Special_Price"
                                    >
                                      {t(
                                        "supplier.inventory_management.config_price.special"
                                      )}
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <h3 className="titleName">
                        {t(
                          "supplier.inventory_management.config_price.header_3"
                        )}
                      </h3>
                      <hr />
                      <div className="row">
                        <div className="col-12">
                          <div className="formBx">
                            <div className="col-auto mb-3">
                              <div class="form-check form-switch d-flex align-items-center twoSideSwitch">
                                <label
                                  class="form-check-label"
                                  for="flexSwitchCheck2"
                                >
                                  {t(
                                    "supplier.inventory_management.config_price.no_min"
                                  )}
                                </label>
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="flexSwitchCheck2"
                                  checked={isMinimum}
                                  onChange={(e) =>
                                    setIsMinimum(e.target.checked)
                                  }
                                />
                                <label
                                  class="form-check-label"
                                  for="flexSwitchCheck2"
                                >
                                  {t(
                                    "supplier.inventory_management.config_price.with_min"
                                  )}
                                </label>
                              </div>
                            </div>
                            <div
                              className="discountASoff d-flex flex-column flex-sm-row align-items-sm-end align-items-start mb-4"
                              style={{ display: isMinimum ? "" : "none" }}
                            >
                              <div
                                className="inline-block"
                                style={{ display: isMinimum ? "" : "none" }}
                              >
                                <label className="form-label">
                                  {t(
                                    "supplier.inventory_management.config_price.as_of"
                                  )}
                                </label>
                                <NumericInput
                                  className="form-control border-0 border-bottom rounded-0"
                                  value={forMinimum}
                                  min={1}
                                  onChange={(e) => setForMinimum(e)}
                                  step={1}
                                  precision={0}
                                  size={5}
                                  strict
                                />
                              </div>
                              <span
                                className="inline-block pe-3"
                                style={{ display: isMinimum ? "" : "none" }}
                              >
                                {/* {state.product_format} */}
                              </span>
                              <div
                                class="radioBox"
                                style={{ display: isMinimum ? "" : "none" }}
                              >
                                <div class="form-check form-check-inline">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    name="unit"
                                    id="AllUnits"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="AllUnits"
                                  >
                                    {t(
                                      "supplier.inventory_management.config_price.all"
                                    )}
                                  </label>
                                </div>
                                <div class="form-check form-check-inline">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    name="unit"
                                    id="UnitsAbove1"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="UnitsAbove1"
                                  >
                                    {t(
                                      "supplier.inventory_management.config_price.above"
                                    )}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <h3 className="titleName">
                        {t(
                          "supplier.inventory_management.config_price.header_4"
                        )}
                      </h3>
                      <hr />
                      <div className="row">
                        <div className="col-sm-12 col-xxl-10">
                          <div className="formBx">
                            <div className="col-auto mb-3">
                              <div class="form-check form-switch d-flex align-items-center twoSideSwitch">
                                <label
                                  class="form-check-label"
                                  for="flexSwitchCheck2"
                                >
                                  {t(
                                    "supplier.inventory_management.config_price.app_all"
                                  )}
                                </label>
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="flexSwitchCheck2"
                                  checked={toAll}
                                  onChange={(e) => setToAll(e.target.checked)}
                                />
                                <label
                                  class="form-check-label"
                                  for="flexSwitchCheck2"
                                >
                                  {t(
                                    "supplier.inventory_management.config_price.specific"
                                  )}
                                </label>
                              </div>
                            </div>
                            <div
                              className="row"
                              style={{ display: toAll ? "" : "none" }}
                            >
                              <div className="col-sm-6 col-xl-3 mb-3">
                                <label className="form-label">
                                  {t(
                                    "supplier.inventory_management.config_price.group"
                                  )}
                                </label>
                                <select
                                  className="form-select border-0 border-bottom rounded-0 ps-0"
                                  value={selectedGroup}
                                  onChange={(e) => {
                                    setSelectedGroup(e.target.value);
                                    setSelectedCompany("");
                                    setGroupError("");
                                  }}
                                >
                                  <option value="">Select Group</option>
                                  {groupsList && groupsList.length > 0 ? (
                                    groupsList.map((ele) => {
                                      return (
                                        <option value={ele.id}>
                                          {ele.name}
                                        </option>
                                      );
                                    })
                                  ) : (
                                    <></>
                                  )}
                                </select>
                                {groupError !== "" ? (
                                  <p className="error-label">{groupError}</p>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div className="col-sm-6 col-xl-3 mb-3">
                                <label className="form-label">
                                  {t(
                                    "supplier.inventory_management.config_price.company"
                                  )}
                                </label>
                                <select
                                  className="form-select border-0 border-bottom rounded-0 ps-0"
                                  value={selectedCompany}
                                  disabled={selectedGroup === "" ? true : false}
                                  onChange={(e) => {
                                    setSelectedCompany(e.target.value);
                                    setCompanyError("");
                                  }}
                                >
                                  <option value="">Select Company</option>
                                  {companyList && companyList.length > 0 ? (
                                    companyList.map((ele) => {
                                      return (
                                        <option value={ele.id}>
                                          {ele.user_profile
                                            ? ele.user_profile.business_name
                                            : "Name not registered"}
                                        </option>
                                      );
                                    })
                                  ) : (
                                    <></>
                                  )}
                                </select>
                                {companyError !== "" ? (
                                  <p className="error-label">{companyError}</p>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col">
                      <button
                        type="button"
                        className="btn btn-outline-black me-3"
                        onClick={() =>
                          navigate(`/supplier/inventory-management`)
                        }
                      >
                        {t(
                          "supplier.inventory_management.config_price.cancel_btn"
                        )}
                      </button>
                      <button
                        type="button"
                        className="btn btn-purple"
                        onClick={() => handleSavePricing()}
                      >
                        {t(
                          "supplier.inventory_management.config_price.save_btn"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPricing;
