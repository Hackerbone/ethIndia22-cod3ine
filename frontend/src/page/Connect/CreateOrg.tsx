import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { deployContract } from "../../services/services";

function CreateOrg({ provider }: { provider: any }) {
  const navigate = useNavigate();

  return (
    <Form
      onFinish={async (values) => {
        console.log(values);
        let res = await deployContract(values.orgName);
        console.log(res);
        navigate("/dashboard");
      }}
    >
      <Form.Item name="orgName">
        <Input placeholder="Organization Name" />
      </Form.Item>
      <Button htmlType="submit">Submit</Button>
    </Form>
  );
}

export default CreateOrg;
