import React from "react";
import Button from "../components/Button";

import "./Page.css";
import { useWeb3AuthContext } from "../contexts/SocialLoginContext";
import { useSmartAccountContext } from "../contexts/SmartAccountContext";
import JoinOrg from "./Connect/JoinOrg";
import CreateOrg from "./Connect/CreateOrg";
export default function Connect() {
  const [formType, setFormType] = React.useState<string | null>(null);

  const { address, provider, connect, disconnect } = useWeb3AuthContext();

  const { setSelectedAccount } = useSmartAccountContext();

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
        </>
      );
    }
  };

  return (
    <div className="connectPage">
      <div className="left-container">
        Welcome to my SQUAD my Top G. We are SQUAD, making collaboration and
        management of your teams easier.
      </div>
      <div className="right-container">
        <img
          src="data:image/jpeg;base64,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"
          width={120}
          height={120}
        />

        {address ? (
          <>
            <h1>Welcome to SQUAD</h1>
            <h4>Bhaiyo behenno</h4>

            {renderForm()}
          </>
        ) : (
          <>
            <h1>You can connect your wallet to get started.</h1>

            <Button
              onClickFunc={
                !address
                  ? connect
                  : () => {
                      setSelectedAccount(null);
                      disconnect();
                    }
              }
              title={!address ? "Connect Wallet" : "Disconnect Wallet"}
            />
          </>
        )}
      </div>
    </div>
  );
}
