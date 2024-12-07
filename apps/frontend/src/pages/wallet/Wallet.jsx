import "./wallet.scss";
import DataGridTable from "../../components/datagridtable/DataGridTable";
import { useEffect, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import SideButtons from "../../components/sideButtons/SideButtons.jsx";
import Web3 from "web3";
import { toast, ToastContainer } from "react-toastify";
import { createOrUpdatePortfolio, getWalletHoldings } from "../../api/userApis.js";

export default function Wallet() {
  const walletColumns = [
    {
      field: "name",
      headerName: "Token",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="name">
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "symbol",
      headerName: "Symbol",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      renderCell: (params) => {
        return <div className="portfolio">{params.row.symbol}</div>;
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="amount">
            {params.row.amount}
            {/* <img className="icon" src={params.row.image} alt={params.row.name} /> */}
          </div>
        );
      },
    },
    {
      field: "chain",
      headerName: "Chain",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      renderCell: (params) => {
        return <div className="price">{params.row.chain}</div>;
      },
    },
    {
      field: "balance",
      headerName: "Balance",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      renderCell: (params) => {
        return <div className="balance">${Number(params.row.balance).toFixed(4)}</div>;
      },
    },
  ];

  const [total, setTotal] = useState(0);
  const [alignment, setAlignment] = useState("wallet");
  const [userAddress, setUserAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [tokens, setTokens] = useState([]);

  const handleChange = (newAlignment) => {
    setAlignment(newAlignment.target.value);
  };

  const handleConnect = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // Get the user's wallet address
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          const address = accounts[0];
          setUserAddress(address);
          setIsConnected(true);

          // Save the wallet address to localStorage
          localStorage.setItem("userAddress", address);

          // Fetch token data after connecting the wallet
          fetchTokens(address);
        } else {
          console.log("No accounts found");
        }
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.error("MetaMask is not installed");
    }
  };

  const getShortAddress = (address) => {
    if (address) {
      return address.slice(0, 6) + "..." + address.slice(-4);
    }
    return "Connect Wallet";
  };

  const fetchTokens = async (address) => {
    if (address) {
      try {
        const response = await getWalletHoldings();
        const tokensData = response.holdings;

        // Make sure each token has a unique ID
        const tokensWithUniqueId = tokensData.map((token, index) => ({
          ...token,
          id: token._id || index,
        }));

        setTokens(tokensWithUniqueId);
        setTotal(tokensWithUniqueId.reduce((acc, token) => Number(acc) + Number(token.balance), 0));
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    }
  };


  // Create or Update Portfolio data
  const updatePortfolio = async () => {
    if (!isConnected) {
      toast.error("Please connect wallet first!");
      return;
    }

    try {
      // Create or update portfolio using the API
      await createOrUpdatePortfolio({ walletAddress: userAddress });

      toast.success("Portfolio updated successfully!");
      fetchTokens(userAddress)
    } catch (error) {
      toast.error("Error updating portfolio.");
      console.error(error);
    }
  };

  // Listen for account changes and update state
  useEffect(() => {
    // Check if there's a saved wallet address in localStorage
    const savedAddress = localStorage.getItem("userAddress");
    if (savedAddress) {
      setUserAddress(savedAddress);
      setIsConnected(true);
      fetchTokens(savedAddress);
    }

    // Listen for account changes from MetaMask
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          // User disconnected the wallet
          setUserAddress("");
          setIsConnected(false);
          localStorage.removeItem("userAddress");
        } else {
          // User switched account
          const newAddress = accounts[0];
          setUserAddress(newAddress);
          localStorage.setItem("userAddress", newAddress);
          fetchTokens(newAddress);
        }
      });
    }
  }, [isConnected]);

  let component;
  if (alignment === "wallet") {
    component = (
      <div className="walletTable">
        <DataGridTable
          data={tokens}
          columns={walletColumns}
          hideFooter={false}
          getRowId={(row) => row.id}
        />
      </div>
    );
  }

  return (
    <div className="wallet">
      <div className="walletContainer">
        <SideButtons />
        <div className="content">
          <div className="totalStatistic">
            <h3>Portfolio value</h3>
            <h1>$ {total.toFixed(5)}</h1>
          </div>
          <div className="buttonGroup">
            <ToggleButtonGroup color="primary" value={alignment} onChange={handleChange}>
              <ToggleButton disabled value="wallet">Wallet Holdings</ToggleButton>
            </ToggleButtonGroup>
          </div>
          {component}
          <button className="connectButton" onClick={handleConnect}>
            {getShortAddress(userAddress)}
          </button>
          {isConnected && (
            <button className="connectButton updateButton" onClick={updatePortfolio}>
              Update Holdings
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
