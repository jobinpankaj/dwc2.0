import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByPlaceId, getLatLng } from "react-places-autocomplete";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import { styled } from "@mui/system";
import NumericInput from "react-numeric-input";
import { Modal } from "react-bootstrap";
import filter from "../../assets/images/filter-icon.png";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import useAuthInterceptor from "../../../utils/apis";
import "../../assets/scss/dashboard.scss";
import "../../../assets/scss/dashboard.scss";
import { hasPermission } from "../../../CommonComponents/commonMethods";
import {
  INVENTORY_EDIT,
  INVENTORY_VIEW,
  PRICING_EDIT,
  PRODUCT_VIEW,
} from "../../../Constants/constant";
import LoadingOverlay from "react-loading-overlay";

// import '../../assets/css/inventory.css'
toast.configure();

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;
<head>
  <link rel="stylesheet" type="text/css" href="inventory.css" />
</head>;
const SupplierInventoryManagement = () => {
  const apis = useAuthInterceptor();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const token = localStorage.getItem("supplier_accessToken");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [inventoryList, setInventoryList] = useState("");
  const [warehouseName, setWarehouseName] = useState("");
  const [nameError, setNameError] = useState("");
  const [warehouseAddress, setWarehouseAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [targetAddress, setTargetAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [aisle, setAisle] = useState("1");
  const [shelves, setShelves] = useState("1");
  const [warehouseList, setWarehouseList] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [generateAisle, setGenerateAisle] = useState("");
  const [generateShelf, setGenerateShelf] = useState("");
  const [selectedAisle, setSelectedAisle] = useState("");
  const [selectedShelf, setSelectedShelf] = useState("");
  const [productList, setProductList] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [distributorList, setDistributorList] = useState("");
  const [selectedDistributor, setSelectedDistributor] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("1");
  const [targetWarehouse, setTargetWarehouse] = useState("");
  const [productError, setProductError] = useState("");
  const [distributorError, setDistributorError] = useState("");
  const [warehouseError, setWarehouseError] = useState("");
  const [aisleError, setAisleError] = useState("");
  const [shelfError, setShelfError] = useState("");
  const [updateInventory, setUpdateInventory] = useState(false);
  const [exist, setExist] = useState(true);
  const [targetProductId, setTargetProductId] = useState("");
  const [show3, setShow3] = useState(false);
  const [aisleName, setAisleName] = useState("");
  const [shelfName, setShelfName] = useState("");
  const [warehouseCount, setWarehouseCount] = useState(0);
  const [childDivs, setChildDivs] = useState([]);
  const [batch, setBatch] = useState("");
  const [batchError, setBatchError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [stock, setStock] = useState(0);
  const [show4, setShow4] = useState(false);
  const [stockBatch, setStockBatch] = useState("");
  const [stockId, setStockId] = useState("");
  const [stockProduct, setStockProduct] = useState("");
  const [stockReason, setStockReason] = useState("");
  const [aisleNameError, setAisleNameError] = useState("");
  const [shelfNameError, setShelfNameError] = useState("");
  // Transfer List states
  const [transerList, setTransferList] = useState("");
  const [q, setQ] = useState("")
  const [allData, setallData] = useState([]);
  const [p, setP] = useState("");
  const [alldata2, setAlldata2] = useState([])
  const [selectFormatName, setSelectFormatName] = useState("")
  const [reload, setReload] = useState(false)
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const generateAisleOptions = () => {
    let items = [];
    for (let i = 1; i <= generateAisle; i++) {
      items.push(<option value={i}>{i}</option>);
    }
    return items;
  };

  const generateShelfOptions = () => {
    let items = [];
    for (let i = 1; i <= generateShelf; i++) {
      items.push(<option value={i}>{i}</option>);
    }
    return items;
  };

  const handleWarehouseChange = (e) => {
    setWarehouseName(e.target.value);
    setNameError("");
  };

  const handleAisleNameChange = (e) => {
    setAisleName(e.target.value);
    setAisleNameError("");
  };

  const handleShelfNameChange = (e) => {
    setShelfName(e.target.value);
    setShelfNameError("");
  };

  const handleAddressChange = (e) => {
    setAddressError("");
    setWarehouseAddress(e);
    setTargetAddress(e.label);
    geocodeByPlaceId(e.value.place_id).then((res) => {
      getLatLng(res[0]).then((res) => {
        setLatitude(res.lat);
        setLongitude(res.lng);
      });
    });
  };

  const handleCancel1 = () => {
    setShow(false);
    setWarehouseAddress("");
    setWarehouseName("");
    setShelves("1");
    setAisle("1");
  };

  const handleSaveWarehouse = () => {
    let warehouseValid = true,
      addressValid = true;
    if (warehouseName == "") {
      setNameError("Warehouse name is required.");
      warehouseValid = false;
    }

    if (warehouseAddress == "") {
      setAddressError("Warehouse address is required.");
    }

    if (!addressValid || !warehouseValid) {
      console.log("Validation Error");
    } else {
      setShow(false);
      setWarehouseAddress("");
      setWarehouseName("");
      setShelves("1");
      setAisle("1");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: "inventory-edit",
        },
      };

      const bodyData = {
        name: warehouseName,
        address: targetAddress,
        aisles: aisle,
        shelves: shelves,
        latitude: latitude,
        longitude: longitude,
      };

      apis
        .post("/supplier/warehouse/add", bodyData, config)
        .then((res) => {
          if (res.data.success === true) {
            toast.success(res.data.message, {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
            setWarehouseCount(warehouseCount + 1);
          } else {
            toast.error("Could not create warehouse. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((error) => {
          if (error.message !== "revoke") {
            toast.error("Could not create warehouse. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });
    }
  };

  const handleSelectedWarehouse = (e) => {
    setWarehouseError("");
    setSelectedWarehouse(e.target.value);
    if (e.target.value !== "") {
      const metadata = JSON.parse(e.target.value);
      console.log(metadata);
      setGenerateAisle(metadata.aisles);
      setGenerateShelf(metadata.shelves);
      setTargetWarehouse(metadata.id);
    } else {
      setGenerateAisle("");
      setGenerateShelf("");
      setTargetWarehouse("");
      setSelectedAisle("");
      setSelectedShelf("");
    }
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
    setProductError("");

    if (e.target.value !== "") {
      const convertedObj = JSON.parse(e.target.value);
      setTargetProductId(convertedObj.productId);
      if (convertedObj.productInventory.length > 0) {
        setSelectedDistributor(convertedObj.productInventory[0].distributor_id);
        let obj = warehouseList.filter((obj) => {
          return obj.id == convertedObj.productInventory[0].warehouse_id;
        });
        console.log(obj);
        setSelectedWarehouse(obj[0].name);
        setSelectedAisle(convertedObj.productInventory[0].aisle);
        setSelectedShelf(convertedObj.productInventory[0].shelf);
        setTargetWarehouse(convertedObj.productInventory[0].warehouse_id);
        if (convertedObj.productInventory[0].aisle_name === null) {
          setAisleName("");
        } else {
          setAisleName(convertedObj.productInventory[0].aisle_name);
        }

        if (convertedObj.productInventory[0].shelf_name === null) {
          setShelfName("");
        } else {
          setShelfName(convertedObj.productInventory[0].shelf_name);
        }
        setExist(true);
      } else {
        setSelectedWarehouse("");
        setSelectedAisle("");
        setSelectedShelf("");
        setTargetWarehouse("");
        setSelectedDistributor("");
        setAisleName("");
        setShelfName("");
        setExist(false);
      }
    } else {
      setTargetProductId("");
      setSelectedWarehouse("");
      setSelectedAisle("");
      setSelectedShelf("");
      setTargetWarehouse("");
      setSelectedDistributor("");
      setAisleName("");
      setShelfName("");
      setChildDivs([]);
      setExist(true);
    }
  };

  const handleCreateInventory = () => {
    if (warehouseCount < 1) {
      setShow2(false);
      setShow3(true);
    } else {
      setShow2(true);
    }
  };

  const handleDistributorChange = (e) => {
    setSelectedDistributor(e.target.value);
    setDistributorError("");
  };

  const handleAisleChange = (e) => {
    setSelectedAisle(e.target.value);
    setAisleError("");
  };

  const handleShefChange = (e) => {
    setSelectedShelf(e.target.value);
    setShelfError("");
  };

  const handleSaveInventory = () => {
    let warehouseValid = true,
      shelfValid = true,
      aisleValid = true,
      distributorValid = true,
      productValid = true,
      batchValid = true,
      aNameValid = true,
      sNameValid = true;

    if (selectedAisle === "") {
      setAisleError("Please select an aisle.");
      aisleValid = false;
    }

    if (selectedShelf === "") {
      setShelfError("Please select a shelf.");
      shelfValid = false;
    }

    if (selectedDistributor === "") {
      setDistributorError("Please select a distributor.");
      distributorValid = false;
    }

    if (selectedWarehouse === "") {
      setWarehouseError("Please select a warehouse.");
      warehouseValid = false;
    }

    if (targetProductId === "") {
      setProductError("Please select a product.");
      productValid = false;
    }

    if (batch === "") {
      setBatchError("Please select a batch.");
      batchValid = false;
    }

    if (aisleName === "") {
      setAisleNameError("Aisle name is required.");
      aNameValid = false;
    }

    if (shelfName === "") {
      setShelfNameError("Shelf name is required.");
      sNameValid = false;
    }

    if (
      productValid == false ||
      warehouseValid == false ||
      distributorValid == false ||
      aisleValid == false ||
      shelfValid == false ||
      batchValid == false ||
      !aNameValid ||
      !sNameValid
    ) {
      console.log("Validation Error");
    } else {
      setShow2(false);
      const bodyData = {
        product_id: targetProductId,
        quantity: selectedQuantity,
        warehouse_id: targetWarehouse,
        distributor_id: selectedDistributor,
        aisle: selectedAisle,
        shelf: selectedShelf,
        aisle_name: aisleName,
        shelf_name: shelfName,
        batch: batch,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: "inventory-edit",
        },
      };

      apis
        .post("/supplier/inventory/add", bodyData, config)
        .then((res) => {
          if (res.data.success === true) {
            setUpdateInventory(!updateInventory);
            toast.success(res.data.message, {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.error("Could not add inventory. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((error) => {
          if (error.message !== "revoke") {
            toast.error("Could not add inventory. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });
    }
  };

  const handleUpdateStock = () => {
    if (stockReason === "" || stockReason == null) {
      toast.error("Please select the reason", {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "inventory-edit",
      },
    };

    const bodyData = {
      inventory_id: stockId,
      product_id: stockProduct,
      batch: stockBatch,
      reason: stockReason,
      quantity: stock,
    };

    setShow4(false);

    apis
      .post("supplier/inventory/updateInventoryStock", bodyData, config)
      .then((res) => {
        if (res.data.success === true) {
          setUpdateInventory(!updateInventory);
          toast.success("Stock Updated.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error("Could not update stock. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        if (error.message !== "revoke") {
          toast.error("Could not update stock. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };

  // const openStockUpdate = (ele) => {
  //   setShow4(true);
  //   setStockBatch(ele.batch);
  //   setStockId(ele.id);
  //   setStockProduct(ele.product_id);
  // };
  const openStockUpdate = (ele) => {
    setShow4(true);
    setStockBatch(ele?.batch_number);
    setStockId(ele?.id);
    setStockProduct(ele?.product?.id);
  };


  useEffect(() => {
    if (hasPermission(INVENTORY_VIEW)) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: "inventory-view",
        },
      };

      apis
        .get(`supplier/inventories`, config)
        .then((res) => {
          setLoading(false);
          if (res.data.success === true) {
            console.log("Wareee", res.data.data);
            setInventoryList(res.data.data);
            setallData(res.data.data);
          } else {
            toast.error(
              "Could not fetch inventory list. Please try again later.",
              { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
            );
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error.message !== "revoke") {
            toast.error(
              "Could not fetch inventory list. Please try again later.",
              {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              }
            );
          }
        });
    }
  }, [updateInventory, reload]);

  useEffect(() => {
    if (true) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: "inventory-view",
        },
      };

      apis
        .get("/supplier/warehouses", config)
        .then((res) => {
          if (res.data.success === true) {
            setWarehouseList(res.data.data);
            console.log("=============", res.data.data);
            setWarehouseCount(res.data.data.length);
            if (res.data.data.length < 1) {
              setShow3(true);
            }
          } else {
            toast.error(
              "Could not fetch warehouse list. Please try again later.",
              { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
            );
          }
        })
        .catch((error) => {
          if (error.message !== "revoke") {
            toast.error(
              "Could not fetch warehouse list. Please try again later.",
              { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
            );
          }
        });

      const config2 = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: "product-view",
        },
      };

      apis
        .get("/supplier/products", config2)
        .then((res) => {
          if (res.data.success === true) {
            setProductList(res.data.data);
          } else {
            toast.error(
              "Could not fetch product list. Please try again later.",
              { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
            );
          }
        })
        .catch((error) => {
          if (error.message !== "revoke") {
            toast.error(
              "Could not fetch product list. Please try again later.",
              {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              }
            );
          }
        });

      const config3 = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      apis
        .get(`/supplier/getLinkedDistributors`, config3)
        .then((res) => {
          if (res.data.success === true) {
            setDistributorList(res.data.data);
          } else {
            toast.error(
              "Could not fetch distributors list. Please try again later.",
              { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
            );
          }
        })
        .catch((error) => {
          if (error.message !== "revoke") {
            toast.error(
              "Could not fetch distributors list. Please try again later.",
              { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
            );
          }
        });
    }
  }, [show2]);

  useEffect(() => {
    const generateChildDivs = () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: "inventory-edit",
        },
      };

      apis
        .get(
          `/supplier/inventory/getBatchNumberList/${targetProductId}`,
          config
        )
        .then((res) => {
          if (res.data.success === true) {
            const newChildDivs = res.data.data.batches.map((ele, index) => {
              return (
                <div
                  key={index}
                  className="childDiv"
                  onClick={() => {
                    setBatch(ele);
                    setBatchError("");
                  }}
                >
                  {ele}
                </div>
              );
            });

            setChildDivs(newChildDivs);
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    generateChildDivs();
  }, [targetProductId]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "inventory-view",
      },
    };

    apis
      .get("/supplier/inventoryTransfers", config)
      .then((res) => {
        if (res.data.success === true) {
          setTransferList(res.data.data);
          setAlldata2(res.data.data);
        } else {
          toast.error(
            "Could not fetch inventory list. Please try again later.",
            { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
          );
        }
      })
      .catch((error) => {
        if (error.message !== "revoke") {
          toast.error(
            "Could not fetch inventory list. Please try again later.",
            { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
          );
        }
      });
  }, []);

  let data;
  if (rowsPerPage > 0) {
    data = inventoryList.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  } else {
    data = inventoryList;
  }

  const handleInputChange = (e) => {
    setQ(e.target.value);
    console.log("value to search", e.target.value)
    const valueTosearch = e.target.value;
    const filterData = allData.filter(
      (product) =>
        product?.product_name?.toLowerCase().includes(valueTosearch.toLowerCase())
    );
    setInventoryList(filterData);
  }
  const handleInputChange2 = (e) => {
    setP(e.target.value);
    console.log("value to search", e.target.value)
    const valueTosearch = e.target.value;
    const filterData = alldata2.filter(
      (product) =>
        product?.senderName?.toLowerCase().includes(valueTosearch.toLowerCase())
        ||
        product?.recipentName?.toLowerCase().includes(valueTosearch.toLowerCase())
    );
    setTransferList(filterData);
  }

  const applyFilter = () => {
    const filterData = allData.filter(
      (product) =>
        product?.format?.toLowerCase().includes(selectFormatName.toLowerCase())
    );
    setInventoryList(filterData);
  }

  return (
    <div class="container-fluid page-wrap inventory-manage">
      <div class="row height-inherit">
        <Sidebar userType={"supplier"} />
        <div class="col main p-0">
          <Header title={t("supplier.inventory_management.list.title")} />
          <LoadingOverlay
            active={loading}
            spinner
            styles={{
              overlay: (base) => ({
                ...base,
                background: "#fefefe",
                width: "100%",
                "& svg circle": {
                  stroke: "black",
                },
              }),
            }}
          >
            <div class="container-fluid page-content-box px-3 px-sm-4">
              <div class="row">
                <div class="col">
                  <div class="tab-link-row position-relative">
                    <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link active"
                          id="stock-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#stock-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="stock-tab-pane"
                          aria-selected="true"
                        >
                          {t("supplier.inventory_management.list.stock")}
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link"
                          id="transfer-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#transfer-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="transfer-tab-pane"
                          aria-selected="false"
                        >
                          {t("supplier.inventory_management.list.transfer")}
                        </button>
                      </li>
                    </ul>

                    {/* <div class="filter-box position-abs">
                      <div class="dropdown date-selector">
                        <button
                          class="btn btn-outline-black btn-sm dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {t("supplier.inventory_management.list.all_product")}
                        </button>
                        <ul class="dropdown-menu">
                          <li>
                            <a class="dropdown-item" href="#">
                              {t(
                                "supplier.inventory_management.list.visible_products"
                              )}
                            </a>
                          </li>
                          <li>
                            <a class="dropdown-item" href="#">
                              {t(
                                "supplier.inventory_management.list.hidden_products"
                              )}
                            </a>
                          </li>
                          <li>
                            <a class="dropdown-item" href="#">
                              {t(
                                "supplier.inventory_management.list.all_products"
                              )}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div> */}
                  </div>

                  <div class="tab-content" id="myTabContent">
                    <div
                      class="tab-pane fade show active"
                      id="stock-tab-pane"
                      role="tabpanel"
                      aria-labelledby="stock-tab"
                      tabindex="0"
                    >
                      {/* [Card] */}
                      <div className="card user-card height-100">
                        <div className="card-body p-0">
                          <div className="row">
                            <div className="col">
                              <div className="card-top-filter-box p-3">
                                {/* [Table Search] */}
                                <div className="search-table">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="search-input"
                                      value={q}
                                      placeholder={t(
                                        "supplier.inventory_management.list.search_here"
                                      )}
                                      onChange={(e) => handleInputChange(e)}
                                    ></input>
                                  </div>
                                </div>
                                {/* [/Table Search] */}

                                {/* [Right Filter] */}
                                <div className="filter-row text-end">
                                  {/* [Page Filter Box] */}
                                  <div className="filter-box">
                                    {hasPermission(INVENTORY_EDIT) && (
                                      <button
                                        type="button"
                                        onClick={() => setShow(true)}
                                        className="btn btn-purple btn-sm"
                                      >
                                        {t(
                                          "supplier.inventory_management.list.warehouse_btn"
                                        )}
                                      </button>
                                    )}
                                    {hasPermission(INVENTORY_EDIT) && (
                                      <button
                                        type="button"
                                        onClick={() => handleCreateInventory()}
                                        className="btn btn-purple btn-sm"
                                      >
                                        {t(
                                          "supplier.inventory_management.list.inventory_btn"
                                        )}
                                      </button>
                                    )}

                                    {/* Modal */}
                                    <div class="dropdown right-filter">
                                      <button
                                        type="button"
                                        class="btn dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        data-bs-auto-close="outside"
                                      >
                                        <img src={filter} />{" "}
                                        {t(
                                          "supplier.inventory_management.list.filter"
                                        )}
                                      </button>
                                      <form class="dropdown-menu p-3 ">
                                        <div class="mb-3">
                                          <label class="form-label">
                                            Format
                                          </label>
                                          <select className="form-select"
                                            value={selectFormatName}
                                            onChange={(e) => { setSelectFormatName(e.target.value) }}>
                                            <option value="">
                                              {t(
                                                "supplier.inventory_management.list.select_format"
                                              )}
                                            </option>
                                            <option value="bottle">
                                              {t(
                                                "supplier.inventory_management.list.bottle"
                                              )}
                                            </option>
                                            <option value="can">
                                              {t(
                                                "supplier.inventory_management.list.can"
                                              )}
                                            </option>
                                            <option value="keg">
                                              {t(
                                                "supplier.inventory_management.list.keg"
                                              )}
                                            </option>
                                            <option value="cask">
                                              Cask
                                            </option>
                                          </select>
                                        </div>
                                        {/* <div class="mb-3">
                                          <label class="form-label">
                                            {t(
                                              "supplier.inventory_management.list.producer"
                                            )}
                                          </label>
                                          <select className="form-select">
                                            <option selected disabled>
                                              {t(
                                                "supplier.inventory_management.list.choose_producer"
                                              )}
                                            </option>
                                          </select>
                                        </div> */}

                                        <div className="d-flex justify-content-end">
                                          <button
                                            type="button"
                                            class="btn btn-purple width-auto me-2"
                                            onClick={() => { applyFilter() }}
                                          >
                                            {t(
                                              "supplier.inventory_management.list.apply"
                                            )}
                                          </button>
                                          <button
                                            type="button"
                                            class="btn btn-outline-black width-auto"
                                            onClick={() => {
                                              setSelectFormatName("")
                                              setReload(!reload)
                                            }}
                                          >
                                            {t(
                                              "supplier.inventory_management.list.reset"
                                            )}
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                  {/* [/Page Filter Box] */}
                                </div>
                                {/* [/Right Filter] */}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="table-responsive">
                                <table className="table table-striped m-0">
                                  <thead>
                                    <tr>
                                      <th>
                                        {t(
                                          "supplier.inventory_management.list.table_col1"
                                        )}
                                      </th>
                                      <th className="text-center">
                                        Format
                                        {/* {t(
                                        "supplier.inventory_management.list.product_format"
                                      )} */}
                                      </th>
                                      <th className="text-center">
                                        {t(
                                          "supplier.inventory_management.list.batch_number"
                                        )}
                                      </th>
                                      <th>
                                        {t(
                                          "supplier.inventory_management.list.table_col2"
                                        )}
                                      </th>
                                      <th className="text-center">
                                        {t(
                                          "supplier.inventory_management.list.at_warehouse"
                                        )}{" "}
                                      </th>
                                      {/* <th className="text-center">
                                    {t("supplier.inventory_management.list.distributor_warehouse")} 
                                    </th>
                                    <th className="text-center">{t("supplier.inventory_management.list.intransit")}</th>
                                    <th className="text-center">{t("supplier.inventory_management.list.delivery")}</th> */}
                                      {/* <th>
                                        {t(
                                          "supplier.inventory_management.list.table_col3"
                                        )}
                                      </th> */}
                                      {/* {warehouseList &&
                                      warehouseList.length > 0 ? (
                                        warehouseList.map((ele) => {
                                          return (
                                            <th key={ele.id}>{ele.name}</th>
                                          );
                                        })
                                      ) : (
                                        <></>
                                      )} */}
                                      {/* <th>
                                        {t(
                                          "supplier.inventory_management.list.table_col4"
                                        )}
                                      </th> */}
                                      {/* <th>
                                        {t(
                                          "supplier.inventory_management.list.table_col5"
                                        )}
                                      </th> */}
                                      <th className="text-center">
                                        {t(
                                          "supplier.inventory_management.list.table_col6"
                                        )}
                                      </th>
                                      <th></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {data && data.length > 0 ? (
                                      data.map((ele) => {
                                        return (
                                          <tr key={ele.id}>
                                            <td>
                                              <div class="btn-group dropstart table-action float-start purple-hover">
                                                <button
                                                  type="button"
                                                  class="dropdown-toggle px-0"
                                                  data-bs-toggle="dropdown"
                                                  aria-expanded="false"
                                                >
                                                  {ele.product.product_name}
                                                </button>
                                                <ul class="dropdown-menu">
                                                  <li>
                                                    <a
                                                      className="dropdown-item"
                                                      onClick={() =>
                                                        ele.product.pricing
                                                          ? toast.warn(
                                                            "Pricing already configured.",
                                                            {
                                                              autoClose: 3000,
                                                              position:
                                                                toast.POSITION
                                                                  .TOP_CENTER,
                                                            }
                                                          )
                                                          : hasPermission(
                                                            PRICING_EDIT
                                                          )
                                                            ? navigate(
                                                              `/supplier/inventory-management/configure-pricing/${ele.product.id}`,
                                                              {
                                                                state: {
                                                                  product_name:
                                                                    ele.product
                                                                      .product_name,
                                                                  product_format:
                                                                    ele.product
                                                                      .product_format
                                                                      .name,
                                                                  product_unit:
                                                                    ele.product
                                                                      .product_format
                                                                      .unit,
                                                                },
                                                              }
                                                            )
                                                            : toast.warn(
                                                              "You do not have permission to edit/add pricing.",
                                                              {
                                                                autoClose: 3000,
                                                                position:
                                                                  toast.POSITION
                                                                    .TOP_CENTER,
                                                              }
                                                            )
                                                      }
                                                    >
                                                      {t(
                                                        "supplier.inventory_management.list.config_price"
                                                      )}
                                                    </a>
                                                  </li>
                                                  <li>
                                                    <a
                                                      className="dropdown-item"
                                                      onClick={() =>
                                                        ele.product.availability
                                                          ? toast.warn(
                                                            "Availability already configured.",
                                                            {
                                                              autoClose: 3000,
                                                              position:
                                                                toast.POSITION
                                                                  .TOP_CENTER,
                                                            }
                                                          )
                                                          : hasPermission(
                                                            INVENTORY_EDIT
                                                          )
                                                            ? navigate(
                                                              `/supplier/inventory-management/configure-availability/${ele.product.id}`,
                                                              {
                                                                state: {
                                                                  product_name:
                                                                    ele.product
                                                                      .product_name,
                                                                  product_format:
                                                                    ele.product
                                                                      .product_format
                                                                      .name,
                                                                  product_unit:
                                                                    ele.product
                                                                      .product_format
                                                                      .unit,
                                                                  product_quantity:
                                                                    ele.quantity,
                                                                },
                                                              }
                                                            )
                                                            : toast.warn(
                                                              "You do not have permission to edit/add availability.",
                                                              {
                                                                autoClose: 3000,
                                                                position:
                                                                  toast.POSITION
                                                                    .TOP_CENTER,
                                                              }
                                                            )
                                                      }
                                                    >
                                                      {t(
                                                        "supplier.inventory_management.list.config_availability"
                                                      )}
                                                    </a>
                                                  </li>
                                                  <li>
                                                    <a
                                                      className="dropdown-item"
                                                      onClick={() =>
                                                        hasPermission(
                                                          PRODUCT_VIEW
                                                        )
                                                          ? navigate(
                                                            `/supplier/product-management/view-product/${ele.product.id}`
                                                          )
                                                          : toast.warn(
                                                            "You do not have permission to view product.",
                                                            {
                                                              autoClose: 3000,
                                                              position:
                                                                toast.POSITION
                                                                  .TOP_CENTER,
                                                            }
                                                          )
                                                      }
                                                    >
                                                      {t(
                                                        "supplier.inventory_management.list.product_detail"
                                                      )}
                                                    </a>
                                                  </li>
                                                </ul>
                                              </div>
                                            </td>
                                            <td className="text-center">
                                              {ele.product
                                                ? ele.product.product_format
                                                  ? ele.product.product_format
                                                    .name
                                                    ? ele.product.product_format
                                                      .name
                                                    : "N/A"
                                                  : "N/A"
                                                : "N/A"}
                                            </td>

                                            <td className="text-center">
                                              {ele.batch_number}
                                            </td>
                                            <td>
                                              {ele.total
                                                ? ele.total
                                                  ? ele.total

                                                  : "N/A"
                                                : "N/A"}
                                            </td>
                                            <td>
                                              <div class="btn-group dropend table-action float-none d-flex justify-content-center">
                                                <button
                                                  type="button"
                                                  class="dropdown-toggle px-0 text-purple"
                                                  aria-expanded="false"
                                                  onClick={() =>
                                                    hasPermission(
                                                      INVENTORY_EDIT
                                                    )
                                                      ? openStockUpdate(ele)
                                                      : toast.warn(
                                                        "You do not have permission to edit inventory.",
                                                        {
                                                          autoClose: 3000,
                                                          position:
                                                            toast.POSITION
                                                              .TOP_CENTER,
                                                        }
                                                      )
                                                  }
                                                >
                                                  {ele.at_warehouse}
                                                </button>
                                              </div>
                                            </td>
                                            {/* <td className="text-center">0</td>
                                          <td className="text-center">0</td>
                                          <td className="text-center">0</td> */}
                                            {/* {warehouseList &&
                                            warehouseList.length > 0 ? (
                                              warehouseList.map((el) => {
                                                return (
                                                  <td key={el.id}>
                                                    {ele.id}
                                                    {ele.id}
                                                  </td>
                                                );
                                              })
                                            ) : (
                                              <></>
                                            )} */}
                                            {/* <td>{ele.aisle}</td>
                                            <td>{ele.shelf}</td> */}
                                            <td>
                                              <div className="d-flex flex-column gap-2">
                                                {ele.product.availability ? (
                                                  <span className="badge text-bg-green">
                                                    Availability Configured
                                                  </span>
                                                ) : (
                                                  <span className="badge text-bg-orange">
                                                    Availability Not Set
                                                  </span>
                                                )}
                                                {ele.product.pricing ? (
                                                  <span className="badge text-bg-green">
                                                    Pricing Configured
                                                  </span>
                                                ) : (
                                                  <span className="badge text-bg-orange">
                                                    Pricing Not Set
                                                  </span>
                                                )}
                                              </div>
                                            </td>
                                            <td>
                                              <div class="btn-group dropstart table-action">
                                                <button
                                                  type="button"
                                                  class="dropdown-toggle"
                                                  data-bs-toggle="dropdown"
                                                  aria-expanded="false"
                                                >
                                                  <span></span>
                                                </button>
                                                <ul class="dropdown-menu">
                                                  {/* <li>
                                                                                                        <a className="dropdown-item">View Map</a>
                                                                                                    </li> */}
                                                  <li>
                                                    <a
                                                      onClick={() =>
                                                        hasPermission(
                                                          INVENTORY_EDIT
                                                        )
                                                          ? openStockUpdate(ele)
                                                          : toast.warn(
                                                            "You do not have permission to edit inventory.",
                                                            {
                                                              autoClose: 3000,
                                                              position:
                                                                toast.POSITION
                                                                  .TOP_CENTER,
                                                            }
                                                          )
                                                      }
                                                      className="dropdown-item"
                                                    >
                                                      {" "}
                                                      Edit
                                                    </a>
                                                  </li>
                                                </ul>
                                              </div>
                                            </td>
                                          </tr>
                                        );
                                      })
                                    ) : (
                                      <>
                                        {t(
                                          "supplier.inventory_management.list.no_data_to_show"
                                        )}
                                      </>
                                    )}
                                  </tbody>

                                </table>
                              </div>
                            </div>
                            <div className="table-pagination mb-2 mt-3">
                              {data.length > 0 ? (
                                <CustomTablePagination
                                  rowsPerPageOptions={[
                                    5,
                                    10,
                                    15,
                                    { label: "All", value: -1 },
                                  ]}
                                  labelRowsPerPage={t(
                                    "admin.supplier_management.list.pagination_text"
                                  )}
                                  colSpan={12}
                                  count={inventoryList.length}
                                  rowsPerPage={rowsPerPage}
                                  page={page}
                                  size="small"
                                  slotProps={{
                                    select: {
                                      "aria-label": "rows per page",
                                    },
                                    actions: {
                                      showFirstButton: true,
                                      showLastButton: true,
                                    },
                                  }}
                                  onPageChange={handleChangePage}
                                  onRowsPerPageChange={
                                    handleChangeRowsPerPage
                                  }
                                  sx={{
                                    ".MuiTablePagination-toolbar button":
                                    {
                                      backgroundColor: "#623ead",
                                      borderColor: "#623ead",
                                      borderRadius: "25px",
                                      color: "#fefefe",
                                    },

                                    ".MuiTablePagination-toolbar span":
                                    {
                                      fontSize: "12px",
                                    },
                                  }}
                                />
                              ) : (
                                <></>
                              )}

                            </div>
                          </div>
                        </div>
                      </div>
                      {/* [/Card] */}
                    </div>

                    <div
                      class="tab-pane fade"
                      id="transfer-tab-pane"
                      role="tabpanel"
                      aria-labelledby="transfer-tab"
                      tabindex="0"
                    >
                      {/* [Card] */}
                      <div className="card user-card height-100">
                        <div className="card-body p-0">
                          <div className="row">
                            <div className="col">
                              <div className="card-top-filter-box p-3">
                                {/* [Table Search] */}
                                <div className="search-table">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="search-input"
                                      placeholder={t(
                                        "supplier.inventory_management.list.search_here"
                                      )}
                                      value={p}
                                      onChange={(e) => handleInputChange2(e)}
                                    ></input>
                                  </div>
                                </div>
                                {/* [/Table Search] */}

                                {/* [Right Filter] */}
                                <div className="filter-row text-end">
                                  {/* [Page Filter Box] */}
                                  <div className="filter-box">
                                    {hasPermission(INVENTORY_EDIT) && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          navigate(
                                            "/supplier/inventory-management/create-transfer"
                                          )
                                        }
                                        className="btn btn-purple btn-sm"
                                      >
                                        {t(
                                          "supplier.inventory_management.list.createnew"
                                        )}
                                      </button>
                                    )}
                                    {/* <div class="dropdown right-filter">
                                      <button
                                        type="button"
                                        class="btn dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        data-bs-auto-close="outside"
                                      >
                                        <img src={filter} />{" "}
                                        {t(
                                          "supplier.inventory_management.list.filter1"
                                        )}
                                      </button>
                                      <form class="dropdown-menu p-3 ">
                                        <div class="mb-3">
                                          <label class="form-label">
                                            Format
                                          </label>
                                          <select className="form-select">
                                            <option selected disabled>
                                              {t(
                                                "supplier.inventory_management.list.select_format"
                                              )}
                                            </option>
                                            <option value="">
                                              {t(
                                                "supplier.inventory_management.list.bottle"
                                              )}
                                            </option>
                                            <option value="">
                                              {t(
                                                "supplier.inventory_management.list.can"
                                              )}
                                            </option>
                                            <option value="">
                                              {t(
                                                "supplier.inventory_management.list.keg"
                                              )}
                                            </option>
                                          </select>
                                        </div>
                                        <div class="mb-3">
                                          <label class="form-label">
                                            {t(
                                              "supplier.inventory_management.list.producer"
                                            )}
                                          </label>
                                          <select className="form-select">
                                            <option selected disabled>
                                              {t(
                                                "supplier.inventory_management.list.choose_producer"
                                              )}
                                            </option>
                                          </select>
                                        </div>

                                        <div className="d-flex justify-content-end">
                                          <button
                                            type="submit"
                                            class="btn btn-purple width-auto me-2"
                                          >
                                            {t(
                                              "supplier.inventory_management.list.apply"
                                            )}
                                          </button>
                                          <button
                                            type="reset"
                                            class="btn btn-outline-black width-auto"
                                          >
                                            {t(
                                              "supplier.inventory_management.list.reset"
                                            )}
                                          </button>
                                        </div>
                                      </form>
                                    </div> */}
                                  </div>
                                  {/* [/Page Filter Box] */}
                                </div>
                                {/* [/Right Filter] */}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="table-responsive">
                                <table className="table table-striped m-0">
                                  <thead>
                                    <tr>
                                      <th>{t("supplier.inventory_management.list.table_col21")}</th>
                                      <th>{t("supplier.inventory_management.list.table_col22")}</th>
                                      <th>{t("supplier.inventory_management.list.table_col23")}</th>
                                      <th>{t("supplier.inventory_management.list.table_col24")}</th>
                                      <th>{t("supplier.inventory_management.list.table_col25")}</th>
                                      <th>{t("supplier.inventory_management.list.table_col26")}</th>
                                      <th>{t("supplier.inventory_management.list.table_col27")}</th>
                                      {/* <th></th> */}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {transerList && transerList.length > 0 ? (
                                      transerList.map((ele) => {
                                        const date = new Date(ele.created_at);
                                        const day = String(
                                          date.getDate()
                                        ).padStart(2, "0");
                                        const month = String(
                                          date.getMonth() + 1
                                        ).padStart(2, "0"); // Months are zero-based, so add 1
                                        const year = date.getFullYear();
                                        const finalDate = `${day}-${month}-${year}`;
                                        return (
                                          <tr>
                                            <td>{ele.senderName}</td>
                                            <td>{ele.recipentName}</td>
                                            <td>{ele.status}</td>
                                            <td>{finalDate}</td>
                                            <td>{ele.send}</td>
                                            <td>{ele.recieved}</td>
                                            <td>{ele.broken}</td>
                                            {/* <td>
                                              <div class="btn-group dropstart table-action">
                                                <button
                                                  type="button"
                                                  class="dropdown-toggle"
                                                  data-bs-toggle="dropdown"
                                                  aria-expanded="false"
                                                >
                                                  <span></span>
                                                </button>
                                                <ul class="dropdown-menu">
                                                  <li>
                                                    <a
                                                      className="dropdown-item"
                                                      href="/order-detail"
                                                    >
                                                      {t(
                                                        "supplier.inventory_management.list.view_map"
                                                      )}
                                                    </a>
                                                  </li>
                                                  <li>
                                                    <a className="dropdown-item">
                                                      Edit
                                                    </a>
                                                  </li>
                                                </ul>
                                              </div>
                                            </td> */}
                                          </tr>
                                        );
                                      })
                                    ) : (
                                      <>No data to show</>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* [/Card] */}
                    </div>
                    {/* modal Box Creat Warehouse */}
                    <Modal
                      className="modal fade"
                      show={show}
                      centered
                      onHide={() => handleCancel1()}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>
                          {" "}
                          {t(
                            "supplier.inventory_management.warehouse.header"
                          )}{" "}
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form>
                          <div className="row">
                            <div className="col-sm-6 col-12 mb-sm-3 mb-2">
                              <label
                                for="Warehouse-name"
                                class="col-form-label"
                              >
                                {t(
                                  "supplier.inventory_management.warehouse.name"
                                )}
                              </label>
                              <input
                                type="text"
                                value={warehouseName}
                                onChange={(e) => handleWarehouseChange(e)}
                                class="form-control pe-2"
                                id="Warehouse-name"
                              />
                              {nameError !== "" ? (
                                <p className="error-label">{nameError}</p>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="col-sm-6 col-12 mb-sm-3 mb-2">
                              <label
                                for="Warehouse-address"
                                class="col-form-label"
                              >
                                {t(
                                  "supplier.inventory_management.warehouse.address"
                                )}
                              </label>
                              {/* <input type="text" value={warehouseAddress} onChange = {(e) => handleAddressChange(e)} class="form-control pe-2" id="Warehouse-address" /> */}
                              <GooglePlacesAutocomplete
                                apiKey="AIzaSyBLkLSPnlPCzCfWun-oexkLi9DT7ijQXeY"
                                selectProps={{
                                  value: warehouseAddress,
                                  onChange: (e) => handleAddressChange(e),
                                }}
                              />
                              {addressError !== "" ? (
                                <p className="error-label">{addressError}</p>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="col-sm-6 col-12 mb-sm-3 mb-2">
                              <label for="num-aisles" class="col-form-label">
                                {t(
                                  "supplier.inventory_management.warehouse.aisle"
                                )}
                              </label>
                              <input
                                type="number"
                                class="form-control pe-2"
                                value={aisle}
                                onChange={(e) => setAisle(e.target.value)}
                                min="1"
                                id="num-aisles"
                              />
                            </div>
                            <div className="col-sm-6 col-12 mb-sm-3 mb-2">
                              <label for="num-shelves" class="col-form-label">
                                {t(
                                  "supplier.inventory_management.warehouse.shelf"
                                )}
                              </label>
                              <input
                                type="number"
                                min={"1"}
                                onkeydown="return false"
                                value={shelves}
                                onChange={(e) => setShelves(e.target.value)}
                                class="form-control pe-2"
                                id="num-shelves"
                              />
                            </div>
                          </div>
                        </form>
                      </Modal.Body>
                      <Modal.Footer>
                        <button
                          type="button"
                          class="btn btn-outline-black"
                          data-bs-dismiss="modal"
                          onClick={() => handleCancel1()}
                        >
                          {t(
                            "supplier.inventory_management.warehouse.cancel_btn"
                          )}
                        </button>
                        <button
                          type="button"
                          class="btn btn-purple"
                          onClick={() => handleSaveWarehouse()}
                        >
                          {t(
                            "supplier.inventory_management.warehouse.create_btn"
                          )}
                        </button>
                      </Modal.Footer>
                    </Modal>
                    {/* modal box Creat Warehouse end */}

                    {/* modal Box Creat Warehouse */}
                    <Modal
                      className="modal fade"
                      show={show2}
                      centered
                      onHide={() => setShow2(false)}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>
                          {" "}
                          {t("supplier.inventory_management.inventory.header")}
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <h3 className="titleName">
                          {t(
                            "supplier.inventory_management.inventory.sub_header"
                          )}
                        </h3>
                        <form>
                          <div className="row">
                            <div className="col-sm-6 col-12 mb-sm-3 mb-2">
                              <label
                                for="SelectProductName"
                                class="col-form-label"
                              >
                                {t(
                                  "supplier.inventory_management.inventory.product"
                                )}
                              </label>
                              <select
                                class="form-select"
                                id="SelectProductName"
                                aria-label="Default select example"
                                value={selectedProduct}
                                onChange={(e) => handleProductChange(e)}
                              >
                                <option value="">Choose Product</option>
                                {productList && productList.length > 0 ? (
                                  productList.map((ele) => {
                                    return (
                                      <option
                                        key={ele.id}
                                        value={JSON.stringify({
                                          productId: ele.id,
                                          productInventory: ele.inventory,
                                        })}
                                      >
                                        {ele.product_name}
                                      </option>
                                    );
                                  })
                                ) : (
                                  <></>
                                )}
                              </select>
                              {productError !== "" ? (
                                <p className="error-label">{productError}</p>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="col-sm-6 col-12 mb-sm-3 mb-2">
                              <label
                                for="SelectDistributor"
                                class="col-form-label"
                              >
                                {t(
                                  "supplier.inventory_management.inventory.distributor"
                                )}
                              </label>
                              <select
                                class="form-select"
                                id="SelectDistributor"
                                aria-label="Default select example"
                                value={selectedDistributor}
                                onChange={(e) => handleDistributorChange(e)}
                                disabled={exist}
                              >
                                <option value="">Choose Distributor</option>
                                {distributorList &&
                                  distributorList.length > 0 ? (
                                  distributorList.map((ele) => {
                                    return (
                                      <option key={ele.id} value={ele.id}>
                                        {ele.user_profile
                                          ? ele.user_profile.company_name
                                            ? ele.user_profile.company_name
                                            : "N/A"
                                          : "N/A"}
                                      </option>
                                    );
                                  })
                                ) : (
                                  <></>
                                )}
                              </select>
                              {distributorError !== "" ? (
                                <p className="error-label">
                                  {distributorError}
                                </p>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="col-sm-6 col-12 mb-sm-3 mb-2">
                              <label
                                for="SelectQuantity"
                                class="col-form-label"
                              >
                                {t(
                                  "supplier.inventory_management.inventory.quantity"
                                )}
                              </label>
                              <NumericInput
                                className="form-control"
                                value={selectedQuantity}
                                min={1}
                                onChange={(e) => setSelectedQuantity(e)}
                                step={1}
                                precision={0}
                                size={5}
                                strict
                              />
                            </div>
                            <div className="col-sm-6 col-12 mb-sm-3 mb-2">
                              <label
                                for="SelectWarehouse"
                                class="col-form-label"
                              >
                                {t(
                                  "supplier.inventory_management.inventory.warehouse"
                                )}
                              </label>
                              {exist ? (
                                <input
                                  class="form-control"
                                  value={selectedWarehouse}
                                  disabled
                                />
                              ) : (
                                <select
                                  class="form-select"
                                  id="SelectWarehouse"
                                  aria-label="Default select example"
                                  value={selectedWarehouse}
                                  onChange={(e) => handleSelectedWarehouse(e)}
                                >
                                  <option value="">Choose Warehouse</option>
                                  {warehouseList && warehouseList.length > 0 ? (
                                    warehouseList.map((ele) => {
                                      return (
                                        <option
                                          key={ele.id}
                                          value={JSON.stringify({
                                            id: ele.id,
                                            aisles: ele.aisles,
                                            shelves: ele.shelves,
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
                              )}

                              {warehouseError !== "" ? (
                                <p className="error-label">{warehouseError}</p>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="col-sm-6 col-12 mb-sm-3 mb-2">
                              <label for="SelectAisle" class="col-form-label">
                                {t(
                                  "supplier.inventory_management.inventory.aisle"
                                )}
                              </label>
                              {exist ? (
                                <input
                                  class="form-control"
                                  value={selectedAisle}
                                  disabled
                                />
                              ) : (
                                <select
                                  class="form-select"
                                  id="SelectAisle"
                                  aria-label="Default select example"
                                  value={selectedAisle}
                                  onChange={(e) => handleAisleChange(e)}
                                  disabled={
                                    selectedWarehouse == "" || exist
                                      ? true
                                      : false
                                  }
                                >
                                  <option value="">Choose Aisle</option>
                                  {selectedWarehouse == "" ? (
                                    <></>
                                  ) : (
                                    generateAisleOptions()
                                  )}
                                </select>
                              )}
                              {aisleError !== "" ? (
                                <p className="error-label">{aisleError}</p>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="col-sm-6 col-12 mb-sm-3 mb-2">
                              <label class="col-form-label">
                                {t(
                                  "supplier.inventory_management.inventory.aisle_name"
                                )}
                              </label>
                              <input
                                class="form-control"
                                value={aisleName}
                                disabled={
                                  selectedAisle === "" || exist ? true : false
                                }
                                placeholder="Enter aisle name"
                                onChange={(e) => handleAisleNameChange(e)}
                              />
                              {aisleNameError !== "" ? (
                                <p className="error-label">{aisleNameError}</p>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="col-sm-6 col-12 mb-sm-3 mb-2">
                              <label for="SelectShelf" class="col-form-label">
                                {t(
                                  "supplier.inventory_management.inventory.shelf"
                                )}
                              </label>
                              {exist ? (
                                <input
                                  class="form-control"
                                  value={selectedShelf}
                                  disabled
                                />
                              ) : (
                                <select
                                  class="form-select"
                                  id="SelectShelf"
                                  aria-label="Default select example"
                                  value={selectedShelf}
                                  onChange={(e) => handleShefChange(e)}
                                  disabled={
                                    selectedWarehouse == "" || exist
                                      ? true
                                      : false
                                  }
                                >
                                  <option value="">Choose Shelf</option>
                                  {selectedWarehouse == "" ? (
                                    <></>
                                  ) : (
                                    generateShelfOptions()
                                  )}
                                </select>
                              )}
                              {shelfError !== "" ? (
                                <p className="error-label">{shelfError}</p>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="col-sm-6 col-12 mb-sm-3 mb-2">
                              <label class="col-form-label">
                                {t(
                                  "supplier.inventory_management.inventory.shelf_name"
                                )}
                              </label>
                              <input
                                class="form-control"
                                value={shelfName}
                                placeholder="Enter shelf name"
                                disabled={
                                  selectedShelf === "" || exist ? true : false
                                }
                                onChange={(e) => handleShelfNameChange(e)}
                              />
                              {shelfNameError !== "" ? (
                                <p className="error-label">{shelfNameError}</p>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="col-sm-6 col-12 mb-sm-3 mb-2">
                              <label class="col-form-label">
                                {t(
                                  "supplier.inventory_management.list.batch_number"
                                )}
                              </label>
                              <input
                                class="form-control"
                                placeholder="Enter batch number"
                                value={batch}
                                onChange={(e) => {
                                  setBatch(e.target.value);
                                  setBatchError("");
                                }}
                              />
                              {batchError !== "" ? (
                                <p className="error-label">{batchError}</p>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div
                              className="col-sm-6 col-12 mb-sm-3 mb-2"
                              style={{
                                display:
                                  childDivs.length > 0 ? "block" : "none",
                              }}
                            >
                              <label class="col-form-label">
                                or select from the following
                              </label>
                              <div id="parentDiv">{childDivs}</div>
                            </div>
                          </div>
                        </form>
                      </Modal.Body>
                      <Modal.Footer>
                        <button
                          type="button"
                          class="btn btn-outline-black"
                          data-bs-dismiss="modal"
                          onClick={() => setShow2(false)}
                        >
                          {t(
                            "supplier.inventory_management.inventory.cancel_btn"
                          )}
                        </button>
                        <button
                          type="button"
                          class="btn btn-purple"
                          onClick={() => handleSaveInventory()}
                        >
                          {t(
                            "supplier.inventory_management.inventory.create_btn"
                          )}
                        </button>
                      </Modal.Footer>
                    </Modal>
                    {/* modal box Creat Warehouse end */}
                    <Modal
                      className="modal fade"
                      show={show3}
                      centered
                      onHide={() => setShow3(false)}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>
                          {t(
                            "supplier.inventory_management.list.create_warehouse"
                          )}{" "}
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>
                          {t(
                            "supplier.inventory_management.list.please_create"
                          )}{" "}
                          <a
                            onClick={() => {
                              setShow(true);
                              setShow3(false);
                            }}
                            className="custom-atag"
                          >
                            {t("supplier.inventory_management.list.create_new")}
                          </a>
                        </p>
                      </Modal.Body>
                    </Modal>

                    <Modal
                      className="modal fade"
                      show={show4}
                      centered
                      onHide={() => {
                        setShow4(false);
                      }}
                    >
                      <Modal.Header>
                        <h5 class="modal-title text-purpal">{t(
                          "supplier.inventory_management.list.updateStock"
                        )}</h5>
                        <button
                          type="button"
                          class="btn-close text-purpal"
                          aria-label="Close"
                          onClick={() => setShow4(false)}
                        ></button>
                      </Modal.Header>
                      <Modal.Body>
                        <div className="mb-2">
                          <label className="form-label">{t(
                            "supplier.inventory_management.list.modific"
                          )}</label>
                          <NumericInput
                            className="form-control"
                            value={stock}
                            onChange={(e) => setStock(e)}
                            step={1}
                            precision={0}
                            size={5}
                            strict
                          />
                        </div>
                        <div className="mb-2">
                          <label className="form-label">{t(
                            "supplier.inventory_management.list.reason"
                          )}</label>
                          <select
                            className="form-select"
                            value={stockReason}
                            onChange={(e) => setStockReason(e.target.value)}
                          >
                            <option value={""}>Select Reason</option>
                            <option value={"Reciepts"}>Reciepts</option>
                            <option value={"Adjustments"}>Adjustment</option>
                            <option value={"Return"}>Return</option>
                            <option value={"Purchase"}>Purchase</option>
                            <option value={"Other"}>Other</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">{t(
                            "supplier.inventory_management.list.batchNmber"
                          )}</label>
                          <input
                            type="number"
                            class="form-control"
                            value={stockBatch}
                            disabled
                          />
                        </div>
                      </Modal.Body>
                      <Modal.Footer
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          type="button"
                          class="btn btn-outline-purple"
                          onClick={() => {
                            setShow4(false);
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          class="btn btn-purple btn-md w-auto"
                          onClick={() => handleUpdateStock()}
                        >
                          Update
                        </button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </LoadingOverlay>
        </div>
      </div>
    </div>
  );
};

export default SupplierInventoryManagement;
