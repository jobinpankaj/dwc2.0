import React from "react";
import "./assets/fonts/stylesheet.css";
import "./assets/scss/main.css";
import user from "./assets/images/user-icon.jpg";
import phone from "./assets/images/phone.jpg";
import route from "./assets/images/route-img.jpg";
import van from "./assets/images/delivery-van.jpg";
const DeliveryMeainFest = () => {
  return (
    <>
      <div className="bg-white">
        <div class="mainBox">
          <div class="container-fluid p-0">
            <div class="col-xl-12 col-lg-12 col-md-12">
              <div class="contentBx mt-0 bg-white">
                <div className="DebitAgreementDetail mb-2 delivery-menifest">
                  <div className="shipping-heading w-100 mb-md-4 mb-3">
                    <div className="row d-flex justify-content-between">
                      <div className="col-auto">
                        <h5 className="mb-0">Delivery Manifest </h5>
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
                      <div className="delivery-list">
                        <div className="card">
                          <div className="info-detail">
                            <h6 className="name">John Doe</h6>
                            <address>
                              1428 routed duCarrefour, Val de Monts J75648AC
                            </address>
                            <ul className="contact-info list-unstyled rounded-2 p-2 d-flex justify-content-between">
                              <li>
                                <span className="icon">
                                  <img src={user} alt="" />
                                </span>
                                Contact Name : <strong>Mack Genifer</strong>
                              </li>
                              <li>
                                <span className="icon">
                                  <img src={phone} alt="" />
                                </span>
                                Phone Number :
                                <strong>
                                  <a href="tel:+61 4567389567">
                                    +61 4567389567
                                  </a>
                                </strong>
                              </li>
                            </ul>
                          </div>
                          <div className="discreption">
                            <div className="border border-1 rounded-1 bg-white h-100 p-2"></div>
                          </div>
                          <div className="items-details">
                            <ul className="list-unstyled d-flex gap-3">
                              <li className="d-flex flex-column justify-content-center align-items-center">
                                <span className="btn btn-sm btn-light-purple ">
                                  Bottles
                                </span>
                                5
                              </li>
                              <li className="d-flex flex-column justify-content-center align-items-center">
                                <span className="btn btn-sm btn-light-purple">
                                  Cane
                                </span>
                                5
                              </li>
                            </ul>
                            <div className="total-items py-3 px-4 rounded-2 gap-2">
                              <strong className="d-flex">Total</strong> 7
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="info-detail">
                            <h6 className="name">John Doe</h6>
                            <address>
                              1428 routed duCarrefour, Val de Monts J75648AC
                            </address>
                            <ul className="contact-info list-unstyled rounded-2 p-2 d-flex justify-content-between">
                              <li>
                                <span className="icon">
                                  <img src={user} alt="" />
                                </span>
                                Contact Name : <strong>Mack Genifer</strong>
                              </li>
                              <li>
                                <span className="icon">
                                  <img src={phone} alt="" />
                                </span>
                                Phone Number :
                                <strong>
                                  <a href="tel:+61 4567389567">
                                    +61 4567389567
                                  </a>
                                </strong>
                              </li>
                            </ul>
                          </div>
                          <div className="discreption">
                            <div className="border border-1 rounded-1 bg-white h-100 p-2"></div>
                          </div>
                          <div className="items-details">
                            <ul className="list-unstyled d-flex gap-3">
                              <li className="d-flex flex-column justify-content-center align-items-center">
                                <span className="btn btn-sm btn-light-purple ">
                                  Bottles
                                </span>
                                5
                              </li>
                              <li className="d-flex flex-column justify-content-center align-items-center">
                                <span className="btn btn-sm btn-light-purple">
                                  Cane
                                </span>
                                5
                              </li>
                            </ul>
                            <div className="total-items py-3 px-4 rounded-2 gap-2">
                              <strong className="d-flex">Total</strong> 7
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="info-detail">
                            <h6 className="name">John Doe</h6>
                            <address>
                              1428 routed duCarrefour, Val de Monts J75648AC
                            </address>
                            <ul className="contact-info list-unstyled rounded-2 p-2 d-flex justify-content-between">
                              <li>
                                <span className="icon">
                                  <img src={user} alt="" />
                                </span>
                                Contact Name : <strong>Mack Genifer</strong>
                              </li>
                              <li>
                                <span className="icon">
                                  <img src={phone} alt="" />
                                </span>
                                Phone Number :
                                <strong>
                                  <a href="tel:+61 4567389567">
                                    +61 4567389567
                                  </a>
                                </strong>
                              </li>
                            </ul>
                          </div>
                          <div className="discreption">
                            <div className="border border-1 rounded-1 bg-white h-100 p-2"></div>
                          </div>
                          <div className="items-details">
                            <ul className="list-unstyled d-flex gap-3">
                              <li className="d-flex flex-column justify-content-center align-items-center">
                                <span className="btn btn-sm btn-light-purple ">
                                  Bottles
                                </span>
                                5
                              </li>
                              <li className="d-flex flex-column justify-content-center align-items-center">
                                <span className="btn btn-sm btn-light-purple">
                                  Cane
                                </span>
                                5
                              </li>
                            </ul>
                            <div className="total-items py-3 px-4 rounded-2 gap-2">
                              <strong className="d-flex">Total</strong> 7
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="info-detail">
                            <h6 className="name">John Doe</h6>
                            <address>
                              1428 routed duCarrefour, Val de Monts J75648AC
                            </address>
                            <ul className="contact-info list-unstyled rounded-2 p-2 d-flex justify-content-between">
                              <li>
                                <span className="icon">
                                  <img src={user} alt="" />
                                </span>
                                Contact Name : <strong>Mack Genifer</strong>
                              </li>
                              <li>
                                <span className="icon">
                                  <img src={phone} alt="" />
                                </span>
                                Phone Number :
                                <strong>
                                  <a href="tel:+61 4567389567">
                                    +61 4567389567
                                  </a>
                                </strong>
                              </li>
                            </ul>
                          </div>
                          <div className="discreption">
                            <div className="border border-1 rounded-1 bg-white h-100 p-2"></div>
                          </div>
                          <div className="items-details">
                            <ul className="list-unstyled d-flex gap-3">
                              <li className="d-flex flex-column justify-content-center align-items-center">
                                <span className="btn btn-sm btn-light-purple ">
                                  Bottles
                                </span>
                                5
                              </li>
                              <li className="d-flex flex-column justify-content-center align-items-center">
                                <span className="btn btn-sm btn-light-purple">
                                  Cane
                                </span>
                                5
                              </li>
                            </ul>
                            <div className="total-items py-3 px-4 rounded-2 gap-2">
                              <strong className="d-flex">Total</strong> 7
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
    </>
  );
};
export default DeliveryMeainFest;
