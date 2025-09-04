// export default AnalyticsChart;
import React from "react";
import { Skeleton } from "@mui/material";
import ReactApexChart from "react-apexcharts";

const AnalyticsChart = ({ title, dates, data }) => {
  console.log(data);
  const series = [
    {
      name: "series1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "series2",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "date",
      categories: dates,
    },
    tooltip: {
      x: {
        format: "dd",
      },
    },
  };
  return (
    <div className="mt-4">
      <h4>{title}</h4>
      <div id="usersPerDayChart" className="border rounded-4 p-2 p-lg-3">
        {data?.length > 0 ? (
          <ReactApexChart options={options} series={data} type="area" height={350} />
        ) : (
          <>
            <Skeleton variant="rectangular" className="w-100" height={300} />
          </>
        )}
      </div>
    </div>
  );
};

export default AnalyticsChart;
