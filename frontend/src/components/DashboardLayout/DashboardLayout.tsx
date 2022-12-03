import React from "react";
import Sidebar from "./Sidebar";
import "./DashboardLayout.css";
import { Button, Row } from "antd";
import { FaEthereum } from "react-icons/fa";
import { useWeb3AuthContext } from "../../contexts/SocialLoginContext";

const DashboardLayout = ({ children, headerExtra, title }: any) => {
  const { address, connect, disconnect } = useWeb3AuthContext();

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
          {title ? <h1 className="dashboardLayout-title">{title}</h1> : null}
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
