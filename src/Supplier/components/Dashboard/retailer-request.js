// import React from "react";

// const RetailerRequest = () => {
//   return (
//   <p>request from retailer</p>
//   );
// };

// export default RetailerRequest;
import React from "react";
// import { RxCross2 } from "react-icons/rx";

const RetailerRequest = (props) => {
  const setRetailerNotify = props.setRetailerNotify;
  return (
    <div className="notificaiton-panel">
      <div className="notification-header">
        <div>
          <h3>Notification Panel</h3>
        </div>
        <div onClick={() => setRetailerNotify(false)} className="modal-close">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
      <h5>Today</h5>
      <div className="account-info px-2">
        <div className="one-component">
          <span>
            <i class="fa-solid fa-circle-user"></i>
            <i class="fa-solid fa-circle"></i>
          </span>
          &emsp;<span>Account Login</span>
        </div>
        <div className="log-info mt-2">
          You have logged in your account from Windows Chrome 120.
        </div>
      </div>
      <h5 className="mt-4">01/05/2024</h5>
      <div className="account-info px-2">
        <div className="one-component">
          <span>
          <i class="fa-solid fa-money-bill-transfer"></i>
            <i class="fa-solid fa-circle"></i>
          </span>
          &emsp;<span>Withdrawal Successful</span>
        </div>
        <div className="log-info mt-2">
        Your withdrawal of 22:47:02 (UTC+08:00) was completed if you did not perform this action, contact customer service immediately 13327427 USDC at 2024-09 13
        </div>
      </div>
      <div className="account-info px-2">
        <div className="one-component">
          <span>
          <i class="fa-solid fa-money-bill-transfer"></i>
            <i class="fa-solid fa-circle"></i>
          </span>
          &emsp;<span>Order canceled</span>
        </div>
        <div className="log-info mt-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </div>
      </div>
      <div className="account-info px-2">
        <div className="one-component">
          <span>
          <i class="fa-solid fa-money-bill-transfer"></i>
            <i class="fa-solid fa-circle"></i>
          </span>
          &emsp;<span>ADA is down 5.03% in 24 hours</span>
        </div>
        <div className="log-info mt-2">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        </div>
      </div>
      <div className="account-info px-2">
        <div className="one-component">
          <span>
          <i class="fa-solid fa-money-bill-transfer"></i>
            <i class="fa-solid fa-circle"></i>
          </span>
          &emsp;<span>ADA is down 10% in 24 hours</span>
        </div>
        <div className="log-info mt-2">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        </div>
      </div>

     

      <div className="notification-footer">
        <button className="delete_btn">Delete All</button>
        <button className="send_btn"> Send All</button>
      </div>
    </div>
  );
};

export default RetailerRequest;
