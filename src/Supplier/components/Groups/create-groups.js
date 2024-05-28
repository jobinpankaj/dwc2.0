import React, {useState} from "react"; 
import { toast } from "react-toastify";
import NumericInput from "react-numeric-input";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import '../../assets/scss/dashboard.scss'
import useAuthInterceptor from "../../../utils/apis";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import { NavLink } from "react-router-dom";

toast.configure();

const SupplierCreateGroup = () => {
    const { t } = useTranslation();
    const token = localStorage.getItem("supplier_accessToken")
    const navigate = useNavigate()
    const apis = useAuthInterceptor()
    const [groupName, setGroupName] = useState("")
    const [colour, setColour] = useState("")
    const [message, setMessage] = useState("")
    const [note, setNote] = useState("")
    const [tax, setTax] = useState("")
    const [bill, setBill] = useState("")
    const [approval, setApproval] = useState("")
    const [isCount, setIsCount] = useState(false)
    const [minItem, setMinItem] = useState(1)
    const [minKeg, setMinKeg] = useState(1)
    const [isValue, setIsValue] = useState(false)
    const [payment, setPayment] = useState(false)
    const [minPrice, setMinPrice] = useState(1)
    const [online, setOnline] = useState("")
    const [offline, setOffline] = useState("")
    const [groupError, setGroupError] = useState("")
    const [colourError, setColourError] = useState("")
    const [messageError, setMessageError] = useState("")
    const [noteError, setNoteError] = useState("")
    const [taxError, setTaxError] = useState("")
    const [billError, setBillError] = useState("")
    const [approvalError, setApprovalError] = useState("")
    const [offlineError, setOfflineError] = useState("")
    const [onlineError, setOnlineError] = useState("")

    const createGroup = () => {
        let groupValid = true, colorValid = true, messageValid = true, noteValid = true, taxValid = true, depositValid = true, approvalValid = true, itemValid = true, kegValid = true, priceValid = true, onlineValid = true, offlineValid = true;

        if(groupName === ""){
            setGroupError("Group name is required.")
            groupValid = false
        }

        if(colour === ""){
            setColourError("Colour selection is required.")
            colorValid = false
        }

        if(message === ""){
            setMessageError("Message is required.")
            messageValid = false
        }

        if(note === ""){
            setNoteError("Note is required.")
            noteValid = false
        }

        if(tax === ""){
            setTaxError("Please select one option.")
            taxValid = false
        }

        if(bill === ""){
            setBillError("Please select one option.")
            depositValid = false
        }

        if(approval === ""){
            setApprovalError("Please select one option.")
            approvalValid = false
        }

        if(payment && offline === ""){
            setOfflineError("Please select one option.")
            offlineValid = false
        }

        if(payment && online === ""){
            setOnlineError("Please select one option.")
            onlineValid = false
        }

        if(!groupValid || !colorValid || !messageValid || !noteValid || !taxValid || !depositValid || !approvalValid || !offlineValid || !onlineValid){
            console.log("Validation error.")
        }else{
            const config = {
                headers : {
                    Authorization : `Bearer ${token}`,
                    permission : "groups-edit"
                }
            }
    
            const bodyData = {
                name: groupName, 
                color: colour,
                order_confirm_msg: message,
                order_default_note: note,
                tax_applicability: tax,
                bill_deposits: bill,
                order_approval: approval,
                is_min_order_count: isCount ? 1 : 0,
                order_confirm_msg_lang: 1,
                order_default_note_lang: 1,
                is_min_order_value: isValue ? 1 : 0,
                min_items: isCount ? minItem : "",
                min_kegs: isCount ? minKeg : "",
                min_price: isValue ? minPrice : "",
                is_accepted_payment : payment ? 1 : 0,
                online_payment: payment ? online : "",
                offline_payment: payment ? offline : ""
            }
    
            apis.post('/supplier/group/add', bodyData, config)
            .then((res) => {
                if(res.data.success === true){
                    toast.success("Group created successfully.", {autoClose: 2000, position: toast.POSITION.TOP_CENTER,});
                    navigate('/supplier/groups-management')
                }else{
                    toast.error("Could not create group. Please try again later.", {autoClose: 2000, position: toast.POSITION.TOP_CENTER,});
                }
            })
            .catch((error) => {
                if(error.message !== "revoke"){
                    toast.error("Could not create group. Please try again later.", {autoClose: 2000, position: toast.POSITION.TOP_CENTER,});
                }
            })
        }
        
    }

    return(
        <div className="container-fluid page-wrap order-manage product-detail">
            <div className="row height-inherit">
                <Sidebar userType={"supplier"}/>
                <div className="col main p-0">
                    <Header title="Create Group"/>
                    <div className="container-fluid page-content-box px-3 px-sm-4">
                        <div class="row">
                            <div class="col-12 mb-3">
                                <form>
                                <div class="card user-card mb-3">
                                    <div class="card-body p-4">
                                        <div class="row">
                                            <div class="col-sm-8 col-12">
                                                
                                                    <div class="mb-3">
                                                        <label class="form-label">{t("supplier.inventory_management.list.grpName")}</label>
                                                        <input type="text" class="form-control" placeholder="Enter Group Name" value={groupName} onChange={(e) => {setGroupName(e.target.value); setGroupError("")}}/>
                                                        {groupError !== "" ? (<p className="error-label"> {groupError}</p>) : (<></>)}
                                                    </div>
                                                    <div class="mb-3">
                                                        <label class="form-label">{t("supplier.inventory_management.list.chooseColor")}</label>
                                                        <div className="input-group" onChange={(e) => {setColour(e.target.value); setColourError("")}}>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input purpal" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="purple" checked = {colour === "purple"}/> 
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input blue" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="blue" checked = {colour === "blue"}/> 
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input yellow" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="yellow" checked = {colour === "yellow"}/> 
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input pink" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="pink" checked = {colour === "pink"}/> 
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input green" type="radio" name="inlineRadioOptions" id="inlineRadio5" value="green" checked = {colour === "green"}/> 
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input red" type="radio" name="inlineRadioOptions" id="inlineRadio6" value="red" checked = {colour === "red"}/> 
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input orange" type="radio" name="inlineRadioOptions" id="inlineRadio7" value="orange" checked = {colour === "orange"}/> 
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input brown" type="radio" name="inlineRadioOptions" id="inlineRadio8" value="brown" checked = {colour === "brown"}/> 
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input spring" type="radio" name="inlineRadioOptions" id="inlineRadio9" value="spring" checked = {colour === "spring"}/> 
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input cyan" type="radio" name="inlineRadioOptions" id="inlineRadio10" value="cyan" checked = {colour === "cyan"}/> 
                                                            </div>
                                                        </div>
                                                        {colourError !== "" ? (<p className="error-label"> {colourError}</p>) : (<></>)}
                                                    </div>
                                                    <div class="mb-3">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <label className="form-label">{t("supplier.inventory_management.list.orderConfMess")}*</label>
                                                            {/* <div class="form-check form-switch d-flex align-items-center">
                                                                <label class="form-check-label" for="flexSwitchCheck2">En</label>
                                                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheck2"/>
                                                                <label class="form-check-label" for="flexSwitchCheck2">Fr</label>
                                                            </div> */}
                                                        </div>
                                                        <textarea class="form-control" value={message} onChange={(e) => {setMessage(e.target.value); setMessageError("")}}></textarea> 
                                                        {messageError !== "" ? (<p className="error-label"> {messageError}</p>) : (<></>)}
                                                    </div> 
                                                    <div class="mb-3">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <label className="form-label">{t("supplier.inventory_management.list.orderDefaultNote")}*</label>
                                                            {/* <div class="form-check form-switch d-flex align-items-center">
                                                                <label class="form-check-label" for="flexSwitchCheck2">En</label>
                                                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheck2"/>
                                                                <label class="form-check-label" for="flexSwitchCheck2">Fr</label>
                                                            </div> */}
                                                        </div>
                                                        <textarea class="form-control" value={note} onChange={(e) => {setNote(e.target.value); setNoteError("")}}></textarea> 
                                                        {noteError !== "" ? (<p className="error-label"> {noteError}</p>) : (<></>)}
                                                    </div> 
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="card user-card mb-4">
                                    <div class="card-body p-4">
                                        <div class="row">
                                            <div class="col-sm-8 col-12"> 
                                                    <div class="mb-3 col-4">
                                                        <select class="form-select border-0 border-bottom rounded-0 ps-0" value={tax} onChange={(e) => {setTax(e.target.value); setTaxError("")}}>
                                                            <option value="">Tax Applicability</option>
                                                            <option value="Applicable">Applicable</option>
                                                            <option value="Not Applicable">Not Applicable</option>
                                                        </select>
                                                        {taxError !== "" ? (<p className="error-label"> {taxError}</p>) : (<></>)}
                                                    </div>
                                                    <div class="mb-3 col-4">
                                                        <select class="form-select border-0 border-bottom rounded-0 ps-0" value={bill} onChange={(e) => {setBill(e.target.value); setBillError("")}}>
                                                            <option value="">Bill Deposits</option>
                                                            <option value="Required">Required</option>
                                                            <option value="Not Required">Not Required</option>
                                                        </select>
                                                        {billError !== "" ? (<p className="error-label"> {billError}</p>) : (<></>)}
                                                    </div>
                                                    <div class="mb-3 col-4">
                                                        <select class="form-select border-0 border-bottom rounded-0 ps-0" value={approval} onChange={(e) => {setApproval(e.target.value); setApprovalError("")}}>
                                                            <option value="">Order Approval</option>
                                                            <option value="Automatic">Automatic</option>
                                                            <option value="Manual">Manual</option>
                                                        </select>
                                                        {approvalError !== "" ? (<p className="error-label"> {approvalError}</p>) : (<></>)}
                                                    </div>
                                                    <div className="mt-4"> 
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="checkbox" id="MaximumOrder" value={isCount} onChange={(e) => setIsCount(e.target.checked)}/>
                                                            <label class="form-check-label" for="MaximumOrder">{t("supplier.inventory_management.list.miniorderCoun")}</label>
                                                        </div>
                                                    </div>
                                                    {isCount ? <div class="d-flex mb-3" id="custom-flex">
                                                        <div id="payment-box">
                                                            <label className="form-label">Minimum number of items</label>
                                                            <NumericInput
                                                            className="form-control"
                                                            value={minItem}
                                                            min={1}
                                                            onChange={(e) => setMinItem(e)}
                                                            step={1}
                                                            precision={0}
                                                            size={5}
                                                            strict
                                                            />
                                                        </div>
                                                        
                                                        <div id="payment-box">
                                                            <label className="form-label">Minimum Kegs</label>
                                                            <NumericInput
                                                            className="form-control"
                                                            value={minKeg}
                                                            min={1}
                                                            onChange={(e) => setMinKeg(e)}
                                                            step={1}
                                                            precision={0}
                                                            size={5}
                                                            strict
                                                            />
                                                        </div>
                                                        
                                                    </div> : <></>}
                                                    <div> 
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="checkbox" id="MaximumOrder" value="option1" checked={isValue} onChange={(e) => setIsValue(e.target.checked)}/>
                                                            <label class="form-check-label" for="MaximumOrder">{t("supplier.inventory_management.list.miniOrderVal")}</label>
                                                        </div>
                                                    </div>                                                  
                                                    {isValue ? <div class="d-flex">
                                                        <div id="payment-box">
                                                            <label className="form-label">Minimum Price</label>
                                                            <NumericInput
                                                            className="form-control"
                                                            value={minPrice}
                                                            min={1}
                                                            onChange={(e) => setMinPrice(e)}
                                                            step={1}
                                                            precision={0}
                                                            size={5}
                                                            strict
                                                            />
                                                        </div>
                                                    </div> : <></>}
                                            </div>
                                        </div>
                                    </div>
                                </div> 

                                <div class="card user-card mb-4">
                                    <div class="card-body p-4">
                                        <div class="row">
                                        <div className="flex">
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" id="inlineCheckbox1" checked={payment} onChange={(e) => setPayment(e.target.checked)}/>
                                                <label class="form-check-label" for="inlineCheckbox1">{t("supplier.inventory_management.list.accepPayType")}</label>
                                            </div>
                                            {payment ? <div class="d-flex mt-3">
                                                <div id="payment-box">
                                                <label className="form-label">{t("supplier.inventory_management.list.forOffpayment")}</label>
                                                <select class="form-select btn btn-outline-black btn-sm w-auto pe-5 me-3 rounded-pill" value={offline} onChange={(e) => {setOffline(e.target.value); setOfflineError("")}}>
                                                    <option value="">Choose Payment Method</option>
                                                    <option value="Cheque">Cheque</option>
                                                    <option value="Cash">Cash</option>
                                                </select>
                                                {offlineError !== "" ? (<p className="error-label"> {offlineError}</p>) : (<></>)}
                                                </div>
                                                <div id="payment-box">
                                                <label className="form-label">{t("supplier.inventory_management.list.forOnlinePAy")}</label>
                                                <select class="form-select btn btn-outline-black btn-sm w-auto pe-5 me-3 rounded-pill" value={online} onChange={(e) => {setOnline(e.target.value); setOnlineError("")}}>
                                                    <option value="">Choose Payment Method</option>
                                                    <option value="Debit Card">Debit Card</option>
                                                    <option value="Credit Card">Credit Card</option>
                                                </select>
                                                {onlineError !== "" ? (<p className="error-label"> {onlineError}</p>) : (<></>)}
                                                </div>
                                            </div> : <></>}
                                        </div>
                                        </div>
                                    </div>
                                </div> 
                                
                                <div class="d-flex">
                                    <button type="button" class="btn btn-outline-black width-auto me-2" onClick={() => navigate('/supplier/groups-management')}>{t("supplier.product_management.add.close_btn")}</button>
                                    <button type="button" class="btn btn-purple width-auto" onClick={() => createGroup()}>Create</button>
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

export default SupplierCreateGroup;