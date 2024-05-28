import React from "react";
import filter from "../../assets/images/filter-icon.png"

import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";

import '../../assets/scss/dashboard.scss';

const ProductManagement = () => {
    return(
        <div class="container-fluid page-wrap product-manage">
        <div class="row height-inherit">

        <Sidebar userType={"retailer"} />

            <div class="col main p-0">
                <Header  title="Products"/>
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
                                <div class="dropdown right-filter">
                                    <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                        <img src={filter} alt=""/> Filter
                                    </button>
                                    <form class="dropdown-menu p-3 ">
                                        <div class="mb-3">
                                            <label class="form-label">Producer</label>
                                            <select className="form-select">
                                                <option selected disabled>Choose Producer</option>
                                            </select>
                                        </div>
                                        
                                        <div className="d-flex justify-content-end">
                                            <button type="submit" class="btn btn-purple width-auto me-2">Apply</button>
                                            <button type="reset" class="btn btn-outline-black width-auto">Reset</button>
                                        </div>                                       
                                    </form>
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
                                                                    <th>Product</th>
                                                                    <th>Producer</th>
                                                                    <th>Format</th>
                                                                    <th>Category</th>
                                                                    <th>Date</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>Product-1</td>
                                                                    <td>Producer-1</td>
                                                                    <td>Bottle Sour 500ml x 12</td>
                                                                    <td>Beer</td>
                                                                    <td>31 Dec, 2022</td>
                                                                    <td>
                                                                        <div class="btn-group dropstart table-action">
                                                                            <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                <span></span>
                                                                            </button>
                                                                            <ul class="dropdown-menu">
                                                                                <li>
                                                                                    <a href="/product-detail" className="dropdown-item">Edit</a>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Product-1</td>
                                                                    <td>Producer-1</td>
                                                                    <td>Bottle Sour 500ml x 12</td>
                                                                    <td>Beer</td>
                                                                    <td>31 Dec, 2022</td>
                                                                    <td>
                                                                        <div class="btn-group dropstart table-action">
                                                                            <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                <span></span>
                                                                            </button>
                                                                            <ul class="dropdown-menu">
                                                                                <li>
                                                                                    <a href="/product-detail" className="dropdown-item">Edit</a>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Product-1</td>
                                                                    <td>Producer-1</td>
                                                                    <td>Bottle Sour 500ml x 12</td>
                                                                    <td>Beer</td>
                                                                    <td>31 Dec, 2022</td>
                                                                    <td>
                                                                        <div class="btn-group dropstart table-action">
                                                                            <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                <span></span>
                                                                            </button>
                                                                            <ul class="dropdown-menu">
                                                                                <li>
                                                                                    <a href="/product-detail" className="dropdown-item">Edit</a>
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
    </div>
    )
}

export default ProductManagement;