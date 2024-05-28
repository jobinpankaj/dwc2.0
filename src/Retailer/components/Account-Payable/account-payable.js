import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import calendar from "../../assets/images/calender.png"
import totalUsers from "../../assets/images/total-users.png"
import graph from "../../assets/images/graph.png"
import filter from "../../assets/images/filter-icon.png";
import wallet from "../../assets/images/wallet.svg"
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
// import '../../assets/css/dashboard.css'
import '../../assets/scss/dashboard.scss';
import { useTranslation } from "react-i18next";
const AccountPayable = () => {
    const { t, i18n } = useTranslation();
    const [showSidebar, setShowSidebar] = useState(false);
    // const accessToken = localStorage.getItem("admin_accessToken")
    // const navigate = useNavigate()

    const updateSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    useEffect(() => {
    //     if (!accessToken) {
    //         navigate("/", {
    //             state: {
    //                 url: "/dashboard"
    //             }
    //         })
    //     }
    //     else {
    //         console.log("Call dashboard data API")
    //     }
    }, [])
    return (
        <div class="container-fluid page-wrap dashboard acountPaybale">
            <div class="row height-inherit">

                <Sidebar userType={"retailer"} />

                <div class="col main p-0">
                    <Header title="Account Payable" updateSidebar={updateSidebar} />
                    <div class="container-fluid page-content-box px-3 px-sm-4">
                        <div class="row">
                            <div class="col">
                                <div class="tab-link-row position-relative">

                                    <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link active" id="Account-Payable-tab" data-bs-toggle="tab" data-bs-target="#account-Payable-tab-pane" type="button" role="tab" aria-controls="Account-Payable-tab-pane" aria-selected="true">{t("retailer.account_payable.account_payable")}</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="Payment-tab" data-bs-toggle="tab" data-bs-target="#payment-tab-pane" type="button" role="tab" aria-controls="Payment-tab-pane" aria-selected="false">{t("retailer.account_payable.payment")}</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="order-tab" data-bs-toggle="tab" data-bs-target="#make-Payment-tab-pane" type="button" role="tab" aria-controls="Make-Payment-tab-pane" aria-selected="false">{t("retailer.account_payable.make_payment")}</button>
                                        </li>
                                    </ul>

                                    <div class="filter-box position-abs spaceBottom">
                                        <div className="accountHistory">
                                            <div className="accountInfo balanceInfo rounded-pill me-3">
                                                <img src={wallet} /> Balance $ 127.6
                                            </div>
                                            <div className="accountInfo balanceDue rounded-pill">
                                                Due $ 127.6
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="tab-content" id="myTabContent">

                                    <div class="tab-pane fade show active" id="account-Payable-tab-pane" role="tabpanel" aria-labelledby="value-tab" tabindex="0">
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
                                                                        placeholder={t("retailer.account_payable.search_here")}
                                                                    ></input>
                                                                </div>
                                                            </div>
                                                            {/* [/Table Search] */}

                                                            {/* [Right Filter] */}
                                                            <div className="filter-row text-end">
                                                                {/* [Page Filter Box] */}
                                                                <div className="filter-box">
                                                                    {/* [Cart Icon] */}
                                                                    {/* [Filter] */}
                                                                    <div class="dropdown right-filter">
                                                                        <button
                                                                            type="button"
                                                                            class="btn dropdown-toggle"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-expanded="false"
                                                                            data-bs-auto-close="outside"
                                                                        >
                                                                            <img src={filter} /> {t("retailer.account_payable.filter")}
                                                                        </button>
                                                                        <form class="dropdown-menu p-3 ">

                                                                            <div class="mb-3">
                                                                                <label class="form-label">{t("retailer.account_payable.supplier")}</label>
                                                                                <select className="form-select">
                                                                                    <option selected disabled>
                                                                                    {t("retailer.account_payable.choose_supplier")}
                                                                                    </option>
                                                                                    <option value="">Supplier 1</option>
                                                                                    <option value="">Supplier 2</option>
                                                                                    <option value="">Supplier 3</option>
                                                                                </select>
                                                                            </div>
                                                                            <div className="d-flex justify-content-end">
                                                                                <button
                                                                                    type="submit"
                                                                                    class="btn btn-purple width-auto me-2"
                                                                                >
                                                                                    {t("retailer.account_payable.apply")}
                                                                                </button>
                                                                                <input
                                                                                    type="reset"
                                                                                    class="btn btn-outline-black width-auto"
                                                                                    value="Clear"
                                                                                />
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                    {/* [/Filter] */}
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
                                                                        <th>{t("retailer.account_payable.supplier")}</th>
                                                                        <th>DATE</th>
                                                                        <th>{t("retailer.account_payable.status")}</th>
                                                                        <th>BALANCE</th>
                                                                        <th>{t("retailer.account_payable.overdue")}</th>
                                                                        <th></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>Emily Barber</td>
                                                                        <td><span className="updateDate">31 Dec, 2022  |  2:04 AM </span><span className="dayAgo"> 5 Days Ago</span></td>
                                                                        <td><span class="badge text-bg-green">{t("retailer.account_payable.active")}</span></td>
                                                                        <td>$127.6</td>
                                                                        <td>$127.6</td>
                                                                        <td>
                                                                            <div class="btn-group dropstart table-action">
                                                                                <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                    <span></span>
                                                                                </button>
                                                                                <ul class="dropdown-menu">
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M17.1944 6.6607L17.2136 6.65046L17.1483 6.48452C15.7899 3.03162 12.6041 0.8 9.00005 0.8C5.39652 0.8 2.2113 3.03092 0.852397 6.48289C0.78258 6.65282 0.782532 6.84559 0.852259 7.01555C1.72943 9.25731 3.39878 11.022 5.56904 11.9673C6.67312 12.467 7.82889 12.6988 9.00005 12.6988C10.1202 12.6988 11.2238 12.4847 12.2923 12.0388L12.2933 12.0384C14.4808 11.1113 16.2528 9.29455 17.1478 7.0158C17.194 6.90306 17.2095 6.78025 17.1944 6.6607ZM6.13341 10.6426C4.39015 9.89084 3.0433 8.51321 2.28191 6.74908C3.46292 3.99149 6.08018 2.24535 9.00005 2.24535C11.9192 2.24535 14.5369 4.00788 15.7182 6.74963C14.9556 8.52857 13.5136 9.95668 11.7709 10.6927L11.7675 10.6941C9.94954 11.4568 7.93628 11.4399 6.13511 10.6433L6.13341 10.6426Z" fill="" stroke="" stroke-width="0.4" />
                                                                                                <path d="M9.00036 3.48359C7.25064 3.48359 5.83772 4.95598 5.83772 6.7499C5.83772 8.54382 7.25061 10.0162 9.00036 10.0162C10.7501 10.0162 12.163 8.54382 12.163 6.7499C12.163 4.95598 10.7501 3.48359 9.00036 3.48359ZM9.00036 8.57093C8.03991 8.57093 7.24766 7.76102 7.24766 6.7499C7.24766 5.73879 8.03991 4.92887 9.00036 4.92887C9.96081 4.92887 10.7531 5.73879 10.7531 6.7499C10.7531 7.76102 9.96081 8.57093 9.00036 8.57093Z" fill="" stroke="" stroke-width="0.4" />
                                                                                            </svg>
                                                                                            {t("retailer.account_payable.view_map")}
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M9.77666 0.895528C9.65954 0.911037 9.54812 0.966745 9.46537 1.05111L0.532926 9.98323C0.453644 10.0624 0.400294 10.1671 0.382799 10.2778L0.00489416 12.6679C-0.0443624 12.998 0.286659 13.3261 0.616314 13.2737L3.00641 12.9012C3.11708 12.8839 3.22179 12.8304 3.30095 12.7511L12.2277 3.81898C12.4259 3.62133 12.4259 3.26066 12.2277 3.06301L10.2155 1.05082C10.0609 0.893127 9.93397 0.885929 9.77641 0.895236L9.77666 0.895528ZM9.84341 2.18513L11.0996 3.44135L2.66744 11.8732L1.17787 12.1067L1.41137 10.6171L9.84341 2.18513ZM5.51361 12.2124C5.21894 12.2124 4.97997 12.4512 4.97997 12.746C4.97997 13.0407 5.21893 13.2797 5.51361 13.2797H15.4742C15.7689 13.2797 16.0078 13.0407 16.0078 12.746C16.0078 12.4514 15.7689 12.2124 15.4742 12.2124H5.51361Z" fill="" fill-opacity="0.8" />
                                                                                            </svg>
                                                                                            {t("retailer.account_payable.edit")}
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Devon Lane</td>
                                                                        <td><span className="updateDate">31 Dec, 2022  |  2:04 AM </span><span className="dayAgo"> 5 Days Ago</span></td>
                                                                        <td><span class="badge text-bg-green">{t("retailer.account_payable.active")}</span></td>
                                                                        <td>$127.6</td>
                                                                        <td>$127.6</td>
                                                                        <td>
                                                                            <div class="btn-group dropstart table-action">
                                                                                <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                    <span></span>
                                                                                </button>
                                                                                <ul class="dropdown-menu">
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M17.1944 6.6607L17.2136 6.65046L17.1483 6.48452C15.7899 3.03162 12.6041 0.8 9.00005 0.8C5.39652 0.8 2.2113 3.03092 0.852397 6.48289C0.78258 6.65282 0.782532 6.84559 0.852259 7.01555C1.72943 9.25731 3.39878 11.022 5.56904 11.9673C6.67312 12.467 7.82889 12.6988 9.00005 12.6988C10.1202 12.6988 11.2238 12.4847 12.2923 12.0388L12.2933 12.0384C14.4808 11.1113 16.2528 9.29455 17.1478 7.0158C17.194 6.90306 17.2095 6.78025 17.1944 6.6607ZM6.13341 10.6426C4.39015 9.89084 3.0433 8.51321 2.28191 6.74908C3.46292 3.99149 6.08018 2.24535 9.00005 2.24535C11.9192 2.24535 14.5369 4.00788 15.7182 6.74963C14.9556 8.52857 13.5136 9.95668 11.7709 10.6927L11.7675 10.6941C9.94954 11.4568 7.93628 11.4399 6.13511 10.6433L6.13341 10.6426Z" fill="" stroke="" stroke-width="0.4" />
                                                                                                <path d="M9.00036 3.48359C7.25064 3.48359 5.83772 4.95598 5.83772 6.7499C5.83772 8.54382 7.25061 10.0162 9.00036 10.0162C10.7501 10.0162 12.163 8.54382 12.163 6.7499C12.163 4.95598 10.7501 3.48359 9.00036 3.48359ZM9.00036 8.57093C8.03991 8.57093 7.24766 7.76102 7.24766 6.7499C7.24766 5.73879 8.03991 4.92887 9.00036 4.92887C9.96081 4.92887 10.7531 5.73879 10.7531 6.7499C10.7531 7.76102 9.96081 8.57093 9.00036 8.57093Z" fill="" stroke="" stroke-width="0.4" />
                                                                                            </svg>
                                                                                            {t("retailer.account_payable.view_map")}
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M9.77666 0.895528C9.65954 0.911037 9.54812 0.966745 9.46537 1.05111L0.532926 9.98323C0.453644 10.0624 0.400294 10.1671 0.382799 10.2778L0.00489416 12.6679C-0.0443624 12.998 0.286659 13.3261 0.616314 13.2737L3.00641 12.9012C3.11708 12.8839 3.22179 12.8304 3.30095 12.7511L12.2277 3.81898C12.4259 3.62133 12.4259 3.26066 12.2277 3.06301L10.2155 1.05082C10.0609 0.893127 9.93397 0.885929 9.77641 0.895236L9.77666 0.895528ZM9.84341 2.18513L11.0996 3.44135L2.66744 11.8732L1.17787 12.1067L1.41137 10.6171L9.84341 2.18513ZM5.51361 12.2124C5.21894 12.2124 4.97997 12.4512 4.97997 12.746C4.97997 13.0407 5.21893 13.2797 5.51361 13.2797H15.4742C15.7689 13.2797 16.0078 13.0407 16.0078 12.746C16.0078 12.4514 15.7689 12.2124 15.4742 12.2124H5.51361Z" fill="" fill-opacity="0.8" />
                                                                                            </svg>
                                                                                            {t("retailer.account_payable.edit")}
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Dianne Russell</td>
                                                                        <td><span className="updateDate">31 Dec, 2022  |  2:04 AM </span><span className="dayAgo"> 5 Days Ago</span></td>
                                                                        <td><span class="badge text-bg-green">{t("retailer.account_payable.active")}</span></td>
                                                                        <td>$127.6</td>
                                                                        <td>$127.6</td>
                                                                        <td>
                                                                            <div class="btn-group dropstart table-action">
                                                                                <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                    <span></span>
                                                                                </button>
                                                                                <ul class="dropdown-menu">
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M17.1944 6.6607L17.2136 6.65046L17.1483 6.48452C15.7899 3.03162 12.6041 0.8 9.00005 0.8C5.39652 0.8 2.2113 3.03092 0.852397 6.48289C0.78258 6.65282 0.782532 6.84559 0.852259 7.01555C1.72943 9.25731 3.39878 11.022 5.56904 11.9673C6.67312 12.467 7.82889 12.6988 9.00005 12.6988C10.1202 12.6988 11.2238 12.4847 12.2923 12.0388L12.2933 12.0384C14.4808 11.1113 16.2528 9.29455 17.1478 7.0158C17.194 6.90306 17.2095 6.78025 17.1944 6.6607ZM6.13341 10.6426C4.39015 9.89084 3.0433 8.51321 2.28191 6.74908C3.46292 3.99149 6.08018 2.24535 9.00005 2.24535C11.9192 2.24535 14.5369 4.00788 15.7182 6.74963C14.9556 8.52857 13.5136 9.95668 11.7709 10.6927L11.7675 10.6941C9.94954 11.4568 7.93628 11.4399 6.13511 10.6433L6.13341 10.6426Z" fill="" stroke="" stroke-width="0.4" />
                                                                                                <path d="M9.00036 3.48359C7.25064 3.48359 5.83772 4.95598 5.83772 6.7499C5.83772 8.54382 7.25061 10.0162 9.00036 10.0162C10.7501 10.0162 12.163 8.54382 12.163 6.7499C12.163 4.95598 10.7501 3.48359 9.00036 3.48359ZM9.00036 8.57093C8.03991 8.57093 7.24766 7.76102 7.24766 6.7499C7.24766 5.73879 8.03991 4.92887 9.00036 4.92887C9.96081 4.92887 10.7531 5.73879 10.7531 6.7499C10.7531 7.76102 9.96081 8.57093 9.00036 8.57093Z" fill="" stroke="" stroke-width="0.4" />
                                                                                            </svg>
                                                                                            {t("retailer.account_payable.view_map")}
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M9.77666 0.895528C9.65954 0.911037 9.54812 0.966745 9.46537 1.05111L0.532926 9.98323C0.453644 10.0624 0.400294 10.1671 0.382799 10.2778L0.00489416 12.6679C-0.0443624 12.998 0.286659 13.3261 0.616314 13.2737L3.00641 12.9012C3.11708 12.8839 3.22179 12.8304 3.30095 12.7511L12.2277 3.81898C12.4259 3.62133 12.4259 3.26066 12.2277 3.06301L10.2155 1.05082C10.0609 0.893127 9.93397 0.885929 9.77641 0.895236L9.77666 0.895528ZM9.84341 2.18513L11.0996 3.44135L2.66744 11.8732L1.17787 12.1067L1.41137 10.6171L9.84341 2.18513ZM5.51361 12.2124C5.21894 12.2124 4.97997 12.4512 4.97997 12.746C4.97997 13.0407 5.21893 13.2797 5.51361 13.2797H15.4742C15.7689 13.2797 16.0078 13.0407 16.0078 12.746C16.0078 12.4514 15.7689 12.2124 15.4742 12.2124H5.51361Z" fill="" fill-opacity="0.8" />
                                                                                            </svg>
                                                                                            {t("retailer.account_payable.edit")}
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Bessie Cooper</td>
                                                                        <td><span className="updateDate">31 Dec, 2022  |  2:04 AM </span><span className="dayAgo"> 5 Days Ago</span></td>
                                                                        <td><span class="badge text-bg-green">{t("retailer.account_payable.active")}</span></td>
                                                                        <td>$127.6</td>
                                                                        <td>$127.6</td>
                                                                        <td>
                                                                            <div class="btn-group dropstart table-action">
                                                                                <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                    <span></span>
                                                                                </button>
                                                                                <ul class="dropdown-menu">
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M17.1944 6.6607L17.2136 6.65046L17.1483 6.48452C15.7899 3.03162 12.6041 0.8 9.00005 0.8C5.39652 0.8 2.2113 3.03092 0.852397 6.48289C0.78258 6.65282 0.782532 6.84559 0.852259 7.01555C1.72943 9.25731 3.39878 11.022 5.56904 11.9673C6.67312 12.467 7.82889 12.6988 9.00005 12.6988C10.1202 12.6988 11.2238 12.4847 12.2923 12.0388L12.2933 12.0384C14.4808 11.1113 16.2528 9.29455 17.1478 7.0158C17.194 6.90306 17.2095 6.78025 17.1944 6.6607ZM6.13341 10.6426C4.39015 9.89084 3.0433 8.51321 2.28191 6.74908C3.46292 3.99149 6.08018 2.24535 9.00005 2.24535C11.9192 2.24535 14.5369 4.00788 15.7182 6.74963C14.9556 8.52857 13.5136 9.95668 11.7709 10.6927L11.7675 10.6941C9.94954 11.4568 7.93628 11.4399 6.13511 10.6433L6.13341 10.6426Z" fill="" stroke="" stroke-width="0.4" />
                                                                                                <path d="M9.00036 3.48359C7.25064 3.48359 5.83772 4.95598 5.83772 6.7499C5.83772 8.54382 7.25061 10.0162 9.00036 10.0162C10.7501 10.0162 12.163 8.54382 12.163 6.7499C12.163 4.95598 10.7501 3.48359 9.00036 3.48359ZM9.00036 8.57093C8.03991 8.57093 7.24766 7.76102 7.24766 6.7499C7.24766 5.73879 8.03991 4.92887 9.00036 4.92887C9.96081 4.92887 10.7531 5.73879 10.7531 6.7499C10.7531 7.76102 9.96081 8.57093 9.00036 8.57093Z" fill="" stroke="" stroke-width="0.4" />
                                                                                            </svg>
                                                                                            {t("retailer.account_payable.view_map")}
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M9.77666 0.895528C9.65954 0.911037 9.54812 0.966745 9.46537 1.05111L0.532926 9.98323C0.453644 10.0624 0.400294 10.1671 0.382799 10.2778L0.00489416 12.6679C-0.0443624 12.998 0.286659 13.3261 0.616314 13.2737L3.00641 12.9012C3.11708 12.8839 3.22179 12.8304 3.30095 12.7511L12.2277 3.81898C12.4259 3.62133 12.4259 3.26066 12.2277 3.06301L10.2155 1.05082C10.0609 0.893127 9.93397 0.885929 9.77641 0.895236L9.77666 0.895528ZM9.84341 2.18513L11.0996 3.44135L2.66744 11.8732L1.17787 12.1067L1.41137 10.6171L9.84341 2.18513ZM5.51361 12.2124C5.21894 12.2124 4.97997 12.4512 4.97997 12.746C4.97997 13.0407 5.21893 13.2797 5.51361 13.2797H15.4742C15.7689 13.2797 16.0078 13.0407 16.0078 12.746C16.0078 12.4514 15.7689 12.2124 15.4742 12.2124H5.51361Z" fill="" fill-opacity="0.8" />
                                                                                            </svg>
                                                                                            {t("retailer.account_payable.edit")}
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Savannah</td>
                                                                        <td><span className="updateDate">31 Dec, 2022  |  2:04 AM </span><span className="dayAgo"> 5 Days Ago</span></td>
                                                                        <td><span class="badge text-bg-green">ACTIVE</span></td>
                                                                        <td>$127.6</td>
                                                                        <td>$127.6</td>
                                                                        <td>
                                                                            <div class="btn-group dropstart table-action">
                                                                                <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                    <span></span>
                                                                                </button>
                                                                                <ul class="dropdown-menu">
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M17.1944 6.6607L17.2136 6.65046L17.1483 6.48452C15.7899 3.03162 12.6041 0.8 9.00005 0.8C5.39652 0.8 2.2113 3.03092 0.852397 6.48289C0.78258 6.65282 0.782532 6.84559 0.852259 7.01555C1.72943 9.25731 3.39878 11.022 5.56904 11.9673C6.67312 12.467 7.82889 12.6988 9.00005 12.6988C10.1202 12.6988 11.2238 12.4847 12.2923 12.0388L12.2933 12.0384C14.4808 11.1113 16.2528 9.29455 17.1478 7.0158C17.194 6.90306 17.2095 6.78025 17.1944 6.6607ZM6.13341 10.6426C4.39015 9.89084 3.0433 8.51321 2.28191 6.74908C3.46292 3.99149 6.08018 2.24535 9.00005 2.24535C11.9192 2.24535 14.5369 4.00788 15.7182 6.74963C14.9556 8.52857 13.5136 9.95668 11.7709 10.6927L11.7675 10.6941C9.94954 11.4568 7.93628 11.4399 6.13511 10.6433L6.13341 10.6426Z" fill="" stroke="" stroke-width="0.4" />
                                                                                                <path d="M9.00036 3.48359C7.25064 3.48359 5.83772 4.95598 5.83772 6.7499C5.83772 8.54382 7.25061 10.0162 9.00036 10.0162C10.7501 10.0162 12.163 8.54382 12.163 6.7499C12.163 4.95598 10.7501 3.48359 9.00036 3.48359ZM9.00036 8.57093C8.03991 8.57093 7.24766 7.76102 7.24766 6.7499C7.24766 5.73879 8.03991 4.92887 9.00036 4.92887C9.96081 4.92887 10.7531 5.73879 10.7531 6.7499C10.7531 7.76102 9.96081 8.57093 9.00036 8.57093Z" fill="" stroke="" stroke-width="0.4" />
                                                                                            </svg>
                                                                                            View Map
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M9.77666 0.895528C9.65954 0.911037 9.54812 0.966745 9.46537 1.05111L0.532926 9.98323C0.453644 10.0624 0.400294 10.1671 0.382799 10.2778L0.00489416 12.6679C-0.0443624 12.998 0.286659 13.3261 0.616314 13.2737L3.00641 12.9012C3.11708 12.8839 3.22179 12.8304 3.30095 12.7511L12.2277 3.81898C12.4259 3.62133 12.4259 3.26066 12.2277 3.06301L10.2155 1.05082C10.0609 0.893127 9.93397 0.885929 9.77641 0.895236L9.77666 0.895528ZM9.84341 2.18513L11.0996 3.44135L2.66744 11.8732L1.17787 12.1067L1.41137 10.6171L9.84341 2.18513ZM5.51361 12.2124C5.21894 12.2124 4.97997 12.4512 4.97997 12.746C4.97997 13.0407 5.21893 13.2797 5.51361 13.2797H15.4742C15.7689 13.2797 16.0078 13.0407 16.0078 12.746C16.0078 12.4514 15.7689 12.2124 15.4742 12.2124H5.51361Z" fill="" fill-opacity="0.8" />
                                                                                            </svg>
                                                                                            Edit
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Bessie Cooper</td>
                                                                        <td><span className="updateDate">31 Dec, 2022  |  2:04 AM </span><span className="dayAgo"> 5 Days Ago</span></td>
                                                                        <td><span class="badge text-bg-green">ACTIVE</span></td>
                                                                        <td>$127.6</td>
                                                                        <td>$127.6</td>
                                                                        <td>
                                                                            <div class="btn-group dropstart table-action">
                                                                                <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                    <span></span>
                                                                                </button>
                                                                                <ul class="dropdown-menu">
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M17.1944 6.6607L17.2136 6.65046L17.1483 6.48452C15.7899 3.03162 12.6041 0.8 9.00005 0.8C5.39652 0.8 2.2113 3.03092 0.852397 6.48289C0.78258 6.65282 0.782532 6.84559 0.852259 7.01555C1.72943 9.25731 3.39878 11.022 5.56904 11.9673C6.67312 12.467 7.82889 12.6988 9.00005 12.6988C10.1202 12.6988 11.2238 12.4847 12.2923 12.0388L12.2933 12.0384C14.4808 11.1113 16.2528 9.29455 17.1478 7.0158C17.194 6.90306 17.2095 6.78025 17.1944 6.6607ZM6.13341 10.6426C4.39015 9.89084 3.0433 8.51321 2.28191 6.74908C3.46292 3.99149 6.08018 2.24535 9.00005 2.24535C11.9192 2.24535 14.5369 4.00788 15.7182 6.74963C14.9556 8.52857 13.5136 9.95668 11.7709 10.6927L11.7675 10.6941C9.94954 11.4568 7.93628 11.4399 6.13511 10.6433L6.13341 10.6426Z" fill="" stroke="" stroke-width="0.4" />
                                                                                                <path d="M9.00036 3.48359C7.25064 3.48359 5.83772 4.95598 5.83772 6.7499C5.83772 8.54382 7.25061 10.0162 9.00036 10.0162C10.7501 10.0162 12.163 8.54382 12.163 6.7499C12.163 4.95598 10.7501 3.48359 9.00036 3.48359ZM9.00036 8.57093C8.03991 8.57093 7.24766 7.76102 7.24766 6.7499C7.24766 5.73879 8.03991 4.92887 9.00036 4.92887C9.96081 4.92887 10.7531 5.73879 10.7531 6.7499C10.7531 7.76102 9.96081 8.57093 9.00036 8.57093Z" fill="" stroke="" stroke-width="0.4" />
                                                                                            </svg>
                                                                                            View Map
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M9.77666 0.895528C9.65954 0.911037 9.54812 0.966745 9.46537 1.05111L0.532926 9.98323C0.453644 10.0624 0.400294 10.1671 0.382799 10.2778L0.00489416 12.6679C-0.0443624 12.998 0.286659 13.3261 0.616314 13.2737L3.00641 12.9012C3.11708 12.8839 3.22179 12.8304 3.30095 12.7511L12.2277 3.81898C12.4259 3.62133 12.4259 3.26066 12.2277 3.06301L10.2155 1.05082C10.0609 0.893127 9.93397 0.885929 9.77641 0.895236L9.77666 0.895528ZM9.84341 2.18513L11.0996 3.44135L2.66744 11.8732L1.17787 12.1067L1.41137 10.6171L9.84341 2.18513ZM5.51361 12.2124C5.21894 12.2124 4.97997 12.4512 4.97997 12.746C4.97997 13.0407 5.21893 13.2797 5.51361 13.2797H15.4742C15.7689 13.2797 16.0078 13.0407 16.0078 12.746C16.0078 12.4514 15.7689 12.2124 15.4742 12.2124H5.51361Z" fill="" fill-opacity="0.8" />
                                                                                            </svg>
                                                                                            Edit
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Savannah</td>
                                                                        <td><span className="updateDate">31 Dec, 2022  |  2:04 AM </span><span className="dayAgo"> 5 Days Ago</span></td>
                                                                        <td><span class="badge text-bg-green">ACTIVE</span></td>
                                                                        <td>$127.6</td>
                                                                        <td>$127.6</td>
                                                                        <td>
                                                                            <div class="btn-group dropstart table-action">
                                                                                <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                    <span></span>
                                                                                </button>
                                                                                <ul class="dropdown-menu">
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M17.1944 6.6607L17.2136 6.65046L17.1483 6.48452C15.7899 3.03162 12.6041 0.8 9.00005 0.8C5.39652 0.8 2.2113 3.03092 0.852397 6.48289C0.78258 6.65282 0.782532 6.84559 0.852259 7.01555C1.72943 9.25731 3.39878 11.022 5.56904 11.9673C6.67312 12.467 7.82889 12.6988 9.00005 12.6988C10.1202 12.6988 11.2238 12.4847 12.2923 12.0388L12.2933 12.0384C14.4808 11.1113 16.2528 9.29455 17.1478 7.0158C17.194 6.90306 17.2095 6.78025 17.1944 6.6607ZM6.13341 10.6426C4.39015 9.89084 3.0433 8.51321 2.28191 6.74908C3.46292 3.99149 6.08018 2.24535 9.00005 2.24535C11.9192 2.24535 14.5369 4.00788 15.7182 6.74963C14.9556 8.52857 13.5136 9.95668 11.7709 10.6927L11.7675 10.6941C9.94954 11.4568 7.93628 11.4399 6.13511 10.6433L6.13341 10.6426Z" fill="" stroke="" stroke-width="0.4" />
                                                                                                <path d="M9.00036 3.48359C7.25064 3.48359 5.83772 4.95598 5.83772 6.7499C5.83772 8.54382 7.25061 10.0162 9.00036 10.0162C10.7501 10.0162 12.163 8.54382 12.163 6.7499C12.163 4.95598 10.7501 3.48359 9.00036 3.48359ZM9.00036 8.57093C8.03991 8.57093 7.24766 7.76102 7.24766 6.7499C7.24766 5.73879 8.03991 4.92887 9.00036 4.92887C9.96081 4.92887 10.7531 5.73879 10.7531 6.7499C10.7531 7.76102 9.96081 8.57093 9.00036 8.57093Z" fill="" stroke="" stroke-width="0.4" />
                                                                                            </svg>
                                                                                            View Map
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M9.77666 0.895528C9.65954 0.911037 9.54812 0.966745 9.46537 1.05111L0.532926 9.98323C0.453644 10.0624 0.400294 10.1671 0.382799 10.2778L0.00489416 12.6679C-0.0443624 12.998 0.286659 13.3261 0.616314 13.2737L3.00641 12.9012C3.11708 12.8839 3.22179 12.8304 3.30095 12.7511L12.2277 3.81898C12.4259 3.62133 12.4259 3.26066 12.2277 3.06301L10.2155 1.05082C10.0609 0.893127 9.93397 0.885929 9.77641 0.895236L9.77666 0.895528ZM9.84341 2.18513L11.0996 3.44135L2.66744 11.8732L1.17787 12.1067L1.41137 10.6171L9.84341 2.18513ZM5.51361 12.2124C5.21894 12.2124 4.97997 12.4512 4.97997 12.746C4.97997 13.0407 5.21893 13.2797 5.51361 13.2797H15.4742C15.7689 13.2797 16.0078 13.0407 16.0078 12.746C16.0078 12.4514 15.7689 12.2124 15.4742 12.2124H5.51361Z" fill="" fill-opacity="0.8" />
                                                                                            </svg>
                                                                                            Edit
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Wade Warren</td>
                                                                        <td><span className="updateDate">31 Dec, 2022  |  2:04 AM </span><span className="dayAgo"> 5 Days Ago</span></td>
                                                                        <td><span class="badge text-bg-green">ACTIVE</span></td>
                                                                        <td>$127.6</td>
                                                                        <td>$127.6</td>
                                                                        <td>
                                                                            <div class="btn-group dropstart table-action">
                                                                                <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                    <span></span>
                                                                                </button>
                                                                                <ul class="dropdown-menu">
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M17.1944 6.6607L17.2136 6.65046L17.1483 6.48452C15.7899 3.03162 12.6041 0.8 9.00005 0.8C5.39652 0.8 2.2113 3.03092 0.852397 6.48289C0.78258 6.65282 0.782532 6.84559 0.852259 7.01555C1.72943 9.25731 3.39878 11.022 5.56904 11.9673C6.67312 12.467 7.82889 12.6988 9.00005 12.6988C10.1202 12.6988 11.2238 12.4847 12.2923 12.0388L12.2933 12.0384C14.4808 11.1113 16.2528 9.29455 17.1478 7.0158C17.194 6.90306 17.2095 6.78025 17.1944 6.6607ZM6.13341 10.6426C4.39015 9.89084 3.0433 8.51321 2.28191 6.74908C3.46292 3.99149 6.08018 2.24535 9.00005 2.24535C11.9192 2.24535 14.5369 4.00788 15.7182 6.74963C14.9556 8.52857 13.5136 9.95668 11.7709 10.6927L11.7675 10.6941C9.94954 11.4568 7.93628 11.4399 6.13511 10.6433L6.13341 10.6426Z" fill="" stroke="" stroke-width="0.4" />
                                                                                                <path d="M9.00036 3.48359C7.25064 3.48359 5.83772 4.95598 5.83772 6.7499C5.83772 8.54382 7.25061 10.0162 9.00036 10.0162C10.7501 10.0162 12.163 8.54382 12.163 6.7499C12.163 4.95598 10.7501 3.48359 9.00036 3.48359ZM9.00036 8.57093C8.03991 8.57093 7.24766 7.76102 7.24766 6.7499C7.24766 5.73879 8.03991 4.92887 9.00036 4.92887C9.96081 4.92887 10.7531 5.73879 10.7531 6.7499C10.7531 7.76102 9.96081 8.57093 9.00036 8.57093Z" fill="" stroke="" stroke-width="0.4" />
                                                                                            </svg>
                                                                                            View Map
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M9.77666 0.895528C9.65954 0.911037 9.54812 0.966745 9.46537 1.05111L0.532926 9.98323C0.453644 10.0624 0.400294 10.1671 0.382799 10.2778L0.00489416 12.6679C-0.0443624 12.998 0.286659 13.3261 0.616314 13.2737L3.00641 12.9012C3.11708 12.8839 3.22179 12.8304 3.30095 12.7511L12.2277 3.81898C12.4259 3.62133 12.4259 3.26066 12.2277 3.06301L10.2155 1.05082C10.0609 0.893127 9.93397 0.885929 9.77641 0.895236L9.77666 0.895528ZM9.84341 2.18513L11.0996 3.44135L2.66744 11.8732L1.17787 12.1067L1.41137 10.6171L9.84341 2.18513ZM5.51361 12.2124C5.21894 12.2124 4.97997 12.4512 4.97997 12.746C4.97997 13.0407 5.21893 13.2797 5.51361 13.2797H15.4742C15.7689 13.2797 16.0078 13.0407 16.0078 12.746C16.0078 12.4514 15.7689 12.2124 15.4742 12.2124H5.51361Z" fill="" fill-opacity="0.8" />
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
                                        {/* <div class="row mb-3">
                                            <div class="col-12 mb-3 mb-sm-0">
                                                <div class="card user-card height-100">
                                                    <div class="card-body">
                                                        <h6 class="card-title mb-3">Users</h6>
                                                        <div class="row">
                                                            <div class="col">
                                                                <ul class="amount-status">
                                                                    <li class="pending">
                                                                        <div class="value">CA$79.53 (3.19%)</div>
                                                                        <div class="status">Pending</div>
                                                                    </li>
                                                                    <li class="approved">
                                                                        <div class="value">CA$79.53 (3.19%)</div>
                                                                        <div class="status">Approved</div>
                                                                    </li>
                                                                    <li class="paid">
                                                                        <div class="value">CA$79.53 (3.19%)</div>
                                                                        <div class="status">Paid</div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div class="col">
                                                                <div class="amount-progress">
                                                                    <img src={totalUsers} class="img-fluid" alt="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div class="row">
                                                            <div class="col">
                                                                <div class="badge text-bg-light w-100 sales-data p-3 text-start">
                                                                    <label>Sales</label>
                                                                    <div class="amount">
                                                                        CA$2,491.82
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col">
                                                                <div class="badge text-bg-light w-100 sales-data p-3 text-start">
                                                                    <label>Per Order Average</label>
                                                                    <div class="amount">
                                                                        CA$2,491.82
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-sm-7">
                                                <div class="card graph-card height-100">
                                                    <div class="card-body">
                                                        <div class="row mb-3">
                                                            <div class="col">
                                                                <h6 class="card-title">Heading</h6>
                                                            </div>
                                                            <div class="col text-end">
                                                                <select name="" id="" class="btn btn-outline-black btn-sm text-start">
                                                                    <option value="" selected>Yearly</option>
                                                                    <option value="">Monthly</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <img src={graph} class="img-fluid" alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* <div class="row">

                                            <div class="col mb-3 mb-sm-0">
                                                <div class="card height-100">
                                                    <div class="card-body">
                                                        <div class="row mb-3">
                                                            <div class="col">
                                                                <h6 class="card-title">Top Products</h6>
                                                            </div>
                                                            <div class="col text-end">
                                                                <select name="" id="" class="btn btn-outline-black btn-sm text-start">
                                                                    <option value="" selected>30 Days</option>
                                                                    <option value="">60 Days</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">Product name</th>
                                                                    <th scope="col"></th>
                                                                    <th scope="col" class="">Product Value</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td colspan="2">
                                                                        <div class="topProd">
                                                                            <div class="name">
                                                                                Product-1
                                                                            </div>
                                                                            <div class="desc">
                                                                                Lorem Ipsum is simply dummy text
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td class="prodPrice">CA $555.00</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colspan="2">
                                                                        <div class="topProd">
                                                                            <div class="name">
                                                                                Product-1
                                                                            </div>
                                                                            <div class="desc">
                                                                                Lorem Ipsum is simply dummy text
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td class="prodPrice">CA $555.00</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colspan="2">
                                                                        <div class="topProd">
                                                                            <div class="name">
                                                                                Product-1
                                                                            </div>
                                                                            <div class="desc">
                                                                                Lorem Ipsum is simply dummy text
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td class="prodPrice">CA $555.00</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col mb-3 mb-sm-0">
                                                <div class="card height-100">
                                                    <div class="card-body">
                                                        <div class="row mb-3">
                                                            <div class="col">
                                                                <h6 class="card-title">Top Retailers</h6>
                                                            </div>
                                                            <div class="col text-end">
                                                                <select name="" id="" class="btn btn-outline-black btn-sm text-start">
                                                                    <option value="" selected>30 Days</option>
                                                                    <option value="">60 Days</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">Product name</th>
                                                                    <th scope="col"></th>
                                                                    <th scope="col" class="">Product Value</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td colspan="2">
                                                                        <div class="topProd">
                                                                            <div class="name">
                                                                                Product-1
                                                                            </div>
                                                                            <div class="desc">
                                                                                Lorem Ipsum is simply dummy text
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td class="prodPrice">CA $555.00</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colspan="2">
                                                                        <div class="topProd">
                                                                            <div class="name">
                                                                                Product-1
                                                                            </div>
                                                                            <div class="desc">
                                                                                Lorem Ipsum is simply dummy text
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td class="prodPrice">CA $555.00</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colspan="2">
                                                                        <div class="topProd">
                                                                            <div class="name">
                                                                                Product-1
                                                                            </div>
                                                                            <div class="desc">
                                                                                Lorem Ipsum is simply dummy text
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td class="prodPrice">CA $555.00</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>


                                        </div> */}
                                    </div>

                                    <div class="tab-pane fade" id="payment-tab-pane" role="tabpanel" aria-labelledby="order-tab" tabindex="0">
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
                                                                        placeholder={t("retailer.account_payable.search_here")}
                                                                    ></input>
                                                                </div>
                                                            </div>
                                                            {/* [/Table Search] */}

                                                            {/* [Right Filter] */}
                                                            <div className="filter-row text-end">
                                                                {/* [Page Filter Box] */}
                                                                <div className="filter-box">
                                                                    {/* [Cart Icon] */}
                                                                    {/* [Filter] */}
                                                                    <div class="dropdown right-filter">
                                                                        <button
                                                                            type="button"
                                                                            class="btn dropdown-toggle"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-expanded="false"
                                                                            data-bs-auto-close="outside"
                                                                        >
                                                                            <img src={filter} /> {t("retailer.account_payable.filter")}
                                                                        </button>
                                                                        <form class="dropdown-menu p-3 ">

                                                                            <div class="mb-3">
                                                                                <label class="form-label">{t("retailer.account_payable.supplier")}</label>
                                                                                <select className="form-select">
                                                                                    <option selected disabled>
                                                                                    {t("retailer.account_payable.choose_supplier")}
                                                                                    </option>
                                                                                    <option value="">Supplier 1</option>
                                                                                    <option value="">Supplier 2</option>
                                                                                    <option value="">Supplier 3</option>
                                                                                </select>
                                                                            </div>
                                                                            <div className="d-flex justify-content-end">
                                                                                <button
                                                                                    type="submit"
                                                                                    class="btn btn-purple width-auto me-2"
                                                                                >
                                                                                    {t("retailer.account_payable.apply")}
                                                                                </button>
                                                                                <input
                                                                                    type="reset"
                                                                                    class="btn btn-outline-black width-auto"
                                                                                    value="Clear"
                                                                                />
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                    {/* [/Filter] */}
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
                                                                        <th>{t("retailer.account_payable.payment_no")}</th>
                                                                        <th>{t("retailer.account_payable.supplier")}</th>
                                                                        <th>DATE</th>
                                                                        <th>{t("retailer.account_payable.status")}</th>
                                                                        <th>{t("retailer.account_payable.amount")}</th>
                                                                        <th>TYPE</th>
                                                                        <th>ACTION</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>#006</td>
                                                                        <td>SUPPLIER 1</td>
                                                                        <td><span className="updateDate">31 Dec, 2022  |  2:04 AM </span><span className="dayAgo"> 5 Days Ago</span></td>
                                                                        <td><span class="badge text-bg-green">ACTIVE</span></td>
                                                                        <td>$127.6</td>
                                                                        <td>{t("retailer.account_payable.bank_transfer")}</td>
                                                                        <td>
                                                                            <div class="btn-group dropstart table-action">
                                                                                <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                    <span></span>
                                                                                </button>
                                                                                <ul class="dropdown-menu">
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M17.1944 6.6607L17.2136 6.65046L17.1483 6.48452C15.7899 3.03162 12.6041 0.8 9.00005 0.8C5.39652 0.8 2.2113 3.03092 0.852397 6.48289C0.78258 6.65282 0.782532 6.84559 0.852259 7.01555C1.72943 9.25731 3.39878 11.022 5.56904 11.9673C6.67312 12.467 7.82889 12.6988 9.00005 12.6988C10.1202 12.6988 11.2238 12.4847 12.2923 12.0388L12.2933 12.0384C14.4808 11.1113 16.2528 9.29455 17.1478 7.0158C17.194 6.90306 17.2095 6.78025 17.1944 6.6607ZM6.13341 10.6426C4.39015 9.89084 3.0433 8.51321 2.28191 6.74908C3.46292 3.99149 6.08018 2.24535 9.00005 2.24535C11.9192 2.24535 14.5369 4.00788 15.7182 6.74963C14.9556 8.52857 13.5136 9.95668 11.7709 10.6927L11.7675 10.6941C9.94954 11.4568 7.93628 11.4399 6.13511 10.6433L6.13341 10.6426Z" fill="" stroke="" stroke-width="0.4" />
                                                                                                <path d="M9.00036 3.48359C7.25064 3.48359 5.83772 4.95598 5.83772 6.7499C5.83772 8.54382 7.25061 10.0162 9.00036 10.0162C10.7501 10.0162 12.163 8.54382 12.163 6.7499C12.163 4.95598 10.7501 3.48359 9.00036 3.48359ZM9.00036 8.57093C8.03991 8.57093 7.24766 7.76102 7.24766 6.7499C7.24766 5.73879 8.03991 4.92887 9.00036 4.92887C9.96081 4.92887 10.7531 5.73879 10.7531 6.7499C10.7531 7.76102 9.96081 8.57093 9.00036 8.57093Z" fill="" stroke="" stroke-width="0.4" />
                                                                                            </svg>
                                                                                            View Map
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M9.77666 0.895528C9.65954 0.911037 9.54812 0.966745 9.46537 1.05111L0.532926 9.98323C0.453644 10.0624 0.400294 10.1671 0.382799 10.2778L0.00489416 12.6679C-0.0443624 12.998 0.286659 13.3261 0.616314 13.2737L3.00641 12.9012C3.11708 12.8839 3.22179 12.8304 3.30095 12.7511L12.2277 3.81898C12.4259 3.62133 12.4259 3.26066 12.2277 3.06301L10.2155 1.05082C10.0609 0.893127 9.93397 0.885929 9.77641 0.895236L9.77666 0.895528ZM9.84341 2.18513L11.0996 3.44135L2.66744 11.8732L1.17787 12.1067L1.41137 10.6171L9.84341 2.18513ZM5.51361 12.2124C5.21894 12.2124 4.97997 12.4512 4.97997 12.746C4.97997 13.0407 5.21893 13.2797 5.51361 13.2797H15.4742C15.7689 13.2797 16.0078 13.0407 16.0078 12.746C16.0078 12.4514 15.7689 12.2124 15.4742 12.2124H5.51361Z" fill="" fill-opacity="0.8" />
                                                                                            </svg>
                                                                                            Edit
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>#006</td>
                                                                        <td>SUPPLIER 2</td>
                                                                        <td><span className="updateDate">31 Dec, 2022  |  2:04 AM </span><span className="dayAgo"> 5 Days Ago</span></td>
                                                                        <td><span class="badge text-bg-green">ACTIVE</span></td>
                                                                        <td>$127.6</td>
                                                                        <td>Bank Transfer</td>
                                                                        <td>
                                                                            <div class="btn-group dropstart table-action">
                                                                                <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                    <span></span>
                                                                                </button>
                                                                                <ul class="dropdown-menu">
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M17.1944 6.6607L17.2136 6.65046L17.1483 6.48452C15.7899 3.03162 12.6041 0.8 9.00005 0.8C5.39652 0.8 2.2113 3.03092 0.852397 6.48289C0.78258 6.65282 0.782532 6.84559 0.852259 7.01555C1.72943 9.25731 3.39878 11.022 5.56904 11.9673C6.67312 12.467 7.82889 12.6988 9.00005 12.6988C10.1202 12.6988 11.2238 12.4847 12.2923 12.0388L12.2933 12.0384C14.4808 11.1113 16.2528 9.29455 17.1478 7.0158C17.194 6.90306 17.2095 6.78025 17.1944 6.6607ZM6.13341 10.6426C4.39015 9.89084 3.0433 8.51321 2.28191 6.74908C3.46292 3.99149 6.08018 2.24535 9.00005 2.24535C11.9192 2.24535 14.5369 4.00788 15.7182 6.74963C14.9556 8.52857 13.5136 9.95668 11.7709 10.6927L11.7675 10.6941C9.94954 11.4568 7.93628 11.4399 6.13511 10.6433L6.13341 10.6426Z" fill="" stroke="" stroke-width="0.4" />
                                                                                                <path d="M9.00036 3.48359C7.25064 3.48359 5.83772 4.95598 5.83772 6.7499C5.83772 8.54382 7.25061 10.0162 9.00036 10.0162C10.7501 10.0162 12.163 8.54382 12.163 6.7499C12.163 4.95598 10.7501 3.48359 9.00036 3.48359ZM9.00036 8.57093C8.03991 8.57093 7.24766 7.76102 7.24766 6.7499C7.24766 5.73879 8.03991 4.92887 9.00036 4.92887C9.96081 4.92887 10.7531 5.73879 10.7531 6.7499C10.7531 7.76102 9.96081 8.57093 9.00036 8.57093Z" fill="" stroke="" stroke-width="0.4" />
                                                                                            </svg>
                                                                                            View Map
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M9.77666 0.895528C9.65954 0.911037 9.54812 0.966745 9.46537 1.05111L0.532926 9.98323C0.453644 10.0624 0.400294 10.1671 0.382799 10.2778L0.00489416 12.6679C-0.0443624 12.998 0.286659 13.3261 0.616314 13.2737L3.00641 12.9012C3.11708 12.8839 3.22179 12.8304 3.30095 12.7511L12.2277 3.81898C12.4259 3.62133 12.4259 3.26066 12.2277 3.06301L10.2155 1.05082C10.0609 0.893127 9.93397 0.885929 9.77641 0.895236L9.77666 0.895528ZM9.84341 2.18513L11.0996 3.44135L2.66744 11.8732L1.17787 12.1067L1.41137 10.6171L9.84341 2.18513ZM5.51361 12.2124C5.21894 12.2124 4.97997 12.4512 4.97997 12.746C4.97997 13.0407 5.21893 13.2797 5.51361 13.2797H15.4742C15.7689 13.2797 16.0078 13.0407 16.0078 12.746C16.0078 12.4514 15.7689 12.2124 15.4742 12.2124H5.51361Z" fill="" fill-opacity="0.8" />
                                                                                            </svg>
                                                                                            Edit
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>#006</td>
                                                                        <td>SUPPLIER 3</td>
                                                                        <td><span className="updateDate">31 Dec, 2022  |  2:04 AM </span><span className="dayAgo"> 5 Days Ago</span></td>
                                                                        <td><span class="badge text-bg-green">ACTIVE</span></td>
                                                                        <td>$127.6</td>
                                                                        <td>Bank Transfer</td>
                                                                        <td>
                                                                            <div class="btn-group dropstart table-action">
                                                                                <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                    <span></span>
                                                                                </button>
                                                                                <ul class="dropdown-menu">
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M17.1944 6.6607L17.2136 6.65046L17.1483 6.48452C15.7899 3.03162 12.6041 0.8 9.00005 0.8C5.39652 0.8 2.2113 3.03092 0.852397 6.48289C0.78258 6.65282 0.782532 6.84559 0.852259 7.01555C1.72943 9.25731 3.39878 11.022 5.56904 11.9673C6.67312 12.467 7.82889 12.6988 9.00005 12.6988C10.1202 12.6988 11.2238 12.4847 12.2923 12.0388L12.2933 12.0384C14.4808 11.1113 16.2528 9.29455 17.1478 7.0158C17.194 6.90306 17.2095 6.78025 17.1944 6.6607ZM6.13341 10.6426C4.39015 9.89084 3.0433 8.51321 2.28191 6.74908C3.46292 3.99149 6.08018 2.24535 9.00005 2.24535C11.9192 2.24535 14.5369 4.00788 15.7182 6.74963C14.9556 8.52857 13.5136 9.95668 11.7709 10.6927L11.7675 10.6941C9.94954 11.4568 7.93628 11.4399 6.13511 10.6433L6.13341 10.6426Z" fill="" stroke="" stroke-width="0.4" />
                                                                                                <path d="M9.00036 3.48359C7.25064 3.48359 5.83772 4.95598 5.83772 6.7499C5.83772 8.54382 7.25061 10.0162 9.00036 10.0162C10.7501 10.0162 12.163 8.54382 12.163 6.7499C12.163 4.95598 10.7501 3.48359 9.00036 3.48359ZM9.00036 8.57093C8.03991 8.57093 7.24766 7.76102 7.24766 6.7499C7.24766 5.73879 8.03991 4.92887 9.00036 4.92887C9.96081 4.92887 10.7531 5.73879 10.7531 6.7499C10.7531 7.76102 9.96081 8.57093 9.00036 8.57093Z" fill="" stroke="" stroke-width="0.4" />
                                                                                            </svg>
                                                                                            View Map
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M9.77666 0.895528C9.65954 0.911037 9.54812 0.966745 9.46537 1.05111L0.532926 9.98323C0.453644 10.0624 0.400294 10.1671 0.382799 10.2778L0.00489416 12.6679C-0.0443624 12.998 0.286659 13.3261 0.616314 13.2737L3.00641 12.9012C3.11708 12.8839 3.22179 12.8304 3.30095 12.7511L12.2277 3.81898C12.4259 3.62133 12.4259 3.26066 12.2277 3.06301L10.2155 1.05082C10.0609 0.893127 9.93397 0.885929 9.77641 0.895236L9.77666 0.895528ZM9.84341 2.18513L11.0996 3.44135L2.66744 11.8732L1.17787 12.1067L1.41137 10.6171L9.84341 2.18513ZM5.51361 12.2124C5.21894 12.2124 4.97997 12.4512 4.97997 12.746C4.97997 13.0407 5.21893 13.2797 5.51361 13.2797H15.4742C15.7689 13.2797 16.0078 13.0407 16.0078 12.746C16.0078 12.4514 15.7689 12.2124 15.4742 12.2124H5.51361Z" fill="" fill-opacity="0.8" />
                                                                                            </svg>
                                                                                            Edit
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>#006</td>
                                                                        <td>SUPPLIER 4</td>
                                                                        <td><span className="updateDate">31 Dec, 2022  |  2:04 AM </span><span className="dayAgo"> 5 Days Ago</span></td>
                                                                        <td><span class="badge text-bg-green">ACTIVE</span></td>
                                                                        <td>$127.6</td>
                                                                        <td>Bank Transfer</td>
                                                                        <td>
                                                                            <div class="btn-group dropstart table-action">
                                                                                <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                    <span></span>
                                                                                </button>
                                                                                <ul class="dropdown-menu">
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M17.1944 6.6607L17.2136 6.65046L17.1483 6.48452C15.7899 3.03162 12.6041 0.8 9.00005 0.8C5.39652 0.8 2.2113 3.03092 0.852397 6.48289C0.78258 6.65282 0.782532 6.84559 0.852259 7.01555C1.72943 9.25731 3.39878 11.022 5.56904 11.9673C6.67312 12.467 7.82889 12.6988 9.00005 12.6988C10.1202 12.6988 11.2238 12.4847 12.2923 12.0388L12.2933 12.0384C14.4808 11.1113 16.2528 9.29455 17.1478 7.0158C17.194 6.90306 17.2095 6.78025 17.1944 6.6607ZM6.13341 10.6426C4.39015 9.89084 3.0433 8.51321 2.28191 6.74908C3.46292 3.99149 6.08018 2.24535 9.00005 2.24535C11.9192 2.24535 14.5369 4.00788 15.7182 6.74963C14.9556 8.52857 13.5136 9.95668 11.7709 10.6927L11.7675 10.6941C9.94954 11.4568 7.93628 11.4399 6.13511 10.6433L6.13341 10.6426Z" fill="" stroke="" stroke-width="0.4" />
                                                                                                <path d="M9.00036 3.48359C7.25064 3.48359 5.83772 4.95598 5.83772 6.7499C5.83772 8.54382 7.25061 10.0162 9.00036 10.0162C10.7501 10.0162 12.163 8.54382 12.163 6.7499C12.163 4.95598 10.7501 3.48359 9.00036 3.48359ZM9.00036 8.57093C8.03991 8.57093 7.24766 7.76102 7.24766 6.7499C7.24766 5.73879 8.03991 4.92887 9.00036 4.92887C9.96081 4.92887 10.7531 5.73879 10.7531 6.7499C10.7531 7.76102 9.96081 8.57093 9.00036 8.57093Z" fill="" stroke="" stroke-width="0.4" />
                                                                                            </svg>
                                                                                            View Map
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M9.77666 0.895528C9.65954 0.911037 9.54812 0.966745 9.46537 1.05111L0.532926 9.98323C0.453644 10.0624 0.400294 10.1671 0.382799 10.2778L0.00489416 12.6679C-0.0443624 12.998 0.286659 13.3261 0.616314 13.2737L3.00641 12.9012C3.11708 12.8839 3.22179 12.8304 3.30095 12.7511L12.2277 3.81898C12.4259 3.62133 12.4259 3.26066 12.2277 3.06301L10.2155 1.05082C10.0609 0.893127 9.93397 0.885929 9.77641 0.895236L9.77666 0.895528ZM9.84341 2.18513L11.0996 3.44135L2.66744 11.8732L1.17787 12.1067L1.41137 10.6171L9.84341 2.18513ZM5.51361 12.2124C5.21894 12.2124 4.97997 12.4512 4.97997 12.746C4.97997 13.0407 5.21893 13.2797 5.51361 13.2797H15.4742C15.7689 13.2797 16.0078 13.0407 16.0078 12.746C16.0078 12.4514 15.7689 12.2124 15.4742 12.2124H5.51361Z" fill="" fill-opacity="0.8" />
                                                                                            </svg>
                                                                                            Edit
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>#006</td>
                                                                        <td>SUPPLIER 5</td>
                                                                        <td><span className="updateDate">31 Dec, 2022  |  2:04 AM </span><span className="dayAgo"> 5 Days Ago</span></td>
                                                                        <td><span class="badge text-bg-green">ACTIVE</span></td>
                                                                        <td>$127.6</td>
                                                                        <td>Bank Transfer</td>
                                                                        <td>
                                                                            <div class="btn-group dropstart table-action">
                                                                                <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                    <span></span>
                                                                                </button>
                                                                                <ul class="dropdown-menu">
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M17.1944 6.6607L17.2136 6.65046L17.1483 6.48452C15.7899 3.03162 12.6041 0.8 9.00005 0.8C5.39652 0.8 2.2113 3.03092 0.852397 6.48289C0.78258 6.65282 0.782532 6.84559 0.852259 7.01555C1.72943 9.25731 3.39878 11.022 5.56904 11.9673C6.67312 12.467 7.82889 12.6988 9.00005 12.6988C10.1202 12.6988 11.2238 12.4847 12.2923 12.0388L12.2933 12.0384C14.4808 11.1113 16.2528 9.29455 17.1478 7.0158C17.194 6.90306 17.2095 6.78025 17.1944 6.6607ZM6.13341 10.6426C4.39015 9.89084 3.0433 8.51321 2.28191 6.74908C3.46292 3.99149 6.08018 2.24535 9.00005 2.24535C11.9192 2.24535 14.5369 4.00788 15.7182 6.74963C14.9556 8.52857 13.5136 9.95668 11.7709 10.6927L11.7675 10.6941C9.94954 11.4568 7.93628 11.4399 6.13511 10.6433L6.13341 10.6426Z" fill="" stroke="" stroke-width="0.4" />
                                                                                                <path d="M9.00036 3.48359C7.25064 3.48359 5.83772 4.95598 5.83772 6.7499C5.83772 8.54382 7.25061 10.0162 9.00036 10.0162C10.7501 10.0162 12.163 8.54382 12.163 6.7499C12.163 4.95598 10.7501 3.48359 9.00036 3.48359ZM9.00036 8.57093C8.03991 8.57093 7.24766 7.76102 7.24766 6.7499C7.24766 5.73879 8.03991 4.92887 9.00036 4.92887C9.96081 4.92887 10.7531 5.73879 10.7531 6.7499C10.7531 7.76102 9.96081 8.57093 9.00036 8.57093Z" fill="" stroke="" stroke-width="0.4" />
                                                                                            </svg>
                                                                                            View Map
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M9.77666 0.895528C9.65954 0.911037 9.54812 0.966745 9.46537 1.05111L0.532926 9.98323C0.453644 10.0624 0.400294 10.1671 0.382799 10.2778L0.00489416 12.6679C-0.0443624 12.998 0.286659 13.3261 0.616314 13.2737L3.00641 12.9012C3.11708 12.8839 3.22179 12.8304 3.30095 12.7511L12.2277 3.81898C12.4259 3.62133 12.4259 3.26066 12.2277 3.06301L10.2155 1.05082C10.0609 0.893127 9.93397 0.885929 9.77641 0.895236L9.77666 0.895528ZM9.84341 2.18513L11.0996 3.44135L2.66744 11.8732L1.17787 12.1067L1.41137 10.6171L9.84341 2.18513ZM5.51361 12.2124C5.21894 12.2124 4.97997 12.4512 4.97997 12.746C4.97997 13.0407 5.21893 13.2797 5.51361 13.2797H15.4742C15.7689 13.2797 16.0078 13.0407 16.0078 12.746C16.0078 12.4514 15.7689 12.2124 15.4742 12.2124H5.51361Z" fill="" fill-opacity="0.8" />
                                                                                            </svg>
                                                                                            Edit
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>#006</td>
                                                                        <td>SUPPLIER 6</td>
                                                                        <td><span className="updateDate">31 Dec, 2022  |  2:04 AM </span><span className="dayAgo"> 5 Days Ago</span></td>
                                                                        <td><span class="badge text-bg-green">ACTIVE</span></td>
                                                                        <td>$127.6</td>
                                                                        <td>Bank Transfer</td>
                                                                        <td>
                                                                            <div class="btn-group dropstart table-action">
                                                                                <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                    <span></span>
                                                                                </button>
                                                                                <ul class="dropdown-menu">
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M17.1944 6.6607L17.2136 6.65046L17.1483 6.48452C15.7899 3.03162 12.6041 0.8 9.00005 0.8C5.39652 0.8 2.2113 3.03092 0.852397 6.48289C0.78258 6.65282 0.782532 6.84559 0.852259 7.01555C1.72943 9.25731 3.39878 11.022 5.56904 11.9673C6.67312 12.467 7.82889 12.6988 9.00005 12.6988C10.1202 12.6988 11.2238 12.4847 12.2923 12.0388L12.2933 12.0384C14.4808 11.1113 16.2528 9.29455 17.1478 7.0158C17.194 6.90306 17.2095 6.78025 17.1944 6.6607ZM6.13341 10.6426C4.39015 9.89084 3.0433 8.51321 2.28191 6.74908C3.46292 3.99149 6.08018 2.24535 9.00005 2.24535C11.9192 2.24535 14.5369 4.00788 15.7182 6.74963C14.9556 8.52857 13.5136 9.95668 11.7709 10.6927L11.7675 10.6941C9.94954 11.4568 7.93628 11.4399 6.13511 10.6433L6.13341 10.6426Z" fill="" stroke="" stroke-width="0.4" />
                                                                                                <path d="M9.00036 3.48359C7.25064 3.48359 5.83772 4.95598 5.83772 6.7499C5.83772 8.54382 7.25061 10.0162 9.00036 10.0162C10.7501 10.0162 12.163 8.54382 12.163 6.7499C12.163 4.95598 10.7501 3.48359 9.00036 3.48359ZM9.00036 8.57093C8.03991 8.57093 7.24766 7.76102 7.24766 6.7499C7.24766 5.73879 8.03991 4.92887 9.00036 4.92887C9.96081 4.92887 10.7531 5.73879 10.7531 6.7499C10.7531 7.76102 9.96081 8.57093 9.00036 8.57093Z" fill="" stroke="" stroke-width="0.4" />
                                                                                            </svg>
                                                                                            View Map
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M9.77666 0.895528C9.65954 0.911037 9.54812 0.966745 9.46537 1.05111L0.532926 9.98323C0.453644 10.0624 0.400294 10.1671 0.382799 10.2778L0.00489416 12.6679C-0.0443624 12.998 0.286659 13.3261 0.616314 13.2737L3.00641 12.9012C3.11708 12.8839 3.22179 12.8304 3.30095 12.7511L12.2277 3.81898C12.4259 3.62133 12.4259 3.26066 12.2277 3.06301L10.2155 1.05082C10.0609 0.893127 9.93397 0.885929 9.77641 0.895236L9.77666 0.895528ZM9.84341 2.18513L11.0996 3.44135L2.66744 11.8732L1.17787 12.1067L1.41137 10.6171L9.84341 2.18513ZM5.51361 12.2124C5.21894 12.2124 4.97997 12.4512 4.97997 12.746C4.97997 13.0407 5.21893 13.2797 5.51361 13.2797H15.4742C15.7689 13.2797 16.0078 13.0407 16.0078 12.746C16.0078 12.4514 15.7689 12.2124 15.4742 12.2124H5.51361Z" fill="" fill-opacity="0.8" />
                                                                                            </svg>
                                                                                            Edit
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>#006</td>
                                                                        <td>SUPPLIER 7</td>
                                                                        <td><span className="updateDate">31 Dec, 2022  |  2:04 AM </span><span className="dayAgo"> 5 Days Ago</span></td>
                                                                        <td><span class="badge text-bg-green">ACTIVE</span></td>
                                                                        <td>$127.6</td>
                                                                        <td>Bank Transfer</td>
                                                                        <td>
                                                                            <div class="btn-group dropstart table-action">
                                                                                <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                    <span></span>
                                                                                </button>
                                                                                <ul class="dropdown-menu">
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M17.1944 6.6607L17.2136 6.65046L17.1483 6.48452C15.7899 3.03162 12.6041 0.8 9.00005 0.8C5.39652 0.8 2.2113 3.03092 0.852397 6.48289C0.78258 6.65282 0.782532 6.84559 0.852259 7.01555C1.72943 9.25731 3.39878 11.022 5.56904 11.9673C6.67312 12.467 7.82889 12.6988 9.00005 12.6988C10.1202 12.6988 11.2238 12.4847 12.2923 12.0388L12.2933 12.0384C14.4808 11.1113 16.2528 9.29455 17.1478 7.0158C17.194 6.90306 17.2095 6.78025 17.1944 6.6607ZM6.13341 10.6426C4.39015 9.89084 3.0433 8.51321 2.28191 6.74908C3.46292 3.99149 6.08018 2.24535 9.00005 2.24535C11.9192 2.24535 14.5369 4.00788 15.7182 6.74963C14.9556 8.52857 13.5136 9.95668 11.7709 10.6927L11.7675 10.6941C9.94954 11.4568 7.93628 11.4399 6.13511 10.6433L6.13341 10.6426Z" fill="" stroke="" stroke-width="0.4" />
                                                                                                <path d="M9.00036 3.48359C7.25064 3.48359 5.83772 4.95598 5.83772 6.7499C5.83772 8.54382 7.25061 10.0162 9.00036 10.0162C10.7501 10.0162 12.163 8.54382 12.163 6.7499C12.163 4.95598 10.7501 3.48359 9.00036 3.48359ZM9.00036 8.57093C8.03991 8.57093 7.24766 7.76102 7.24766 6.7499C7.24766 5.73879 8.03991 4.92887 9.00036 4.92887C9.96081 4.92887 10.7531 5.73879 10.7531 6.7499C10.7531 7.76102 9.96081 8.57093 9.00036 8.57093Z" fill="" stroke="" stroke-width="0.4" />
                                                                                            </svg>
                                                                                            View Map
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M9.77666 0.895528C9.65954 0.911037 9.54812 0.966745 9.46537 1.05111L0.532926 9.98323C0.453644 10.0624 0.400294 10.1671 0.382799 10.2778L0.00489416 12.6679C-0.0443624 12.998 0.286659 13.3261 0.616314 13.2737L3.00641 12.9012C3.11708 12.8839 3.22179 12.8304 3.30095 12.7511L12.2277 3.81898C12.4259 3.62133 12.4259 3.26066 12.2277 3.06301L10.2155 1.05082C10.0609 0.893127 9.93397 0.885929 9.77641 0.895236L9.77666 0.895528ZM9.84341 2.18513L11.0996 3.44135L2.66744 11.8732L1.17787 12.1067L1.41137 10.6171L9.84341 2.18513ZM5.51361 12.2124C5.21894 12.2124 4.97997 12.4512 4.97997 12.746C4.97997 13.0407 5.21893 13.2797 5.51361 13.2797H15.4742C15.7689 13.2797 16.0078 13.0407 16.0078 12.746C16.0078 12.4514 15.7689 12.2124 15.4742 12.2124H5.51361Z" fill="" fill-opacity="0.8" />
                                                                                            </svg>
                                                                                            Edit
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>#006</td>
                                                                        <td>SUPPLIER 8</td>
                                                                        <td><span className="updateDate">31 Dec, 2022  |  2:04 AM </span><span className="dayAgo"> 5 Days Ago</span></td>
                                                                        <td><span class="badge text-bg-green">ACTIVE</span></td>
                                                                        <td>$127.6</td>
                                                                        <td>Bank Transfer</td>
                                                                        <td>
                                                                            <div class="btn-group dropstart table-action">
                                                                                <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                    <span></span>
                                                                                </button>
                                                                                <ul class="dropdown-menu">
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M17.1944 6.6607L17.2136 6.65046L17.1483 6.48452C15.7899 3.03162 12.6041 0.8 9.00005 0.8C5.39652 0.8 2.2113 3.03092 0.852397 6.48289C0.78258 6.65282 0.782532 6.84559 0.852259 7.01555C1.72943 9.25731 3.39878 11.022 5.56904 11.9673C6.67312 12.467 7.82889 12.6988 9.00005 12.6988C10.1202 12.6988 11.2238 12.4847 12.2923 12.0388L12.2933 12.0384C14.4808 11.1113 16.2528 9.29455 17.1478 7.0158C17.194 6.90306 17.2095 6.78025 17.1944 6.6607ZM6.13341 10.6426C4.39015 9.89084 3.0433 8.51321 2.28191 6.74908C3.46292 3.99149 6.08018 2.24535 9.00005 2.24535C11.9192 2.24535 14.5369 4.00788 15.7182 6.74963C14.9556 8.52857 13.5136 9.95668 11.7709 10.6927L11.7675 10.6941C9.94954 11.4568 7.93628 11.4399 6.13511 10.6433L6.13341 10.6426Z" fill="" stroke="" stroke-width="0.4" />
                                                                                                <path d="M9.00036 3.48359C7.25064 3.48359 5.83772 4.95598 5.83772 6.7499C5.83772 8.54382 7.25061 10.0162 9.00036 10.0162C10.7501 10.0162 12.163 8.54382 12.163 6.7499C12.163 4.95598 10.7501 3.48359 9.00036 3.48359ZM9.00036 8.57093C8.03991 8.57093 7.24766 7.76102 7.24766 6.7499C7.24766 5.73879 8.03991 4.92887 9.00036 4.92887C9.96081 4.92887 10.7531 5.73879 10.7531 6.7499C10.7531 7.76102 9.96081 8.57093 9.00036 8.57093Z" fill="" stroke="" stroke-width="0.4" />
                                                                                            </svg>
                                                                                            View Map
                                                                                        </a>
                                                                                    </li>
                                                                                    <li>
                                                                                        <a href="#" className="dropdown-item">
                                                                                            <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M9.77666 0.895528C9.65954 0.911037 9.54812 0.966745 9.46537 1.05111L0.532926 9.98323C0.453644 10.0624 0.400294 10.1671 0.382799 10.2778L0.00489416 12.6679C-0.0443624 12.998 0.286659 13.3261 0.616314 13.2737L3.00641 12.9012C3.11708 12.8839 3.22179 12.8304 3.30095 12.7511L12.2277 3.81898C12.4259 3.62133 12.4259 3.26066 12.2277 3.06301L10.2155 1.05082C10.0609 0.893127 9.93397 0.885929 9.77641 0.895236L9.77666 0.895528ZM9.84341 2.18513L11.0996 3.44135L2.66744 11.8732L1.17787 12.1067L1.41137 10.6171L9.84341 2.18513ZM5.51361 12.2124C5.21894 12.2124 4.97997 12.4512 4.97997 12.746C4.97997 13.0407 5.21893 13.2797 5.51361 13.2797H15.4742C15.7689 13.2797 16.0078 13.0407 16.0078 12.746C16.0078 12.4514 15.7689 12.2124 15.4742 12.2124H5.51361Z" fill="" fill-opacity="0.8" />
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
                                    </div>
                                    <div class="tab-pane fade" id="make-Payment-tab-pane" role="tabpanel" aria-labelledby="order-tab" tabindex="0">
                                        <div className="row">
                                            <div className="col-sm-12 col-xxl-11">
                                                <div className="row">
                                                    <div className="col-lg-8 mb-3 mb-lg-0">
                                                        <div className="card user-card height-100">
                                                            <div className="card-header">{t("retailer.account_payable.make_payment")}</div>
                                                            <div className="card-body">
                                                                <div className="paymentMethod p-2">
                                                                    <div className="paymentMethodList d-flex align-items-center  gap-3 mb-3">
                                                                        <div className="label">{t("retailer.account_payable.state")}State</div>
                                                                        <div className="disCreption"><span className="badge text-bg-red border-bg-red rounded-pill">{t("retailer.account_payable.overdue")}Overdue</span></div>
                                                                    </div>
                                                                    <div className="paymentMethodList d-flex align-items-center  gap-3 mb-3">
                                                                        <div className="label">{t("retailer.account_payable.supplier")}</div>
                                                                        <div className="disCreption">
                                                                            <div class="w-100 dropdown">
                                                                                <button class="btn btn-outline-black btn-sm  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                    Pie Braque Microbrassiee
                                                                                </button>
                                                                                <ul class="dropdown-menu">
                                                                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                                                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                                                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                                                                </ul>
                                                                            </div>
                                                                            <div className="row mt-3">
                                                                                <div className="col-sm-6 col-12 mb-3 pe-sm-0">
                                                                                    <div className="prodOtherInfo h-100">
                                                                                        <div className="badge text-bg-light OtherInfo-in  w-100">
                                                                                            <div className="name">{t("retailer.account_payable.address")}</div>
                                                                                            <div className="discreption-In">
                                                                                                2972 Westheimer Rd. Santa Ana, Illinois 85486
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-6 col-12 mb-3 pe-sm-0">
                                                                                    <div className="prodOtherInfo h-100">
                                                                                        <div className="badge text-bg-light OtherInfo-in w-100">
                                                                                            <div className="name">Contact</div>
                                                                                            <div className="discreption-In">
                                                                                                nathan.roberts@example.com
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-2 col-6 mb-3 pe-xl-0">
                                                                                    <div className="prodOtherInfo h-100">
                                                                                        <div className="badge text-bg-light OtherInfo-in w-100">
                                                                                            <div className="name">Due</div>
                                                                                            <div className="discreption-In price">
                                                                                                $123
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-4 col-6 mb-3 pe-xl-0">
                                                                                    <div className="prodOtherInfo h-100">
                                                                                        <div className="badge text-bg-light OtherInfo-in w-100">
                                                                                            <div className="name">Balance</div>
                                                                                            <div className="discreption-In price">
                                                                                                $123
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-6 col-12 mb-3 pe-xl-0">
                                                                                    <div className="prodOtherInfo h-100">
                                                                                        <div className="badge text-bg-light OtherInfo-in w-100">
                                                                                            <div className="name">{t("retailer.account_payable.fee_on_due_amount")}</div>
                                                                                            <div className="discreption-In">
                                                                                                0%
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="paymentMethodList d-flex align-items-center  gap-3 mb-3">
                                                                        <div className="label">{t("retailer.account_payable.payment_method")}</div>
                                                                        <div className="disCreption">{t("retailer.account_payable.not_accepting_online")}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="card cartTotalBox">
                                                            <div className="card-body p-4">
                                                                <div class="prodDetailActions">
                                                                    <div class="actionBoxIn">
                                                                        <div class="badge text-bg-light OtherInfo-in">
                                                                            <label>Total Price to pay</label>
                                                                            <div class="price-box">$178.89</div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="actionBoxIn w-100 ctaBox gap-2 text-center">
                                                                        <a href="#" class="btn btn-purple d-inline-block w-100" data-bs-target="#orderPlacedModal" data-bs-toggle="modal">Pay $123.34</a>
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
        </div>
    )
}

export default AccountPayable;