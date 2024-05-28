import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Table from "../UI/Table";
import noDataImage from "../../../../assets/images/no-data.png";
import NoData from "../../UI/NoData";
import Loader from "../../UI/Loader";
import useAuthInterceptor from "../../../../utils/apis";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import Pagination from "../UI/Pagination";
const TopRetailers = ({ accessToken = "" }) => {
  const { t, i18n } = useTranslation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = `supplier/topRetailerList`;
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
        console.log("topRetailers response : ", res);
        if (res.data.success === true) {
          setData(res.data.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("topRetailers error : ", err);
        setLoading(false);
        toast.error(err.response.data.message, {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      });
  }, []);

  const getTableData = useCallback(() => {
    // change data format to pass to table
    // note tableData key is passed as headings

    const tableData = data?.map((values) => ({
      [t("supplier.sidebar.product_name")]: values?.product_name,
      [t("supplier.sidebar.product_value")]: values?.price,
    }));
    return tableData;
  }, [data, t]);

  const tableData = getTableData();

  return (
    <>
      {!!loading && <Loader />}
      {!loading && (
        <>
          <div class="row mb-3">
            <div class="col">
              <h6 class="card-title">{t("supplier.sidebar.top_retailers")}</h6>
            </div>
            <div class="col text-end">
              <select
                name=""
                id=""
                class="btn btn-outline-black btn-sm text-start"
              >
                <option value="" selected>
                  30 {t("supplier.sidebar.days")}
                </option>
                <option value="">60 {t("supplier.sidebar.days")}</option>
              </select>
            </div>
          </div>

          {data?.length != 0 ? (
            <>
              <Table data={tableData} />
              {/* <Pagination
                paginationCount={paginationCount}
                setPaginationCount={setPaginationCount}
                maxPaginationCount={maxPaginationCount}
              /> */}
            </>
          ) : (
            <NoData image={noDataImage} />
          )}
        </>
      )}
    </>
  );
};

export default TopRetailers;
