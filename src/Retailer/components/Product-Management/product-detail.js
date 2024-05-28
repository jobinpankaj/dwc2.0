import React from "react";

import ProductImg from "../../assets/images/prod-img.png";

import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";

import '../../assets/scss/dashboard.scss';

const ProductDetail = () => {
    return(
        <div class="container-fluid page-wrap product-detail">
        <div class="row height-inherit">

        <Sidebar userType={"retailer"} />

            <div class="col main p-0">
                <Header  title="Product Detail"/>
                <div class="container-fluid page-content-box px-3 px-sm-4">
                    {/* [Card] */}
                    <div className="card height-100">
                        <div className="card-body p-4">
                            <div className="row">
                                <div className="col">
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label">Product Name</label>
                                            <input type="text" className="form-control" value="Darlene Robertson" />
                                        </div>
                                        <div className="mb-3">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <label className="form-label">Description</label>
                                                <div class="form-check form-switch d-flex align-items-center">
                                                    <label class="form-check-label" for="flexSwitchCheck1">En</label>
                                                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheck1"/>
                                                    <label class="form-check-label" for="flexSwitchCheck1">Fr</label>
                                                </div>
                                            </div>
                                            <textarea className="form-control" value="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco."></textarea>
                                        </div> 
                                        <div className="mb-3">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <label className="form-label">Public Description</label>
                                                <div class="form-check form-switch d-flex align-items-center">
                                                    <label class="form-check-label" for="flexSwitchCheck2">En</label>
                                                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheck2"/>
                                                    <label class="form-check-label" for="flexSwitchCheck2">Fr</label>
                                                </div>
                                            </div>
                                            <textarea className="form-control" value="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco."></textarea>
                                        </div>     
                                        <div className="row mb-3 mx-0">
                                            <div className="col-sm-6 px-0 ps-sm-0 pe-sm-3">
                                                <div className="mb-3">
                                                    <label className="form-label">Style</label>
                                                    <select className="form-select">
                                                        <option>Other</option>
                                                    </select>
                                                    <div class="form-check mt-2">
                                                        <input class="form-check-input me-2" type="checkbox" value="" id="organic"/>
                                                        <label class="form-check-label" for="organic">
                                                            Organic
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Subcategory</label>
                                                    <select className="form-select">
                                                        <option>Uncategorized</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Alcohol Percentage</label>
                                                    <input type="text" className="form-control" value="4.7%" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 px-0 pe-sm-0 ps-sm-3">
                                                <div className="mb-3 prodImg">
                                                    <label className="form-label">Product Image</label>
                                                    <div className="mb-3 prodImg">
                                                        <img src={ProductImg} className="img-fluid" alt=""/>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Lable" checked/>
                                                        <label class="form-check-label" for="inlineRadio1">Lable</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Image" />
                                                        <label class="form-check-label" for="inlineRadio2">Image</label>
                                                    </div>
                                                    <div class="form-check form-check-inline">
                                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="Main Visual" />
                                                        <label class="form-check-label" for="inlineCheckbox1">Main Visual</label>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>     
                                        <div className="mb-3">
                                            <button className="btn btn-purple ">Cancel</button>
                                        </div>                           
                                    </form> 
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* [/Card] */}
                </div>

            </div>

        </div>
    </div>
    )
}

export default ProductDetail; 