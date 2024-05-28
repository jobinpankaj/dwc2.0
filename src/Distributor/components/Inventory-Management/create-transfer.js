import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import NumericInput from "react-numeric-input";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import useAuthInterceptor from "../../../utils/apis";
import "../../assets/scss/dashboard.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
toast.configure();

const CreateTransfer = () => {
  const apis = useAuthInterceptor();
  const { t } = useTranslation();
  const navigate = useNavigate()
  const fullName = localStorage.getItem("distributor_fullName");
  const token = localStorage.getItem("distributor_accessToken");
  const [showSidebar, setShowSidebar] = useState(false);
  const [distributorList, setDistributorList] = useState("");
  const [selectedDistributor, setSelectedDistributor] = useState("");
  const [distributorError, setDistributorError] = useState("")
  const [warehouseList, setWarehouseList] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [warehouseError, setWarehouseError] = useState("")
  const [customDistributor, setCustomDistributor] = useState("");
  const [customDistributorError, setCustomDistributorError] = useState("")
  const [inventoryList, setInventoryList] = useState("");
  const [update, setUpdate] = useState(false);
  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleUpdate = (send, inventoryId, batch) => {
     const updatedInv = inventoryList.map(ele => {
      if(ele.id === inventoryId){
        return {...ele, send: send}
      }
      return ele
     })
     setInventoryList(updatedInv)
  };

  const handleCreate = () => {
    let distributor = true, custom = true, warehouse = true, transfer = true

    if(selectedWarehouse === ""){
      setWarehouseError("Please select a warehouse.")
      warehouse = false
    }

    if(selectedDistributor === ""){
      distributor = false
      setDistributorError("Please select a distributor.")
    }

    if(selectedDistributor === "custom" && customDistributor === ""){
      setCustomDistributorError("Please enter a distributor name")
      custom = false
    }

    let transferArr = []
    for(let i = 0; i<inventoryList.length; i++){
      if(inventoryList[i].send > 0){
        let newObj = {
          product_id: inventoryList[i].product_id,
          batch: inventoryList[i].batch,
          send: `${inventoryList[i].send}`,
          inventory_id: inventoryList[i].id
        }

        transferArr.push(newObj)
      }
    }

    if(transferArr.length === 0){
      transfer = false
      toast.error("Please add atlease one item from inventory to create transfer.", { autoClose: 3000, position: toast.POSITION.TOP_CENTER });
    }

    if(!transfer || !custom || !distributor || !warehouse){
      console.log("Validation Error")
    }else{
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: "inventory-edit"
        }
      }

      const bodyData = {
        warehouse_id: selectedWarehouse,
        recepient: selectedDistributor === "custom" ? "" : selectedDistributor ,
        recepient_name: customDistributor,
        others: selectedDistributor === "custom" ? 1 : 0,
        products: transferArr
      }

      apis.post('supplier/inventoryTransfer/add', bodyData, config)
      .then((res) => {
        if(res.data.success === true){
          toast.success("Transfer Created Successfully", { autoClose: 3000, position: toast.POSITION.TOP_CENTER });
          navigate('/supplier/inventory-management')
        }else{
          toast.error("Could not create transfer. Please try again later.", { autoClose: 3000, position: toast.POSITION.TOP_CENTER });
        }
      })
      .catch((error) => {
        if(error.message !== "revoke"){
          toast.error("Could not create transfer. Please try again later.", { autoClose: 3000, position: toast.POSITION.TOP_CENTER });
        }
      })
    }

  }

//   useEffect(() => {
//     const config1 = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     apis
//       .get(`/supplier/getLinkedDistributors`, config1)
//       .then((res) => {
//         if (res.data.success === true) {
//           setDistributorList(res.data.data);
//         } else {
//           toast.error(
//             "Could not fetch distributors list. Please try again later.",
//             { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
//           );
//         }
//       })
//       .catch((error) => {
//         if(error.message !== "revoke"){
//           toast.error(
//             "Could not fetch distributors list. Please try again later.",
//             { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
//           );
//         }
//       });

//     const config2 = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         permission: "inventory-view",
//       },
//     };

//     apis
//       .get("/supplier/warehouses", config2)
//       .then((res) => {
//         if (res.data.success === true) {
//           setWarehouseList(res.data.data);
//         }
//       })
//       .catch((error) => {
//         if(error.message !== "revoke"){
//           toast.error("Could not get warehouse list. Please try again late.", {
//             autoClose: 3000,
//             position: toast.POSITION.TOP_CENTER,
//           });
//         }
//       });

//     // apis
//     //   .get("/supplier/inventories", config2)
//     //   .then((res) => {
//     //     if (res.data.success === true) {
//     //       let newData = []
//     //       for(let i = 0; i < res.data.data.length; i++){
//     //         let newObj = res.data.data[i]
//     //         newObj["send"] = 0
//     //         newData.push(newObj)
//     //       }
//     //       setInventoryList(newData)
//     //     }
//     //   })
//     //   .catch((error) => {
//     //     toast.error("Could not get inventory list. Please try again late.", {
//     //       autoClose: 3000,
//     //       position: toast.POSITION.TOP_CENTER,
//     //     });
//     //   });
//   }, []);

//   useEffect(() => {
//     if(selectedWarehouse !== ""){
//       const config = {
//         headers : {
//           Authorization : `Bearer ${token}`,
//           permission : "inventory-view"
//         }
//       }

//       apis.get(`/supplier/transferwarehouse/${selectedWarehouse}`, config)
//       .then((res) => {
//         if(res.data.success === true){
//           if(res.data.data.length > 0){
//             let newData = []
//             for(let i = 0; i < res.data.data.length; i++){
//               let newObj = res.data.data[i]
//               newObj["send"] = 0
//               newData.push(newObj)
//             }
//             setInventoryList(newData)
//           }else{
//             setInventoryList(res.data.data)
//           }
          
//         }else{
//           toast.error("Could not fetch inventory list. Please try again later.", { autoClose: 3000, position: toast.POSITION.TOP_CENTER });
//         }
//       })
//       .catch((error) => {
//         if(error.message !== "revoke"){
//           toast.error("Could not fetch inventory list. Please try again later.", { autoClose: 3000, position: toast.POSITION.TOP_CENTER });
//         }
//       })
//     }else{
//       setInventoryList([])
//     }
//   }, [selectedWarehouse])

  return (
    <div class="container-fluid page-wrap inventory-manage">
      <div class="row height-inherit">
        <Sidebar
          showSidebar={showSidebar}
          updateSidebar={updateSidebar}
          userType={"supplier"}
        />

        <div class="col main p-0">
          <Header title="Create Transfer" updateSidebar={updateSidebar} />
          <div class="container-fluid page-content-box px-3 px-sm-4">
            <div class="row">
              <div class="col">
                <form>
                  {/* [Card] */}
                  <div className="card mb-4">
                    <div className="card-body">
                      <div className="row">
                        <div className="col mb-3">
                          <label className="form-label">
                            {t(
                              "supplier.inventory_management.create_transfer.sender"
                            )}
                          </label>
                          <input
                            className="form-control"
                            disabled={true}
                            placeholder="Enter Supplier Name"
                            value={fullName}
                          />
                        </div>
                        <div className="col">
                          <label className="form-label">
                            {t(
                              "supplier.inventory_management.create_transfer.receipient"
                            )}
                          </label>
                          <select
                            className="form-select"
                            value={selectedDistributor}
                            onChange={(e) =>{
                              setSelectedDistributor(e.target.value)
                              setDistributorError("")
                              if(e.target.value !== "custom"){
                                setCustomDistributor("")
                              }
                            }
                            }
                          >
                            <option value="">Select Distributor</option>
                            {distributorList && distributorList.length > 0 ? (
                              distributorList.map((ele) => {
                                return (
                                  <option value={ele.id}>
                                    {ele.user_profile.company_name ? ele.user_profile.company_name : "N/A"}
                                  </option>
                                );
                              })
                            ) : (
                              <></>
                            )}
                            <option value={"custom"}>Other Distributor</option>
                          </select>
                          {distributorError !== "" ? (<p className="error-label">{distributorError}</p>) : (<></>)}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col mb-3">
                          <label className="form-label">
                            {t(
                              "supplier.inventory_management.create_transfer.warehouse"
                            )}
                          </label>
                          <select
                            className="form-select"
                            value={selectedWarehouse}
                            onChange={(e) =>{
                              setSelectedWarehouse(e.target.value)
                              setWarehouseError("")
                            }
                            }
                          >
                            <option value={""}>Select Warehouse</option>
                            {warehouseList && warehouseList.length > 0 ? (
                              warehouseList.map((ele) => {
                                return (
                                  <option value={ele.id}>{ele.name}</option>
                                );
                              })
                            ) : (
                              <></>
                            )}
                          </select>
                          {warehouseError !== "" ? (<p className="error-label">{warehouseError}</p>) : (<></>)}
                        </div>
                        <div className="col">
                          <label className="form-label">
                            {t(
                              "supplier.inventory_management.create_transfer.distributor"
                            )}
                          </label>
                          <input
                            className="form-control"
                            placeholder="Enter Distributor Name"
                            value={customDistributor}
                            disabled = {selectedDistributor === "custom" ? false : true}
                            onChange={(e) =>{ 
                              setCustomDistributor(e.target.value)
                              setCustomDistributorError("")
                            }
                            }
                          />
                          {customDistributorError !== "" ? (<p className="error-label">{customDistributorError}</p>) : (<></>)}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* [/Card] */}

                  {/* <div
                    class="alert alert-purple d-flex align-items-center"
                    role="alert"
                  >
                    <img className="icon me-2" src={infoVector} /> Amet minim
                    mollit non deserunt ullamco est sit aliqua dolor do amet
                    sint.
                  </div> */}

                  {/* [Card] */}
                  {selectedWarehouse === "" ? <></> : 
                  <div className="card mb-4">
                  <div className="card-body p-0">
                    <div className="row">
                      <div className="col">
                        <div className="table-responsive transfer-table">
                          <table class="table m-0">
                            <thead>
                              <tr>
                                <th scope="col">
                                  {t(
                                    "supplier.inventory_management.create_transfer.product"
                                  )}
                                </th>
                                <th scope="col">
                                  {t(
                                    "supplier.inventory_management.create_transfer.batch_number"
                                  )}
                                </th>
                                <th scope="col">
                                  {t(
                                    "supplier.inventory_management.create_transfer.no_of_items"
                                  )}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {inventoryList && inventoryList.length > 0 ? (
                                inventoryList.map((ele) => {
                                  return (
                                    <tr>
                                      <td>
                                        <div class="prodInfo d-flex">
                                          <div class="prod-img p-2">
                                            <img
                                              src={ele.product.combined_image}
                                            />
                                          </div>
                                          <div class="desc d-flex flex-column align-items-start">
                                            <div className="proName">
                                              {ele.product.product_name}
                                            </div>
                                            <div className="prodMeta badge text-bg-light rounded-pill px-0">
                                              {
                                                ele.product.product_format
                                                  .name
                                              }
                                            </div>
                                            <div className="prodQTY">
                                              Quantity: {ele.quantity}
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td class="">
                                        <div className="qty-box hstack">
                                          <input
                                            type="text"
                                            class="form-control rounded-0 w-100"
                                            value={ele.batch}
                                            disabled
                                          />
                                        </div>
                                      </td>
                                      <td>
                                        <div className="qty-box hstack gap-3">
                                          {/* <button class="btn btn-purple rounded-circle d-flex align-items-center justify-content-center" type="button">-</button> */}
                                          {/* <input type="text" class="form-control rounded-0" value="4" /> */}
                                          <NumericInput
                                            className="form-control"
                                            value={ele.send}
                                            min={0}
                                            max={ele.quantity}
                                            onChange={(e) =>
                                              handleUpdate(
                                                e,
                                                ele.id,
                                                ele.batch
                                              )
                                            }
                                            step={1}
                                            precision={0}
                                            size={5}
                                            strict
                                            style={{
                                              wrap: {
                                                background: "#E2E2E2",
                                                boxShadow:
                                                  "0 0 1px 1px #fff inset, 1px 1px 5px -1px #000",
                                                padding: "2px 2.26ex 2px 2px",
                                                borderRadius:
                                                  "6px 3px 3px 6px",
                                                fontSize: 18,
                                              },
                                              input: {
                                                borderRadius:
                                                  "4px 2px 2px 4px",
                                                color: "#988869",
                                                padding: "0.1ex 1ex",
                                                border: "1px solid #ccc",
                                                marginRight: 4,
                                                display: "block",
                                                fontWeight: 100,
                                                textShadow:
                                                  "1px 1px 1px rgba(0, 0, 0, 0.1)",
                                                width: "100px",
                                              },
                                              "input:focus": {
                                                border: "1px inset #69C",
                                                outline: "none",
                                              },
                                              arrowUp: {
                                                borderBottomColor:
                                                  "rgba(66, 54, 0, 0.63)",
                                              },
                                              arrowDown: {
                                                borderTopColor:
                                                  "rgba(66, 54, 0, 0.63)",
                                              },
                                            }}
                                          />
                                          {/* <button class="btn btn-purple rounded-circle  d-flex align-items-center justify-content-center" type="button">+</button> */}
                                        </div>
                                      </td>
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
                </div>}
                  {/* [/Card] */}

                  <div className="mb-3 hstack gap-3">
                    <button
                      type="button"
                      className="btn btn-outline-black"
                    >
                      {t("supplier.inventory_management.create_transfer.cancelled")}
                    </button>
                    <button
                      type="button"
                      className="btn btn-purple"
                      onClick={() => handleCreate()}
                    >
                      {t("supplier.inventory_management.create_transfer.create")}
                    </button>
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

export default CreateTransfer;
