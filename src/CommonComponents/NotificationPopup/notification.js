import React from "react";
import "./notification.scss";
import { useTranslation } from "react-i18next";

export const Popup = ({ text, closePopup, userType }) => {
  const { t } = useTranslation();

  const notificationList = text.split(",").map((item, index) => {
    return { id: index + 1, name: item.trim() };
  });

  console.log(userType);

  // <>
  //     {notificationList.map(function(data){
  //       return (
  //         <div>
  //           {data.name}
  //         </div>
  //       )
  //     })}
  //     </>

  console.log("notificationList", notificationList);
  return (
    <div className="popup-container">
      <div className="popup-body">
      <header className="pop-header d-flex justify-content-between px-2">
          {t("notification_settings.heading")}

          <button className="cancel-btn" onClick={closePopup}>
            <i class="fa-solid fa-x"></i>
          </button>
        </header>
        <div className="switch-area">
          
          {/* <>
          {notificationList.map(function(data){
            return(
              <div class="switch-container">
            <span class="switch-label">{data.name}</span>
            <label class="switch">
              <input
                type="checkbox"
                id="toggle-facture1"
                class="toggle-switch"
                onclick="toggleMessage('facture', 'toggle-facture1')"
              />
              <span class="slider round"></span>
            </label>
            <label class="switch">
              <input
                type="checkbox"
                id="toggle-facture2"
                class="toggle-switch"
                onclick="toggleMessage('facture', 'toggle-facture2')"
              />
              <span class="slider round"></span>
            </label>
          </div>
            )
          })}
          
          </> */}

          {(() => {
            switch (text) {
              case "admin":
                return (
                  <>
                    <div class="switch-container my-3">
                      <span class="switch-label">
                      </span>
                      <label class="switch switch-btn-icons">
                        <div class="icon1">
                          <i class="fa-solid fa-computer"></i>
                        </div>
                      </label>
                      <label class="switch switch switch-btn-icons">
                        <div class="icon1">
                          <i class="fa-solid fa-message"></i>
                        </div>
                      </label>
                    </div>

                    <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.superadmin_notification.switch_1"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                    <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.superadmin_notification.switch_2"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                    <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.superadmin_notification.switch_3"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                    <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.superadmin_notification.switch_4"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                    <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.superadmin_notification.switch_5"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                    <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.superadmin_notification.switch_6"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                    <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.superadmin_notification.switch_7"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                    <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.superadmin_notification.switch_8"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </>
                );
              case "supplier":
                return (
                  <>
                    <div class="switch-container my-3">
                      <span class="switch-label">
                      </span>
                      <label class="switch switch-btn-icons">
                        <div class="icon1">
                          <i class="fa-solid fa-computer"></i>
                        </div>
                      </label>
                      <label class="switch switch switch-btn-icons">
                        <div class="icon1">
                          <i class="fa-solid fa-message"></i>
                        </div>
                      </label>
                    </div>

                    <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.supplier_notification.switch_1"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                    <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.supplier_notification.switch_2"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                    <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.supplier_notification.switch_3"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                    <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.supplier_notification.switch_4"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                    <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.supplier_notification.switch_5"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                    <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.supplier_notification.switch_6"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                    <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.supplier_notification.switch_7"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                    <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.supplier_notification.switch_8"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                    <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.supplier_notification.switch_9"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </>
                );
              case "retailer":
                return (
                  <>
                    <div class="switch-container my-3">
                      <span class="switch-label">
                      </span>
                      <label class="switch switch-btn-icons">
                        <div class="icon1">
                          <i class="fa-solid fa-computer"></i>
                        </div>
                      </label>
                      <label class="switch switch switch-btn-icons">
                        <div class="icon1">
                          <i class="fa-solid fa-message"></i>
                        </div>
                      </label>
                    </div>

                  <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.retailer_notification.switch_1"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                  </div>
                  <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.retailer_notification.switch_2"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                  </div>
                  <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.retailer_notification.switch_3"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                  </div>
                  <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.retailer_notification.switch_4"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                  </div>
                  <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.retailer_notification.switch_5"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                  </div>
                  <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.retailer_notification.switch_6"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                  </div>
                  <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.retailer_notification.switch_7"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                  </div>
                  <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.retailer_notification.switch_8"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                  </div>
                  <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.retailer_notification.switch_9"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                  </div>
                  </>
                )
              case "distributor":
                return (
                  <>
                    <div class="switch-container my-3">
                      <span class="switch-label">
                      </span>
                      <label class="switch switch-btn-icons">
                        <div class="icon1">
                          <i class="fa-solid fa-computer"></i>
                        </div>
                      </label>
                      <label class="switch switch switch-btn-icons">
                        <div class="icon1">
                          <i class="fa-solid fa-message"></i>
                        </div>
                      </label>
                    </div>
                  <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.distributer_notification.switch_1"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                  </div>
                  <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.distributer_notification.switch_2"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                  </div>
                  <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.distributer_notification.switch_3"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                  </div>
                  <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.distributer_notification.switch_4"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                  </div>
                  <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.distributer_notification.switch_5"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                  </div>
                  <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.distributer_notification.switch_6"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                  </div>
                  <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.distributer_notification.switch_7"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                  </div>
                  <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.distributer_notification.switch_8"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                  </div>
                  <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.distributer_notification.switch_9"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                  </div>
                  <div class="switch-container">
                      <span class="switch-label">
                        {t(
                          "notification_settings.distributer_notification.switch_10"
                        )}
                      </span>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture1"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture1')"
                        />
                        <span class="slider round"></span>
                      </label>
                      <label class="switch">
                        <input
                          type="checkbox"
                          id="toggle-facture2"
                          class="toggle-switch"
                          onclick="toggleMessage('facture', 'toggle-facture2')"
                        />
                        <span class="slider round"></span>
                      </label>
                  </div>
                  </>
                )

              default:
                return <></>;
            }
          })()}
        </div>
        <div id="facture" class="message">
          <p>Facture finaler</p>
        </div>
      </div>
    </div>
  );
};
