import Sidebar from "./Sidebar";
import "./DashboardLayout.css";
import { Button, Row } from "antd";
import { FaEthereum } from "react-icons/fa";
import { useWeb3AuthContext } from "../../contexts/SocialLoginContext";
import { Chat } from "@pushprotocol/uiweb";
const DashboardLayout = ({ children, headerExtra, title }: any) => {
  const { address, connect, disconnect } = useWeb3AuthContext();

  const orgName = localStorage.getItem("orgName");

  return (
    <>
      <Sidebar />
      <div className="dashboardLayout-contentContainer">
        <div className="dashboardLayout-content">
          <div
            className="dashboardLayout-headerContent"
            style={{
              justifyContent: headerExtra ? "space-between" : "flex-end",
            }}
          >
            {headerExtra ? headerExtra : null}
            <Row
              style={{
                alignItems: "center",
              }}
            >
              <div className="dashboardLayout-activeWalletContainer">
                <FaEthereum className="eth-icon" />
                <div className="address">
                  {address && address.length > 10
                    ? address.slice(0, 8) + "..." + address.slice(-4)
                    : address}
                  {!address && <>No Wallet Connection</>}
                </div>
              </div>
              {!address ? (
                <Button
                  style={{
                    height: "2.4rem",
                    marginLeft: "1rem",
                  }}
                  className="btn"
                  onClick={connect}
                >
                  Connect Wallet
                </Button>
              ) : (
                <Button
                  style={{
                    height: "2.4rem",
                    marginLeft: "1rem",
                  }}
                  className="danger"
                  onClick={disconnect}
                >
                  Disconnect Wallet
                </Button>
              )}
            </Row>
          </div>
          {
            <h1 className="dashboardLayout-title">
              Organisation{" "}
              {orgName ? (
                <span className="color-orange"> - {orgName}</span>
              ) : null}
            </h1>
          }
          {children}
        </div>
      </div>
      <Chat
        account={address} //user address
        supportAddress="0x3d6e6678E43ecd302867EE0c92bcBF2Fd6C60239" //support address
        apiKey="jVPMCRom1B.iDRMswdehJG7NpHDiECIHwYMMv6k2KzkPJscFIDyW8TtSnk4blYnGa8DIkfuacU0"
        env="staging"
      />
    </>
  );
};

export default DashboardLayout;
