import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { joinOrganisation } from "../../services/services";

function JoinOrg({ provider }: { provider: any }) {
  const navigate = useNavigate();

  return (
    <Form
      onFinish={async ({ orgAddress }) => {
        let res = await joinOrganisation(orgAddress);
        console.log(res);
        navigate("/dashboard");
      }}
    >
      <Form.Item name="orgAddress">
        <Input placeholder="Organization Address" />
      </Form.Item>
      <Button htmlType="submit">Submit</Button>
    </Form>
  );
}

export default JoinOrg;
