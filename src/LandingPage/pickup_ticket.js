import React, { useEffect, useRef, useState } from "react";  
import './assets/fonts/stylesheet.css'
import './assets/scss/main.css'
import logo from './assets/images/logo.svg' 
import privacy_policy_bg from "./assets/images/privacy-policy_bg.jpg"; 
import { borderRadius, fontSize } from "@mui/system";
const PickUpTicket = () =>{
    const DownloadForm = useRef(null);
    function printFunction(){
        window.print();
    }

     return(
         <>
        <div className="body">
                <div class="mainBox">
                    <div class="BannerImg">
                        <img src={privacy_policy_bg} alt="HomeGiF" loading="lazy" />
                    </div>
                    <div class="container-fluid alignPadding h-100" style={{ padding:'0px'}}>
                        <div class="col-xl-12 col-lg-12 col-md-12"> 
                            <div class="contentBx mt-0">
                                 <div className="DebitAgreementDetail mb-2" ref={DownloadForm} style={{minWidth:'1000px'}}>
                                    <div className=" table-responsive">
                                        <table class="table table-white table-borderless">
                                            <tbody>
                                                <tr>
                                                    <td colSpan={3} className="text-center text-purpal"><h5>&nbsp; Pick Up Tickets</h5></td>
                                                </tr>
                                                <tr>
                                                    <td className="text-red text-purpal w-30" style={{width:'40%;'}}>Collection menifest by transport - on-site Consumption #1957</td>
                                                    <td className="text-center w-40" style={{padding:'20px'}}><a href="/"><img src={logo} alt="logo" style={{width:'100px', filter:'contrast(0.6)'}}/></a></td>
                                                    <td className="w-30 text-purpal text-end"><b>Route : </b> Mauricie  </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                         <table class="table table-white table-bordered pageBreak" style={{background:'#fff', borderRadius:'10px', overflow:'hidden', marginBlockEnd:'30px'}}>
                                            <thead>
                                                 <tr>
                                                     <th>
                                                         <h3 className="transportNumber" style={{marginBlockEnd:'0', fontSize:'24px', padding:'10'}}> Transport No 1</h3>
                                                     </th>
                                                </tr>
                                             </thead>
                                             <tbody>
                                                 <tr>
                                                     <td colSpan={3} style={{borderBottom:'1px solid #9370DB'}}>
                                                         <h5 style={{fontSize:'17px', paddingInlineStart:'15px', margin: '0'}}>Driver Name : Viking</h5>
                                                     </td>
                                                 </tr>
                                                 <tr>
                                                     <td colSpan={3}>
                                                         <table className="table table-striped">
                                                             <thead>
                                                                 <tr>
                                                                    <th>Sr. No</th>
                                                                    <th>Order No</th>
                                                                    <th>Retailer Name</th>
                                                                    <th>Product Name</th>
                                                                    <th>Batch Number</th>
                                                                    <th>Aisle Name</th>
                                                                    <th>Shelf Name</th>
                                                                    <th>Shipped Quantity</th>
                                                                    <th>Order Position</th>
                                                                </tr>
                                                             </thead>
                                                             <tbody>
                                                                 <tr>
                                                                    <td className="text-dark">1</td>
                                                                    <td className="text-dark">1772279068904603</td>
                                                                    <td className="text-dark">Aditya Aman</td>
                                                                    <td className="text-dark">demo </td>
                                                                    <td className="text-dark">103</td>
                                                                    <td className="text-dark">A2</td>
                                                                    <td className="text-dark">S4</td>
                                                                    <td className="text-dark">1</td>
                                                                    <td className="text-dark">3</td>
                                                                 </tr>
                                                                 <tr>
                                                                    <td className="text-dark">1</td>
                                                                    <td className="text-dark">1772279068904603</td>
                                                                    <td className="text-dark">Aditya Aman</td>
                                                                    <td className="text-dark">demo </td>
                                                                    <td className="text-dark">103</td>
                                                                    <td className="text-dark">A2</td>
                                                                    <td className="text-dark">S4</td>
                                                                    <td className="text-dark">1</td>
                                                                    <td className="text-dark">3</td>
                                                                 </tr>
                                                                 <tr>
                                                                    <td className="text-dark">1</td>
                                                                    <td className="text-dark">1772279068904603</td>
                                                                    <td className="text-dark">Aditya Aman</td>
                                                                    <td className="text-dark">demo </td>
                                                                    <td className="text-dark">103</td>
                                                                    <td className="text-dark">A2</td>
                                                                    <td className="text-dark">S4</td>
                                                                    <td className="text-dark">1</td>
                                                                    <td className="text-dark">3</td>
                                                                 </tr>
                                                               
                                                             </tbody>
                                                         </table>
                                                     </td>
                                                 </tr>
                                                 
                                            </tbody>
                                         </table>
                                         <table class="table table-white table-bordered pageBreak" style={{background:'#fff', borderRadius:'10px', overflow:'hidden', marginBlockEnd:'30px'}}>
                                            <thead>
                                                 <tr>
                                                     <th>
                                                         <h3 className="transportNumber" style={{marginBlockEnd:'0', fontSize:'24px', padding:'10'}}> Transport No 2</h3>
                                                     </th>
                                                </tr>
                                             </thead>
                                             <tbody>
                                                 <tr>
                                                     <td colSpan={3} style={{borderBottom:'1px solid #9370DB'}}>
                                                         <h5 style={{fontSize:'17px', paddingInlineStart:'15px', margin: '0'}}>Driver Name : Viking</h5>
                                                     </td>
                                                 </tr>
                                                 <tr>
                                                     <td colSpan={3}>
                                                         <table className="table table-striped">
                                                             <thead>
                                                                 <tr>
                                                                    <th>Sr. No</th>
                                                                    <th>Order No</th>
                                                                    <th>Retailer Name</th>
                                                                    <th>Product Name</th>
                                                                    <th>Batch Number</th>
                                                                    <th>Aisle Name</th>
                                                                    <th>Shelf Name</th>
                                                                    <th>Shipped Quantity</th>
                                                                    <th>Order Position</th>
                                                                </tr>
                                                             </thead>
                                                             <tbody>
                                                                 <tr>
                                                                    <td className="text-dark">1</td>
                                                                    <td className="text-dark">1772279068904603</td>
                                                                    <td className="text-dark">Aditya Aman</td>
                                                                    <td className="text-dark">demo </td>
                                                                    <td className="text-dark">103</td>
                                                                    <td className="text-dark">A2</td>
                                                                    <td className="text-dark">S4</td>
                                                                    <td className="text-dark">1</td>
                                                                    <td className="text-dark">3</td>
                                                                 </tr>
                                                                 <tr>
                                                                    <td className="text-dark">1</td>
                                                                    <td className="text-dark">1772279068904603</td>
                                                                    <td className="text-dark">Aditya Aman</td>
                                                                    <td className="text-dark">demo </td>
                                                                    <td className="text-dark">103</td>
                                                                    <td className="text-dark">A2</td>
                                                                    <td className="text-dark">S4</td>
                                                                    <td className="text-dark">1</td>
                                                                    <td className="text-dark">3</td>
                                                                 </tr>
                                                                 <tr>
                                                                    <td className="text-dark">1</td>
                                                                    <td className="text-dark">1772279068904603</td>
                                                                    <td className="text-dark">Aditya Aman</td>
                                                                    <td className="text-dark">demo </td>
                                                                    <td className="text-dark">103</td>
                                                                    <td className="text-dark">A2</td>
                                                                    <td className="text-dark">S4</td>
                                                                    <td className="text-dark">1</td>
                                                                    <td className="text-dark">3</td>
                                                                 </tr>
                                                             </tbody>
                                                         </table>
                                                     </td>
                                                 </tr>
                                                 
                                            </tbody>
                                         </table>
                                         <table class="table table-white table-bordered " style={{background:'#fff', borderRadius:'10px', overflow:'hidden', marginBlockEnd:'30px'}}>
                                            <thead>
                                                 <tr>
                                                     <th>
                                                         <h3 className="transportNumber" style={{marginBlockEnd:'0', fontSize:'24px', padding:'10'}}> Transport No 3</h3>
                                                     </th>
                                                </tr>
                                             </thead>
                                             <tbody>
                                                 <tr>
                                                     <td colSpan={3} style={{borderBottom:'1px solid #9370DB'}}>
                                                         <h5 style={{fontSize:'17px', paddingInlineStart:'15px', margin: '0'}}>Driver Name : Viking</h5>
                                                     </td>
                                                 </tr>
                                                 <tr>
                                                     <td colSpan={3}>
                                                         <table className="table table-striped">
                                                             <thead>
                                                                 <tr>
                                                                    <th>Sr. No</th>
                                                                    <th>Order No</th>
                                                                    <th>Retailer Name</th>
                                                                    <th>Product Name</th>
                                                                    <th>Batch Number</th>
                                                                    <th>Aisle Name</th>
                                                                    <th>Shelf Name</th>
                                                                    <th>Shipped Quantity</th>
                                                                    <th>Order Position</th>
                                                                </tr>
                                                             </thead>
                                                             <tbody>
                                                                 <tr>
                                                                    <td className="text-dark">1</td>
                                                                    <td className="text-dark">1772279068904603</td>
                                                                    <td className="text-dark">Aditya Aman</td>
                                                                    <td className="text-dark">demo </td>
                                                                    <td className="text-dark">103</td>
                                                                    <td className="text-dark">A2</td>
                                                                    <td className="text-dark">S4</td>
                                                                    <td className="text-dark">1</td>
                                                                    <td className="text-dark">3</td>
                                                                 </tr>
                                                                 <tr>
                                                                    <td className="text-dark">1</td>
                                                                    <td className="text-dark">1772279068904603</td>
                                                                    <td className="text-dark">Aditya Aman</td>
                                                                    <td className="text-dark">demo </td>
                                                                    <td className="text-dark">103</td>
                                                                    <td className="text-dark">A2</td>
                                                                    <td className="text-dark">S4</td>
                                                                    <td className="text-dark">1</td>
                                                                    <td className="text-dark">3</td>
                                                                 </tr>
                                                                 <tr>
                                                                    <td className="text-dark">1</td>
                                                                    <td className="text-dark">1772279068904603</td>
                                                                    <td className="text-dark">Aditya Aman</td>
                                                                    <td className="text-dark">demo </td>
                                                                    <td className="text-dark">103</td>
                                                                    <td className="text-dark">A2</td>
                                                                    <td className="text-dark">S4</td>
                                                                    <td className="text-dark">1</td>
                                                                    <td className="text-dark">3</td>
                                                                 </tr>
                                                             </tbody>
                                                         </table>
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

            </div>
        </>
    )
}
export default PickUpTicket;
