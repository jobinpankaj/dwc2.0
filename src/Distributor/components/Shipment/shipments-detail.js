import React, { useEffect, useRef, useState } from "react";
import { Button, Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import filter from "../../assets/images/filter-icon.png";
import approve from "../../assets/images/approve-icon.svg";
import cancel from "../../assets/images/cancel.svg";
import calender from "../../assets/images/calender.png";
import shipping from "../../assets/images/shipping.png";
import Map from "../../../CommonComponents/MultipleRouteMap";
import product1 from "../../assets/images/product-1.png";
import product2 from "../../assets/images/product-2.png";
import product3 from "../../assets/images/product-3.png";
import map from "../../assets/images/route-map.png";
import books from "../../assets/images/books.png";
import truck from "../../assets/images/truck.png";
import bottel from "../../assets/images/bottel.png";
import can from "../../assets/images/can.png";
import temp from "../../assets/images/temp.png";
import distance from "../../assets/images/distance.png";
import location from "../../assets/images/location.png";
import pending from "../../assets/images/pending.png";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import "../../assets/scss/dashboard.scss";
import useAuthInterceptor from "../../../utils/apis";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDrag, useDrop } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { colors, hasPermission } from "../../../CommonComponents/commonMethods";
import { useTranslation } from "react-i18next";
import { SHIPMENT_EDIT } from "../../../Constants/constant";

const ShipmentsDetail = () => {
  const { t } = useTranslation();
  const apis = useAuthInterceptor();
  const navigate = useNavigate();
  const token = localStorage.getItem("distributor_accessToken");
  const [showSidebar, setShowSidebar] = useState(false);
  const [shipment, setShipment] = useState({});
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [transportList, setTransportList] = useState([]);
  const [driverName, setDtriverName] = useState("");
  const [driverEdit, setDriverEdit] = useState({});
  const [transformedData, setTransformedData] = useState();
  const [transportOrders, setTransportOrders] = useState([]);
  const [documentList, setDocumentList] = useState([]);
  const [routeResult, setRouteResult] = useState();
  // const [documentList, setDocumentList] = useState([]);
  const [documentType, setDocumentType] = useState("Delivery Manifest");
  const transportRefs = {};
  const handleEdit = (transportId) => {
    console.log(transportId);
    handleFocus(transportId);
    const obj = { ...driverEdit }; // Create a copy of the driverEdit object
    obj[transportId] = true;
    console.log(obj);
    setDriverEdit(obj);
  };
  const inputRefs = useRef({});
  const handleFocus = (transportId) => {
    if (inputRefs.current[transportId]) {
      inputRefs.current[transportId].focus();
    }
  };
  const handleRouteResult = (res) => {
    setRouteResult(res);
  };
  const query = new URLSearchParams(window.location.search);
  const shipment_id = query.get("id");
  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const retailerInformation = orders.map(
    (item) => item.orders.retailer_information
  );

  useEffect(() => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "shipment-view",
      },
    };
    apis
      .get(`distributor/shipments/${shipment_id}`, config)
      .then((res) => {
        setLoading(false);
        setShipment(res.data.data);
        setOrders(res.data.data.order_shipments);
      })
      .catch((err) => {
        if(err.message !== "revoke"){
        setLoading(false);
        toast.error("Something went wrong. Please try again later", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      });
  }, [shipment_id, token]);
  console.log(routeResult, "route");
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "shipment-edit",
        Projectlanguageid: 1,
      },
    };
    apis
      .get(`distributor/transport/list/${shipment_id}`, config)
      .then((res) => {
        setTransportList(res.data.data);

        const arrayList = res.data.data;
        const defaultObject = arrayList.reduce((acc, item) => {
          acc[item.id] = false;
          return acc;
        }, {});
        setDriverEdit(defaultObject);
        const transportOrdersArray = arrayList.map((transport) => ({
          transport_id: transport.id,
          name: transport.name,
          orders: transport.order_shipments,
        }));

        // Set the transportOrders state with the new object
        setTransportOrders(transportOrdersArray);
        const transformedData = arrayList.map((transport) => {
          const orders = transport.order_shipments.map((order, index) => ({
            order_id: order.id,
            position_id: order.order_position,
          }));

          return {
            transport_id: transport.id,
            orders,
          };
        });
        setTransformedData(transformedData);
      })
      .catch((err) => {
        if(err.message !== "revoke"){
        setLoading(false);
        toast.error("Something went wrong. Please try again later", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      });
  }, [shipment_id, token]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "shipment-view",
        Projectlanguageid: 1,
      },
    };
    apis
      .get(
        `distributor/getPickupAndDeliveryTicket?shipment_id=${shipment_id}&document_type=${
          documentType === "Delivery Manifest"
            ? "delivery_ticket"
            : "pickup_ticket"
        }`,
        config
      )
      .then((res) => {
        setDocumentList(res.data.data);
      })
      .catch((err) => {
        if(err.message !== "revoke"){
        setLoading(false);
        toast.error("Something went wrong. Please try again later", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
        }
      });
  }, [shipment_id, token, documentType]);
  const handleAddTransport = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "shipment-edit",
        Projectlanguageid: 1,
      },
    };
    const bodyData = {
      shipment_id: shipment_id,
    };
    apis
      .post(`distributor/transport/add`, bodyData, config)
      .then((res) => {
        setTransportList(res.data.data);

        const arrayList = res.data.data;
        const defaultObject = arrayList.reduce((acc, item) => {
          acc[item.id] = false;
          return acc;
        }, {});
        setDriverEdit(defaultObject);
        const transportOrdersArray = arrayList.map((transport) => ({
          transport_id: transport.id,
          orders: transport.order_shipments,
        }));

        // Set the transportOrders state with the new object
        setTransportOrders(transportOrdersArray);
        toast.success(res.data.data.message, {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => {
        if(err.message !== "revoke"){
        toast.error("Something went wrong. Please try again later", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      });
  };
  const handleRemoveTransport = (transportId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "shipment-edit",
        Projectlanguageid: 1,
      },
    };
    const bodyData = {
      shipment_transport_id: transportId,
      shipment_id: shipment_id,
    };
    if (transportList.length > 1) {
      apis
        .post(`distributor/transport/remove`, bodyData, config)
        .then((res) => {
          setTransportList(res.data.data);

          const arrayList = res.data.data;
          const defaultObject = arrayList.reduce((acc, item) => {
            acc[item.id] = false;
            return acc;
          }, {});
          setDriverEdit(defaultObject);
          const transportOrdersArray = arrayList.map((transport) => ({
            transport_id: transport.id,
            name: transport.name,
            orders: transport.order_shipments,
          }));

          // Set the transportOrders state with the new object
          setTransportOrders(transportOrdersArray);
          toast.success(res.data.data.message, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        })
        .catch((err) => {
          if(err.message !== "revoke"){
          toast.error("Something went wrong. Please try again later", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
        });
    } else {
      toast.error("Atleast one transport must be in Shipment.", {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleDriverName = (transportId, name) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "shipment-edit",
        Projectlanguageid: 1,
      },
    };
    const bodyData = {
      shipment_transport_id: transportId,
      name: name,
    };
    apis
      .post(`distributor/transport/update`, bodyData, config)
      .then((res) => {
        setTransportList(res.data.data);

        const arrayList = res.data.data;
        const defaultObject = arrayList.reduce((acc, item) => {
          acc[item.id] = false;
          return acc;
        }, {});
        setDriverEdit(defaultObject);
        const transportOrdersArray = arrayList.map((transport) => ({
          transport_id: transport.id,
          name: transport.name,
          orders: transport.order_shipments,
        }));

        // Set the transportOrders state with the new object
        setTransportOrders(transportOrdersArray);
        toast.success("Tranport orders has been updated.", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
        setDriverEdit(false);
        setDtriverName("");
      })
      .catch((err) => {
        if(err.message !== "revoke"){
        toast.error("Something went wrong. Please try again later", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      });
  };
  const getTransportDistance = (transportId) => {
    const transportResult = routeResult.find(
      (trans) => trans.transportId === transportId
    );
    return transportResult?.result?.routes[0].legs[0].distance.text;
  };
  const getTransportDistances = () => {
    let distances = 0; // Object to store total distances for each transport

    routeResult.forEach((trans) => {
      const transportId = trans.transportId;
      const distance = trans.result.routes[0].legs[0].distance.text || 0;

      // Convert distance (e.g., "5 km") to a number (5)
      const numericDistance = parseFloat(distance.replace(/[^0-9.]/g, ""));

      distances += numericDistance;
    });

    console.log(distances, "resu");
    return distances;
  };
  const handleUpdatePosition = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "shipment-edit",
        Projectlanguageid: 1,
      },
    };
    const payloadArray = transportOrders.map((transport) => ({
      transport_id: transport.transport_id,
      orders: transport.orders.map((order, index) => ({
        order_id: order.order_id,
        position_id: index + 1, // Adding 1 to the index to use 1-based index
      })),
    }));
    const bodyData = {
      shipment_id: shipment_id,
      shipment_transports: payloadArray,
    };
    console.log(bodyData);

    apis
      .post(
        `distributor/transport/updateShipmentOrderPosition`,
        bodyData,
        config
      )
      .then((res) => {
        setTransportList(res.data.data);

        const arrayList = res.data.data;
        const defaultObject = arrayList.reduce((acc, item) => {
          acc[item.id] = false;
          return acc;
        }, {});
        setDriverEdit(defaultObject);
        const transportOrdersArray = arrayList.map((transport) => ({
          transport_id: transport.id,
          orders: transport.order_shipments,
        }));

        // Set the transportOrders state with the new object
        setTransportOrders(transportOrdersArray);
        toast.success(res.data.data.message, {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => {
        if(err.message !== "revoke"){
        toast.error("Something went wrong. Please try again later", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      });
  };
  const handleSetShipping = (status) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "shipment-edit",
      },
    };
    const bodyData = {
      shipment_id: [shipment_id],
      status,
    };
    if (!shipment_id) {
      console.log("return");
      return;
    }
    apis
      .post(`distributor/shipments/updateStatus`, bodyData, config)
      .then((res) => {
        if (res.data.success === true) {
          setShipment({...shipment,status})
          toast.success("Shipment status has been updated.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error(res.data.data.message, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
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
  const handleViewDetails = (item) => {
    setItems(item);
    setShow(true);
  };

  const handleDownloadDocument = () => {
    const config = {
      headers: {
        Projectlanguageid: 1,
        Authorization: `Bearer ${token}`,
        permission: "shipment-view",
      },
      responseType: "blob", // Add this line to receive the response as a Blob
    };
    const bodyData = {
      documment_type:
        documentType === "Delivery Manifest"
          ? "delivery_ticket"
          : "pickup_ticket",
      shipment_id: shipment_id,
    };

    apis
      .get(
        `/generatePickupAndDeliveryTicket?shipment_id=${shipment_id}&document_type=${
          documentType === "Delivery Manifest"
            ? "delivery_ticket"
            : "pickup_ticket"
        }`,
        config
      )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.pdf"); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        console.log(err);
        if(err.message !== "revoke"){
        toast.error("Something went wrong. Please try again later", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      });
  };

  const moveOrder = (
    orderId,
    sourceTransportId,
    targetTransportId,
    targetPosition
  ) => {
    if (shipment.status === "4" || shipment.status === "3") {
      console.log(
        orderId,
        sourceTransportId,
        targetTransportId,
        targetPosition
      );
      if (sourceTransportId !== targetTransportId) {
        console.log(transportOrders, typeof transportOrders);
        const updatedTransportOrders = [...transportOrders];
        console.log(transportOrders);
        let draggedOrderIndex = -1;
        for (let i = 0; i < transportOrders.length; i++) {
          if (transportOrders[i].transport_id === sourceTransportId) {
            draggedOrderIndex = i;
            break;
          }
        }

        console.log(draggedOrderIndex, sourceTransportId, "index");

        if (draggedOrderIndex !== -1) {
          // Find the dragged order within the source transport
          const draggedTransport = updatedTransportOrders[draggedOrderIndex];

          const draggedOrderIndexInTransport =
            draggedTransport.orders.findIndex((order) => order.id === orderId);

          if (draggedOrderIndexInTransport !== -1) {
            // Remove the dragged order from the source transport's orders
            const draggedOrder = draggedTransport.orders.splice(
              draggedOrderIndexInTransport,
              1
            )[0];

            // Add the dragged order to the target transport's orders at the specified position
            const targetTransportIndex = updatedTransportOrders.findIndex(
              (transport) => transport.transport_id === targetTransportId
            );
            console.log(targetTransportIndex, "target");

            if (targetTransportIndex !== -1) {
              const targetTransport =
                updatedTransportOrders[targetTransportIndex];
              targetTransport.orders.splice(
                targetPosition - 1,
                0,
                draggedOrder
              );
            }
            setTransportOrders(updatedTransportOrders);
          }
        }
        setTransportOrders(updatedTransportOrders);
      } else {
        const updatedTransportOrders = [...transportOrders];
        const sourceTransportIndex = updatedTransportOrders.findIndex(
          (transport) => transport.transport_id === sourceTransportId
        );
        console.log(sourceTransportIndex);

        if (sourceTransportIndex !== -1) {
          const sourceTransport = updatedTransportOrders[sourceTransportIndex];
          console.log(sourceTransport);
          const draggedOrderIndex = sourceTransport.orders.findIndex(
            (order) => order.id === orderId
          );
          console.log(draggedOrderIndex);
          const temp = sourceTransport.orders[targetPosition];
          sourceTransport.orders[targetPosition] =
            sourceTransport.orders[draggedOrderIndex];
          sourceTransport.orders[draggedOrderIndex] = temp;
          updatedTransportOrders[sourceTransportIndex] = sourceTransport;
          console.log(updatedTransportOrders);
          setTransportOrders(updatedTransportOrders);
        }
      }
    }
  };
  console.log(transportOrders, "Document List");
  const onOrderDrop = (
    orderId,
    sourceTransportId,
    targetTransportId,
    targetPosition
  ) => {
    moveOrder(orderId, sourceTransportId, targetTransportId, targetPosition);
  };
  const OrderItem = ({
    transportIndex,
    order,
    index,
    transportId,
    orderId,
    transport,
    onOrderDrop,
  }) => {
    const sourceTransportId = transport.transport_id;
    const [{ isDragging }, drag] = useDrag({
      type: "ORDER",
      item: { index, sourceTransportId, orderId },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [{ isOver }, drop] = useDrop({
      accept: "ORDER",
      drop: (item, monitor) => {
        const draggedItemId = item.orderId;
        const sourceTransportId = item.sourceTransportId;
        const targetTransportId = transport.transport_id;
        const targetPosition = index;

        onOrderDrop(
          draggedItemId,
          sourceTransportId,
          targetTransportId,
          targetPosition
        );
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });
    const opacity = isDragging ? 0.5 : 1;
    const backgroundColor = isOver ? "#e9e9e9" : "transparent";

    return (
      <div ref={drop} style={{ opacity, backgroundColor }}>
        <div ref={drag} className="card mb-2">
          <div className="card-body p-3 droplocation">
            <div className="shippingRouteList">
              <div class="dropList">
                <button
                  className={`btn rounded-circlel`}
                  style={{ background: colors[transportIndex], color: "#fff" }}
                >
                  {index + 1}
                </button>
              </div>
              <label>{order.orders?.retailer_information?.full_name}</label>
              <button
                type="button"
                class="btn btn-sm btn-outline-purple"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="This top tooltip is themed via CSS variables."
              >
                <img src={books} alt="book" /> 0
              </button>

              <button
                type="button"
                class="btn btn-sm btn-outline-purple"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Total Order"
              >
                <img src={shipping} alt="shipping" /> 0
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-purple"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Total Order"
              >
                <img src={bottel} alt="bottel" /> 0
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-purple"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="Total Order"
              >
                <img src={temp} alt="temp" /> 0L
              </button>
            </div>
            <div className="location text-end">
              <button
                type="button"
                onClick={() =>
                  setSelectedUser(order.orders?.retailer_information)
                }
                class="btn btn-outline-black"
              >
                <img src={location} alt="location" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  console.log(driverEdit);
  const Transport = ({ transport, onOrderDrop, transportIndex }) => {
    const [{ isOver }, drop] = useDrop({
      accept: "ORDER",
      drop: (item, monitor) => {
        const draggedItemId = item.orderId;
        const sourceTransportId = item.sourceTransportId;
        const targetTransportId = transport.transport_id;
        console.log(monitor.getDropResult());
        const targetPosition = 0;
        if (sourceTransportId === targetTransportId) {
          return;
        }
        onOrderDrop(
          draggedItemId,
          sourceTransportId,
          targetTransportId,
          targetPosition
        );
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });
    console.log(transport, "tra");

    return (
      <div ref={drop}>
        <div className="shippingBox rounded-3 overflow-hidden mb-3">
          <div className="shippingUnit">
            <div className="p-3">
              <FontAwesomeIcon
                onClick={() => handleRemoveTransport(transport.transport_id)}
                style={{ float: "right", cursor: "pointer" }}
                icon={faTimes}
              />
              <div className="shippingRouteList">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Document</Tooltip>}
                >
                  <Button
                    variant="primary"
                    className="btn-sm btn-outline-purple"
                  >
                    <img src={books} alt="book" /> 0
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip>32</Tooltip>}>
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-purple"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-custom-class="custom-tooltip"
                    data-bs-title="Total Order"
                  >
                    <img src={shipping} alt="shipping" /> 0
                  </button>
                </OverlayTrigger>

                <button
                  type="button"
                  class="btn btn-sm btn-outline-purple"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-custom-class="custom-tooltip"
                  data-bs-title="Total Order"
                >
                  <img src={bottel} alt="bottel" /> 0
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-purple"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-custom-class="custom-tooltip"
                  data-bs-title="Total Order"
                >
                  <img src={can} alt="can" /> 0
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-purple"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-custom-class="custom-tooltip"
                  data-bs-title="Total Order"
                >
                  <img src={temp} alt="temp" /> 0
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-purple"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-custom-class="custom-tooltip"
                  data-bs-title="Total Order"
                >
                  <img src={distance} alt="distance" />{" "}
                  {(routeResult &&
                    routeResult.length > 0 &&
                    getTransportDistance(transport.transport_id)) ||
                    "0 km"}
                </button>
              </div>
              <FontAwesomeIcon
                icon="fa-solid fa-truck"
                style={{ color: colors[transportIndex] }}
              />
              <div className="d-flex align-items-center mt-2">
                {driverEdit[transport.transport_id] && (
                  <input
                    type="text"
                    className="driverName"
                    // value={driverName === "" ? transport.name : driverName}
                    // onChange={(e) => setDtriverName(e.target.value)}
                    ref={(input) =>
                      (inputRefs.current[transport.transport_id] = input)
                    }
                    onBlur={(e) =>
                      handleDriverName(transport.transport_id, e.target.value)
                    }
                  />
                )}
                {!driverEdit[transport.transport_id] && (
                  <p className="mb-0 me-2" style={{ fontWeight: 600 }}>
                    {transport.name}
                  </p>
                )}
                {!driverEdit[transport.transport_id] && (
                  <FontAwesomeIcon
                    onClick={() => {
                      handleEdit(transport.transport_id);
                      setDtriverName(transport.name);
                    }}
                    icon={faPencilAlt}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="productDelaveryLocation px-3">
            <div className="mb-0">
              {transport.orders.map((order, index) => (
                <OrderItem
                  transportIndex={transportIndex}
                  key={order.id}
                  transport={transport}
                  orderId={order.id}
                  order={order}
                  index={index}
                  transportId={transport.id}
                  onOrderDrop={onOrderDrop} // Pass the onOrderDrop function down to OrderItem
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div class="container-fluid page-wrap shipments">
      <div class="row height-inherit">
        <Sidebar userType={"distributor"} />
        <div class="col main p-0">
          <Header
            title={t("distributor.shipments.detail.title")}
            updateSidebar={updateSidebar}
          />
          {loading ? (
            <div className="d-flex justify-content-center">
              <Oval color="purple" secondaryColor="purple" />
            </div>
          ) : (
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
                          {t("distributor.shipments.detail.info")}
                        </button>
                      </li>
                      {hasPermission(SHIPMENT_EDIT) && (
                        <li class="nav-item" role="presentation">
                          <button
                            class="nav-link"
                            id="Routes-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#Routes-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="Routes-tab-pane"
                            aria-selected="false"
                          >
                            {t("distributor.shipments.detail.routes")}
                          </button>
                        </li>
                      )}
                      <li class="nav-item" role="presentation">
                        <button
                          class="nav-link"
                          id="Document-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#Document-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="Document-tab-pane"
                          aria-selected="false"
                        >
                          {t("distributor.shipments.detail.document")}
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div class="tab-content card p-4" id="myTabContent">
                    <div
                      class="tab-pane fade show active"
                      id="stock-tab-pane"
                      role="tabpanel"
                      aria-labelledby="stock-tab"
                      tabindex="0"
                    >
                      <div className="row mb-4">
                        <div className="col-12">
                          <div className="card user-card height-100">
                            <div className="card-body p-4">
                              <ul className="productStatus">
                                <li>
                                  <div className="name">
                                    {t("distributor.shipments.detail.number")}:
                                  </div>
                                  <div className="detail">
                                    {shipment.shipment_number || shipment.id}{" "}
                                  </div>
                                </li>
                                <li>
                                  <div className="name">
                                    {t("distributor.shipments.detail.status")}:
                                  </div>
                                  <div className="detail">
                                    {shipment.statusTitle}
                                  </div>
                                </li>
                                <li>
                                  <div className="name">
                                    {t(
                                      "distributor.shipments.detail.delivery_date"
                                    )}
                                    :
                                  </div>
                                  <div className="detail">
                                    {shipment.delivery_date}
                                  </div>
                                </li>
                                <li>
                                  <div className="name">
                                    {t(
                                      "distributor.shipments.detail.main_route"
                                    )}
                                    :
                                  </div>
                                  <div className="detail">
                                    {shipment.route_detail
                                      ? shipment.route_detail.name
                                      : "N/A"}
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-4">
                        <div className="col-12">
                          <div className="card">
                            <div className="card-body p-4">
                              <div className="row">
                                {orders.map((order) => (
                                  <div className="col-sm-6 col-12 mb-3">
                                    <div className="card">
                                      <div className="card-body p-3">
                                        <h4 className="orderName">
                                          {t(
                                            "distributor.shipments.detail.order"
                                          )}{" "}
                                          (#{order.orders.order_reference})
                                          {order?.status === "Approved" && (
                                            <span className="btn btn-outline-black ms-3 approve">
                                              <label>
                                                {t(
                                                  "distributor.shipments.detail.approved"
                                                )}
                                              </label>{" "}
                                              !
                                              <img
                                                src={approve}
                                                alt="approve-icon"
                                              />{" "}
                                            </span>
                                          )}
                                          {order.status === "Pending" && (
                                            <span className="btn btn-outline-black ms-3 pending">
                                              <label>
                                                {t(
                                                  "distributor.shipments.detail.pending"
                                                )}
                                              </label>{" "}
                                              <img
                                                src={pending}
                                                alt="approve-icon"
                                              />{" "}
                                            </span>
                                          )}
                                          {order.status === "Cancel" && (
                                            <span className="btn btn-outline-black ms-3">
                                              <label>
                                                {t(
                                                  "distributor.shipments.detail.cancel"
                                                )}
                                              </label>{" "}
                                              <img
                                                src={cancel}
                                                alt="cancel-icon"
                                              />{" "}
                                            </span>
                                          )}
                                        </h4>
                                        <ul className="productStatus twoStep">
                                          <li>
                                            <div className="name">
                                              <p>
                                                {t(
                                                  "distributor.shipments.detail.retailer_information"
                                                )}
                                              </p>
                                              {
                                                order.orders
                                                  .retailer_information
                                                  .full_name
                                              }
                                            </div>
                                            <div className="detail">
                                              {
                                                order.orders
                                                  .retailer_information
                                                  .user_main_address.address_1
                                              }
                                            </div>
                                          </li>
                                          <li>
                                            <div className="name">
                                              <p>
                                                {t(
                                                  "distributor.shipments.detail.supplier_information"
                                                )}
                                              </p>
                                              {
                                                order.orders
                                                  .supplier_information
                                                  .full_name
                                              }
                                            </div>
                                            <div className="detail">
                                              {
                                                order.orders
                                                  .supplier_information
                                                  .user_main_address.address_1
                                              }
                                            </div>
                                          </li>
                                          <li>
                                            <div className="name">Date</div>
                                            <div className="detail">
                                              <img
                                                src={calender}
                                                alt="calender"
                                              />
                                              &nbsp; {order.orders.order_date}
                                            </div>
                                          </li>
                                          <li>
                                            <div className="name">
                                              {t(
                                                "distributor.shipments.detail.main_route"
                                              )}
                                              :
                                            </div>
                                            <div className="detail">
                                              <img
                                                src={shipping}
                                                alt="shipping"
                                              />{" "}
                                              {shipment.route_detail
                                                ? shipment.route_detail.name
                                                : "N/A"}
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="card-footer">
                                        <a
                                          onClick={() =>
                                            handleViewDetails(
                                              order.orders.items
                                            )
                                          }
                                          className=" width-auto"
                                          data-bs-toggle="modal"
                                          data-bs-target="#createShipment"
                                        >
                                          {" "}
                                          {t(
                                            "distributor.shipments.detail.view_detail"
                                          )}
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                {orders.length === 0 && (
                                  <p>
                                    {t(
                                      "distributor.shipments.detail.no_product"
                                    )}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="col-12 d-flex justify-content-start mt-4">
                          <button
                            type="submit"
                            class="btn btn-outline-black width-auto me-2"
                            onClick={() => navigate("/distributor/shipments")}
                          >
                            {t("distributor.shipments.detail.back")}
                          </button>
                          {/* <button type="submit" class="btn btn-purple width-auto">Return Management</button> */}
                        </div>
                      </div>
                    </div>

                    <div
                      class="tab-pane fade"
                      id="Routes-tab-pane"
                      role="tabpanel"
                      aria-labelledby="Routes-tab"
                      tabindex="0"
                    >
                      <div className="row mb-4">
                        <div className="col-12">
                          <div className="row">
                            <div className="col-md-5 col-sm-12 col-12 mb-3">
                              <div className="shippingBox rounded-3 overflow-hidden mb-3">
                                <div className="shippingUnit mb-3">
                                  <div className="px-3 py-4">
                                    <div className="shippingRouteList">
                                      <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip>Document</Tooltip>}
                                      >
                                        <Button
                                          variant="primary"
                                          className="btn-sm btn-outline-purple"
                                        >
                                          <img src={books} alt="book" /> 0
                                        </Button>
                                      </OverlayTrigger>
                                      <button
                                        type="button"
                                        class="btn btn-sm btn-outline-purple"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-custom-class="custom-tooltip"
                                        data-bs-title="Total Order"
                                      >
                                        <img src={shipping} alt="shipping" /> 0
                                      </button>
                                      <button
                                        type="button"
                                        class="btn btn-sm btn-outline-purple"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-custom-class="custom-tooltip"
                                        data-bs-title="Total Order"
                                      >
                                        <img src={bottel} alt="bottel" /> 0
                                      </button>
                                      <button
                                        type="button"
                                        class="btn btn-sm btn-outline-purple"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-custom-class="custom-tooltip"
                                        data-bs-title="Total Order"
                                      >
                                        <img src={can} alt="can" /> 0
                                      </button>
                                      <button
                                        type="button"
                                        class="btn btn-sm btn-outline-purple"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-custom-class="custom-tooltip"
                                        data-bs-title="Total Order"
                                      >
                                        <img src={temp} alt="temp" /> 0L
                                      </button>
                                      <button
                                        type="button"
                                        class="btn btn-sm btn-outline-purple"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-custom-class="custom-tooltip"
                                        data-bs-title="Total Order"
                                      >
                                        <img src={distance} alt="distance" />{" "}
                                        {(routeResult &&
                                          routeResult.length > 0 &&
                                          getTransportDistances()) ||
                                          0}
                                        &nbsp; km
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="shippingList overflow-auto px-3 py-2">
                                  {transportOrders.map((transport, i) => (
                                    <Transport
                                      transport={transport}
                                      transportIndex={i}
                                      onOrderDrop={(
                                        orderId,
                                        sourceTransportId,
                                        targetTransportId,
                                        targetPosition
                                      ) =>
                                        onOrderDrop(
                                          orderId,
                                          sourceTransportId,
                                          targetTransportId,
                                          targetPosition
                                        )
                                      }
                                    ></Transport>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="col-md-7 col-sm-12 col-12 mb-3">
                              <div className="card">
                                <div className="card-body p-0">
                                  <Map
                                    routes={transportOrders}
                                    onResult={handleRouteResult}
                                    selected={
                                      selectedUser ? selectedUser : null
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {(shipment.status === "4" ||
                          shipment.status === "3") && (
                          <div className="addShippingBox pt-2">
                            <button
                              type="button"
                              onClick={handleAddTransport}
                              className="btn btn-sm btn-outline-purple"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              data-bs-custom-class="custom-tooltip"
                              data-bs-title="This top tooltip is themed via CSS variables."
                            >
                              <img src={truck} alt="truck" />{" "}
                              {t("distributor.shipments.detail.add_transport")}
                            </button>
                          </div>
                        )}

                        {shipment.status == "4" || shipment.status == "3" ? (
                          <div class="col-12 d-flex justify-content-start mt-4">
                            <button
                              type="submit"
                              class="btn btn-outline-black width-auto me-2"
                            >
                              {t("distributor.shipments.detail.cancel")}
                            </button>
                            <button
                              type="submit"
                              onClick={() => handleUpdatePosition()}
                              class="btn btn-purple width-auto"
                            >
                              {t("distributor.shipments.detail.save")}
                            </button>
                            <div class="ms-3">
                              {shipment.status == "3" ? (
                                <button
                                  type="submit"
                                  onClick={() => handleSetShipping(2)}
                                  class="btn btn-purple width-auto"
                                >
                                  Finalize shipment
                                </button>
                              ) : (
                                <button
                                  type="submit"
                                  onClick={() => handleSetShipping(3)}      
                                  class="btn btn-purple width-auto"
                                >
                                  Preparing
                                </button>
                              )}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div
                      class="tab-pane fade"
                      id="Document-tab-pane"
                      role="tabpanel"
                      aria-labelledby="Document-tab"
                      tabindex="0"
                    >
                      <div class="row">
                        <div class="col">
                          {/* [Card] */}
                          <div className="card user-card height-100">
                            <div className="card-body p-0">
                              <div className="row">
                                <div className="col">
                                  <div className="card-top-filter-box justify-content-end p-3">
                                    {/* [Table Search] */}
                                    <div className="d-flex flex-row flex-wrap gap-2">
                                      <div className="form-group">
                                        <Dropdown className="d-inlinepurple mx-2">
                                          <Dropdown.Toggle
                                            id="dropdown-autoclose-true"
                                            className="btn btn-sm btn-purple"
                                          >
                                            {documentType === ""
                                              ? t(
                                                  "distributor.shipments.detail.choose_manifest"
                                                )
                                              : documentType ===
                                                "Delivery Manifest"
                                              ? t(
                                                  "distributor.shipments.detail.delivery_manifest"
                                                )
                                              : t(
                                                  "distributor.shipments.detail.pickup_manifest"
                                                )}
                                          </Dropdown.Toggle>

                                          <Dropdown.Menu>
                                            <Dropdown.Item
                                              onClick={() =>
                                                setDocumentType(
                                                  "Pickup Manifest"
                                                )
                                              }
                                            >
                                              {t(
                                                "distributor.shipments.detail.pickup_manifest"
                                              )}
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                              onClick={() =>
                                                setDocumentType(
                                                  "Delivery Manifest"
                                                )
                                              }
                                            >
                                              {t(
                                                "distributor.shipments.detail.delivery_manifest"
                                              )}
                                            </Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </div>
                                      {documentType !== "" && (
                                        <div className="download-btn">
                                          <a
                                            // href={`https://dwcapidev.iworklab.com/api/v1/generatePickupAndDeliveryTicket?shipment_id=${shipment_id}&documment_type=${
                                            //   documentType ===
                                            //   "Delivery Manifest"
                                            //     ? "delivery_ticket"
                                            //     : "pickup_ticket"
                                            // }`}
                                            className="btn btn-sm btn-purple"
                                            onClick={() =>
                                              handleDownloadDocument()
                                            }
                                          >
                                            Download PDF &nbsp;
                                            <FontAwesomeIcon icon="fa-solid fa-file-pdf" />
                                          </a>
                                        </div>
                                      )}
                                    </div>
                                    {/* [/Table Search] */}
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col px-4">
                                  {documentList.length > 0 &&
                                    documentList.map((transport) => (
                                      <div className="card mb-3">
                                        <div className="table-responsive">
                                          <ul className="productStatus px-3 py-2">
                                            <li>
                                              <div className="name">
                                                {t(
                                                  "distributor.shipments.detail.transport"
                                                )}{" "}
                                                :
                                              </div>
                                              <div className="detail">
                                                {transport.name}
                                              </div>
                                            </li>
                                          </ul>
                                          <table className="table table-striped m-0">
                                            <thead>
                                              <tr>
                                                <th>
                                                  {t(
                                                    "distributor.shipments.detail.type"
                                                  )}
                                                </th>
                                                <th>
                                                  {t(
                                                    "distributor.shipments.detail.format"
                                                  )}
                                                </th>
                                                <th>
                                                  {t(
                                                    "distributor.shipments.detail.product"
                                                  )}
                                                </th>
                                                <th>
                                                  {t(
                                                    "distributor.shipments.detail.quantity"
                                                  )}
                                                </th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {transport.order_shipments_desc.map(
                                                (order) => {
                                                  return order?.shipment_order_items.map(
                                                    (orderItem) => {
                                                      const productName =
                                                        orderItem?.order_items
                                                          ?.product
                                                          ?.product_format.name;
                                                      const productFormatName =
                                                        orderItem?.order_items
                                                          ?.product
                                                          ?.product_format.name;
                                                      const quantity =
                                                        orderItem?.order_items
                                                          ?.quantity;
                                                      return (
                                                        <tr key={order.id}>
                                                          {" "}
                                                          {/* Add a unique key for each table row */}
                                                          <td>
                                                            {
                                                              productName?.split(
                                                                " "
                                                              )[0]
                                                            }
                                                          </td>
                                                          <td>
                                                            {productFormatName}
                                                          </td>
                                                          <td>
                                                            {
                                                              orderItem
                                                                ?.order_items
                                                                ?.product
                                                                ?.product_name
                                                            }
                                                          </td>
                                                          <td>{quantity}</td>
                                                        </tr>
                                                      );
                                                    }
                                                  );
                                                }
                                              )}
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* [/Card] */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* [Modal] */}
      <div
        class="modal fade"
        id="createShipment"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-hidden="true"
        se
      >
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content p-3">
            <div class="modal-header justify-content-start">
              <div className="productInfo row">
                <div className="productName col-8"> Product </div>
                <div className="productQuantity col-4"> Quantity </div>
              </div>
              <hr />
              <button
                type="button"
                onClick={() => setItems([])}
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <ul className="productList ">
                {items.map((item) => (
                  <li className="row mb-4">
                    <div className="col-8">
                      <div className="row">
                        <div className="col-2">
                          <img
                            src={item?.product?.product_image}
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                        <div className="col-8 info">
                          <h4 className="productName">
                            {item?.product?.product_name}
                          </h4>
                          {/* <p>Amet minim ollit non deserunt </p> */}
                        </div>
                      </div>
                    </div>
                    <div className="productQuantity col-4">
                      {item?.quantity}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* [/Modal] */}
    </div>
  );
};

export default ShipmentsDetail;
