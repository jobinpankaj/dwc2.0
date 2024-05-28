import React from "react";
import "./assets/fonts/stylesheet.css";
import "./assets/scss/main.css";
import route from "./assets/images/route-img.jpg";
import van from "./assets/images/delivery-van.jpg";
const PickupMeainFest = () => {
  return (
    <>
      <div className="bg-white">
        <div class="mainBox">
          <div class="container-fluid p-0">
            <div class="col-xl-12 col-lg-12 col-md-12">
              <div class="contentBx mt-0 bg-white">
                <div className="DebitAgreementDetail mb-2 pickup-menifest">
                  <div className="shipping-heading w-100 mb-md-4 mb-3">
                    <div className="row d-flex justify-content-between">
                      <div className="col-auto">
                        <h5 className="mb-0">Pick up Manifest </h5>
                      </div>
                      <div className="col-auto">
                        <div className="route-link">
                          <strong>
                            <img src={route} alt="route-icon" /> Route :{" "}
                          </strong>
                          Outaouais
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="transportInfo">
                    <div className="transportInfoHeading">
                      <div className="row justify-content-between">
                        <div className="col-4">
                          <div className="shippingInfo">
                            <div className="car-icon">
                              {" "}
                              <img src={van} alt="car-icon" />{" "}
                            </div>
                            <div className="shippingSD">
                              <h4>
                                Transport <span>3451</span>
                              </h4>
                              <h6>
                                Driver : <strong>Louis Coute</strong>
                              </h6>
                            </div>
                          </div>
                        </div>
                        <div className="col-8 d-flex justify-content-end itemList">
                          <div className="row">
                            <div className="col-auto">
                              <div className="transportKey">
                                <span className="btn btn-purple btn-sm rounded rounded-pill">
                                  # Retailer
                                </span>
                                15
                              </div>
                            </div>
                            <div className="col-auto">
                              <div className="transportKey">
                                <span className="btn btn-purple btn-sm rounded rounded-pill">
                                  # Orders
                                </span>
                                50
                              </div>
                            </div>
                            <div className="col-auto">
                              <div className="transportKey">
                                <span className="btn btn-purple btn-sm rounded rounded-pill">
                                  # Pallets
                                </span>
                                70
                              </div>
                            </div>
                            <div className="col-auto">
                              <div className="transportKey">
                                <span className="btn btn-purple btn-sm rounded rounded-pill">
                                  # Boxes
                                </span>
                                85
                              </div>
                            </div>
                            <div className="col-auto">
                              <div className="transportKey border-0">
                                <span className="btn btn-purple btn-sm rounded rounded-pill">
                                  # Kegs
                                </span>
                                85
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="transportInfoTable">
                      <div className=" bg-white border border-1 rounded-1 pt-3">
                        <table class="table table-bordered table-striped m-0 text-dark rounded-4 overflow-hidden w-100">
                          <thead>
                            <tr>
                              <th>S.No.</th>
                              <th>Retailer Name</th>
                              <th>Order No.</th>
                              <th>Product Style </th>
                              <th>Product Type</th>
                              <th>Product Format</th>
                              <th>Batch Number</th>
                              <th>Aisle Name</th>
                              <th>Self Name</th>
                              <th>Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1.</td>
                              <td>John Doe</td>
                              <td>9575345565683</td>
                              <td>Mexican Choclate</td>
                              <td>Product Type 1</td>
                              <td>Format 001</td>
                              <td>AB54637</td>
                              <td>ABC </td>
                              <td>Mack Jennifer</td>
                              <td>50</td>
                            </tr>
                            <tr>
                              <td>1.</td>
                              <td>John Doe</td>
                              <td>9575345565683</td>
                              <td>Mexican Choclate</td>
                              <td>Product Type 1</td>
                              <td>Format 001</td>
                              <td>AB54637</td>
                              <td>ABC </td>
                              <td>Mack Jennifer</td>
                              <td>50</td>
                            </tr>
                            <tr>
                              <td>1.</td>
                              <td>John Doe</td>
                              <td>9575345565683</td>
                              <td>Mexican Choclate</td>
                              <td>Product Type 1</td>
                              <td>Format 001</td>
                              <td>AB54637</td>
                              <td>ABC </td>
                              <td>Mack Jennifer</td>
                              <td>50</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PickupMeainFest;
