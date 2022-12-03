import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLoader from "../../components/common/PageLoader";
import SquadButton from "../../components/common/SquadButton";
import ConnectLayout from "../../components/ConnectLayout/ConnectLayout";
import { useSmartAccountContext } from "../../contexts/SmartAccountContext";
import { useWeb3AuthContext } from "../../contexts/SocialLoginContext";
import { deployContract } from "../../services/services";

const CreateOrganisation = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

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
      title={"Create a New Organisation"}
      subtitle="Get Started by creating a new organisation, creating groups and add users."
    >
      <Row style={{ display: "flex", flexDirection: "column" }}>
        <Form
          onFinish={async (values) => {
            try {
              setLoad(true);
              let res = await deployContract(values.orgName);
              console.log("deployed", res);
              setLoad(false);
              if (res) {
                navigate("/organisations?consent=true");
              }
            } catch (e) {
              navigate("/connect");
              message.error("Something went wrong");
            }
          }}
        >
          <Form.Item name="orgName">
            <Input
              placeholder="Enter your organization name"
              className="connect-inputField"
            />
          </Form.Item>
          <SquadButton
            style={{ padding: "0rem 3rem", width: "fit-content" }}
            icon={<PlusOutlined />}
            htmlType="submit"
            loading={load}
          >
            Create a New Organization
          </SquadButton>
        </Form>
      </Row>
    </ConnectLayout>
  );
};

export default CreateOrganisation;
