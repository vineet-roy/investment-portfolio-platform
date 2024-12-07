import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import React, { useState, useEffect, Suspense } from "react";
import useWindowDimensions from "../../services/useWindowDimensions";
import ChartLoading from "../../components/loading/ChartLoading";
import SideButtons from "../../components/sideButtons/SideButtons";
import { useTranslation } from "react-i18next";
import axios from "axios";

const Featured = React.lazy(() => import("../../components/featured/Featured"));
const Chart = React.lazy(() => import("../../components/chart/Chart"));

export default function Home() {
  const { height, width } = useWindowDimensions();
  const { t } = useTranslation();
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch top 10 cryptocurrencies
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
          },
        }
      );
      setCryptoData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cryptocurrency data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();

    // Refresh data every minute
    const interval = setInterval(fetchCryptoData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-colorBgPrimary md:px-20">
      <div>
        <SideButtons />
        <div className="pageContent">
          <div>
            <h1 className="pt-10 pl-10 text-4xl text-colorTextGraySecond font-bold">
              {t("home.title")}
            </h1>
          </div>

          <div className="flex flex-wrap justify-content gap-10 m-8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              cryptoData.map((crypto) => (
                <Widget
                  key={crypto.id}
                  name={crypto.symbol.toUpperCase()}
                  price={crypto.current_price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                  image={crypto.image}
                  percent={crypto.price_change_percentage_24h.toFixed(2)}
                  isUp={crypto.price_change_percentage_24h >= 0}
                />
              ))
            )}
          </div>

          <div className="flex flex-wrap justify-content gap-8 m-8">
            <Suspense fallback={<ChartLoading />}>
              <Chart />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
