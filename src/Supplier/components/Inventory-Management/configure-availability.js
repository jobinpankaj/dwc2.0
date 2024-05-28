import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import NumericInput from "react-numeric-input";
import useAuthInterceptor from "../../../utils/apis";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import "../../assets/scss/dashboard.scss";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const ConfigureAvailability = () => {
  const apis = useAuthInterceptor();
  const { t, i18n } = useTranslation();
  const { state } = useLocation();
  const { product_id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("supplier_accessToken");
  const [limited, setLimited] = useState(false);
  const [visibilityList, setVisibilityList] = useState("");
  const [selectedVisibility, setSelectedVisibility] = useState("");
  const [companyList, setCompanyList] = useState("");
  const [groupsList, setGroupsList] = useState("");
  const [editableGroups, setEditableGroups] = useState("");
  const [editableGroups2, setEditableGroups2] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [visibilityError, setVisibilityError] = useState("");
  const [groupError, setGroupError] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [allocation, setAllocation] = useState("");
  const [maximum, setMaximum] = useState("");
  const [group, setGroup] = useState("");
  const [group2, setGroup2] = useState("");
  const [list1dummy, setList1Dummy] = useState([]);
  const [list2dummy, setList2Dummy] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  const [allocationError, setAllocationError] = useState("")
  const [maximumError, setMaximumError] = useState("")

  const handleAllocationGroupChange = (e) => {
    setGroup(e.target.value);
  };

  const handleAllocationGroup2Change = (e) => {
    setGroup2(e.target.value);
  };

  const handleMainGroupChange = (e) => {
    setSelectedGroup(e.target.value);
    setGroupError("");
    setSelectedCompany("");
  };

  const handleAddAllocation = () => {
    if (group === "" || allocation === "") {
      toast.error("Please select both group and allocation number to add.", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setAllocationError("")
      let dummy = list1dummy;
      let convertedObject = JSON.parse(group);
      let dummyObject = {
        group_id: convertedObject.group_id,
        group_name: convertedObject.group_name,
        quantity: allocation,
      };

      dummy.push(dummyObject);
      setList1Dummy(dummy);
      const newGroup = editableGroups.filter(
        (obj) => obj.id !== convertedObject.group_id
      );
      setEditableGroups(newGroup);
      setGroup("");
      setAllocation("");
      setUpdateList(!updateList);
    }
  };

  const handleAddMaximum = () => {
    if (group2 === "" || maximum === "") {
      toast.error("Please select both group and maximum number to add.", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setMaximumError("")
      let dummy = list2dummy;
      let convertedObject = JSON.parse(group2);
      let dummyObject = {
        group_id: convertedObject.group_id,
        group_name: convertedObject.group_name,
        quantity: maximum,
      };

      dummy.push(dummyObject);
      setList2Dummy(dummy);
      const newGroup = editableGroups2.filter(
        (obj) => obj.id !== convertedObject.group_id
      );
      setEditableGroups2(newGroup);
      setGroup2("");
      setMaximum("");
      setUpdateList(!updateList);
    }
  };

  const handleAddAvailability = () => {
    let visibilityValid = true,
      groupValid = true,
      allocationValid = true,
      maximumValid = true,
      companyValid = true;

    if(list1dummy.length === 0){
      setAllocationError("Add atleast one allocation.")
      allocationValid = false
    }

    if(list2dummy.length === 0){
      setMaximumError("Add atleast one maximum.")
      maximumValid = false
    }

    if (selectedVisibility === "") {
      visibilityValid = false;
      setVisibilityError("Please select a visibility criteria");
    }

    if (
      (selectedVisibility == 2 || selectedVisibility == 3) &&
      selectedGroup === ""
    ) {
      groupValid = false;
      setGroupError("Please select a group.");
    }

    if (
      (selectedVisibility == 2 || selectedVisibility == 3) &&
      selectedCompany === ""
    ) {
      companyValid = false;
      setCompanyError("Please select a company.");
    }

    if (
      visibilityValid === false ||
      groupValid === false ||
      companyValid === false ||
      !allocationValid ||
      !maximumValid
    ) {
      console.log("Validation Error");
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: "inventory-edit",
        },
      };

      const bodyData = {
        product_id: product_id,
        visibility_id: selectedVisibility,
        groups: selectedGroup,
        companies: selectedCompany,
        is_limited: limited ? 1 : 0,
      };

      if (list1dummy.length > 0) {
        let newArr = [];
        for (let i = 0; i < list1dummy.length; i++) {
          let newObj = {
            group_id: list1dummy[i].group_id,
            quantity: list1dummy[i].quantity,
          };

          newArr.push(newObj);
        }
        bodyData["allocation"] = newArr;
      }

      if (list2dummy.length > 0) {
        let newArr = [];
        for (let i = 0; i < list2dummy.length; i++) {
          let newObj = {
            group_id: list2dummy[i].group_id,
            quantity: list2dummy[i].quantity,
          };
          newArr.push(newObj);
        }
        bodyData["maximum"] = newArr;
      }

      apis
        .post("/supplier/availability/add", bodyData, config)
        .then((res) => {
          if (res.data.success === true) {
            toast.success("Availability added for the product.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
            navigate("/supplier/inventory-management");
          } else {
            toast.error("Could not add availability. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((error) => {
          if(error.message !== "revoke"){
            toast.error("Could not add availability. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });
    }
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    apis
      .get("/getVisibilities", config)
      .then((res) => {
        if (res.data.success === true) {
          setVisibilityList(res.data.data);
        } else {
          toast.error(
            "Could not fetch visibilty options. Please try again later.",
            { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
          );
        }
      })
      .catch((error) => {
        if(error.message !== "revoke"){
          toast.error(
            "Could not fetch visibilty options. Please try again later.",
            { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
          );
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
          setEditableGroups(res.data.data);
          setEditableGroups2(res.data.data);
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
  }, []);

  useEffect(() => {
    if (selectedGroup !== "") {
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
            title={t("supplier.inventory_management.config_availability.title")}
          />
          <div class="container-fluid page-content-box px-3 px-sm-4">
            <div class="row">
              <div class="col-sm-12">
                <form>
                  <div className="card p-2 p-sm-4  mb-3">
                    <div className="card-body">
                      <h3 className="titleName d-flex align-items-center">
                        {state.product_name}
                      </h3>
                      <hr />
                      <div className="row">
                        <div className="col-sm-12 col-xxl-10">
                          <h4 className="d-flex align-items-center gap-2">
                            {t(
                              "supplier.inventory_management.config_availability.available"
                            )}
                          </h4>
                          <div className="formBx">
                            <div className="row">
                              <div class="col-12 mb-3">
                                <div class="form-check form-switch d-flex align-items-center twoSideSwitch">
                                  <label
                                    class="form-check-label"
                                    for="flexSwitchCheck2"
                                  >
                                    {state.product_quantity}
                                  </label>
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="flexSwitchCheck2"
                                    checked={limited}
                                    onChange={(e) =>
                                      setLimited(e.target.checked)
                                    }
                                  />
                                  <label
                                    class="form-check-label"
                                    for="flexSwitchCheck2"
                                  >
                                    {t(
                                      "supplier.inventory_management.config_availability.limited"
                                    )}
                                  </label>
                                </div>
                              </div>
                              <div className="col-sm-6 col-xl-3 mb-3">
                                <label className="form-label">
                                  {t(
                                    "supplier.inventory_management.config_availability.visibility"
                                  )}
                                </label>
                                <select
                                  className="form-select border-0 border-bottom rounded-0"
                                  value={selectedVisibility}
                                  onChange={(e) => {
                                    setSelectedVisibility(e.target.value);
                                    setVisibilityError("");
                                    setSelectedGroup("");
                                    setSelectedCompany("");
                                  }}
                                >
                                  <option value="">Select visibility</option>
                                  {visibilityList &&
                                  visibilityList.length > 0 ? (
                                    visibilityList.map((ele) => {
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
                                {visibilityError !== "" ? (
                                  <p className="error-label">
                                    {visibilityError}
                                  </p>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div
                                className="col-sm-6 col-xl-3 mb-3"
                                style={{
                                  display:
                                    selectedVisibility == "3" ||
                                    selectedVisibility == "2"
                                      ? ""
                                      : "none",
                                }}
                              >
                                <label className="form-label">
                                  {t(
                                    "supplier.inventory_management.config_availability.group"
                                  )}
                                </label>
                                <select
                                  className="form-select border-0 border-bottom rounded-0"
                                  value={selectedGroup}
                                  onChange={(e) => handleMainGroupChange(e)}
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
                              <div
                                className="col-sm-6 col-xl-3 mb-3"
                                style={{
                                  display:
                                    selectedVisibility == "3" ||
                                    selectedVisibility == "2"
                                      ? ""
                                      : "none",
                                }}
                              >
                                <label className="form-label">
                                  {t(
                                    "supplier.inventory_management.config_availability.company"
                                  )}
                                </label>
                                <select
                                  className="form-select border-0 border-bottom rounded-0"
                                  value={selectedCompany}
                                  onChange={(e) => {
                                    setSelectedCompany(e.target.value);
                                    setCompanyError("");
                                  }}
                                  disabled={selectedGroup === "" ? true : false}
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
                  {/* [Card Table] */}
                  {/* <div className="card mb-3 height-100 ">
                    <div className="card-body p-0">
                      <div className="row">
                        <div className="col">
                          <div className="table-responsive">
                            <table className="table table-striped m-0 tableSpacing">
                              <thead>
                                <tr>
                                  <th>Distributed by</th>
                                  <th>Available for sale</th>
                                  <th>ordered</th>
                                  <th>distributed stock</th>
                                  <th>local stock</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Bucke Distribution</td>
                                  <td>76</td>
                                  <td>
                                    8502 Preston Rd. Inglewood, Maine 98380
                                  </td>
                                  <td>1</td>
                                  <td>23</td>
                                  <td> </td>
                                </tr>
                                <tr>
                                  <td>Bucke Distribution</td>
                                  <td>76</td>
                                  <td>
                                    8502 Preston Rd. Inglewood, Maine 98380
                                  </td>
                                  <td>1</td>
                                  <td>23</td>
                                  <td> </td>
                                </tr>
                              </tbody>
                              <tfoot>
                                <tr>
                                  <td> </td>
                                  <td> </td>
                                  <td> </td>
                                  <td> </td>
                                  <td> </td>
                                  <td> </td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {/* [/Card Table] */}

                  {/* accordian start */}
                  <div class="accordion mb-5" id="accordionExample">
                    <div class="accordion-item mb-3">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          {t(
                            "supplier.inventory_management.config_availability.allocation"
                          )}
                          {allocationError !== "" ? (
                                  <p className="error-label">{"(" + allocationError + ")"}</p>
                                ) : (
                                  <></>
                                )}
                        </button>
                      </h2>
                      
                      <div
                        id="collapseOne"
                        class="accordion-collapse collapse show"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body p-0">
                          <div className="table-responsive">
                            <table className="table table-striped m-0 tableSpacing ">
                              <thead>
                                <tr>
                                  <th>
                                    {t(
                                      "supplier.inventory_management.config_availability.table1_col1"
                                    )}
                                  </th>
                                  <th>
                                    {t(
                                      "supplier.inventory_management.config_availability.table1_col2"
                                    )}
                                  </th>
                                  <th>
                                    {t(
                                      "supplier.inventory_management.config_availability.table1_col3"
                                    )}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {list1dummy && list1dummy.length > 0 ? (
                                  list1dummy.map((ele) => {
                                    return (
                                      <tr>
                                        <td>Unallocated</td>
                                        <td>{ele.group_name}</td>
                                        <td>{ele.quantity}</td>
                                      </tr>
                                    );
                                  })
                                ) : (
                                  <tr>
                                    <td>No Group Added</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                          <div className="formBx mt-0 px-4 pb-4">
                            <div className="row">
                              <div class="col-sm-6 col-xl-4 mb-3">
                                <label class="form-label">
                                  {t(
                                    "supplier.inventory_management.config_availability.add_group"
                                  )}
                                </label>
                                <select
                                  className="form-select border-0 border-bottom rounded-0"
                                  value={group}
                                  onChange={(e) =>
                                    handleAllocationGroupChange(e)
                                  }
                                >
                                  <option value="">Select Group</option>
                                  {editableGroups &&
                                  editableGroups.length > 0 ? (
                                    editableGroups.map((ele) => {
                                      return (
                                        <option
                                          value={JSON.stringify({
                                            group_id: ele.id,
                                            group_name: ele.name,
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
                              </div>
                              <div class="col-sm-6 col-xl-4 mb-3">
                                <label class="form-label">
                                  {t(
                                    "supplier.inventory_management.config_availability.add_quantity"
                                  )}
                                </label>
                                <NumericInput
                                  className="form-control border-0 border-bottom rounded-0"
                                  value={allocation}
                                  min={1}
                                  onChange={(e) => setAllocation(e)}
                                  step={1}
                                  precision={0}
                                  size={5}
                                  strict
                                />
                              </div>
                              <div class="col-sm-6 col-xl-4 mb-3">
                                <a
                                  class="btn btn-purple mt-3"
                                  onClick={() => handleAddAllocation()}
                                >
                                  <i className="rounded-circle">+</i>
                                  {t(
                                    "supplier.inventory_management.config_availability.add"
                                  )}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          {t(
                            "supplier.inventory_management.config_availability.max"
                          )}
                          {maximumError !== "" ? (
                                  <p className="error-label">{"(" + maximumError + ")"}</p>
                                ) : (
                                  <></>
                                )}
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body p-0">
                          <div className="table-responsive">
                            <table className="table table-striped m-0 tableSpacing ">
                              <thead>
                                <tr>
                                  <th>
                                    {t(
                                      "supplier.inventory_management.config_availability.table2_col1"
                                    )}
                                  </th>
                                  <th>
                                    {t(
                                      "supplier.inventory_management.config_availability.table2_col2"
                                    )}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {list2dummy && list2dummy.length > 0 ? (
                                  list2dummy.map((ele) => {
                                    return (
                                      <tr>
                                        <td>{ele.group_name}</td>
                                        <td>{ele.quantity}</td>
                                      </tr>
                                    );
                                  })
                                ) : (
                                  <tr>
                                    <td>No Group Added</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                          <div className="formBx mt-0 px-4 pb-4">
                            <div className="row">
                              <div class="col-sm-6 col-xl-4 mb-3">
                                <label class="form-label">
                                  {t(
                                    "supplier.inventory_management.config_availability.add_group_2"
                                  )}
                                </label>
                                <select
                                  className="form-select border-0 border-bottom rounded-0"
                                  value={group2}
                                  onChange={(e) =>
                                    handleAllocationGroup2Change(e)
                                  }
                                >
                                  <option value="">Select Group</option>
                                  {editableGroups2 &&
                                  editableGroups2.length > 0 ? (
                                    editableGroups2.map((ele) => {
                                      return (
                                        <option
                                          value={JSON.stringify({
                                            group_id: ele.id,
                                            group_name: ele.name,
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
                              </div>
                              <div class="col-sm-6 col-xl-4 mb-3">
                                <label class="form-label">
                                  {t(
                                    "supplier.inventory_management.config_availability.add_max"
                                  )}
                                </label>
                                <NumericInput
                                  className="form-control border-0 border-bottom rounded-0"
                                  value={maximum}
                                  min={1}
                                  onChange={(e) => setMaximum(e)}
                                  step={1}
                                  precision={0}
                                  size={5}
                                  strict
                                />
                              </div>
                              <div class="col-sm-6 col-xl-4 mb-3">
                                <a
                                  class="btn btn-purple mt-3"
                                  onClick={() => handleAddMaximum()}
                                >
                                  <i className="rounded-circle">+</i>
                                  {t(
                                    "supplier.inventory_management.config_availability.add_product"
                                  )}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* accordian end */}

                  <div className="row ">
                    <div className="col">
                      <button
                        type="button"
                        onClick={() =>
                          navigate("/supplier/inventory-management")
                        }
                        className="btn btn-outline-black me-3"
                      >
                        {t(
                          "supplier.inventory_management.config_availability.cancel_btn"
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddAvailability()}
                        className="btn btn-purple"
                      >
                        {t(
                          "supplier.inventory_management.config_availability.create_btn"
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

export default ConfigureAvailability;
