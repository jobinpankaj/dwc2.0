import React from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = () => {
  const data = {
    series: [
      {
        name: "Pending",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
      {
        name: "Approved",
        data: [15, 47, 31, 57, 48, 60, 61, 99, 138],
      },
      {
        name: "Paid",
        data: [20, 60, 40, 10, 18, 20, 101, 109, 208],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      //   colors: ["#2E93fA", "#66DA26", "#546E7A", "#E91E63", "#FF9800"],
      //   markers: {
      //     size: 0,
      //     colors: undefined,
      //     strokeColors: "#fff",
      //     strokeWidth: 2,
      //     strokeOpacity: 0.9,
      //     strokeDashArray: 0,
      //     fillOpacity: 1,
      //     discrete: [],
      //     shape: "square",
      //     radius: 2,
      //     offsetX: 0,
      //     offsetY: 0,
      //     onClick: undefined,
      //     onDblClick: undefined,
      //     showNullDataPoints: true,
      //     hover: {
      //       size: undefined,
      //       sizeOffset: 3,
      //     },
      //   },
      legend: {
        show: true,
        // formatter: function (seriesName, opts) {
        //   return [seriesName, " - ", opts.w.globals.series[opts.seriesIndex]];
        // },
        width: "100%",
        height: 50,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      //   title: {
      //     text: "Chart Heading",
      //     align: "left",
      //   },
      grid: {
        row: {
          //   colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    },
  };
  return (
    <>
      <ReactApexChart
        options={data?.options}
        series={data?.series}
        type="line"
        height={350}
      />
    </>
  );
};

export default LineChart;
