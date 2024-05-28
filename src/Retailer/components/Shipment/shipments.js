import React from "react";
import filter from "../../assets/images/filter-icon.png"

import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";

import '../../assets/scss/dashboard.scss';

const Shipments = () => {
    return(
        <div class="container-fluid page-wrap product-manage">
        <div class="row height-inherit">

            <Sidebar />

            <div class="col main p-0">
                <Header  title="Shipments"/>
                <div class="container-fluid page-content-box px-3 px-sm-4">
                    <div class="row">
                        <div class="col">
                            {/* [Card] */}
                            <div className="card user-card height-100">
                                        <div className="card-body p-0">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="card-top-filter-box p-3">
                                                        {/* [Table Search] */}
                                                        <div className="search-table">
                                                            <div className="form-group">
                                                                <input type="text" className="search-input" placeholder="Search Here..."></input>
                                                            </div>
                                                        </div>  
                                                        {/* [/Table Search] */}

                                                        {/* Right Filter */}
                                                        <div class="filter-box">
                                                            <a href="#" className="btn btn-purple" data-bs-toggle="modal" data-bs-target="#createShipment">+ Create Shipments</a>
                                                        <div class="dropdown right-filter">
                                                            <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                                                <img src={filter} alt=""/> Filter
                                                            </button>
                                                            <form class="dropdown-menu p-3 ">
                                                                <div class="mb-3">
                                                                    <label class="form-label">Shipment Status</label>
                                                                    <select className="form-select">
                                                                        <option selected disabled>Choose Status</option>
                                                                    </select>
                                                                </div>
                                                                
                                                                <div className="d-flex justify-content-end">
                                                                    <button type="submit" class="btn btn-purple width-auto me-2">Apply</button>
                                                                    <button type="reset" class="btn btn-outline-black width-auto">Reset</button>
                                                                </div>                                       
                                                            </form>
                                                            </div>
                                                        </div>
                                                        {/* Right Filter */}
                                                    </div>                          
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="table-responsive">
                                                    <table className="table table-striped m-0">
                                                            <thead>
                                                                <tr>
                                                                    <th>Shipment No.</th>
                                                                    <th>Delivery Date</th>
                                                                    <th>Status</th>
                                                                    <th>Main Route</th>
                                                                    <th>Order Count</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>12345</td>
                                                                    <td>31 Dec, 2022</td>
                                                                    <td>Draft</td>
                                                                    <td>Route 1</td>
                                                                    <td>22</td>
                                                                    <td>
                                                                        <div class="btn-group dropstart table-action">
                                                                            <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                <span></span>
                                                                            </button>
                                                                            <ul class="dropdown-menu">
                                                                            <li>
                                                                                    <a href="#" className="dropdown-item">
                                                                                        <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M17.1944 6.6607L17.2136 6.65046L17.1483 6.48452C15.7899 3.03162 12.6041 0.8 9.00005 0.8C5.39652 0.8 2.2113 3.03092 0.852397 6.48289C0.78258 6.65282 0.782532 6.84559 0.852259 7.01555C1.72943 9.25731 3.39878 11.022 5.56904 11.9673C6.67312 12.467 7.82889 12.6988 9.00005 12.6988C10.1202 12.6988 11.2238 12.4847 12.2923 12.0388L12.2933 12.0384C14.4808 11.1113 16.2528 9.29455 17.1478 7.0158C17.194 6.90306 17.2095 6.78025 17.1944 6.6607ZM6.13341 10.6426C4.39015 9.89084 3.0433 8.51321 2.28191 6.74908C3.46292 3.99149 6.08018 2.24535 9.00005 2.24535C11.9192 2.24535 14.5369 4.00788 15.7182 6.74963C14.9556 8.52857 13.5136 9.95668 11.7709 10.6927L11.7675 10.6941C9.94954 11.4568 7.93628 11.4399 6.13511 10.6433L6.13341 10.6426Z" fill="" stroke="" stroke-width="0.4"/>
                                                                                            <path d="M9.00036 3.48359C7.25064 3.48359 5.83772 4.95598 5.83772 6.7499C5.83772 8.54382 7.25061 10.0162 9.00036 10.0162C10.7501 10.0162 12.163 8.54382 12.163 6.7499C12.163 4.95598 10.7501 3.48359 9.00036 3.48359ZM9.00036 8.57093C8.03991 8.57093 7.24766 7.76102 7.24766 6.7499C7.24766 5.73879 8.03991 4.92887 9.00036 4.92887C9.96081 4.92887 10.7531 5.73879 10.7531 6.7499C10.7531 7.76102 9.96081 8.57093 9.00036 8.57093Z" fill="" stroke="" stroke-width="0.4"/>
                                                                                        </svg>
                                                                                        View Map
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#" className="dropdown-item">
                                                                                        <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M9.77666 0.895528C9.65954 0.911037 9.54812 0.966745 9.46537 1.05111L0.532926 9.98323C0.453644 10.0624 0.400294 10.1671 0.382799 10.2778L0.00489416 12.6679C-0.0443624 12.998 0.286659 13.3261 0.616314 13.2737L3.00641 12.9012C3.11708 12.8839 3.22179 12.8304 3.30095 12.7511L12.2277 3.81898C12.4259 3.62133 12.4259 3.26066 12.2277 3.06301L10.2155 1.05082C10.0609 0.893127 9.93397 0.885929 9.77641 0.895236L9.77666 0.895528ZM9.84341 2.18513L11.0996 3.44135L2.66744 11.8732L1.17787 12.1067L1.41137 10.6171L9.84341 2.18513ZM5.51361 12.2124C5.21894 12.2124 4.97997 12.4512 4.97997 12.746C4.97997 13.0407 5.21893 13.2797 5.51361 13.2797H15.4742C15.7689 13.2797 16.0078 13.0407 16.0078 12.746C16.0078 12.4514 15.7689 12.2124 15.4742 12.2124H5.51361Z" fill="" fill-opacity="0.8"/>
                                                                                        </svg>
                                                                                        Edit
                                                                                    </a>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>12345</td>
                                                                    <td>31 Dec, 2022</td>
                                                                    <td>Shipping</td>
                                                                    <td>Route 2</td>
                                                                    <td>22</td>
                                                                    <td>
                                                                        <div class="btn-group dropstart table-action">
                                                                            <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                <span></span>
                                                                            </button>
                                                                            <ul class="dropdown-menu">
                                                                            <li>
                                                                                    <a href="#" className="dropdown-item">
                                                                                        <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M17.1944 6.6607L17.2136 6.65046L17.1483 6.48452C15.7899 3.03162 12.6041 0.8 9.00005 0.8C5.39652 0.8 2.2113 3.03092 0.852397 6.48289C0.78258 6.65282 0.782532 6.84559 0.852259 7.01555C1.72943 9.25731 3.39878 11.022 5.56904 11.9673C6.67312 12.467 7.82889 12.6988 9.00005 12.6988C10.1202 12.6988 11.2238 12.4847 12.2923 12.0388L12.2933 12.0384C14.4808 11.1113 16.2528 9.29455 17.1478 7.0158C17.194 6.90306 17.2095 6.78025 17.1944 6.6607ZM6.13341 10.6426C4.39015 9.89084 3.0433 8.51321 2.28191 6.74908C3.46292 3.99149 6.08018 2.24535 9.00005 2.24535C11.9192 2.24535 14.5369 4.00788 15.7182 6.74963C14.9556 8.52857 13.5136 9.95668 11.7709 10.6927L11.7675 10.6941C9.94954 11.4568 7.93628 11.4399 6.13511 10.6433L6.13341 10.6426Z" fill="" stroke="" stroke-width="0.4"/>
                                                                                            <path d="M9.00036 3.48359C7.25064 3.48359 5.83772 4.95598 5.83772 6.7499C5.83772 8.54382 7.25061 10.0162 9.00036 10.0162C10.7501 10.0162 12.163 8.54382 12.163 6.7499C12.163 4.95598 10.7501 3.48359 9.00036 3.48359ZM9.00036 8.57093C8.03991 8.57093 7.24766 7.76102 7.24766 6.7499C7.24766 5.73879 8.03991 4.92887 9.00036 4.92887C9.96081 4.92887 10.7531 5.73879 10.7531 6.7499C10.7531 7.76102 9.96081 8.57093 9.00036 8.57093Z" fill="" stroke="" stroke-width="0.4"/>
                                                                                        </svg>
                                                                                        View Map
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#" className="dropdown-item">
                                                                                        <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M9.77666 0.895528C9.65954 0.911037 9.54812 0.966745 9.46537 1.05111L0.532926 9.98323C0.453644 10.0624 0.400294 10.1671 0.382799 10.2778L0.00489416 12.6679C-0.0443624 12.998 0.286659 13.3261 0.616314 13.2737L3.00641 12.9012C3.11708 12.8839 3.22179 12.8304 3.30095 12.7511L12.2277 3.81898C12.4259 3.62133 12.4259 3.26066 12.2277 3.06301L10.2155 1.05082C10.0609 0.893127 9.93397 0.885929 9.77641 0.895236L9.77666 0.895528ZM9.84341 2.18513L11.0996 3.44135L2.66744 11.8732L1.17787 12.1067L1.41137 10.6171L9.84341 2.18513ZM5.51361 12.2124C5.21894 12.2124 4.97997 12.4512 4.97997 12.746C4.97997 13.0407 5.21893 13.2797 5.51361 13.2797H15.4742C15.7689 13.2797 16.0078 13.0407 16.0078 12.746C16.0078 12.4514 15.7689 12.2124 15.4742 12.2124H5.51361Z" fill="" fill-opacity="0.8"/>
                                                                                        </svg>
                                                                                        Edit
                                                                                    </a>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>12345</td>
                                                                    <td>31 Dec, 2022</td>
                                                                    <td>Preparation</td>
                                                                    <td>Route 3</td>
                                                                    <td>22</td>
                                                                    <td>
                                                                        <div class="btn-group dropstart table-action">
                                                                            <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                <span></span>
                                                                            </button>
                                                                            <ul class="dropdown-menu">
                                                                                <li>
                                                                                    <a href="#" className="dropdown-item">
                                                                                        <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M17.1944 6.6607L17.2136 6.65046L17.1483 6.48452C15.7899 3.03162 12.6041 0.8 9.00005 0.8C5.39652 0.8 2.2113 3.03092 0.852397 6.48289C0.78258 6.65282 0.782532 6.84559 0.852259 7.01555C1.72943 9.25731 3.39878 11.022 5.56904 11.9673C6.67312 12.467 7.82889 12.6988 9.00005 12.6988C10.1202 12.6988 11.2238 12.4847 12.2923 12.0388L12.2933 12.0384C14.4808 11.1113 16.2528 9.29455 17.1478 7.0158C17.194 6.90306 17.2095 6.78025 17.1944 6.6607ZM6.13341 10.6426C4.39015 9.89084 3.0433 8.51321 2.28191 6.74908C3.46292 3.99149 6.08018 2.24535 9.00005 2.24535C11.9192 2.24535 14.5369 4.00788 15.7182 6.74963C14.9556 8.52857 13.5136 9.95668 11.7709 10.6927L11.7675 10.6941C9.94954 11.4568 7.93628 11.4399 6.13511 10.6433L6.13341 10.6426Z" fill="" stroke="" stroke-width="0.4"/>
                                                                                            <path d="M9.00036 3.48359C7.25064 3.48359 5.83772 4.95598 5.83772 6.7499C5.83772 8.54382 7.25061 10.0162 9.00036 10.0162C10.7501 10.0162 12.163 8.54382 12.163 6.7499C12.163 4.95598 10.7501 3.48359 9.00036 3.48359ZM9.00036 8.57093C8.03991 8.57093 7.24766 7.76102 7.24766 6.7499C7.24766 5.73879 8.03991 4.92887 9.00036 4.92887C9.96081 4.92887 10.7531 5.73879 10.7531 6.7499C10.7531 7.76102 9.96081 8.57093 9.00036 8.57093Z" fill="" stroke="" stroke-width="0.4"/>
                                                                                        </svg>
                                                                                        View Map
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#" className="dropdown-item">
                                                                                        <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M9.77666 0.895528C9.65954 0.911037 9.54812 0.966745 9.46537 1.05111L0.532926 9.98323C0.453644 10.0624 0.400294 10.1671 0.382799 10.2778L0.00489416 12.6679C-0.0443624 12.998 0.286659 13.3261 0.616314 13.2737L3.00641 12.9012C3.11708 12.8839 3.22179 12.8304 3.30095 12.7511L12.2277 3.81898C12.4259 3.62133 12.4259 3.26066 12.2277 3.06301L10.2155 1.05082C10.0609 0.893127 9.93397 0.885929 9.77641 0.895236L9.77666 0.895528ZM9.84341 2.18513L11.0996 3.44135L2.66744 11.8732L1.17787 12.1067L1.41137 10.6171L9.84341 2.18513ZM5.51361 12.2124C5.21894 12.2124 4.97997 12.4512 4.97997 12.746C4.97997 13.0407 5.21893 13.2797 5.51361 13.2797H15.4742C15.7689 13.2797 16.0078 13.0407 16.0078 12.746C16.0078 12.4514 15.7689 12.2124 15.4742 12.2124H5.51361Z" fill="" fill-opacity="0.8"/>
                                                                                        </svg>
                                                                                        Edit
                                                                                    </a>
                                                                                </li>
                                                                            </ul>
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
                        </div>
                    </div>
                </div>

            </div>

        </div>
        {/* [Modal] */}
        <div class="modal fade" id="createShipment" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true" se>
                <div class="modal-dialog modal-dialog-centered modal-sm">
                <div class="modal-content p-3">
                    <div class="modal-header justify-content-start">
                    <h6 class="modal-title">
                        New shipment
                    </h6>
                    <hr/>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Create Shipment</p>
                        <div className="border-purple p-3">
                            <div class="mb-0">
                                <label class="form-label">
                                Select Route
                                </label>
                            </div>
                            <div className="input-group">
                                <select className="form-select rounded-pill">
                                    <option>Route 1</option>
                                    <option>Route 2</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer border-0 justify-content-center">
                        <button type="submit" class="btn btn-outline-black me-2">Cancel</button>
                        <button type="submit" class="btn btn-purple">Create</button>
                    </div>
                </div>
                </div>
            </div>
            {/* [/Modal] */}
    </div>
    )
}

export default Shipments;