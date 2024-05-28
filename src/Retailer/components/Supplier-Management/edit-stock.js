import React from "react";
import filter from "../../assets/images/filter-icon.png"

import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";

import '../../assets/scss/dashboard.scss';

const EditStock = () => {
    return(
        <div class="container-fluid page-wrap inventory-manage">
        <div class="row height-inherit">

            <Sidebar />

            <div class="col main p-0">
                <Header  title="Product-1 "/>
                <div class="container-fluid page-content-box px-3 px-sm-4">
                    <div class="row">
                        <div class="col">
                            <div class="tab-link-row position-relative">

                                <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                                    <li class="nav-item" role="presentation">
                                      <button class="nav-link active" id="stock-tab" data-bs-toggle="tab" data-bs-target="#stock-tab-pane" type="button" role="tab" aria-controls="stock-tab-pane" aria-selected="true">Stock</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                      <button class="nav-link" id="transfer-tab" data-bs-toggle="tab" data-bs-target="#history-tab-pane" type="button" role="tab" aria-controls="history-tab-pane" aria-selected="false">History</button>
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
                                    <form>
                                        {/* [Card] */}
                                        <div className="card mb-4">
                                            <div className="card-body">
                                                
                                                    <div className="row">
                                                        <div className="col mb-3">
                                                            <label className="form-label">UPC</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                        <div className="col">
                                                            <label className="form-label">SKU</label>
                                                            <input type="text" className="form-control" />
                                                        </div>
                                                        <div className="w-100"></div>
                                                        <div className="col">
                                                            <label className="form-label">Description</label>
                                                            <textarea className="form-control" placeholder="Add note here...."></textarea>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                        {/* [/Card] */}
                                        
                                        {/* [Card] */}
                                        <div className="card mb-4">
                                            <div className="card-body p-0">
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="table-responsive">
                                                        <table className="table table-striped m-0">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Warehouse</th>
                                                                        <th>IN TRANSIT TO THE WAREHOUSE</th>
                                                                        <th>AT WAREHOUSE</th>
                                                                        <th>DELIVERY</th>
                                                                        <th>TOTAL</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>Producer-1</td>
                                                                        <td>N/A</td>
                                                                        <td>34</td>
                                                                        <td>N/A</td>
                                                                        <td>31</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Distributor-1</td>
                                                                        <td>0</td>
                                                                        <td>0</td>
                                                                        <td>0</td>
                                                                        <td>0</td>
                                                                    </tr>
                                                                </tbody>
                                                                <tfoot>
                                                                    <tr>
                                                                        <td>Total</td>
                                                                        <td>0</td>
                                                                        <td>34</td>
                                                                        <td>0</td>
                                                                        <td>34</td>
                                                                    </tr>
                                                                </tfoot>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* [/Card] */}
                                        
                                        <div className="mb-3 hstack gap-3">
                                            <button className="btn btn-purple">Cancel</button>
                                            <button className="btn btn-outline-black">Hide</button>
                                            <button className="btn btn-outline-black">Save</button>
                                        </div>

                                    </form>
                                </div>



                                <div class="tab-pane fade" id="history-tab-pane" role="tabpanel" aria-labelledby="history-tab" tabindex="0">
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
                                                    </div>                          
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="table-responsive">
                                                    <table className="table table-striped m-0">
                                                            <thead>
                                                                <tr>
                                                                    <th>reason</th>
                                                                    <th>DATE</th>
                                                                    <th>Created By</th>
                                                                    <th>QUANTITY</th>
                                                                    <th>NEW STOCK</th>
                                                                    <th>STATE</th>
                                                                    <th>LOT NO.</th>
                                                                    <th>LOT DATE</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>Product-1</td>
                                                                    <td>31 Dec, 2022</td>
                                                                    <td>bill.sanders@example.com</td>
                                                                    <td>12</td>
                                                                    <td>Product</td>
                                                                    <td>Product</td>
                                                                    <td>Product</td>
                                                                    <td>Product</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Product-1</td>
                                                                    <td>31 Dec, 2022</td>
                                                                    <td>bill.sanders@example.com</td>
                                                                    <td>12</td>
                                                                    <td>Product</td>
                                                                    <td>Product</td>
                                                                    <td>Product</td>
                                                                    <td>Product</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Product-1</td>
                                                                    <td>31 Dec, 2022</td>
                                                                    <td>bill.sanders@example.com</td>
                                                                    <td>12</td>
                                                                    <td>Product</td>
                                                                    <td>Product</td>
                                                                    <td>Product</td>
                                                                    <td>Product</td>
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

export default EditStock;