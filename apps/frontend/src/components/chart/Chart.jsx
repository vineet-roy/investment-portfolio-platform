import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const Chart = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "line",
        toolbar: {
          show: true,
        },
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            cssClass: "text-xs font-normal fill-colorTextPrimary",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          style: {
            cssClass: "text-xs fill-colorTextPrimary",
          },
          formatter: function (value) {
            return `$${value.toFixed(2)}`;
          },
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "center",
      },
    },
  });

  // Function to fetch top 10 cryptocurrencies data
  const fetchCryptoData = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page: 1,
            sparkline: true,
          },
        }
      );

      const categories = Array.from(
        { length: response.data[0].sparkline_in_7d.price.length },
        (_, i) =>
          new Date(
            Date.now() - (response.data[0].sparkline_in_7d.price.length - i) * 600000
          ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );

      const series = response.data.map((coin) => ({
        name: coin.name,
        data: coin.sparkline_in_7d.price,
      }));

      setChartData((prev) => ({
        ...prev,
        series,
        options: {
          ...prev.options,
          xaxis: {
            ...prev.options.xaxis,
            categories,
          },
        },
      }));
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    }
  };

  useEffect(() => {
    fetchCryptoData();

    // Refresh every minute for real-time updates
    const interval = setInterval(fetchCryptoData, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-3 bg-colorBgSecondary rounded-lg custom-shadow p-4 min-w-52 min-h-80 w-full">
      <h5 className="text-xl font-bold leading-none text-colorTextGraySecond pe-1">
        Top 10 Cryptocurrencies - Real-Time Price Movements
      </h5>

      <div className="h-4/5 mt-6">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          width={"100%"}
          height={"100%"}
        />
      </div>
    </div>
  );
};

export default Chart;
