import React from "react";
import filter from "../../assets/images/filter-icon.png"
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";

import '../../assets/scss/dashboard.scss';

const InventoryManagement = () => {
    return(
        <div class="container-fluid page-wrap inventory-manage">
        <div class="row height-inherit">

        <Sidebar userType={"retailer"} />
            <div class="col main p-0">
                <Header  title="Inventory"/>
                <div class="container-fluid page-content-box px-3 px-sm-4">
                    <div class="row">
                        <div class="col">
                            <div class="tab-link-row position-relative">

                                <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                                    <li class="nav-item" role="presentation">
                                      <button class="nav-link active" id="stock-tab" data-bs-toggle="tab" data-bs-target="#stock-tab-pane" type="button" role="tab" aria-controls="stock-tab-pane" aria-selected="true">Stock</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                      <button class="nav-link" id="transfer-tab" data-bs-toggle="tab" data-bs-target="#transfer-tab-pane" type="button" role="tab" aria-controls="transfer-tab-pane" aria-selected="false">Transfer</button>
                                    </li>
                                  </ul>

                                  <div class="filter-box position-abs">
                                      <div class="dropdown date-selector">
                                        <button class="btn btn-outline-black btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                           All Product
                                        </button>
                                        <ul class="dropdown-menu">
                                          <li><a class="dropdown-item" href="#">Visible Product</a></li>
                                          <li><a class="dropdown-item" href="#">Hidden Product</a></li>
                                          <li><a class="dropdown-item" href="#">All Products</a></li>
                                        </ul>
                                      </div>
                                  </div>

                            </div>

                              <div class="tab-content" id="myTabContent">

                                <div class="tab-pane fade show active" id="stock-tab-pane" role="tabpanel" aria-labelledby="stock-tab" tabindex="0">
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
                                        <img src={filter} /> Filter
                                    </button>
                                    <form class="dropdown-menu p-3 ">
                                        <div class="mb-3">
                                            <label class="form-label">Format</label>
                                            <select className="form-select">
                                                <option selected disabled>Select Format</option>
                                                <option value=''>Bottle</option>
                                                <option value=''>Can</option>
                                                <option value=''>Keg</option>
                                            </select>
                                        </div>
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
                                                                    <td>8502 Preston Rd. Inglewood, Maine 98380</td>
                                                                    <td>Beer</td>
                                                                    <td>31 Dec, 2022</td>
                                                                    <td>
                                                                        <div class="btn-group dropstart table-action">
                                                                            <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                <span></span>
                                                                            </button>
                                                                            <ul class="dropdown-menu">
                                                                                <li>
                                                                                    <a className="dropdown-item">View Map</a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="/edit-stock" className="dropdown-item">Edit</a>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Product-1</td>
                                                                    <td>Producer-1</td>
                                                                    <td>8502 Preston Rd. Inglewood, Maine 98380</td>
                                                                    <td>Beer</td>
                                                                    <td>31 Dec, 2022</td>
                                                                    <td>
                                                                        <div class="btn-group dropstart table-action">
                                                                            <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                <span></span>
                                                                            </button>
                                                                            <ul class="dropdown-menu">
                                                                                <li>
                                                                                    <a className="dropdown-item" >View Map</a>
                                                                                </li>
                                                                                <li>
                                                                                    <a className="dropdown-item" href="/edit-stock">Edit</a>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Product-1</td>
                                                                    <td>Producer-1</td>
                                                                    <td>8502 Preston Rd. Inglewood, Maine 98380</td>
                                                                    <td>Beer</td>
                                                                    <td>31 Dec, 2022</td>
                                                                    <td>
                                                                        <div class="btn-group dropstart table-action">
                                                                            <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                <span></span>
                                                                            </button>
                                                                            <ul class="dropdown-menu">
                                                                                <li>
                                                                                    <a className="dropdown-item">View Map</a>
                                                                                </li>
                                                                                <li>
                                                                                    <a className="dropdown-item" href="/edit-stock">Edit</a>
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



                                <div class="tab-pane fade" id="transfer-tab-pane" role="tabpanel" aria-labelledby="transfer-tab" tabindex="0">
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

                                                        {/* [Right Filter] */}
                                                <div className="filter-row text-end">
                                                    {/* [Page Filter Box] */}
                                                        <div className="filter-box">
                                                            <a href="/create-transfer" className="btn btn-purple btn-sm">+ Create New</a>
                                                            <div class="dropdown right-filter">
                                                                <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                                                    <img src={filter} /> Filter
                                                                </button>
                                                                <form class="dropdown-menu p-3 ">
                                                                    <div class="mb-3">
                                                                        <label class="form-label">Format</label>
                                                                        <select className="form-select">
                                                                            <option selected disabled>Select Format</option>
                                                                            <option value=''>Bottle</option>
                                                                            <option value=''>Can</option>
                                                                            <option value=''>Keg</option>
                                                                        </select>
                                                                    </div>
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
                                                                    <td>8502 Preston Rd. Inglewood, Maine 98380</td>
                                                                    <td>Beer</td>
                                                                    <td>31 Dec, 2022</td>
                                                                    <td>
                                                                        <div class="btn-group dropstart table-action">
                                                                            <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                <span></span>
                                                                            </button>
                                                                            <ul class="dropdown-menu">
                                                                                <li>
                                                                                    <a className="dropdown-item" href="/order-detail">View Map</a>
                                                                                </li>
                                                                                <li>
                                                                                    <a className="dropdown-item">Edit</a>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Product-1</td>
                                                                    <td>Producer-1</td>
                                                                    <td>8502 Preston Rd. Inglewood, Maine 98380</td>
                                                                    <td>Beer</td>
                                                                    <td>31 Dec, 2022</td>
                                                                    <td>
                                                                        <div class="btn-group dropstart table-action">
                                                                            <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                <span></span>
                                                                            </button>
                                                                            <ul class="dropdown-menu">
                                                                                <li>
                                                                                    <a className="dropdown-item" href="/order-detail">View Map</a>
                                                                                </li>
                                                                                <li>
                                                                                    <a className="dropdown-item">Edit</a>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Product-1</td>
                                                                    <td>Producer-1</td>
                                                                    <td>8502 Preston Rd. Inglewood, Maine 98380</td>
                                                                    <td>Beer</td>
                                                                    <td>31 Dec, 2022</td>
                                                                    <td>
                                                                        <div class="btn-group dropstart table-action">
                                                                            <button type="button" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                <span></span>
                                                                            </button>
                                                                            <ul class="dropdown-menu">
                                                                                <li>
                                                                                    <a className="dropdown-item" href="/order-detail">View Map</a>
                                                                                </li>
                                                                                <li>
                                                                                    <a className="dropdown-item">Edit</a>
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

        </div>
    </div>
    )
}

export default InventoryManagement;