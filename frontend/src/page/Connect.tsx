import React from "react";
import { useWeb3AuthContext } from "../contexts/SocialLoginContext";
import { useSmartAccountContext } from "../contexts/SmartAccountContext";
import JoinOrg from "./Connect/JoinOrg";
import CreateOrg from "./Connect/CreateOrg";
import "./Page.css";
import { Spin } from "antd";
export default function Connect() {
  const [formType, setFormType] = React.useState<string | null>(null);

  const {
    address,
    provider,
    connect,
    disconnect,
    loading: authLoading,
  } = useWeb3AuthContext();

  const { setSelectedAccount, loading } = useSmartAccountContext();

  const renderForm = () => {
    if (formType === "join") {
      return <JoinOrg provider={provider} />;
    } else if (formType === "create") {
      return <CreateOrg provider={provider} />;
    } else {
      return (
        <>
          {" "}
          <button
            className="btn"
            onClick={() => {
              setFormType("join");
            }}
          >
            Join an organization
          </button>
          <button
            className="btn"
            onClick={() => {
              setFormType("create");
            }}
          >
            Create an organization
          </button>
          <button className="btn btn-black border-white" onClick={disconnect}>
            Disconnect Wallet
          </button>
        </>
      );
    }
  };

  return (
    <Spin spinning={loading || authLoading}>
      <div className="connectPage">
        <div className="left-container">
          Welcome to my SQUAD my Top G. We are SQUAD, making collaboration and
          management of your teams easier.
        </div>
        <div className="right-container">
          {address ? (
            <>
              <h1>Welcome to SQUAD</h1>

              {renderForm()}
            </>
          ) : (
            <>
              <h1>You can connect your wallet to get started.</h1>

              <button
                onClick={
                  !address
                    ? connect
                    : () => {
                        setSelectedAccount(null);
                        disconnect();
                      }
                }
                className="btn"
              >
                {!address ? "Connect Wallet" : "Disconnect Wallet"}
              </button>
            </>
          )}
        </div>
      </div>
    </Spin>
  );
}
