import React, { useState } from "react";
import bottle from "../../assets/images/bottle.png";
import infoVector from "../../assets/images/info-Vector.png";

import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";

import '../../assets/scss/dashboard.scss';

const SupplierTransferDetail = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const updateSidebar = () => {
        setShowSidebar(!showSidebar);
    };
    return (
        <div class="container-fluid page-wrap inventory-manage">
            <div class="row height-inherit">

                <Sidebar showSidebar={showSidebar} updateSidebar={updateSidebar} userType={"supplier"} />

                <div class="col main p-0">
                    <Header title="Inventory Detail form producer-1" updateSidebar={updateSidebar} />
                    <div class="container-fluid page-content-box px-3 px-sm-4">
                        <div class="row">
                            <div class="col">
                                <form>
                                    {/* [Card] */}
                                    <div className="card mb-4">
                                        <div className="card-body">

                                            <div className="row">
                                                <div className="col mb-3">
                                                    <label className="form-label">Sender</label>
                                                    <select className="form-select">
                                                        <option selected>Sender 1</option>
                                                        <option>Sender 2</option>
                                                        <option>Sender 3</option>
                                                    </select>
                                                </div>
                                                <div className="col">
                                                    <label className="form-label">Recepient</label>
                                                    <select className="form-select">
                                                        <option selected>Recepient 1</option>
                                                        <option>Recepient 2</option>
                                                        <option>Recepient 3</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* [/Card] */}

                                    <div class="alert alert-purple d-flex align-items-center" role="alert">
                                        <img className="icon me-2" src={infoVector} /> Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                                    </div>

                                    {/* [Card] */}
                                    <div className="card mb-4">
                                        <div className="card-body p-0">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="table-responsive">
                                                        <table class="table m-0">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">PRODUCT</th>
                                                                    <th scope="col">Recevied</th>
                                                                    <th scope="col">Broken</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <div class="prodInfo d-flex">
                                                                            <div class="prod-img p-2">
                                                                                <img src={bottle} className="img-fluid" />
                                                                            </div>
                                                                            <div class="desc d-flex flex-column align-items-start">
                                                                                <div className="proName">
                                                                                    Milk shake framboises
                                                                                </div>
                                                                                <div className="prodMeta badge text-bg-light rounded-pill">
                                                                                    Can 475ml X 12
                                                                                </div>
                                                                                <div className="prodQTY">
                                                                                    Quantity: 30
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td class="">
                                                                        <div className="qty-box hstack gap-3">
                                                                            <button class="btn btn-purple rounded-circle d-flex align-items-center justify-content-center" type="button">-</button>
                                                                            <input type="text" class="form-control rounded-0" value="4" />
                                                                            <button class="btn btn-purple rounded-circle  d-flex align-items-center justify-content-center" type="button">+</button>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="qty-box hstack gap-3">
                                                                            <button class="btn btn-purple rounded-circle d-flex align-items-center justify-content-center" type="button">-</button>
                                                                            <input type="text" class="form-control rounded-0" value="4" />
                                                                            <button class="btn btn-purple rounded-circle  d-flex align-items-center justify-content-center" type="button">+</button>
                                                                        </div>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td>
                                                                        <div class="prodInfo d-flex">
                                                                            <div class="prod-img p-2">
                                                                                <img src={bottle} className="img-fluid" />
                                                                            </div>
                                                                            <div class="desc d-flex flex-column align-items-start">
                                                                                <div className="proName">
                                                                                    Milk shake framboises
                                                                                </div>
                                                                                <div className="prodMeta badge text-bg-light rounded-pill">
                                                                                    Can 475ml X 12
                                                                                </div>
                                                                                <div className="prodQTY">
                                                                                    Quantity: 30
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td class="">
                                                                        <div className="qty-box hstack gap-3">
                                                                            <button class="btn btn-purple rounded-circle d-flex align-items-center justify-content-center" type="button">-</button>
                                                                            <input type="text" class="form-control rounded-0" value="4" />
                                                                            <button class="btn btn-purple rounded-circle  d-flex align-items-center justify-content-center" type="button">+</button>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="qty-box hstack gap-3">
                                                                            <button class="btn btn-purple rounded-circle d-flex align-items-center justify-content-center" type="button">-</button>
                                                                            <input type="text" class="form-control rounded-0" value="4" />
                                                                            <button class="btn btn-purple rounded-circle  d-flex align-items-center justify-content-center" type="button">+</button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <div class="prodInfo d-flex">
                                                                            <div class="prod-img p-2">
                                                                                <img src={bottle} className="img-fluid" />
                                                                            </div>
                                                                            <div class="desc d-flex flex-column align-items-start">
                                                                                <div className="proName">
                                                                                    Milk shake framboises
                                                                                </div>
                                                                                <div className="prodMeta badge text-bg-light rounded-pill">
                                                                                    Can 475ml X 12
                                                                                </div>
                                                                                <div className="prodQTY">
                                                                                    Quantity: 30
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td class="">
                                                                        <div className="qty-box hstack gap-3">
                                                                            <button class="btn btn-purple rounded-circle d-flex align-items-center justify-content-center" type="button">-</button>
                                                                            <input type="text" class="form-control rounded-0" value="4" />
                                                                            <button class="btn btn-purple rounded-circle  d-flex align-items-center justify-content-center" type="button">+</button>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="qty-box hstack gap-3">
                                                                            <button class="btn btn-purple rounded-circle d-flex align-items-center justify-content-center" type="button">-</button>
                                                                            <input type="text" class="form-control rounded-0" value="4" />
                                                                            <button class="btn btn-purple rounded-circle  d-flex align-items-center justify-content-center" type="button">+</button>
                                                                        </div>
                                                                    </td>
                                                                </tr>

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* [/Card] */}

                                    <div className="mb-3 hstack gap-3">
                                        <button className="btn btn-outline-black">Cancel</button>
                                        <button className="btn btn-outline-black">Save</button>
                                        <button className="btn btn-outline-black">send</button>
                                        <button className="btn btn-purple">Confirm Reception</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default SupplierTransferDetail;