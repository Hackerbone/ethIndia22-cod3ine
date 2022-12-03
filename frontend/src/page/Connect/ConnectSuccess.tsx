import { CheckOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Row } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLoader from "../../components/common/PageLoader";
import SquadButton from "../../components/common/SquadButton";
import ConnectLayout from "../../components/ConnectLayout/ConnectLayout";
import { useSmartAccountContext } from "../../contexts/SmartAccountContext";
import { useWeb3AuthContext } from "../../contexts/SocialLoginContext";
import { TbBuilding } from "react-icons/tb";

const ConnectSuccess = () => {
  const navigate = useNavigate();

  const { address, loading: authLoading } = useWeb3AuthContext();

  const { loading } = useSmartAccountContext();

  useEffect(() => {
    if (!address && !authLoading) {
      message.error("Please connect your wallet");
      navigate("/connect");
    }
  }, [address, authLoading, navigate]);

  if (loading || authLoading) {
    return <PageLoader />;
  }
  return (
    <ConnectLayout
      image="/images/onboarding.svg"
      title={
        <>
          You are Connected{" "}
          <CheckOutlined style={{ fontSize: 22, color: "#fb8500" }} />
        </>
      }
      subtitle="Welcome to Squad. Select one of the two options to contiue."
    >
      <Row
        style={{
          display: "flex",
          flexDirection: "column",
          width: "fit-content",
        }}
      >
        <SquadButton
          style={{ padding: "0rem 3rem" }}
          icon={<PlusOutlined />}
          onClick={() => navigate("/onboarding/create")}
        >
          Create a New Organization
        </SquadButton>
        <SquadButton
          icon={<TbBuilding />}
          style={{ padding: "0rem 3rem", marginTop: "2rem" }}
          onClick={() => navigate("/onboarding/join")}
        >
          Join a Organization
        </SquadButton>
      </Row>
    </ConnectLayout>
  );
};

export default ConnectSuccess;
