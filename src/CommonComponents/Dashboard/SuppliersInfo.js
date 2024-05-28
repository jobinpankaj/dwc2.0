import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useAuthInterceptor from "../../utils/apis";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../UI/Loader";

const Info = ({ accessToken = "" }) => {
  const { t, i18n } = useTranslation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = `/GetSupplier_Dashboard`;
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      permission: "dashboard-view",
    },
  };

  const apis = useAuthInterceptor();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/", {
        state: {
          url: "/dashboard",
        },
      });
    }

    apis
      .get(url, config)
      .then((res) => {
        console.log("allData response : ", res);
        if (res.data.success === true) {
          const transformedData = res?.data?.data?.map((obj) => {
            const key = Object.keys(obj)[0];
            const value = obj[key];
            return { key, value };
          });
          setData(transformedData);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("allData error : ", err);
        setLoading(false);
        toast.error(err.response.data.message, {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      });
  }, []);

  return (
    <>
      {!!loading && (
        <div className="mb-3">
          <Loader />
        </div>
      )}
      {!loading && (
        <div>
          <div className="row mb-3">
            <div className="col-sm-2 col-sm-dash mb-3 mb-10">
              <div className="card user-card height-100 line1">
                <div className="card-body">
                  <div className="dash-widget">
                    <FontAwesomeIcon
                      icon="fa-solid fa-champagne-glasses"
                      className="icon-position"
                    />
                  </div>
                  <div className="dash-widget-txt">
                    <p class="mb-0">
                      <h6>{data?.find(({ key }) => key == "Total_orders")?.value}</h6>
                      <span class="text-nowrap">
                        <label className="badge bg-white bg-opacity-10 me-1">
                {t("supplier.dashboard.total_orders")}
                        </label>{" "}

                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-2 col-sm-dash mb-3 mb-10">
              <div className="card user-card height-100 line2">
                <div className="card-body">
                  <div className="dash-widget">
                    <FontAwesomeIcon
                      icon="fa-solid fa-chart-simple"
                      className="icon-position"
                    />
                  </div>
                  <div className="dash-widget-txt">
                    <p class="mb-0">
                      <h6>
                        $
                        {data?.find(({ key }) => key == "Total_revenue")?.value}
                      </h6>
                      <span class="text-nowrap">
                        <label className="badge bg-white bg-opacity-10 me-1">
                  {t("admin.dashboard.total_revenue")}
                        </label>{" "}

                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-2 col-sm-dash mb-3 mb-10">
              <div className="card user-card height-100 line3">
                <div className="card-body">
                  <div className="dash-widget">
                    <FontAwesomeIcon
                      icon="fa-solid fa-file-invoice"
                      className="icon-position"
                    />
                  </div>
                  <div className="dash-widget-txt">
                    <p class="mb-0">
                      <h6>
                        {
                          data?.find(({ key }) => key == "invoice_status")
                            ?.value
                        }
                      </h6>
                      <span class="text-nowrap">
                        <label className="badge bg-white bg-opacity-10 me-1">
                       {t("supplier.dashboard.invoice_sent")}{" "}
                        </label>{" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-2 col-sm-dash mb-3 mb-10">
              <div className="card user-card height-100 line4">
                <div className="card-body">
                  <div className="dash-widget">
                    <FontAwesomeIcon
                      icon="fa-solid fa-sack-dollar"
                      className="icon-position"
                    />
                  </div>
                  <div className="dash-widget-txt">
                    <p class="mb-0">
                      <h6>
                        {data?.find(({ key }) => key == "Total_sold")?.value}
                      </h6>
                      <span class="text-nowrap">
                        <label className="badge bg-white bg-opacity-10 me-1">
                          {t("supplier.dashboard.total_sold")}
                        </label>{" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-2 col-sm-dash mb-3 mb-10">
              <div className="card user-card height-100 line5">
                <div className="card-body">
                  <div className="dash-widget">
                    <FontAwesomeIcon
                      icon="fa-solid fa-warehouse"
                      className="icon-position"
                    />
                  </div>
                  <div className="dash-widget-txt">
                    <p class="mb-0">
                      <h6>
                        {
                          data?.find(({ key }) => key == "Total_Warehouses")
                            ?.value
                        }
                      </h6>
                      <span class="text-nowrap">
                        <label className="badge bg-white bg-opacity-10 me-1">
                          {t("supplier.dashboard.warehouses")}
                        </label>{" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-2 col-sm-dash mb-3 mb-10">
              <div className="card user-card height-100 line6">
                <div className="card-body">
                  <div className="dash-widget">
                    <FontAwesomeIcon
                      icon="fa-solid fa-sack-xmark"
                      className="icon-position"
                    />
                  </div>
                  <div className="dash-widget-txt">
                    <p class="mb-0">
                      <h6>
                        {
                          data?.find(({ key }) => key == "Pending_orders")
                            ?.value
                        }
                      </h6>
                      <span class="text-nowrap">
                        <label className="badge bg-white bg-opacity-10 me-1">
                            {t("supplier.dashboard.pending_orders")}
                        </label>{" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-2 col-sm-dash mb-3 mb-10">
              <div className="card user-card height-100 line7">
                <div className="card-body">
                  <div className="dash-widget">
                    <FontAwesomeIcon
                      icon="fa-solid fa-truck"
                      className="icon-position"
                    />
                  </div>
                  <div className="dash-widget-txt">
                    <p class="mb-0">
                      <h6>
                        {
                          data?.find(({ key }) => key == "Shipped_orders")
                            ?.value
                        }
                      </h6>
                      <span class="text-nowrap">
                        <label className="badge bg-white bg-opacity-10 me-1">
                       {t("supplier.dashboard.shipped_orders")}
                        </label>{" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-2 col-sm-dash mb-3 mb-10">
              <div className="card user-card height-100 line8">
                <div className="card-body">
                  <div className="dash-widget">
                    <FontAwesomeIcon
                      icon="fa-solid fa-people-arrows"
                      className="icon-position"
                    />
                  </div>
                  <div className="dash-widget-txt">
                    <p class="mb-0">
                      <h6>
                        {
                          data?.find(({ key }) => key == "Total_Customers")
                            ?.value
                        }
                      </h6>
                      <span class="text-nowrap">
                        <label className="badge bg-white bg-opacity-10 me-1">
                          {t("supplier.dashboard.retailers")}
                        </label>{" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Info;
