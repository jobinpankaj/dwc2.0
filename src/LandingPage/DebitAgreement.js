import React, { useEffect, useRef, useState } from "react";
import "./assets/fonts/stylesheet.css";
import "./assets/scss/main.css";
import logo from "./assets/images/logo.svg";
import privacy_policy_bg from "./assets/images/privacy-policy_bg.jpg";
const DebitAgreement = () => {
  const DownloadForm = useRef(null);
  function printFunction() {
    window.print();
  }

  return (
    <>
      <div className="body">
        <div class="mainBox">
          <div class="BannerImg">
            <img src={privacy_policy_bg} alt="HomeGiF" loading="lazy" />
          </div>
          <div
            class="container-fluid alignPadding h-100"
            style={{ padding: "0px" }}
          >
            <div class="col-xl-12 col-lg-12 col-md-12">
              <div class="contentBx mt-0">
                <div className="DebitAgreementDetail mb-2" ref={DownloadForm}>
                  <div className=" table-responsive">
                    <table class="table table-white table-borderless">
                      <thead>
                        <tr>
                          <td colSpan={3} className="text-center text-purpal">
                            <h5>
                              &nbsp; DEBIT AGREEMENT - PRE-AUTHORIZATION TO
                            </h5>
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="text-red text-purpal w-30"
                            style={{ width: "40%;" }}
                          >
                            A blank cheque marked “VOID” to this <br />{" "}
                            completed Authorization is required.
                          </td>
                          <td
                            className="text-center w-40"
                            style={{ padding: "20px" }}
                          >
                            <a href="/">
                              <img
                                src={logo}
                                alt="logo"
                                style={{
                                  width: "100px",
                                  filter: "contrast(0.6)",
                                }}
                              />
                            </a>
                          </td>
                          <td className="w-30 text-purpal">
                            9482-1451 QC Inc / Buvons Local PRO
                            <br />
                            1102-1405 rue Graham-Bell,
                            <br />
                            Boucherville, Quebec H4B 6A1
                            <br />
                            TEL: +1 (450) 641-4848
                            <br />
                            support@buvonslocalpro.ca
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={3}
                            style={{
                              font: "15px/24px ubunturegular",
                              opacity: "0.7",
                            }}
                          >
                            (the “Payee”, referred to herein as the “Company”)
                            Re: Direct Debiting of an Account via the Business
                            PreAuthorized Debit Plan Authorization Granted
                            Herein{" "}
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            colSpan={3}
                            style={{ font: "20px/26px ubunturegular" }}
                            className="py-4"
                          >
                            <b>
                              Account Holder (the “Payor”, referred to herein as
                              the “Customer”):
                            </b>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} className="px-0 py-0 ">
                            <table className="table table-borderless">
                              <tr>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>Full Legal Name</b>
                                </td>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>Exact Name in which Account is Held</b>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="text" />
                                </td>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="text" />
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} className="px-0 py-0">
                            <table className="table table-borderless">
                              <tr>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>Name of Authorized Signing Officer</b>
                                </td>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>Signature of Authorized Signing Officer</b>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="text" />
                                </td>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="text" />
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        {/* <tr>
                          <td colSpan={3} className="px-0 py-0">
                            <table className="table table-borderless">
                              <tr>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>Name of Authorized Signing Officer</b>
                                </td>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>Signature of Authorized Signing Officer</b>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="file" />
                                </td>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="file" />
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr> */}
                        {/* <tr>
                          <td colSpan={3} className="px-0 py-0">
                            <table className="table table-borderless">
                              <tr>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>Licensee Number</b>
                                </td>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>Telephone Number</b>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="text" />
                                </td>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="text" />
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr> */}
                        <tr>
                          <td colSpan={3} className="px-0 py-0">
                            <table className="table table-borderless">
                              <tr>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>Licensee Number</b>
                                </td>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>Telephone Number</b>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="text" />
                                </td>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="text" />
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} className="px-0 py-0">
                            <table className="table table-borderless">
                              <tr>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>Province</b>
                                </td>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>Postal Code</b>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="text" />
                                </td>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="text" />
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={3}
                            style={{ font: "17px/26px ubunturegular" }}
                            className="py-4"
                          >
                            <b>
                              Payor’s Financial Institution (referred to herein
                              as the “Bank”):
                            </b>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} className="px-0 py-0 ">
                            <table className="table table-borderless">
                              <tr>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>Name of Bank</b>
                                </td>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>Address</b>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="text" />
                                </td>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="text" />
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} className="px-0 py-0 ">
                            <table className="table table-borderless">
                              <tr>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>City</b>
                                </td>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>Province</b>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="text" />
                                </td>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="text" />
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} className="px-0 py-0 ">
                            <table className="table table-borderless">
                              <tr>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>Postal Code</b>
                                </td>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>Branch</b>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="text" />
                                </td>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="text" />
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} className="px-0 py-0 ">
                            <table className="table table-borderless">
                              <tr>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>
                                    Branch Address (if different from above)
                                  </b>
                                </td>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>Bank Account No. </b>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="text" />
                                </td>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="text" />
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} className="px-0 py-0 ">
                            <table className="table table-borderless">
                              <tr>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>Branch No</b>
                                </td>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>Institution No</b>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="text" />
                                </td>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="text" />
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} className="px-0 py-0 ">
                            <table className="table table-borderless">
                              <tr>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>Variable Amount</b>
                                </td>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>Sporadic Frequency</b>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="text" />
                                </td>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="text" />
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} className="px-0 py-0 ">
                            <table className="table table-borderless">
                              <tr>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>Starting Date</b>
                                </td>
                                <td> </td>
                              </tr>
                              <tr>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="text" />
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={3}
                            style={{
                              font: "17px/24px",
                              padding: "20px 0 20px",
                              opacity: "0.7",
                            }}
                          >
                            The Customer agrees to participate in a
                            pre-authorized debit (“PAD”) plan with the Company
                            and authorizes the Company, any successor or assign
                            of the Company, and the Company’s financial
                            institution to draw, in electronic, paper or other
                            form, for the purpose of making payment for goods or
                            services related to the Customer’s commercial
                            activities, on the above indicated account at the
                            above indicated Bank. The Customer authorizes the
                            Bank to honour and pay such PADs. The Customer
                            acknowledges that this PAD agreement (the “PAD
                            Agreement”, referred to herein as the
                            “Authorization”) is provided for the benefit of the
                            Company, its financial institution and the Bank, and
                            is provided in consideration of the Bank agreeing to
                            process debits against the Customer’s account in
                            accordance with the rules of the Canadian Payments
                            Association. The Customer agrees that any direction
                            he, she or it may provide to draw a PAD, and any PAD
                            drawn in accordance with this Authorization, shall
                            be binding on the Customer as if signed by or drawn
                            by the Customer, and, in the case of paper PADs, as
                            if they were cheques signed by the Customer.
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3}>
                            <b>1. &nbsp; Purpose of Debits</b>
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={3}
                            className="ps-4"
                            style={{ opacity: "0.7" }}
                          >
                            The Customer hereby authorizes the Company and the
                            Company’s financial institution to draw on the
                            Customer’s above indicated account with the Bank,
                            for the following purpose: a business PAD (as such
                            term is defined in Rule H1 – Pre-Authorized Debits
                            (PADs) of the Canadian Payment Association)
                            arrangement in respect of the distribution and
                            purchase of beer products.
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3}>
                            <b>2. &nbsp; Pre-Notification of Amounts</b>
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={3}
                            className="ps-4"
                            style={{ opacity: "0.7" }}
                          >
                            <strong>Variable Amounts:</strong> In the case of
                            each and every variable amount PAD billed on a
                            sporadic basis, the Company will provide written
                            notice to the Customer, on the date of delivery by
                            the Company to the Customer of the relevant beer
                            products shipment of the amount to be debited and
                            the date of the PAD, and each and every notice shall
                            be given at least seven (7) calendar days before the
                            date of each and every PAD (see paragraph 4 below
                            for further details on the pre-notification
                            procedure).
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3}>
                            <b>3. &nbsp; Rights of Dispute</b>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} className="ps-4">
                            <b>
                              The Customer may dispute a Pre-Authorized Debit
                              under the following conditions:
                            </b>
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={3}
                            className="ps-5"
                            style={{ opacity: "0.7" }}
                          >
                            <ol type="i">
                              <li>
                                the PAD was not drawn in accordance with this
                                Authorization;{" "}
                              </li>
                              <li>
                                this Authorization was revoked or cancelled; or
                              </li>
                              <li>
                                pre-notification (as set out in paragraphs 2 and
                                4 of this Authorization) was not received and
                                such pre-notification was required under the
                                terms of this Authorization.
                              </li>
                            </ol>
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={3}
                            className="ps-4"
                            style={{ opacity: "0.7" }}
                          >
                            In order to be reimbursed, the Customer acknowledges
                            that he, she, or it must complete a declaration to
                            the effect that either (i), (ii) or (iii) above took
                            place and present it to the above indicated branch
                            of the Bank up to and including, but not later than,
                            ten (10) business days after the date on which the
                            PAD in dispute was posted to the Customer’s account.
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={3}
                            className="ps-4"
                            style={{ opacity: "0.7" }}
                          >
                            The Customer acknowledges that any dispute regarding
                            a PAD which arises after the above noted time
                            limitation of ten (10) business days has expired is
                            a matter to be resolved solely between the Company
                            and the Customer. The customer has certain recourse
                            rights if any debit does not comply with this
                            agreement. For example, the customer has the right
                            to receive reimbursement for any debit that is not
                            authorized or is not consistent with this PAD
                            Agreement. To obtain more information on your
                            recourse rights.{" "}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3}>
                            <b>
                              4.&nbsp;&nbsp; Terms of Authorization to Debit the
                              Above Account
                            </b>
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={3}
                            className="ps-4"
                            style={{ opacity: "0.7" }}
                          >
                            The Customer authorizes the Company to debit or
                            cause to be debited from the above account: a
                            variable amount, which will be debited with sporadic
                            frequency determined by the Company in its sole
                            discretion; provided that each such PAD is for
                            payment due and owing by the Customer to the Company
                            in respect of the distribution and purchase of beer
                            products and the aggregate amount of each such PAD
                            does not exceed $ .
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} className="ps-4">
                            <b>
                              If the above variable amount will be debited with
                              sporadic frequency, the Customer agrees that:
                            </b>
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={3}
                            className="ps-4"
                            style={{ opacity: "0.7" }}
                          >
                            <ol type="i">
                              <li>
                                The Company shall obtain valid authorization for
                                the Bank to debit the Customer’s account in the
                                form of a signature on the Company’s Form 103-T
                                (the “Invoice” a sample of which is attached
                                hereto as Schedule A) from the Customer for each
                                and every such PAD prior to such PAD being
                                exchanged and cleared; and
                              </li>
                              <li>
                                For each and every sporadic billing of a
                                variable amount or amounts, the Customer agrees
                                that his, her or its receipt of and
                                counter-signature on each such Invoice or
                                Invoices on the date of delivery by the Company
                                to the Customer of the relevant beer products
                                shipment (to be effected by any Customer
                                representative who is required and authorized by
                                the Customer to sign therefore and to instruct
                                the Bank to process PADs against the Customer’s
                                above account on the Customer’s behalf) shall
                                constitute the Customer’s official receipt and
                                acceptance as of the date of delivery: (a) of
                                the Company’s formal written notice of the
                                specific amount(s) to be debited in accordance
                                with that particular Invoice or Invoices and (b)
                                that the date on which the above account will be
                                debited for the amount of that particular
                                Invoice or Invoices shall be at least seven (7)
                                calendar days from the Customer’s official
                                receipt of and counter-signature on said Invoice
                                or Invoices.
                              </li>
                            </ol>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} style={{ opacity: "0.7" }}>
                            The Customer agrees that the Bank is not required to
                            verify that any PAD has been drawn in accordance
                            with this Authorization, including the amount,
                            frequency and fulfillment of any purpose of any PAD.{" "}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} style={{ opacity: "0.7" }}>
                            The Customer acknowledges that in order to revoke or
                            cancel this Authorization, the Customer must provide
                            notice of revocation or cancellation to the Company.
                            This Authorization may be revoked or cancelled at
                            any time upon notice being provided by the Customer,
                            in writing with proper authorization to verify the
                            identity of the Customer, within ten (10) business
                            days before the due date of the next PAD.
                            Cancellation or revocation of this Authorization
                            does not terminate any contract for goods or
                            services that exists between the Customer and the
                            Company. This Authorization applies only to the
                            method of payment and does not otherwise have any
                            bearing on the contract for goods or services
                            exchanged between the Customer and the Company
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} style={{ opacity: "0.7" }}>
                            The Customer may obtain a sample cancellation form,
                            or more information on the customer’s right to
                            cancel a PAD Agreement at any financial institution.{" "}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} style={{ opacity: "0.7" }}>
                            The Customer warrants that all information provided
                            with respect to the above account that the Company
                            is authorized to draw upon is complete and accurate.
                            A specimen cheque (if available for this account)
                            has been marked “VOID” and is attached to this
                            Authorization. The Customer undertakes to inform the
                            Company, in writing, of any change in the account
                            information provided in this Authorization at least
                            ten (10) business days prior to the due date of the
                            next PAD. In the event of any such change, this
                            Authorization shall continue in respect of any new
                            account to be used for PADs.{" "}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} style={{ opacity: "0.7" }}>
                            Except where caused solely by the negligent actions
                            of the Company, the Customer agrees to indemnify and
                            hold the Company harmless from and against and
                            reimburse the Company for all losses, costs, fees,
                            damages, expenses, liabilities, claims, suits and
                            demands whatsoever that it may suffer, incur or be
                            under or that may be made or brought against the
                            Company, by whomsoever made or brought, by reason of
                            or in any way arising out of the action in drawing,
                            issuing, instructing, paying, disputing and/or
                            reimbursing of any PAD on the Customer’s account
                            issued in accordance with instructions by authorized
                            Customer representatives on behalf of the Customer,
                            including without limitation, any interest claims,
                            claims resulting from stop payments and declarations
                            filed by the Customer or any other person.{" "}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} style={{ opacity: "0.7" }}>
                            The Customer acknowledges that only provision and
                            delivery of this Authorization to the Company
                            constitutes delivery by the Customer to the Company
                            and to the Bank. Any delivery of this Authorization
                            to the Company constitutes delivery by the Customer.
                            The Customer agrees that the Company may deliver
                            this Authorization to the Company’s financial
                            institution and agrees to the disclosure of any
                            information which may be contained in this
                            Authorization to such financial institution.
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} style={{ opacity: "0.7" }}>
                            The Customer warrants and guarantees to the Company
                            and to the Bank that all persons whose signatures
                            are required to sign on the above account and to
                            formally bind the Company to the terms and
                            conditions of this Authorization have signed this
                            Authorization. The Customer acknowledges receipt of
                            a signed copy of this Authorization. The Customer
                            acknowledges that it has read, understands, accepts
                            and agrees to be bound by the terms and conditions
                            of this Authorization, all of which shall ensure to
                            the benefit of and be binding upon the Customer and
                            his, her or its successors and assigns.{" "}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} style={{ opacity: "0.7" }}>
                            The Customer agrees to comply with the Rules of the
                            Canadian Payments Association, and any other rules
                            or regulations which may affect the services
                            described herein, as are currently in effect or as
                            may be introduced in the future and the Customer
                            agrees to execute any further documentation
                            reasonably required by the Company or which may be
                            prescribed from time to time by the Canadian
                            Payments Association in respect of the services
                            described herein.{" "}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} style={{ opacity: "0.7" }}>
                            It is the express wish of the parties that this
                            Authorization and any related documents be drawn up
                            and executed in English. Les parties conviennent que
                            la présente autorisation et tous les documents s’y
                            rattachant soient rédigés et signés en anglais.{" "}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} className="px-0 pt-5 ">
                            <table className="table table-borderless">
                              <tr>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>NAME OF THE COMPANY (Customer) :</b>
                                </td>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>NAME OF AUTHORIZED SIGNING OFFICER:</b>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="text" />
                                </td>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="text" />
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} className="px-0 py-0 ">
                            <table className="table table-borderless">
                              <tr>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>TITLE :</b>
                                </td>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>DATE :</b>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="text" />
                                </td>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="date" />
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} className="px-0 py-0 ">
                            <table className="table table-borderless">
                              <tr>
                                <td
                                  className="w-50"
                                  style={{
                                    font: "17px/27px ubunturegular",
                                    color: "#fff",
                                  }}
                                >
                                  <b>SIGNATURE :</b>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className="w-50"
                                  style={{ padding: "0 10px" }}
                                >
                                  <input type="file" />
                                </td>
                                <td></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={3}
                            className="text-center pt-3"
                            style={{ opacity: "0.7" }}
                          >
                            For verification, please attach a blank cheque
                            marked “VOID” to this completed Authorization.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="DebitAgreementDetail ">
                  <div className="table-responsive">
                    <table class="table table-white table-borderless">
                      <tbody>
                        <tr>
                          <td className="text-red w-40">
                            <table
                              className="table-bordered"
                              style={{ padding: "10px" }}
                            >
                              <thead>
                                <tr>
                                  <th className="text-center py-3" colSpan={2}>
                                    For Credit Department Use Only
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td
                                    className="w-auto text-purpal"
                                    style={{
                                      font: "12px/18px ubunturegular",
                                      padding: "0 10px",
                                    }}
                                  >
                                    Date Approved{" "}
                                  </td>
                                  <td
                                    className="w-auto"
                                    style={{ padding: "0px 10px" }}
                                  >
                                    <input
                                      type="date"
                                      className="borderLess my-1 text-center"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="w-auto text-purpal"
                                    style={{
                                      font: "12px/18px ubunturegular",
                                      color: "#fff",
                                      padding: "0 10px",
                                    }}
                                  >
                                    Credit Approved By{" "}
                                  </td>
                                  <td
                                    className="w-auto"
                                    style={{ padding: "0px 10px" }}
                                  >
                                    <input
                                      type="text"
                                      className="borderLess my-1"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="w-auto text-purpal"
                                    style={{
                                      font: "12px/18px ubunturegular",
                                      color: "#fff",
                                      padding: "0 10px",
                                    }}
                                  >
                                    Credit Limit ${" "}
                                  </td>
                                  <td
                                    className="w-auto"
                                    style={{ padding: "0px 10px" }}
                                  >
                                    <input
                                      type="text"
                                      className="borderLess my-1"
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td
                            className="text-center  text-purpal w-30"
                            style={{ padding: "20px" }}
                          >
                            <a href="/">
                              <img
                                src={logo}
                                alt="logo"
                                style={{
                                  width: "100px",
                                  filter: "contrast(0.6)",
                                }}
                              />
                            </a>
                          </td>
                          <td className="w-30  text-purpal">
                            9482-1451 QC Inc / Buvons Local PRO
                            <br />
                            1102-1405 rue Graham-Bell,
                            <br />
                            Boucherville, Quebec H4B 6A1
                            <br />
                            TEL: +1 (450) 641-4848
                            <br />
                            support@buvonslocalpro.ca
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={3}
                            style={{ font: "15px/24px ubunturegular" }}
                          >
                            &nbsp;
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3}>
                            <table className="table table-white table-bordered">
                              <thead>
                                <tr>
                                  <th
                                    colSpan={2}
                                    style={{
                                      font: "16px/24px ubunturegular",
                                      color: "#fff",
                                      padding: "10px",
                                      textAlign: "center",
                                      fontWeight: "600",
                                    }}
                                  >
                                    APPLICATION FOR CREDIT{" "}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    AMOUNT OF CREDIT REQUESTED:{" "}
                                    <input
                                      type="text"
                                      className="borderLess w-auto  my-1"
                                    />
                                  </td>
                                  <td
                                    className="w-50  text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    (Average order per week){" "}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="w-50  text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    COMPANY INFORMATION{" "}
                                  </td>
                                  <td
                                    className="w-50"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    <input
                                      type="text"
                                      className="borderLess my-1"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    CID #{" "}
                                    <input
                                      type="text"
                                      className="borderLess w-auto  my-1"
                                    />
                                  </td>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    License #{" "}
                                    <input
                                      type="text"
                                      className="borderLess w-auto  my-1"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    Legal Company Name
                                  </td>
                                  <td
                                    className="w-50"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    {" "}
                                    <input
                                      type="text"
                                      className="borderLess  my-1"
                                      placeholder="In full"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    Operational/ Trade Name
                                  </td>
                                  <td
                                    className="w-50"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    {" "}
                                    <input
                                      type="text"
                                      className="borderLess  my-1"
                                      placeholder=" "
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    Affiliated Companies{" "}
                                  </td>
                                  <td
                                    className="w-50"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    {" "}
                                    <input
                                      type="text"
                                      className="borderLess  my-1"
                                      placeholder="(Past & Present)"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    Mailing Address{" "}
                                  </td>
                                  <td
                                    className="w-50"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    {" "}
                                    <input
                                      type="text"
                                      className="borderLess  my-1"
                                      placeholder="(Street Number, City/Town, Province, Postal/Zip Code)"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    Telephone Number{" "}
                                    <input
                                      type="tel"
                                      className="borderLess w-auto  my-1"
                                    />
                                  </td>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    Fax Number{" "}
                                    <input
                                      type="tel"
                                      className="borderLess w-auto  my-1"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    Telephone Number{" "}
                                    <input
                                      type="tel"
                                      className="borderLess w-auto  my-1"
                                    />
                                  </td>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    Fax Number{" "}
                                    <input
                                      type="tel"
                                      className="borderLess w-auto  my-1"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    Shipping Address{" "}
                                  </td>
                                  <td
                                    className="w-50"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    <input
                                      type="text"
                                      className="borderLess  my-1"
                                      placeholder="(Street Number, City/Town, Province, Postal/Zip Code)"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    E-mail Address{" "}
                                    <input
                                      type="mail"
                                      className="borderLess w-auto  my-1"
                                    />
                                  </td>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    Web Site Address{" "}
                                    <input
                                      type="url"
                                      className="borderLess w-auto  my-1"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    Date Business Commenced{" "}
                                    <input
                                      type="date"
                                      className="borderLess w-auto  my-1 text-center"
                                    />
                                  </td>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    Date Business Incorporated
                                    <input
                                      type="date"
                                      className="borderLess w-auto  text-center my-1"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    No. Of Employees{" "}
                                    <input
                                      type="number"
                                      className="borderLess w-auto  my-1"
                                    />
                                  </td>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    No of Years in Service
                                    <input
                                      type="number"
                                      className="borderLess w-auto  my-1"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    SELECT ONE OPTION
                                  </td>
                                  <td
                                    className="w-50"
                                    style={{
                                      padding: "4px 10px",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    <div class="form-check form-check-inline my-1">
                                      <input
                                        class="form-check-input"
                                        type="checkbox"
                                        id="inlineCheckbox1"
                                        value="option1"
                                      />
                                      <label
                                        class="form-check-label text-purpal"
                                        for="inlineCheckbox1"
                                      >
                                        Corporation
                                      </label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                      <input
                                        class="form-check-input"
                                        type="checkbox"
                                        id="inlineCheckbox2"
                                        value="option2"
                                      />
                                      <label
                                        class="form-check-label text-purpal"
                                        for="inlineCheckbox2"
                                      >
                                        Partnership
                                      </label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                      <input
                                        class="form-check-input"
                                        type="checkbox"
                                        id="inlineCheckbox3"
                                        value="option3"
                                      />
                                      <label
                                        class="form-check-label text-purpal"
                                        for="inlineCheckbox3"
                                      >
                                        Proprietorship
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} style={{ padding: "20px 10px" }}>
                            <table className="table table-white table-bordered">
                              <thead>
                                <tr>
                                  <th
                                    colSpan={3}
                                    style={{
                                      font: "16px/24px ubunturegular",
                                      padding: "10px",
                                      textAlign: "center",
                                      fontWeight: "600",
                                    }}
                                  >
                                    OWNERS / PARTNERS / OFFICERS{" "}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td
                                    style={{
                                      textAlign: "center",
                                      fontWeight: "600",
                                    }}
                                    className="text-purpal"
                                  >
                                    S.No.
                                  </td>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      fontWeight: "600",
                                    }}
                                  >
                                    NAME & POSITION
                                  </td>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      fontWeight: "600",
                                    }}
                                  >
                                    HOME ADDRESS
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className=" text-purpal"
                                    style={{ textAlign: "center" }}
                                  >
                                    1.
                                  </td>
                                  <td
                                    className="w-50"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    <input
                                      type="text"
                                      className="borderLess  my-1"
                                      placeholder="(Name in full and Position)"
                                    />
                                  </td>
                                  <td
                                    className="w-50"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    {" "}
                                    <input
                                      type="text"
                                      className="borderLess  my-1"
                                      placeholder="(Residential Address)"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>&nbsp;</td>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    TEL. #{" "}
                                    <input
                                      type="tel"
                                      className="borderLess w-auto my-1"
                                    />
                                  </td>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    CELL #{" "}
                                    <input
                                      type="tel"
                                      className="borderLess w-auto my-1"
                                      placeholder=" "
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>&nbsp;</td>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    S.I.N. #{" "}
                                  </td>
                                  <td
                                    className="w-50"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    <input
                                      type="text"
                                      className="borderLess my-1"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className=" text-purpal"
                                    style={{ textAlign: "center" }}
                                  >
                                    2.
                                  </td>
                                  <td
                                    className="w-50"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    <input
                                      type="text"
                                      className="borderLess  my-1"
                                      placeholder="(Name in full and Position)"
                                    />
                                  </td>
                                  <td
                                    className="w-50"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    {" "}
                                    <input
                                      type="text"
                                      className="borderLess  my-1"
                                      placeholder="(Residential Address)"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>&nbsp;</td>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    TEL. #{" "}
                                    <input
                                      type="tel"
                                      className="borderLess w-auto my-1"
                                    />
                                  </td>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    CELL #{" "}
                                    <input
                                      type="tel"
                                      className="borderLess w-auto my-1"
                                      placeholder=" "
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>&nbsp;</td>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    S.I.N. #{" "}
                                  </td>
                                  <td
                                    className="w-50"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    <input
                                      type="text"
                                      className="borderLess my-1"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className=" text-purpal"
                                    style={{ textAlign: "center" }}
                                  >
                                    3.
                                  </td>
                                  <td
                                    className="w-50"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    <input
                                      type="text"
                                      className="borderLess  my-1"
                                      placeholder="(Name in full and Position)"
                                    />
                                  </td>
                                  <td
                                    className="w-50"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    {" "}
                                    <input
                                      type="text"
                                      className="borderLess  my-1"
                                      placeholder="(Residential Address)"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>&nbsp;</td>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    TEL. #{" "}
                                    <input
                                      type="tel"
                                      className="borderLess w-auto my-1"
                                    />
                                  </td>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    CELL #{" "}
                                    <input
                                      type="tel"
                                      className="borderLess w-auto my-1"
                                      placeholder=" "
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>&nbsp;</td>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    S.I.N. #{" "}
                                  </td>
                                  <td
                                    className="w-50"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    <input
                                      type="text"
                                      className="borderLess my-1"
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} style={{ padding: "20px 10px" }}>
                            <table className="table table-white table-bordered">
                              <thead>
                                <tr>
                                  <th
                                    colSpan={3}
                                    style={{
                                      font: "16px/24px ubunturegular",
                                      padding: "10px",
                                      textAlign: "center",
                                      fontWeight: "600",
                                    }}
                                  >
                                    BANKING INFORMATION{" "}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td
                                    className="text-purpal"
                                    style={{
                                      textAlign: "center",
                                      fontWeight: "600",
                                    }}
                                  >
                                    S.No.
                                  </td>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      fontWeight: "600",
                                    }}
                                  >
                                    BANK NAME
                                  </td>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      fontWeight: "600",
                                    }}
                                  >
                                    BANK ADDRESS
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className=" text-purpal"
                                    style={{ textAlign: "center" }}
                                  >
                                    1.
                                  </td>
                                  <td
                                    className="w-50"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    <input
                                      type="text"
                                      className="borderLess  my-1"
                                      placeholder=""
                                    />
                                  </td>
                                  <td
                                    className="w-50"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    {" "}
                                    <input
                                      type="text"
                                      className="borderLess  my-1"
                                      placeholder=""
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>&nbsp;</td>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    TEL. #{" "}
                                    <input
                                      type="tel"
                                      className="borderLess w-auto my-1"
                                    />
                                  </td>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    ACCT #{" "}
                                    <input
                                      type="text"
                                      className="borderLess w-auto my-1"
                                      placeholder=" "
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>&nbsp;</td>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    CONTACT #{" "}
                                  </td>
                                  <td
                                    className="w-50"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    <input
                                      type="tel"
                                      className="borderLess my-1"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className=" text-purpal"
                                    style={{ textAlign: "center" }}
                                  >
                                    2.
                                  </td>
                                  <td
                                    className="w-50"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    <input
                                      type="text"
                                      className="borderLess  my-1"
                                      placeholder=""
                                    />
                                  </td>
                                  <td
                                    className="w-50"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    {" "}
                                    <input
                                      type="text"
                                      className="borderLess  my-1"
                                      placeholder=""
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>&nbsp;</td>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    TEL. #{" "}
                                    <input
                                      type="tel"
                                      className="borderLess w-auto my-1"
                                    />
                                  </td>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    CELL #{" "}
                                    <input
                                      type="text"
                                      className="borderLess w-auto my-1"
                                      placeholder=" "
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>&nbsp;</td>
                                  <td
                                    className="w-50 text-purpal"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    CONTACT #{" "}
                                  </td>
                                  <td
                                    className="w-50"
                                    style={{ padding: "4px 10px" }}
                                  >
                                    <input
                                      type="tel"
                                      className="borderLess my-1"
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} style={{ padding: "10px 10px" }}>
                            <table className="table table-white table-bordered">
                              <thead>
                                <tr>
                                  <th
                                    colSpan={4}
                                    style={{
                                      font: "16px/24px ubunturegular",
                                      padding: "10px",
                                      textAlign: "center",
                                      fontWeight: "600",
                                    }}
                                  >
                                    TRADE REFERENCES{" "}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td
                                    className="w-10 text-purpal"
                                    style={{
                                      textAlign: "center",
                                      fontWeight: "600",
                                    }}
                                  >
                                    S.No.
                                  </td>
                                  <td
                                    className="w-30 text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      fontWeight: "600",
                                    }}
                                  >
                                    NAME
                                  </td>
                                  <td
                                    className="w-30 text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      fontWeight: "600",
                                    }}
                                  >
                                    ADDRESS
                                  </td>
                                  <td
                                    className="w-30 text-purpal"
                                    style={{
                                      padding: "4px 10px",
                                      fontWeight: "600",
                                    }}
                                  >
                                    TELEPHONE AND FAX. #
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="w-10 text-purpal"
                                    style={{ textAlign: "center" }}
                                  >
                                    1.
                                  </td>
                                  <td
                                    className="w-30"
                                    style={{ padding: "0 10px" }}
                                  >
                                    <input
                                      type="text"
                                      className="borderLess my-1"
                                      placeholder=""
                                    />
                                  </td>
                                  <td
                                    className="w-30"
                                    style={{ padding: "0 10px" }}
                                  >
                                    {" "}
                                    <input
                                      type="text"
                                      className="borderLess my-1"
                                      placeholder=""
                                    />
                                  </td>
                                  <td
                                    className="w-30"
                                    style={{ padding: "0 10px" }}
                                  >
                                    <input
                                      type="tel"
                                      className="borderLess my-1"
                                      placeholder=""
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="w-10 text-purpal"
                                    style={{ textAlign: "center" }}
                                  >
                                    2.
                                  </td>
                                  <td
                                    className="w-30"
                                    style={{ padding: "0 10px" }}
                                  >
                                    <input
                                      type="text"
                                      className="borderLess my-1"
                                      placeholder=""
                                    />
                                  </td>
                                  <td
                                    className="w-30"
                                    style={{ padding: "0 10px" }}
                                  >
                                    {" "}
                                    <input
                                      type="text"
                                      className="borderLess my-1"
                                      placeholder=""
                                    />
                                  </td>
                                  <td
                                    className="w-30"
                                    style={{ padding: "0 10px" }}
                                  >
                                    <input
                                      type="tel"
                                      className="borderLess my-1"
                                      placeholder=""
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="w-10 text-purpal"
                                    style={{ textAlign: "center" }}
                                  >
                                    3.
                                  </td>
                                  <td
                                    className="w-30"
                                    style={{ padding: "0 10px" }}
                                  >
                                    <input
                                      type="text"
                                      className="borderLess  my-1"
                                      placeholder=""
                                    />
                                  </td>
                                  <td
                                    className="w-30"
                                    style={{ padding: "0 10px" }}
                                  >
                                    {" "}
                                    <input
                                      type="text"
                                      className="borderLess  my-1"
                                      placeholder=""
                                    />
                                  </td>
                                  <td
                                    className="w-30"
                                    style={{ padding: "0 10px" }}
                                  >
                                    <input
                                      type="tel"
                                      className="borderLess  my-1"
                                      placeholder=""
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="w-10 text-purpal"
                                    style={{ textAlign: "center" }}
                                  >
                                    4.
                                  </td>
                                  <td
                                    className="w-30"
                                    style={{ padding: "0 10px" }}
                                  >
                                    <input
                                      type="text"
                                      className="borderLess  my-1"
                                      placeholder=""
                                    />
                                  </td>
                                  <td
                                    className="w-30"
                                    style={{ padding: "0 10px" }}
                                  >
                                    {" "}
                                    <input
                                      type="text"
                                      className="borderLess  my-1"
                                      placeholder=""
                                    />
                                  </td>
                                  <td
                                    className="w-30"
                                    style={{ padding: "0 10px" }}
                                  >
                                    <input
                                      type="tel"
                                      className="borderLess  my-1"
                                      placeholder=""
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="w-10 text-purpal"
                                    style={{ textAlign: "center" }}
                                  >
                                    5.
                                  </td>
                                  <td
                                    className="w-30"
                                    style={{ padding: "0 10px" }}
                                  >
                                    <input
                                      type="text"
                                      className="borderLess  my-1"
                                      placeholder=""
                                    />
                                  </td>
                                  <td
                                    className="w-30"
                                    style={{ padding: "0 10px" }}
                                  >
                                    {" "}
                                    <input
                                      type="text"
                                      className="borderLess  my-1"
                                      placeholder=""
                                    />
                                  </td>
                                  <td
                                    className="w-30"
                                    style={{ padding: "0 10px" }}
                                  >
                                    <input
                                      type="tel"
                                      className="borderLess  my-1"
                                      placeholder=""
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="w-10 text-purpal"
                                    style={{ textAlign: "center" }}
                                  >
                                    6.
                                  </td>
                                  <td
                                    className="w-30"
                                    style={{ padding: "0 10px" }}
                                  >
                                    <input
                                      type="text"
                                      className="borderLess  my-1"
                                      placeholder=""
                                    />
                                  </td>
                                  <td
                                    className="w-30"
                                    style={{ padding: "0 10px" }}
                                  >
                                    {" "}
                                    <input
                                      type="text"
                                      className="borderLess  my-1"
                                      placeholder=""
                                    />
                                  </td>
                                  <td
                                    className="w-30"
                                    style={{ padding: "0 10px" }}
                                  >
                                    <input
                                      type="tel"
                                      className="borderLess  my-1"
                                      placeholder=""
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} style={{ opacity: "0.7" }}>
                            Whereas{" "}
                            <input
                              type="text"
                              className="borderLess w-auto  mb-0"
                              placeholder=""
                            />{" "}
                            (hereinafter referred to as the “Applicant”) has
                            requested an credit account from Buvons Local PRO.
                            (hereinafter referred to as the “Seller”) for the
                            purpose of purchasing goods on credit, the following
                            terms and conditions shall apply:
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={3}
                            className="px-3"
                            style={{ opacity: "0.7" }}
                          >
                            <ol type="1" className="ps-2">
                              <li>
                                To pay all Buvons Local PRO. Invoices in
                                accordance with the payment terms.
                              </li>
                              <li>
                                <strong>Credit Investigations:</strong> The
                                Applicant and undersigned shall provide to the
                                Seller, on an ongoing basis, such financial
                                information as may be requested and consents to
                                the verification of all information contained in
                                this Application or further documentation which
                                may subsequently be provided in the future, and
                                such personal credit information as may be
                                deemed necessary. All bank and other credit
                                references indicated, are authorized to provide
                                whatsoever information as may be requested by
                                Buvons Local PRO.
                              </li>
                              <li>
                                Customer to pay all expenses and fees for
                                collection or enforcement hereof, including
                                attorney’s fees of not less than 30% of
                                customer’s account debt, if account is placed
                                with a third party collection agency.
                              </li>
                              <li>
                                If credit is granted by Buvons Local PRO., all
                                decisions with respect to the extension or
                                continuation shall be in the sole discretion of
                                Buvons Local PRO. Buvons Local PRO. may
                                terminate any credit availability within its
                                sole discretion.
                              </li>
                            </ol>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} style={{ padding: "10px 0px" }}>
                            <table className="table table-borderless">
                              <tbody>
                                <tr>
                                  <td colSpan={2}>
                                    Signed at{" "}
                                    <input
                                      type="text"
                                      className="borderLess w-auto  mb-0"
                                      placeholder=""
                                    />{" "}
                                    this{" "}
                                    <input
                                      type="text"
                                      className="borderLess w-auto  mb-0"
                                      placeholder=""
                                    />{" "}
                                    day of{" "}
                                    <input
                                      type="text"
                                      className="borderLess w-auto  mb-0"
                                      placeholder=""
                                    />
                                    20{" "}
                                    <input
                                      type="text"
                                      className="borderLess w-auto  mb-0"
                                      placeholder=""
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td className="w-50">
                                    {" "}
                                    <input
                                      type="file"
                                      className="borderLess mb-0"
                                      placeholder="(Witness Signature) "
                                    />
                                  </td>
                                  <td className="w-50">
                                    {" "}
                                    <input
                                      type="file"
                                      className="borderLess mb-0"
                                      placeholder="(Applicant Signature) "
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td className="w-50">
                                    {" "}
                                    <input
                                      type="text"
                                      className="borderLess mb-0"
                                      placeholder="(Witness Name – please print)"
                                    />
                                  </td>
                                  <td className="w-50">
                                    {" "}
                                    <input
                                      type="text"
                                      className="borderLess mb-0"
                                      placeholder="(Applicant Name – please print) "
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td className="w-50">
                                    {" "}
                                    <input
                                      type="text"
                                      className="borderLess mb-0"
                                      placeholder="(Per: Company Name – please print))"
                                    />
                                  </td>
                                  <td className="w-50">
                                    {" "}
                                    <input
                                      type="text"
                                      className="borderLess mb-0"
                                      placeholder="(Per: Company Name – please print) "
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={3}
                            style={{
                              paddingBlockStart: "10px",
                              paddingBlockEnd: "10px",
                              textAlign: "center",
                            }}
                          >
                            <a href="/">
                              <img
                                src={logo}
                                alt="logo"
                                style={{
                                  width: "100px",
                                  filter: "contrast(0.6)",
                                }}
                              />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} style={{ textAlign: "left" }}>
                            <button
                              type="reset"
                              className="btn btn-md rounded-4 me-2"
                              style={{
                                borderColor: "#9370DB",
                                borderWidth: "1px",
                                borderStyle: "solid",
                                color: "#9370DB",
                              }}
                            >
                              Reset &nbsp;
                              <svg
                                fill="#9370DB"
                                width="16px"
                                height="16px"
                                viewBox="0 0 1920 1920"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#9370DB"
                              >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  {" "}
                                  <path
                                    d="M960 0v112.941c467.125 0 847.059 379.934 847.059 847.059 0 467.125-379.934 847.059-847.059 847.059-467.125 0-847.059-379.934-847.059-847.059 0-267.106 126.607-515.915 338.824-675.727v393.374h112.94V112.941H0v112.941h342.89C127.058 407.38 0 674.711 0 960c0 529.355 430.645 960 960 960s960-430.645 960-960S1489.355 0 960 0"
                                    fill-rule="evenodd"
                                  ></path>{" "}
                                </g>
                              </svg>
                            </button>
                            <button
                              onClick={printFunction}
                              type="download"
                              className="btn btn-md rounded-4"
                              style={{
                                backgroundColor: "#9370DB",
                                color: "#fff",
                              }}
                            >
                              Download &nbsp;
                              <svg
                                width="20px"
                                height="20px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  {" "}
                                  <path
                                    d="M20 12.5V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.1198 22 8.79986 22H12.5M14 11H8M10 15H8M16 7H8M15 19L18 22M18 22L21 19M18 22V16"
                                    stroke="#ffffff"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>{" "}
                                </g>
                              </svg>
                            </button>
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
  );
};
export default DebitAgreement;
