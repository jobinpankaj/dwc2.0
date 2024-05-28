import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../UI/Loader";
import useAuthInterceptor from "../../utils/apis";

const RadialChartD = ({ accessToken = "" }) => {
  const [filteredApiData, setFilteredApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  const users = [
    { id: 2, value: "Distributors" },
    { id: 3, value: "Suppliers" },
    { id: 4, value: "Retailers" },
  ];

  const url = `TotalCustomersDashboard`;
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
        if (res.data.success === true) {
          const responseData = res.data.data;

          const fullData = [];
          responseData?.filter(({ user_type_id, count }) => {
            users?.map(({ id, value }) => {
              if (user_type_id == id) {
                fullData.push({
                  id: user_type_id,
                  name: value,
                  count: count,
                });
              }
            });
          });

          setFilteredApiData(fullData);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("topProducts error : ", err);
        setLoading(false);
        toast.error(err.response.data.message, {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      });
  }, []);

  const [data, setData] = useState({
    series: [],
    options: {
      chart: {
        type: "radialBar",
      },

      legend: {
        show: true,
        // showForSingleSeries: false,
        // showForNullSeries: true,
        // showForZeroSeries: true,
        position: "bottom",
        horizontalAlign: "center",
        floating: false,
        // fontSize: "14px",
        // fontFamily: "Helvetica, Arial",
        // fontWeight: 400,
        // formatter: undefined,
        // inverseOrder: false,
        // width: undefined,
        // height: undefined,
        // tooltipHoverFormatter: undefined,
        // customLegendItems: [],
        // offsetX: 10,
        // offsetY: 0,
        // labels: {
        //   colors: undefined,
        //   useSeriesColors: false,
        // },
        // markers: {
        //   width: 12,
        //   height: 12,
        //   strokeWidth: 0,
        //   strokeColor: "#fff",
        //   fillColors: undefined,
        //   radius: 12,
        //   customHTML: undefined,
        //   onClick: undefined,
        //   offsetX: 0,
        //   offsetY: 0,
        // },
        // itemMargin: {
        //   horizontal: 5,
        //   vertical: 0,
        // },
        // onItemClick: {
        //   toggleDataSeries: true,
        // },
        // onItemHover: {
        //   highlightDataSeries: true,
        // },
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "18px",
            },
            value: {
              fontSize: "16px",
              formatter: function (w) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return w;
              },
            },
            total: {
              show: true,
              fontSize: "14px",
              fillColors: "#fff",
              label: "Retailers",
              formatter: function (w) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return w?.config?.series?.at(2);
              },
            },
          },
        },
      },
      labels: [],
    },
  });

  useEffect(() => {
    if (!!filteredApiData?.length) {
      const series = [];
      const labels = [];
      filteredApiData?.forEach(({ name, count }) => {
        series.push(count);
        labels.push(name);
      });

      setData((prevData) => ({
        ...prevData,
        series: series,
        options: {
          ...prevData.options,
          labels: labels,
        },
      }));
    }
  }, [filteredApiData]);

  return (
    <>
      {!!loading && <Loader />}
      {!loading && (
        <div className="app">
          <div className="row">
            <div className="mixed-chart">
              <Chart
                options={data?.options}
                series={data?.series}
                type="radialBar"
                width="100%"
                height={250}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RadialChartD;
