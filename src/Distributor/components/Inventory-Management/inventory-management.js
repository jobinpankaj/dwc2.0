import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import NumericInput from "react-numeric-input";
import filter from "../../assets/images/filter-icon.png";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import { Modal, Button } from "react-bootstrap";
import useAuthInterceptor from "../../../utils/apis";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/scss/dashboard.scss";
import "../../../assets/scss/dashboard.scss"
import { useTranslation } from "react-i18next";
import { styled } from "@mui/system";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import { hasPermission } from "../../../CommonComponents/commonMethods";
import {
  INVENTory_EDIT,
  PRODUCT_VIEW,
  SUPPLIER_VIEW,
  INVENTORY_EDIT
} from "../../../Constants/constant";
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

const SupplierInventoryManagement = () => {
  const apis = useAuthInterceptor();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const token = localStorage.getItem("distributor_accessToken");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [inventoryList, setInventoryList] = useState("");
  const [recieveList, setRecieveList] = useState("");
  const [warehouseName, setWarehouseName] = useState("");
  const [nameError, setNameError] = useState("");
  const [warehouseAddress, setWarehouseAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [targetAddress, setTargetAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [aisle, setAisle] = useState("1");
  const [shelves, setShelves] = useState("1");
  const [shelfNameError,setShelfNameError] = useState("");
  const [aisleNameError,setAisleNameError]= useState("");
  const [warehouseList, setWarehouseList] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [generateAisle, setGenerateAisle] = useState("");
  const [generateShelf, setGenerateShelf] = useState("");
  const [selectedAisle, setSelectedAisle] = useState("");
  const [selectedShelf, setSelectedShelf] = useState("");
  const [productList, setProductList] = useState([]);
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
  const [stock, setStock] = useState(0);
  const [show4, setShow4] = useState(false);
  const [stockBatch, setStockBatch] = useState("");
  const [stockId, setStockId] = useState("");
  const [stockProductId, setStockProductId] = useState();
  const [reason, setReason] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [supplier, setSupplier] = useState();
  const [productBatchList, setProductBatchList] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [filterSupplier, setFilterSupplier] = useState("");
  const [filterFormat, setFilterFormat] = useState("");
  const [keyword, setKeyword] = useState("");
  const [formatList, setFormatList] = useState([]);
  const [recieveKeyword, setRecieveKeyword] = useState("");
  const [recieveFormatFilter, setRecieveFormatFilter] = useState("");
  const [recieveSupplierFilter, setRecieveSupplierFilter] = useState("");
  const [transerList, setTranserList] = useState([]);
  const [transferList, setTransferList] = useState([]);
  const [q, setQ] = useState("")
  const [allData , setallData] = useState([]);
  const[reload,setReload]=useState(false);
  const [reload2,setReload2]=useState(false)

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
    setAisleNameError("")
  };

  const handleShelfNameChange = (e) => {
    setShelfName(e.target.value);
    setShelfNameError("")
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
    setWarehouseError();
    setNameError("");
  };
  
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "supplier-view",
      },
    };
    apis
      .get("distributor/getLinkedSuppliers", config)
      .then((res) => {
        console.log(res);
        setSupplierList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err.response.data.message, {
        //     autoClose: 3000,
        //     position: toast.POSITION.TOP_CENTER,
        // });
      });
  }, [token]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "inventory-view",
      },
    };
    apis
      .get(
        `distributor/?&search=${recieveKeyword}&filter_product_format=${recieveFormatFilter}&filter_supplier=${recieveSupplierFilter}`,
        config
      )
      .then((res) => {
        console.log(res);
        setTransferList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err.response.data.message, {
        //     autoClose: 3000,
        //     position: toast.POSITION.TOP_CENTER,
        // });
      });
  }, [token, keyword]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "inventory-view",
      },
    };

    apis
      .get(`distributor/inventoryRecieve`, config)
      .then((res) => {
        if (res.data.success === true) {
          setRecieveList(res.data.data);
          setallData(res.data.data);
        } else {
          toast.error(
            "Could not fetch inventory list. Please try again later.",
            { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
          );
        }
      })
      .catch((error) => {
        if(error.message !== "revoke"){
        toast.error("Could not fetch inventory list. Please try again later.", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      });
  }, [updateInventory, reload]);

  const handleRecieveFilter = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "inventory-view",
      },
    };
    apis
      .get(
        `distributor/?&search=${recieveKeyword}&filter_product_format=${recieveFormatFilter}&filter_supplier=${recieveSupplierFilter}`,
        config
      )
      .then((res) => {
        console.log(res);
        setTransferList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err.response.data.message, {
        //     autoClose: 3000,
        //     position: toast.POSITION.TOP_CENTER,
        // });
      });
  };
  useEffect(() => {
    apis
      .get("getProductFormats")
      .then((res) => {
        console.log(res);
        setFormatList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err.response.data.message, {
        //     autoClose: 3000,
        //     position: toast.POSITION.TOP_CENTER,
        // });
      });
  }, [token]);

  const handleSaveWarehouse = () => {
    let warehouseValid = true,
      addressValid = true;
    if (warehouseName == "") {
      setNameError(
        t("distibutor.inventory_management.listing.warehouse_required")
      );
      warehouseValid = false;
    }

    if (warehouseAddress == "") {
      setAddressError(
        t("distibutor.inventory_management.listing.warehouse_address_required")
      );
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
        .post("/distributor/warehouse/add", bodyData, config)
        .then((res) => {
          if (res.data.success === true) {
            toast.success(res.data.message, {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
            setWarehouseCount(warehouseCount + 1);
          } else {
            toast.error(t("error_message.could_not_create_warehouse"), {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((error) => {
          if(error.message !== "revoke"){
          toast.error(t("error_message.could_not_create_warehouse"), {
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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e);
    const config1 = {
      headers: {
        Projectlanguageid: 1,
        Authorization: `Bearer ${token}`,
        permission: "inventory-edit",
      },
    };
    apis
      .get(`distributor/inventory/getBatchNumberList/${e}`, config1)
      .then((res) => {
        if (res.data.data.batches.length > 0) {
          setProductBatchList(res.data.data.batches);
        } else {
          console.log(res.data.data.batches);
          toast.error("Batch number not added. Please contact supplier", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((err) => {
        if(err.message !== "revoke"){
        toast.error(err.response.data.message, {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      });
  };
  const handleCancel2 = () => {
    setShow2(false);
    setSupplier();
    setSelectedProduct();
    setSelectedBatch("");
    setSelectedQuantity(1);
    setSelectedWarehouse();
    setSelectedAisle();
    setAisleName("");
    setShelfName("");
    setSelectedShelf();
    setShelfError("");
    setAisleError("");
    setShelfNameError("");
    setAisleNameError("");
    setWarehouseError("");
    setProductError("");
    setDistributorError("");
  };
  const handleSupplierChange = (supplier_id) => {
    setSupplier(supplier_id);
    const config = {
      headers: {
        Projectlanguageid: 1,
        Authorization: `Bearer ${token}`,
        permission: "product-view",
      },
    };

    apis
      .get(`distributor/products?supplier_id=${supplier_id}`, config)
      .then((res) => {
        console.log(res);
        setProductList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        if(err.message !== "revoke"){
        toast.error(err.response.data.message, {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      });
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

  const handleCreateInventory = () => {
    if (warehouseCount < 1) {
      setShow2(false);
      setShow3(true);
    } else {
      setShow2(true);
    }
  };

  const handleSaveInventory = () => {
    let warehouseValid = true,
      shelfValid = true,
      aisleValid = true,
      distributorValid = true,
      productValid = true,
      aisleNameValid = true,
      shelfNameValid = true;

    if (selectedAisle === "") {
      setAisleError(
        t("distributor.inventory_management.listing.aisle_required")
      );
      aisleValid = false;
    }

    if (selectedShelf === "") {
      setShelfError(
        t("distributor.inventory_management.listing.shelf_required")
      );
      shelfValid = false;
    }

    if (supplier === "") {
      setDistributorError(
        t("distributor.inventory_management.listing.distributor_required")
      );
      distributorValid = false;
    }

    if (selectedWarehouse === "") {
      setWarehouseError(
        t("distributor.inventory_management.listing.warehouse_select_required")
      );
      warehouseValid = false;
    }

    if (selectedProduct === "") {
      setProductError(
        t("distributor.inventory_management.listing.product_select_required")
      );
      productValid = false;
    }

    if (shelfName == "") {
      setShelfNameError(
        "shelf Name is required"
        // t("distibutor.inventory_management.listing.warehouse_address_required")
      );
      shelfNameValid = false
    }
    if (aisleName == "") {
      setAisleNameError(
        "Aisle Name is required"
        // t("distibutor.inventory_management.listing.warehouse_address_required")
      );
      aisleNameValid = false
    }

    if (
      productValid == false ||
      warehouseValid == false ||
      distributorValid == false ||
      aisleValid == false ||
      shelfValid == false ||
      !shelfNameValid ||
      !aisleNameValid
    ) {
      console.log("Validation Error");
    } else {
      setShow2(false);
      const bodyData = {
        product_id: selectedProduct,
        quantity: selectedQuantity,
        warehouse_id: targetWarehouse,
        supplier_id: supplier,
        aisle: selectedAisle,
        shelf: selectedShelf,
        aisle_name: aisleName,
        shelf_name: shelfName,
        batch: selectedBatch,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: "inventory-edit",
        },
      };

      apis
        .post("/distributor/inventory/add", bodyData, config)
        .then((res) => {
          if (res.data.success === true) {
            setUpdateInventory(!updateInventory);
            toast.success(res.data.message, {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
            setShow2(false);
            setSupplier();
            setSelectedProduct();
            setSelectedBatch("");
            setSelectedQuantity(1);
            setSelectedWarehouse();
            setSelectedAisle();
            setAisleName("");
            setShelfName("");
            setSelectedShelf();
            setShelfError("");
            setAisleError("");
            setShelfNameError("");
            setAisleNameError("");
            setWarehouseError("");
            setProductError("");
            setDistributorError("");
          } else {
            toast.error(t("error_message.could_not_create_inventory"), {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((error) => {
          if(error.message !== "revoke"){
          toast.error(t("error_message.could_not_create_inventory"), {
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
        permission: "inventory-view",
      },
    };

    apis
      .get(
        `distributor/inventories?search=${keyword}&filter_supplier=${filterSupplier}&filter_product_format=${filterFormat}`,
        config
      )
      .then((res) => {
        if (res.data.success === true) {
          setInventoryList(res.data.data);
        } else {
          toast.error(t("error_message.could_not_fetch_inventory"), {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        if(error.message !== "revoke"){
        toast.error(t("error_message.could_not_fetch_inventory"), {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      });
  }, [updateInventory, keyword, reload2]);


  const handleFilter = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "inventory-view",
      },
    };

    apis
      .get(
        `distributor/inventories?search=${keyword}&filter_supplier=${filterSupplier}&filter_product_format=${filterFormat}`,
        config
      )
      .then((res) => {
        if (res.data.success === true) {
          setInventoryList(res.data.data);
        } else {
          toast.error(t("error_message.could_not_fetch_inventory"), {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        if(error.message !== "revoke"){
        toast.error(t("error_message.could_not_fetch_inventory"), {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      });
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "inventory-view"
      }
    }

    apis.get('/distributor/inventoryTransfers', config)
    .then((res) => {
      if(res.data.success === true){
        setTranserList(res.data.data)
      }else{
        toast.error("Could not fetch inventory list. Please try again later.", { autoClose: 3000, position: toast.POSITION.TOP_CENTER });
      }
    })
    .catch((error) => {
      if(error.message !== "revoke"){
        toast.error("Could not fetch inventory list. Please try again later.", { autoClose: 3000, position: toast.POSITION.TOP_CENTER });
      }
    })
  }, [])

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "inventory-view",
      },
    };

    apis
      .get("/distributor/warehouses", config)
      .then((res) => {
        if (res.data.success === true) {
          setWarehouseList(res.data.data);
          setWarehouseCount(res.data.data.length);
          if (res.data.data.length < 1) {
            setShow3(true);
          }
        } else {
          toast.error(t("error_message.could_not_fetch_warehouse"), {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        if(error.message !== "revoke"){
        toast.error(t("error_message.could_not_fetch_warehouse"), {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      });
    if (true) {
      // const config2 = {
      //     headers: {
      //         Authorization: `Bearer ${token}`,
      //         permission: "product-view"
      //     }
      // }

      // apis.get('/distributor/products', config2)
      //     .then((res) => {
      //         if (res.data.success === true) {
      //             setProductList(res.data.data)
      //         }
      //         else {
      //             toast.error(t('error_message.could_not_fetch_product'), { autoClose: 3000, position: toast.POSITION.TOP_CENTER })
      //         }
      //     })
      //     .catch((error) => {
      //         toast.error(t('error_message.could_not_fetch_product'), { autoClose: 3000, position: toast.POSITION.TOP_CENTER })
      //     })

      const config3 = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: `supplier-view`,
        },
      };

      apis
        .get(`distributor/getLinkedSuppliers`, config3)
        .then((res) => {
          if (res.data.success === true) {
            setDistributorList(res.data.data);
          } else {
            // toast.error("Could not fetch suppliers list. Please try again later.", { autoClose: 3000, position: toast.POSITION.TOP_CENTER })
          }
        })
        .catch((error) => {
          // toast.error("Could not fetch suppliers list. Please try again later.", { autoClose: 3000, position: toast.POSITION.TOP_CENTER })
        });
    }
  }, [token]);
  const handleUpdateStockModal = (inventoryId, batchNumber, productId) => {
    setStockId(inventoryId);
    setStockBatch(batchNumber);
    setStockProductId(productId);
    setShow4(true);
  };
  const updateStock = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Projectlanguageid: 1,
        permission: "inventory-edit",
      },
    };
    const bodyData = {
      product_id: stockProductId,
      batch: parseInt(stockBatch),
      inventory_id: stockId,
      quantity: stock,
      reason: reason,
    };
    apis
      .post("/distributor/inventory/updateInventoryStock", bodyData, config)
      .then((res) => {
        toast.success("Stock updated successfully.", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => {
        if(err.message !== "revoke"){
        toast.error("Something went wrong.", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      });
  };
  const closeUpdateStockModal = () => {
    setShow4(false);
    setStock(0);
    setStockBatch("");
    setReason("");
  };
  let data;
  if (rowsPerPage > 0) {
    data = inventoryList.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  } else {
    data = inventoryList;
  }
  const handleInputChange = (e)=>{
    setQ(e.target.value);
    console.log("value to search", e.target.value)
    const valueTosearch =e.target.value;
    const filterData = allData.filter(
      (recieve) =>
        recieve?.senderName.toLowerCase().includes(valueTosearch.toLowerCase())
    );
    setRecieveList(filterData);  
  }

  
  const handleRecieveFilter2=()=>{
    console.log("exxxaad",recieveSupplierFilter)
    const filterData = allData.filter(
      (recieve) =>
        recieve?.sender==recieveSupplierFilter
    );
    setRecieveList(filterData);
  }

  return (
    <div class="container-fluid page-wrap inventory-manage">
      <div class="row height-inherit">
        <Sidebar userType={"distributor"} />
        <div class="col main p-0">
          <Header title={t("distributor.inventory_management.listing.title")} />
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
                        {t("distributor.inventory_management.listing.stock")}
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="receive-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#receive-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="receive-tab-pane"
                        aria-selected="false"
                      >
                        {t("distributor.inventory_management.listing.recieve")}
                      </button>
                    </li>
                    {/* <li class="nav-item" role="presentation">
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
                        
                        Transfer
                      </button>
                    </li> */}
                  </ul>
                    {/* {t("distributor.inventory_management.listing.stock")} */}
                  {/* <div class="filter-box position-abs">
                    <div class="dropdown date-selector">
                      <button
                        class="btn btn-outline-black btn-sm dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {t(
                          "distributor.inventory_management.listing.all_product"
                        )}
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#">
                            {t(
                              "distributor.inventory_management.listing.visible_product"
                            )}
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            {t(
                              "distributor.inventory_management.listing.hidden_product"
                            )}
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            {t(
                              "distributor.inventory_management.listing.all_product"
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
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    className="search-input"
                                    placeholder={t(
                                      "distributor.inventory_management.listing.search_here"
                                    )}
                                  ></input>
                                </div>
                              </div>
                              {/* [/Table Search] */}

                              {/* [Right Filter] */}
                              <div className="filter-row text-end">
                                {/* [Page Filter Box] */}
                                <div className="filter-box">
                                  {hasPermission(INVENTory_EDIT) && (
                                    <button
                                      type="button"
                                      onClick={() => setShow(true)}
                                      className="btn btn-purple btn-sm"
                                    >
                                      {t(
                                        "distributor.inventory_management.listing.create_warehouse"
                                      )}
                                    </button>
                                  )}
                                  {hasPermission(INVENTory_EDIT) &&
                                    hasPermission(PRODUCT_VIEW) &&
                                    hasPermission(SUPPLIER_VIEW) && (
                                      <button
                                        type="button"
                                        onClick={() => handleCreateInventory()}
                                        className="btn btn-purple btn-sm"
                                      >
                                        {t(
                                          "distributor.inventory_management.listing.create_inventory"
                                        )}
                                      </button>
                                    )}
                                  {/* Modal */}
                                  {hasPermission(SUPPLIER_VIEW) && (
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
                                          "distributor.inventory_management.listing.filter"
                                        )}
                                      </button>
                                      <form class="dropdown-menu p-3 ">
                                        <div class="mb-3">
                                          <label class="form-label">
                                            {t(
                                              "distributor.inventory_management.listing.format"
                                            )}
                                          </label>
                                          <select
                                            className="form-select"
                                            value={filterFormat}
                                            onChange={(e) =>
                                              setFilterFormat(e.target.value)
                                            }
                                          >
                                            <option selected value={""}>
                                              {t(
                                                "distributor.inventory_management.listing.select_format"
                                              )}
                                            </option>
                                            {formatList.map((f) => (
                                              <option value={f.id}>
                                                {f.name}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                        <div class="mb-3">
                                          <label class="form-label">
                                            {t(
                                              "distributor.inventory_management.listing.producer"
                                            )}
                                          </label>
                                          <select
                                            className="form-select"
                                            value={filterSupplier}
                                            onChange={(e) =>
                                              setFilterSupplier(e.target.value)
                                            }
                                          >
                                            <option selected>
                                              {t(
                                                "distributor.inventory_management.listing.select_producer"
                                              )}
                                            </option>
                                            {supplierList.map((d) => (
                                              <option value={d.id}>
                                                {d?.user_profile?.company_name}
                                              </option>
                                            ))}
                                          </select>
                                        </div>

                                        <div className="d-flex justify-content-end">
                                          <button
                                            type="button"
                                            class="btn btn-purple width-auto me-2"
                                            onClick={handleFilter}
                                          >
                                            {t(
                                              "distributor.inventory_management.listing.apply"
                                            )}
                                          </button>
                                          <button
                                            type="button"
                                            class="btn btn-outline-black width-auto"
                                            onClick={()=>{
                                              setKeyword("")
                                              setFilterFormat("")
                                              setFilterSupplier("")
                                              setReload2(!reload2)
                                            }}
                                          >
                                            {t(
                                              "distributor.inventory_management.listing.reset"
                                            )}
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  )}
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
                                        "distributor.inventory_management.listing.product_name"
                                      )}
                                    </th>
                                    <th>
                                      {t(
                                        "distributor.inventory_management.listing.batch_number"
                                      )}
                                    </th>
                                    <th>
                                      {t(
                                        "distributor.inventory_management.listing.supplier_name"
                                      )}
                                    </th>
                                    <th className="text-center">
                                    {t("distributor.inventory_management.listing.at_warehouse")}{" "}
                                    </th>
                                    <th className="text-center">
                                    {t("distributor.inventory_management.listing.distributor_warehouse")}
                                    </th>
                                    {/* <th className="text-center">{t("distributor.inventory_management.listing.in_transit")}</th>
                                    <th className="text-center">{t("distributor.inventory_management.listing.delivery")}</th> */}
                                    <th>
                                      {t(
                                        "distributor.inventory_management.listing.warehouse_name"
                                      )}
                                    </th>
                                    <th>
                                      {t(
                                        "distributor.inventory_management.listing.aisle"
                                      )}
                                    </th>
                                    <th>
                                      {t(
                                        "distributor.inventory_management.listing.shelf"
                                      )}
                                    </th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {inventoryList && inventoryList.length > 0 ? (
                                    inventoryList?.map((ele) => {
                                      return (
                                        <tr>
                                          <td>
                                            <div class="btn-group dropstart table-action float-start">
                                              <button
                                                type="button"
                                                class="dropdown-toggle px-0"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                              >
                                                {ele?.product?.product_name}
                                              </button>
                                            </div>
                                          </td>
                                          <td>
                                            {ele?.batch ? ele?.batch : "NA"}
                                          </td>
                                          <td>
                                            {ele?.supplier_info
                                              ? ele?.supplier_info?.full_name
                                              : "N/A"}
                                          </td>
                                          <td>
                                            <div class="btn-group dropend table-action float-none d-flex justify-content-center">
                                              {hasPermission(INVENTory_EDIT) ? (
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    handleUpdateStockModal(
                                                      ele?.id,
                                                      ele?.batch,
                                                      ele?.product?.id
                                                    )
                                                  }
                                                  class="dropdown-toggle px-0 text-purple"
                                                >
                                                  {ele?.quantity}
                                                </button>
                                              ) : (
                                                <button
                                                  type="button"
                                                  class="dropdown-toggle px-0"
                                                >
                                                  {ele?.quantity}
                                                </button>
                                              )}
                                            </div>
                                          </td>
                                          <td className="text-center">0</td>
                                          {/* <td className="text-center">0</td>
                                          <td className="text-center">0</td> */}
                                          <td>{ele?.warehouse?.name}</td>
                                          <td>{ele?.aisle}</td>
                                          <td>{ele?.shelf}</td>
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
                                                <li>
                                                  <a
                                                    onClick={() =>
                                                      toast.error(
                                                        "Work in progress.",
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
                                                    {t(
                                                      "distributor.inventory_management.listing.edit"
                                                    )}
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
                                        "distributor.inventory_management.listing.no_data_to_show"
                                      )}
                                    </>
                                  )}
                                </tbody>
                                <tfoot>
                                  <tr>
                                    {data.length > 0 ? (
                                      <CustomTablePagination
                                        rowsPerPageOptions={[
                                          5,
                                          10,
                                          15,
                                          {
                                            label: t(
                                              "distributor.product_management.all"
                                            ),
                                            value: -1,
                                          },
                                        ]}
                                        labelRowsPerPage={t(
                                          "distributor.product_management.rows_per_page"
                                        )}
                                        colSpan={11}
                                        count={data.length}
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

                                          ".MuiTablePagination-toolbar span": {
                                            fontSize: "12px",
                                          },
                                        }}
                                      />
                                    ) : (
                                      <></>
                                    )}
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* [/Card] */}
                  </div>

                  <div
                    class="tab-pane fade"
                    id="receive-tab-pane"
                    role="tabpanel"
                    aria-labelledby="receive-tab"
                    tabindex="1"
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
                                    value={q}
                                    onChange={(e)=>handleInputChange(e)}
                                    type="text"
                                    className="search-input"
                                    placeholder={t("distributor.inventory_management.listing.search_here")}
                                  ></input>
                                </div>
                              </div>
                              {/* [/Table Search] */}

                              {/* [Right Filter]*/}
                              <div className="filter-row text-end">
                                {/* [Page Filter Box] */}
                                <div className="filter-box">
                                  {/* Modal */}
                                  {hasPermission(SUPPLIER_VIEW) && (
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
                                          "distributor.inventory_management.listing.filter"
                                        )}
                                      </button>
                                      <form class="dropdown-menu p-3 ">
                                        <div class="mb-3">
                                          <label class="form-label">
                                            {t(
                                              "distributor.inventory_management.listing.format"
                                            )}
                                          </label>
                                          <select
                                            className="form-select"
                                            value={recieveFormatFilter}
                                            onChange={(e) =>
                                              setRecieveFormatFilter(
                                                e.target.value
                                              )
                                            }
                                          >
                                            <option selected value={""}>
                                              {t(
                                                "distributor.inventory_management.listing.select_format"
                                              )}
                                            </option>
                                            {formatList.map((f) => (
                                              <option value={f.id}>
                                                {f?.name}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                        <div class="mb-3">
                                          <label class="form-label">
                                            {t(
                                              "distributor.inventory_management.listing.producer"
                                            )}
                                          </label>
                                          <select
                                            className="form-select"
                                            value={recieveSupplierFilter}
                                            onChange={(e) =>
                                              setRecieveSupplierFilter(
                                                e.target.value
                                              )
                                            }
                                          >
                                            <option selected>
                                              {t(
                                                "distributor.inventory_management.listing.select_producer"
                                              )}
                                            </option>
                                            {supplierList?.map((d) => (
                                              <option value={d.id}>
                                                {d?.user_profile?.company_name}
                                              </option>
                                            ))}
                                          </select>
                                        </div>

                                        <div className="d-flex justify-content-end">
                                        <button
                                            type="button"
                                            class="btn btn-purple width-auto me-2"
                                            // onClick={handleRecieveFilter}
                                            onClick={handleRecieveFilter2}
                                          >
                                            {t(
                                              "distributor.inventory_management.listing.apply"
                                            )}
                                          </button>
                                          <button
                                            type="reset"
                                            class="btn btn-outline-black width-auto"
                                            onClick={()=>{setRecieveSupplierFilter("")
                                              setReload(!reload)
                                              setQ("")
                                            }}
                                          >
                                            {t("distributor.inventory_management.listing.reset")}
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  )}
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
                                    <th>{t("distributor.inventory_management.listing.sender")}</th>
                                    <th>{t("distributor.inventory_management.listing.receipient")}</th>
                                    <th>{t("distributor.inventory_management.listing.state")}</th>
                                    <th>Date</th>
                                    <th>{t("distributor.inventory_management.listing.sent")}</th>
                                    <th>{t("distributor.inventory_management.listing.received")}</th>
                                    <th>{t("distributor.inventory_management.listing.broken")}</th>
                                    <th></th>
                                  </tr>
                                </thead>
                                {/* hello */}
                                <tbody>
                                {recieveList && recieveList.length > 0 ? (
                                    recieveList?.map((ele) => {
                                      return (
                                    <tr key={ele?.id}>
                                    <td>{ele?.senderName}</td>
                                    <td>{ele?.recipentName}</td>
                                    <td>
                                    {ele?.state}
                                    </td>
                                    <td>{ele?.updated_at}</td>
                                    <td>{ele?.send}</td>
                                    <td>{ele?.recieved}</td>
                                    <td>{ele?.broken}</td>
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
                                          <li>
                                            <Link
                                              className="dropdown-item"
                                              to={
                                               `/distributor/inventory-management/receive/${ele.id}`
                                              }
                                            >
                                             {t("distributor.inventory_management.listing.view")}
                                            </Link>
                                          </li>
                                        </ul>
                                      </div>
                                    </td>
                                  </tr>
                                      )
                                    })
                                ):(
                                   <>
                                   No data to show
                                   </>
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
                  <div
                    class="tab-pane fade"
                    id="transfer-tab"
                    role="tabpanel"
                    aria-labelledby="transfer-tab"
                    tabindex="2"
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
                                    placeholder="Search Here..."
                                  ></input>
                                </div>
                              </div>
                              {/* [/Table Search] */}

                              {/* [Right Filter] */}
                              <div className="filter-row text-end">
                                {/* [Page Filter Box] */}
                                <div className="filter-box">
                                  {
                                    hasPermission(INVENTORY_EDIT) && 
                                    <button
                                    type="button"
                                    onClick={() =>
                                      navigate(
                                        "/distributor/inventory-management/create-transfer"
                                      )
                                    }
                                    className="btn btn-purple btn-sm"
                                    >
                                      + Create New
                                    </button>
                                  }
                                  <div class="dropdown right-filter">
                                    <button
                                      type="button"
                                      class="btn dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                      data-bs-auto-close="outside"
                                    >
                                      <img src={filter} /> {t(
                                        "supplier.inventory_management.list.filter1"
                                      )}
                                    </button>
                                    <form class="dropdown-menu p-3 ">
                                      <div class="mb-3">
                                        <label class="form-label">Format</label>
                                        <select className="form-select">
                                          <option selected disabled>
                                          {t("supplier.inventory_management.list.select_format")}
                                          </option>
                                          <option value="">{t("supplier.inventory_management.list.bottle")}</option>
                                          <option value="">{t("supplier.inventory_management.list.can")}</option>
                                          <option value="">{t("supplier.inventory_management.list.keg")}</option>
                                        </select>
                                      </div>
                                      <div class="mb-3">
                                        <label class="form-label">
                                        {t("supplier.inventory_management.list.producer")}
                                        </label>
                                        <select className="form-select">
                                          <option selected disabled>
                                          {t("supplier.inventory_management.list.choose_producer")}
                                          </option>
                                        </select>
                                      </div>

                                      <div className="d-flex justify-content-end">
                                        <button
                                          type="submit"
                                          class="btn btn-purple width-auto me-2"
                                        >
                                          {t("supplier.inventory_management.list.apply")}
                                        </button>
                                        <button
                                          type="reset"
                                          class="btn btn-outline-black width-auto"
                                        >
                                         {t("supplier.inventory_management.list.reset")}
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
                                    <th>SENDER</th>
                                    <th>RECIPIENT</th>
                                    <th>STATUS</th>
                                    <th>DATE</th>
                                    <th>SENT</th>
                                    <th>RECEIVED</th>
                                    <th>BROKEN</th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    transerList && transerList.length > 0 ?
                                    transerList.map((ele) => {
                                      const date = new Date(ele.created_at);
                                      const day = String(date.getDate()).padStart(2, '0');
                                      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
                                      const year = date.getFullYear();
                                      const finalDate = `${day}-${month}-${year}`
                                      return(
                                        <tr>
                                        <td>{ele?.senderName}</td>
                                        <td>{ele?.recipentName}</td>
                                        <td>{ele?.status}</td>
                                        <td>{finalDate}</td>
                                        <td>{ele?.send}</td>
                                        <td>{ele?.recieved}</td>
                                        <td>{ele?.broken}</td>
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
                                              <li>
                                                <a
                                                  className="dropdown-item"
                                                  href="/order-detail"
                                                >
                                                  {t("supplier.inventory_management.list.view_map")}
                                                </a>
                                              </li>
                                              <li>
                                                <a className="dropdown-item">
                                                  Edit
                                                </a>
                                              </li>
                                            </ul>
                                          </div>
                                        </td>
                                        </tr>
                                      )
                                    })
                                    :
                                    <>No data to show</>
                                  }
                                  
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
                        {t(
                          "distributor.inventory_management.listing.create_warehouse"
                        )}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form>
                        <div className="row">
                          <div className="col-sm-6 col-12 mb-sm-3 mb-2">
                            <label for="Warehouse-name" class="col-form-label">
                              {t(
                                "distributor.inventory_management.listing.warehouse_name"
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
                                "distributor.inventory_management.listing.warehouse_address"
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
                                "distributor.inventory_management.listing.no_of_aisle"
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
                                "distributor.inventory_management.listing.no_of_shelf"
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
                        {t("distributor.inventory_management.listing.cancel")}
                      </button>
                      <button
                        type="button"
                        class="btn btn-purple"
                        onClick={() => handleSaveWarehouse()}
                      >
                        {t("distributor.inventory_management.listing.create")}
                      </button>
                    </Modal.Footer>
                  </Modal>
                  {/* modal box Creat Warehouse end */}

                  {/* modal Box Creat Warehouse */}
                  <Modal
                    className="modal fade"
                    show={show2}
                    centered
                    onHide={() => handleCancel2()}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>
                        {t(
                          "distributor.inventory_management.listing.create_inventory"
                        )}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <h3 className="titleName">
                        {t(
                          "distributor.inventory_management.listing.add_an_inventory"
                        )}
                      </h3>
                      <form>
                        <div className="row">
                          <div className="col-sm-6 col-12 mb-sm-3 mb-2">
                            <label
                              for="SelectDistributor"
                              class="col-form-label"
                            >
                              {t(
                                "distributor.inventory_management.listing.select_supplier"
                              )}
                            </label>
                            <select
                              class="form-select"
                              id="SelectDistributor"
                              aria-label="Default select example"
                              value={supplier}
                              onChange={(e) =>
                                handleSupplierChange(e.target.value)
                              }
                            >
                              <option value="">
                                {t(
                                  "distributor.inventory_management.listing.choose_supplier"
                                )}
                              </option>
                              {distributorList && distributorList.length > 0 ? (
                                distributorList.map((ele) => {
                                  return (
                                    <option key={ele.id} value={ele.id}>
                                      {ele.full_name}
                                    </option>
                                  );
                                })
                              ) : (
                                <></>
                              )}
                            </select>
                            {distributorError !== "" ? (
                              <p className="error-label">{distributorError}</p>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="col-sm-6 col-12 mb-sm-3 mb-2">
                            <label
                              for="SelectProductName"
                              class="col-form-label"
                            >
                             {t(
                                  "distributor.inventory_management.listing.select_product_name"
                                )} 
                            </label>
                            <select
                              class="form-select"
                              id="SelectProductName"
                              aria-label="Default select example"
                              disabled={!supplier ? true : false}
                              value={selectedProduct}
                              onChange={(e) =>
                                handleProductChange(e.target.value)
                              }
                            >
                              <option value="">
                                {t(
                                  "distributor.inventory_management.listing.choose_product"
                                )}
                              </option>
                              {productList && productList.length > 0 ? (
                                productList.map((ele, i) => {
                                  return (
                                    <option key={ele.id} value={ele.id}>
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
                            <label for="batchNumber" class="col-form-label">
                              Batch Number
                            </label>
                            <select
                              class="form-select"
                              id="batchNumber"
                              aria-label="Default select example"
                              disabled={productBatchList < 1 ? true : false}
                              value={selectedBatch}
                              onChange={(e) => setSelectedBatch(e.target.value)}
                            >
                              <option value="">
                                {t(
                                  "distributor.inventory_management.listing.choose_batch"
                                )}
                              </option>
                              {productBatchList &&
                              productBatchList.length > 0 ? (
                                productBatchList.map((ele, i) => {
                                  return (
                                    <option key={ele} value={ele}>
                                      {ele}
                                    </option>
                                  );
                                })
                              ) : (
                                <></>
                              )}
                            </select>
                          </div>

                          <div className="col-sm-6 col-12 mb-sm-3 mb-2">
                            <label for="SelectQuantity" class="col-form-label">
                              {t(
                                "distributor.inventory_management.listing.select_quantity"
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
                            <label for="SelectWarehouse" class="col-form-label">
                              {t(
                                "distributor.inventory_management.listing.select_warehouse"
                              )}
                            </label>
                            {!selectedBatch ? (
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
                                <option value="">
                                  {t(
                                    "distributor.inventory_management.listing.choose_warehouse"
                                  )}
                                </option>
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
                                "distributor.inventory_management.listing.select_aisle"
                              )}
                            </label>
                            {!selectedWarehouse ? (
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
                              >
                                <option value="">
                                  {t(
                                    "distributor.inventory_management.listing.choose_aisle"
                                  )}
                                </option>
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
                                "distributor.inventory_management.listing.aisle_name"
                              )}
                            </label>
                            <input
                              class="form-control"
                              value={aisleName}
                              disabled={selectedAisle === "" ? true : false}
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
                                "distributor.inventory_management.listing.select_shelf"
                              )}
                            </label>
                            {!selectedWarehouse ? (
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
                              >
                                <option value="">
                                  {t(
                                    "distributor.inventory_management.listing.choose_shelf"
                                  )}
                                </option>
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
                                "distributor.inventory_management.listing.shelf_name"
                              )}
                            </label>
                            <input
                              class="form-control"
                              value={shelfName}
                              placeholder="Enter shelf name"
                              disabled={selectedShelf === "" ? true : false}
                              onChange={(e) => handleShelfNameChange(e)}
                            />
                            {shelfNameError !== "" ? (
                              <p className="error-label">{shelfNameError}</p>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </form>
                    </Modal.Body>
                    <Modal.Footer>
                      <button
                        type="button"
                        class="btn btn-outline-black"
                        data-bs-dismiss="modal"
                        onClick={() => handleCancel2()}
                      >
                        {t("distributor.inventory_management.listing.cancel")}
                      </button>
                      <button
                        type="button"
                        class="btn btn-purple"
                        onClick={() => handleSaveInventory()}
                      >
                        {t("distributor.inventory_management.listing.create")}
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
                          "distributor.inventory_management.listing.create_warehouse"
                        )}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>
                        {t(
                          "distributor.inventory_management.listing.create_warehouse_first_message"
                        )}{" "}
                        <a
                          onClick={() => {
                            setShow(true);
                            setShow3(false);
                          }}
                          className="custom-atag"
                        >
                          {t(
                            "distributor.inventory_management.listing.create_new_one"
                          )}
                        </a>
                      </p>
                    </Modal.Body>
                  </Modal>
                  <Modal
                    className="modal fade"
                    show={show4}
                    centered
                    onHide={() => closeUpdateStockModal()}
                  >
                    <Modal.Header>
                      <h5 class="modal-title text-purpal">Update Stock</h5>
                      <button
                        type="button"
                        class="btn-close text-purpal"
                        aria-label="Close"
                        onClick={() => setShow4(false)}
                      ></button>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="mb-2">
                        <label className="form-label">Modification</label>
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
                        <label className="form-label">Reason</label>
                        <select
                          className="form-select"
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                        >
                          <option value={""}>Select Reason</option>
                          <option value={"reciepts"}>Recipts</option>
                          <option value={"adjustment"}>Adjustment</option>
                          <option value={"return"}>Return</option>
                          <option value={"purchase"}>Purchase</option>
                          <option value={"other"}>Other</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Batch Number</label>
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
                        onClick={() => closeUpdateStockModal()}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => updateStock()}
                        class="btn btn-purple btn-md w-auto"
                      >
                        Save
                      </button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierInventoryManagement;
