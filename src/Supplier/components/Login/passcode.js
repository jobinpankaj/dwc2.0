import React, {useEffect, useState} from "react"
import logo from "../../assets/images/logo.svg"
import {useNavigate, useLocation} from 'react-router-dom'
import OtpField from 'react-otp-field';
import apis from "../../../utils/apis"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoginLeftSidebar from "../../../CommonComponents/LoginLeftSidebar/LoginLeftSidebar";
toast.configure()

const PassCode = () => {
    const accessToken = localStorage.getItem("tempToken")
    const otp_required = localStorage.getItem("verifyOtp")
    const navigate = useNavigate()
    const [qrResult, setQrResult] = useState("")
    const [hashCode, setHashCode] = useState("")
    const [value, setValue] = useState('');
    const [disable, setDisable] = useState(true)

    const handleOtpSubmit = () => {
        const config = {
            params : {
                otp : value
            },
            headers : {
                Authorization : `Bearer ${accessToken}`
            }
        }
       apis.get("/validateOtp", config)
       .then((res) => {
            if(res.data.success === true){
                localStorage.removeItem("tempToken")
                localStorage.removeItem("verifyOtp")
                localStorage.setItem("accessToken", accessToken)
                navigate("/dashboard")
            }
            else{
                toast.error(res.data.message, {autoClose : 3000, position : toast.POSITION.TOP_CENTER})
            }
       })
       .catch((error) => {
        if(error.message !== "revoke"){
            toast.error(error.response.data.data.error, {autoClose : 3000, position : toast.POSITION.TOP_CENTER})
        }
       })
    }

    useEffect(() => {
        if(!accessToken){
            navigate("/")
        }
        else if(accessToken){
            const config = {
                headers : {
                    Authorization : `Bearer ${accessToken}`
                }
            }
            apis.get(`/getQrCodeImage`, config)
            .then((res) => {
                const qr_image = atob(res.data.data.qrcode_image)
                setQrResult(qr_image)
                setHashCode(res.data.data.secret)
            })
            .catch((error) => {
                console.log(error)
            })
        }
        
    }, [])

    useEffect(() => {
        if(value.length === 6){
            setDisable(false)
        }
        else{
            setDisable(true)
        }
    }, [value])
    return(
        <div class="page-wrap">
        <div class="container-fluid p-2">
            <div class="row m-0 login-setup">
            <LoginLeftSidebar />
                <div class="col-sm-8 login-setup-right">
                    <div class="form-box col col-sm-12 col-md-10 col-lg-8">
                        <h3>Scan QR Code</h3>
                        <p class="sub-head">Please scan the below QR code using <span class="highlight-purple">Google Authenticator App</span></p>
                        <hr/>
                        
                        <div id="qr-holder">
                        <div dangerouslySetInnerHTML={{ __html: qrResult }} />
                        </div>
                        <p>Or enter the secret code : <span class="highlight-purple">{hashCode}</span></p>

                        <h3>Enter Passcode</h3>
                        {/* <p class="sub-head">We sent a verification code to <span class="highlight-purple">abc@gmail.com</span></p> */}
                        <hr/>
                        <form>
                            <div class="row mt-4 mb-3 mx-0">
                                <OtpField
                                    value={value}
                                    onChange={setValue}
                                    numInputs={6}
                                    onChangeRegex={/^([0-9]{0,})$/}
                                    autoFocus
                                    separator={<span>-</span>}
                                    isTypeNumber
                                    inputProps={{ className: 'form-control', type: "text", disabled: false }}
                                />
                            </div>
                            <div class="row mb-5">
                                {/* <div class="col resendOtp">
                                    Didn't Receive OTP? 
                                    <a href="forgot-password.html">Resend</a>
                                </div> */}
                            </div>
                            <button type="button" class="btn btn-purple" disabled = {disable} onClick={() => handleOtpSubmit()}>Submit</button>
                        </form>     
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default PassCode;