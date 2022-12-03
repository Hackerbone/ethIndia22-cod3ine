import { Form, Input, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLoader from "../../components/common/PageLoader";
import SquadButton from "../../components/common/SquadButton";
import ConnectLayout from "../../components/ConnectLayout/ConnectLayout";
import { useSmartAccountContext } from "../../contexts/SmartAccountContext";
import { useWeb3AuthContext } from "../../contexts/SocialLoginContext";
import { TbBuilding } from "react-icons/tb";
import { joinOrganisation } from "../../services/services";

const JoinOrganization = () => {
  const navigate = useNavigate();
  const [load,setLoad] = useState(false)


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
      title={"Join a Existing Organisation"}
      subtitle="Join your team in the journey to becoming the greatest."
    >
      <Row style={{ display: "flex", flexDirection: "column" }}>
        <Form
          onFinish={async ({ orgAddress }) => {
            setLoad(true)
            let res = await joinOrganisation(orgAddress);
            setLoad(false)
            navigate("/organisations");
          }}
        >
          <Form.Item name="orgAddress">
            <Input
              placeholder="Enter organisation  address"
              className="connect-inputField"
            />
          </Form.Item>
          <SquadButton
            style={{ padding: "0rem 3rem", width: "fit-content" }}
            icon={<TbBuilding  style={{marginRight:10,marginBottom:-2}}  />}
            htmlType="submit"
            loading={load}
          >
            Join a Organization
          </SquadButton>
        </Form>
      </Row>
    </ConnectLayout>
  );
};

export default JoinOrganization;
